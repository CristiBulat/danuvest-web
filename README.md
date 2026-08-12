# Danuvest — Landing Page

Landing page pentru compania de construcții **Danuvest** din Republica Moldova.

## Despre proiect

Danuvest este o companie de construcții fondată în 2008, specializată în
proiecte rezidențiale și comerciale de mici și medii dimensiuni. Site-ul
prezintă serviciile, valorile și datele de contact ale companiei.

## Secțiuni

| Secțiune | Descriere |
|---|---|
| **Acasă** | Hero cu titlu, subtitlu, două CTA-uri și patru indicatori cheie |
| **Servicii** | Șase servicii de construcție |
| **Despre Noi** | Istoria companiei, cifre, echipă |
| **Contact** | Date de contact + butoane directe (telefon, WhatsApp, Viber, email) |

> Secțiunea **Proiecte** există în cod (`src/components/Projects.astro`) dar
> **nu este publicată**. Cele șase intrări sunt fotografii stock cu denumiri
> inventate — nu pot apărea sub titlul „Proiectele noastre". Înlocuiește-le cu
> proiecte reale, apoi importă componenta în `src/pages/index.astro`.

## Tehnologii

- **[Astro](https://astro.build/) 4** — generator de site static (SSG)
- **CSS3** — variabile CSS, Grid, Flexbox
- **[Decap CMS](https://decapcms.org/)** — CMS git-based, montat la `/admin`
- **Inter Variable** — font self-hosted (subseturile latin + latin-ext)

**Zero JavaScript de framework.** Site-ul nu încarcă React, Preact sau altceva
similar. Singurul script din pagină are ~40 de linii și se ocupă de bara de
navigație (fundal la scroll + meniul mobil).

### Arhitectură

```
src/
├── assets/         ← imagini procesate la build (astro:assets)
├── data/           ← conținut editabil prin CMS (JSON)
│   ├── site.json      site & navigație
│   ├── hero.json      secțiunea hero
│   ├── services.json  servicii
│   ├── projects.json  portofoliu (nepublicat)
│   ├── about.json     despre noi
│   ├── contact.json   contact + butoane directe
│   └── footer.json    footer
├── components/     ← componente .astro
│   └── Icon.astro     set SVG inline (vezi docs/icon-map.md)
├── layouts/
│   └── Base.astro     shell HTML + meta
├── pages/
│   └── index.astro    compoziția paginii
└── styles/         ← un fișier per secțiune, intrare: main.css

public/
├── admin/          ← Decap CMS
├── favicon.png, apple-touch-icon.png, robots.txt, CNAME
```

**Imaginile nu se pun în `public/`.** Fișierele din `public/` sunt copiate ca
atare, neoptimizate — așa a ajuns site-ul să livreze cândva un JPEG de 6,3 MB.
Imaginile se pun în `src/assets/` și se randează cu `<Image />` din
`astro:assets`, care generează automat WebP/AVIF redimensionat.

## Rulare locală

```bash
npm install
npm run dev
```

Aplicația pornește la `http://localhost:4321`.

| Comandă | Ce face |
|---|---|
| `npm run dev` | server de dezvoltare |
| `npm run build` | generează `dist/` |
| `npm run preview` | servește local `dist/` |
| `npm run check` | verificare de tipuri (`astro check`) |
| `npm run cms` | proxy local pentru CMS |

## CMS local

Pentru editare prin interfața CMS fără autentificare GitHub/Netlify:

```bash
npm run cms
```

```bash
npm run dev
```

Apoi deschide `http://localhost:4321/admin/`. Modificările se scriu direct în
`src/data/*.json`.

Câmpurile de tip iconiță sunt liste derulante, nu text liber: `Icon.astro`
oprește build-ul la o denumire necunoscută, iar o listă previne greșelile de
tastare. Vezi [docs/icon-map.md](docs/icon-map.md).

## Deploy

Sunt configurate două ținte. **Un domeniu apex poate indica un singur host**,
deci `danuvest.md` aparține Netlify, iar GitHub Pages rămâne o oglindă.

### Netlify — principal

Servește `danuvest.md` și este **singurul loc unde CMS-ul se poate autentifica**
(are nevoie de Netlify Identity + Git Gateway).

1. Conectează repo-ul (build `npm run build`, publish `dist` — deja în `netlify.toml`).
2. Site settings → Identity → Enable.
3. Identity → Services → Git Gateway → Enable.
4. Identity → Invite users.
5. Editorii intră pe `https://danuvest.md/admin/`.

`netlify.toml` setează cache pe un an pentru `/assets/*` (numele conțin hash) și
antete de securitate. Nu are `Content-Security-Policy` — motivul, detaliat, este
scris în fișier.

### GitHub Pages — oglindă

`.github/workflows/deploy-pages.yml` publică la
`<user>.github.io/danuvest-web` la fiecare push pe `main`. Build-ul rulează cu
`DEPLOY_TARGET=gh-pages`, ceea ce schimbă `site` și `base` în `astro.config.mjs`,
iar `CNAME` este eliminat din artefact ca să nu revendice domeniul Netlify.

## CI

`.github/workflows/ci.yml` rulează `astro check` + `astro build` și **oprește
build-ul dacă `dist/` depășește 2 MB**, listând cele mai mari zece fișiere.
Garda există pentru un motiv concret: site-ul livra la un moment dat 12 MB, din
care 10,2 MB erau două fotografii neredimensionate.

## Întreținere

- **Astro 4 are vulnerabilități raportate.** Actualizarea la Astro 7 este o
  migrare majoră, separată de această versiune. Majoritatea problemelor privesc
  SSR/middleware, pe care acest site static nu le folosește; cea relevantă este
  citirea de fișiere prin serverul de dezvoltare.
- `@astrojs/sitemap` este fixat la **3.2.1**. Versiunile 3.7+ folosesc un hook
  disponibil doar în Astro 5 și opresc build-ul pe Astro 4.
- Cele șase servicii sunt scrise în trei locuri (`services.json`,
  `footer.json`, iar denumirile revin în `contact.json`). Modifică-le peste tot.

---

*Danuvest SRL · Str. Constructorilor, Stăuceni, MD-4839 · contact@danuvest.md*
