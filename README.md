# Danuvest — Landing Page

Landing page pentru compania de construcții **Danuvest** din Republica Moldova.

## Despre proiect

Danuvest este o companie de construcții fondată în 2008, specializată în
proiecte rezidențiale și comerciale de mici și medii dimensiuni. Site-ul
prezintă serviciile, valorile și datele de contact ale companiei.

## Secțiuni

| Secțiune | Descriere |
|---|---|
| **Acasă** | Hero cu titlu, subtitlu, două CTA-uri și trei indicatori cheie |
| **Servicii** | Șase servicii de construcție |
| **Proiecte** | Șase șantiere reale, cu galerie foto per obiect |
| **Despre Noi** | Istoria companiei, cifre, echipă |
| **Contact** | Date de contact + butoane directe (telefon, WhatsApp, Viber, email) |

> **Fotografiile din secțiunea Proiecte nu sunt editabile din CMS.** Fiecare
> proiect își ia pozele din `src/assets/projects/<slug>-1.jpg … -4.jpg`, iar
> componenta le rezolvă după `slug` — dacă slug-ul se schimbă din CMS, build-ul
> cade cu `Projects: missing image`. Numărul de poze trebuie să corespundă
> numărului de descrieri din `photos`; poza `-1` este și coperta cardului.
> Adăugarea sau înlocuirea unei poze este o sarcină de dezvoltator.

Toate cele 24 de fotografii sunt tăiate la **16:9**, pentru că și rama cardului
este 16:9: un fișier cu alt raport este re-decupat de browser și pierde exact
încadrarea pentru care a fost ales. Decupajele sunt scrise în
`scripts/crop-project-photos.py` — câte o linie per fotografie, cu cât se taie
de sus și de jos — și se regenerează cu:

```bash
python3 scripts/crop-project-photos.py ~/Downloads/Poze
```

Scriptul are nevoie de ImageMagick 7 (`magick`). Tăierile de jos sunt dictate
și de ștampila de dată pe care telefoanele o ard în imagine la ~91% din
înălțime; scriptul avertizează dacă un decupaj ajunge în zona aceea.

## Tehnologii

- **[Astro](https://astro.build/) 4** — generator de site static (SSG)
- **CSS3** — variabile CSS, Grid, Flexbox
- **[Decap CMS](https://decapcms.org/)** — CMS git-based, montat la `/admin`
- **Inter Variable** — font self-hosted (subseturile latin + latin-ext)

**Zero JavaScript de framework.** Site-ul nu încarcă React, Preact sau altceva
similar. Există două scripturi în pagină, ambele vanilla: bara de navigație
(fundal la scroll + meniul mobil) și galeria din secțiunea Proiecte. Grila de
proiecte este CSS curat — nu există sortare, deci nu are ce calcula.

### Arhitectură

```
src/
├── assets/         ← imagini procesate la build (astro:assets)
├── data/           ← conținut editabil prin CMS (JSON)
│   ├── site.json      site & navigație
│   ├── hero.json      secțiunea hero
│   ├── services.json  servicii
│   ├── projects.json  portofoliu (pozele stau în assets/projects/)
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

| Script | Ce face |
|---|---|
| `node scripts/build-brand.mjs` | generează activele de brand în `brand/` |
| `python3 scripts/crop-project-photos.py` | regenerează cele 24 de fotografii din `src/assets/projects/` |

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

Deploy-ul este automat. `.github/workflows/deploy-netlify.yml` rulează la fiecare
push pe `main` — deci și la orice merge, inclusiv squash și rebase — construiește
`dist/`, îl arhivează și îl încarcă prin `POST /api/v1/sites/{site_id}/deploys`.
Poate fi pornit și manual din Actions → **Deploy to Netlify** → *Run workflow*.
Tokenul stă în secretul de repo `NETLIFY_AUTH_TOKEN`.

> **Nu conecta repo-ul la integrarea git a Netlify.** Site-ul este deliberat
> neconectat — `build_settings` sunt goale — iar workflow-ul de mai sus presupune
> că rămâne așa. Conectarea ar reactiva `netlify.toml` *peste* `public/_headers`,
> adică două surse paralele de antete care se pot desincroniza tăcut.

Configurare CMS, o singură dată, din dashboard-ul Netlify:

1. Site settings → Identity → Enable.
2. Identity → Services → Git Gateway → Enable.
3. Identity → Invite users.
4. Editorii intră pe `https://danuvest.md/admin/`.

**`netlify.toml` nu este citit pe această cale.** Nu ajunge niciodată la Netlify:
se arhivează doar `dist/`, iar fișierul stă în rădăcina repo-ului. Ce se aplică
efectiv sunt `public/_headers` și `public/_redirects`, pe care Astro le copiază
verbatim în `dist/` — de acolo vin cache-ul de un an pentru `/assets/*` (numele
conțin hash), antetele de securitate și rescrierea SPA pentru `/admin/*`.
Workflow-ul verifică la fiecare rulare că ambele au ajuns în `dist/` și
eșuează dacă lipsesc. Ține-le totuși sincronizate cu `netlify.toml`: acesta
redevine autoritar în clipa în care cineva conectează deploy-urile prin git.
Nu există `Content-Security-Policy` — motivul, detaliat, este scris în
`netlify.toml`.

### GitHub Pages — oglindă

`.github/workflows/deploy-pages.yml` publică la
`cristibulat.github.io/danuvest-web` la fiecare push pe `main`. Build-ul rulează
cu `DEPLOY_TARGET=gh-pages`, ceea ce schimbă `site` și `base` în
`astro.config.mjs`, iar `CNAME` este eliminat din artefact ca să nu revendice
domeniul Netlify.

## CI

`.github/workflows/ci.yml` rulează `astro check` + `astro build` și oprește
build-ul dacă **un singur fișier depășește 450 KB** sau dacă `dist/` în
întregime depășește **7 MB**, listând cele mai mari zece fișiere. Garda există
pentru un motiv concret: site-ul livra la un moment dat 12 MB, din care 10,2 MB
erau două fotografii neredimensionate.

Limita per fișier este cea care prinde de fapt acea regresie. Plafonul pe
`dist/` era 2 MB cât timp site-ul avea două fotografii; secțiunea Proiecte a
adus 24, iar `astro:assets` scoate mai multe variante din fiecare — deci
`dist/` conține mult mai mult decât descarcă un vizitator: browserul alege o
singură lățime din fiecare `srcset`, iar cele 24 de imagini din galerie se
încarcă doar dacă cineva deschide un proiect. Acum `dist/` este ~5,4 MB.

## Întreținere

- **Astro 4 are vulnerabilități raportate.** Actualizarea la Astro 7 este o
  migrare majoră, separată de această versiune. Majoritatea problemelor privesc
  SSR/middleware, pe care acest site static nu le folosește; cea relevantă este
  citirea de fișiere prin serverul de dezvoltare.
- `@astrojs/sitemap` este fixat la **3.2.1**. Versiunile 3.7+ folosesc un hook
  disponibil doar în Astro 5 și opresc build-ul pe Astro 4.
- Cele șase servicii sunt scrise într-un singur loc, `services.json`. Lista din
  subsol a fost eliminată odată cu restrângerea subsolului la un singur rând.

---

*Danuvest SRL · Str. Constructorilor, Stăuceni, MD-4839 · contact@danuvest.md*
