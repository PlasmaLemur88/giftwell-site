# Giftwell Admin Preview — Handoff

This doc carries forward design decisions and in-progress work from prior Claude Code sessions so a new session can pick up cleanly. Read this first.

## Context

The user (Brandon) is designing the Giftwell merchant admin so it feels Shopify-native — modeled on **Alia** (a Shopify app whose pattern matches Shopify's own analytics). The deliverable is a clickable prototype at `/admin-preview` that doubles as a code reference for the dev (Gustavo) who'll build it for real.

**Branch**: `claude/giftwell-continue-P4dEd`
**Live preview**: every push auto-deploys via Vercel. URL is in the GitHub repo's right sidebar → Deployments → Preview, or in vercel.com/dashboard → giftwell-site.
**Production** is `giftwell-site-plum.vercel.app` (on `main`, the marketing site) — don't confuse with the admin preview.

## Design philosophy

1. **Shopify-native means Alia's style.** Alia uses Shopify Analytics patterns: white cards with subtle borders, thin neutral line charts (not green-filled), single global date filter, horizontal metric strips.
2. **Split Home (pulse) from Reports (drill-downs).** Home is the daily "what's happening" view. Reports is where merchants dig in. Don't put everything on one page — Alia and Shopify both split this way.
3. **Mock Shopify chrome.** The admin preview lives at `/admin-preview` inside a *mocked* Shopify admin shell (dark top bar, light sidebar with Home/Orders/Products/etc., then "Apps" section with Giftwell). In production this chrome comes from Shopify's App Bridge — the mock is just for visual context.
4. **Onboarding is an inline card on Home, not a separate page.** When setup is incomplete, the dashboard shows an inline setup card (Alia announcement-card pattern). When complete, the slot rotates through product news. There is no `/setup` route — it redirects to Home.
5. **Customize is its own page.** Branding, email templates, and unwrap effects live at `/admin-preview/customize` so merchants iterate without rerunning setup.

## Architecture

```
/admin-preview                          Dashboard (Home pulse)
/admin-preview/reports                  Reports landing (Alia-style card grid)
/admin-preview/reports/[slug]           Individual report (placeholder for now)
/admin-preview/customize                Brand + email customization
/admin-preview/setup                    Redirects to /admin-preview
```

**Outer shell** (provided by `Shell.tsx` in the layout):
- Dark Shopify-mock top bar (logo, search, store, notifications, profile)
- Light gray Shopify-mock left sidebar (Home, Orders, Products, Customers, Marketing, Discounts, Content, Markets, Analytics → Sales channels → **Apps** with Klaviyo + **Giftwell** active → Settings)
- Giftwell sub-nav expanded when active: Dashboard, Reports, Customize

**Inner Giftwell chrome** (provided automatically on every admin-preview page):
- `AppEmbedStrip` — thin light-gray strip with "< Giftwell" + ⋯
- `MiniHeader` — white inset card with G icon + "Giftwell" wordmark + "Use the menu on the left to navigate" + green Live pill + store dropdown

## Component inventory

All in `app/admin-preview/components/`:

| Component | Purpose |
|---|---|
| `Shell.tsx` | Mock Shopify admin chrome (top bar + sidebar + content area) |
| `shell.module.css` | Shell styles (CSS module, reliable across HMR states) |
| `AppEmbedStrip.tsx` | Thin "< Giftwell + ⋯" strip at top of content area |
| `MiniHeader.tsx` | White inset card: G icon + wordmark + hint + Live + store |
| `InlineSetupCard.tsx` | Hosts the 18-frame Polaris wizard inside an Alia-style card; shown on Home when setup incomplete |
| `AnnouncementCard.tsx` | 5-slide rotating product news card; shown on Home when setup complete |

Plus `frames.tsx` (the 18 Polaris-based onboarding frames, used by `InlineSetupCard`).

## File map

```
app/admin-preview/
├── layout.tsx                          AppProvider + Shell wrapper
├── page.tsx                            Dashboard (Home)
├── frames.tsx                          18 Polaris onboarding frames
├── components/
│   ├── Shell.tsx                       Shopify-mock outer chrome
│   ├── shell.module.css
│   ├── AppEmbedStrip.tsx
│   ├── MiniHeader.tsx
│   ├── InlineSetupCard.tsx
│   └── AnnouncementCard.tsx
├── reports/
│   ├── page.tsx                        Reports landing (uses reports.module.css)
│   ├── reports.module.css
│   └── [slug]/
│       └── page.tsx                    Individual report placeholder
├── customize/
│   └── page.tsx                        Customize (Polaris-based)
└── setup/
    └── page.tsx                        Redirects to /admin-preview
```

## Decisions log

Things we ruled out (and why):

- **No "Dashboard / Welcome back..." page title** — Alia doesn't have one; the card below is the entry. Removed in Chunk 1.
- **No Plan Usage card on Home** — belongs in Settings → Plan per Shopify. Removed in Chunk 1.
- **No horizontal-bar-per-stage funnel chart on Home** — not a Shopify pattern. Funnel lives on Reports → Funnel. (Still on Home as of Chunk 1; removed in Chunk 3.)
- **No green-filled sparklines** — Shopify uses thin neutral blue/teal *line* charts. Delta number alone gets the green/red. (Chunk 2 fix.)
- **No 2×2 metric grid on Home** — Alia/Shopify use a horizontal strip of 4. (Chunk 2 fix.)
- **No per-card "Last 30 days" badges** — single global filter at the section level. (Chunk 2 fix.)
- **No "Add filters" row on Home** — filters belong on Reports drill-downs, not the daily pulse. (Chunk 2 fix.)
- **No big primary line chart on Home** — that belongs on Reports → Revenue. Home is pulse only.
- **No /setup as a separate page** — onboarding is inline on Home (announcement-card pattern). Redirects to Home.
- **Cursive G brand image as big logo** — `g-black-bold.png` is a square brand mark, not a wordmark, so it stretched weird. Replaced with a small purple 24×24 G square + "Giftwell" wordmark text.

## Chunk progress

Dashboard rebuild was broken into 4 chunks. Status:

### ✅ Chunk 1 — Cleanup (DONE, commit `ec5381c`)
- Removed redundant page title
- Shrunk purple G icon blocks (setup + announcement cards) from 120×120 → 80×80
- Deleted Plan Usage card
- Bumped card borders from `#ececef` → `#dcdcde` with subtle box-shadow across the dashboard (matches the Reports treatment)

### ⏳ Chunk 2 — Metric strip rebuild (NEXT)
Replace the 2×2 metric grid with a Shopify-native horizontal strip:
- 4 metrics in a row (not 2×2)
- Each card: icon top-left, big number, label, **delta pill top-right** (green/red, matches Figma)
- **Sparklines**: either drop them (Figma Home doesn't have them) or make them thin neutral blue lines with no fill
- **One global** "Last 30 days ▾" filter at the section level, not per-card
- Drop the existing "Add filters" row from Home (filters belong in Reports)

**Open question** (needs Brandon's call before building):
- Metric #4 — **Opt-in rate** (a %) or **New email subscribers** (a count)? Figma showed the count. Claude argued the rate is more glance-friendly. Brandon to decide.

### ⏳ Chunk 3 — Recent Orders + Activity panels
- **Remove** the Recipient funnel chart from Home (it lives on Reports → Funnel)
- **Add** a Recent Orders panel (3-5 latest, gifter avatar + name + ID + count + status pill + "View all →")
- **Add** a Recent Activity feed panel (claims, opt-ins, shipped events with timestamps)
- Side-by-side layout, matching Brandon's Figma Dashboard Home

### ⏳ Chunk 4 — Quick actions row
Three tiles at the bottom of Home:
- View Gift Page
- Share Link
- Open Reports (replaces Brandon's Figma "Download Report" since we have a Reports section now)

## Other in-flight work

- **Reports landing** (`/admin-preview/reports`) — Alia-style card grid with 9 reports (Revenue, Funnel, Attribution, Campaigns, CAC, Recipients, Gifters, Email, Operations) + a dashed "Create a report" card under a "My reports · Early access" section. Cards link to `/admin-preview/reports/[slug]` which currently shows a placeholder. **Next step after dashboard**: build out at least Revenue and Funnel as real report views.
- **Customize page** (`/admin-preview/customize`) — already built (Polaris-based, with Recipient email / Digital unboxing tabs). No changes pending unless Brandon flags something.

## What's NOT built but discussed

These came up in conversation but aren't built yet — flag for future chunks:

- **Bundles management page** (`/admin-preview/bundles`) — Brandon's Figma showed it. Active/Draft/Archived tabs, card grid, "+ Create Bundle".
- **Orders management page** — distinct from Reports. Table with All/Scheduled/Sent/Delivered tabs.
- **Gifters page** — list + drill-in profile (Brandon's Figma had both).
- **Settings → Pricing** — Experience Fee + Volume Discounts + Gift Settings (Brandon's Figma had this).
- **Email Templates page** — Polaris-style editor with Gift Notification / Reminder / Shipped / Delivered tabs.
- **Marketing > Recent Opt-ins page** — already had a Reports view but Brandon's Figma had a separate management page too.
- **Real report detail views** — currently all 9 reports go to a placeholder. Build out Revenue and Funnel first (clearest specs).

## Visual reference

`/docs/screenshots/` has Playwright-captured screenshots of the 18 onboarding frames + 2 Customize tabs from a prior session. View `/docs/admin-preview-gallery.md` on github.com to see them rendered inline.

## Tips for the next chat

1. **Read this doc first.** Then check the latest commit messages on `claude/giftwell-continue-P4dEd` for any pushes since this was written.
2. **Verify direction with Brandon before big rewrites.** He cares about Shopify-native match — if something doesn't look like Alia or Shopify Analytics, it's wrong.
3. **The mock Shopify chrome is intentional** for the prototype. Real implementation uses Shopify App Bridge — flag this distinction to Brandon if he asks about production.
4. **Styled-jsx HMR has been flaky.** The Reports landing was converted to a CSS module (`reports.module.css`) for reliability. Consider converting other pages too if HMR issues recur.
5. **All data is mocked** in component files. Real implementation needs API calls + state management.
6. **Don't build the full admin** in this prototype. The goal is a *handoff reference* — enough fidelity to communicate intent to Gustavo, not production code.

## Quick start for new chat

```
# In new chat:
git status
git log --oneline -10
# Read docs/HANDOFF.md
# Continue with Chunk 2 of the dashboard rebuild (see above)
```
