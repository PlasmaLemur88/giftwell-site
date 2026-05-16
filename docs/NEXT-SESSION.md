# Next-session handoff — 2026-05-15

This is the state of work in flight at the end of the 2026-05-15 session.
Read this first if you (or a fresh Claude session) want to resume.

---

## TL;DR

Two PRs open, both green CI, both with live Vercel previews:

| PR  | What                                  | Branch                              |
| --- | ------------------------------------- | ----------------------------------- |
| #13 | Gifter dashboard digital-unboxing previews + per-recipient resend | `claude/giftwell-continue-P4dEd`     |
| #14 | Admin dashboard chrome + row-layout fix                           | `claude/admin-dashboard-polish-xK2nQ` |

One **blocker on the user side**: the Feno reference screenshot isn't in
the repo. Drop it at `public/unboxings/feno-elite-oral-health.jpg` on PR
#13's branch (GitHub web UI → Add file → Upload) to make the visible Feno
preview appear. Until then the dashboard renders the navy-tinted CSS
fallback.

One **strategic decision deferred**: my review concluded the gifter
dashboards are competently built but aimed at the wrong genre — they're
dashboards, Partiful is a feed. Three direction options were offered
(restructure into a feed / restyle only / rebuild from scratch); the
question was dismissed without a pick. See "Strategic note" below.

---

## Open PRs

### PR #13 — Gifter dashboard: digital unboxing previews + per-recipient resend
- **PR**: https://github.com/PlasmaLemur88/giftwell-site/pull/13
- **Branch**: `claude/giftwell-continue-P4dEd` → `main`
- **Preview**: https://giftwell-site-git-claude-g-99430e-brandon-theplaybooks-projects.vercel.app
- **Direct routes to look at**:
  - `/gifter-dashboard-glow` — the dark/glow variant (closest to Partiful direction)
  - `/gifter-dashboard-glow/orders/oct-12-2024` — Feno-themed order with showcase banner, dev-note callout, per-recipient Copy/Resend
  - `/gifter-dashboard` — brutalist (cream/sticker) variant
- **Commits on the branch**:
  - `bb129ae` — glow variant scaffold
  - `4e4b51f` — order cards render `DigitalUnboxingPreview`
  - `d15d275` — `previewImage` seam + per-recipient resend + docs

### PR #14 — Admin dashboard polish
- **PR**: https://github.com/PlasmaLemur88/giftwell-site/pull/14
- **Branch**: `claude/admin-dashboard-polish-xK2nQ` → `main`
- **Preview**: https://giftwell-site-git-claude-a-541b1b-brandon-theplaybooks-projects.vercel.app/admin-preview
- **Commit**: `5764d14`
- **Why it's separate**: the admin polish is orthogonal to the gifter
  dashboard work in #13. Cleaner to review and merge independently. NOTE:
  the admin polish is **not** on PR #13's branch — preview #13 still shows
  the original (subtle-chrome, row-wrapping) admin dashboard. To unify:
  merge #14 to main, then sync main into `claude/giftwell-continue-P4dEd`
  (or cherry-pick `5764d14`).

---

## Pending your (user) action

1. **Upload the Feno screenshot.** Open
   https://github.com/PlasmaLemur88/giftwell-site/tree/claude/giftwell-continue-P4dEd/public/unboxings
   → Add file → Upload files → drag your screenshot → **rename to exactly
   `feno-elite-oral-health.jpg`** → commit. Vercel redeploys in ~60s and
   the Feno preview appears everywhere the order card renders + in the
   embed in `docs/digital-unboxing.md`.
2. **Pick a direction for the gifter dashboard.** See "Strategic note"
   below. Without a pick, the dashboard stays a dashboard.
3. **Decide merge order for #13 and #14.** They don't conflict. Merging
   #14 first then syncing into the #13 branch (or vice versa) decides
   which preview gets the unified state first.

---

## What was built this session

### Gifter dashboard (PR #13)

