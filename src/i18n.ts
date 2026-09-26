// The site ships in two languages: Romanian at / and Russian at /ru/.
//
// Content lives in src/data/*.json (Romanian) and src/data/ru/*.json
// (Russian), one file per section in both, all CMS-editable. The Romanian
// files are the shape of record: `ru` below is typed as `Content`, which is
// inferred from the Romanian imports, so a Russian file that drifts out of
// shape — a missing field, a renamed key — fails `astro check` instead of
// rendering a hole on one language only.
//
// `ui` holds the handful of strings that are not content: screen-reader
// labels and script-driven text that were hardcoded in Romanian before the
// second language existed. They are not in the CMS on purpose — nobody
// needs to edit "Închide galeria".

import site from './data/site.json'
import hero from './data/hero.json'
import services from './data/services.json'
import projects from './data/projects.json'
import fleet from './data/fleet.json'
import about from './data/about.json'
import contact from './data/contact.json'
import footer from './data/footer.json'

import siteRu from './data/ru/site.json'
import heroRu from './data/ru/hero.json'
import servicesRu from './data/ru/services.json'
import projectsRu from './data/ru/projects.json'
import fleetRu from './data/ru/fleet.json'
import aboutRu from './data/ru/about.json'
import contactRu from './data/ru/contact.json'
import footerRu from './data/ru/footer.json'

export const LANGS = ['ro', 'ru'] as const
export type Lang = (typeof LANGS)[number]

const ro = { site, hero, services, projects, fleet, about, contact, footer }
type Content = typeof ro

const ru: Content = {
  site: siteRu,
  hero: heroRu,
  services: servicesRu,
  projects: projectsRu,
  fleet: fleetRu,
  about: aboutRu,
  contact: contactRu,
  footer: footerRu,
}

const content: Record<Lang, Content> = { ro, ru }

export function getContent(lang: Lang): Content {
  return content[lang]
}

const uiRo = {
  mainNav: 'Navigare principală',
  menuOpen: 'Deschide meniu',
  menuClose: 'Închide meniu',
  projectGallery: 'Galerie proiect',
  closeGallery: 'Închide galeria',
  prevPhoto: 'Fotografia anterioară',
  nextPhoto: 'Fotografia următoare',
  photo: 'Fotografia',
  prevMachine: 'Utilajul anterior',
  nextMachine: 'Utilajul următor',
  // The switch always offers the *other* language, labelled in that
  // language, so a reader who cannot read this page can still find theirs.
  switchTo: 'Версия на русском языке',
  consentText: 'Folosim cookie-uri de analiză ({tools}) ca să aflăm cum ajung clienții la noi. Le activăm doar cu acordul tău.',
  consentAccept: 'Accept',
  consentDecline: 'Refuz',
  consentSettings: 'Setări cookie',
}

type Ui = typeof uiRo

const uiRu: Ui = {
  mainNav: 'Основная навигация',
  menuOpen: 'Открыть меню',
  menuClose: 'Закрыть меню',
  projectGallery: 'Галерея проекта',
  closeGallery: 'Закрыть галерею',
  prevPhoto: 'Предыдущая фотография',
  nextPhoto: 'Следующая фотография',
  photo: 'Фотография',
  prevMachine: 'Предыдущая техника',
  nextMachine: 'Следующая техника',
  switchTo: 'Versiunea în limba română',
  consentText: 'Мы используем аналитические cookie ({tools}), чтобы понимать, как клиенты нас находят. Они включаются только с вашего согласия.',
  consentAccept: 'Принять',
  consentDecline: 'Отказаться',
  consentSettings: 'Настройки cookie',
}

const ui: Record<Lang, Ui> = { ro: uiRo, ru: uiRu }

export function getUi(lang: Lang): Ui {
  return ui[lang]
}

/** Values for <html lang>, hreflang and og:locale. */
export const LOCALE: Record<Lang, { html: string; og: string }> = {
  ro: { html: 'ro', og: 'ro_RO' },
  ru: { html: 'ru', og: 'ru_RU' },
}

/**
 * Root-relative home URL for a language, base path included. '/' and '/ru/'
 * normally; '/danuvest-web/' and '/danuvest-web/ru/' on the GitHub Pages
 * mirror build, which serves under a base path.
 */
export function homePath(lang: Lang): string {
  const base = import.meta.env.BASE_URL.endsWith('/')
    ? import.meta.env.BASE_URL
    : `${import.meta.env.BASE_URL}/`
  return lang === 'ro' ? base : `${base}${lang}/`
}

export function otherLang(lang: Lang): Lang {
  return lang === 'ro' ? 'ru' : 'ro'
}
