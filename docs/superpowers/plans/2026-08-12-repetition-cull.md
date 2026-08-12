# Repetition Cull Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Cut every fact and number on the Danuvest landing page down to at most two renders, delete the Mission section, and collapse the footer to one row — taking the page from 4,635 px to roughly 3,200 px without losing information the user chose to keep.

**Architecture:** Pure subtraction across four layers that must stay in sync: the JSON data files in `src/data/`, the `.astro` components that read them, the per-section stylesheets in `src/styles/`, and the Decap CMS field definitions in `public/admin/config.yml`. Deleting a fact means removing it from all four, otherwise the CMS grows boxes that render nowhere. Work proceeds section by section, one commit per section, so any single step is revertible on its own.

**Tech Stack:** Astro 4 (static output, zero framework JS), plain CSS with `@import` composition, Decap CMS over git-gateway, `astro check` for type verification.

**Spec:** [`docs/superpowers/specs/2026-08-12-repetition-cull-design.md`](../specs/2026-08-12-repetition-cull-design.md)

**Note on testing:** This repo has no test runner — `package.json` defines no `test` script, and a static marketing site has no unit-testable logic. The verifiable artifact is the built HTML. Task 1 builds a assertion harness that counts fact occurrences in `dist/index.html`; it is the failing test that every later task drives toward green. The harness lives in the scratchpad, not the repo, because the user asked for subtraction only.

---

### Task 1: Build the repetition assertion harness

This is the failing test. It encodes the spec's repetition ledger as executable assertions against the built HTML. Every later task exists to turn a red line green.

**Files:**
- Create: `/private/tmp/claude-501/-Users-cristianbulat-Desktop-danuvest-web/aefd390f-5772-44cf-8749-7b497c130efe/scratchpad/check-repetition.sh`

- [ ] **Step 1: Write the assertion script**

Create the file with exactly this content:

```bash
#!/usr/bin/env bash
# Asserts the repetition ledger from
# docs/superpowers/specs/2026-08-12-repetition-cull-design.md
# against the built page. Run from the repo root AFTER `npm run build`.
set -uo pipefail

HTML="dist/index.html"
fail=0

if [ ! -f "$HTML" ]; then
  echo "FATAL: $HTML not found. Run 'npm run build' first."
  exit 1
fi

# count <literal> <expected> <description>
count() {
  local needle="$1" expected="$2" desc="$3" actual
  actual=$(grep -oF "$needle" "$HTML" | wc -l | tr -d ' ')
  if [ "$actual" = "$expected" ]; then
    printf '  PASS  %-28s %s (expected %s)\n' "$desc" "$actual" "$expected"
  else
    printf '  FAIL  %-28s %s (expected %s)\n' "$desc" "$actual" "$expected"
    fail=1
  fi
}

echo "Repetition ledger:"
count '500+'                        1 '500+ proiecte'
count '2008'                        2 'fondata in 2008'
count '>18<'                        1 '18 ani (stat card)'
count '15+'                         0 '15+ (stale, must be gone)'
count '300+'                        0 '300+ clienti (removed)'
count '50+'                         1 '50+ specialisti'
count 'Str. Constructorilor'        2 'address'
count 'contact@danuvest.md'         2 'email'
count '08:00'                       2 'working hours'
count 'Construcții la Cheie'        1 'service name sample'

echo "Deleted content:"
count 'Companie de construcții fondată' 0 'hero badge'
count 'misiune'                     0 'mission anchor (no dead links)'
count 'Misiunea Companiei'          0 'mission label'
count 'Garanție pe lucrări'         0 'hero trust chip'
count 'gamă completă de servicii'   0 'services description'

echo "Must survive:"
count '+373 69 463 435'             4 'phone (exempt, unchanged)'
count 'Contactează-ne pentru'       1 'contact description (kept)'

if [ "$fail" = 0 ]; then
  echo "ALL PASS"
else
  echo "FAILURES ABOVE"
fi
exit "$fail"
```

- [ ] **Step 2: Make it executable**

```bash
chmod +x "/private/tmp/claude-501/-Users-cristianbulat-Desktop-danuvest-web/aefd390f-5772-44cf-8749-7b497c130efe/scratchpad/check-repetition.sh"
```

- [ ] **Step 3: Build the current site and run the harness to watch it fail**

```bash
npm run build && "/private/tmp/claude-501/-Users-cristianbulat-Desktop-danuvest-web/aefd390f-5772-44cf-8749-7b497c130efe/scratchpad/check-repetition.sh"
```

