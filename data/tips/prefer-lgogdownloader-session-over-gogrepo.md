---
id: prefer-lgogdownloader-session-over-gogrepo
title: Prefer lgogdownloader's session over stale gogrepo cookies
category: tools
games: []
machines: [arch-server]
status: works
source: 2026-11-15 recon and download work
date_verified: 2026-11-15
---

**Problem:** an older gogrepo 0.3a backup tree exists, but its cookies were
stale.

**Fix:** use lgogdownloader instead. It was already signed in on arch-server.

**Why:** no re-login or cookie refresh is needed, so downloads can start
immediately.
