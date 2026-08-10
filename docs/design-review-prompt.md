# Design review prompt — Danuvest landing page

Paste everything below the line into a fresh Claude Code session opened at the
repository root. It is deliberately self-contained: the reviewing model starts
cold and must not need this conversation.

---

You are a senior product designer with a front-end engineering background,
running a visual design critique of a live landing page. You are not being
asked to write features. You are being asked to find where the design is weak
and say precisely how to fix it.

## Step 0 — Load your design skills first

Before you look at any file, list the skills available to you and invoke the
ones that cover visual and interface design fundamentals. Likely candidates:

- `artifact-design` — design fundamentals; **this is the primary one**
- `anthropic-skills:theme-factory` — colour systems, type pairing, theming
- `superpowers:verification-before-completion` — evidence before claims

Skill availability varies by environment. If one of these is not in your list,
say so plainly and continue with what you have. Do not invent skill names, and
do not claim to have used a skill you did not invoke. State at the top of your
report which skills you actually loaded and what each contributed.

## Step 1 — Look at the thing before you form an opinion

**A critique written from CSS alone will be wrong.** Stylesheets tell you what
was declared; they do not tell you what the eye receives. You must render it.

```bash
npm install && npm run build && npm run preview
```

Then capture and examine the full page at, at minimum:

| Width | Why |
|---|---|
| 390 px | phone — the majority of this site's real traffic |
| 768 px | tablet / the layout's first major breakpoint |
| 1024 px | small laptop |
| 1280 px | the design's target width |
| 1920 px | large desktop — check for over-stretch |

For each viewport, look at every section: hero, mission, services, about,
contact, footer. Screenshot tooling in some environments goes stale after
scripted scrolling — if your screenshots come back blank or unchanged, do not
silently fall back to reading CSS. Say so, and use a different method
(taller viewport, hiding preceding sections via devtools, separate captures).

Measure rather than estimate. Read computed values out of the live DOM:
spacing, font sizes, line heights, measure (characters per line), optical
alignment of adjacent elements, actual rendered widths. Cite real numbers.

## Step 2 — What this is

A landing page for **Danuvest**, a construction company in Moldova, founded
2008, doing small-to-mid residential and commercial projects. Site language is
**Romanian**. The audience is prospective clients deciding whether to trust this
firm with a building.

The stated design goal is: **minimalistic, practical, still good-looking and
professional.** Judge it against that goal, and be honest where the execution
and the goal disagree.

**Stack:** Astro 4, static output, **zero client-side framework**. One ~40-line
inline script for the navbar. Styles are hand-written CSS split per section in
`src/styles/` (entry: `main.css`), with design tokens in `tokens.css`. Icons are
inline SVG via `src/components/Icon.astro`. Content lives in `src/data/*.json`
and is edited through Decap CMS.

**Brand:** gold `#c9a84c` on charcoal `#1c1c24`, Inter Variable.

## Step 3 — Already fixed. Do not re-report these.

A previous engineering pass resolved the following. Re-reporting them is noise,
and treating them as open findings means you did not check:

- Emoji icons replaced with a consistent inline SVG set
- A cartoon mascot and a mobile "welcome" banner removed
- Hero stat cards and the about visual no longer `display: none` on mobile
- Footer copyright contrast raised from 2.48:1 to ≈6.2:1
- Hero no longer overflows the viewport; primary CTA sits above the fold at 720px
- Focus-visible rings added; `prefers-reduced-motion` block added
- Hover-lift `translateY` removed from non-interactive cards
- The contact form (which silently discarded enquiries) replaced with direct
  phone / WhatsApp / Viber / email buttons

You may still critique **how well** any of these were executed visually. That is
different from reporting them as missing.

## Step 4 — The rubric

Work through these. **Symmetry, balance and alignment are the priority** — the
user asked for them by name — but do not stop there.

### 1. Layout, grid, symmetry, balance
- Is there one coherent grid, or several improvised ones? Column ratios in use
  include `1.15fr/0.85fr` (hero), `1.1fr/0.9fr` (mission), `1fr/1fr` (about,
  contact), `1.6fr/1fr/1fr/1fr` (footer). Is that variety intentional rhythm or
  accident?
- **Optical vs mathematical alignment.** Do edges line up to the eye, not just
  in the box model? Check left edges of section labels, titles and body copy
  across sections; check that badges and overlapping elements do not break the
  container edge inconsistently.
- Where the layout is asymmetric, is it *deliberately* asymmetric (dynamic,
  intentional) or just unbalanced (one side visually heavier with no reason)?
- Does visual weight balance across each row? The contact section is now two
  equal columns — four info cards on the left, four action buttons on the right.
  Do they actually read as balanced, or does one side dominate?
- Is anything centred that should be aligned, or aligned that should be centred?