Expected: exit code 1, with FAIL lines including `500+ proiecte 3 (expected 1)`, `fondata in 2008 5 (expected 2)`, `15+ 3 (expected 0)`, `hero badge 1 (expected 0)`, `mission anchor` non-zero. Some lines will already PASS — that is fine and expected.

Record the failing output. It is the baseline.

- [ ] **Step 4: Do not commit**

The harness lives in the scratchpad deliberately. Nothing to commit in this task.

---

### Task 2: Delete the Mission section

Largest single change. Removes 796 px, two of the five "2008" renders, and one of the three "500+" renders.

**Files:**
- Delete: `src/components/Mission.astro`
- Delete: `src/styles/mission.css`
- Delete: `src/data/mission.json`
- Delete: `src/assets/mission.jpg`
- Modify: `src/pages/index.astro`
- Modify: `src/styles/main.css:16`
- Modify: `src/styles/responsive.css`
- Modify: `src/data/site.json`
- Modify: `src/data/hero.json`
- Modify: `src/data/footer.json`
- Modify: `public/admin/config.yml`

- [ ] **Step 1: Retarget the dangling anchors before deleting anything**

Three files point at `#misiune`. If the section is deleted first, these become dead links.

In `src/data/hero.json`, change the secondary CTA:

```json
  "ctaSecondary": { "label": "Află Mai Mult", "href": "#despre" },
```

In `src/data/site.json`, remove the Misiune entry from `navLinks`. The array becomes:

```json
  "navLinks": [
    { "label": "Acasă", "href": "#acasa" },
    { "label": "Servicii", "href": "#servicii" },
    { "label": "Despre Noi", "href": "#despre" },
    { "label": "Contact", "href": "#contact" }
  ],
```

In `src/data/footer.json`, remove the Misiune entry from `navLinks`. (The whole key is deleted in Task 6; this keeps the tree valid in the meantime.)

```json
  "navLinks": [
    { "label": "Acasă", "href": "#acasa" },
    { "label": "Servicii", "href": "#servicii" },
    { "label": "Despre Noi", "href": "#despre" },
    { "label": "Contact", "href": "#contact" }
  ],
```

- [ ] **Step 2: Remove the component from the page**

In `src/pages/index.astro`, delete the import line and the element. The file becomes:

```astro
---
import Base from '../layouts/Base.astro'
import Navbar from '../components/Navbar.astro'
import Hero from '../components/Hero.astro'
import Services from '../components/Services.astro'
import About from '../components/About.astro'
import Contact from '../components/Contact.astro'
import Footer from '../components/Footer.astro'

// Projects.astro is intentionally NOT imported. It is fully built and has its
// own CMS collection, but its six entries are stock photographs with invented
// project names — shipping those under "Proiectele noastre" would be false
// advertising. Wire it in once real project photos and details exist.
---

<Base>
  <Navbar />
  <main>
    <Hero />
    <Services />
    <About />
    <Contact />
  </main>
  <Footer />
</Base>
```

- [ ] **Step 3: Drop the stylesheet import**

In `src/styles/main.css`, delete line 16:

```css
@import './mission.css';
```

The import block becomes:

```css
@import './navbar.css';
@import './hero.css';
@import './services.css';
@import './projects.css';
@import './about.css';
@import './contact.css';
@import './footer.css';
```

- [ ] **Step 4: Remove mission rules from responsive.css**

Four edits. Match by selector, not line number — earlier edits shift the lines.

First, at the `max-width: 1100px` breakpoint, `.mission-grid` is grouped with `.about-grid`. Drop only the mission selector:

```css
  .about-grid {
    grid-template-columns: 1fr;
    gap: 52px;
  }
```

Second, delete this rule entirely:

```css
  .mission-image-inner {
    height: 360px;
  }
```

Third, delete the `.mission-badge` rule *and* its explanatory comment block (the one beginning "Above 1101px the mission grid is two columns"). It documents behaviour that no longer exists.

Fourth, delete both `.mission-values` rules — one at the `max-width: 768px` breakpoint, one at `max-width: 480px`.

- [ ] **Step 5: Delete the files**

```bash
git rm src/components/Mission.astro src/styles/mission.css src/data/mission.json src/assets/mission.jpg
```

Using `git rm` rather than `rm` keeps the deletion staged and recoverable via `git checkout HEAD --` until commit.

- [ ] **Step 6: Remove the CMS collection**

In `public/admin/config.yml`, delete the entire `- name: "mission"` collection block — from `  - name: "mission"` through the end of its `values` field list, ending at the line `              - { name: title, label: Title, widget: string }` that precedes `  - name: "services"`.

