// Site-wide settings. Update these in one place.

// Google Workspace alias of the main mailbox.
export const CONTACT_EMAIL = "hello@sambastreet.charity";

export const SITE_NAME = "Samba Street";
export const SITE_DESCRIPTION =
  "Samba Street is a football academy at Nkazimlo Primary School in Khayelitsha, Cape Town: training twice a week, gear for every team and tournaments. The season starts in March 2027.";

// ---------- Stichting Samba Street ----------
// Fill these in once the foundation is registered (December 2026).
// Empty values are left off the site, so nothing half-finished shows.
export const FOUNDATION = {
  name: "Stichting Samba Street",
  kvk: "", // Chamber of Commerce (KvK) number, 8 digits
  rsin: "", // RSIN, the foundation's tax number, 9 digits
  iban: "", // For example "NL00 BANK 0123 4567 89"
  address: "", // As registered at the KvK, for example "Street 1, 1234 AB City"
  board: [] as { name: string; role: string }[], // For example { name: "Vince Beekmans", role: "Chair" }
  anbi: false, // true once the Belastingdienst has granted ANBI status
};

// ---------- Donating ----------
// Payment links from the payment provider: one per choice in the donate box.
// "other" is a link where the donor types the amount.
// While a link is empty, that button opens an email instead, so it always works.
export const DONATE_AMOUNTS = [10, 25, 50] as const;
export const DONATE_LINKS: Record<"monthly" | "once", Record<string, string>> = {
  monthly: { 10: "", 25: "", 50: "", other: "" },
  once: { 10: "", 25: "", 50: "", other: "" },
};

// ---------- The start budget ----------
// What has to be there on the first day of training, in euros.
// Leave an amount at null until it's known: the site shows €XX.
export const START_BUDGET: { item: string; amount: number | null }[] = [
  { item: "Football boots", amount: null },
  { item: "Balls", amount: null },
  { item: "Cones, ladders and bibs", amount: null },
  { item: "Two small goals", amount: null },
  { item: "Shirts", amount: null },
];

// ---------- Budget 2027 ----------
// The whole season, in euros, shown as bars on the homepage and on Where it goes.
// Leave an amount at null until it's known: the site shows €XX.
// placeholderShare (percent) only sets the bar lengths while amounts are missing;
// once every amount is filled in, the bars are worked out from the amounts.
export const BUDGET_2027: { item: string; amount: number | null; placeholderShare: number }[] = [
  { item: "Coaches, paid per session", amount: null, placeholderShare: 46 },
  { item: "Balls, cones, ladders, bibs, goals", amount: null, placeholderShare: 18 },
  { item: "Football boots and shirts", amount: null, placeholderShare: 22 },
  { item: "Tournaments", amount: null, placeholderShare: 9 },
  { item: "Coach licences", amount: null, placeholderShare: 5 },
];

// ---------- The season ----------
// Planned sessions per month (twice a week). Squares on the site fill in
// as sessions are added to data/sessions.csv.
export const SEASON_PLAN: { month: string; planned: number }[] = [
  { month: "2027-03", planned: 8 },
  { month: "2027-04", planned: 8 },
  { month: "2027-05", planned: 8 },
  { month: "2027-06", planned: 8 },
  { month: "2027-07", planned: 8 },
  { month: "2027-08", planned: 8 },
  { month: "2027-09", planned: 8 },
  { month: "2027-10", planned: 8 },
  { month: "2027-11", planned: 8 },
  { month: "2027-12", planned: 8 },
];
