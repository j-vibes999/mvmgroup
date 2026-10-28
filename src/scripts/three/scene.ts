import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { createLacquerWall } from './lacquerWall';
import { createGoldDust } from './goldDust';
import { createEmblem } from './emblem';
import { stageLayout } from './layout';

export type StageApi = { focus: (angle: number | null) => void };

// The stage: black lacquer wall lit by the visitor's candle (pointer / touch),
// floating gold leaf, and the golden MVM emblem that leans toward the business
// being pointed at.
export async function startScene(canvas: HTMLCanvasElement): Promise<StageApi> {
  const small = innerWidth < 760;
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: !small, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(devicePixelRatio, small ? 1.25 : 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#0E0B08');
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environmentIntensity = 0.55;

  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
  camera.position.set(0, 0, 12);

  const WALL_W = 30;
  const WALL_H = 17;
  const WALL_Z = -5;
  const wall = await createLacquerWall('/patterns/khor-lattice-tile.svg', small);
  wall.mesh.scale.set(WALL_W / 26, WALL_H / 15, 1);
  wall.mesh.position.z = WALL_Z;
  wall.setAspect(WALL_W / WALL_H);
  // How much of the wall is on screen (world units), to map screen points onto it.
  const seen = { w: 1, h: 1 };
  scene.add(wall.mesh);

  const holder = await createEmblem('/brand/logo-emblem.svg', small);
  scene.add(holder);

  const candle = new THREE.PointLight('#FFC27A', 90, 18, 1.5);
  candle.position.set(0, 0, 4);
  scene.add(candle);
  const key = new THREE.DirectionalLight('#FFE3B0', 1.2);
  key.position.set(3, 4, 6);
  scene.add(key);
  const rim = new THREE.DirectionalLight('#E8D19A', 0.8);
  rim.position.set(-5, -2, -2);
  scene.add(rim);

  const dust = createGoldDust(small ? 320 : 1400, renderer.getPixelRatio());
  dust.points.scale.set(16 / 14, 9 / 7, 1);
  dust.points.position.y = -2.6; // the dust field spans y -1.5…5.5 before scaling
  scene.add(dust.points);

  // The candle starts on the emblem until the visitor moves.
  const target = new THREE.Vector2(0.5, 1 - stageLayout(innerWidth, innerHeight).cy / innerHeight);
  const cur = target.clone();
  const tilt = new THREE.Vector2();
  const tiltTarget = new THREE.Vector2();
  let focused = false;
  addEventListener('pointermove', (e) => {
    target.set(e.clientX / innerWidth, 1 - e.clientY / innerHeight);
    if (!focused) tiltTarget.set((e.clientY / innerHeight - 0.5) * 0.5, (e.clientX / innerWidth - 0.5) * 0.7);
  });
  addEventListener('pointerdown', (e) => target.set(e.clientX / innerWidth, 1 - e.clientY / innerHeight));

  const resize = () => {
    const w = innerWidth;
    const h = innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    seen.h = 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * (camera.position.z - WALL_Z);
    seen.w = seen.h * camera.aspect;
    // Keep the candle glow about the same share of the screen on phones and desktops.
    wall.setSharpness(30 * Math.max(1, 10 / seen.w) ** 2);
    const visibleH = 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z;
    const unitsPerPx = visibleH / h;
    const { cy, diameter } = stageLayout(w, h);
    holder.scale.setScalar(((diameter / 2) * unitsPerPx) / 216);
    holder.position.y = (h / 2 - cy) * unitsPerPx;
  };
  addEventListener('resize', resize);
  resize();

  let visible = true;
  document.addEventListener('visibilitychange', () => (visible = !document.hidden));

  const timer = new THREE.Timer();
  renderer.setAnimationLoop(() => {
    if (!visible) return;
    timer.update();
    const t = timer.getElapsed();
    cur.lerp(target, 0.07);
    tilt.lerp(tiltTarget, 0.05);
    wall.setLight(0.5 + ((cur.x - 0.5) * seen.w) / WALL_W, 0.5 + ((cur.y - 0.5) * seen.h) / WALL_H);
    wall.tick(t);
    dust.tick(t);
    candle.position.set((cur.x - 0.5) * 12, (cur.y - 0.5) * 7, 4);
    candle.intensity = 90 * (0.9 + 0.1 * Math.sin(t * 7) * Math.sin(t * 3.1));
    holder.rotation.x = tilt.x + Math.sin(t * 0.4) * 0.04;
    holder.rotation.y = tilt.y + Math.sin(t * 0.3) * 0.12;
    renderer.render(scene, camera);
  });

  renderer.render(scene, camera);
  canvas.dataset['3d'] = 'ready';
  canvas.closest('[data-stage]')?.classList.add('is-3d');

  return {
    focus(angle) {
      focused = angle !== null;
      if (angle !== null) tiltTarget.set(Math.sin(angle) * 0.55, Math.cos(angle) * 0.55);
    },
  };
}
