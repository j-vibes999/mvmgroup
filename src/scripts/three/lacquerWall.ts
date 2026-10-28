import * as THREE from 'three';

// Black lacquer wall with the khor lattice stencilled in gold. The gold only
// lights up near the candle (the pointer), as in the sim at night.
async function patternTexture(url: string, px: number): Promise<THREE.Texture> {
  const img = new Image();
  img.src = url;
  await img.decode();
  const c = document.createElement('canvas');
  c.width = c.height = px;
  const g = c.getContext('2d')!;
  const step = px / 6;
  for (let y = 0; y < 6; y++) for (let x = 0; x < 6; x++) g.drawImage(img, x * step, y * step, step, step);
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.anisotropy = 8;
  return t;
}

export async function createLacquerWall(patternUrl: string, mobile: boolean) {
  // Plane is 26×15 world units; the scene scales and places it.
  const uniforms = {
    uPattern: { value: await patternTexture(patternUrl, mobile ? 1024 : 1536) },
    uLight: { value: new THREE.Vector2(0.5, 0.6) },
    uTime: { value: 0 },
    uAspect: { value: 1 },
    uSharp: { value: 30 },
  };
  const mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(26, 15),
    new THREE.ShaderMaterial({
      uniforms,
      vertexShader: /* glsl */ `
        varying vec2 vUv;
        void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
      fragmentShader: /* glsl */ `
        uniform sampler2D uPattern; uniform vec2 uLight; uniform float uTime; uniform float uAspect; uniform float uSharp;
        varying vec2 vUv;
        void main() {
          float p = texture2D(uPattern, vUv * vec2(3.4, 2.0)).a;
          vec2 d = (vUv - uLight) * vec2(uAspect, 1.0);
          float flicker = 0.92 + 0.08 * sin(uTime * 7.0) * sin(uTime * 3.1 + 1.3);
          float glow = exp(-dot(d, d) * uSharp) * flicker;
          vec3 lacquer = vec3(0.055, 0.043, 0.031);
          vec3 gold = vec3(0.79, 0.64, 0.36);
          vec3 col = lacquer + lacquer * glow * 1.6;
          col = mix(col, gold * (0.08 + 1.25 * glow), p * (0.14 + 0.86 * glow));
          gl_FragColor = vec4(col, 1.0);
        }`,
    }),
  );
  return {
    mesh,
    setLight: (x: number, y: number) => uniforms.uLight.value.set(x, y),
    /** Plane width / height (uv distances are measured in plane heights). */
    setAspect: (a: number) => (uniforms.uAspect.value = a),
    /** Larger = tighter candle glow. */
    setSharpness: (k: number) => (uniforms.uSharp.value = k),
    tick: (t: number) => (uniforms.uTime.value = t),
  };
}
