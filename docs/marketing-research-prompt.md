# Marketing research prompt — Moldova

Paste everything below the line into a fresh Claude session with web access.

---

You are a marketing and media-buying consultant with deep working knowledge of the
**Republic of Moldova** market. I need a costed, sourced plan for promoting a construction
company. Research it properly — do not answer from memory.

## The company

- **DANUVEST** — construction company (*companie de construcții*), 18+ years operating
- Address: Str. Constructorilor, Stăuceni, MD-4839, Republic of Moldova (Chișinău outskirts)
- Website: **danuvest.md** · Phone: +373 69 463 435 · Email: contact@danuvest.md
- Services: residential construction, commercial construction, turnkey builds
  (*construcții rezidențiale, comerciale, la cheie*)
- Competitors are already profiled in `docs/competitor-analysis-md.md` — read it if you
  have repo access. Named competitors include vastavit.md, dasc.md, exfactor.md, irion.md,
  redeco.md, perfectum-module.md, basconslux.md, eximol.md, amelconstruct.md.

**Critical market fact to carry through the whole analysis:** Moldova is functionally
bilingual. A large share of commercial search and social behaviour happens in **Russian**,
not Romanian. Every keyword list, ad-copy recommendation and channel estimate must cover
both languages, and you should say which one carries more volume for this category.

## Task 1 — Printing the logo on company vehicles

We have finished vehicle graphics ready to send to a printer. They exist as:

- Vector SVG with a **CutContour** die line on its own layer and **3mm bleed**
- 300dpi PNG fallback
- Current decal size 150 × 57.4mm; a door-panel size (roughly 400–600mm wide) still
  needs to be produced once we know what the printer wants
- Artwork is dark charcoal ground with gold, plus white/red/orange/steel/green variants

**Find real suppliers in Moldova and report actual prices.** Where to look:

- **999.md** — the dominant Moldovan classifieds site. Search the advertising/printing
  categories and these terms: `colantare auto`, `publicitate auto`, `reclama pe auto`,
  `autocolante`, `sticker auto`, plus Russian: `оклейка авто`, `реклама на авто`,
  `наклейки на авто`
- **makler.md** — second classifieds site, same searches
- **Google Maps / Google Search** for Chișinău: `publicitate exterioară Chișinău`,
  `tipografie Chișinău`, `print pe vinil Chișinău`, `colantare auto Chișinău`,
  `рекламное агентство Кишинев`
- **Facebook** business pages — many Moldovan print shops quote only via Messenger
- Moldovan business directories: `yellowpages.md`, `moldova.md`, local B2B listings

For each supplier report: name, contact, website/page, what they actually do
(print only vs print + application), and any published prices.

Then answer these specifically:

1. **Price per m² of printed vinyl**, and whether application (*colantare*) is separate
2. **Cut-to-shape decals vs a full wrap** — cost difference, and which suits a logo like ours
3. **Cast vs calendered vinyl**, lamination, and **expected outdoor lifespan in years** under
   Moldovan winters — this drives real cost, since cheap vinyl re-done every 2 years is
   more expensive than good vinyl lasting 7
4. **What file format they require.** Confirm whether they accept SVG or want PDF/EPS/AI,
   and whether they can read a CutContour spot-colour layer
5. **Realistic total** to brand one car (two doors + rear) and one van, itemised
6. Minimum order quantities and volume discounts

Most Moldovan vinyl shops do **not** publish prices. Where you cannot verify a price,
say so plainly and instead write me a **short quote-request message in both Romanian and
Russian** that I can paste to them, listing exactly what to ask.

## Task 2 — Google Ads

Goal: danuvest.md appears when someone in Moldova searches anything construction-related.

Research and report:

1. **Keyword set**, Romanian *and* Russian, with search volume and CPC where you can get
   it (Google Keyword Planner data, third-party tools, or published benchmarks). Group into
   high-intent (`casa la cheie Chișinău`, `firma constructii Moldova`,
   `строительство домов Кишинев`) versus broad/awareness.
2. **Realistic CPC range for Moldova** in this category. Moldova is a small, cheap market —
   do not quote Western European or US benchmarks. Cite where the figure comes from.
3. **Budget tiers.** Give three: minimum viable, moderate, aggressive. For each state
   monthly spend, expected clicks, expected leads, and the assumed conversion rate — and
   label that conversion rate as an assumption.
4. **Campaign structure** — Search vs Performance Max vs Display for this business, and
   what to skip.
5. **Geo-targeting** — country-wide vs a Chișinău radius, and how to weight it given the
   Stăuceni location.
6. **Seasonality.** Construction demand in Moldova is seasonal. Say which months justify
   heavier spend and which to throttle.
7. **Billing and tax** — currency options, payment methods available in Moldova, and how
   Moldovan **TVA (20%)** applies.
8. **Google Business Profile** — free, and probably higher ROI than paid search for a local
   contractor. Cover how to set it up and what it's worth.

## Task 3 — Every other channel

Cost and realistic scale for each. Be blunt about which are worth it:

- **999.md paid promotion** — listing fees, "VIP"/promotion/bump packages, business
  accounts. This may well be the highest-ROI channel in Moldova; treat it seriously,
  not as an afterthought.
- **Facebook / Instagram (Meta) ads** — CPM and CPC for Moldova, minimum sensible budget,
  which formats suit construction (before/after, site progress, completed projects)
- **Telegram** — widely used in Moldova; channel advertising and local group placement
- **makler.md** and any other classifieds worth paying for
- **Outdoor** — billboard/*panouri publicitare* rates in and around Chișinău
- **Radio and local TV** — rates, and whether they make any sense at this company's size
- **Construction-specific portals and directories** in Moldova
- **SEO** — what it costs locally to rank for these terms, against paid alternatives

## Task 4 — Consolidate into a monthly average

This is the part I care most about. Produce:

1. A table separating **one-off / capital costs** (vehicle branding, website work,
   photography) from **recurring monthly costs** (ad spend, listing fees, management).
2. **Amortise the one-offs** over a sensible life — vehicle vinyl over its actual lifespan
   in years, for instance — and fold that into the monthly figure. State the period used.
3. Three consolidated monthly budgets: **minimal / moderate / aggressive**, each with what
   it buys and what result to expect.
4. A recommendation on **what to do first** with a limited budget, and in what order to
   add channels as revenue allows.

## Rules

- **Cite a source URL and the date checked for every price.** A price with no source is
  worthless to me.
- Label every figure **VERIFIED** (found published), **ESTIMATE** (your inference, with
  reasoning shown), or **UNAVAILABLE** (needs a phone call — give me the script).
- **Never invent a company name, phone number or price.** If you can't find it, say so.
  I would rather have a gap than a fabrication I discover after signing a contract.
- All prices in **MDL**, with EUR alongside. State the exchange rate you used and its date.
- State whether each price includes **TVA (20%)**; Moldovan B2B quotes vary on this.
- Prices go stale. Date the document and note which figures need re-checking soonest.
- Where you are reasoning from a comparable market rather than Moldovan data, say so
  explicitly and name the market.

## Output

A single markdown document: one section per task, tables over prose, then a **one-page
executive summary** at the top with the headline monthly number and the three things to do
first. Write it so I can hand it to an accountant without translation.
