export const array = n => Array.apply(null, { length: n });

export const choose = xs => xs[Math.floor(Math.random() * xs.length)];

export const randRange = (min, max) => Math.random() * (max - min) + min;

export const mod = (a, b) => ((a % b) + b) % b;

export const distance = ({ x: x1, y: y1 }, { x: x2, y: y2 }) =>
  Math.hypot(x2 - x1, y2 - y1);

export const direction = ({ x: x1, y: y1 }, { x: x2, y: y2 }) =>
  Math.atan2(y2 - y1, x2 - x1);

export const remove = (value, xs) => {
  const i = xs.indexOf(value);
  if (i !== -1) xs.splice(i, 1);
};

export const inside = ({ x, y, img }, canvas) => {
  const pad = img.width;
  const horizontal = -pad <= x && x <= canvas.width + pad;
  const vertical = -pad <= y && y <= canvas.height + pad;
  return horizontal && vertical;
};

export const wrap = (pos, max, pad) => {
  return mod(pos + pad, max + pad * 2) - pad;
};
