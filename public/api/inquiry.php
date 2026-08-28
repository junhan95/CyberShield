<?php
declare(strict_types=1);

/**
 * Frankonia CyberShield — enquiry endpoint.
 *
 * Lives in public/, so `next build` copies it into out/ and deploy/upload.py
 * pushes it with the rest of the site. It answers on the site's own origin,
 * which is what keeps the .htaccess CSP (`connect-src 'self'`) intact — an
 * external form service would be blocked by the site's own policy.
 *
 * Nothing is written to disk inside the document root: the enquiry is handed
 * straight to the responsible mailbox, which is what FCM ingests. Swap the
 * delivery block for an FCM API call when those details are available; the
 * request contract with the client does not change.
 */

// ---------------------------------------------------------------- recipients
// Korean enquiries go to Frankonia Korea, everything else to HQ sales.
const RECIPIENTS = [
    'ko' => 'Junhan.Park@frankoniagroup.com',
    'de' => 'sales@frankoniagroup.com',
    'en' => 'sales@frankoniagroup.com',
];
const RECIPIENT_FALLBACK = 'sales@frankoniagroup.com';

// Envelope sender must be on our own domain or the host's MTA will refuse it.
const MAIL_FROM = 'noreply@frankonia-cybershield.com';

const ALLOWED_ORIGINS = [
    'https://www.frankonia-cybershield.com',
    'https://frankonia-cybershield.com',
];

// Per-address caps. Long enough for a real enquirer who mistypes something,
// short enough that the mailbox cannot be flooded from one browser.
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW = 3600;

// A form filled in under this many seconds was not filled in by a person.
const MIN_FILL_SECONDS = 3;

header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

// The form carries a real action/method as well as the fetch handler, so a
// visitor without JavaScript posts here natively rather than losing the
// enquiry. That path arrives form-encoded and wants a page back, not JSON.
$isBrowserPost = !str_contains($_SERVER['CONTENT_TYPE'] ?? '', 'application/json');

/** Minimal styled page for the no-JavaScript path. */
function page(string $heading, string $note): string
{
    $h = htmlspecialchars($heading, ENT_QUOTES, 'UTF-8');
    $n = htmlspecialchars($note, ENT_QUOTES, 'UTF-8');
    return "<!doctype html><html lang=\"en\"><meta charset=\"utf-8\">"
        . "<meta name=\"viewport\" content=\"width=device-width,initial-scale=1\">"
        . "<title>$h — Frankonia CyberShield</title>"
        . "<style>body{font:16px/1.6 system-ui,sans-serif;color:#25282b;margin:0;"
        . "display:grid;place-items:center;min-height:100vh;padding:24px}"
        . "div{max-width:34rem}h1{font-size:1.3rem}a{color:#e60000}</style>"
        . "<div><h1>$h</h1><p>$n</p><p><a href=\"/\">Back to frankonia-cybershield.com</a></p></div>";
}

function respond(bool $ok, int $status, string $error, string $heading, string $note): never
{
    global $isBrowserPost;
    http_response_code($status);
    if ($isBrowserPost) {
        header('Content-Type: text/html; charset=utf-8');
        echo page($heading, $note);
    } else {
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode($ok ? ['ok' => true] : ['ok' => false, 'error' => $error]);
    }
    exit;
}

function fail(int $status, string $error): never
{
    respond(false, $status, $error, 'Your request could not be sent',
        'Something went wrong on our side. Please try again, or write to sales@frankoniagroup.com directly.');
}

function succeed(): never
{
    respond(true, 200, '', 'Thank you — your request has reached us',
        'A Frankonia specialist will review your project and reply by email.');
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    fail(405, 'method_not_allowed');
}

// Browsers send Origin on cross-origin POSTs. Same-origin fetch may omit it,
// so an absent header is accepted but a foreign one is not.
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin !== '' && !in_array($origin, ALLOWED_ORIGINS, true)) {
    fail(403, 'forbidden_origin');
}

if ($isBrowserPost) {
    $data = $_POST;
} else {
    $raw = file_get_contents('php://input');
    if ($raw === false || strlen($raw) > 20000) {
        fail(413, 'payload_too_large');
    }
    $data = json_decode($raw, true);
    if (!is_array($data)) {
        fail(400, 'invalid_json');
    }
}

