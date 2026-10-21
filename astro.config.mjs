// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Served from the domain root (repo homeb01/homeb01.github.io), so no base. For a project site
// (homeb01.github.io/<repo>/) set e.g. BASE = '/personal-portfolio': every internal URL goes
// through src/lib/url.ts (withBase/stripBase) and the redirects below use it too.
const BASE = '';

export default defineConfig({
  site: 'https://homeb01.github.io',
  ...(BASE ? { base: BASE } : {}),
  // Astro 7 defaults to 'jsx' whitespace rules; keep HTML rules so inline spacing is unchanged.
  compressHTML: true,
  i18n: {
    // English is the default (no prefix, `/`); Spanish lives under `/es/`.
    defaultLocale: 'en',
    locales: ['en', 'es'],
    routing: { prefixDefaultLocale: false },
  },
  // Spanish used to be the default and English lived under /en/: keep those published URLs working.
  redirects: {
    '/en': `${BASE}/`,
    '/en/projects': `${BASE}/projects/`,
  },
  integrations: [
    sitemap({
      i18n: { defaultLocale: 'en', locales: { en: 'en', es: 'es' } },
      filter: (page) => !page.endsWith('/404/'),
    }),
  ],
  markdown: {
    // Code blocks follow the site theme (light/dark), see src/components/Prose.astro
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark' },
      defaultColor: false,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
