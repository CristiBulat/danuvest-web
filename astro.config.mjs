import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'

// Two deploy targets are supported (see README):
//
//   Netlify (primary)  — serves the apex domain danuvest.md and is the ONLY
//                        target where the Decap CMS at /admin can authenticate,
//                        because that needs Netlify Identity + Git Gateway.
//   GitHub Pages       — a build-verified mirror at
//                        <user>.github.io/danuvest-web.
//
// A DNS apex record can only point at one host, so the mirror cannot also be
// danuvest.md. It therefore builds with a base path, which changes every
// absolute URL Astro emits — hence this switch rather than a hardcoded site.
const isPagesBuild = process.env.DEPLOY_TARGET === 'gh-pages'

const GITHUB_USER = 'CristiBulat'
const REPO_NAME = 'danuvest-web'

export default defineConfig({
  site: isPagesBuild
    ? `https://${GITHUB_USER.toLowerCase()}.github.io`
    : 'https://danuvest.md',
  base: isPagesBuild ? `/${REPO_NAME}` : undefined,
  // `i18n` makes the sitemap pair / with /ru/ through xhtml:link alternates,
  // the same pairing the <link rel="alternate" hreflang> tags in Seo.astro
  // declare in each page's head. The locale is read from the URL prefix, so
  // Romanian, which has none, is the default.
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'ro',
        locales: { ro: 'ro', ru: 'ru' },
      },
    }),
  ],
  output: 'static',
  build: {
    assets: 'assets',
  },
})
