import * as THREE from 'three';
import { SVGLoader } from 'three/addons/loaders/SVGLoader.js';

// The MVM emblem in gold, extruded from the real logo (public/brand/logo-emblem.svg,
// 432 units across, centred on 0,0): the filled mark becomes bevelled metal and
// the two stroked circles become true round rings on a dark lacquer disc.
export async function createEmblem(url: string, light = false): Promise<THREE.Group> {
  const gold = new THREE.MeshPhysicalMaterial({ color: '#D9B46E', metalness: 1, roughness: 0.22, clearcoat: 0.6, clearcoatRoughness: 0.25 });
  const emblem = new THREE.Group();
  const data = await new SVGLoader().loadAsync(url);
  for (const path of data.paths) {
    const fill = path.userData?.style?.fill;
    if (!fill || fill === 'none') continue;
    const geo = new THREE.ExtrudeGeometry(SVGLoader.createShapes(path), {
      depth: 10,
      bevelEnabled: true,
      bevelThickness: 3,
      bevelSize: 1.2,
      bevelSegments: light ? 2 : 4,
      curveSegments: light ? 8 : 18,
    });
    emblem.add(new THREE.Mesh(geo, gold));
  }
  emblem.add(new THREE.Mesh(new THREE.TorusGeometry(208.27, 6.5, light ? 12 : 24, light ? 120 : 220), gold));
  emblem.add(new THREE.Mesh(new THREE.TorusGeometry(190.3, 3.6, light ? 10 : 18, light ? 120 : 220), gold));
  const disc = new THREE.Mesh(
    new THREE.CylinderGeometry(204, 204, 4, 128),
    new THREE.MeshStandardMaterial({ color: '#120E0A', metalness: 0.4, roughness: 0.6 }),
  );
  disc.rotation.x = Math.PI / 2;
  disc.position.z = -2;
  emblem.add(disc);
  emblem.scale.set(1, -1, 1); // SVG y points down
  const holder = new THREE.Group();
  holder.add(emblem);
  return holder;
}