- [ ] **Step 7: Verify the build and check types**

```bash
npm run build && npm run check
```

Expected: build succeeds, `astro check` reports 0 errors. A failure here means a component still imports `mission.json`.

- [ ] **Step 8: Confirm no dead anchors remain**

```bash
grep -rn "misiune\|Misiune" src public --include="*.astro" --include="*.json" --include="*.css" --include="*.yml"
```

Expected: no output.

- [ ] **Step 9: Run the harness**

```bash
"/private/tmp/claude-501/-Users-cristianbulat-Desktop-danuvest-web/aefd390f-5772-44cf-8749-7b497c130efe/scratchpad/check-repetition.sh"
```

Expected: `mission anchor`, `mission label` now PASS. `500+` drops from 3 to 2, `2008` drops from 5 to 3 — both still FAIL. That is correct at this stage.

- [ ] **Step 10: Commit**

```bash
git add -A
git commit -m "refactor(page): delete the Mission section

Mission and About were the same section written twice — same structure,
and both opened with 'Fondată în 2008, Danuvest...'. Combined they used
37% of the page to say the company was founded in 2008 and cares about
quality. About keeps the story; Mission goes, along with its stylesheet,
data file, photo and CMS collection.

The hero's secondary CTA and both nav lists pointed at #misiune and are
retargeted to #despre.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 3: Strip the hero

Removes the badge the user asked to delete, the trust chips, the subtitle's redundant sentence, and rebuilds the stat grid as three cards.

**Files:**
- Modify: `src/data/hero.json`
- Modify: `src/components/Hero.astro`
- Modify: `src/styles/hero.css`
- Modify: `src/styles/responsive.css`
- Modify: `public/admin/config.yml`

- [ ] **Step 1: Rewrite the hero data**

`src/data/hero.json` becomes exactly:

```json
{
  "titleLead": "Construim cu",
  "titleAccent": "Calitate",
  "titleTrail": "și Dedicare",
  "subtitle": "Danuvest este partenerul tău de încredere pentru proiecte de construcții rezidențiale și comerciale în Republica Moldova.",
  "ctaPrimary": { "label": "Solicită Consultație Gratuită", "href": "#contact" },
  "ctaSecondary": { "label": "Află Mai Mult", "href": "#despre" },
  "stats": [
    { "value": "500+", "label": "Proiecte Finalizate" },
    { "value": "18",   "label": "Ani de Experiență" },
    { "value": "50+",  "label": "Specialiști în Echipă" }
  ]
}
```

Three changes beyond deletion: `badge` and `trust` are gone; the subtitle loses its trailing sentence "Calitate înaltă, termene respectate, clienți mulțumiți."; and the stats go from four cards to three, with `15+` corrected to `18` (2026 − 2008) and `2008 An Fondare` / `300+ Clienți Mulțumiți` replaced by `50+ Specialiști în Echipă`.

- [ ] **Step 2: Remove the badge and trust markup**

`src/components/Hero.astro` becomes exactly:

```astro
---
import { getImage } from 'astro:assets'
import heroBg from '../assets/hero-bg.jpg'
import Icon from './Icon.astro'
import hero from '../data/hero.json'

// LCP background image — routed through astro:assets so it's hashed,
// compressed, and served as WebP instead of being a hardcoded /assets/...
// path or a hotlinked third-party URL.
const bg = await getImage({ src: heroBg, width: 1920, format: 'webp' })
---

