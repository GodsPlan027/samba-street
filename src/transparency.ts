// The public numbers on the website: the start budget, money in and out, and the
// session log. They are read from the CSV files in data/ while the site is built,
// so a change to those files goes online with the next deploy.
// A mistake in one of the files stops the build, so wrong numbers never go online.
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { loadFinances, totals, parseCsv, parseDate, money, monthLabel } from "./dashboard/finances";
import { START_BUDGET, BUDGET_2027, SEASON_PLAN } from "./site";

const FINANCES_FILE = "data/finances.csv";
const SESSIONS_FILE = "data/sessions.csv";

/** "€1,250", or "€XX" for an amount that isn't known yet. */
export const euro = (n: number | null) => (n === null ? "€XX" : money(n));

/** The start budget and its total (null until every amount is filled in). */
export function startBudget() {
  const complete = START_BUDGET.every((i) => i.amount !== null);
  const total = complete ? START_BUDGET.reduce((n, i) => n + (i.amount ?? 0), 0) : null;
  return { items: START_BUDGET, total };
}

/** Budget 2027 with each item's share of the total, for the bars. */
export function budget2027() {
  const complete = BUDGET_2027.every((i) => i.amount !== null);
  const total = complete ? BUDGET_2027.reduce((n, i) => n + (i.amount ?? 0), 0) : null;
  const items = BUDGET_2027.map((i) => ({
    item: i.item,
    amount: i.amount,
    percent: complete ? (total ? ((i.amount ?? 0) / total) * 100 : 0) : i.placeholderShare,
  }));
  return { items, total };
}

/** Money raised against the start budget, for the progress bar. */
export async function goal() {
  const { total } = startBudget();
  const { moneyIn, donations } = await publicFinances();
  return {
    raised: moneyIn,
    total,
    percent: total ? Math.min(100, (moneyIn / total) * 100) : 0,
    donations:
      donations === 0 ? "No donations yet" : `${donations} donation${donations === 1 ? "" : "s"} so far`,
  };
}

/** Every transaction in data/finances.csv, plus the totals. */
export async function publicFinances() {
  const { transactions, problems, error } = await loadFinances(FINANCES_FILE);
  if (error) throw new Error(`${FINANCES_FILE}: ${error}`);
  if (problems.length) {
    const p = problems[0];
    throw new Error(`${FINANCES_FILE}, row ${p.row}: ${p.message}`);
  }
  return { transactions, ...totals(transactions) };
}

export type Session = { date: string; players: number | null; minutes: number | null; drills: string };

/** Every logged session in data/sessions.csv, newest first. */
export function loadSessions(): Session[] {
  const path = resolve(process.cwd(), SESSIONS_FILE);
  if (!existsSync(path)) return [];
  const rows = parseCsv(readFileSync(path, "utf8"));
  const header = (rows[0] ?? []).map((h) => h.trim().toLowerCase());
  const col = (name: string) => header.indexOf(name);
  const toNumber = (s: string) => (s.trim() === "" ? null : Number(s));

  const sessions: Session[] = [];
  rows.slice(1).forEach((cells, i) => {
    if (cells.every((c) => c.trim() === "")) return;
    const get = (name: string) => (cells[col(name)] ?? "").trim();
    const date = parseDate(get("date"));
    const players = toNumber(get("players"));
    const minutes = toNumber(get("minutes"));
    if (!date || Number.isNaN(players) || Number.isNaN(minutes)) {
      throw new Error(`${SESSIONS_FILE}, row ${i + 2}: use a date like 2027-03-02 and plain numbers for players and minutes`);
    }
    sessions.push({ date, players, minutes, drills: get("drills") });
  });
  return sessions.sort((a, b) => b.date.localeCompare(a.date));
}

/** One entry per month of the season: sessions planned and sessions held. */
export function seasonMonths(sessions: Session[]) {
  return SEASON_PLAN.map(({ month, planned }) => ({
    month,
    label: monthLabel(month),
    planned,
    held: sessions.filter((s) => s.date.startsWith(month)).length,
  }));
}