/** Trim, collapse newlines out of single-line fields, and cap the length. */
function field(array $data, string $key, int $max, bool $multiline = false): string
{
    $value = is_string($data[$key] ?? null) ? trim($data[$key]) : '';
    if (!$multiline) {
        $value = preg_replace('/[\r\n]+/', ' ', $value) ?? '';
    }
    return mb_substr($value, 0, $max);
}

// Honeypot: a real form never has this filled in, and it is hidden from
// assistive technology as well as from sight, so no person can reach it.
if (field($data, 'website', 200) !== '') {
    // Answer as though it succeeded so a bot has nothing to tune against.
    succeed();
}

$elapsed = is_numeric($data['elapsed'] ?? null) ? (float) $data['elapsed'] : 0.0;
if ($elapsed > 0 && $elapsed < MIN_FILL_SECONDS) {
    succeed();
}

$name = field($data, 'name', 120);
$company = field($data, 'company', 160);
$email = field($data, 'email', 200);
$country = field($data, 'country', 120);
$project = field($data, 'project', 120);
$stage = field($data, 'stage', 120);
$message = field($data, 'message', 6000, true);
$request = in_array($data['request'] ?? '', ['consultation', 'quote'], true)
    ? $data['request']
    : 'consultation';
$lang = in_array($data['lang'] ?? '', ['en', 'de', 'ko'], true) ? $data['lang'] : 'en';
$consent = in_array($data['consent'] ?? false, [true, 'on', '1', 'true'], true);

foreach (['name' => $name, 'company' => $company, 'email' => $email, 'message' => $message] as $key => $value) {
    if ($value === '') {
        fail(422, "missing_$key");
    }
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    fail(422, 'invalid_email');
}
if (!$consent) {
    fail(422, 'missing_consent');
}

// ------------------------------------------------------------- rate limiting
// Keyed on the address, not the visitor: no IP is stored, which keeps the
// endpoint outside the log-retention question entirely. Best effort — if the
// temp directory is not writable the enquiry still goes through.
$bucket = sys_get_temp_dir() . '/cybershield-rl-' . hash('sha256', strtolower($email)) . '.txt';
$hits = [];
if (is_readable($bucket)) {
    $hits = array_filter(
        array_map('intval', explode(',', (string) file_get_contents($bucket))),
        static fn (int $at): bool => $at > time() - RATE_LIMIT_WINDOW,
    );
}
if (count($hits) >= RATE_LIMIT_MAX) {
    fail(429, 'rate_limited');
}
$hits[] = time();
@file_put_contents($bucket, implode(',', $hits), LOCK_EX);

// ------------------------------------------------------------------ delivery
$subject = $request === 'quote'
    ? '[CyberShield] Quote request'
    : '[CyberShield] Consultation request';
$subject .= " — $company";

$body = implode("\n", [
    'Request:        ' . $request,
    'Site language:  ' . $lang,
    '',
    'Name:           ' . $name,
    'Company:        ' . $company,
    'Email:          ' . $email,
    'Country/region: ' . $country,
    'Project type:   ' . $project,
    'Project stage:  ' . $stage,
    '',
    'Requirements:',
    $message,
    '',
    '--',
    'Sent from the CyberShield enquiry form. Consent to be contacted was given.',
    'Received: ' . gmdate('Y-m-d H:i:s') . ' UTC',
]);

/** RFC 2047 encode a header value so non-ASCII names survive transport. */
function header_value(string $value): string
{
    return preg_match('/[^\x20-\x7E]/', $value)
        ? '=?UTF-8?B?' . base64_encode($value) . '?='
        : $value;
}

$headers = implode("\r\n", [
    'From: ' . header_value('Frankonia CyberShield') . ' <' . MAIL_FROM . '>',
    'Reply-To: ' . header_value($name) . ' <' . $email . '>',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
    'MIME-Version: 1.0',
    'X-CyberShield-Locale: ' . $lang,
]);

$to = RECIPIENTS[$lang] ?? RECIPIENT_FALLBACK;
$sent = mail($to, header_value($subject), $body, $headers, '-f' . MAIL_FROM);

if (!$sent) {
    fail(502, 'delivery_failed');
}

succeed();
