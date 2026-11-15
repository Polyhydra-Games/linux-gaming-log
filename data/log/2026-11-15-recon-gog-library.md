---
date: 2026-11-15
title: Recon - lgogdownloader and the owned GOG library
machines: [arch-server]
games: []
what_we_did:
  - Checked lgogdownloader on arch-server and counted the owned GOG library.
what_worked:
  - lgogdownloader 3.19 on arch-server was already authenticated.
  - "Owned GOG library: 188 games (platform `w+l`, language `en`)."
what_failed: []
links: []
tags: [gog, lgogdownloader, recon]
---

Starting point for the log: before downloading anything, find out what the
library looks like and how the tool is configured.

- Tool: lgogdownloader 3.19 on `arch-server`, already signed in.
- Library size: 188 owned games.
- Filters in effect: platform `w+l` (Windows + Linux), language `en`.
- The lgogdownloader config sets `directory = .`, so always pass
  `--directory` explicitly. See the tip `lgogdownloader-always-pass-directory`.
