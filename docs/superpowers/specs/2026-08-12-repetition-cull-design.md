# Design — repetition cull on the Danuvest landing page

**Date:** 2026-08-12
**Status:** approved in brainstorming, pending spec review
**Scope:** subtraction only. No new sections in this round.

## Goal

Two things, both from the user:

1. No fact or number may render more than **twice** across the page. The phone
   number is explicitly exempt — it is a conversion element and should repeat.
   Marketing vocabulary is trimmed by judgment, not by a hard cap.
2. Remove the hero badge `Companie de construcții fondată în 2008`.

The page is 4,635 px today. After these changes it is roughly **3,200 px**, a
~31% reduction, with no information lost that the user chose to keep.

Background research on nine competitor `.md` sites is in
[`docs/competitor-analysis-md.md`](../../competitor-analysis-md.md). The
additions it recommends (process section, guarantee terms, price anchor, sticky
phone) are deliberately **out of scope here** and become a later spec.

## Decisions taken during brainstorming

| Question | Decision |
|---|---|
| What counts toward the max-2 rule | Facts and numbers. Phone number exempt. Vocabulary reduced by judgment. |
| Mission section | Delete. One line folds into About. |
| The numbers themselves | Keep current figures. Fix only the arithmetic: `15+` → `18`. |
| Hero stat grid | Three cards. `2008 An Fondare` dropped as a duplicate of the years card; `300+ Clienți` swapped out for `50+ Specialiști`. |
| About section | Cut the 4-stat row and the `15+ Ani pe piață` photo badge. |
| Footer | Collapse four columns to one compact row. |
| Filler text | Cut hero trust chips, services description, and the hero subtitle's last sentence. **Keep** the contact description. |
| Scope | Subtraction only this round. |
| CMS and orphaned data | Clean up properly — remove dead collections, fields, files and CSS. |
| `fondată în 2008` visibility | Give it a second, deliberate home in the footer. |
| `50+ Specialiști` | Promote into the hero, replacing `300+ Clienți`. |
| Meta description | Fix `peste 15 ani` → `18`. |

## Repetition ledger

The verification target. Every row must read ≤ 2 after implementation.

| Fact | Before | After | Surviving locations |
|---|---:|---:|---|
| `500+ proiecte` | 3 | **1** | Hero stat card |
| `fondată în 2008` | 5 | **2** | About paragraph 1; footer row |
| `15+` / `18 ani` | 3 | **1** | Hero stat card (as `18`) |
| `300+ clienți` | 2 | **0** | — removed |
| `50+ specialiști` | 1 | **1** | Hero stat card |
| Address | 2 | 2 | Contact; footer |
| Working hours | 2 | 2 | Contact; footer |
| Email | 2 | 2 | Contact; footer |
| Service names | 2 | **1** | Services section |
| Nav links | 3 | 2 | Navbar; mobile menu (never both visible) |
| Phone number | 4 | 4 | *exempt by decision* |

Vocabulary, as a secondary effect of the cuts:

| Term | Before | After |
|---|---:|---:|
| *calitate* | 6 | 2 (H1 accent, meta title) |
| *termene respectate* | 4 | 1 (About paragraph 2) |
| *profesionalism* | 3 | 0 |
| *Republica Moldova* | 4 | 2 on-page (hero subtitle, About) + meta |
| *partenerul tău de încredere* | 2 | 1 (hero subtitle) |

## Resulting page structure

```
Navbar    Acasă · Servicii · Despre Noi · Contact        (was 5 links)
Hero      ~740 px   badge removed, trust chips removed,
                    subtitle shortened, 3 stat cards
Services  ~920 px   description removed
About     ~650 px   stats row and photo badge removed
Contact    746 px   unchanged
Footer    ~140 px   one row                              (was 429 px)
```

`Mission` (796 px) is gone entirely.

## Changes by file

### Delete

- `src/components/Mission.astro`
- `src/styles/mission.css`
- `src/data/mission.json`
- `src/assets/mission.jpg` — becomes unreferenced once the component is gone

### `src/pages/index.astro`
Remove the `Mission` import and the `<Mission />` element.

### `src/data/site.json`
- `navLinks` — remove the `Misiune → #misiune` entry.
- `metaDescription` — `peste 15 ani` → `peste 18 ani`.

### `src/data/hero.json`
- Remove `badge`.
- Remove `trust` (the three chips).
- `subtitle` — drop the trailing sentence. New value:
  `"Danuvest este partenerul tău de încredere pentru proiecte de construcții rezidențiale și comerciale în Republica Moldova."`
- `ctaSecondary.href` — `#misiune` → `#despre`. **Required**: the target section
  is being deleted, so leaving this would ship a button that scrolls nowhere.
- `stats` — three entries:
  `500+ / Proiecte Finalizate`, `18 / Ani de Experiență`, `50+ / Specialiști în Echipă`.

