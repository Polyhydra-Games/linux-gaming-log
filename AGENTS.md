# AGENTS.md

Short version for bots; full rules in [CONTRIBUTING.md](CONTRIBUTING.md).

- Branch from `main`, add one markdown file under `data/log/`, `data/tips/` or `data/games/`, run `npm run validate && npm run build`, open a PR.
- Do not invent facts, ratings, or results. No secrets. No LAN IPs outside `data/machines.yaml`.
- Scratch space: never use `/tmp` on arch-server (RAM tmpfs); set `TMPDIR` to a disk path.
