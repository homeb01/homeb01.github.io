/**
 * Base-path helpers. The site may be served from the domain root (`base: '/'`) or from a
 * subfolder (e.g. `base: '/personal-portfolio'` on a GitHub Pages project site).
 * Every internal URL goes through `withBase`; every incoming pathname through `stripBase`.
 */

/** Configured base without trailing slash: '' at the root, '/personal-portfolio' in a subfolder. */
export const BASE = import.meta.env.BASE_URL.replace(/\/+$/, '');

/** True for URLs that must not be prefixed: absolute (`https:`, `mailto:`…), protocol-relative, hash or query only. */
function isExternal(url: string): boolean {
  return /^[a-z][a-z0-9+.-]*:/i.test(url) || url.startsWith('//') || url.startsWith('#') || url.startsWith('?');
}

/** Prefixes a root-relative path with the base: withBase('/favicon.svg') -> '/personal-portfolio/favicon.svg'. */
export function withBase(path: string): string {
  if (isExternal(path)) return path;
  const p = path.startsWith('/') ? path : `/${path}`;
  if (BASE && (p === BASE || p.startsWith(`${BASE}/`))) return p; // already prefixed
  return `${BASE}${p}`;
}

/** Removes the base from a pathname: '/personal-portfolio/en/' -> '/en/'. */
export function stripBase(pathname: string): string {
  if (!BASE) return pathname;
  if (pathname === BASE) return '/';
  return pathname.startsWith(`${BASE}/`) ? pathname.slice(BASE.length) : pathname;
}

/** Absolute URL (canonical, hreflang, Open Graph) for an internal path or an already absolute URL. */
export function absoluteUrl(path: string, site: URL | string | undefined): string {
  if (isExternal(path)) return path;
  return new URL(withBase(path), site).href;
}
