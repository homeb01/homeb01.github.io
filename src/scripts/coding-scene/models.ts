import * as THREE from 'three';
import { C, Materials, themes } from './palette';

/** Outline thickness in world units (about one screen pixel). */
const OUTLINE = 0.026;

type Mat = THREE.Material;

interface PartOptions {
  outline?: boolean;
  shadow?: boolean;
}

const boxes = new Map<string, THREE.BoxGeometry>();
function boxGeometry(w: number, h: number, d: number) {
  const key = `${w}|${h}|${d}`;
  let g = boxes.get(key);
  if (!g) {
    g = new THREE.BoxGeometry(w, h, d);
    boxes.set(key, g);
  }
  return g;
}

/** Small builder that keeps the model code short: every part is a box, cylinder or pyramid. */
class Builder {
  constructor(readonly m: Materials) {}

  private add(
    parent: THREE.Object3D,
    geometry: THREE.BufferGeometry,
    material: Mat,
    size: [number, number, number],
    pos: [number, number, number],
    { outline = false, shadow = true }: PartOptions,
  ) {
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(...pos);
    mesh.castShadow = shadow;
    mesh.receiveShadow = true;
    if (outline) {
      // Inverted hull: a slightly bigger back-face copy drawn in the outline color.
      const hull = new THREE.Mesh(geometry, this.m.outline);
      hull.scale.set(...(size.map((s) => (s + 2 * OUTLINE) / s) as [number, number, number]));
      hull.raycast = () => {};
      mesh.add(hull);
    }
    parent.add(mesh);
    return mesh;
  }

  box(
    parent: THREE.Object3D,
    [w, h, d]: [number, number, number],
    color: number | Mat,
    pos: [number, number, number],
    opts: PartOptions = {},
  ) {
    const material = typeof color === 'number' ? this.m.lit(color) : color;
    return this.add(parent, boxGeometry(w, h, d), material, [w, h, d], pos, opts);
  }

  /** Flat (unlit, shadowless) detail such as eyes, glints or the screen. */
  flat(parent: THREE.Object3D, size: [number, number, number], color: number, pos: [number, number, number]) {
    return this.box(parent, size, this.m.unlit(color), pos, { shadow: false });
  }

  cylinder(
    parent: THREE.Object3D,
    rTop: number,
    rBottom: number,
    h: number,
    color: number,
    pos: [number, number, number],
    opts: PartOptions = {},
    segments = 8,
  ) {
    const r = Math.max(rTop, rBottom);
    const geometry = new THREE.CylinderGeometry(rTop, rBottom, h, segments);
    return this.add(parent, geometry, this.m.lit(color), [2 * r, h, 2 * r], pos, opts);
  }

  pyramid(parent: THREE.Object3D, r: number, h: number, color: number, pos: [number, number, number], opts: PartOptions = {}) {
    const geometry = new THREE.ConeGeometry(r, h, 4);
    geometry.rotateY(Math.PI / 4);
    return this.add(parent, geometry, this.m.lit(color), [2 * r, h, 2 * r], pos, opts);
  }

  group(parent: THREE.Object3D, pos: [number, number, number] = [0, 0, 0]) {
    const g = new THREE.Group();
    g.position.set(...pos);
    parent.add(g);
    return g;
  }
}

export interface Person {
  head: THREE.Group;
  eyes: THREE.Mesh[];
  forearms: [THREE.Group, THREE.Group];
}

export interface Cat {
  root: THREE.Group;
  head: THREE.Group;
  chest: THREE.Mesh;
  eyes: THREE.Group[];
  ears: [THREE.Mesh, THREE.Mesh];
  tail: THREE.Group[];
  /** Resting height (top of the book pile). */
  baseY: number;
}

export interface World {
  root: THREE.Group;
  person: Person;
  cat: Cat;
  steam: THREE.Mesh[];
  wall: THREE.MeshToonMaterial;
  sky: THREE.MeshBasicMaterial;
}

export function buildWorld(materials: Materials): World {
  const b = new Builder(materials);
  const root = new THREE.Group();
  const theme = themes.light;
  const wall = materials.litOwn(theme.wall);
  const sky = new THREE.MeshBasicMaterial({ color: theme.sky });

  buildRoom(b, root, wall, sky);
  buildDesk(b, root);
  const steam = buildDeskItems(b, root);
  const person = buildPerson(b, root);
  const cat = buildCat(b, root);

  return { root, person, cat, steam, wall, sky };
}

