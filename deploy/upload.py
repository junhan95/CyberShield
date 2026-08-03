"""Upload the static export to the frankonia-cybershield.com document root.

Credentials come from the environment, never from this file — the repository is
public. Run after a production build:

    STATIC_EXPORT=1 NEXT_PUBLIC_BASE_PATH= \
    NEXT_PUBLIC_SITE_ORIGIN=https://www.frankonia-cybershield.com \
    NEXT_PUBLIC_INDEXABLE=1 npx next build

    SFTP_HOST=... SFTP_USER=... SFTP_PASS=... python deploy/upload.py

The site content goes up first and .htaccess last, so the document root is never
left pointing at a half-uploaded tree.
"""

import os
import posixpath
import sys
import time

import paramiko

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LOCAL = os.path.join(ROOT, "out")
HTACCESS = os.path.join(ROOT, "deploy", "htaccess")
REMOTE = os.environ.get("SFTP_REMOTE", "/cybershield")


def main() -> int:
    if not os.path.isdir(LOCAL):
        print(f"no build output at {LOCAL} — run the production build first")
        return 1

    try:
        host, user, password = (
            os.environ["SFTP_HOST"],
            os.environ["SFTP_USER"],
            os.environ["SFTP_PASS"],
        )
    except KeyError as missing:
        print(f"missing environment variable: {missing}")
        return 1

    transport = paramiko.Transport((host, 22))
    transport.connect(username=user, password=password)
    sftp = paramiko.SFTPClient.from_transport(transport)
    sftp.get_channel().settimeout(120)

    stamp = time.strftime("%Y%m%d-%H%M%S")
    backup = f"{REMOTE}/.htaccess.bak-{stamp}"
    try:
        with sftp.open(f"{REMOTE}/.htaccess") as handle:
            previous = handle.read()
        with sftp.open(backup, "wb") as handle:
            handle.write(previous)
        print(f"backed up .htaccess -> {backup}")
    except IOError:
        print("no existing .htaccess to back up")

    seen: set[str] = set()

    def ensure_dir(path: str) -> None:
        if path in ("", "/", REMOTE) or path in seen:
            return
        try:
            sftp.stat(path)
        except IOError:
            ensure_dir(posixpath.dirname(path))
            sftp.mkdir(path)
        seen.add(path)

    files = []
    for folder, _dirs, names in os.walk(LOCAL):
        for name in names:
            local = os.path.join(folder, name)
            files.append((local, os.path.relpath(local, LOCAL).replace("\\", "/")))

    for index, (local, relative) in enumerate(sorted(files, key=lambda item: item[1]), 1):
        remote = posixpath.join(REMOTE, relative)
        ensure_dir(posixpath.dirname(remote))
        sftp.put(local, remote)
        if index % 20 == 0 or index == len(files):
            print(f"  {index}/{len(files)} files")

    sftp.put(HTACCESS, posixpath.join(REMOTE, ".htaccess"))
    print("uploaded .htaccess - deployment complete")

    transport.close()
    return 0


if __name__ == "__main__":
    sys.exit(main())
