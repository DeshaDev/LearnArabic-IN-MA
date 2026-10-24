import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import type { LocaleCode } from '../../types/learning';
import type { MarketProductItem } from '../../data/worldData';

interface Market3DSceneProps {
  locale: LocaleCode;
  items: MarketProductItem[];
  basket: Record<string, number>;
  locked?: boolean;
  onCollect: (itemId: string) => void;
}

interface StallSpot {
  x: number;
  z: number;
  productX: number;
  productZ: number;
}

const SPOTS: Record<string, StallSpot> = {
  'item-apple-red': { x: -7, z: -7, productX: -5.12, productZ: -7 },
  'item-apple-green': { x: -7, z: 0, productX: -5.12, productZ: 0 },
  'item-book-blue': { x: -7, z: 7, productX: -5.12, productZ: 7 },
  'item-book-yellow': { x: 7, z: -7, productX: 5.12, productZ: -7 },
  'item-bread-brown': { x: 7, z: 0, productX: 5.12, productZ: 0 },
  'item-dates-brown': { x: 7, z: 7, productX: 5.12, productZ: 7 },
};

function material(color: THREE.ColorRepresentation, roughness = 0.86): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({ color, roughness, metalness: 0.02 });
}

function addMesh(
  geometry: THREE.BufferGeometry,
  mat: THREE.Material,
  position: [number, number, number],
  parent: THREE.Object3D,
  castShadow = true
): THREE.Mesh {
  const object = new THREE.Mesh(geometry, mat);
  object.position.set(position[0], position[1], position[2]);
  object.castShadow = castShadow;
  object.receiveShadow = true;
  parent.add(object);
  return object;
}

function makeFloorTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = '#e9d3a9';
    ctx.fillRect(0, 0, 128, 128);
    for (let y = 0; y < 128; y += 16) {
      for (let x = 0; x < 128; x += 22) {
        const offset = (Math.floor(y / 16) % 2) * 11;
        ctx.fillStyle = ((x + y) / 16) % 3 === 0 ? '#f2e1bf' : '#dfc69a';
        ctx.fillRect(x + offset, y + 1, 20, 13);
        ctx.strokeStyle = '#d1b88b';
        ctx.lineWidth = 1;
        ctx.strokeRect(x + offset, y + 1, 20, 13);
      }
    }
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(8, 10);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}

