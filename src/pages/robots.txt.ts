import type { APIRoute } from 'astro';
import { absoluteUrl } from '../lib/url';

/** robots.txt with the sitemap URL built from `site` + `base`. */
export const GET: APIRoute = ({ site }) =>
  new Response(`User-agent: *\nAllow: /\n\nSitemap: ${absoluteUrl('/sitemap-index.xml', site)}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
