// The one-screen shell: stage (3D), ring spokes, window open/close, and the
// app-style launch for businesses that have their own website.
import { navigate } from 'astro:transitions/client';
import { bootStage } from './three/boot';
import { stageLayout } from './three/layout';
import type { StageApi } from './three/scene';
import { bindForms } from './forms';

const FROM_KEY = 'mvm-from';
let stage: StageApi | null = null;
let stageBooted = false;
let firstLoad = true;

function bootOnce() {
  if (stageBooted) return;
  const canvas = document.querySelector<HTMLCanvasElement>('[data-stage-canvas]');
  if (!canvas) return;
  stageBooted = true;
  bootStage(canvas).then((api) => (stage = api));
}

// Ellipse orbit and one spoke per room (desktop only; decorative).
function drawSpokes() {
  const svg = document.querySelector<SVGSVGElement>('[data-spokes]');
  if (!svg) return;
  const w = innerWidth;
  const h = innerHeight;
  const L = stageLayout(w, h);
  if (L.mobile || !L.rx || !L.ry) {
    svg.innerHTML = '';
    return;
  }
  const n = document.querySelectorAll('[data-room]').length || 8;
  const inner = L.ry * 0.62;
  let s = `<ellipse class="orbit" cx="${w / 2}" cy="${L.cy}" rx="${L.rx}" ry="${L.ry}"/><circle class="orbit2" cx="${w / 2}" cy="${L.cy}" r="${inner}"/>`;
  for (let i = 0; i < n; i++) {
    const a = -Math.PI / 2 + (i / n) * Math.PI * 2;
    s += `<line class="spoke" data-spoke="${i}" x1="${w / 2 + Math.cos(a) * inner}" y1="${L.cy + Math.sin(a) * inner}" x2="${w / 2 + Math.cos(a) * L.rx}" y2="${L.cy + Math.sin(a) * L.ry}"/>`;
  }
  svg.innerHTML = s;
}

function lightSpoke(i: number | null) {
  document.querySelectorAll('[data-spoke]').forEach((el) => el.classList.toggle('on', el.getAttribute('data-spoke') === String(i)));
}

function rememberTile(link: Element) {
  const tile = link.querySelector('.app') || link;
  const r = tile.getBoundingClientRect();
  try {
    sessionStorage.setItem(FROM_KEY, JSON.stringify({ x: r.left, y: r.top, w: r.width, h: r.height }));
  } catch {
    /* storage blocked */
  }
}

