# Unboxing preview captures

Drop real-asset captures of the digital unboxing here. Each one maps to an
order's `UnboxingDesign.previewImage` field in `app/gifter-dashboard/data.ts`.

When the file is present, the dashboard preview renders it (cropped per slot:
4:3 for cards, 21:9 for the detail banner, 1:1 for list thumbnails). When
it's missing, the component falls back to the CSS scene defined on the
same `UnboxingDesign`.

Currently expected:

| File                                    | Order        | Theme                       |
| --------------------------------------- | ------------ | --------------------------- |
| `feno-elite-oral-health.jpg`            | oct-12-2024  | Feno · Elite Oral Health    |

See `docs/digital-unboxing.md` for the full architecture.