function makeSignTexture(name: string, arabic: string): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 192;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = '#193f35';
    ctx.fillRect(0, 0, 512, 192);
    ctx.strokeStyle = '#e7bf70';
    ctx.lineWidth = 8;
    ctx.strokeRect(8, 8, 496, 176);
    ctx.textAlign = 'center';
    ctx.fillStyle = '#fff0cc';
    ctx.font = 'bold 43px Arial, sans-serif';
    ctx.fillText(name, 256, 83, 470);
    ctx.fillStyle = '#f0c26f';
    ctx.font = 'bold 39px Arial, sans-serif';
    ctx.direction = 'rtl';
    ctx.fillText(arabic, 256, 145, 470);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function addProduct(group: THREE.Group, item: MarketProductItem): void {
  const wood = material(0x86542e);
  if (item.productType === 'apple') {
    const appleColor = item.color === 'red' ? 0xd9433f : 0x68a84e;
    const apple = addMesh(new THREE.SphereGeometry(0.39, 10, 8), material(appleColor), [0, 0.38, 0], group);
    apple.scale.set(0.94, 1.06, 0.9);
    addMesh(new THREE.CylinderGeometry(0.035, 0.045, 0.18, 5), wood, [0.03, 0.78, 0], group);
    const leaf = addMesh(new THREE.SphereGeometry(0.19, 7, 5), material(0x4c8d43), [0.16, 0.81, 0.03], group);
    leaf.scale.set(1, 0.18, 0.48);
    leaf.rotation.z = -0.38;
    addMesh(new THREE.SphereGeometry(0.035, 6, 5), material(0xf4c9a1), [-0.13, 0.48, 0.33], group, false);
  } else if (item.productType === 'book') {
    const coverColor = item.color === 'blue' ? 0x3276c8 : 0xe0b63f;
    const cover = addMesh(new THREE.BoxGeometry(0.67, 0.88, 0.16), material(coverColor), [0, 0.45, 0], group);
    cover.rotation.y = -0.12;
    cover.rotation.x = -0.09;
    addMesh(new THREE.BoxGeometry(0.57, 0.79, 0.05), material(0xf7ead0), [-0.01, 0.46, 0.09], group);
    addMesh(new THREE.BoxGeometry(0.62, 0.045, 0.02), material(coverColor), [-0.01, 0.69, 0.119], group, false);
    addMesh(new THREE.BoxGeometry(0.44, 0.024, 0.02), material(0xd2a24b), [-0.01, 0.29, 0.119], group, false);
    addMesh(new THREE.BoxGeometry(0.035, 0.82, 0.035), material(0xf9e9c5), [-0.28, 0.45, 0.1], group, false);
  } else if (item.productType === 'bread') {
    const loaf = addMesh(new THREE.SphereGeometry(0.45, 10, 7), material(0xc98e48), [0, 0.28, 0], group);
    loaf.scale.set(1.13, 0.68, 0.82);
    for (let i = -1; i <= 1; i++) {
      const score = addMesh(new THREE.BoxGeometry(0.045, 0.31, 0.025), material(0xf2d49d), [i * 0.22, 0.48, 0.28], group, false);
      score.rotation.z = -0.38;
    }
  } else if (item.productType === 'dates') {
    addMesh(new THREE.BoxGeometry(0.92, 0.12, 0.72), wood, [0, 0.12, 0], group);
    addMesh(new THREE.BoxGeometry(0.84, 0.04, 0.62), material(0xd4aa70), [0, 0.23, 0], group, false);
    const dateMaterial = material(0x633223);
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 4; col++) {
        const date = addMesh(new THREE.SphereGeometry(0.13, 7, 5), dateMaterial, [-0.3 + col * 0.2, 0.35 + (col % 2) * 0.02, -0.18 + row * 0.18], group);
        date.scale.set(0.9, 0.7, 1.15);
      }
    }
  } else {
    addMesh(new THREE.CylinderGeometry(0.31, 0.37, 0.58, 12), material(0xfff0d0), [0, 0.34, 0], group);
    addMesh(new THREE.CylinderGeometry(0.29, 0.31, 0.05, 12), material(0xc8813c), [0, 0.63, 0], group);
  }
  const hitBox = addMesh(
    new THREE.BoxGeometry(1.2, 1.45, 1.25),
    new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false }),
    [0, 0.65, 0],
    group,
    false
  );
  hitBox.userData.itemId = item.id;
}

