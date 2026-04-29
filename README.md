# Danuvest — Landing Page

Landing page pentru compania de construcții **Danuvest** din Republica Moldova.

## Despre Proiect

Danuvest este o companie de construcții fondată în 2008, specializată în proiecte rezidențiale și comerciale de mici și mijlocii dimensiuni. Acest website prezintă serviciile, portofoliul și informațiile de contact ale companiei.

## Secțiuni

| Secțiune | Descriere |
|---|---|
| **Acasă** | Hero cu titlu, subtitlu, CTA și statistici cheie |
| **Misiunea Companiei** | Valorile și misiunea companiei Danuvest |
| **Servicii** | Gamă completă de servicii de construcție (6 servicii) |
| **Proiecte** | Portofoliu de proiecte finalizate (6 proiecte) |
| **Despre Noi** | Istoria companiei, cifre și echipă |
| **Contact** | Formular de ofertă și informații de contact |

## Tehnologii (Lab 4)

- **[Astro](https://astro.build/) 4** — Static Site Generator (SSG); pre-randează HTML la build
- **React 18** — componente UI hidratate selectiv (`client:load` / `client:idle`)
- **[Decap CMS](https://decapcms.org/)** — CMS git-based, montat la `/admin`
- **CSS3** — variabile CSS, Grid, Flexbox, animații (CSS framework din Lab 3)
- HTML5 semantic

### Arhitectură

```
src/
├── data/           ← surse de adevăr editabile prin CMS (JSON)
│   ├── site.json     site & navigation
│   ├── hero.json     hero section
│   ├── mission.json  mission section
│   ├── services.json services section
│   ├── projects.json projects portfolio
│   ├── about.json    about section
│   ├── contact.json  contact section + form labels
│   ├── footer.json   footer
│   └── mascot.json   mascot widget
├── components/     ← componente React (importă date din src/content)
├── layouts/
│   └── Base.astro    layout HTML principal
└── pages/
    └── index.astro   pagina home (compoziție SSG)

public/
├── admin/          ← Decap CMS
│   ├── index.html
│   └── config.yml
└── ...             ← assets statice (logo, imagini, mascot)
```

Componentele React **nu au fost rescrise** — își păstrează state-ul (`useState`/`useEffect`), animațiile (mascot, banner mobil, navbar scroll) și formularul de contact. Singura modificare: array-urile de date hard-codate au fost mutate în `src/data/*.json`, astfel încât CMS-ul să le poată edita.

## Rulare locală

```bash
npm install
npm run dev
```

Aplicația va fi disponibilă la `http://localhost:4321`.

## CMS local

Pentru a edita conținutul prin interfața CMS în dezvoltare locală (fără autentificare GitHub/Netlify):

```bash
# terminal 1
npm run cms     # pornește decap-server pe :8081 (proxy backend)

# terminal 2
npm run dev     # pornește Astro pe :4321
```

Apoi accesează `http://localhost:4321/admin/`. Modificările salvate se scriu direct în fișierele `src/data/*.json`.

## Build pentru producție

```bash
npm run build      # generează dist/ (HTML static pre-randat)
npm run preview    # servește local dist/ pe :4321
```

## Deploy

### Opțiunea 1 — Netlify (recomandat pentru CMS în producție)

1. Conectează repo-ul la Netlify (build command `npm run build`, publish dir `dist` — deja configurate în `netlify.toml`).
2. Activează **Netlify Identity** (Site settings → Identity → Enable).
3. Activează **Git Gateway** (Identity → Services → Git Gateway → Enable).
4. Invită utilizatori prin Identity → Invite users.
5. Editorii accesează `https://<site>/admin/`, se loghează, și commit-urile generate de CMS apar direct în repo.

### Opțiunea 2 — GitHub Pages

```bash
npm run deploy     # build + push în branch-ul gh-pages
```

(CMS-ul nu va putea autentifica pe GitHub Pages fără un OAuth provider extern; folosește varianta locală pentru editare în acest scenariu.)

## Live Demo

> Link de adăugat după deployment

---

*Danuvest SRL · Str. Constructorilor, Stăuceni, MD-4839 · contact@danuvest.md*
