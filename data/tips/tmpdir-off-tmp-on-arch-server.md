---
id: tmpdir-off-tmp-on-arch-server
title: Set TMPDIR off /tmp on arch-server
category: performance
games: []
machines: [arch-server]
status: works
source: 2026-11-15 recon and download work
date_verified: 2026-11-15
---

**Problem:** `/tmp` on arch-server is a 22 GB RAM tmpfs. Agent and build jobs
that write there can fill memory.

**Fix:** point temp files at disk before running a job, for example
`export TMPDIR="$HOME/codex-jobs/<job>/tmp"` (also `TMP` and `TEMP`).

**Why:** keeps large scratch data off the RAM-backed filesystem.