function buildRoom(b: Builder, root: THREE.Group, wall: Mat, sky: Mat) {
  // Floor slab with planks and a rug under the chair.
  b.box(root, [3.8, 0.16, 3.8], C.floor, [0, -0.08, 0], { outline: true });
  for (let z = -1.5; z <= 1.6; z += 0.4) b.box(root, [3.8, 0.006, 0.02], C.plank, [0, 0.003, z], { shadow: false });
  b.box(root, [2.2, 0.014, 1.7], C.rugBorder, [0, 0.008, -0.7], { shadow: false });
  b.box(root, [2.0, 0.02, 1.5], C.rug, [0, 0.01, -0.7], { shadow: false });

  // Two walls forming the corner behind the desk.
  b.box(root, [3.8, 2.5, 0.14], wall, [0, 1.25, -1.83], { outline: true, shadow: false });
  b.box(root, [0.14, 2.5, 3.8], wall, [-1.83, 1.25, 0], { outline: true, shadow: false });
  b.box(root, [3.66, 0.1, 0.03], C.baseboard, [0.07, 0.05, -1.75], { shadow: false });
  b.box(root, [0.03, 0.1, 3.66], C.baseboard, [-1.75, 0.05, 0.07], { shadow: false });

  // Window on the left wall.
  b.box(root, [0.03, 0.95, 0.85], C.windowFrame, [-1.755, 1.55, 0.45], { shadow: false });
  b.box(root, [0.02, 0.8, 0.7], sky, [-1.74, 1.55, 0.45], { shadow: false });
  b.box(root, [0.03, 0.8, 0.035], C.windowFrame, [-1.73, 1.55, 0.45], { shadow: false });
  b.box(root, [0.03, 0.035, 0.7], C.windowFrame, [-1.73, 1.55, 0.45], { shadow: false });
  b.box(root, [0.12, 0.04, 0.95], C.windowFrame, [-1.7, 1.06, 0.45]);

  // Poster and shelf on the back wall.
  b.box(root, [0.62, 0.76, 0.02], C.outline, [-0.95, 1.65, -1.75], { shadow: false });
  b.box(root, [0.54, 0.68, 0.02], C.violet, [-0.95, 1.65, -1.74], { shadow: false });
  b.cylinder(root, 0.13, 0.13, 0.02, C.pinkSoft, [-0.95, 1.72, -1.725], { shadow: false }, 12).rotation.x = Math.PI / 2;
  b.box(root, [0.54, 0.16, 0.02], C.pink, [-0.95, 1.39, -1.73], { shadow: false });

  b.box(root, [0.8, 0.04, 0.22], C.shelf, [0.95, 1.55, -1.65], { outline: true });
  b.box(root, [0.08, 0.26, 0.18], C.teal, [0.68, 1.7, -1.65]);
  b.box(root, [0.07, 0.22, 0.18], C.pinkSoft, [0.76, 1.68, -1.65]);
  b.box(root, [0.08, 0.28, 0.18], C.violet, [0.84, 1.71, -1.65]);
  b.cylinder(root, 0.07, 0.06, 0.1, C.pot, [1.2, 1.62, -1.65]);
  b.box(root, [0.05, 0.16, 0.05], C.leaf, [1.2, 1.74, -1.65]);
}

function buildDesk(b: Builder, root: THREE.Group) {
  b.box(root, [2.4, 0.08, 1.2], C.deskTop, [0, 0.96, 0], { outline: true });
  for (const z of [-0.52, 0.52]) b.box(root, [0.08, 0.92, 0.08], C.deskLeg, [1.12, 0.46, z], { outline: true });
  // Drawer unit under the left side.
  b.box(root, [0.6, 0.92, 1.1], C.drawer, [-0.85, 0.46, 0], { outline: true });
  for (const y of [0.72, 0.3]) {
    b.box(root, [0.56, 0.36, 0.02], C.deskTop, [-0.85, y, 0.555], { shadow: false });
    b.box(root, [0.16, 0.03, 0.03], C.handle, [-0.85, y + 0.08, 0.575], { shadow: false });
  }

  // Office chair (behind the desk, Homero sits on it).
  const chair = b.group(root, [0, 0, -1.0]);
  b.box(chair, [0.62, 0.08, 0.56], C.chair, [0, 0.58, 0], { outline: true });
  b.box(chair, [0.56, 0.04, 0.5], C.chairCushion, [0, 0.63, 0]);
  b.box(chair, [0.6, 0.7, 0.08], C.chair, [0, 1.0, -0.3], { outline: true });
  b.box(chair, [0.06, 0.48, 0.06], C.deskLeg, [0, 0.3, 0]);
  b.box(chair, [0.56, 0.05, 0.07], C.deskLeg, [0, 0.06, 0]);
  b.box(chair, [0.07, 0.05, 0.56], C.deskLeg, [0, 0.06, 0]);
}

