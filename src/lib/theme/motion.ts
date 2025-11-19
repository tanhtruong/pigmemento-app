export const durations = {
  fast: 120,
  base: 200,
  slow: 300,
  slower: 450,
};

export const easings = {
  inOut: (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
  out: (t: number) => 1 - Math.pow(1 - t, 2),
  in: (t: number) => t * t,
};
