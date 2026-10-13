---
applyTo: "assets/js/testimonials*.js,_includes/testimonials.html,_sass/_testimonials.scss,pages/index.md"
---

# Testimonials web component – maintenance notes

Replaces the former newsletter block on the index page. Read this instead of re-exploring the project.

## Files

| File | Role |
|---|---|
| `assets/js/testimonials-data.js` | Data only: `window.TESTIMONIALS` array. Edit here to add/change testimonials. |
| `assets/js/testimonials.js` | Custom element `<student-testimonials>` (Shadow DOM, no deps). |
| `_includes/testimonials.html` | Loads data script, then component script, then the tag. Data must load first. |
| `_sass/_testimonials.scss` | Defines `--st-*` CSS variables for light/dark. Imported in `_sass/portfolYOU.scss` after `theme-dark`. |
| `pages/index.md` | Uses `{% include testimonials.html %}` after `landing.html`. |

## Data format

```js
{ text: "required", origin: "required (university)", name: "optional", image: "optional URL" }
```
- No `name` -> shown as "Anonym" (set in `render()` of `testimonials.js`).
- No `image` -> round head-outline SVG (`avatar()`).
- Current entries are placeholders ("Platzhalter") until real ones are provided.

## Behavior

- Random start index on connect; dots below switch testimonials.
- Auto-rotate every 8000 ms (`start()`); paused on hover/focus; disabled for `prefers-reduced-motion` or < 2 items.
- Arrow keys (left/right) and touch swipe (>50px) navigate.
- `show(i)` wraps around and re-renders the whole shadow DOM (no transition); restores focus to the active dot if focus was inside.
- UI language: German only (`Anonym`, dot aria-label "Stimme n von N").

## Theming

- Site theme = `data-theme="light|dark"` on `<html>` (see `assets/js/theme.js`).
- Shadow DOM reads inherited custom properties: `--st-bg`, `--st-text`, `--st-muted`, `--st-border`, `--st-accent`.
- Values are set in `_sass/_testimonials.scss`; change colors there, not in the component. Component CSS has light fallbacks.
- `_testimonials.scss` uses `$dark-600`/`$dark-300` from `_theme-dark.scss`, so keep the import order.

## Rules for changes

- Change one thing at a time; verify after each step.
- Escape all user/data text via `esc()` before inserting into `innerHTML`.
- No external libraries; keep it a plain custom element.

## Local testing

- Run `.\dev-docker\start.ps1`, then `.\dev-docker\test.ps1` (smoke test), then `.\dev-docker\stop.ps1`. Details in the root `README.md`.
- `dev-docker/` is excluded from the site in `_config.yml`; `dev-docker/jekyll.local.yml` repeats that list (Jekyll replaces arrays) and adds local-only excludes.
- If you add a testimonial feature, extend `dev-docker/test.ps1`.

## Open items

- Replace placeholder testimonials with real ones.
- Optional: fade transition between testimonials.