function buildDeskItems(b: Builder, root: THREE.Group): THREE.Mesh[] {
  // Laptop facing Homero: keyboard toward him, lid open toward the viewer.
  b.box(root, [0.6, 0.03, 0.4], C.laptop, [0, 1.015, -0.32], { outline: true });
  b.box(root, [0.52, 0.01, 0.18], C.keys, [0, 1.032, -0.26], { shadow: false });
  b.box(root, [0.16, 0.008, 0.08], C.keys, [0, 1.031, -0.45], { shadow: false });
  const lid = b.group(root, [0, 1.03, -0.12]);
  lid.rotation.x = 0.22;
  b.box(lid, [0.6, 0.4, 0.025], C.laptop, [0, 0.2, 0], { outline: true });
  b.flat(lid, [0.54, 0.34, 0.005], C.screen, [0, 0.2, -0.014]);
  b.box(lid, [0.12, 0.12, 0.006], C.violet, [-0.12, 0.24, 0.015], { shadow: false });
  b.box(lid, [0.08, 0.08, 0.006], C.pinkSoft, [0.13, 0.13, 0.015], { shadow: false });

  // Three books, slightly misaligned: the cat's throne.
  const books: [number, number, number, number, number][] = [
    // w, h, d, rotation, color
    [0.58, 0.09, 0.44, 0.06, C.violet],
    [0.52, 0.08, 0.4, -0.12, C.pink],
    [0.48, 0.08, 0.38, 0.1, C.teal],
  ];
  let y = 1.0;
  for (const [w, h, d, rot, color] of books) {
    const book = b.group(root, [-0.82, y + h / 2, 0.08]);
    book.rotation.y = rot;
    b.box(book, [w, h, d], color, [0, 0, 0], { outline: true });
    b.box(book, [w - 0.03, h - 0.025, d + 0.004], C.pages, [-0.02, 0, 0], { shadow: false });
    y += h;
  }

  // Coffee mug with steam.
  b.cylinder(root, 0.085, 0.075, 0.18, C.mug, [0.68, 1.09, 0.2], { outline: true });
  b.cylinder(root, 0.088, 0.08, 0.04, C.pink, [0.68, 1.1, 0.2], { shadow: false });
  b.cylinder(root, 0.075, 0.075, 0.01, C.coffee, [0.68, 1.176, 0.2], { shadow: false });
  b.box(root, [0.05, 0.1, 0.03], C.mug, [0.68, 1.09, 0.3], { outline: true });
  const steam = [0, 1, 2].map(() => b.flat(root, [0.035, 0.035, 0.035], C.steam, [0.68, 1.25, 0.2]));

  // Small plant.
  b.cylinder(root, 0.1, 0.08, 0.16, C.pot, [0.95, 1.08, -0.38], { outline: true });
  b.cylinder(root, 0.09, 0.09, 0.01, C.soil, [0.95, 1.16, -0.38], { shadow: false });
  const leaves: [number, number, number][] = [
    [0, 0, 0.0],
    [0.06, 0.4, 0.35],
    [-0.06, -0.4, -0.3],
    [0.02, 1.3, 0.45],
    [-0.02, 2.2, -0.45],
  ];
  leaves.forEach(([dx, ry, rz], i) => {
    const leaf = b.box(root, [0.06, 0.24, 0.1], i % 2 ? C.leaf : C.leafDark, [0.95 + dx, 1.27, -0.38], { outline: true });
    leaf.rotation.set(0, ry, rz);
  });

  return steam;
}