<section class="hero" id="acasa">
  <div class="hero-bg" style={`--hero-bg: url(${bg.src})`} />

  <div class="container">
    <div class="hero-inner">

      {/* ── Left column: text content ── */}
      <div class="hero-left">
        <h1 class="hero-title">
          {hero.titleLead} <span class="accent">{hero.titleAccent}</span>
          <br />{hero.titleTrail}
        </h1>

        <p class="hero-subtitle">
          {hero.subtitle}
        </p>

        <div class="hero-actions">
          <a href={hero.ctaPrimary.href} class="btn btn-primary">
            {hero.ctaPrimary.label} <Icon name="arrow-right" />
          </a>
          <a href={hero.ctaSecondary.href} class="btn btn-outline">
            {hero.ctaSecondary.label}
          </a>
        </div>
      </div>

      {/* ── Right column: stats grid ── */}
      <div class="hero-right">
        <div class="hero-stats-grid">
          {hero.stats.map((s) => (
            <div class="hero-stat-card">
              <div class="stat-value">{s.value}</div>
              <div class="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

    </div>
  </div>
</section>
```

The `Icon` import stays — the primary CTA still renders `arrow-right`. Only the `check` usage went, along with the `hero.trust.map(...)` that contained it.

- [ ] **Step 3: Remove the dead hero CSS and give the grid a lead card**

In `src/styles/hero.css`, delete these rules entirely: `.hero-badge`, `.hero-badge-dot`, the `@keyframes pulse` block (it animated only the badge dot), `.hero-trust`, `.hero-trust-item`, and `.trust-icon`.

Then replace the `.hero-stats-grid` rule with:

```css
/* Three cards, not four. The first spans the full width so "500+ Proiecte"
   reads as the headline number instead of one of four equal tiles, and the
   odd card count doesn't leave an empty cell. */
.hero-stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}

.hero-stat-card:first-child {
  grid-column: 1 / -1;
}
```

- [ ] **Step 4: Update the responsive overrides**

In `src/styles/responsive.css`, at the `max-width: 768px` breakpoint, delete this rule:

```css
  .hero-trust {
    gap: 12px 20px;
  }
```

The comment above `.hero-stats-grid` at that breakpoint describes four cards that no longer exist. Replace the comment so it still documents the real decision:

```css
  /* WAS: .hero-right { display: none } — removed every stat card on mobile,
     where most of this site's traffic is. They stay; the lead card spans
     both columns and the other two share the row below. */
  .hero-stats-grid {
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }
```

At the `max-width: 480px` breakpoint, delete the now-orphaned badge rule:

```css
  .hero-badge {
    font-size: 0.7rem;
  }
```

That leaves the 480px block empty — delete the whole `@media (max-width: 480px) { ... }` block, since its only other rule (`.mission-values`) went in Task 2.

- [ ] **Step 5: Remove the CMS fields**

In `public/admin/config.yml`, inside the `hero` collection, delete the `badge` field line:

```yaml
          - { name: badge, label: "Badge Text", widget: string }
```

and the entire `trust` field block:

```yaml
          - name: trust
            label: "Trust Bullets"
            widget: list
            field: { name: text, label: Bullet, widget: string }
```

- [ ] **Step 6: Build and check**

```bash
npm run build && npm run check
```

Expected: both succeed. `astro check` is the tripwire here — `hero.json` lost `badge` and `trust`, so any leftover reference in the component surfaces as a type error.

- [ ] **Step 7: Run the harness**

```bash
"/private/tmp/claude-501/-Users-cristianbulat-Desktop-danuvest-web/aefd390f-5772-44cf-8749-7b497c130efe/scratchpad/check-repetition.sh"
```

Expected now PASSING: `hero badge`, `hero trust chip`, `18 ani (stat card)`, `50+ specialisti`. `500+` should now read 2 (hero + About) and still FAIL; `15+` should read 1 (About photo badge) and still FAIL; `300+` should read 1 (About stats) and still FAIL. Task 4 clears all three.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "refactor(hero): drop the badge, trust chips and duplicate stat

Removes the 'Companie de construcții fondată în 2008' badge, which was
the third render of the founding year within 200px of the other two.
The trust chips restated the subtitle and the CTA label directly above
and below them.

The stat grid goes from four cards to three: '2008 An Fondare' was the
same fact as the years card sitting beside it, and '15+' was stale
arithmetic — 2026 minus 2008 is 18. '300+ Clienți' is replaced by
'50+ Specialiști', which appeared nowhere else and which also settles
the more-projects-than-clients oddity.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 4: Strip the About section

Removes the four-stat row that duplicates the hero and the photo badge that would now contradict it.

**Files:**
- Modify: `src/data/about.json`
- Modify: `src/components/About.astro`
- Modify: `src/styles/about.css`
- Modify: `src/styles/responsive.css`
- Modify: `public/admin/config.yml`

- [ ] **Step 1: Strip the data file**

`src/data/about.json` becomes exactly:

```json
{
  "label": "Despre Noi",
  "title": "Experiența noastră|vorbește de la sine",
  "paragraphs": [
    "Fondată în 2008, Danuvest s-a impus ca un lider în industria construcțiilor din Republica Moldova. Specializați în proiecte rezidențiale și comerciale de mici și mijlocii dimensiuni, ne mândrim cu o abordare care îmbină tradiția meșteșugărească cu tehnologiile moderne de construcție.",
    "Fiecare proiect este tratat cu aceeași dedicare și atenție față de detalii, indiferent de dimensiune sau complexitate. Suntem certificați conform standardelor naționale și europene în domeniu și ne angajăm să respectăm întotdeauna termenele și bugetele stabilite."
  ],
  "imageAlt": "Echipa Danuvest pe șantier"
}
```

`stats`, `experienceNum` and `experienceText` are gone. The paragraphs are untouched — paragraph 1 carries the surviving "Fondată în 2008".

- [ ] **Step 2: Remove the stats row and the photo badge**

`src/components/About.astro` becomes exactly:

```astro
---
import { Image } from 'astro:assets'
import aboutImg from '../assets/about.jpg'
import about from '../data/about.json'

const [titleA, titleB] = about.title.split('|')
---

<section class="section about" id="despre">
  <div class="container">
    <div class="about-grid">
      <div class="about-content">
        <span class="section-label">{about.label}</span>
        <h2 class="section-title">{titleA}{titleB && <br />}{titleB}</h2>

        {about.paragraphs.map((paragraph) => (
          <p class="about-text">{paragraph}</p>
        ))}
      </div>

      <div class="about-visual">
        <div class="about-img-wrap">
          <Image src={aboutImg} alt={about.imageAlt} widths={[400, 700, 1100]} loading="lazy" />
        </div>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 3: Remove the dead About CSS**

In `src/styles/about.css`, delete these rules entirely: `.about-stats`, `.about-stat`, `.about-stat .stat-num`, `.about-stat .stat-text`, `.about-experience`, `.about-experience .exp-num`, `.about-experience .exp-text`.

`.about-visual` has `padding-bottom: 20px; padding-right: 20px;` that existed only to make room for the badge's overhang. With the badge gone, replace the rule with:

```css
.about-visual {
  position: relative;
}
```

- [ ] **Step 4: Update the responsive overrides**

In `src/styles/responsive.css`, at the `max-width: 1100px` breakpoint, the `.about-visual` comment references the badge that no longer exists. Replace the comment and drop the padding that compensated for it:

```css
  /* WAS: .about-visual { display: none } — hid the team photo on every
     tablet and phone. Now it reflows: the portrait crop becomes a
     landscape band and stays centred. */
  .about-visual {
    max-width: 560px;
    margin: 0 auto;
  }
```

At the `max-width: 768px` breakpoint, delete these three now-orphaned rules:

```css
  .about-stats {
    grid-template-columns: 1fr 1fr;
  }

  .about-visual {
    padding-right: 0;
  }

  .about-experience {
    left: 0;
  }
```

- [ ] **Step 5: Remove the CMS fields**

In `public/admin/config.yml`, inside the `about` collection, delete the `stats` field block:

```yaml
          - name: stats
            label: "Stats"
            widget: list
            fields:
              - { name: num, label: Number, widget: string }
              - { name: text, label: Label, widget: string }
```

and these two lines:

```yaml
          - { name: experienceNum, label: "Experience Number", widget: string }
          - { name: experienceText, label: "Experience Label", widget: string }
```

- [ ] **Step 6: Build and check**

```bash
npm run build && npm run check
```

Expected: both succeed. This is the step the spec flagged as most likely to surface a type error — `About.astro` infers its types from `about.json`, which just lost three keys.

- [ ] **Step 7: Run the harness**

```bash
"/private/tmp/claude-501/-Users-cristianbulat-Desktop-danuvest-web/aefd390f-5772-44cf-8749-7b497c130efe/scratchpad/check-repetition.sh"
```

Expected now PASSING: `500+ proiecte` (1), `15+` (0), `300+ clienti` (0). Still failing: `fondata in 2008` reads 1, expected 2 — Task 6 adds the footer render.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "refactor(about): drop the stats row and the experience badge

Three of the four stats were verbatim hero duplicates in the same order,
2,000px apart. The '15+ Ani pe piață' photo badge was a third render of
the years fact and would have contradicted the hero's corrected 18.

Every number now lives in exactly one place: the hero.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 5: Cut the services description

Smallest task. Kept separate so it is revertible on its own if the section header looks bare without it.

**Files:**
- Modify: `src/data/services.json`
- Modify: `src/components/Services.astro`
- Modify: `public/admin/config.yml`

- [ ] **Step 1: Remove the description key**

In `src/data/services.json`, delete this line:

```json
  "description": "De la proiectare la execuție, oferim o gamă completă de servicii de construcții adaptate nevoilor și bugetului fiecărui client.",
```

Leave `label`, `title` and the six `items` untouched.

- [ ] **Step 2: Remove it from the template**

`src/components/Services.astro` becomes exactly:

```astro
---
import Icon from './Icon.astro'
import services from '../data/services.json'
---

<section class="section services" id="servicii">
  <div class="container">
    <div class="section-header">
      <span class="section-label">{services.label}</span>
      <h2 class="section-title">{services.title}</h2>
    </div>

    <div class="services-grid">
      {services.items.map((s) => (
        <div class="service-card">
          <div class="service-icon"><Icon name={s.icon} size={28} /></div>
          <h3 class="service-title">{s.title}</h3>
          <p class="service-desc">{s.desc}</p>
        </div>
      ))}
    </div>
  </div>
</section>
```

- [ ] **Step 3: Remove the CMS field**

In `public/admin/config.yml`, inside the `services` collection only, delete:

```yaml
          - { name: description, label: Description, widget: text }
```

Leave the identical line in the `projects` and `contact` collections alone — both still render their descriptions.

- [ ] **Step 4: Build and check**

```bash
npm run build && npm run check
```

Expected: both succeed.

- [ ] **Step 5: Run the harness**

```bash
"/private/tmp/claude-501/-Users-cristianbulat-Desktop-danuvest-web/aefd390f-5772-44cf-8749-7b497c130efe/scratchpad/check-repetition.sh"
```

Expected: `services description` now PASSES. `contact description (kept)` must still read 1 — if it reads 0, the wrong collection was edited.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "refactor(services): drop the section description

The six cards below it already said this, with specifics. Five identical
label-title-description headers in a row is a rhythm readers start
skipping by the third.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 6: Collapse the footer to one row

Turns 429 px of four-column duplication into a single row, and gives "fondată în 2008" its second, deliberate home.

**Files:**
- Modify: `src/data/footer.json`
- Modify: `src/components/Footer.astro`
- Modify: `src/styles/footer.css`
- Modify: `src/styles/responsive.css`
- Modify: `public/admin/config.yml`

- [ ] **Step 1: Strip the data file**

`src/data/footer.json` becomes exactly:

```json
{
  "social": [
    { "label": "Facebook", "icon": "facebook", "href": "#" },
    { "label": "Instagram", "icon": "instagram", "href": "#" },
    { "label": "LinkedIn", "icon": "linkedin", "href": "#" }
  ],
  "contactItems": [
    { "icon": "pin", "text": "Str. Constructorilor, Stăuceni, MD-4839" },
    { "icon": "phone", "text": "+373 69 463 435", "href": "tel:+37369463435" },
    { "icon": "mail", "text": "contact@danuvest.md", "href": "mailto:contact@danuvest.md" },
    { "icon": "clock", "text": "Luni – Vineri: 08:00 – 18:00" }
  ],
  "copyright": "Danuvest SRL — din 2008. Toate drepturile rezervate."
}
```

Four notes on this. `tagline`, `navTitle`, `navLinks`, `servicesTitle` and `serviceLinks` are gone. `social` stays — it is not dead, it is pending real profile URLs, and `Footer.astro` carries a comment explaining exactly that. The address loses its `|` line break, since a one-row footer lays out horizontally. And `copyright` now carries the founding year: `Footer.astro` prefixes it with `© {new Date().getFullYear()}`, so the row renders as `© 2026 Danuvest SRL — din 2008. Toate drepturile rezervate.` Two years in one line is intentional — the first is the copyright year, the second is the founding year and the second permitted render of "2008".

- [ ] **Step 2: Rewrite the component**

`src/components/Footer.astro` becomes exactly:

```astro
---
import { Image } from 'astro:assets'
import Icon from './Icon.astro'
import logo from '../assets/logo.jpg'
import footer from '../data/footer.json'
---

<footer class="footer">
  <div class="container">
    <!--
      One row, not four columns. The previous footer repeated the five nav
      links (the navbar is sticky — they are always on screen), all six
      service names (already a full section), and the address, phone, email
      and hours from the Contact section 700px above. Contact details stay,
      because a footer is where people look for them.

      Social links are intentionally not rendered. Every entry in
      footer.json's social[] currently has href "#" — there are no real
      Danuvest Facebook/Instagram/LinkedIn profile URLs to link to yet,
      and shipping "#" would be a dead link. Once real profile URLs
      exist, set them on footer.json's social[].href values and
      uncomment this block:

      <div class="footer-social">
        {footer.social.map((s) => (
          <a href={s.href} class="social-btn" aria-label={s.label}>
            <Icon name={s.icon} />
          </a>
        ))}
      </div>
    -->
    <div class="footer-grid">
      <a href="#acasa" class="footer-brand-logo">
        <Image src={logo} alt="Danuvest" width={40} height={40} class="navbar-logo-img" />
      </a>

      <div class="footer-contact-row">
        {footer.contactItems.map((item) => (
          <div class="footer-contact-item">
            <Icon name={item.icon} size={16} class="footer-contact-icon" />
            {item.href ? <a href={item.href}>{item.text}</a> : <span>{item.text}</span>}
          </div>
        ))}
      </div>
    </div>

    <div class="footer-bottom">
      <span>© {new Date().getFullYear()} {footer.copyright}</span>
    </div>
  </div>
</footer>
```

The `|` split logic is gone with the multi-line address, so `item.text` renders directly.

- [ ] **Step 3: Rewrite the footer stylesheet**

`src/styles/footer.css` becomes exactly:

```css
/* =====================
   Footer
   ===================== */
.footer {
  background: #111116;
  color: rgba(255, 255, 255, 0.62);
  padding: 40px 0 0;
}

/* One row. Was a four-column grid whose entire content duplicated
   sections above it. */
.footer-grid {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 20px 40px;
  padding-bottom: 28px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
}

.footer-brand-logo {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.footer-brand-logo .navbar-logo-img {
  height: 40px;
  width: auto;
  border-radius: var(--radius);
}

.footer-contact-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px 28px;
}

.footer-contact-item {
  display: flex;
  gap: 8px;
  align-items: center;
  font-size: 0.85rem;
}

.footer-contact-icon {
  flex-shrink: 0;
  color: var(--accent);
  font-size: 0.95rem;
}

.footer-contact-item a:hover {
  color: var(--accent);
}

/* Kept for the social block, which Footer.astro holds commented out
   until real profile URLs exist. */
.footer-social {
  display: flex;
  gap: 10px;
}

.social-btn {
  width: 38px;
  height: 38px;
  background: rgba(255, 255, 255, 0.07);
  border-radius: var(--radius);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  font-weight: 700;
  transition: var(--ease);
  color: rgba(255, 255, 255, 0.62);
}

.social-btn:hover {
  background: var(--accent);
  color: var(--primary);
}

.footer-bottom {
  padding: 20px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.62);
}
```

`.footer-tagline`, `.footer-col h4`, `.footer-links` and `.footer-links a` are gone — nothing renders them any more.

- [ ] **Step 4: Remove the footer grid overrides**

In `src/styles/responsive.css`, the `.footer-grid` rules set column counts on a grid that is now a wrapping flexbox. Delete both.

At `max-width: 1100px`:

```css
  .footer-grid {
    grid-template-columns: 1fr 1fr;
    gap: 36px;
  }
```

At `max-width: 768px`:

```css
  .footer-grid {
    grid-template-columns: 1fr;
    gap: 28px;
  }
```

Keep the `.footer-bottom` rule at the 768px breakpoint — it still applies.

- [ ] **Step 5: Remove the CMS fields**

In `public/admin/config.yml`, inside the `footer` collection:

**Delete** these fields — `tagline`, `navTitle`, the entire `navLinks` block, `servicesTitle`, the entire `serviceLinks` block, and `contactTitle` (the one-row footer renders no column heading).

**Keep** these fields — `social` (pending real profile URLs), `contactItems`, and `copyright`.

The `contactItems` field also loses its `|` hint, since the address is now a single line. Its `text` field becomes:

```yaml
              - { name: text, label: Text, widget: string }
```

- [ ] **Step 6: Build and check**

```bash
npm run build && npm run check
```

Expected: both succeed.

- [ ] **Step 7: Run the harness — this should be the green run**

```bash
"/private/tmp/claude-501/-Users-cristianbulat-Desktop-danuvest-web/aefd390f-5772-44cf-8749-7b497c130efe/scratchpad/check-repetition.sh"
```

Expected: `ALL PASS`, exit code 0. In particular `fondata in 2008` now reads 2 (About paragraph + footer copyright), and `address` / `email` / `working hours` each read 2.

If `phone (exempt, unchanged)` fails, the footer contact item was dropped — it must stay.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "refactor(footer): collapse four columns into one row

The footer repeated the five nav links (the navbar is sticky, so they
are always on screen), all six service names, and the address, phone,
email and hours from the Contact section 700px above. 429px whose
entire content was a second copy of things already rendered.

Now one row: logo, contact details, copyright. The copyright line
carries 'din 2008', giving the founding year its second and final
render now that the hero badge and stat card are gone.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

### Task 7: Fix the meta description and verify the whole page

**Files:**
- Modify: `src/data/site.json`

- [ ] **Step 1: Correct the stale year count**

In `src/data/site.json`, the meta description claims 15 years. Change `peste 15 ani` to `peste 18 ani`:

```json
  "metaDescription": "Danuvest — companie de construcții din Republica Moldova cu experiență de peste 18 ani. Construcții rezidențiale și comerciale de calitate înaltă, termene respectate.",
```

This is not on-screen, but it is what Google results and WhatsApp link previews show — leaving it at 15 would contradict the hero's 18 in public.

- [ ] **Step 2: Build and check**

```bash
npm run build && npm run check
```

Expected: both succeed, 0 errors.

- [ ] **Step 3: Confirm the harness is fully green**

```bash
"/private/tmp/claude-501/-Users-cristianbulat-Desktop-danuvest-web/aefd390f-5772-44cf-8749-7b497c130efe/scratchpad/check-repetition.sh"
```

Expected: `ALL PASS`, exit code 0.

- [ ] **Step 4: Measure the page against the spec's target**

Start the dev server through the Browser pane (never via Bash), then evaluate:

```js
JSON.stringify([...document.querySelectorAll('section, footer')].map(s => ({
  id: s.id || s.tagName,
  h: Math.round(s.getBoundingClientRect().height)
})))
```

Expected: four sections plus the footer — `acasa`, `servicii`, `despre`, `contact`, `FOOTER`. No `misiune`. Total height ~3,200 px, down from 4,635 px. Anything above ~3,500 px means a cut did not land.

- [ ] **Step 5: Click the secondary CTA**

In the browser pane, click "Află Mai Mult" and confirm the page scrolls to the About section. This is the anchor retargeted in Task 2 — a silent failure here ships a button that does nothing.

- [ ] **Step 6: Check the mobile viewport**

Resize to the `mobile` preset (375×812). Confirm: the footer row wraps cleanly rather than overflowing; the three hero stat cards render with the first spanning full width; no horizontal scrollbar appears on the body.

- [ ] **Step 7: Verify the CMS shows only what renders**

```bash
npm run cms
```

Open `/admin` and confirm there is no "Mission Section" collection, and that Hero has no Badge Text or Trust Bullets fields, About has no Stats, Services has no Description, and Footer has no Tagline or link lists.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "fix(seo): correct the meta description's stale year count

Said 'peste 15 ani' while the page now says 18. Not visible on the page,
but it is what Google results and link previews show.

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>"
```

---

## Self-review

**Spec coverage.** Every file in the spec's "Changes by file" section maps to a task: Mission deletion and anchors → Task 2; `hero.json`, `Hero.astro`, `hero.css` → Task 3; `about.json`, `About.astro`, `about.css` → Task 4; `services.json`, `Services.astro` → Task 5; `footer.json`, `Footer.astro`, `footer.css` → Task 6; `site.json` meta → Task 7. `main.css` and `responsive.css` are edited across Tasks 2, 3, 4 and 6 as each section's rules become dead. `config.yml` is edited in Tasks 2–6 alongside the fields it describes. All four "Explicitly not changed" items are respected: `Icon.astro` is never touched, Projects stays unpublished, the contact description is asserted as surviving in the harness, and `footer.social` is preserved with its comment.

**Placeholder scan.** No TBDs, no "similar to Task N", no "add error handling". Every code step shows the complete file or the exact rule to delete.

**Type consistency.** The harness function is `count()` in all uses. Class names match between the component and the stylesheet in Task 6: `.footer-grid`, `.footer-brand-logo`, `.footer-contact-row`, `.footer-contact-item`, `.footer-contact-icon`, `.footer-bottom` all appear in both. `footer.json` keys read by `Footer.astro` — `contactItems`, `copyright` — both exist in the Step 1 data file. `hero.json` keys read by `Hero.astro` — `titleLead`, `titleAccent`, `titleTrail`, `subtitle`, `ctaPrimary`, `ctaSecondary`, `stats` — all exist. `about.json` keys read by `About.astro` — `label`, `title`, `paragraphs`, `imageAlt` — all exist.

**One ordering dependency worth noting.** Task 2 Step 1 edits `footer.json`'s `navLinks` to drop the Misiune entry, and Task 6 Step 1 deletes the key entirely. That is intentional, not redundant: between the two tasks the site still renders the footer nav, and a dead `#misiune` link would ship in any build made in between.
