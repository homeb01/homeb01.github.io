import * as THREE from 'three';

/** Limited palette for the pixel-art scene (accents follow the site tokens). */
export const C = {
  outline: 0x1b1626,

  // Room
  floor: 0xb98a5e,
  plank: 0x9a6e48,
  rug: 0xb9adf5,
  rugBorder: 0x8f7cf0,
  baseboard: 0xd9cfc2,
  windowFrame: 0xf7f4ee,
  shelf: 0x8a5a3c,

  // Furniture
  deskTop: 0xa06d4a,
  deskLeg: 0x5e3d2a,
  drawer: 0x8a5a3c,
  handle: 0xd9c08a,
  chair: 0x3a3550,
  chairCushion: 0x5b3df5,

  // Desk items
  laptop: 0xc8ccd6,
  keys: 0x2b2d36,
  screen: 0x2a2550,
  violet: 0x5b3df5,
  pink: 0xc2255c,
  pinkSoft: 0xff8fb0,
  teal: 0x2a9d8f,
  pages: 0xf4ecd8,
  mug: 0xfafafa,
  coffee: 0x4a2c1d,
  pot: 0xc8693f,
  soil: 0x4a3326,
  leaf: 0x3f9b5a,
  leafDark: 0x2f7a46,
  steam: 0xffffff,

  // Homero
  skin: 0xc98f66,
  hair: 0x1d1a1f,
  mouth: 0x8a4f3c,
  eye: 0x1d1a1f,
  teeth: 0xfaf7f2,
  glasses: 0x45424f,
  lensGlint: 0xc9bcff,
  shirt: 0x55555c,
  shirtPrint: 0x2f2f35,
  pants: 0x2f3a55,
  shoes: 0x1f1d24,

  // Cat (long-haired brown tabby)
  fur: 0x8b6d4f,
  furDark: 0x3d2e24,
  cream: 0xe2cfae,
  catEye: 0xe0a52a,
  pupil: 0x1a1410,
  catNose: 0xe39a9a,
  earInner: 0xe8a7a0,
  whisker: 0xf1ece4,
  collar: 0xd0342c,
  tag: 0xd9dde6,
} as const;

export interface Theme {
  wall: number;
  sky: number;
  hemiSky: number;
  hemiGround: number;
  hemi: number;
  sunColor: number;
  sun: number;
  screen: number;
}

export const themes: Record<'light' | 'dark', Theme> = {
  light: {
    wall: 0xefe8df,
    sky: 0x9fd3ff,
    hemiSky: 0xfff6ec,
    hemiGround: 0x8a7a99,
    hemi: 2.2,
    sunColor: 0xfff1d6,
    sun: 2.6,
    screen: 0.7,
  },
  dark: {
    wall: 0x3a3552,
    sky: 0x1f2a5c,
    hemiSky: 0x9a94e0,
    hemiGround: 0x2c2640,
    hemi: 2,
    sunColor: 0x9fb0ff,
    sun: 1.2,
    screen: 3.5,
  },
};

/** Shared materials: toon shading in 3 hard bands, plus unlit and outline materials. */
export class Materials {
  readonly outline = new THREE.MeshBasicMaterial({ color: C.outline, side: THREE.BackSide });
  private readonly gradient: THREE.DataTexture;
  private readonly toon = new Map<number, THREE.MeshToonMaterial>();
  private readonly flat = new Map<number, THREE.MeshBasicMaterial>();

  constructor() {
    this.gradient = new THREE.DataTexture(new Uint8Array([90, 170, 255]), 3, 1, THREE.RedFormat);
    this.gradient.minFilter = THREE.NearestFilter;
    this.gradient.magFilter = THREE.NearestFilter;
    this.gradient.needsUpdate = true;
  }

  /** Lit material (cached per color, so recoloring one updates every mesh using it). */
  lit(color: number): THREE.MeshToonMaterial {
    let m = this.toon.get(color);
    if (!m) {
      m = new THREE.MeshToonMaterial({ color, gradientMap: this.gradient });
      this.toon.set(color, m);
    }
    return m;
  }

  /** Lit material that is not shared, for surfaces recolored by the theme. */
  litOwn(color: number): THREE.MeshToonMaterial {
    return new THREE.MeshToonMaterial({ color, gradientMap: this.gradient });
  }

  /** Unlit material for light sources (screen, window, glints). */
  unlit(color: number): THREE.MeshBasicMaterial {
    let m = this.flat.get(color);
    if (!m) {
      m = new THREE.MeshBasicMaterial({ color });
      this.flat.set(color, m);
    }
    return m;
  }
}
