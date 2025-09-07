import React, { useEffect, useRef } from 'react';
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  Color,
  AmbientLight,
  DirectionalLight,
  PlaneGeometry,
  MeshStandardMaterial,
  Mesh,
  TextureLoader,
  RepeatWrapping,
  Raycaster,
  Vector2,
  ACESFilmicToneMapping,
  PCFSoftShadowMap,
  FogExp2,
  LoadingManager,
  SRGBColorSpace
} from 'three';

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js';

import CarModel from './CarModel.jsx';
import { CAMERA_CONFIG, LIGHTING_CONFIG, PARKING_CONFIG } from '../config.js';
import { useApp } from '../App.jsx';

export default function ParkingLot() {
  const mountRef = useRef(null);
  const { cars, setSelectedCar, setLoadingProgress, setIsSceneReady } = useApp();
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const composerRef = useRef(null);
  const outlinePassRef = useRef(null);
  const pointer = useRef(new Vector2());
  const raycaster = useRef(new Raycaster());
  const outlineObjectsRef = useRef([]);
  const loadingManagerRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const scene = new Scene();
    scene.background = new Color('#0a0c0f');
    scene.fog = new FogExp2('#0a0c0f', 0.012);
    sceneRef.current = scene;

    const camera = new PerspectiveCamera(
      CAMERA_CONFIG.fov,
      container.clientWidth / container.clientHeight,
      CAMERA_CONFIG.near,
      CAMERA_CONFIG.far
    );
    camera.position.set(...CAMERA_CONFIG.startPosition);
    cameraRef.current = camera;
    window.__THREE_MAIN_CAMERA = camera;
    window.__THREE_SCENE = scene;

    const renderer = new WebGLRenderer({ antialias: true, alpha: false });
    // New color space property (Three r152+)
    if ('outputColorSpace' in renderer) {
      renderer.outputColorSpace = SRGBColorSpace;
    } else {
      // Backward compatibility if an older three version is used
      renderer.outputEncoding = SRGBColorSpace;
    }
    renderer.toneMapping = ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = PCFSoftShadowMap;
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    const outlinePass = new OutlinePass({ x: container.clientWidth, y: container.clientHeight }, scene, camera);
    outlinePass.edgeStrength = 5;
    outlinePass.edgeGlow = 0.4;
    outlinePass.edgeThickness = 2.5;
    outlinePass.pulsePeriod = 2;
    outlinePass.visibleEdgeColor.set('#d4af37');
    outlinePass.hiddenEdgeColor.set('#685520');
    composer.addPass(outlinePass);
    outlinePassRef.current = outlinePass;
    composerRef.current = composer;

    const ambient = new AmbientLight('#ffffff', LIGHTING_CONFIG.ambientIntensity);
    scene.add(ambient);

    const sun = new DirectionalLight('#ffffff', LIGHTING_CONFIG.sun.intensity);
    sun.position.set(...LIGHTING_CONFIG.sun.position);
    sun.castShadow = LIGHTING_CONFIG.sun.castShadow;
    sun.shadow.mapSize.set(LIGHTING_CONFIG.sun.shadow.mapSize, LIGHTING_CONFIG.sun.shadow.mapSize);
    sun.shadow.camera.near = LIGHTING_CONFIG.sun.shadow.camera.near;
    sun.shadow.camera.far = LIGHTING_CONFIG.sun.shadow.camera.far;
    sun.shadow.camera.left = LIGHTING_CONFIG.sun.shadow.camera.left;
    sun.shadow.camera.right = LIGHTING_CONFIG.sun.shadow.camera.right;
    sun.shadow.camera.top = LIGHTING_CONFIG.sun.shadow.camera.top;
    sun.shadow.camera.bottom = LIGHTING_CONFIG.sun.shadow.camera.bottom;
    scene.add(sun);

    const groundGeo = new PlaneGeometry(PARKING_CONFIG.lotSize, PARKING_CONFIG.lotSize);
    const texLoader = new TextureLoader();
    const asphalt = texLoader.load('/assets/textures/asphalt_diffuse.jpg', (t) => {
      t.wrapS = t.wrapT = RepeatWrapping;
      t.repeat.set(PARKING_CONFIG.textureRepeat, PARKING_CONFIG.textureRepeat);
    });
    const rough = texLoader.load('/assets/textures/asphalt_roughness.jpg', (t) => {
      t.wrapS = t.wrapT = RepeatWrapping;
      t.repeat.set(PARKING_CONFIG.textureRepeat, PARKING_CONFIG.textureRepeat);
    });
    const groundMat = new MeshStandardMaterial({
      map: asphalt,
      roughnessMap: rough,
      roughness: 1,
      metalness: 0
    });
    const ground = new Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    generateParkingLines(scene);

    const loadingManager = new LoadingManager();
    loadingManager.onProgress = (_url, itemsLoaded, itemsTotal) => {
      const percent = itemsTotal ? (itemsLoaded / itemsTotal) * 100 : 100;
      setLoadingProgress({ itemsLoaded, itemsTotal, percent });
    };
    loadingManager.onLoad = () => setTimeout(() => setIsSceneReady(true), 400);
    loadingManagerRef.current = loadingManager;

    function onResize() {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
      composer.setSize(container.clientWidth, container.clientHeight);
    }
    window.addEventListener('resize', onResize);

    function onPointerMove(e) {
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    }

    function onClick() {
      raycaster.current.setFromCamera(pointer.current, camera);
      const hits = raycaster.current.intersectObjects(scene.children, true);
      if (hits.length) {
        const grp = findCarGroup(hits[0].object);
        if (grp) {
          const car = cars.find(c => c.id === grp.name);
          if (car) {
            setSelectedCar(car);
            return;
          }
        }
      }
      setSelectedCar(null);
    }

    renderer.domElement.addEventListener('pointermove', onPointerMove);
    renderer.domElement.addEventListener('click', onClick);

    let raf;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      outlinePass.selectedObjects = outlineObjectsRef.current;
      composer.render();
    };
    loop();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      renderer.domElement.removeEventListener('pointermove', onPointerMove);
      renderer.domElement.removeEventListener('click', onClick);
      container.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, [cars, setSelectedCar, setLoadingProgress, setIsSceneReady]);

  return (
    <>
      <div ref={mountRef} style={{ position: 'absolute', inset: 0 }} />
      {sceneRef.current && cameraRef.current && cars.map(car => (
        <CarModel
          key={car.id}
          car={car}
          scene={sceneRef.current}
          camera={cameraRef.current}
          outlineObjects={outlineObjectsRef.current}
          loadingManager={loadingManagerRef.current || undefined}
        />
      ))}
    </>
  );
}

function findCarGroup(obj) {
  let cur = obj;
  while (cur) {
    if (cur.name && cur.name.startsWith('car-')) return cur;
    cur = cur.parent;
  }
  return null;
}

function generateParkingLines(scene) {
  const mat = new MeshStandardMaterial({ color: '#eeeeee', emissive: '#ffffff', emissiveIntensity: 0.5 });
  const geo = new PlaneGeometry(0.15, 5);
  const startX = -30;
  const startZ = -30;
  for (let i = 0; i < 12; i++) {
    const l1 = new Mesh(geo, mat);
    l1.rotation.x = -Math.PI / 2;
    l1.position.set(startX + i * 5, 0.001, startZ);
    scene.add(l1);
    const l2 = l1.clone();
    l2.position.z = startZ + 10;
    scene.add(l2);
  }
}