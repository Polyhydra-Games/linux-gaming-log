// Shared loader for site build and validation. Reads everything under data/.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";
import yaml from "js-yaml";

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
export const DATA = path.join(ROOT, "data");

// CORE_SCHEMA keeps YYYY-MM-DD as plain strings (no implicit Date objects).
const engines = {
  yaml: {
    parse: (s) => yaml.load(s, { schema: yaml.CORE_SCHEMA }) ?? {},
    stringify: (o) => yaml.dump(o),
  },
};

function readDir(dir) {
  const full = path.join(DATA, dir);
  if (!fs.existsSync(full)) return [];
  return fs
    .readdirSync(full)
    .filter((f) => f.endsWith(".md"))
    .sort()
    .map((file) => {
      const parsed = matter(fs.readFileSync(path.join(full, file), "utf8"), { engines });
      return { file: `data/${dir}/${file}`, basename: file.replace(/\.md$/, ""), data: parsed.data, body: parsed.content.trim() };
    });
}

export function loadAll() {
  const mfile = path.join(DATA, "machines.yaml");
  const machinesDoc = yaml.load(fs.readFileSync(mfile, "utf8"), { schema: yaml.CORE_SCHEMA });
  return {
    machinesDoc,
    log: readDir("log"),
    tips: readDir("tips"),
    games: readDir("games"),
  };
}
