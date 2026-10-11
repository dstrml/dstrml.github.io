import { meridian } from '../lib/globe';

const SECONDS_PER_TURN = 144;

const meridians = document.querySelectorAll<SVGPathElement>('[data-meridian]');

if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const start = performance.now();
  const frame = (now: number) => {
    const spin = (((now - start) / 1000 / SECONDS_PER_TURN) * 360) % 360;
    for (const path of meridians) path.setAttribute('d', meridian(Number(path.dataset.meridian), spin));
    requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
}
