# Digital unboxing — architecture notes for the dashboard previews

This prototype shows a **gifter dashboard** with cards that preview each gift's
*digital unboxing* — the branded screen recipients see when they open their
gift (e.g. the Feno "powered by Giftwell" experience).

These notes explain what's mocked in the prototype and how it should work in
production. The card placement and component contract are already wired the
way the real version should connect; only the data source and the renderer
fidelity change.

## The big idea — same as Partiful

> The dashboard does NOT scrape the unboxing URL. It re-renders the same
> design data, at card size.

Partiful's event cards aren't screenshots of event pages — they're the host's
own flyer, rendered inside Partiful, at every size (feed card, full event
page, OG share image). One source of truth, multiple renderers.

Giftwell is the same setup: Giftwell owns the unboxing design (it's "powered
by Giftwell"), so the dashboard and the unboxing experience should both
render from one shared `UnboxingDesign` record.

## Three render contexts, one record

| Context                | Renderer                                    | Notes                                                                         |
| ---------------------- | ------------------------------------------- | ----------------------------------------------------------------------------- |
| Unboxing experience    | Full-screen interactive page                | The Feno page with the moon, products, "Thank you so much!!" headline.        |
| Dashboard card preview | `DigitalUnboxingPreview` component (small)  | Re-renders the same record, non-interactive, cropped to the card aspect.      |
| External link previews | Server-generated `og:image` per gift        | For iMessage / email previews when the gifter forwards a recipient's link.    |

## What's mocked here vs. real

### Mocked

- The `UnboxingDesign` type in `app/gifter-dashboard/data.ts` carries a
  hand-tuned set of fields (`scene`, `box`, `ribbon`, `motif`, `message`)
  that drive a tasteful CSS fallback render — a generic gift box. Useful for
  variety; not faithful to a real unboxing.
- `previewImage` is an optional escape hatch: when set, the preview shows a
  real captured frame of the unboxing instead of the CSS scene. One order
  (`oct-12-2024`, the Feno "Elite Oral Health" example) uses this; the others
  fall back to the CSS scene.
- Per-recipient unboxing links are generated deterministically as
  `https://giftwell.link/g/<token>` from the recipient ID.
- "Resend" copies the link to the clipboard and shows a "✓ Resent" confirmation.
  No email is actually sent.

### Real

The seams are right but the implementations are placeholders. To make this
production-ready:

1. **Shared design record.** Replace the hand-tuned `UnboxingDesign` with the
   real record the unboxing experience reads (template, products, copy,
   theme colours, animation choices). Giftwell already owns this — the
   dashboard just needs read access.
2. **Shared renderer.** The dashboard preview should run the unboxing's own
   renderer in a "card mode" — same component, smaller canvas, no
   interaction. That removes the CSS-fallback / `previewImage` dichotomy.
   Until that exists, `previewImage` is the bridge.
3. **External previews.** Generate a per-gift `og:image` on the unboxing
   URL (server-side render → static image, cached). When a gifter forwards
   a recipient's link in iMessage / email, the right preview appears.
4. **Per-recipient links.** The mock token becomes a real signed token
   identifying the recipient. The "Resend" button hits an API that
   re-emails the link.

## Where to look in the code

| Concern                        | File                                                          |
| ------------------------------ | ------------------------------------------------------------- |
| `UnboxingDesign` type + data   | `app/gifter-dashboard/data.ts`                                |
| Preview component (the seam)   | `app/gifter-dashboard/components/DigitalUnboxingPreview.tsx`  |
| Card with preview (glow)       | `app/gifter-dashboard-glow/page.tsx`, `…/orders/page.tsx`     |
| Card with preview (brutalist)  | `app/gifter-dashboard/page.tsx`, `…/orders/page.tsx`          |
| Order detail (both variants)   | `app/gifter-dashboard*/orders/[id]/page.tsx`                  |
| Per-recipient links + resend   | `app/gifter-dashboard*/orders/[id]/page.tsx` (recipient rows) |

The preview component is the **single swap point** — every card across both
dashboard variants and both order-detail pages renders through it. Replacing
its internal renderer (or its data source) propagates everywhere.

## Reference: a real digital unboxing

The Feno "Elite Oral Health" example (`oct-12-2024`) uses a real capture of
the production unboxing — a dark navy scene with the vintage moon
illustration, the "Thank you so much!!" headline, floating Feno products,
and the gift showcase panel on the right.

Drop the capture at `public/unboxings/feno-elite-oral-health.jpg` and it
appears as that order's preview everywhere. Until the file is present the
component falls back gracefully to the CSS scene.

![Reference: Feno Elite Oral Health digital unboxing](../public/unboxings/feno-elite-oral-health.jpg)
