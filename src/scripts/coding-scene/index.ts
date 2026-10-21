import * as THREE from 'three';
import { buildWorld } from './models';
import { Materials, themes } from './palette';

/** Target internal resolution (scene pixels across the canvas). */
const TARGET_PIXELS = 190;
/** Half the visible height of the orthographic camera, in world units. */
const VIEW = 1.8;
/** Character poses advance in steps, like hand-drawn sprite frames. */
const POSE_FPS = 12;
const RENDER_FPS = 30;

// Tiny bitmaps for the speech bubbles (one char per pixel).
const BUBBLES: Record<string, string[]> = {
  code: [
    'OOOOOOOOOOOOOOO',
    'OWWWWWWWWWWWWWO',
    'OWWWVWWWWVWVWWO',
    'OWWVWWWWWVWWVWO',
    'OWVWWWWWVWWWWVO',
    'OWWVWWWWVWWWVWO',
    'OWWWVWWVWWWVWWO',
    'OWWWWWWWWWWWWWO',
    'OOOOOOWWOOOOOOO',
    '.....OWO.......',
    '.....OO........',
  ],
  braces: [
    'OOOOOOOOOOOOOOO',
    'OWWWWWWWWWWWWWO',
    'OWWWPPWWWPPWWWO',
    'OWWWPWWWWWPWWWO',
    'OWWPWWWWWWWPWWO',
    'OWWWPWWWWWPWWWO',
    'OWWWPPWWWPPWWWO',
    'OWWWWWWWWWWWWWO',
    'OOOOOOWWOOOOOOO',
    '.....OWO.......',
    '.....OO........',
  ],
  heart: [
    '.OO.OO.',
    'OPPOPPO',
    'OPPPPPO',
    'OPPPPPO',
    '.OPPPO.',
    '..OPO..',
    '...O...',
  ],
};
const BITMAP_COLORS: Record<string, string> = { O: '#1b1626', W: '#ffffff', V: '#5b3df5', P: '#ff5c8a' };

function bitmapSprite(rows: string[]) {
  const w = rows[0].length;
  const h = rows.length;
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d')!;
  rows.forEach((row, y) =>
    [...row].forEach((ch, x) => {
      const color = BITMAP_COLORS[ch];
      if (!color) return;
      ctx.fillStyle = color;
      ctx.fillRect(x, y, 1, 1);
    }),
  );
  const texture = new THREE.CanvasTexture(canvas);
  texture.magFilter = THREE.NearestFilter;
  texture.minFilter = THREE.NearestFilter;
  texture.colorSpace = THREE.SRGBColorSpace;
  const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: texture, depthTest: false, transparent: true }));
  sprite.renderOrder = 10;
  sprite.visible = false;
  sprite.userData.size = [w, h];
  return sprite;
}

