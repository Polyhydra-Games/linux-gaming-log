# Contributing (humans and bots)

1. Branch from `main`.
2. Add one Markdown file: a log entry in `data/log/`, a tip in `data/tips/`, or a game in `data/games/` (see README for the frontmatter).
3. Run `npm ci && npm run validate && npm run build`. Both must pass.
4. Open a pull request to `main`.

Rules:

- **Do not invent facts.** Only record things that actually happened or were verified. Use `what_failed: []` when nothing failed; leave `rating: unrated` unless someone rated it.
- **No secrets** (tokens, cookies, passwords, key files).
- **No private/LAN IPs anywhere** (including `data/machines.yaml`). Refer to machines by `id`. A new machine goes into `data/machines.yaml` first, as a role name only.
- A tip's filename equals its `id`; a log filename starts with its `date`.
- Do not change repo visibility or Pages settings.
