---
name: clone-website
description: Screenshot an external website, DOWNLOAD its real images + lift its real copy, configure the theme/styling ONCE up front (colors → theme tokens, fonts → roles, reusable utility classes), then cut it into ordered sections and scaffold a brand-NEW dedicated component per section via the clone-section skill — verified with a screenshot comparison loop. Use whenever the user pastes a website link and asks to clone, replicate, analyze, or "cut" a site into sections.
---

# Clone Website Skill

> **Mirror notice:** This file mirrors `.claude/skills/clone-website/SKILL.md`. Keep both in sync.

This skill takes an **external website URL**, **screenshots it**, **downloads its real images and lifts its real copy**, configures this template's **theme/styling once up front**, **visually cuts the page into ordered sections**, and scaffolds **one brand-new dedicated component per section** into this Nuxt 3 template using the `clone-section` workflow (mirror of Claude Code's `create-component`). It **matches the source site's colors and fonts** by updating this template's **theme tokens** (never by hardcoding values in components). To guarantee fidelity it runs a **screenshot comparison loop**: screenshot the source site, render the cloned page locally, compare, and adjust.

> **Usage example (prompt):** "Clone https://example.com into a new page `content/landing.yml` and match its colors and fonts."

**Core philosophy:**
- The **screenshot** — not the HTML text — drives the section split.
- **Always create a NEW bespoke component per section.** Existing components (`SectionDefault`, `SectionPhoto`, `section/editor`, …) are **reference patterns only** — never reused as-is. There is no "reuse" default.
- **Clone accurately with real assets:** download the source's images into `public/images/` and lift its real copy. Do **not** use lorem-ipsum placeholders or invented text.
- **Configure styling once, before generating sections:** map the palette to theme tokens, map fonts to roles, and pick the reusable utility classes (`title-breadcrumb`, `title-section`, `subtitle-section`, `description-section`, …) so every generated section stays consistent.

This skill **delegates** all per-section scaffolding to `clone-section` — it does not restate those rules. It only decides *which sections exist (from the screenshot)*, *what each new component is named*, *how to configure the theme*, and *how to bring in the real assets/copy*.

---

## When to use

Trigger whenever the user pastes a website link and asks to **clone / replicate / analyze / "cut" (cắt)** a site into sections, or to make a page **look like** another site.

---

## Hard guardrails (read first)

1. **Always create a NEW component per section.** For every visually-distinct section, **create a new two-word component** (`category/kebab-name`, Rule 3) via `clone-section`. Existing components are **reference only** — never reuse `SectionDefault` / `SectionPhoto` / `section/editor` etc. as the section. There is no "mandatory-reuse" and no "prefer reuse".
2. **Special sections still honor their data contract.** When a section is **store-driven** (services, coupons, gallery) or a **contact form**, you still create a *new* component, but it MUST read from the matching Pinia store (`useServicesStore` / `useCouponStore` / `useGalleryStore`) or preserve the contact-form `list_fields` + logic, and **keep the existing content keys unchanged** — new fields go only inside `extend` (CLAUDE.md Rules 5/6/7).
3. **Download real images + lift real copy.** Download the source's images into `public/images/` (flat folder, filenames prefixed with a clone slug, e.g. `/images/<slug>-hero.jpg`) and reference them locally; use them directly. **Never hotlink** the source's image URLs. Every `<img>` is still guarded with `v-if` and gets a descriptive `alt`. Lift the **real heading / body / CTA text** verbatim from the source — do not invent copy.
4. **Match colors/fonts ONLY through theme tokens.** Colors → `data/theme.json` + `assets/style/_variables.scss`. Fonts → `tailwind.config.ts` + `assets/style/main.scss`. **Never hardcode hex or font-family names inside components** — components keep using `bg-main`, `text-foreground`, `font-primary`, etc. Only the token *values* change. This honors CLAUDE.md's token-first / source-of-truth rule (the hex is "theme-generated per client").
5. **Fonts change by ROLE, not by name** (Rule 2): update what `primary` / `secondary` / `anchor` point to — never rename classes across the codebase. Typefaces are **theme-driven**; map the source font to the **nearest Google Font**.
6. **Tailwind only — no raw CSS.** Build sections from Tailwind utilities + the project's existing utility classes. If a class string is long or repeated across sections, define a class in `assets/style/tailwind.css` using **`@apply`** (every project utility class is built this way) — **never** write raw CSS properties in a `<style scoped>` block, and never hardcode arbitrary values (`[48px]`, `[#fff]`).
7. **`setting.json` array fields render the WHOLE array.** Shop info read from `data/setting.json` (`address`, `phone`, `email`, `social`, `iframe_map`, `business.list_item`) MUST be rendered with `v-for` over the entire array + per-item `v-if="item.is_show"`. **Never** grab a single element via `[0]` or `.find(...)`. See clone-section's "setting.json array rendering" section.
8. **Every generated section still obeys all CLAUDE.md rules** and passes the full `clone-section` checklist. This skill relaxes nothing.
9. **Do NOT generate header / nav / footer** as content blocks — those are managed by `components/main/*` + `data/header.json` / `data/footer.json`.
10. **Confirm the inventory with the user before generating files.** Lead with the screenshot; if the screenshot can't be captured (blocked/login-walled), say so and ask for a screenshot/HTML — never silently fabricate sections.

