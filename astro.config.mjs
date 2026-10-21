// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://homeb01.github.io',
  // Served from the domain root (repo homeb01/homeb01.github.io), so no `base`. For a project
  // site (homeb01.github.io/<repo>/) add e.g. base: '/personal-portfolio': every internal URL goes
  // through src/lib/url.ts (withBase/stripBase) and keeps working.
  // Astro 7 defaults to 'jsx' whitespace rules; keep HTML rules so inline spacing is unchanged.
  compressHTML: true,
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    sitemap({
      i18n: { defaultLocale: 'es', locales: { es: 'es', en: 'en' } },
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
