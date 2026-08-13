# Competitor design analysis — Moldovan construction companies (.md)

Research pass over nine live `.md` construction / development sites, read against
the current Danuvest page (`localhost:4321`, 4,635 px tall, six sections).
Everything below is either a pattern that repeats across competitors, or a
measured problem in our own page.

## The sites

| Site | What they are | The one thing they do that we don't |
|---|---|---|
| [vastavit.md](https://www.vastavit.md/) | General contractor, 20 yrs | Filterable portfolio, 6 categories, **quote button on every project** |
| [dasc.md](https://dasc.md/construction) | Residential + hotel developer | **5-phase construction process** as a section; "Rezervă un apel acum" |
| [exfactor.md](https://www.exfactor.md/ro) | Big developer, 10k apartments | **3-phase buyer journey**; hard numbers (2M m², 38 complexes) |
| [irion.md](https://irion.md/) | Civil + industrial contractor | **8-stage workflow**; client-logo carousel; blog; team with names |
| [redeco.md](https://redeco.md/despre-noi/) | Renovation + interior design | **Prices from €10 / €99 / €230 per m²**; 8 named advantages; 2-year written guarantee |
| [proiectari.md](https://www.proiectari.md/) | House-design catalogue | **Search/filter widget inside the hero**; FAQ; floating chat consultant |
| [perfectum-module.md](https://perfectum-module.md/constructii-la-cheie/) | Modular builder | **"45–60 days" delivery promise in the hero**; named technical director with photo |
| [basconslux.md](https://basconslux.md/) | Developer since 2003 | **Dated construction-progress blog** with site photos; FAQ in the nav |
| [eximol.md](https://eximol.md/constructia) | Turnkey houses since 2004 | **"de la 450 €/m²"** price anchor; "what's included" list |

`amelconstruct.md` blocks automated fetching (403); it is included in the
pattern counts below only from its public search metadata (15+ yrs, turnkey
positioning), not from a page read.

---

## Part 1 — Patterns that show up on almost every competitor

Ranked by how many of the nine sites do it, and how badly we need it.

### 1.1 A process / stages section — **8 of 9 sites. We have zero.**

This is the single biggest structural gap.

- dasc: 5 phases (site prep → technical systems → structure → finishes → QC)
- irion: 8 stages (need assessment → offer → approval → design → docs → permits → construction → handover)
- perfectum: 5 stages ("Cum lucrăm")
- redeco: 3 steps ("Proiectăm, Alegem, Executăm")
- exfactor: 3 phases (consultation → legal → finalisation)
- eximol: 4 steps ("Ce este inclus în lucrare")

Someone about to spend €80,000 on a house is not asking "are you dedicated to
quality." They are asking *what happens after I call you, and when do I pay.*
Our page answers neither. A `Cum lucrăm` section with 5 numbered steps and a
realistic duration on each ("Ofertă în 3 zile lucrătoare", "Autorizații: 4–8
săptămâni") would do more for conversion than the Mission section, the value
cards and the hero trust chips combined.

### 1.2 The phone number lives in the header — 7 of 9 sites

vastavit, dasc, redeco, irion, eximol, basconslux and proiectari all put a
tappable phone number in the top bar or sticky header. Our phone number first
appears **3,459 px down the page**, inside the Contact section. The navbar
instead carries a `Solicită Consultație` button that scrolls to the same place.

For this industry the phone *is* the conversion. Nobody fills a form to build a
house; they call.

### 1.3 A price anchor — 3 of 9, and they're the smart ones

- redeco: interior design from €10/m², renovation from €99/m², construction from €230/m²
- eximol: "de la 450 €/m²"
- perfectum: fixed 45–60 day delivery as the equivalent commitment

We publish nothing. "Adaptate nevoilor și bugetului fiecărui client" is what a
company writes when it has no price to give. Even a single honest range —
*"Construcție la roșu de la X €/m², la cheie de la Y €/m². Prețul final se
stabilește după vizita pe teren."* — filters out tyre-kickers and doubles the
seriousness of the leads that do call.

### 1.4 A real portfolio with filters — 5 of 9

vastavit (6 categories), irion (5 filters, 6 projects), dasc (3 projects with
status and years), exfactor, basconslux. `Projects.astro` is already built and
correctly kept out of `index.astro` because its six entries are Unsplash stock
with invented names. **The component is not the blocker; six real photographs
are.** Until those exist, the page has no proof of a single completed building —
while claiming 500 of them.

Interim move: three real projects beat six fake ones. Even phone photos with an
honest caption ("Casă individuală, 180 m², Stăuceni, 2024") outperform a
polished grid of stock.

### 1.5 Named, specific numbers beat round ones — irion's lesson

irion publishes **147** houses, **29** pools, **220** designs, **67**
industrial objects. Those are believable precisely because they're not round.
We publish 500+, 300+, 15+, 50+ — the exact shape of numbers a template ships
with. See §2.4 for the credibility problem inside ours.

### 1.6 RO / RU language switch — 6 of 9

vastavit, dasc, irion, basconslux, eximol and proiectari all ship at least
RO+RU. We are Romanian only. In Chișinău and Bălți that quietly discards a
large share of the buying market.

### 1.7 Messenger buttons, floating and persistent — most sites

proiectari runs a floating consultant widget (WhatsApp / Viber / Telegram);
dasc, redeco, irion and eximol carry them in the footer or top bar. Viber in
particular is the default channel for a Moldovan tradesman conversation. We
*have* WhatsApp and Viber links — buried at 3,900 px in a section most visitors
never reach.

### 1.8 A concrete guarantee, not the word "guarantee" — redeco, vastavit

redeco: "minimum doi ani garanție la toate lucrările", plus licences and legal
contracts as named advantages. vastavit: "certificat de garanție oficial cu
ștampila companiei". We have a hero chip reading `Garanție pe lucrări` with no
term, no scope, and nothing behind it. A guarantee without a number is not a
guarantee, and readers know it.

### 1.9 Things only the best one or two do — worth stealing

- **Pain-point framing** (redeco): the section opens with the client's questions
  — *"Vrei să faci renovare dar nu știi de unde să începi?"* — instead of the
  company's self-description. Enormously more engaging than "Misiunea noastră".
- **Progress blog with dates** (basconslux): photos of active sites, dated.
  Proves the company exists *this month*. Cheapest credibility on the list.
- **Quote button on each project** (vastavit): converts browsing into a lead at
  the moment of maximum interest.
- **A named human with a photo** (perfectum: technical director Jidobin Andrei;
  irion: managers by name). Construction is a trust-by-face business. We have a
  stock photo captioned "Echipa Danuvest pe șantier" and not one name.
- **Client logos** (irion): instant B2B credibility for the commercial half of
  the offer.
- **FAQ** (proiectari, basconslux): also the cheapest SEO on the page.

---

## Part 2 — What to cut. Measured, with numbers.

The page is 4,635 px. Roughly 1,200 px of it — **about 26%** — is the same
handful of facts printed again. Nothing below loses a single piece of
information.

### 2.1 Mission and About are the same section, written twice — ~700 px recoverable

Both have: eyebrow label → two-line title → body copy → photograph → a number
badge overlaid on the photo. They sit 1,700 px apart and open with the same
sentence:

> **Mission:** "Fondată în 2008, Danuvest a crescut pentru a deveni una dintre companiile de construcții de referință din Republica Moldova."
>
> **About:** "Fondată în 2008, Danuvest s-a impus ca un lider în industria construcțiilor din Republica Moldova."

Combined they occupy **1,696 px** — 37% of the page — to say "we were founded in
2008 and we care about quality."

**Fix:** delete `Mission.astro` entirely. Keep one `Despre noi`: one photo, two
paragraphs, one row of stats. Give the reclaimed 700 px to the process section
from §1.1.

### 2.2 The About stats row is a byte-for-byte duplicate of the hero — ~160 px

| | Hero stat cards | About stats |
|---|---|---|
| 1 | 500+ Proiecte Finalizate | 500+ Proiecte Finalizate |
| 2 | 15+ Ani de Experiență | 15+ Ani de Experiență |
| 3 | 300+ Clienți Mulțumiți | 300+ Clienți Mulțumiți |
| 4 | 2008 An Fondare | 50+ Specialiști în Echipă |

Three of four are identical, in the same order, ~2,000 px apart. Delete the
About row; if "50+ specialiști" is worth keeping, swap it into the hero grid.

### 2.3 The same fact, counted across the whole page

- **"500+ proiecte"** — hero stat card, mission badge on the photo, about stat → **3 renders** (4 once Projects ships: its description also opens "Peste 500 de proiecte")
- **"fondată în 2008"** — hero badge, hero stat card `2008 / An Fondare`, mission body, about body, footer tagline → **5 renders**
- **"15+ ani"** — hero stat, about stat, about photo badge `15+ / Ani pe piață` → **3 renders**
- **"300+ clienți"** — hero, about → 2
- **"+373 69 463 435"** — printed **3× inside 4 adjacent contact buttons** (Sună / WhatsApp / Viber), then again in the footer → 4
- **Address, hours, email** — full in Contact, then again in the footer 700 px later

The hero is the worst offender at close range: card 2 says `15+ Ani de
Experiență` and card 4 says `2008 An Fondare`. **Those are the same fact**,
side by side, one derivable from the other. One of them is filler.

### 2.4 Two of our numbers actively damage credibility

- **500+ proiecte but only 300+ clienți mulțumiți.** Reads as either sloppy or
  invented. A visitor's eye lands on both cards at once.
- **"15+ ani" against "fondată în 2008."** 2026 − 2008 = **18**. Either the
  number was written years ago and never touched, or it isn't counted at all.
  Say `18 ani` or `Din 2008` — pick the one that's true and drop the other card.

### 2.5 The three value cards say nothing — ~120 px

`Calitate` / `Integritate` / `Profesionalism`, one word each under an icon. No
competitor on the list would claim the opposite, which is the test for whether a
claim is worth space. Compare redeco's eight advantages: *fixed prices,
wholesale material rates, minimum two-year guarantee, construction licences.*
Every one is falsifiable — that's what makes it worth printing.

**Fix:** delete, or replace each word with a promise that can be broken:
*"Garanție scrisă 24 de luni"*, *"Deviz fix, fără costuri ascunse"*,
*"Penalizare contractuală la depășirea termenului"*.

### 2.6 Section descriptions that restate their own section — ~120 px across 3

- Services: *"De la proiectare la execuție, oferim o gamă completă de servicii de construcții adaptate nevoilor și bugetului fiecărui client."* → the six cards below already say this, in more detail.
- Contact: *"Contactează-ne pentru o consultație gratuită. Echipa noastră este pregătită să răspundă tuturor întrebărilor tale."* → sits directly above four buttons labelled "Sună acum", "Scrie pe WhatsApp", "Scrie pe Viber", "Trimite un email". They explain themselves.
- The mission `blockquote` — 30 words, set as the largest, most visually
  prominent typography on the page, carrying the message "we like quality and
  deadlines." Maximum emphasis on minimum content.

**Fix:** cut all three. A section title with no description is fine; five
identical `label → title → description` headers in a row is a rhythm the reader
starts skipping by the third one.

### 2.7 The footer is 429 px of things already on screen — ~200 px recoverable

It repeats all five nav links (the navbar is sticky — they're always visible),
all six service names (already a section), address / phone / email / hours
(already in Contact, 700 px above), and a tagline restating the hero subtitle.
The social block is already commented out for having no real URLs.

**Fix:** collapse to one row — logo, phone, email, address, hours, copyright.
Keep the service links only if they become real pages worth an internal link.

### 2.8 The hero trust chips restate the subtitle — ~60 px

`Garanție pe lucrări` · `Consultanță gratuită` · `Termene respectate`, sitting
under a subtitle that already reads "Calitate înaltă, termene respectate,
clienți mulțumiți" and above a CTA labelled "Solicită Consultație **Gratuită**".
Three claims, each made twice within 200 px.

### 2.9 Vocabulary that's worn out from overuse

- *calitate* — hero title accent, hero subtitle, mission quote, value card, footer tagline, meta title → 6
- *termene respectate* / *respectând fiecare termen* → 4
- *profesionalism / profesioniști / profesionist* → 3
- *Republica Moldova* → hero subtitle, mission body, about body, meta description → 4
- *partenerul tău de încredere* → hero subtitle, footer tagline → 2

By the third repetition these words carry no meaning; they read as page
furniture. Each should appear once, in the place it's strongest.

---

## Part 3 — What to build with the ~1,200 px we free up

In priority order.

1. **`Cum lucrăm` — 5 numbered steps with real durations.** (§1.1) The highest-value
   addition on this list. Consultație & vizită → deviz detaliat → contract și
   grafic → execuție cu raportare → recepție și garanție.
2. **Real projects — 3 is enough.** (§1.4) Photo, type, surface, locality, year.
   Unblocks the existing `Projects.astro`. Add a "Solicită un proiect similar"
   button per card, the way vastavit does.
3. **A price anchor.** (§1.3) One range, one honest sentence about what moves it.
4. **A guarantee with a number in it.** (§1.8) 12 / 24 months, in writing, scope named.
5. **Sticky phone in the navbar** — and on mobile, a permanent bottom bar
   `Sună` | `WhatsApp` | `Viber`. (§1.2, §1.7) Cheapest conversion win available.
6. **Testimonials with full names and towns.** (vastavit) Two are enough. Two real
   ones beat ten anonymous ones.
7. **FAQ, 6–8 questions.** (§1.9) "Cât durează o casă la cheie?" "Cine se ocupă de
   autorizații?" "Cum se face plata, în tranșe?" "Lucrați în afara Chișinăului?"
   Converts and ranks at the same time.
8. **RO / RU switch.** (§1.6) The largest addressable-market change on the list.
9. **A named face.** (§1.9) Owner or site manager, real photo, one line.
10. **Progress posts.** (basconslux) Three dated site photos a month. Proves the
    company is alive.

---

## Part 4 — Visual and interaction notes

Smaller, but each is cheap.

- **Section rhythm is flat.** Six sections, all `label → title → body`, all on the
  same background, all roughly 750–960 px tall. Nothing signals *this one
  matters more*. Vary it: full-bleed dark band behind the process section, tight
  band for the price anchor, generous space only for projects.
- **Every section is the same height, so nothing has hierarchy.** Mission 796,
  Services 963, About 900, Contact 746. Deliberately make the process and
  projects sections the tall ones and About the short one.
- **Six service cards, all identical weight.** Competitors lead with one flagship
  ("Construcții la Cheie" here) and demote the rest. Make card one span two
  columns.
- **The hero right column is four boxes of numbers.** Cut to two (§2.3) and the
  headline gets room to breathe; or replace the grid with one real project photo
  and a caption, which is what exfactor and basconslux do.
- **No CTA between the hero and the contact section** — 3,459 px of scrolling with
  no way to act. Every competitor repeats the CTA; vastavit repeats "Solicită
  Oferta!" on essentially every block. Add one after services and one after
  projects.
- **No final CTA band.** irion closes with a full-width "ÎNCEPE SĂ-ȚI CONSTRUIEȘTI
  VISUL CU NOI" before the footer. We end on a contact grid and then a footer of
  duplicated links.
- **Stock photography reads as stock.** Three sites use visibly real site photos;
  the difference in credibility is immediate. Genuine photos of our own sites,
  even imperfect ones, are worth more than the current hero image.
- **The hero image is a generic rebar close-up** with no building in it. A
  finished building we actually built would do the job the 500+ card is
  currently trying to do.

---

## Part 5 — Suggested execution order

**Cuts first — they're free and they make everything after easier to place.**

1. Delete `Mission.astro`, fold its one useful sentence into About. (−700 px)
2. Delete the About stats row. (−160 px)
3. Delete the value cards, hero trust chips, and the three section descriptions. (−300 px)
4. Fix `15+` → `18` or `Din 2008`; drop the duplicate `2008 An Fondare` card; reconcile 500 projects vs 300 clients. (§2.4)
5. Collapse the footer to a single row. (−200 px)

**Then add, in this order:**

6. Sticky phone + mobile call bar.
7. `Cum lucrăm` — 5 steps.
8. Guarantee with a term, and a price anchor.
9. Three real projects → ship `Projects.astro`.
10. FAQ, then testimonials, then RO/RU.

Steps 1–5 are pure deletion and can land today. Steps 6–8 need decisions from
the business (what guarantee, what price floor) but no new assets. Steps 9–10
need photographs and translation.

---

*Sources: [vastavit.md](https://www.vastavit.md/) · [dasc.md](https://dasc.md/construction) · [exfactor.md](https://www.exfactor.md/ro) · [irion.md](https://irion.md/) · [redeco.md](https://redeco.md/despre-noi/) · [proiectari.md](https://www.proiectari.md/) · [perfectum-module.md](https://perfectum-module.md/constructii-la-cheie/) · [basconslux.md](https://basconslux.md/) · [eximol.md](https://eximol.md/constructia) · [amelconstruct.md](https://amelconstruct.md/) (blocked, metadata only)*
