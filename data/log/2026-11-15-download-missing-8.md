---
date: 2026-11-15
title: Downloaded the 8 missing GOG games to the NAS
machines: [arch-server, syn1]
games:
  - carmageddon_max_pack
  - elvira_mistress_of_the_dark
  - necronomicon_the_dawning_of_darkness
  - postal_2
  - rayman_2_the_great_escape
  - realms_of_the_haunting
  - star_control_iii
  - underkeep
what_we_did:
  - "Ran lgogdownloader on arch-server for the 8 uncovered games, writing into the older `gog` tree on the NAS (by request, not `_gog`)."
what_worked:
  - "Runtime 3m52s, 11.01 GiB, exit 0."
  - "`--status` was OK for all 43 files; `--check-orphans` was clean."
  - All 188 owned games now have a backup.
what_failed: []
links: []
tags: [gog, lgogdownloader, backup, nas]
---

Destination: `/mnt/syn1/Games/gog` on `arch-server` (machine `syn1`). This is
the older gogrepo tree folder, chosen on request instead of `_gog`.

```sh
lgogdownloader --download --directory /mnt/syn1/Games/gog --game '^(carmageddon_max_pack|elvira_mistress_of_the_dark|necronomicon_the_dawning_of_darkness|postal_2|rayman_2_the_great_escape|realms_of_the_haunting|star_control_iii|underkeep)$'
```

Job log on `arch-server`: `~/gog-jobs/download-missing-8-20261115-083053.log`
(the filename implies a start time of 08:30:53 America/New_York).

## Linux vs Windows

Only Elvira (`elvira_mistress_of_the_dark`) and Realms of the Haunting
(`realms_of_the_haunting`) have native Linux `.sh` installers. The other six
are Windows-only and would run through Wine. None of them have been tested yet;
see each game page.
