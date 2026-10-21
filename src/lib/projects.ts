import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from '../i18n';

export type ProjectEntry = CollectionEntry<'projects'>;

/** Language from the folder: src/content/projects/<lang>/<slug>.md -> id '<lang>/<slug>'. */
export function projectLang(entry: ProjectEntry): string {
  return entry.id.split('/')[0] ?? '';
}

/** Slug without the language folder. */
export function projectSlug(entry: ProjectEntry): string {
  return entry.id.split('/').slice(1).join('/');
}

/** Published projects of a language, newest first (drafts excluded). */
export async function getProjects(lang: Lang): Promise<ProjectEntry[]> {
  const entries = await getCollection('projects', (entry) => projectLang(entry) === lang && !entry.data.draft);
  return entries.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

/** Projects for the home page: featured ones, or the latest three if none are featured. */
export async function getHomeProjects(lang: Lang): Promise<{ items: ProjectEntry[]; total: number }> {
  const all = await getProjects(lang);
  const featured = all.filter((p) => p.data.featured);
  return { items: (featured.length ? featured : all).slice(0, 3), total: all.length };
}