function buildPerson(b: Builder, root: THREE.Group): Person {
  const p = b.group(root, [0, 0, -1.0]);

  // Legs (mostly under the desk).
  b.box(p, [0.46, 0.16, 0.38], C.pants, [0, 0.72, 0]);
  for (const x of [-0.12, 0.12]) {
    b.box(p, [0.17, 0.15, 0.44], C.pants, [x, 0.72, 0.26], { outline: true });
    b.box(p, [0.14, 0.62, 0.14], C.pants, [x, 0.4, 0.44], { outline: true });
    b.box(p, [0.15, 0.08, 0.24], C.shoes, [x, 0.04, 0.5], { outline: true });
  }

  // Torso in his dark grey tee, with the little print on the chest.
  b.box(p, [0.5, 0.5, 0.28], C.shirt, [0, 1.02, 0], { outline: true });
  b.box(p, [0.1, 0.09, 0.01], C.shirtPrint, [0.13, 0.98, 0.145], { shadow: false });
  b.box(p, [0.15, 0.08, 0.15], C.skin, [0, 1.3, 0]);

  // Head (pivot at the neck so it can turn to look at the cat).
  const head = b.group(p, [0, 1.33, 0]);
  head.scale.setScalar(1.18);
  b.box(head, [0.4, 0.42, 0.38], C.skin, [0, 0.21, 0], { outline: true });
  // Short black hair, swept up at the front, short on the sides.
  b.box(head, [0.42, 0.1, 0.4], C.hair, [0, 0.44, -0.005], { outline: true });
  b.box(head, [0.3, 0.06, 0.1], C.hair, [0.02, 0.5, 0.13], { outline: true });
  b.box(head, [0.42, 0.24, 0.05], C.hair, [0, 0.32, -0.19]);
  for (const s of [-1, 1]) {
    b.box(head, [0.02, 0.1, 0.3], C.hair, [s * 0.205, 0.36, -0.03], { shadow: false });
    b.box(head, [0.04, 0.09, 0.07], C.skin, [s * 0.215, 0.2, 0]);
  }
  // Eyes and glasses (thin dark rectangular frames with a violet reflection).
  const eyes = [-1, 1].map((s) => b.flat(head, [0.035, 0.045, 0.01], C.eye, [s * 0.085, 0.24, 0.195]));
  for (const s of [-1, 1]) {
    const x = s * 0.09;
    b.flat(head, [0.14, 0.022, 0.012], C.glasses, [x, 0.285, 0.205]);
    b.flat(head, [0.14, 0.022, 0.012], C.glasses, [x, 0.195, 0.205]);
    b.flat(head, [0.022, 0.1, 0.012], C.glasses, [x - 0.06, 0.24, 0.205]);
    b.flat(head, [0.022, 0.1, 0.012], C.glasses, [x + 0.06, 0.24, 0.205]);
    b.flat(head, [0.03, 0.025, 0.008], C.lensGlint, [x + s * 0.03, 0.262, 0.204]);
    b.flat(head, [0.015, 0.02, 0.2], C.glasses, [s * 0.205, 0.27, 0.1]);
  }
  b.flat(head, [0.05, 0.02, 0.012], C.glasses, [0, 0.255, 0.205]);
  b.box(head, [0.05, 0.06, 0.05], C.skin, [0, 0.165, 0.205], { shadow: false });
  // Big smile (clean-shaven).
  b.flat(head, [0.13, 0.03, 0.01], C.teeth, [0, 0.085, 0.197]);
  for (const s of [-1, 1]) b.flat(head, [0.02, 0.02, 0.01], C.mouth, [s * 0.075, 0.098, 0.197]);

  // Arms: short sleeves, elbows near the desk edge, forearms reaching the keyboard.
  const forearms = [-1, 1].map((s) => {
    const arm = b.group(p, [s * 0.3, 1.24, 0]);
    b.box(arm, [0.14, 0.17, 0.16], C.shirt, [0, -0.05, 0], { outline: true });
    b.box(arm, [0.11, 0.14, 0.11], C.skin, [0, -0.17, 0.02], { outline: true });
    const fore = b.group(arm, [0, -0.2, 0.06]);
    fore.rotation.set(-0.06, -s * 0.32, 0);
    b.box(fore, [0.1, 0.1, 0.5], C.skin, [0, 0, 0.25], { outline: true });
    b.box(fore, [0.11, 0.06, 0.11], C.skin, [0, -0.01, 0.53], { outline: true });
    return fore;
  }) as [THREE.Group, THREE.Group];

  return { head, eyes, forearms };
}