### `src/components/Hero.astro`
Remove the `.hero-badge` block and the `.hero-trust` block. The `Icon` import
stays — the primary CTA still renders `arrow-right`. Only the `check` usage goes,
along with the `hero.trust.map(...)` it lived in.

### `src/styles/hero.css`
- Remove `.hero-badge`, `.hero-badge-dot`, `.hero-trust`, `.hero-trust-item`, `.trust-icon`.
- `.hero-stats-grid` currently lays out a 2×2 grid. With three cards, make the
  first card span both columns and the remaining two sit side by side beneath
  it. This gives `500+ Proiecte` visual primacy, which the current flat 2×2 does
  not, and avoids an orphaned third cell.

### `src/data/services.json`
Remove `description`.

### `src/components/Services.astro`
Remove the `<p class="section-desc">` from the section header.

### `src/data/about.json`
Remove `stats`, `experienceNum`, `experienceText`.

### `src/components/About.astro`
Remove the `.about-stats` block and the `.about-experience` block.

### `src/styles/about.css`
Remove `.about-stats`, `.about-stat`, `.stat-num`, `.stat-text`,
`.about-experience`, `.exp-num`, `.exp-text`.

### `src/data/footer.json`
- Remove `tagline`, `navTitle`, `navLinks`, `servicesTitle`, `serviceLinks`.
- Keep `contactItems` (address, phone, email, hours).
- Keep `social` — it is not dead, it is pending real profile URLs, and
  `Footer.astro` carries a comment block explaining exactly that. Leave both.
- `copyright` — carry the founding year: `"Danuvest SRL — din 2008. Toate drepturile rezervate."`
  `Footer.astro` prefixes this with `© {new Date().getFullYear()}`, so the row
  renders as `© 2026 Danuvest SRL — din 2008. Toate drepturile rezervate.`
  Two years in one line is intentional: the first is the copyright year, the
  second is the founding year, and this is the second of the two permitted
  renders of "2008".

### `src/components/Footer.astro`
Collapse the four-column grid to one row: logo, then the contact items inline,
then the copyright. Keep the commented-out social block and its explanation.

### `src/styles/footer.css`
Rewrite `.footer-grid` from a four-column grid to a single flex row that wraps
on narrow viewports. Remove `.footer-col`, `.footer-links`, `.footer-tagline`.

### `src/styles/main.css`
Remove `@import './mission.css';`.

### `src/styles/responsive.css`
Remove every rule whose selector references a `.mission-*` class (currently
around lines 16, 22, 26–32, 123 and 152 — verify by selector, not line number,
since earlier deletions will shift them). Also remove any footer-column rules
made dead by the footer rewrite. Where a `.mission-*` selector is grouped with
others in a comma-separated list, drop only that selector and keep the rule.

### `public/admin/config.yml`
- Remove the entire `mission` collection.
- `hero` — remove the `badge` and `trust` fields.
- `services` — remove the `description` field.
- `about` — remove the `stats`, `experienceNum`, `experienceText` fields.
- `footer` — remove the `tagline`, `navTitle`, `navLinks`, `servicesTitle`,
  `serviceLinks` fields.
- `site` — no field changes; `navLinks` stays a list, it just has one fewer entry.

The principle: after this change the CMS shows exactly what the site renders. No
editor can type into a box whose output appears nowhere.

## Explicitly not changed

- **`Icon.astro` keeps `trophy`, `handshake`, `bolt`.** They were only used by the
  Mission value cards, but `config.yml` still offers them in the services icon
  dropdown, so an editor can select them. They are not dead code.
- **The Projects section stays unpublished.** Unrelated to this work, and still
  blocked on real project photography.
- **The contact description stays.** The user kept it.
- **`footer.social` stays.** Pending real URLs, already documented in place.

## Verification

1. `npm run build` completes without error.
2. `npm run check` (astro check) passes — the About and Hero components lose
   fields that TypeScript infers from the JSON, so a stale reference will surface
   here.
3. Load the page and confirm section heights: total should be ~3,200 px, down
   from 4,635 px.
4. Click "Află Mai Mult" and confirm it scrolls to About, not to nothing.
5. Walk the repetition ledger above against the rendered page. Every row ≤ 2.
6. Open `/admin` with `npm run cms` and confirm no collection or field edits a
   value that no longer renders.
7. Check the mobile viewport: the footer row must wrap cleanly, and the 3-card
   hero grid must not overflow.

## Risks

- **Deleting `mission.jpg` is irreversible outside git.** It is a stock photo, so
  the loss is low, but confirm before removing rather than after.
- **The footer rewrite touches shared CSS.** `.footer-grid` may have responsive
  overrides that assume four columns; those need to go in the same pass or the
  row will break on mobile.
- **`astro check` may surface type errors in `About.astro`** once `stats` leaves
  `about.json`, since the component's types are inferred from the JSON shape.
  This is expected and is the point of running it.
