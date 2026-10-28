import type { StageApi } from './scene';

// Decides whether the stage runs in 3D, then loads it lazily so the page and its
// CSS poster are usable before any 3D code downloads.
export function shouldRender3D(): boolean {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  if (conn?.saveData) return false;
  try {
    return !!document.createElement('canvas').getContext('webgl2');
  } catch {
    return false;
  }
}

export function bootStage(canvas: HTMLCanvasElement): Promise<StageApi | null> {
  if (!shouldRender3D()) return Promise.resolve(null);
  return new Promise((resolve) => {
    const start = () =>
      import('./scene')
        .then((m) => m.startScene(canvas))
        .then(resolve)
        .catch((err) => {
          console.warn('[3d] stage unavailable', err);
          resolve(null);
        });
    const idle = (cb: () => void) => ('requestIdleCallback' in window ? requestIdleCallback(cb, { timeout: 1200 }) : setTimeout(cb, 200));
    // Touch screens: start on the first touch or a few seconds after load, so the
    // page is responsive first (the flat gold emblem shows meanwhile).
    const touch = matchMedia('(hover: none)').matches;
    let started = false;
    const go = () => {
      if (started) return;
      started = true;
      idle(start);
    };
    const afterLoad = () => {
      if (!touch) return go();
      addEventListener('pointerdown', go, { once: true, passive: true });
      setTimeout(go, 4000);
    };
    if (document.readyState === 'complete') afterLoad();
    else addEventListener('load', afterLoad, { once: true });
  });
}
