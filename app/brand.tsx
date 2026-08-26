import { asset } from "./site-config";

/**
 * The Frankonia lockup, a hairline rule, then the product name.
 *
 * The product name was a cut-metal SVG for four releases: a brushed steel
 * sheet shown through the letterforms, a polished chamfer, a cast shadow. It
 * was built for an ink bar, where a lit sheet of metal has something to be lit
 * against. On the paper header it had nothing — the plate's own mid-tones are
 * light greys, so the letterforms came out as a grey smudge beside a crisp red
 * knot, and the two halves of the lockup no longer read as one mark.
 *
 * Darkening the plate was tried first and is the wrong shape of fix: the whole
 * effect is a specular highlight and a drop shadow, and both of those are the
 * lighting of a dark room. What the bar needs is a wordmark, so this is one —
 * Jost, the lockup's own typeface, set at the size and letter-spacing the SVG
 * was cutting its mask from (18px/700, 1.13px). It inherits `color`, so it is
 * ink on the paper header and white in the ink footer with no second asset,
 * it stays sharp at any zoom, and it is selectable text.
 *
 * `decorative` is for placements whose link already carries an aria-label —
 * repeating the name there would have a screen reader say it twice.
 */
export function BrandLockup({
  decorative = false,
  onLight = false,
}: { decorative?: boolean; onLight?: boolean }) {
  return (
    <>
      {/* The group artwork ships as two files: `-dark` sets the wordmark in
          --ink and the knot on the Dark Red plate (#c3171d), for the light
          header; the plain file is white-on-transparent, for the ink footer. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="brand-logo"
        src={asset(onLight ? "/frankonia-logo-dark.svg" : "/frankonia-logo.svg")}
        width={1898}
        height={1029}
        alt={decorative ? "" : "Frankonia"}
        aria-hidden={decorative || undefined}
      />
      <span className="brand-product" aria-hidden={decorative || undefined}>
        CyberShield
      </span>
    </>
  );
}
