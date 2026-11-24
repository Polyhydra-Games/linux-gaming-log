---
date: 2026-11-15
title: NAS backup inventory and cleanup (180 of 188 covered)
machines: [arch-server, syn1]
games: []
what_we_did:
  - Inventoried the GOG backups on the Games share of syn1 (mounted on arch-server).
  - "Ran a cleanup at 00:04 America/New_York that moved 70 dirs from `_gog` to `gog` and extras to `_trash-extras`."
what_worked:
  - "After cleanup, 180 of 188 owned games were covered by a backup."
what_failed: []
links: []
tags: [nas, backup, gog, cleanup]
---

Machine `syn1` exports `/volume1/Games`, mounted NFS4 read-write at
`/mnt/syn1/Games` on `arch-server` (5.9T free at the time). Details of the
machine live in `data/machines.yaml`.

Backups were split across two trees:

| Tree | Layout | Contents |
| --- | --- | --- |
| `_gog` | lgogdownloader layout | 111 games |
| `gog` | older gogrepo 0.3a tree | 572G |

The cleanup at 00:04 America/New_York on 2026-11-15 moved 70 directories from
`_gog` to `gog` and moved extras to `_trash-extras`. It wrote a log named
`_cleanup-log-20261115.tsv` in the NAS Games tree.

Result: 180 of the 188 owned games were covered. The remaining 8 were
downloaded in the next entry.