function addStall(scene: THREE.Scene, item: MarketProductItem, locale: LocaleCode): { product: THREE.Group; collider: THREE.Box3 } {
  const spot = SPOTS[item.id];
  const stall = new THREE.Group();
  stall.position.set(spot.x, 0, spot.z);
  scene.add(stall);
  const wood = material(0x8c542d);
  const woodTop = material(0xc18d51);
  const cream = material(0xffe8be);
  const cloth = material(item.color === 'red' || item.color === 'yellow' ? 0xb94e38 : 0x216c51);

  addMesh(new THREE.CylinderGeometry(2.05, 2.05, 0.055, 32), material(0xb6a18a), [0, 0.05, 0], stall, false);
  const legs: [number, number, number][] = [
    [-1.75, 0.55, -0.82], [1.75, 0.55, -0.82], [-1.75, 0.55, 0.82], [1.75, 0.55, 0.82],
  ];
  legs.forEach((pos) => addMesh(new THREE.BoxGeometry(0.16, 1.1, 0.16), wood, pos, stall));
  addMesh(new THREE.BoxGeometry(4.1, 0.18, 2.1), woodTop, [0, 1.12, 0], stall);
  addMesh(new THREE.BoxGeometry(3.8, 0.1, 1.86), material(0xe0b780), [0, 1.24, 0], stall, false);
  addMesh(new THREE.BoxGeometry(4.5, 0.14, 2.7), wood, [0, 3.08, 0], stall);

  for (let i = 0; i < 7; i++) {
    const x = -2.225 + (i + 0.5) * (4.45 / 7);
    addMesh(new THREE.BoxGeometry(4.45 / 7, 0.16, 2.67), i % 2 === 0 ? cloth : cream, [x, 3.19, 0], stall);
    addMesh(new THREE.BoxGeometry(4.45 / 7, 0.42, 0.08), i % 2 === 0 ? cloth : cream, [x, 2.88, 1.31], stall);
  }
  [-2.03, 2.03].forEach((x) => [-1.15, 1.15].forEach((z) => {
    addMesh(new THREE.CylinderGeometry(0.075, 0.09, 3.05, 7), wood, [x, 1.55, z], stall);
  }));

  const sign = addMesh(
    new THREE.PlaneGeometry(2.35, 0.82),
    new THREE.MeshBasicMaterial({ map: makeSignTexture(item.name[locale], item.arabicSingular), side: THREE.DoubleSide }),
    [spot.x < 0 ? spot.x + 1.75 : spot.x - 1.75, 2.26, spot.z - 0.1],
    scene,
    false
  );
  sign.rotation.y = spot.x < 0 ? Math.PI / 2 : -Math.PI / 2;

  const product = new THREE.Group();
  product.position.set(spot.productX, 1.3, spot.productZ);
  scene.add(product);
  addProduct(product, item);
  const collider = new THREE.Box3(
    new THREE.Vector3(spot.x - 1.9, 0, spot.z - 1.18),
    new THREE.Vector3(spot.x + 1.9, 3.2, spot.z + 1.18)
  );
  return { product, collider };
}

function addPalm(scene: THREE.Scene, x: number, z: number, scale = 1): void {
  const tree = new THREE.Group();
  tree.position.set(x, 0, z);
  tree.scale.setScalar(scale);
  scene.add(tree);
  addMesh(new THREE.CylinderGeometry(0.18, 0.3, 4.4, 7), material(0x79502f), [0, 2.2, 0], tree);
  for (let i = 0; i < 7; i++) {
    const angle = (i / 7) * Math.PI * 2;
    const leaf = addMesh(new THREE.ConeGeometry(0.35, 2.5, 5), material(i % 2 ? 0x3c7847 : 0x4d8a49), [Math.sin(angle) * 0.7, 4.1, Math.cos(angle) * 0.7], tree);
    leaf.rotation.z = Math.cos(angle) * 0.85;
    leaf.rotation.x = Math.sin(angle) * 0.85;
    leaf.rotation.y = i * 0.7;
  }
}

function addBuilding(scene: THREE.Scene, x: number, z: number, color: number, scale = 1): void {
  const house = new THREE.Group();
  house.position.set(x, 0, z);
  house.scale.setScalar(scale);
  scene.add(house);
  addMesh(new THREE.BoxGeometry(3.6, 3.2, 3.1), material(color), [0, 1.6, 0], house);
  addMesh(new THREE.BoxGeometry(0.65, 1.35, 0.12), material(0x62412b), [0, 0.68, 1.6], house);
  addMesh(new THREE.BoxGeometry(0.55, 0.65, 0.14), material(0x7eacba), [-1, 1.95, 1.61], house);
  addMesh(new THREE.BoxGeometry(0.55, 0.65, 0.14), material(0x7eacba), [1, 1.95, 1.61], house);
  addMesh(new THREE.ConeGeometry(2.45, 1.3, 4), material(0x8d4b31), [0, 3.78, 0], house).rotation.y = Math.PI / 4;
}

