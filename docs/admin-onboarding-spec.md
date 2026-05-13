# Giftwell Admin Onboarding: Direction Spec

**For:** Gustavo
**From:** Brandon
**Re:** Restyling onboarding to fit Alia's Shopify-native pattern

---

## TL;DR

Keep most of the questions from the existing 10-step Figma wizard, but **one question per frame**, frames stay short (no scroll). **Don't keep the wizard chrome.** Reframe as a single inline announcement-card pinned at the top of the merchant home, modeled on Alia's "Introducing Prism AI" hero card.

**Branding (logo, colors, background, effects) and email customization do NOT live in onboarding**, they live on a separate **Customize** page in the dashboard so merchants can iterate without re-running setup.

Non-blocking. Dismissible. Resumable. Native to Polaris and the Shopify admin frame.

---

## Why this pattern

- Same "don't block the buyer" philosophy applied to the merchant: don't trap them in a takeover wizard
- One pattern to build instead of a parallel wizard surface
- Lives alongside the dashboard so merchants can poke around while setting up
- Matches what Alia already does, feels native, not like a plugin

---

## Pattern anatomy

```
┌─ Polaris Page ──────────────────────────────────────────────┐
│                                                             │
│  ┌─ Onboarding Card ─────────────────────────────────────┐  │
│  │  ●●●○○○○○○○   ← progress dots, one per frame         │  │
│  │                                                       │  │
│  │  Step 2 of 10                                         │  │
│  │  Catalog setup                                        │  │
│  │  What products can gifters choose from?               │  │
│  │                                                       │  │
│  │  [ tile picker / form fields for this frame ]         │  │
│  │                                                       │  │
│  │  Skip setup              ← Back     Continue →        │  │
│  └───────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌─ Analytics ──────────────────────────────────────────┐   │
│  │  (regular dashboard below)                            │   │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### Rules

**Keep:**
- Question content for goals / buyer status / volume / catalog / pricing / integrations / opt-in / landing / support
- One question per frame, Welcome's three questions become three frames, Pricing splits into Fee + Volume, etc. Frames stay viewport-short.
- Tile-picker pattern with title + helper + optional `Most common` / `Recommended` Polaris `Badge`
- "Skip for now" escape hatch, present from frame 1
- Final "You're live" success state with share URL + next-step links

**Kill:**
- Dark device-frame wrapper (Shopify's chrome already wraps us)
- Custom left-rail step sidebar (replaced by `ProgressBar` + counter "Welcome · Step 2 of 18 · 11%")
- Stacked tinted callouts (no `Pro tip` / `growth engine` / 💰 / 💡 boxes, replace with inline subdued text where it actually adds info)
- Live-preview pane pinned to every frame (only Pricing keeps a side panel, since the order calculator is load-bearing for the decision)
- Emoji in titles
- Gradient launch button (final CTA is a normal `Button variant="primary"`)
- Two flow variants, pick one
- **Branding frames (identity, colors, background, effects), moved to the Customize page (see below)**

---

## Frame-by-frame content (one question per frame)

Onboarding is **18 frames** grouped into 9 phases. Each frame is one question, short, no scrolling.

| # | Phase | Frame title | Input |
|---|-------|-------------|-------|
| 1 | Welcome | What are you hoping to achieve? | Multi-tile (Revenue / Customers / Brand) |
| 2 | Welcome | Do you have corporate buyers already? | Single-tile (Waiting / Some / None) |
| 3 | Welcome | Expected monthly volume? | Single-tile, 4-col, "Most common" badge on 50–200 |
| 4 | Catalog | How do you want gifters to choose products? | Single-tile (Full / Curated `Recommended` / Both) |
| 5 | Catalog | Pick products for your first bundle | Search + product grid + selection footer (only if approach != Full) |
| 6 | Pricing | How should the experience fee be handled? | Single-tile (Pass `Recommended for DTC` / Absorb) + Split 50/50 checkbox + side calculator |
| 7 | Pricing | Offer volume discounts? | Checkbox + repeatable tier rows |
| 8 | Integrations | Connect your email marketing tool | List of integrations (Klaviyo / Mailchimp / Omnisend / Postscript) with inline Connect/Configure |
| 9 | Marketing | Show a marketing opt-in? | Single-tile (Yes / No) |
| 10 | Marketing | Where should the opt-in show? | Multi-tile (Claim Form / Unwrapping Page) |
| 11 | Marketing | What should the checkbox say? | Text field |
| 12 | Marketing | Compliance settings | Pre-check checkbox + EU double opt-in checkbox + privacy URL |
| 13 | Marketing | What happens when someone opts in? | 3 checkboxes (Klaviyo list / tags / welcome flow) |
| 14 | Landing Page | Pick your gift page URL | Slug input (`acmestore.com/<slug>`) |
| 15 | Landing Page | Where should we link to it? | 2 checkboxes (nav / footer) |
| 16 | Support | Want Giftwell to handle support? | Single checkbox |
| 17 | Review | Almost there, review your setup | Green-check summary list + Preview/Test buttons |
| 18 | Launch | You're live | Copyable URL + Open Gift Page + Go to Dashboard |

**Note on branding:** Brand identity, colors, background, and effects use Shopify theme defaults at launch. Merchants tune them on the **Customize** page (see below) any time after onboarding, not as part of the gating flow.

---

## Customize page (separate dashboard surface)

Lives at `/customize` in the merchant dashboard, not in onboarding. Tabbed layout:

**Tab 1, Recipient email**
- From settings: From name, Subject line (with `[[Sender Name]]`, `[[Company]]`, `[[Recipient Name]]` variables), Preview text
- Content: Headline, Body text, Button text, Footer text
- Additional emails: Reminder (7 days) / Shipped notification / Delivered notification toggles
- Side panel: live email preview with mock sender row + branded hero + button + footer
- "Send test email to myself" link

**Tab 2, Digital unboxing**
- Brand identity: name (from Shopify theme), logo
- Brand colors: primary + secondary swatch rows (with `+ custom`)
- Background: Library / Upload / AI Generate sub-tabs, swatch grid
- Effects & particles: 6-tile picker (Sparkles / Snow / Confetti / Hearts / Stars / None) + intensity `RangeSlider` + custom Lottie upload
- Side panel: live phone-style preview of the unwrap experience

**Page-level chrome:**
- Polaris `Page` with title "Customize", subtitle, primary "Save" action, secondary "Preview" + "Send test gift"
- Auto-save on blur (no save button needed in dirty state, just status indicator)

**Why separate:**
- Merchants want to iterate on look-and-feel without rerunning setup
- Email and unboxing share the same brand inputs, co-locating them avoids duplication
- Skipped during onboarding so the path-to-launch is shorter and less intimidating

---

## States

1. **In progress**, onboarding card sits at top of merchant home. Persists across sessions.
2. **Dismissed (Skip setup)**, card collapses to a Polaris `Banner tone="info"`: "You're 30% through setup, Resume". Clicking re-expands the card to the last visited frame.
3. **Complete**, card shows the "You're live" success frame for the rest of the session, then is replaced by a normal dashboard on next load. A small "Setup complete ✓" entry appears in Settings → Onboarding for re-access.

---

## Implementation reference

The working Polaris implementation of the onboarding card and the separate Customize page lives in this repo at:

- `app/admin-preview/page.tsx`, onboarding card shell (Page, Card, ProgressBar, BlockStack, InlineStack, Button, Banner)
- `app/admin-preview/frames.tsx`, all 18 frames + the `TilePicker` primitive composed from Polaris `Box` + `BlockStack` + `Badge` + `Icon`
- `app/admin-preview/customize/page.tsx`, the Customize page (Tabs: Recipient email, Digital unboxing) with side-panel previews
- `app/admin-preview/layout.tsx`, wraps the route with `AppProvider` + imports `@shopify/polaris/build/esm/styles.css`

Run locally:

```
npm install --legacy-peer-deps
npm run dev
# visit http://localhost:3000/admin-preview
# and  http://localhost:3000/admin-preview/customize
```

These files are the source of truth for the visual + Polaris API. Copy components straight into the admin app.

## Notes / open questions for Gustavo

- **Branding lives on the Customize page, not in onboarding.** Onboarding ships with Shopify-theme defaults; merchants tune look-and-feel post-launch.
- Pricing frame's order calculator is the one place a side panel makes sense in onboarding. Do it as `InlineGrid columns={['twoThirds', 'oneThird']}` *inside that frame only*, not a global pattern.
- Customize page uses side-panel previews on both tabs (email preview + phone unboxing preview), that's where preview density belongs, not in onboarding.
- Persist `answers` to the existing onboarding state on every `Continue`. Don't wait for completion.
- Skip should NOT discard answers, it just hides the card. Resume picks up exactly where they left off.
- Final "Launched" frame replaces the card; on next session, hide the card entirely and surface re-access through Settings.
- Polaris has no first-class `Toggle`, `SettingToggle` is deprecated. Used `Checkbox` with `helpText` for binary settings, which is the current Polaris-recommended pattern.
- TilePicker is composed from Polaris primitives (`Box` + `BlockStack` + `Badge` + `Icon`) since Polaris ships no large-tile picker. Same pattern Shopify uses internally.