function buildCat(b: Builder, root: THREE.Group): Cat {
  const baseY = 1.25;
  const cat = b.group(root, [-0.82, baseY, 0.06]);
  cat.rotation.y = 0.55;

  // Fluffy body sitting upright, cream bib, striped flanks.
  b.box(cat, [0.3, 0.2, 0.32], C.fur, [0, 0.1, -0.03], { outline: true });
  const chest = b.box(cat, [0.25, 0.2, 0.2], C.fur, [0, 0.27, 0.05], { outline: true });
  b.box(cat, [0.15, 0.18, 0.02], C.cream, [0, 0.25, 0.155], { shadow: false });
  for (const y of [0.06, 0.13]) b.box(cat, [0.305, 0.025, 0.2], C.furDark, [0, y, -0.06], { shadow: false });
  b.box(cat, [0.255, 0.022, 0.12], C.furDark, [0, 0.3, 0.01], { shadow: false });
  for (const s of [-1, 1]) {
    b.box(cat, [0.07, 0.18, 0.07], C.fur, [s * 0.065, 0.09, 0.13], { outline: true });
    b.box(cat, [0.072, 0.02, 0.072], C.furDark, [s * 0.065, 0.1, 0.13], { shadow: false });
    b.box(cat, [0.072, 0.02, 0.072], C.furDark, [s * 0.065, 0.15, 0.13], { shadow: false });
    b.box(cat, [0.08, 0.04, 0.09], C.cream, [s * 0.065, 0.02, 0.145]);
  }
  // Red collar with a little silver tag.
  b.box(cat, [0.21, 0.035, 0.19], C.collar, [0, 0.365, 0.05], { shadow: false });
  b.box(cat, [0.04, 0.045, 0.012], C.tag, [0, 0.33, 0.15], { shadow: false });

  // Head: wide fluffy cheeks, amber eyes, pink nose, tabby "M" on the forehead.
  const head = b.group(cat, [0, 0.38, 0.06]);
  head.scale.setScalar(1.2);
  b.box(head, [0.28, 0.22, 0.22], C.fur, [0, 0.1, 0], { outline: true });
  b.box(head, [0.34, 0.08, 0.16], C.fur, [0, 0.03, 0.01], { outline: true });
  b.box(head, [0.13, 0.07, 0.03], C.cream, [0, 0.03, 0.115], { shadow: false });
  b.flat(head, [0.035, 0.025, 0.01], C.catNose, [0, 0.07, 0.132]);
  for (const x of [-0.035, 0, 0.035]) b.flat(head, [0.015, 0.07, 0.01], C.furDark, [x, 0.17, 0.112]);
  b.flat(head, [0.2, 0.02, 0.01], C.furDark, [0, 0.205, 0.112]);
  const eyes = [-1, 1].map((s) => {
    const eye = b.group(head, [s * 0.068, 0.115, 0.112]);
    b.flat(eye, [0.06, 0.05, 0.01], C.catEye, [0, 0, 0]);
    b.flat(eye, [0.018, 0.045, 0.012], C.pupil, [0, 0, 0.001]);
    return eye;
  });
  for (const s of [-1, 1]) b.flat(head, [0.08, 0.012, 0.012], C.whisker, [s * 0.18, 0.045, 0.09]);
  const ears = [-1, 1].map((s) => {
    const ear = b.pyramid(head, 0.075, 0.12, C.fur, [s * 0.09, 0.27, -0.02], { outline: true });
    b.pyramid(ear, 0.04, 0.07, C.earInner, [0, -0.02, 0.03], { shadow: false });
    return ear;
  }) as [THREE.Mesh, THREE.Mesh];

  // Bushy striped tail curling around the body: a chain of segments.
  const tail: THREE.Group[] = [];
  let parent: THREE.Object3D = cat;
  let pos: [number, number, number] = [0.08, 0.05, -0.18];
  for (let i = 0; i < 6; i++) {
    const seg = b.group(parent, pos);
    const last = i === 5;
    b.box(seg, [0.095, 0.09, 0.12], i % 2 === 1 || last ? C.furDark : C.fur, [0, 0, -0.05], { outline: true });
    tail.push(seg);
    parent = seg;
    pos = [0, 0, -0.11];
  }

  return { root: cat, head, chest, eyes, ears, tail, baseY };
}
