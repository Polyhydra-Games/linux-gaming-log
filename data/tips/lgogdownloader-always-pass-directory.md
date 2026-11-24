---
id: lgogdownloader-always-pass-directory
title: Always pass --directory to lgogdownloader
category: tools
games: []
machines: [arch-server]
status: works
source: 2026-11-15 recon and download work
date_verified: 2026-11-15
---

**Problem:** the lgogdownloader config has `directory = .`, so omitting the
flag writes into whatever the current working directory is.

**Fix:** always pass `--directory <target>` explicitly, e.g.
`lgogdownloader --download --directory /mnt/syn1/Games/gog ...`.

**Why:** the default is relative, so a download started from the wrong place
lands in the wrong place.
