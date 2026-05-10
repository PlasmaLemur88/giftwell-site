# Giftwell Merchant Admin — Design Direction

Hand-off doc for Gustavo. Covers (1) the 12-step onboarding wizard already designed in Figma and (2) the post-launch merchant admin shell, which should adopt Alia's visual language.

References:
- Wizard frames: see Figma (Brandon)
- Admin shell reference: Alia dashboard (top bar + announcement card + analytics layout)

---

## 1. North star

- Calm, monochrome canvas with a single purple accent
- Generous whitespace, soft cards, rounded everything
- One primary action per screen — never two
- Persistent live preview during configuration
- During onboarding, the gifter/merchant should never feel like they're doing work

---

## 2. Design tokens

### Color
| Token | Value (suggested) | Usage |
| --- | --- | --- |
| canvas | `#F5F5F7` (light gray) | Admin background |
| surface | `#FFFFFF` | Cards, content area |
| sidebar | `#0B0B0F` (near-black) | Onboarding sidebar |
| text-primary | `#111` | Headlines |
| text-secondary | `#6B6B73` | Body, helper |
| accent-from / accent-to | `#7C5CFF` → `#A855F7` | Gradient CTAs, progress bar |
| status-live | `#16A34A` | Live pill, success rows |
| status-warn | `#F59E0B` | Banner |
| status-danger | `#DC2626` | Failed states |
| preview-frame | `#0E1B2C` | Phone mockup background (dark blue) |

### Type (system sans, e.g. Inter)
| Style | Size / weight | Notes |
| --- | --- | --- |
| Eyebrow | 11px / 600 / uppercase / tracked +0.08em | Step header |
| Page title | 26px / 600 | "Almost there! Review your setup" |
| Page subtitle | 15px / 400 / secondary | One line under title |
| Card title | 16px / 600 | "Email Content" |
| Body | 14px / 400 | Default |
| Helper | 12-13px / 400 / secondary | Sub-copy under labels |

### Radius
- Cards: 12px
- Inputs / chips: 10px
- Pill buttons: full
- Phone preview frame: 36px

### Spacing (8pt grid)
- Card padding: 24-32px
- Section gap inside card: 24px
- Form row gap: 16px
- Outer page padding: 32px

---

## 3. Layout shells

### 3a. Onboarding shell (during setup)

```
┌─────────────────────────────────────────────────────────────┐
│ STEP X OF 12 — SECTION NAME              (centered eyebrow) │ ← dark band
├──────────┬──────────────────────────────────────────────────┤
│  SIDEBAR │  WHITE CONTENT CARD                              │
│   240px  │   • title + subtitle                             │
│          │   • cards / sections                             │
│  logo    │   • optional LIVE PREVIEW pinned right (~360px)  │
│  step    │                                                  │
│  nav     │                                                  │
│  ...     │                                                  │
│  help    │                                                  │
│  pill    │   ┌──────────────────────────────────────┐       │
│          │   │ ← Back        Skip for now │Continue→│       │
│          │   └──────────────────────────────────────┘       │
└──────────┴──────────────────────────────────────────────────┘
```

- Sidebar: 240-280px, sticky, full-height, near-black
- Content max width: ~1100px centered
- Bottom action bar lives inside the white card, sticky to viewport bottom

### 3b. Admin shell (post-launch — Alia inspired)

```
┌─────────────────────────────────────────────────────────────┐
│ [Logo]  Use the menu on the left to navigate    [✓Live][▼Store][⋯] │ ← sticky, white
├──────────┬──────────────────────────────────────────────────┤
│ NAV      │  CANVAS (light gray)                             │
│ Dashboard│   ┌──────────────────────────────────────────┐   │
│ Campaigns│   │ Announcement Card (rotates, dots)        │   │
│ Orders   │   └──────────────────────────────────────────┘   │
│ Recipnts │   Analytics  [Last 30 days▼] [Compare▼] [⚙][⋯] │
│ Reports  │   ┌─────────┬─────────┬─────────┬─────────┐     │
│ Integ.   │   │ Metric  │ Metric  │ Metric  │ Metric  │     │
│ Settings │   └─────────┴─────────┴─────────┴─────────┘     │
└──────────┴──────────────────────────────────────────────────┘
```

