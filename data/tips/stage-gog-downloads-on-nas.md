---
id: stage-gog-downloads-on-nas
title: Stage GOG downloads on the NAS, not the local root disk
category: nas
games: []
machines: [arch-server, syn1]
status: works
source: 2026-11-15 recon and download work
date_verified: 2026-11-15
---

**Problem:** the local root disk on arch-server was 93% full.

**Fix:** download straight to the NAS mount, `/mnt/syn1/Games` (machine
`syn1`), which had 5.9T free.

**Why:** GOG installers are large (the 8-game batch was 11.01 GiB); writing
them to the NAS avoids pressure on the local root.