- **`DigitalUnboxingPreview` component** (`app/gifter-dashboard/components/DigitalUnboxingPreview.tsx`)
  - One shared component renders every preview on every card across both
    variants and the order-detail showcase banner.
  - Takes `design: UnboxingDesign`. When `design.previewImage` is set,
    renders the image (`object-fit: cover`) with a graceful fallback to a
    CSS scene (gift box + motif + sparkles) on image-load error.
- **`UnboxingDesign` data model** (`app/gifter-dashboard/data.ts`)
  - `theme`, `occasion`, `scene`, `box`, `lid`, `ribbon`, `accent`,
    `motif`, `message`, optional `previewImage`.
- **6 example orders** (was 3) with distinct designs — Spring Refresh,
  New Year Kickoff, Holiday Cheer, **Feno · Elite Oral Health**
  (oct-12-2024, wired to `previewImage: '/unboxings/feno-elite-oral-health.jpg'`),
  Warm Welcome, Summer Sendoff.
- **Per-recipient unboxing links + Copy / Resend actions** on every
  recipient row of both order-detail pages. Mocked tokens at
  `giftwell.link/g/<token>`, deterministic per recipient. Transient
  "✓ Copied / ✓ Resent" feedback.
- **Inline "Dev note" callout** on the order-detail pages explaining the
  production architecture so a dev opening the running app sees how to
  read what's there.
- **`docs/digital-unboxing.md`** — architecture handoff:
  - The Partiful pattern: shared design record as source of truth.
  - Three render contexts: experience (full-screen interactive) / dashboard
    card (small, non-interactive, same record) / `og:image` (server-side
    for external link previews).
  - What's mocked vs. real. Where the seams are. Reference to the Feno
    capture.

### Admin dashboard polish (PR #14)

- Metric cards + Recent orders/activity panels: bumped border (`#d4d4d8`)
  and a two-layer shadow so the cards have visible chrome on the gray
  page bg.
- Layout-critical row rules switched to `:global()` — fixes the bug where
  `<a>` rendered by `<Link>` falls back to `display: inline` because
  styled-jsx hash scoping doesn't reach inside `next/link`. With this
  fix, status pills sit right-aligned, activity timestamps have proper
  gap.
- Metric cards + recent rows wired as `<Link>` (clickable) with hover
  lift / hover bg.

---

## Strategic note — why the dashboards don't feel "Partiful enough"

(Captured here so the next session can pick this up cleanly.)

**The core finding**: I built two competent dashboards. Partiful isn't a
dashboard — it's a feed of flyers. That's structural, not cosmetic, so no
amount of restyling closes it. Specifics:

1. **The card is half-poster, half-form.** Every card is "art on top,
   metadata box below" (name, `124 recipients · $100/person`, avatar
   stack, `76% claimed`, progress bar). A Partiful card is ~90% art with
   the few details overlaid on it.
2. **Grid of small cards vs. feed of big ones.** `minmax(248px, 1fr)`
   gives 4 tiny cards a row. Small multiples read "dashboard." Partiful
   is one-or-two big cards wide, scrolling — you flip through posters.
3. **Too much analytics chrome.** Filter pills, stat row, "Your people,"
   progress bars, sidebar — every one is a step toward Mixpanel. Partiful's
   home is ~95% user-made content.
4. **The preview art is too quiet to carry a card.** `DigitalUnboxingPreview`'s
   CSS gift box is a tasteful illustration, not "the artwork is the
   point." (Why the user's instinct to feed in real Feno video/screenshots
   is the right move.)
5. **Genre.** Glow gets the *palette* gesture (dark + purple bloom) but
   executes it as generic dark SaaS. Brutalist is well-built but
   craft-fair Gumroad, not Partiful nightlife.
6. **Voice + motion.** "Welcome back Sarah!", static cards. Partiful is
   alive — animated text, gradient shifts, sparkles.

**Three options offered, decision deferred**:

- **Restructure into a feed** *(my recommendation)* — keep the routes,
  rebuild card + page grammar: full-bleed cards in a vertical feed,
  metadata overlaid, strip the dashboard widgets.
- **Restyle only** — keep the grid/structure, push type/color/motion
  harder. Faster, won't fully get there.
- **Rebuild from scratch** — throw out the glow layout and start with a
  Partiful feed as the target.

