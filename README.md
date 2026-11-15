# linux-gaming-log

A Linux gaming **work log + tips database**. It starts from a GOG library backup
effort, but the scope is general Linux gaming: what we did, what worked, what
failed, and reusable tips (install, Wine/Proton, native, controllers, NAS,
tooling).

Related: [mindblank](https://github.com/lancer1977/mindblank) is the public
field-notes digital garden (Quartz). This site reuses mindblank's typography
(Schibsted Grotesk / Source Sans / IBM Plex Mono) and light/dark palette, but
this repo is the *structured*, **private** Linux-gaming log: data files in,
static site out.

## Stack

- [Eleventy 3](https://www.11ty.dev/) static site generator, Nunjucks templates, vanilla JS (tips filter, theme toggle)
- Node 22 (`.node-version` = `v22.16.0`, `engine-strict=true`)
- Content is data: Markdown + YAML frontmatter under `data/`
- JSON Schemas in `schemas/` + `npm run validate` (Ajv + cross-reference checks)

## Build

```sh
npm ci
npm run validate   # schemas, unique ids, known machine ids, no stray LAN IPs
npm run build      # writes _site/
npm start          # dev server (same as: npx @11ty/eleventy --serve)
```

### Base URL

Locally the site is served from `/`. For GitHub Pages as a project site it must
live under `/linux-gaming-log/`; `pages.yml` sets `PATH_PREFIX=/linux-gaming-log/`.
Override with the `PATH_PREFIX` env var (e.g. `PATH_PREFIX=/` for a custom
domain). See `eleventy.config.js`.

## Layout

```
data/machines.yaml   hosts + LAN details (ONLY place for these)
data/log/            dated entries            YYYY-MM-DD-slug.md
data/tips/           one tip per file         <id>.md
data/games/          per-game pages           <gog-slug>.md
schemas/             JSON Schemas for all of the above
scripts/             loader + validator
src/                 Eleventy templates, CSS, JS
.github/workflows/   ci.yml, pages.yml
```

## Add a log entry

Create `data/log/YYYY-MM-DD-short-slug.md` (filename must start with the date):

```markdown
---
date: 2026-11-16
title: Short title
machines: [arch-server]      # ids from data/machines.yaml
games: []                    # GOG slugs; pages exist only for games in data/games/
what_we_did: ["One thing"]   # string or list
what_worked: ["One thing"]
what_failed: []              # empty if nothing failed - do not invent failures
links: []                    # optional: [{title: ..., url: https://...}]
tags: [example]              # optional
---

Optional narrative in Markdown.
```

## Add a tip

Create `data/tips/<id>.md`; the filename must equal the `id`:

```markdown
---
id: kebab-case-id
title: Short imperative title
category: tools   # backup install wine proton native controller performance nas tools shell other
games: []         # GOG slugs, may be empty
machines: [arch-server]   # where verified, may be empty
distro: CachyOS   # optional, string or list
status: works     # works | partial | broken
source: where this was learned
date_verified: 2026-11-16
---

**Problem:** ...

**Fix:** ...

**Why:** ...
```

New games get `data/games/<slug>.md` (see an existing one for the fields).

## Machines and scrubbing

LAN host details (IPs, hostnames, mounts) live **only** in `data/machines.yaml`.
Log, tip and game bodies refer to machines by `id`, and the validator rejects
private IPs elsewhere. **If this repo is ever made public, scrub
`data/machines.yaml`** (and the generated `/machines/` page, which prints it).

## GitHub Pages caveat

The repo is **private**. GitHub Pages on a private repository requires a paid
GitHub plan, so `pages.yml` is present but Pages may not actually serve until
that is true. Pages is deliberately not enabled by this repo's setup; turn it on
in repo settings (Source: GitHub Actions) when ready.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) (also for bots). The default branch is
`main`; there is no `dev` branch here, unlike mindblank.
