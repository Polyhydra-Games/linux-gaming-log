---
id: fish-which-multiple-args
title: "Fish shell: `which a b c` errors on skycachy and alienware"
category: shell
games: []
machines: [skycachy, alienware]
status: works
source: 2026-11-15 recon and download work
date_verified: 2026-11-15
---

**Problem:** running `which a b c` errors on skycachy and alienware.

**Fix:** query one command name per `which` call (or loop over the names).

**Why:** Fish's `which` is not the Unix one and does not accept multiple
command names the same way.
