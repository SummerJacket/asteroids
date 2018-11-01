export const array = n => Array.from({ length: n });

export const choose = xs => xs[Math.trunc(Math.random() * xs.length)];

export const randRange = (min, max) => Math.random() * (max - min) + min;

export const mod = (a, b) => ((a % b) + b) % b;

export const distance = ({ x: x1, y: y1 }, { x: x2, y: y2 }) =>
  Math.hypot(x2 - x1, y2 - y1);

export const inside = ({ x, y, img }, canvas) => {
  const pad = img.width;
  const horizontal = -pad <= x && x <= canvas.width + pad;
  const vertical = -pad <= y && y <= canvas.height + pad;
  return horizontal && vertical;
};

export const wrap = (pos, max, pad) => {
  return mod(pos + pad, max + pad * 2) - pad;
};
