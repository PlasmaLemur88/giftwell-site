# Giftwell — Developer Handoff

> A clickable Next.js prototype of the Giftwell merchant admin (and the gifting model behind it). Use it as a **visual + behavioral spec**, not as a production codebase.

**Live preview:** [https://giftwell-site-git-claude-g-99430e-brandon-theplaybooks-projects.vercel.app/admin-preview](https://giftwell-site-git-claude-g-99430e-brandon-theplaybooks-projects.vercel.app/admin-preview)

---

## 1. Read this first

This repository is a **prototype**. It's a Next.js 16 + Polaris frontend that mocks the Giftwell merchant admin experience end-to-end. No backend, no database, no auth, no real Stripe, no real Shopify integration.

Your job is to build the real Shopify app. This prototype tells you what to build and how it should look + feel. Use it as a source of truth for:

- **Information architecture** — sidebar, routes, page-level structure
- **Product model** — order hierarchy, email scheme, customization scope, pricing tiers
- **Terminology** — exact words to use in UI ("gift order" / "recipient order" / "unwrap" — never "invitation")
- **Visual design** — Polaris-native admin patterns, brand color treatment, the rim-beam hero glow, the Alia-style toggle
- **Decisions already made** — see the decision log at the bottom

---

## 2. Running the prototype

```bash
npm install
npm run dev
```

Open `http://localhost:3000/admin-preview`.

Stack:
- **Next.js 16.2.2** (App Router, Turbopack)
- **@shopify/polaris 13.9** for admin UI primitives
- **@shopify/polaris-icons** for iconography
- No database. All data is seed data in TypeScript files.

---

## 3. Repository map

```
app/admin-preview/
  page.tsx                          Dashboard (metric strip + At a glance + Recent orders/activity)
  layout.tsx                        Polaris AppProvider + Shell (sidebar + miniheader)
  setup/                            Standalone onboarding (10 frames)
  orders/                           Gift orders + Recipient orders (two-tab list, parent/child detail)
    page.tsx                          List with Gift orders ↔ Recipient orders tabs
    [id]/page.tsx                     Order detail (3 tabs: Gift order / Recipients / Activity)
    data.ts                           Seed orders + recipient generator (deterministic by order id)
  reports/                          Reports landing (9 reports)
    page.tsx                          Polaris grid of report tiles
    [slug]/page.tsx                   Placeholder for drill-down reports
  emails/                           9 transactional emails with brand color picker
  products/                         Giftable product curation + auto-include toggle
  design/                           Themes / Stock posters / GIFs / Title fonts (each with on/off + library modal)
  landing/                          Hosted landing page editor (URL slug + hero copy + sticky preview)
  settings/                         Pricing + Billing tabs (fee handling, volume discounts, plan, card, invoices)
  components/                       Shell, MiniHeader, InlineSetupCard, AnnouncementCard, AtAGlance,
                                    Toggle (Alia green), ModalBloom, rim-beam.css
  frames.tsx                        Onboarding frame components shared by setup + InlineSetupCard
docs/
  HANDOFF.md                        Claude-to-Claude handoff (ignore, it's for the AI assistant)
  admin-onboarding-spec.md          Earlier onboarding spec, mostly superseded
  admin-preview-gallery.md          Earlier visual gallery
```

---

## 4. Product model — the decisions baked in

### Order hierarchy

This is the most important thing to internalize. Every gift purchase has two levels:

1. **Gift order** (parent) — a corporate gifter pre-pays for N gifts at a budget cap per recipient. Example: Priya Patel @ Orbit Labs orders 12 gifts at $100/recipient = $1,200 total. She chooses allowed product categories, writes a personal message, picks a card theme.
2. **Recipient order** (child) — each recipient gets an email with their unique gift link, opens it, picks one item from the allowed catalog, enters their shipping address. That's a separate order that goes to fulfillment.

The merchant admin's Orders page has two top-level tabs (`Gift orders` / `Recipient orders`) so they can browse either view. Detail page (`/admin-preview/orders/[id]`) has three tabs (`Gift order` / `Recipients` / `Activity`) for the same reason.

Per-row UPPERCASE chips (`BULK GIFT · 12` / `RECIPIENT`) make the type obvious when scanning.

### Recipient lifecycle

```
Sent → Opened → Picked → Shipped → Delivered → (Subscribed)
                                                    ↑
                                          opt-in to merchant marketing
```

Plus `Bounced` for failed email delivery.

### Email scheme — 9 transactional emails

See `/admin-preview/emails`. Locked layout, three merchant-customizable surfaces (see "Brand customization" below). Templates are React in the prototype — you'll need to convert to MJML or email-safe HTML.

**5 recipient emails** (sent from `gifts@{merchant-domain}`, NOT from a Giftwell-owned domain):
- `r1` — Gift notification (the "You've received a gift" hero)
- `r2` — Reminder (7 days after r1 if unclaimed)
- `r3` — Order confirmation (after they pick)
- `r4` — Shipped
- `r5` — Delivered

**4 gifter emails** (sent from `hello@giftwell.io`):
- `g1` — Order confirmation
- `g2` — Recipient activity recap (cadence: milestones / weekly / monthly — merchant picks)
- `g3` — Wrap-up (when all recipients have claimed)
- `g4` — Cart abandonment (if gifter started but didn't finish)

Status controls per row: `Always on` (locked) / `Toggle on/off` / `Cadence` (gifter recap only).

### Brand customization scope

Merchants can customize **three surfaces only**, everything else is Giftwell-locked. This is intentional — keeps the experience consistent across merchants and avoids per-template tinkering hell.

1. **Merchant logo** — inherited from the connected Shopify store
2. **Brand color** — single hex value via a color picker modal (Polaris `ColorPicker` + hex input + 7 presets + live preview gradient strip). Drives the email hero gradient (multi-stop hue-rotated, see `artfulGradient()` in `app/admin-preview/emails/page.tsx`), accent buttons, eyebrows, progress strips.
3. **Sender display name** — e.g., "Acme Store" (the From name on recipient emails)

Three things we **explicitly rejected**:
- Per-email-template editing (every merchant gets the same 9 templates)
- Custom HTML/CSS in emails
- Multi-color brand palettes (one color, period)

### Pricing & billing

3 plans, mapped from onboarding's volume question:
- **Starter $100/mo** — <50 gifts/month
- **Growth $200/mo** — 50-500 gifts/month
- **Scale $300/mo** — 500+ gifts/month

30-day free trial. First charge happens automatically after trial.

This is **NOT** a Shopify-approved app — uses Stripe directly, not the Shopify Billing API.

### Experience fee handling

10% Giftwell fee, three options the merchant picks in onboarding + Settings:
- **Pass to gifter** (default, recommended) — 10% added at gifter checkout
- **Absorb in margin** — 10% from merchant's gross
- **Split 50/50** — 5% gifter, 5% merchant

### Catalog / product picker

`/admin-preview/products`. Merchant toggles per-product giftability. Default: auto-include new products. Inventory comes from Shopify Admin API (your job to wire up).

Gifters set "allowed categories" per gift order. Recipients only see products that are (a) giftable, (b) in the gifter's allowed categories, (c) under the budget cap, (d) in stock.

### Themes / posters / GIFs / fonts (`/admin-preview/design`)

Merchant curates which background themes, stock posters, GIFs, and title fonts are available to gifters. Master on/off per category, individual on/off per item, upload-your-own modals. Giphy is a separate toggle.

---

## 5. What's done (this prototype)

✅ End-to-end visual admin experience (every route, every modal, every state)
✅ Onboarding flow (10 frames, single continuous progress bar, plan mapping from volume)
✅ Orders list with two-tab view + per-row type chips + sortable / filterable / searchable
✅ Order detail with three-tab layout (Gift order / Recipients / Activity)
✅ 9 transactional emails with brand color picker (artful multi-stop gradient generator)
✅ Dashboard "At a glance" with 6 layperson-friendly Shopify-native report cards
✅ Hand-rolled SVG mini-vizes (sparkline, funnel bars, donut, vertical bars, compare bars)
✅ Polaris-native styling throughout, Alia green Toggle, rim-beam hero glow
✅ Reconciled analytics numbers across metric strip + at-a-glance + detail pages
✅ Em dashes purged site-wide (use periods, middots, or commas)

---

## 6. What's not done (your job)

The whole prototype is mocked. Specifically:

| Area | Status | Notes |
|---|---|---|
| **Shopify OAuth + App Bridge** | Not started | Admin needs to install via OAuth and embed in Shopify admin |
| **Shopify App Proxy** | Not started | Public landing at `/apps/giftwell/*` — see the Feno example we discussed |
| **Database schema** | Not started | Suggested entities: Order, Recipient, Gifter, BrandConfig, Plan, Subscription, EmailEvent |
| **Stripe Checkout + Billing** | Not started | We use a visual Stripe Elements mock; real implementation TBD |
| **Email sending** | Not started | Templates are React in the prototype — convert to MJML/email-safe HTML. Pick a provider (Resend/Postmark/SendGrid) |
| **Recipient unwrap/pick page** | Not started here | The `/demo` route is an earlier landing prototype, not the production design. Your design call. |
| **Shopify Admin API integration** | Not started | Product catalog, inventory sync, fulfillment writes, webhooks |
| **Auth** | Not started | All routes are public in the prototype |
| **Persistence** | None | Brand color, toggles, etc. all reset on refresh |

You have all the integration plumbing already — this list is just an inventory, not a how-to. See GitHub issues for the open product/design questions that aren't pure backend work.

---

## 7. Still open for design

These are flagged as **not finalized** — Brandon may revise:

- **`/admin-preview/landing` (hosted landing page editor)** — current version exposes URL slug + a small amount of hero copy. We're still figuring out how much customization to give merchants for the public `/apps/giftwell/send-a-gift` page (compare to the Feno example). Treat this surface as in flux.
- **Recipient unwrap/pick page** — production design hasn't been done yet
- **Gifter-side flow** — corporate gifter onboarding, dashboard, repeat-order flow, billing portal

---

## 8. Decision log

What we tried and discarded — don't re-litigate unless you have a strong reason:

- **Em dashes** — purged everywhere. Use periods, middots (`·`), or commas.
- **Per-email customization** — rejected. Three brand surfaces only.
- **Multi-color brand palettes** — rejected. One hex, period.
- **"Invitation" in admin copy** — rejected. Use "gift" / "gift email" everywhere.
- **"Occasion" field on orders** — removed. We don't capture it anywhere.
- **Quick-actions row on dashboard** (View gift page / Share / Reports) — removed. Redundant with sidebar + At a glance.
- **Polaris Modal bloom around admin modals** — removed. Replaced with traveling rim beam on the top hero card (announcement / setup) only.
- **Frame height 400px in onboarding** — too tall. Now locked at 160px so the Continue button never moves.
- **`Cost per customer` card in At a glance** — fake target, dropped.
- **Dual-line sparkline on Email card** — ambiguous, dropped for single open-rate line.
- **Subscribed column on recipient table** — moved to the activity timeline as an aggregate event.
- **"From `via Giftwell`" in recipient email sender** — wrong. Sender is the merchant's domain (`gifts@acmestore.com`).
- **Dashboard Recent orders panel showing only 4 rows** — kept, but the full Orders page now lives at `/admin-preview/orders`.

---

## 9. Getting in touch

Open a GitHub issue for product/design questions. For backend / integration choices, that's your call — pick what fits your stack.