function addCharacter(scene: THREE.Scene): THREE.Group {
  const root = new THREE.Group();
  root.position.set(0, 0, 10);
  scene.add(root);
  const shirt = material(0xece7d9);
  const skin = material(0xd8a57b);
  const trousers = material(0x2d5c92);
  const cap = addMesh(new THREE.SphereGeometry(0.24, 9, 6), material(0xffffff), [0, 1.9, 0], root);
  cap.scale.set(1.1, 0.42, 1.1);
  addMesh(new THREE.CylinderGeometry(0.18, 0.24, 0.16, 9), material(0xfdf7e8), [0, 1.83, 0], root);
  const head = addMesh(new THREE.SphereGeometry(0.22, 10, 8), skin, [0, 1.55, 0], root);
  head.scale.set(0.85, 1.15, 0.84);
  addMesh(new THREE.CylinderGeometry(0.21, 0.3, 0.78, 8), shirt, [0, 0.98, 0], root);
  addMesh(new THREE.BoxGeometry(0.45, 0.5, 0.24), material(0xf3cc43), [0, 1.12, -0.15], root);
  const leftArm = addMesh(new THREE.CylinderGeometry(0.075, 0.09, 0.62, 7), trousers, [-0.3, 1.02, 0], root);
  const rightArm = addMesh(new THREE.CylinderGeometry(0.075, 0.09, 0.62, 7), trousers, [0.3, 1.02, 0], root);
  leftArm.rotation.z = -0.13;
  rightArm.rotation.z = 0.13;
  const leftLeg = addMesh(new THREE.CylinderGeometry(0.09, 0.1, 0.58, 7), trousers, [-0.13, 0.34, 0], root);
  const rightLeg = addMesh(new THREE.CylinderGeometry(0.09, 0.1, 0.58, 7), trousers, [0.13, 0.34, 0], root);
  addMesh(new THREE.BoxGeometry(0.22, 0.12, 0.38), material(0x4b3a2c), [-0.13, 0.06, -0.07], root);
  addMesh(new THREE.BoxGeometry(0.22, 0.12, 0.38), material(0x4b3a2c), [0.13, 0.06, -0.07], root);
  root.userData.leftLeg = leftLeg;
  root.userData.rightLeg = rightLeg;
  root.userData.leftArm = leftArm;
  root.userData.rightArm = rightArm;
  return root;
}

function findItemId(object: THREE.Object3D | null): string | null {
  let current: THREE.Object3D | null = object;
  while (current) {
    if (typeof current.userData.itemId === 'string') return current.userData.itemId;
    current = current.parent;
  }
  return null;
}