---

## Workflow

### Phase 1 — Screenshot & inventory the source (screenshot-led)
1. **Screenshot first** — capture the full source page with the system browser (no dependency needed):
   ```bash
   # Edge (or swap for chrome.exe)
   "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" \
     --headless --disable-gpu --hide-scrollbars \
     --screenshot="<scratchpad>/source.png" --window-size=1440,2400 "<URL>"
   ```
   Then `Read` `source.png`.
2. **Cut into sections from the image** — visually decompose the page top → bottom into an **ordered list of sections**. For each section capture: `{ role/type, heading, body text, CTA label + intent, image count + alt-worthy description, layout hint (hero / single / grid / list / gallery) }`.
3. **`WebFetch` is secondary** — use it to lift the **real copy** (headings/body/CTA), link targets, the image URLs to download, and to help detect the **dominant palette** (page background, brand/primary, accent/secondary, surface, text) and **primary font-family**. It does **not** drive the section split — the screenshot does.
4. Output a concise **section inventory + detected colors/fonts** and **ask the user to confirm** before generating anything.

### Phase 2 — Configure styling ONCE (before any section)
Look at the source once and lock the design system *before* generating sections, so every section reuses the same tokens/classes:
- **Colors** — set in `data/theme.json`:
  - brand/primary → `primary_color`
  - accent → `secondary_color`
  - light/surface background → `anchor_color`
  Then run `node public/js/fetch-theme-color.js` (or `pnpm generate`) to push these into `--color-primary/secondary/anchor` in `_variables.scss`. The script only maps those three keys; adjust the **remaining tokens** (`--color-background`, `--color-foreground`, `--color-text-*`, `--color-border*`, status colors) directly in `assets/style/_variables.scss` to match the source.
- **Fonts** — map the source font to the nearest Google Font, then update both places, keeping role names:
  - `assets/style/main.scss` — the `@import url("https://fonts.googleapis.com/css2?...")` line + the body `font-family`.
  - `tailwind.config.ts` — `fontFamily.primary` / `.secondary` / `.anchor`.
- **Reusable utility-class "style map"** — decide once which existing class each role maps to, then use them consistently across every section:
  - large page title → `.title-breadcrumb`
  - section heading → `.title-section`
  - section sub/eyebrow heading → `.subtitle-section`
  - section description / lead → `.description-section`
  - centering → `.flex-center`
  - cover image → `.image`
  - vertical rhythm → `.padding-y-section` / `.margin-y-section`

### Phase 3 — Download assets + collect real copy
- **Download images** from the source into `public/images/` (flat), with filenames prefixed by a clone slug (e.g. `<slug>-hero.jpg`, `<slug>-feature-1.png`). Reference them as `/images/<slug>-*.ext`. Never hotlink.
- **Collect the real copy** per section (heading, body, CTA label/intent) and a descriptive `alt` for each image.

### Phase 4 — Name each section
For each section in the inventory, assign a **two-word `category/kebab-name`** for a **new** component that reflects its role (e.g. `about/story`, `home/features`, `home/testimonial`, `home/stats`). Store-driven / contact sections get a fitting two-word name too (see mapping table) — they are still new components, just wired to their store/form contract.

### Phase 5 — Create a NEW component per section (delegate to clone-section)
For **each** section, run the full `clone-section` 3-file workflow (Vue component + content YAML block + CMS `_inputs`). Map captured data:
- text → real `title` / `sub_title` / `description` (rich text via `ckeditor-custom` + `markdown` inputs)
- CTAs → the standard `button` object (`is_show` / `url` / `text` / `open_new_tab`)
- repeated cards/items → `list_item[*]` (+ `layout_list` for grids)
- images → downloaded local `src` (`/images/<slug>-*.ext`) + captured `alt`, always guarded with `v-if`
- styling → Tailwind utilities + the Phase-2 style-map classes; if long/repeated, an `@apply` class in `tailwind.css` (never raw CSS)
- shop info → read `setting.json` arrays with `v-for` over the whole array (never `[0]`/`.find()`)

**Store-driven / contact sections:** create the new component but wire it to the Pinia store / form logic and preserve the existing content keys (Rules 5/6/7).

### Phase 6 — Assemble in source order
Assemble the blocks **in source order** into the target `content/*.yml` (a new page if the user named one; otherwise ask which page), including the page `title` + `seo` block (mirror `content/index.yml`).

