# Design Baseline 1

The first launch-site design, a faithful port of the pre-2026 divert.ly landing page extended to a multi-page site. Snapshotted on 2026-10-26 before exploring a friendlier direction.

## Character
Cool, precise, infrastructure-flavored. Hairline borders instead of shadows, flat teal accents, monospace for nav, buttons, chips, and labels.

## Tokens
| Token | Value | Use |
|---|---|---|
| `--teal` | `#00C4A7` | Primary accent, buttons, icons |
| `--teal-dark` | `#00A38C` | Hover, links, mono labels |
| `--teal-tint` | `#E4F7F3` | Pills, hover backgrounds |
| `--blue` / `--green` | `#00AEEF` / `#6BC175` | Top gradient bar, logo |
| `--ink` | `#404041` | Text, code surface |
| `--ink-soft` / `--ink-faint` | `#63656A` / `#9A9CA1` | Secondary text, labels |
| `--bg` / `--surface` / `--line` | `#F5F6F6` / `#FFFFFF` / `#E4E6E8` | Page, cards, borders |
| `--r` | `10px` | Corner radius |
| `--maxw` | `1020px` | Content width |

## Type
- Headings: Space Grotesk 600, tight tracking (-0.02 to -0.03em)
- Body: Inter 400/500, 17px / 1.6
- Labels, nav, buttons, chips, code: IBM Plex Mono

## Layout traits
- Single-column, left-aligned hero; routing diagram below the headline
- Sections separated by 1px top borders on a flat gray page
- Cards are bordered grids (1px gap trick), no shadows
- 3px green-teal-blue bar fixed to the top of the viewport

## Files
`site.css`, `layout.html`, and the `header`, `footer`, and `cta` partials as they stood. `screenshots/` shows home, platform, and pricing at 1280px (with the cookie banner visible).

## Reverting
Copy `site.css` back to `dist/css/site.css`, `layout.html` to `src/layout.html`, and the partials to `src/partials/`, then run `npm run build`. Page content in `src/pages/` does not depend on the theme, unless a later design changed its markup. If that happens, revert with git instead, using the tag created for this baseline if one exists.