// Grow the window out of the tile that opened it (like an iPhone app opening).
function openWindowAnimation() {
  const win = document.querySelector<HTMLElement>('[data-window]');
  if (!win) return;
  const body = win.querySelector<HTMLElement>('[data-win-body]');
  body && [...body.children].forEach((el, n) => (el as HTMLElement).style.setProperty('--n', String(Math.min(n, 10))));
  let from: { x: number; y: number; w: number; h: number } | null = null;
  try {
    from = JSON.parse(sessionStorage.getItem(FROM_KEY) || 'null');
    sessionStorage.removeItem(FROM_KEY);
  } catch {
    /* storage blocked */
  }
  if (!from || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  win.classList.add('is-entering');
  const r = win.getBoundingClientRect();
  const dx = from.x + from.w / 2 - (r.left + r.width / 2);
  const dy = from.y + from.h / 2 - (r.top + r.height / 2);
  win.animate(
    [
      { transform: `translate(${dx}px, ${dy}px) scale(${from.w / r.width}, ${from.h / r.height})`, borderRadius: '40px', opacity: 0.6 },
      { transform: 'none', borderRadius: '22px', opacity: 1 },
    ],
    { duration: 650, easing: 'cubic-bezier(.16,1,.3,1)' },
  ).finished.then(() => setTimeout(() => win.classList.remove('is-entering'), 1200));
}

function launch(link: HTMLAnchorElement) {
  const el = document.querySelector<HTMLElement>('[data-launch]');
  const tile = (link.querySelector('.app') || link).getBoundingClientRect();
  if (!el || matchMedia('(prefers-reduced-motion: reduce)').matches) {
    location.href = link.href;
    return;
  }
  const logo = link.dataset.launchLogo;
  const host = link.dataset.external;
  const title = link.querySelector('.room__title')?.textContent || '';
  el.replaceChildren();
  if (logo) {
    const img = document.createElement('img');
    img.src = logo;
    img.alt = title;
    el.append(img);
  }
  const note = document.createElement('small');
  note.textContent = `${title} · ${host} …`;
  el.append(note);
  el.hidden = false;
  el.animate(
    [
      { left: `${tile.left}px`, top: `${tile.top}px`, width: `${tile.width}px`, height: `${tile.height}px`, borderRadius: '15px' },
      { left: '0px', top: '0px', width: `${innerWidth}px`, height: `${innerHeight}px`, borderRadius: '0px' },
    ],
    { duration: 620, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'forwards' },
  );
  requestAnimationFrame(() => el.classList.add('go'));
  setTimeout(() => (location.href = link.href), 1000);
}

function bindPage() {
  bootOnce();
  drawSpokes();
  document.querySelectorAll<HTMLAnchorElement>('[data-room]').forEach((a) => {
    const i = Number(a.dataset.room);
    const n = document.querySelectorAll('[data-room]').length || 8;
    a.addEventListener('pointerenter', () => {
      lightSpoke(i);
      stage?.focus(-Math.PI / 2 + (i / n) * Math.PI * 2);
    });
    a.addEventListener('pointerleave', () => {
      lightSpoke(null);
      stage?.focus(null);
    });
    a.addEventListener('click', (e) => {
      if (a.dataset.external) {
        e.preventDefault();
        launch(a);
      } else rememberTile(a);
    });
  });
  document.querySelectorAll('[data-win-link]').forEach((a) => a.addEventListener('click', () => rememberTile(a)));
  document.querySelectorAll<HTMLAnchorElement>('[data-lang-link]').forEach((a) =>
    a.addEventListener('click', () => {
      try {
        localStorage.setItem('mvm-lang', a.dataset.langLink!);
      } catch {
        /* storage blocked */
      }
    }),
  );
  document.querySelectorAll<HTMLButtonElement>('[data-share]').forEach((b) =>
    b.addEventListener('click', async () => {
      const data = { title: document.title, url: location.href };
      try {
        if (navigator.share) await navigator.share(data);
        else {
          await navigator.clipboard.writeText(location.href);
          const label = b.querySelector('[data-share-label]');
          if (label) label.textContent = '✓';
        }
      } catch {
        /* cancelled */
      }
    }),
  );
  bindForms();
  // Project filters (Our work).
  document.querySelectorAll<HTMLElement>('[data-filter-group]').forEach((group) => {
    const grid = document.querySelector<HTMLElement>('[data-filter-grid]');
    const empty = document.querySelector<HTMLElement>('[data-filter-empty]');
    group.querySelectorAll<HTMLButtonElement>('[data-filter]').forEach((b) =>
      b.addEventListener('click', () => {
        const key = b.dataset.filter!;
        group.querySelectorAll('[data-filter]').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
        let shown = 0;
        grid?.querySelectorAll<HTMLElement>('[data-category]').forEach((card) => {
          const on = key === 'all' || card.dataset.category === key;
          card.hidden = !on;
          if (on) shown++;
        });
        if (empty) empty.hidden = shown > 0;
      }),
    );
  });
  openWindowAnimation();
  // After an in-site navigation, move focus into the window so keyboard and
  // screen-reader users land on its heading (a fresh page load keeps the default).
  const heading = document.querySelector<HTMLElement>('[data-window] h1');
  heading?.setAttribute('tabindex', '-1');
  if (heading && !firstLoad) heading.focus({ preventScroll: true });
  firstLoad = false;
}

addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  const close = document.querySelector<HTMLAnchorElement>('[data-window-close]');
  if (close) navigate(close.href);
});
addEventListener('resize', drawSpokes);
document.addEventListener('astro:page-load', bindPage);
