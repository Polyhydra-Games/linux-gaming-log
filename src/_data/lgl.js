import { loadAll } from "../../scripts/load.mjs";

export default function () {
  const { machinesDoc, log, tips, games } = loadAll();
  const machines = machinesDoc.machines;
  const nameOf = Object.fromEntries(machines.map((m) => [m.id, m.name]));
  const gameTitle = Object.fromEntries(games.map((g) => [g.data.slug, g.data.title]));

  const logEntries = log
    .map((e) => ({ ...e.data, slug: e.basename, body: e.body }))
    .sort((a, b) => (a.date === b.date ? b.slug.localeCompare(a.slug) : b.date.localeCompare(a.date)));
  const tipList = tips
    .map((t) => ({ ...t.data, body: t.body }))
    .sort((a, b) => a.category.localeCompare(b.category) || a.title.localeCompare(b.title));
  const gameList = games
    .map((g) => ({
      ...g.data,
      body: g.body,
      tips: tipList.filter((t) => t.games.includes(g.data.slug)),
      log: logEntries.filter((e) => e.games.includes(g.data.slug)),
    }))
    .sort((a, b) => a.title.localeCompare(b.title));

  return {
    title: "Linux Gaming Log",
    machines,
    nameOf,
    gameTitle,
    log: logEntries,
    tips: tipList,
    games: gameList,
    categories: [...new Set(tipList.map((t) => t.category))].sort(),
    statuses: ["works", "partial", "broken"],
    builtOn: new Date().toISOString().slice(0, 10),
  };
}
