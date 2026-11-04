/**
 * Utility functions for college URLs and slugs.
 * Ensures numeric identifiers (e.g. 2011-ramakrishna...) are stripped from public URLs.
 */

export function getCleanCollegeSlug(slug?: string | null): string {
  if (!slug) return '';
  return slug.trim().replace(/^\d+-/, '');
}

export function getCollegeUrl(slug?: string | null, subpath?: string): string {
  const clean = getCleanCollegeSlug(slug);
  if (!clean) return '/colleges';
  const cleanSub = subpath ? `/${subpath.replace(/^\//, '')}` : '';
  return `/college/${clean}${cleanSub}`;
}
