import es from './es';
import en from './en';

export const languages = { es: 'Español', en: 'English' } as const;
export type Lang = keyof typeof languages;
export type UIKey = keyof typeof es;

export const defaultLang: Lang = 'es';
export const langs = Object.keys(languages) as Lang[];

const ui: Record<Lang, Record<UIKey, string>> = { es, en };

export function isLang(value: unknown): value is Lang {
  return typeof value === 'string' && value in languages;
}

/** Language of a URL: `/en/...` is English, anything else is the default (Spanish). */
export function getLangFromUrl(url: URL): Lang {
  const first = url.pathname.split('/')[1];
  return isLang(first) ? first : defaultLang;
}

/** Translator for a language: `t('nav.about')`. Falls back to the default language. */
export function useTranslations(lang: Lang) {
  return function t(key: UIKey): string {
    return ui[lang][key] ?? ui[defaultLang][key];
  };
}

/** Ensures a single leading slash and a trailing slash (unless it ends in a file or hash). */
function normalize(path: string): string {
  const [pathname = '', hash] = path.split('#');
  let p = `/${pathname}`.replace(/\/{2,}/g, '/');
  if (!p.endsWith('/') && !/\.[a-z0-9]+$/i.test(p)) p += '/';
  return hash !== undefined ? `${p}#${hash}` : p;
}

/** Removes the language prefix: `/en/projects/` -> `/projects/`. */
export function stripLang(pathname: string): string {
  const parts = pathname.split('/');
  if (isLang(parts[1]) && parts[1] !== defaultLang) parts.splice(1, 1);
  return normalize(parts.join('/') || '/');
}

/**
 * Localized path for a language-neutral path.
 * localizePath('/projects/', 'en') -> '/en/projects/'; localizePath('/projects/', 'es') -> '/projects/'
 */
export function localizePath(path: string, lang: Lang): string {
  const neutral = stripLang(path.startsWith('/') ? path : `/${path}`);
  return lang === defaultLang ? neutral : normalize(`/${lang}${neutral}`);
}

/** Equivalent page in another language (used by the language switcher and hreflang). */
export function getAlternatePath(pathname: string, target: Lang): string {
  return localizePath(stripLang(pathname), target);
}

/** BCP 47 locale used for Intl formatting. */
export const intlLocale: Record<Lang, string> = { es: 'es-ES', en: 'en-US' };