### Phase 7 — Screenshot comparison loop
1. **Source:** reuse `source.png` from Phase 1 (re-capture if needed) and `Read` it.
2. **Local:** run `pnpm dev`, screenshot the cloned route the same way → `local.png`, then `Read` it.
3. **Compare** the two visually: section order, palette, font, spacing, per-section layout.
4. **Adjust** theme tokens / block layout / component markup and repeat until close enough. Report any remaining differences that can't be matched (real photography, bespoke layouts).

---

## Source-section → template mapping

**Every row is a NEW component.** Existing components are reference only; store-driven / contact rows wire the new component to their store/form contract.

| Source site section | Map to | Notes |
|---|---|---|
| Hero / banner (page top) | **create new** `home/hero` (or `about/hero`) | hero w/ image + CTA |
| Generic content / feature / "why us" | **create new** `<category>/<name>` | title/sub/desc/image/button/`list_item` |
| Feature grid / cards / steps | **create new** `<category>/<name>` (`list_item[*]`, `layout_list`) | grid via `layout_list` |
| Stats / counters | **create new** `home/stats` | |
| Testimonials / reviews | **create new** `home/testimonial` | |
| Logos / partners strip | **create new** `home/logos` | |
| Long-form rich text / article body | **create new** `<category>/<name>` | rich text via `ckeditor-custom` + `markdown` |
| Photo / gallery strip (decorative) | **create new** `<category>/<name>` | if it's the CMS gallery, use the store row below |
| Breadcrumb / page-title bar | **create new** `section/breadcrumbs`-style | bespoke component |
| Services / pricing | **create new** + wire to `useServicesStore`; preserve `service/item` keys | Rules 5/6 |
| Coupons / promo | **create new** + wire to `useCouponStore`; preserve `coupon/hero` keys | Rule 5 |
| Gallery (CMS-managed) | **create new** + wire to `useGalleryStore`; preserve `gallery/hero` keys | Rule 6 |
| Contact form | **create new** + preserve `contact/hero` `list_fields` + form logic | Rule 7 |
| Header / nav / footer | **do not generate** | managed by `main/` + `data/header.json` / `footer.json` |

---

## Pre-completion checklist (verify ALL before reporting done)

- [ ] Source screenshot captured + `Read`; section inventory + detected colors/fonts confirmed with the user before file generation.
- [ ] **Styling configured up front** (Phase 2): colors in `data/theme.json` + `_variables.scss`, fonts by role in `tailwind.config.ts` + `main.scss`, and a reusable utility-class style map chosen.
- [ ] **Each visually-distinct section got its own brand-new dedicated component.** No existing component reused as-is. Store-driven / contact sections are new components wired to their store/form contract with keys preserved.
- [ ] **Real assets:** images downloaded into `public/images/` (flat, slug-prefixed), referenced locally and used directly; every `<img>` guarded with `v-if` + `alt`; no hotlinking. Real copy lifted from the source (no invented text).
- [ ] **Tailwind only:** no raw CSS in `<style scoped>`; long/repeated class strings extracted via `@apply` in `tailwind.css`; no hardcoded hex/font-family/arbitrary values in components.
- [ ] **`setting.json` arrays** rendered with `v-for` over the whole array + `v-if="item.is_show"`; never `[0]`/`.find()`.
- [ ] Every generated section passes the full `clone-section` checklist (3-file rule, Rules 1–11, token-first).
- [ ] Header/nav/footer NOT generated as blocks.
- [ ] Blocks assembled in source order into the target `content/*.yml` with `title` + `seo`.
- [ ] Screenshot loop run (source + local captured, compared, adjusted); remaining gaps reported.

---

## Reference files

| File | Purpose |
|---|---|
| `.agent/clone-section/SKILL.md` | Delegated 3-file workflow + checklist (run per section; do not duplicate) |
| [components/section/SectionDefault.vue](../../components/section/SectionDefault.vue) | Reference section component (pattern to adapt — never reused as-is) |
| [component-library/components/section/default.yml](../../component-library/components/section/default.yml) | Reference `spec`/`blueprint`/`_inputs` |
| [components/main/MainFooter.vue](../../components/main/MainFooter.vue) | Correct `setting.json` array rendering (`v-for` over the whole array) |
| [data/theme.json](../../data/theme.json) + [public/js/fetch-theme-color.js](../../public/js/fetch-theme-color.js) | Color-matching channel (primary/secondary/anchor) |
| [assets/style/_variables.scss](../../assets/style/_variables.scss) | All theme color tokens (adjust the rest here) |
| [tailwind.config.ts](../../tailwind.config.ts) + [assets/style/main.scss](../../assets/style/main.scss) | Font-matching channel (by role) + `@import` |
| [assets/style/tailwind.css](../../assets/style/tailwind.css) | Project utility classes (all built with `@apply`) |
| [content/index.yml](../../content/index.yml) | Page `title` + `seo` block + block-entry shape |
| `CLAUDE.md` | Rules 1–11, token-first, store-driven (Rule 6), `contact/hero` (Rule 7) |