- Top bar: white, ~64px, sticky. Logo left, optional center label, right cluster: `Live ✓` pill (green) + store dropdown + `⋯` overflow.
- Sidebar nav items (per call): Dashboard, Campaigns, Orders, Recipients, Reports, Integrations, Settings.
- Content lives on light gray with rounded white cards (12px) and generous gaps.

---

## 4. Component inventory

| Component | Where it appears | Notes |
| --- | --- | --- |
| `StepHeader` | Top of every wizard step | Centered eyebrow on dark band |
| `Sidebar` | All onboarding steps | Logo, step indicator + progress bar, optional numbered nav, help pill |
| `HelpPill` | Sidebar bottom | Purple gradient, "Need help? — We're online now", chat icon, green dot |
| `TopBar` | All admin pages | Logo, Live pill, store dropdown, overflow |
| `Card` | Everywhere | 12px radius, optional title + subtitle, optional tabs |
| `CardTabs` | Branding step | Basics / Backgrounds / Effects / Themes |
| `ChoiceGrid` | Welcome, Catalog, Pricing, Marketing | 2-3 col radio/checkbox cards with icon, title, sub-copy, optional badge |
| `ChipPickerRow` | AI Background Generator | Pill chips, wraps |
| `Toggle` | Many steps | iOS-style, gradient on |
| `Slider` | Effects intensity | With trailing % readout |
| `GradientCTA` | AI generation | Full-width purple gradient, sparkle icon |
| `PrimaryButton` | Continue, Use This, View | Filled black pill, ~40px |
| `SecondaryButton` | Back, Learn more | White outline pill |
| `LinkButton` | Skip for now, + Add tier | Inline blue/violet text |
| `LivePreviewPanel` | Steps 4, 6, 8 | Phone mockup pinned right, optional metric callout below |
| `EmailPreviewPanel` | Step 6 | Inbox sender row + gift card preview |
| `TipCallout` | Several steps | Soft pastel bg, icon + bold title + sub-copy |
| `ChecklistRow` | Review step | Green check + title + sub-copy in a green-tinted row |
| `MetricCard` | Admin dashboard | Title + subtitle + big number + sparkline + in-card range |
| `AnnouncementCard` | Admin top of page | Logo, progress dots, eyebrow + title + body, outline + filled buttons |
| `StatusPill` | Top bar | Green check + "Live" |
| `StoreSelector` | Top bar | Dropdown showing current store name |

---

## 5. Wizard step-by-step

12 steps total. Sidebar shows numbered list with active = purple filled, complete = green check, pending = gray outlined.

