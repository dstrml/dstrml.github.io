export const GLOBE_R = 162;
const MERIDIAN_STEP_DEG = 20;
export const MERIDIAN_COUNT = 180 / MERIDIAN_STEP_DEG;

export function lens(bulge: number) {
  if (bulge < 0.5) return `M0-${GLOBE_R}V${GLOBE_R}`;
  const r = ((bulge ** 2 + GLOBE_R ** 2) / (2 * bulge)).toFixed(2);
  return `M0-${GLOBE_R}A${r} ${r} 0 0 1 0 ${GLOBE_R}A${r} ${r} 0 0 1 0-${GLOBE_R}`;
}

export function meridian(index: number, spinDeg = 0) {
  const longitude = ((index * MERIDIAN_STEP_DEG + spinDeg) * Math.PI) / 180;
  return lens(GLOBE_R * Math.abs(Math.sin(longitude)));
}