export const Market3DScene: React.FC<Market3DSceneProps> = ({
  locale, items, basket, locked = false, onCollect,
}) => {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const onCollectRef = useRef(onCollect);
  const localeRef = useRef(locale);
  const lockedRef = useRef(locked);
  const basketRef = useRef(basket);
  const [nearbyItemId, setNearbyItemId] = useState<string | null>(null);
  const [notice, setNotice] = useState('');
  const [sceneReady, setSceneReady] = useState(false);
  const noticeTimer = useRef<number | null>(null);

  useEffect(() => { onCollectRef.current = onCollect; }, [onCollect]);
  useEffect(() => { localeRef.current = locale; }, [locale]);
  useEffect(() => { lockedRef.current = locked; }, [locked]);
  useEffect(() => { basketRef.current = basket; }, [basket]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    } catch {
      setNotice(localeRef.current === 'id-ID'
        ? 'Peramban ini tidak mendukung WebGL. Coba Chrome dengan akselerasi perangkat keras.'
        : 'Pelayar ini tidak menyokong WebGL. Cuba Chrome dengan pecutan perkakasan.');
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.6));
    renderer.setSize(host.clientWidth, host.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.12;
    renderer.domElement.className = 'block h-full w-full outline-none';
    renderer.domElement.tabIndex = 0;
    renderer.domElement.setAttribute('aria-label', 'Interactive 3D Arabic market. Use WASD or arrow keys to walk and E to take products.');
    host.prepend(renderer.domElement);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xe5c994);
    scene.fog = new THREE.Fog(0xe5c994, 27, 58);
    const camera = new THREE.PerspectiveCamera(58, Math.max(host.clientWidth, 1) / Math.max(host.clientHeight, 1), 0.1, 120);
    scene.add(new THREE.HemisphereLight(0xffe6bd, 0x7c6249, 2.1));
    const sun = new THREE.DirectionalLight(0xffe6bb, 3.1);
    sun.position.set(-11, 20, 9);
    sun.castShadow = true;
    sun.shadow.mapSize.set(1024, 1024);
    sun.shadow.camera.left = -19;
    sun.shadow.camera.right = 19;
    sun.shadow.camera.top = 23;
    sun.shadow.camera.bottom = -23;
    scene.add(sun);
    const fill = new THREE.DirectionalLight(0xd6e7ff, 0.7);
    fill.position.set(12, 8, -12);
    scene.add(fill);

    const floorTexture = makeFloorTexture();
    addMesh(new THREE.PlaneGeometry(48, 58), new THREE.MeshStandardMaterial({ map: floorTexture, roughness: 1 }), [0, -0.08, -1], scene, false).rotation.x = -Math.PI / 2;
    addMesh(new THREE.BoxGeometry(4.4, 0.018, 38), material(0xe7c38a), [0, -0.02, 0], scene, false);
    for (let z = -15; z <= 13; z += 4) {
      addMesh(new THREE.BoxGeometry(0.11, 0.025, 1.45), material(0xc9a873), [0, 0, z], scene, false);
    }

    const colliders: THREE.Box3[] = [];
    const productGroups = new Map<string, THREE.Group>();
    for (const item of items) {
      const built = addStall(scene, item, localeRef.current);
      colliders.push(built.collider);
      productGroups.set(item.id, built.product);
    }
    addPalm(scene, -12, -9, 1.05);
    addPalm(scene, 12, -9, 1.15);
    addPalm(scene, -12, 7, 0.85);
    addPalm(scene, 12, 7, 0.9);
    addBuilding(scene, -12, -17, 0xc79b63, 1.3);
    addBuilding(scene, -7, -19, 0xd7ad75, 1.1);
    addBuilding(scene, 12, -17, 0xd1a46d, 1.25);
    addBuilding(scene, 7, -19, 0xb98456, 1.1);
    for (let i = 0; i < 5; i++) {
      const z = -10 + i * 5;
      addMesh(new THREE.CylinderGeometry(0.025, 0.025, 2.3, 5), material(0x77502e), [0, 4.7, z], scene, false);
      addMesh(new THREE.OctahedronGeometry(0.22, 0), material(0xffc65b), [0, 3.45, z], scene);
      addMesh(new THREE.ConeGeometry(0.18, 0.16, 4), material(0x87552e), [0, 3.68, z], scene, false);
    }

    const player = addCharacter(scene);
    const keys = new Set<string>();
    const playerPosition = new THREE.Vector3(0, 0, 10);
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    const interactables: THREE.Object3D[] = [];
    productGroups.forEach((group) => {
      group.traverse((object) => { if (object.userData.itemId) interactables.push(object); });
    });

    let yaw = 0;
    let lastTime = performance.now();
    let lastHudUpdate = 0;
    let currentNearest: string | null = null;
    let walkTime = 0;
    let running = true;

    const say = (message: string) => {
      setNotice(message);
      if (noticeTimer.current !== null) window.clearTimeout(noticeTimer.current);
      noticeTimer.current = window.setTimeout(() => setNotice(''), 2400);
    };
    const collectItem = (itemId: string) => {
      if (lockedRef.current) return;
      const item = items.find((candidate) => candidate.id === itemId);
      onCollectRef.current(itemId);
      const name = item?.name[localeRef.current] || 'Barang';
      say(localeRef.current === 'id-ID'
        ? name + ' dimasukkan ke keranjang.'
        : name + ' dimasukkan ke dalam bakul.');
    };
    const collectNearest = () => {
      if (lockedRef.current) return;
      if (!currentNearest) {
        say(localeRef.current === 'id-ID'
          ? 'Berjalan mendekati salah satu lapak untuk mengambil barang.'
          : 'Berjalan menghampiri salah satu gerai untuk mengambil barang.');
        return;
      }
      collectItem(currentNearest);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      if (['arrowup', 'arrowdown', 'arrowleft', 'arrowright', ' '].includes(key)) event.preventDefault();
      if ((key === 'e' || key === 'enter') && !keys.has(key)) collectNearest();
      keys.add(key);
    };
    const onKeyUp = (event: KeyboardEvent) => keys.delete(event.key.toLowerCase());
    const onBlur = () => keys.clear();
    const onPointerDown = () => renderer.domElement.focus({ preventScroll: true });
    const onClick = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObjects(interactables, true);
      const hitId = hits.map((hit) => findItemId(hit.object)).find(Boolean);
      if (!hitId) return;
      const spot = SPOTS[hitId];
      const distance = Math.hypot(playerPosition.x - spot.productX, playerPosition.z - spot.productZ);
      if (distance > 3.9) {
        say(localeRef.current === 'id-ID'
          ? 'Terlalu jauh. Berjalan mendekat ke lapak terlebih dahulu.'
          : 'Terlalu jauh. Berjalan mendekati gerai terlebih dahulu.');
        return;
      }
      collectItem(hitId);
    };
    const onWindowResize = () => {
      if (!host.isConnected) return;
      camera.aspect = Math.max(host.clientWidth, 1) / Math.max(host.clientHeight, 1);
      camera.updateProjectionMatrix();
      renderer.setSize(host.clientWidth, host.clientHeight);
    };
    const blocked = (x: number, z: number): boolean => {
      const playerBox = new THREE.Box3(new THREE.Vector3(x - 0.27, 0, z - 0.27), new THREE.Vector3(x + 0.27, 1.85, z + 0.27));
      return colliders.some((box) => box.intersectsBox(playerBox));
    };

    const animate = (now: number) => {
      if (!running) return;
      const delta = Math.min((now - lastTime) / 1000, 0.04);
      lastTime = now;
      const forward = (keys.has('w') || keys.has('arrowup') ? 1 : 0) - (keys.has('s') || keys.has('arrowdown') ? 1 : 0);
      const sideways = (keys.has('d') || keys.has('arrowright') ? 1 : 0) - (keys.has('a') || keys.has('arrowleft') ? 1 : 0);
      const isMoving = forward !== 0 || sideways !== 0;
      const speed = keys.has('shift') ? 7.2 : 4.6;
      if (isMoving && !lockedRef.current) {
        const length = Math.hypot(forward, sideways) || 1;
        const moveX = (sideways / length) * speed * delta;
        const moveZ = (-forward / length) * speed * delta;
        const nextX = THREE.MathUtils.clamp(playerPosition.x + moveX, -11.2, 11.2);
        const nextZ = THREE.MathUtils.clamp(playerPosition.z + moveZ, -12.6, 12.5);
        if (!blocked(nextX, playerPosition.z)) playerPosition.x = nextX;
        if (!blocked(playerPosition.x, nextZ)) playerPosition.z = nextZ;
        yaw = Math.atan2(-moveX, -moveZ);
        walkTime += delta * (keys.has('shift') ? 13 : 9);
      }

      player.position.set(playerPosition.x, 0.02 + (isMoving ? Math.abs(Math.sin(walkTime * 2)) * 0.04 : 0), playerPosition.z);
      if (isMoving) player.rotation.y = THREE.MathUtils.lerp(player.rotation.y, yaw, 0.16);
      const limbs = player.userData;
      if (limbs.leftLeg && limbs.rightLeg && limbs.leftArm && limbs.rightArm) {
        const swing = isMoving ? Math.sin(walkTime) * 0.42 : 0;
        limbs.leftLeg.rotation.x = swing;
        limbs.rightLeg.rotation.x = -swing;
        limbs.leftArm.rotation.x = -swing * 0.65;
        limbs.rightArm.rotation.x = swing * 0.65;
      }

      const cameraTarget = player.position.clone().add(new THREE.Vector3(Math.sin(yaw) * 6.3, 4.6, Math.cos(yaw) * 6.3));
      camera.position.lerp(cameraTarget, 0.075);
      camera.lookAt(player.position.x, 1.15, player.position.z - 1.8);

      let nearest: string | null = null;
      let nearestDistance = Infinity;
      for (const [itemId, group] of productGroups) {
        const spot = SPOTS[itemId];
        const dist = Math.hypot(playerPosition.x - spot.productX, playerPosition.z - spot.productZ);
        group.position.y = 1.3 + Math.sin(now / 500 + spot.z) * 0.045;
        if (dist < nearestDistance) {
          nearestDistance = dist;
          nearest = itemId;
        }
        group.traverse((object) => {
          const target = object as THREE.Mesh;
          if (target.userData.itemId && target.material && !Array.isArray(target.material) && target.material instanceof THREE.MeshStandardMaterial) {
            target.material.emissive.setHex(dist < 3.9 ? 0x3e2810 : 0x000000);
          }
        });
      }
      currentNearest = nearestDistance <= 3.9 ? nearest : null;
      if (now - lastHudUpdate > 180) {
        lastHudUpdate = now;
        setNearbyItemId(currentNearest);
      }
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
    window.addEventListener('keydown', onKeyDown, { passive: false });
    window.addEventListener('keyup', onKeyUp);
    window.addEventListener('blur', onBlur);
    window.addEventListener('resize', onWindowResize);
    renderer.domElement.addEventListener('pointerdown', onPointerDown);
    renderer.domElement.addEventListener('click', onClick);
    setSceneReady(true);

    return () => {
      running = false;
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      window.removeEventListener('blur', onBlur);
      window.removeEventListener('resize', onWindowResize);
      renderer.domElement.removeEventListener('pointerdown', onPointerDown);
      renderer.domElement.removeEventListener('click', onClick);
      if (noticeTimer.current !== null) window.clearTimeout(noticeTimer.current);
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          const materials = Array.isArray(object.material) ? object.material : [object.material];
          materials.forEach((entry) => {
            const texture = (entry as THREE.MeshStandardMaterial | THREE.MeshBasicMaterial).map;
            if (texture) texture.dispose();
            entry.dispose();
          });
        }
      });
      floorTexture.dispose();
      renderer.dispose();
      if (renderer.domElement.parentElement === host) host.removeChild(renderer.domElement);
    };
  }, [items, locale]);

  const selectedItem = items.find((item) => item.id === nearbyItemId) || null;
  const totalItems = Object.values(basket).reduce((sum, qty) => sum + qty, 0);
  const holdKey = (key: string, down: boolean) => {
    window.dispatchEvent(new KeyboardEvent(down ? 'keydown' : 'keyup', { key, bubbles: true }));
  };

  return (
    <div
      ref={hostRef}
      tabIndex={0}
      onPointerDown={() => hostRef.current?.focus({ preventScroll: true })}
      className="relative h-[68vh] min-h-[470px] max-h-[760px] w-full overflow-hidden rounded-[24px] border border-[#6c4a28]/25 bg-[#e5c994] shadow-[0_18px_50px_rgba(75,52,25,0.16)] outline-none"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-start justify-between gap-3 p-3 sm:p-5">
        <div className="max-w-[min(70%,430px)] rounded-2xl border border-[#e8bc68]/40 bg-[#26190f]/90 px-4 py-3 text-[#fff1d3] shadow-xl backdrop-blur-sm">
          <div className="flex items-center justify-between gap-3">
            <span className="text-[10px] font-black uppercase tracking-[0.22em] text-[#efc36f]">SUQ AL-MADINAH · 3D</span>
            <span className="text-[10px] font-bold text-[#8ff0ca]">{sceneReady ? 'WEBGL LIVE' : 'STARTING 3D…'}</span>
          </div>
          <div className="mt-1 text-xs font-semibold">
            {locale === 'id-ID' ? 'Berjalan di pasar dan temukan barang yang diminta.' : 'Berjalan di pasar dan cari barang yang diminta.'}
          </div>
        </div>
        <div className="rounded-2xl border border-[#e8bc68]/40 bg-[#26190f]/90 px-4 py-3 text-right text-[#fff1d3] shadow-xl backdrop-blur-sm">
          <div className="text-[10px] font-bold uppercase tracking-widest text-[#efc36f]">{locale === 'id-ID' ? 'Keranjang' : 'Bakul'}</div>
          <div className="mt-0.5 text-2xl font-black tabular-nums">{totalItems}<span className="ml-1 text-xs font-semibold opacity-60">/ 5</span></div>
        </div>
      </div>

      {selectedItem && !locked && (
        <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 w-[min(90%,360px)] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-[#f6ca78]/60 bg-[#24170f]/90 p-4 text-center text-[#fff3d8] shadow-2xl backdrop-blur-sm">
          <div className="text-[10px] font-black uppercase tracking-[0.2em] text-[#f2c46d]">
            {locale === 'id-ID' ? 'LAPAK TERDEKAT' : 'GERAI TERDEKAT'}
          </div>
          <div className="mt-1 text-lg font-extrabold">{selectedItem.name[locale]}</div>
          <div dir="rtl" lang="ar" className="mt-1 font-arabic text-2xl font-bold text-white">{selectedItem.arabicSingular}</div>
          <div className="mt-2 text-[10px] font-semibold text-[#a9f0d3]">
            {locale === 'id-ID' ? 'Tekan E atau klik barang untuk mengambilnya' : 'Tekan E atau klik barang untuk mengambilnya'}
          </div>
        </div>
      )}

      {notice && (
        <div role="status" className="absolute left-1/2 top-[58%] z-20 -translate-x-1/2 rounded-xl border border-[#f0c875]/40 bg-[#21170f]/95 px-4 py-2 text-center text-xs font-bold text-[#fff0cd] shadow-xl">
          {notice}
        </div>
      )}

      <div className="pointer-events-none absolute bottom-3 left-3 z-10 hidden sm:block">
        <div className="rounded-2xl border border-white/20 bg-[#20170f]/80 p-3 text-[#fff0d0] shadow-xl backdrop-blur-sm">
          <div className="grid grid-cols-3 gap-1.5">
            <span />
            <KeyCap label="W" />
            <span />
            <KeyCap label="A" />
            <KeyCap label="S" />
            <KeyCap label="D" />
          </div>
          <div className="mt-2 flex items-center gap-2 text-[10px] font-bold text-[#e9c989]">
            <KeyCap label="E" wide /> {locale === 'id-ID' ? 'AMBIL BARANG' : 'AMBIL BARANG'}
            <KeyCap label="SHIFT" wide /> RUN
          </div>
        </div>
      </div>

      <div className="absolute bottom-3 right-3 z-10 flex flex-col items-center gap-1 sm:hidden">
        <ControlButton label="↑" onDown={() => holdKey('ArrowUp', true)} onUp={() => holdKey('ArrowUp', false)} />
        <div className="flex gap-1">
          <ControlButton label="←" onDown={() => holdKey('ArrowLeft', true)} onUp={() => holdKey('ArrowLeft', false)} />
          <ControlButton label="↓" onDown={() => holdKey('ArrowDown', true)} onUp={() => holdKey('ArrowDown', false)} />
          <ControlButton label="→" onDown={() => holdKey('ArrowRight', true)} onUp={() => holdKey('ArrowRight', false)} />
        </div>
        <button type="button" onClick={() => { holdKey('e', true); holdKey('e', false); }} className="mt-1 rounded-xl border border-[#f3c76b]/70 bg-[#2b1d11]/95 px-5 py-2 text-xs font-black text-[#f8d68d] shadow-lg">
          {locale === 'id-ID' ? 'AMBIL (E)' : 'AMBIL (E)'}
        </button>
      </div>
    </div>
  );
};

const KeyCap: React.FC<{ label: string; wide?: boolean }> = ({ label, wide = false }) => (
  <span className={'inline-flex h-7 ' + (wide ? 'min-w-8 px-2' : 'w-8') + ' items-center justify-center rounded-lg border border-white/25 bg-white/10 text-[10px] font-black text-white shadow-inner'}>
    {label}
  </span>
);

const ControlButton: React.FC<{ label: string; onDown: () => void; onUp: () => void }> = ({
  label, onDown, onUp,
}) => (
  <button
    type="button"
    onPointerDown={(event) => { event.preventDefault(); onDown(); }}
    onPointerUp={onUp}
    onPointerLeave={onUp}
    onPointerCancel={onUp}
    className="h-10 w-10 touch-none rounded-xl border border-white/25 bg-[#2b1d11]/85 text-lg font-black text-white shadow-lg active:bg-[#896035]"
  >
    {label}
  </button>
);
