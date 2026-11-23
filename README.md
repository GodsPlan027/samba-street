# Samba Street website

Website for Stichting Samba Street, a football academy at Nkazimlo Primary School in Khayelitsha, Cape Town. Built with [Astro](https://astro.build) as a static site.

The homepage tells one story along a timeline: what we saw (November 2026), where we are now (December 2026, with the start budget and a donate button), the plan from March 2027, and how to follow the season. Other pages: Donate, Where it goes (every euro and every session), About the foundation, and the Journal.

## Run it locally

```sh
npm install
npm run dev      # open http://localhost:4321
npm run build    # builds the site into dist/
npm run preview  # preview the built site
```

## Where to edit things

| What | File |
| --- | --- |
| Foundation details (KvK, RSIN, IBAN, address, board, ANBI) | `FOUNDATION` in `src/site.ts` |
| Payment links behind the donate buttons | `DONATE_LINKS` in `src/site.ts` |
| Start budget (the amounts on the homepage and Where it goes) | `START_BUDGET` in `src/site.ts` |
| Budget 2027 (the bars on the homepage and Where it goes) | `BUDGET_2027` in `src/site.ts` |
| Planned sessions per month (the squares) | `SEASON_PLAN` in `src/site.ts` |
| Money in and out, shown on the site | `data/finances.csv` |
| Training log, shown on the site | `data/sessions.csv` |
| Contact email, site description | `src/site.ts` |
| Colors and font | top of `src/styles/global.css` |
| Homepage text | `src/pages/index.astro` |
| Other pages | `src/pages/donate/`, `src/pages/where-it-goes.astro`, `src/pages/foundation.astro` |
| Donate box (monthly/once, amounts) | `src/components/DonateBox.astro` |
| Voice message at the bottom (the Michael Jackson quote) | text in `src/pages/index.astro`, player in `src/components/VoiceNote.astro` |
| Journal posts | In the browser via Pages CMS (see [Journal](#journal) below). Files: `src/content/journal/` (text), `src/assets/journal/` (photos) |
| Journal pages and design | `src/pages/journal/` (list and post pages), "From the journal" in `src/pages/index.astro` |
| Header and footer | `src/components/SiteHeader.astro`, `src/components/SiteFooter.astro` |
| Logo and icons | `brand/samba-street-logo.png` (full-size original), `public/images/logo.png`, `public/images/logo-128.png` (header), `public/favicon.png`, `public/apple-touch-icon.png` |

## Donating

Every donate button leads to `/donate/`. There, people choose monthly or once and an amount, and the button takes them to the payment page of the payment provider.

- The payment links go in `DONATE_LINKS` in `src/site.ts`: one per choice (monthly or once, times €10, €25, €50 or "other", where people type the amount). Make them in the payment provider's dashboard once the foundation has its bank account.
- After paying, the payment provider should send people to `https://sambastreet.charity/donate/thank-you/` (set this in the payment link's settings).
- **While a link is empty**, that button opens an email to us instead ("I'd like to give €25 a month"), so the buttons always work.
- The IBAN shows under the donate box and in the footer as soon as it's filled in.

## Money and sessions on the site

The numbers on the homepage and on Where it goes come from two files, read when the site is built:

- `data/finances.csv`: columns `date,type,amount,category,description`, like the private dashboard. `type` is `in` or `out`, and the categories are in `src/dashboard/config.ts`. Money out is listed line by line on the site. Money in only shows as a total per category, so no donor's name ever appears.
- `data/sessions.csv`: columns `date,players,minutes,drills`, one row per training session. Each session fills a square. Write the number of players, never names.

A mistake in either file (for example a date the site can't read) stops the build, so wrong numbers never go online; the old version stays up until it's fixed. The private dashboard still reads the Google Sheet. Copy new rows into `data/finances.csv` to show them on the site.

## Going live after the registration

The new site is on the branch `fundraising`, and online for testing at **https://test.sambastreet.charity** (hidden from search engines). The live site on sambastreet.charity is still the old one, from `main`. Once Stichting Samba Street is registered:

1. Fill in `FOUNDATION` in `src/site.ts`: KvK number, RSIN, IBAN, address and board. Set `anbi: true` only once the Belastingdienst has granted ANBI status.
2. Fill in the payment links in `DONATE_LINKS`, and the amounts in `START_BUDGET` and `BUDGET_2027`. The bars then follow the real amounts (until then they use the proportions from the design, `placeholderShare`).
3. Check everything on the test site.
4. Merge `fundraising` into `main` and push. The site on sambastreet.charity updates within a few minutes.
5. Afterwards, delete the test repo and the `test` DNS record (see below), so nobody else can take over that address.

### The test site

- It's a copy of this repo, `Beekiii/samba-street-test`, published with GitHub Pages on `test.sambastreet.charity`.
- To update it, push the branch there: `git push test fundraising:main`. It rebuilds in about a minute.
- The repo variable `NOINDEX=1` adds a "noindex" tag to every page, so search engines skip the test site. The live site doesn't have that variable.
- DNS at Namecheap: a `CNAME` record `test` pointing to `beekiii.github.io.`

## Photos

The photos in `src/assets/site/` are placeholders until the academy has its own photos. The site makes smaller versions for phones automatically. Replace a photo by keeping the same file name. Only use photos of kids with written permission from their parents.

| File | Used for | Source | License |
| --- | --- | --- | --- |
| `hero.jpg` | Top of the homepage | Thato Moiketsi, Pexels | Pexels License (free) |
| `training.jpg` | November 2026 | [Pexels (photo 28735311)](https://www.pexels.com/photo/28735311/) | Pexels License (free) |
| `tyres.jpg` | November 2026 | [Pexels (photo 6156594)](https://www.pexels.com/photo/6156594/) | Pexels License (free) |
| `ball.jpg` | November 2026 | [Pexels (photo 701773)](https://www.pexels.com/photo/701773/) | Pexels License (free) |
| `boots.jpg` | No boots, no match | [Pexels (photo 38468657)](https://www.pexels.com/photo/38468657/) | Pexels License (free) |
| `khayelitsha-centre.jpg` | March 2027 | Andrea Grips, [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Khayelitsha_Football_for_Hope_Centre.jpg) | CC BY-SA 3.0 – credit required |
| `tournament.jpg` | Tournaments | Pexels (photo 38717055) | Pexels License (free) |

The Wikimedia photo needs a credit, which is in the homepage footer. Remove that line once the photo is replaced.

## Journal

News and stories live at **https://sambastreet.charity/journal**. Posts are written in the browser with [Pages CMS](https://pagescms.org), a free editor that saves straight into this GitHub repo. No code needed.

The Journal stays off the website until the first post is published: until then there is no /journal page, no Journal link in the header or footer and no "From the journal" block on the homepage. Publishing the first post (with **Draft** off) switches all of it on automatically, so keep **Draft** on while you're trying things out.

### One-time setup

1. Go to https://app.pagescms.org and sign in with the GitHub account that owns the repo.
2. When asked, install the Pages CMS app on the `samba-street` repository (only that repo is needed).
3. Open **samba-street**. You will see **Journal** in the menu.

### Write a post

1. Open **Journal → Add an entry**.
2. Fill in:
   - **Title**: also becomes the web address, for example `/journal/week-one-of-training/`. Changing the title later doesn't change the address.
   - **Date**: today by default. Posts are sorted newest first.
   - **Summary**: one or two sentences for the list and for link previews (WhatsApp, Facebook and so on).
   - **Cover photo**: the big photo at the top of the post. A landscape photo works best.
   - **Cover photo description**: a few words on what the photo shows, for people who can't see it.
   - **Text**: the post itself. To add a photo between paragraphs, type `/` and choose **Image**.
3. Click **Save**. The site is updated within 1–2 minutes.

To save a post without showing it yet, turn on **Draft**. Turn it off and save again to publish. Editing or deleting a post works the same way: open it, change it and save.

### Photos

- Use JPG or PNG. iPhone HEIC photos don't work. Most phones convert to JPG automatically when you upload from the browser.
- No need to make photos smaller first: the website automatically makes small versions for phones. The original upload is kept in the repo.
- Only use photos of kids with written permission from their parents.
- **Turn off location tagging** on the phone you use for academy photos (iPhone: Settings → Privacy & Security → Location Services → Camera → Never; Android: camera settings → Location tags off). Phone photos often contain where they were taken, and the original files are visible in the public GitHub repo. The photos shown on the website don't contain this.

Videos are a later step: they will most likely be embedded from YouTube rather than uploaded.

### How it works (for developers)

- Settings for the editor: `.pages.yml`. Fields must match the schema in `src/content.config.ts`.
- Posts are Markdown files in `src/content/journal/`. Photos are in `src/assets/journal/` and are referenced with relative paths (`../../assets/journal/…`), so Astro resizes them. A small plugin in `astro.config.mjs` gives photos inside the text several sizes.
- Drafts are filtered out in `src/journal.ts`.
- With no published posts, no Journal pages are built at all. That's why the list page is `src/pages/journal/[...list].astro`: a normal page is always built, but this one's `getStaticPaths` can return nothing.
- The empty `.gitkeep` files in `src/content/journal/` and `src/assets/journal/` keep those folders on GitHub while they're empty. Don't delete them: without the photo folder, Pages CMS can't upload photos.
- If you delete the last post locally, run `npx astro build --force` once to clear Astro's cache. GitHub always builds from scratch.

## Finance dashboard (private)

A dashboard of all money in and out lives at **http://localhost:4321/dashboard** while `npm run dev` is running. It is **not** part of `npm run build`, so it never goes online by accident.

- **Add a transaction:** add a row to the Google Sheet [Dashboard](https://docs.google.com/spreadsheets/d/1jW_o8oaL0nrQw0lfJrCPp-zSpwBL1B76VVl7PGaWoM4/edit) and refresh the dashboard.
- **Columns:** `date`, `type` (`in` or `out`), `amount`, `category`, `description`.
- **Categories:** money in is `Individual donation` or `Fundraising event`. Money out is `Training` or `Gear`. Change them in `src/dashboard/config.ts`.
- Rows with mistakes are listed at the top of the dashboard and left out of the totals until fixed.

### One-time setup: let the dashboard read the sheet

The sheet stays private. The dashboard logs in with a Google "service account", a robot account that you give read-only access to this one sheet.

1. Go to https://console.cloud.google.com and create a project (e.g. "Samba Street").
2. In that project, open **APIs & Services → Library**, search for **Google Sheets API** and click **Enable**.
3. Open **IAM & Admin → Service Accounts → Create service account**. Name it e.g. "finance-dashboard" and skip the optional role steps.
4. Click the new service account, open the **Keys** tab, choose **Add key → Create new key → JSON**. A file downloads.
5. Rename that file to `google-service-account.json` and put it in this project folder, next to `package.json`. **Never share this file or put it online.** It is already in `.gitignore`.
6. Copy the service account's email (ends in `.iam.gserviceaccount.com`). In the Google Sheet, click **Share**, paste it and give it **Viewer** access. Untick "Notify people".
7. Refresh the dashboard.

If step 4 says key creation is blocked, your Google Workspace has a security policy that blocks service account keys. Either create the Cloud project with a personal Gmail account instead (sharing the sheet with the service account still works), or ask your Workspace admin to allow keys.

To go back to a local CSV file, set `SHEET_ID = ""` in `src/dashboard/config.ts`. The dashboard then reads `data/finances.csv`.

Later, donors will be able to log in and see this page. That needs a host with login protection; the switch is in `astro.config.mjs`.

## Online

The site is live at **https://sambastreet.charity**, hosted for free on GitHub Pages.

- **Publish a change:** commit and push to `main`. GitHub builds and publishes the site in about a minute (see the Actions tab of the repo).
- **Repo:** https://github.com/GodsPlan027/samba-street (public, so never commit secrets).
- **Domain:** bought at Namecheap. DNS (Advanced DNS tab): four `A` records for `@` pointing to `185.199.108.153`, `185.199.109.153`, `185.199.110.153` and `185.199.111.153`, and a `CNAME` record `www` pointing to `godsplan027.github.io.`
- The file `public/CNAME` tells GitHub Pages which domain to use. Don't delete it.

## Still to fill in

- Foundation details, payment links and start budget amounts (see [Going live after the registration](#going-live-after-the-registration))
- Training days and times at Nkazimlo Primary School (agreed with the school)
- Our own photos, to replace the placeholders