**Scope option also offered, deferred**: glow-only / glow-now-brutalist-later /
both variants.

---

## Architectural decision: Partiful's pattern, not URL scraping

When the user asked whether the dashboard preview should pull from the
unboxing link directly, the answer landed on: **don't pull from a link
at all**. Partiful doesn't either.

- The unboxing design lives as **shared data** in Giftwell's DB.
- The unboxing experience renders it full-screen and interactive.
- The dashboard card renders the *same* record through a shared component,
  smaller and non-interactive.
- For external link previews (iMessage / email forwarding a recipient's
  resend link), generate an `og:image` server-side from the same record.

`DigitalUnboxingPreview` already has the right *shape* (takes structured
design data, not a URL). The CSS fallback + `previewImage` escape hatch
are bridges until that shared renderer / data source is real.

This is captured in `docs/digital-unboxing.md`; that's the source of
truth for the architecture.

---

## Files to know

| Concern                                | File                                                              |
| -------------------------------------- | ----------------------------------------------------------------- |
| `UnboxingDesign` type + `ORDERS` data  | `app/gifter-dashboard/data.ts`                                    |
| Preview component (the single seam)    | `app/gifter-dashboard/components/DigitalUnboxingPreview.tsx`      |
| Glow variant (Partiful-direction one)  | `app/gifter-dashboard-glow/**`                                    |
| Brutalist variant (sticker/cream)      | `app/gifter-dashboard/**`                                         |
| Architecture handoff doc               | `docs/digital-unboxing.md`                                        |
| Admin dashboard (subject of PR #14)    | `app/admin-preview/page.tsx`                                      |
| Project AGENTS instructions            | `AGENTS.md` (referenced by `CLAUDE.md`)                           |
| Repo's main developer handoff          | `docs/HANDOFF.md`                                                 |

---

## Environment notes (for the next Claude in a fresh session)

- **Sandbox, not a local clone.** Ubuntu 24.04 VM at `/home/user/giftwell-site`,
  hostname `vm`, `/container_info.json` at root. The user's Mac filesystem
  is invisible — pasted screenshots in chat don't land on disk.
- **`git push` goes through a local proxy** at
  `http://local_proxy@127.0.0.1:<port>/git/PlasmaLemur88/giftwell-site`.
  Port number changes across sandbox restarts; the remote URL itself is
  managed for you.
- **Vercel CLI installed but useless here**: no auth, and outbound to
  `vercel.com` is firewalled (HTTP 403). Vercel deploys happen entirely
  via GitHub-push → Vercel GitHub-App integration.
- **How to find a Vercel preview URL for a PR**: use the GitHub MCP —
  `mcp__github__pull_request_read` with `method: "get_comments"`. Vercel-bot
  posts the current preview URL on every push (only updates on open PRs).
- **Direct outbound to `github.com` / `api.github.com`** also returns
  HTTP 403. Use the GitHub MCP tools (`mcp__github__*`) for all GitHub
  interaction. The repo allowlist is `plasmalemur88/giftwell-site` only.
- **The repo uses Tailwind v4** (`@import "tailwindcss"` in `app/globals.css`)
  and Polaris CSS is imported in `app/admin-preview/layout.tsx`. When you
  use `next/link` inside styled-jsx, the hash-scoped class doesn't always
  reach the underlying `<a>` — use `:global(.selector)` for layout-critical
  rules. (This is what bit the admin dashboard and was fixed in PR #14.)
- **Project instructions**: `AGENTS.md` says "this is NOT the Next.js you
  know" and points at `node_modules/next/dist/docs/` for breaking-change
  guides. Honor that before touching framework-level patterns.

---

## Quick-start prompt for the next session

> Resume work on the Giftwell gifter dashboard. Read
> `docs/NEXT-SESSION.md` first for current state — PRs #13 and #14 are
> open with green CI and live Vercel previews. Pending user action: the
> Feno screenshot upload, the Partiful direction decision, and the merge
> order for the two PRs. Don't push to `main` directly. Don't try
> outbound `vercel.com` or direct `github.com` — use the GitHub MCP tools.
