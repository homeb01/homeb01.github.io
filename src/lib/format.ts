import { intlLocale, type Lang } from '../i18n';

/** Formats 'YYYY-MM' or 'YYYY' as a short month + year (or just the year). */
export function formatYearMonth(value: string, lang: Lang): string {
  const [year, month] = value.split('-');
  if (!year) return value;
  if (!month) return year;
  const date = new Date(Date.UTC(Number(year), Number(month) - 1, 1));
  return new Intl.DateTimeFormat(intlLocale[lang], { month: 'short', year: 'numeric', timeZone: 'UTC' }).format(date);
}

/** Formats a full date (e.g. project publication date). */
export function formatDate(date: Date, lang: Lang): string {
  return new Intl.DateTimeFormat(intlLocale[lang], { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(date);
}
