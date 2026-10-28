import * as THREE from 'three';

// Floating gold leaf, like the leaf people press onto stupas as offerings.
export function createGoldDust(count: number, pixelRatio: number) {
  const pos = new Float32Array(count * 3);
  const seed = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    pos[i * 3] = (Math.random() - 0.5) * 14;
    pos[i * 3 + 1] = Math.random() * 7 - 1.5;
    pos[i * 3 + 2] = (Math.random() - 0.5) * 8;
    seed[i] = Math.random();
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('seed', new THREE.BufferAttribute(seed, 1));
  const uniforms = { uTime: { value: 0 }, uPx: { value: pixelRatio } };
  const points = new THREE.Points(
    geo,
    new THREE.ShaderMaterial({
      uniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexShader: /* glsl */ `
        attribute float seed; uniform float uTime; uniform float uPx; varying float vA;
        void main() {
          vec3 p = position;
          float t = uTime * 0.12 + seed * 40.0;
          p.y = mod(p.y + uTime * 0.08 * (0.4 + seed) + 1.5, 7.0) - 1.5;
          p.x += sin(t) * 0.35; p.z += cos(t * 0.8) * 0.25;
          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          gl_Position = projectionMatrix * mv;
          gl_PointSize = (2.0 + seed * 4.0) * uPx * (6.0 / -mv.z);
          vA = (0.25 + 0.75 * abs(sin(uTime * 1.5 + seed * 30.0))) * smoothstep(-1.5, 0.0, p.y) * (1.0 - smoothstep(4.5, 5.5, p.y));
        }`,
      fragmentShader: /* glsl */ `
        varying float vA;
        void main() { float d = length(gl_PointCoord - 0.5); if (d > 0.5) discard; gl_FragColor = vec4(1.0, 0.82, 0.5, vA * (1.0 - d * 2.0)); }`,
    }),
  );
  return { points, tick: (t: number) => (uniforms.uTime.value = t) };
}
