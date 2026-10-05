/**
 * M3 Expressive shape library.
 *
 * Every shape is a polar radius function sampled at the same number of
 * points, so any two shapes can be morphed by interpolating radii and
 * CSS can transition between their clip-path polygons.
 */

export const SAMPLES = 120;

const fns = {
  circle: () => 1,
  cookie9: (t: number) => 1 + 0.075 * Math.cos(9 * t),
  cookie4: (t: number) => 1 + 0.1 * Math.cos(4 * t),
  sunny: (t: number) => 1 + 0.045 * Math.cos(8 * t),
  clover4: (t: number) => 0.72 + 0.28 * Math.pow(Math.abs(Math.cos(2 * t)), 0.6),
  flower: (t: number) => 0.78 + 0.22 * Math.pow(Math.abs(Math.cos(4 * t)), 0.9),
  burst: (t: number) => 0.85 + 0.15 * Math.pow(Math.abs(Math.cos(6 * t)), 2.2),
  gem: (t: number) =>
    1 / Math.pow(Math.pow(Math.abs(Math.cos(t)), 1.4) + Math.pow(Math.abs(Math.sin(t)), 1.4), 1 / 1.4),
  pill: (t: number) =>
    1 / Math.pow(Math.pow(Math.abs(Math.cos(t)) * 0.75, 4) + Math.pow(Math.abs(Math.sin(t)), 4), 1 / 4)
} satisfies Record<string, (t: number) => number>;

export type ShapeName = keyof typeof fns;

export const SHAPE_NAMES = Object.keys(fns) as ShapeName[];

const cache = new Map<ShapeName, number[]>();

export function radii(name: ShapeName): number[] {
  const hit = cache.get(name);
  if (hit) return hit;
  const f = fns[name] ?? fns.circle;
  const raw: number[] = [];
  for (let i = 0; i < SAMPLES; i++) raw.push(f((i / SAMPLES) * Math.PI * 2 - Math.PI / 2));
  const max = Math.max(...raw);
  const out = raw.map((v) => v / max);
  cache.set(name, out);
  return out;
}

export function polygon(r: number[], rotation = 0): string {
  const pts = r.map((v, i) => {
    const a = (i / r.length) * Math.PI * 2 - Math.PI / 2 + rotation;
    return `${(50 + 50 * v * Math.cos(a)).toFixed(2)}% ${(50 + 50 * v * Math.sin(a)).toFixed(2)}%`;
  });
  return `polygon(${pts.join(',')})`;
}

export function clipPathFor(name: ShapeName): string {
  return polygon(radii(name));
}

export function mix(a: number[], b: number[], t: number): number[] {
  return a.map((v, i) => v + (b[i] - v) * t);
}

export function nextShape(current: ShapeName): ShapeName {
  const order: ShapeName[] = ['cookie9', 'clover4', 'sunny', 'flower', 'gem', 'cookie4', 'burst', 'pill', 'circle'];
  return order[(order.indexOf(current) + 1) % order.length];
}