| # | Step | Key blocks | Live preview? |
| --- | --- | --- | --- |
| 1 | Welcome | Goals (multi), Buyer status (single), Volume (single). "Skip setup" link top-right. | No |
| 2 | Catalog | Tip callout. Approach picker (Full / Curated / Both, "Recommended" badge). Search + product grid (multi-select with check chips). Sticky footer "X products selected" + "Create Bundle →". | No |
| 3 | Pricing | Fee strategy (Pass / Absorb / Split). Volume discount toggle + tier rows (qty + % off + remove). Right: dark Example Order panel with line items + green Your Revenue callout. | Yes (calc panel) |
| 4 | Branding | Tabs: Basics / Backgrounds / Effects / Themes. Brand Identity card. Brand Colors. Background Library/Upload/AI Generate. Effects & Particles + intensity slider + Lottie upload link. | Yes (phone) |
| 4a | AI Background Generator (modal/sub-step) | Prompt textarea, preset chips, gradient "✨ Generate 4 Options" CTA, 4 thumbnails (selectable), Regenerate / Adjust prompt buttons, gold particle overlay toggle. | Yes |
| 5 | Themes | 6-card picker: Luxury Dark, Holiday Festive, Celebration, Minimal Light, Warm & Cozy, Build Your Own. Each shows brand banner preview with Unwrap button. Tip: themes can be changed per campaign. | Inline (each card) |
| 6 | Email Templates | Email Settings (From name, Subject with `[[Sender Name]]` tokens, Preview text). Email Content (Headline, Body, Button text, Footer). Additional Emails toggles (Reminder 7d, Shipped, Delivered). Send test email link. | Yes (email) |
| 7 | Integrations | "Why connect Klaviyo?" tip. Email Marketing card: Klaviyo / Mailchimp / Omnisend rows with Connect or Configure (Connected ✓ state in green pill). Expandable Klaviyo Settings: toggles + default list + tags. | No |
| 8 | Marketing (Opt-In) | Growth tip ("$ When Sarah sends 200 gifts..."). Opt-In Settings (enable, where to show: Claim Form / Unwrapping Page two-card picker, checkbox text, pre-check toggle, EU double opt-in toggle, privacy URL). What happens on opt-in (Klaviyo list, tags, welcome flow). | Yes (claim form) |
| 9 | Landing Page | TBD — needs design. Should generate the `acmestore.com/gift` page and provide nav/footer placement options. | TBD |
| 10 | Support | TBD — needs design. Likely concierge enable, contact info, business hours, FAQ. | TBD |
| 11 | Review | Checklist (green rows with title + sub-copy: Catalog, Pricing, Branding, Klaviyo, Marketing opt-in, Landing page, Support). "Test the experience" buttons (Preview gift page / Send test gift / Preview recipient email). Right: gift page preview with browser chrome. Primary CTA: gradient "🚀 Launch Gift Page". | Yes (browser preview) |
| 12 | Launched | Party emoji bubble, "You're live!", URL with Copy, Open Gift Page (black) + Go to Dashboard (outline). Three next-step cards: Book strategy call / Download Ads Playbook / Join Slack community. Sidebar shows all green + "Complete!" | No |

---

## 6. Interaction notes

- **Skip for now** appears next to Continue on optional steps (Catalog, Integrations). Steps 1, 11, 12 only have Continue / Launch / Open.
- **Live preview** updates live as the user changes settings (debounce 200-400ms).
- **Volume discount tiers** are sortable by qty asc; adding a tier appends a row that can be edited inline.
- **Theme selection** in Step 5 should pre-fill Branding (Step 4) — show a confirm if Step 4 was already customized: "Replace your custom branding with this theme?"
- **AI Background Generator** is a sub-step inside Branding, not in the sidebar. Returning preserves the selection.
- **Help pill** opens a chat tray (floats from bottom-right post-launch in admin).

---

## 7. Admin shell — what to copy from Alia

What to take directly:
- Sticky white top bar with logo, optional center label, right cluster (Live status, store selector, overflow `⋯`)
- Light gray canvas, rounded white cards with 12-32px padding, generous gaps
- Announcement card pattern (rotating with dot indicator) for product news / upsells
- Header row above analytics: title + date range pill + compare pill + settings + overflow

What to adapt for Giftwell:
- Use Giftwell's purple gradient as the only accent (Alia uses purple too — works)
- Sidebar nav items per call notes: Dashboard, Campaigns, Orders, Recipients, Reports, Integrations, Settings
- Status pill ties to gift page deploy state (Live / Paused / Draft)

---

## 8. Open decisions

- [ ] **Steps 9 & 10** (Landing Page, Support) — need design
- [ ] **Theme vs. Branding precedence** — does selecting a theme override Step 4 customization?
- [ ] **Live pill semantics** — does "Live" mean gift page deployed, or merchant has active campaigns, or both?
- [ ] **Announcement card** — owned by us (rotation managed in admin) or pulled from a CMS feed?
- [ ] **Help pill placement** post-launch — sidebar bottom (during onboarding) vs. floating bottom-right (in admin) vs. both
- [ ] **Step count consistency** — earlier mocks showed `/10`; canonical is `/12`. Make sure all step headers say `/12`.

---

## 9. What to leave out for v1

- Polaris adoption (you already use Polaris in the embedded admin; this spec covers the standalone marketing/admin surface where Polaris would feel out of place).
- React Email migration (deprioritized per Slack — current email customization is fine).
- Email template builder (still uses current customizable system; this wizard step is config only).