/** Deterministic pseudo-random number in [0, 1) for an integer step. */
function hash(n: number) {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

/** 0 → 1 → 0 bump over a window [start, start + length). */
function bump(t: number, start: number, length: number) {
  const p = (t - start) / length;
  return p < 0 || p > 1 ? 0 : Math.sin(Math.PI * p);
}

/**
 * Mounts the pixel-art scene inside `container`. Returns false if WebGL is not available.
 */
export function mount(container: HTMLElement): boolean {
  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: 'low-power' });
  } catch {
    return false;
  }
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  renderer.setPixelRatio(1);
  renderer.setClearColor(0x000000, 0);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.BasicShadowMap;
  const canvas = renderer.domElement;
  canvas.setAttribute('aria-hidden', 'true');
  canvas.style.imageRendering = 'pixelated';
  canvas.style.display = 'block';
  canvas.style.margin = '0 auto';
  container.append(canvas);

  const scene = new THREE.Scene();
  const materials = new Materials();
  const world = buildWorld(materials);
  const { person, cat } = world;
  scene.add(world.root);

  // Diagonal (isometric-like) view.
  const camera = new THREE.OrthographicCamera(-VIEW, VIEW, VIEW, -VIEW, 0.1, 60);
  const target = new THREE.Vector3(0, 1.05, -0.35);
  const azimuth = 0.62;
  const elevation = 0.55;
  camera.position
    .set(Math.sin(azimuth) * Math.cos(elevation), Math.sin(elevation), Math.cos(azimuth) * Math.cos(elevation))
    .multiplyScalar(20)
    .add(target);
  camera.lookAt(target);

  // Lights: sky fill, window light with crisp shadows, and the laptop glow on his face.
  const hemi = new THREE.HemisphereLight();
  const sun = new THREE.DirectionalLight();
  sun.position.set(-3, 5, 2.2);
  sun.target.position.set(0, 0.8, 0);
  sun.castShadow = true;
  sun.shadow.mapSize.set(1024, 1024);
  Object.assign(sun.shadow.camera, { left: -2.6, right: 2.6, top: 2.6, bottom: -2.6, near: 0.5, far: 14 });
  sun.shadow.bias = -0.002;
  sun.shadow.normalBias = 0.02;
  const screen = new THREE.PointLight(0xa898ff, 1, 2.6, 1.5);
  screen.position.set(0, 1.75, -0.4);
  scene.add(hemi, sun, sun.target, screen);

  let screenBase = 1;
  function applyTheme() {
    const t = themes[document.documentElement.classList.contains('dark') ? 'dark' : 'light'];
    hemi.color.setHex(t.hemiSky);
    hemi.groundColor.setHex(t.hemiGround);
    hemi.intensity = t.hemi;
    sun.color.setHex(t.sunColor);
    sun.intensity = t.sun;
    screenBase = t.screen;
    screen.intensity = t.screen;
    world.wall.color.setHex(t.wall);
    world.sky.color.setHex(t.sky);
  }
  applyTheme();

  // Bubbles over his head while coding, a heart over the cat when petted.
  const bubbles = [bitmapSprite(BUBBLES.code), bitmapSprite(BUBBLES.braces)];
  const heart = bitmapSprite(BUBBLES.heart);
  bubbles.forEach((s) => s.position.set(0.42, 2.12, -1.0));
  scene.add(...bubbles, heart);
  const sprites = [...bubbles, heart];

  function resize() {
    const cssWidth = container.clientWidth;
    if (!cssWidth) return;
    const scale = Math.max(2, Math.round(cssWidth / TARGET_PIXELS));
    const pixels = Math.floor(cssWidth / scale);
    renderer.setSize(pixels, pixels, false);
    canvas.style.width = canvas.style.height = `${pixels * scale}px`;
    // One bitmap pixel = one screen pixel of the scene.
    const unit = (2 * VIEW) / pixels;
    for (const s of sprites) {
      const [w, h] = s.userData.size as [number, number];
      s.scale.set(w * unit, h * unit, 1);
    }
    draw();
  }

  // Interaction: the diorama follows the pointer; clicking the cat makes it jump.
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  let yaw = 0;
  let targetYaw = 0;
  let petAt = -10;

  function hitsCat(event: PointerEvent | MouseEvent) {
    const rect = canvas.getBoundingClientRect();
    pointer.set(((event.clientX - rect.left) / rect.width) * 2 - 1, -((event.clientY - rect.top) / rect.height) * 2 + 1);
    raycaster.setFromCamera(pointer, camera);
    return raycaster.intersectObject(cat.root, true).length > 0;
  }

  canvas.addEventListener('pointermove', (event) => {
    const rect = canvas.getBoundingClientRect();
    if (!reduceMotion) targetYaw = (((event.clientX - rect.left) / rect.width) * 2 - 1) * 0.22;
    canvas.style.cursor = hitsCat(event) ? 'pointer' : '';
  });
  canvas.addEventListener('pointerleave', () => {
    targetYaw = 0;
    canvas.style.cursor = '';
  });
  canvas.addEventListener('click', (event) => {
    if (!hitsCat(event)) return;
    petAt = elapsed;
    if (reduceMotion) {
      // No jump: just show the heart for a moment.
      pose(petAt + 0.4);
      draw();
      setTimeout(() => {
        pose(0);
        draw();
      }, 1200);
    } else start();
  });

  /** Sets every animated part for time `t` (seconds). */
  function pose(time: number) {
    const t = Math.floor(time * POSE_FPS) / POSE_FPS;
    const step = Math.floor(time * POSE_FPS);
    const sincePet = t - petAt;
    const petting = sincePet >= 0 && sincePet < 1.6;

    // He glances at the cat every ~10 s, and right away when the cat is petted.
    const lookCycle = t % 10;
    const looking = petting || (lookCycle > 6.5 && lookCycle < 8);
    person.head.rotation.y = looking ? -0.6 : 0;
    person.head.rotation.x = looking ? -0.05 : 0.02 + 0.03 * Math.sin(t * 3);
    person.head.rotation.z = looking ? -0.06 : 0;

    // Typing: each pose step one hand taps a key.
    person.forearms.forEach((fore, i) => {
      const down = !looking && hash(step + i * 7.3) > 0.45 && step % 2 === i;
      fore.rotation.x = down ? 0.02 : -0.08;
    });

    // Blinks.
    const blink = (offset: number, every: number) => (t + offset) % every < 0.12;
    const personBlink = blink(0, 3.7);
    person.eyes.forEach((e) => (e.scale.y = personBlink ? 0.2 : 1));
    const catBlink = blink(1.3, 4.3) || blink(1.6, 4.3);
    cat.eyes.forEach((e) => (e.scale.y = catBlink ? 0.15 : 1));

    // Cat: breathing, tail swishing, ears twitching, looking back at him sometimes.
    cat.chest.scale.y = 1 + 0.03 * Math.sin(t * 2.4);
    cat.tail.forEach((seg, i) => {
      seg.rotation.y = 0.55 + 0.32 * Math.sin(t * 2.2 - i * 0.7) * (i / cat.tail.length + 0.3);
      seg.rotation.x = i === 0 ? -0.15 : -0.08 * Math.sin(t * 1.4 - i);
    });
    const twitch = t % 5.3 < 0.17;
    cat.ears[0].rotation.z = twitch ? 0.35 : 0;
    cat.ears[1].rotation.z = t % 7.1 < 0.17 ? -0.35 : 0;
    cat.head.rotation.y = looking ? 0.8 : 0.12 * Math.sin(t * 0.5);
    cat.head.rotation.z = (t % 12) > 9 && !looking ? 0.18 : 0;
    cat.root.position.y = cat.baseY + 0.14 * bump(t, petAt, 0.5);

    // Heart rising over the cat.
    heart.visible = petting;
    if (petting) heart.position.set(-0.82, 2.0 + sincePet * 0.25, 0.06);

    // A code bubble pops up every few seconds while he types.
    const bubbleCycle = t % 6;
    const which = Math.floor(t / 6) % bubbles.length;
    bubbles.forEach((b, i) => (b.visible = !looking && i === which && bubbleCycle > 3.5 && bubbleCycle < 5.3));

    // Laptop glow flickers as code scrolls.
    screen.intensity = screenBase * (0.85 + 0.25 * hash(Math.floor(step / 3)));
    screen.color.setHex(hash(Math.floor(step / 6) + 0.5) > 0.6 ? 0x8fd8ff : 0xa898ff);

    // Steam rising from the mug.
    world.steam.forEach((s, i) => {
      const p = (t * 0.35 + i / 3) % 1;
      s.position.set(0.68 + 0.04 * Math.sin((p + i) * 6), 1.24 + p * 0.38, 0.2);
      s.visible = p < 0.85;
    });
  }

  function draw() {
    world.root.rotation.y = yaw;
    renderer.render(scene, camera);
  }

  // Loop, paused while off-screen or in a hidden tab.
  let elapsed = 0;
  let frame = 0;
  let last = 0;
  let onScreen = true;

  function tick(now: number) {
    frame = requestAnimationFrame(tick);
    if (now - last < 1000 / RENDER_FPS) return;
    const dt = Math.min((now - last) / 1000, 0.1);
    last = now;
    elapsed += dt;
    yaw += (targetYaw - yaw) * Math.min(1, dt * 4);
    pose(elapsed);
    draw();
  }

  function start() {
    if (reduceMotion || frame || !onScreen || document.hidden) return;
    last = performance.now();
    frame = requestAnimationFrame(tick);
  }
  function stop() {
    cancelAnimationFrame(frame);
    frame = 0;
  }

  new IntersectionObserver(([entry]) => {
    onScreen = entry.isIntersecting;
    if (onScreen) start();
    else stop();
  }).observe(container);
  document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));
  new MutationObserver(() => {
    applyTheme();
    draw();
  }).observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
  new ResizeObserver(resize).observe(container);

  pose(0);
  resize();
  start();
  return true;
}