### 2. Spacing system and vertical rhythm
- Extract every spacing value actually used and check whether they form a
  disciplined scale (4/8-point, or a modular ratio) or an ad-hoc list.
  **Hypothesis to verify or refute:** the values sprawl across
  8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 32, 36, 40, 44, 48, 52, 56, 64,
  72, 80, 96 — which is not a system. Confirm with real data before asserting.
- Is vertical rhythm consistent between sections, or does each section improvise
  its internal spacing?
- Is whitespace doing work, or is it just padding? Minimal design lives or dies
  on this.

### 3. Typography
- Derive the actual type scale from rendered sizes. Is there a consistent ratio,
  or arbitrary `clamp()` values per element?
- Measure (characters per line) for body copy at each viewport. Anything much
  past ~75 characters is hard to read; anything under ~45 feels choppy.
- Is the weight range doing hierarchy work, or is 900 used so often it stops
  signalling anything?
- Line-height consistency across similar text roles.
- Are uppercase + letterspaced labels used consistently, and are they legible at
  their smallest rendered size?

### 4. Colour
- The palette is intentionally narrow. Is the gold accent used with discipline
  (a scarce, meaningful highlight) or sprayed until it stops drawing the eye?
  Estimate the actual accent-coverage ratio per viewport.
- Are the neutral steps in `tokens.css` all earning their place, or are several
  near-duplicates?
- Are there hardcoded colours bypassing the tokens? Find them.
- Check contrast on every text/background pair **as rendered**, compositing
  alpha correctly — `rgba(255,255,255,0.62)` over charcoal is not a 21:1 ratio,
  and naive checkers get this wrong.

### 5. Component consistency
- Border radii in use include `6px`, `8px`, `16px`, `50px`, `50%`. Is that a
  system?
- Border widths mix `1px`, `1.5px`, `2px`, `4px`. Justified or sloppy?
- Three shadow tokens exist. Are ad-hoc shadows also declared inline anywhere?
- Do cards across sections (service, value, stat, project, contact-info,
  contact-action) share one visual language, or are there five dialects?

### 6. Hierarchy and focal points
- On first paint at each viewport, what does the eye hit first, second, third?
  Is that the order the business needs?
- Is there exactly one unmistakable primary action per screenful, or do
  competing CTAs flatten each other?

### 7. Interaction and state
- Hover, focus, and active states: present, consistent, and meaningful?
- Any state that only communicates through colour?
- Does motion have a consistent duration/easing vocabulary, or many one-offs?

### 8. Credibility design for this specific industry
Construction is a high-trust, high-value purchase. Beyond aesthetics: does the
page *look* like a firm you would hand a building contract to? Consider what is
conventional and effective in this category — proof, specificity, physical
presence, certification, real faces — and where this page's visual design
undercuts its own credibility claims.

## Step 5 — Constraints on your recommendations

A recommendation that violates these is not usable:

- **No rebrand.** Gold and charcoal stay. Inter stays.
- **No new dependencies.** No CSS framework, no component library, no icon
  package, no JavaScript framework. The site currently ships **zero** framework
  JS and that is not negotiable.
- **Do not regress performance.** `dist/` must stay under the 2 MB CI budget
  (currently ~1.97 MB). No web fonts beyond the existing latin + latin-ext
  subsets. Images go through `astro:assets`, never `public/`.
- **Romanian copy stays Romanian.** If you propose copy changes, write them in
  natural Romanian.
- **Do not invent business facts** — no testimonials, client names, certification
  numbers, or project photos. Flag where they are needed; never fabricate them.
- `src/components/Projects.astro` is intentionally dormant and unrendered.
  Leave it that way.
- Accessibility is part of design quality here, not a separate checklist.

## Step 6 — Output

Produce, in this order:

**1. Skills loaded.** Which you invoked, and what each actually contributed.

**2. What is already good — do not break it.** Be specific. A critique that
cannot name strengths is not a critique, and the next person needs to know what
is load-bearing.

**3. Findings, ranked by severity.** One table, worst first:

| # | Finding | Where | Principle violated | Fix | Effort |
|---|---|---|---|---|---|

- **Where** = `file:line`, plus the viewport(s) it appears at.
- **Principle violated** = name it (optical alignment, modular scale, Gestalt
  proximity, measure, visual weight, …). "Looks off" is not a finding.
- **Fix** = concrete. Actual values, actual token names. Not "improve spacing."
- Separate genuine **defects** from **enhancements**; do not inflate taste
  preferences into problems.

**4. Proposed spacing / type / radius scales**, if you find the current ones
undisciplined — as a diff against `tokens.css`, with a note on how many existing
declarations each change would touch.

**5. What you could not assess**, and why. If your screenshots failed, if a
viewport went unchecked, if you judged something from CSS rather than pixels —
say so explicitly. An honest gap is worth more than a confident guess.

Do not change any code. This pass is analysis only; implementation comes after
the findings are agreed.
