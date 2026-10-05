import type { Trail } from '$lib/content/outdoors';

/** "3,428 m" → 3428; undefined when the trail has no summit. */
export function meters(t: Trail): number | undefined {
  const n = Number(t.elevation?.replace(/[^\d]/g, ''));
  return Number.isFinite(n) && n > 0 ? n : undefined;
}
