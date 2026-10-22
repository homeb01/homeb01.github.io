/**
 * Age computed at BUILD time from the BIRTH_DATE env var ('YYYY-MM-DD').
 * - GitHub Actions passes it from a repository variable (the site is rebuilt weekly, so it stays current).
 * - Locally it can live in a gitignored `.env` (BIRTH_DATE=YYYY-MM-DD).
 * The birth date itself is never rendered nor committed; only the resulting number reaches the HTML.
 */
const FALLBACK_AGE = 25;

function readBirthDate(): string | undefined {
  // process.env: CI / shell. import.meta.env: values Vite loads from `.env` (server-side only).
  return process.env.BIRTH_DATE || (import.meta.env.BIRTH_DATE as string | undefined);
}

export function getAge(now: Date = new Date()): number {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(readBirthDate()?.trim() ?? '');
  if (!match) return FALLBACK_AGE;
  const [year, month, day] = match.slice(1).map(Number) as [number, number, number];
  const birth = new Date(Date.UTC(year, month - 1, day));
  if (birth.getUTCMonth() !== month - 1 || birth.getUTCDate() !== day || birth > now) return FALLBACK_AGE;
  let age = now.getUTCFullYear() - year;
  const beforeBirthday = now.getUTCMonth() < month - 1 || (now.getUTCMonth() === month - 1 && now.getUTCDate() < day);
  if (beforeBirthday) age--;
  return age > 0 && age < 120 ? age : FALLBACK_AGE;
}

/** Replaces every `{age}` placeholder in a text. */
export function withAge(text: string, age: number = getAge()): string {
  return text.replaceAll('{age}', String(age));
}
