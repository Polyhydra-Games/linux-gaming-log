// npm run validate - schema + cross-reference checks. Exits non-zero on errors.
import fs from "node:fs";
import path from "node:path";
import Ajv from "ajv";
import addFormats from "ajv-formats";
import { ROOT, loadAll } from "./load.mjs";

const ajv = new Ajv({ allErrors: true, strict: true });
addFormats(ajv);
const schema = (n) => JSON.parse(fs.readFileSync(path.join(ROOT, "schemas", `${n}.schema.json`), "utf8"));
const vMachines = ajv.compile(schema("machines"));
const vLog = ajv.compile(schema("log"));
const vTip = ajv.compile(schema("tip"));
const vGame = ajv.compile(schema("game"));

const errors = [];
const warnings = [];
const err = (file, msg) => errors.push(`${file}: ${msg}`);
const check = (validate, file, data) => {
  if (!validate(data)) {
    for (const e of validate.errors) err(file, `${e.instancePath || "(root)"} ${e.message}${e.params?.additionalProperty ? ` '${e.params.additionalProperty}'` : ""}`);
  }
};
const validDate = (s) => !Number.isNaN(Date.parse(`${s}T00:00:00Z`)) && new Date(`${s}T00:00:00Z`).toISOString().startsWith(s);

const { machinesDoc, log, tips, games } = loadAll();

check(vMachines, "data/machines.yaml", machinesDoc);
const machineIds = new Set();
for (const m of machinesDoc?.machines ?? []) {
  if (machineIds.has(m.id)) err("data/machines.yaml", `duplicate machine id '${m.id}'`);
  machineIds.add(m.id);
}

const gameSlugs = new Set();
for (const g of games) {
  check(vGame, g.file, g.data);
  if (g.data.slug !== g.basename) err(g.file, `slug '${g.data.slug}' must match filename '${g.basename}'`);
  if (gameSlugs.has(g.data.slug)) err(g.file, `duplicate game slug '${g.data.slug}'`);
  gameSlugs.add(g.data.slug);
  if (g.data.slug && g.data.backup_location && !g.data.backup_location.endsWith(`/${g.data.slug}`)) {
    warnings.push(`${g.file}: backup_location does not end with the slug`);
  }
}

const checkRefs = (file, d) => {
  for (const m of d.machines ?? []) if (!machineIds.has(m)) err(file, `unknown machine id '${m}' (add it to data/machines.yaml)`);
  for (const s of d.games ?? []) if (!gameSlugs.has(s)) warnings.push(`${file}: game slug '${s}' has no page in data/games/`);
};

const logNames = new Set();
for (const e of log) {
  check(vLog, e.file, e.data);
  if (e.data.date && !validDate(e.data.date)) err(e.file, `invalid calendar date '${e.data.date}'`);
  if (e.data.date && !e.basename.startsWith(e.data.date)) err(e.file, `filename should start with the date '${e.data.date}'`);
  checkRefs(e.file, e.data);
}

const tipIds = new Set();
for (const t of tips) {
  check(vTip, t.file, t.data);
  if (t.data.id !== t.basename) err(t.file, `id '${t.data.id}' must match filename '${t.basename}'`);
  if (tipIds.has(t.data.id)) err(t.file, `duplicate tip id '${t.data.id}'`);
  tipIds.add(t.data.id);
  if (t.data.date_verified && !validDate(t.data.date_verified)) err(t.file, `invalid calendar date '${t.data.date_verified}'`);
  if (!t.body) err(t.file, "tip body is empty");
  checkRefs(t.file, t.data);
}

// Scrub guard: LAN IPs belong in data/machines.yaml only.
const ipRe = /\b(?:10|192\.168|172\.(?:1[6-9]|2\d|3[01]))\.\d{1,3}(?:\.\d{1,3})?\b/;
for (const x of [...log, ...tips, ...games]) {
  if (ipRe.test(`${x.body}\n${JSON.stringify(x.data)}`)) err(x.file, "contains a LAN IP; LAN details belong only in data/machines.yaml");
}

for (const w of warnings) console.warn(`warn  ${w}`);
if (errors.length) {
  for (const e of errors) console.error(`error ${e}`);
  console.error(`\nvalidation failed: ${errors.length} error(s)`);
  process.exit(1);
}
console.log(`validation ok: ${machineIds.size} machines, ${log.length} log entries, ${tips.length} tips, ${games.length} games`);
