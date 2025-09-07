import React, { useEffect, useRef, useState } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { Box3, Vector3 } from 'three';
import { useApp } from '../App.jsx';
import { CAR_LOAD_DISTANCE } from '../config.js';

export default function CarModel({ car, scene, camera, outlineObjects, loadingManager }) {
  const groupRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const { selectedCar } = useApp();
  const gltfRef = useRef(null);

  useEffect(() => {
    if (!scene) return;
    const g = groupRef.current;
    if (!g) return;
    g.name = car.id;
    g.position.set(...car.position);
    g.rotation.set(...car.rotation);
    scene.add(g);
    return () => { scene.remove(g); };
  }, [scene, car]);

  useEffect(() => {
    if (!scene || !camera || loaded) return;

    const loader = new GLTFLoader(loadingManager || undefined);
    const draco = new DRACOLoader();
    draco.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
    loader.setDRACOLoader(draco);

    let cancelled = false;
    const attempt = () => {
      if (loaded) return;
      const dist = camera.position.distanceTo(new Vector3(...car.position));
      if (dist <= CAR_LOAD_DISTANCE) {
        loader.load(
          car.model,
          (gltf) => {
            if (cancelled) return;
            gltfRef.current = gltf;
            gltf.scene.traverse(m => {
              if (m.isMesh) {
                m.castShadow = true;
                m.receiveShadow = true;
              }
            });
            const bbox = new Box3().setFromObject(gltf.scene);
            const size = new Vector3();
            bbox.getSize(size);
            const maxDim = Math.max(size.x, size.y, size.z);
            if (maxDim > 0) {
              const desired = 3.4;
              gltf.scene.scale.setScalar(desired / maxDim);
            }
            const bbox2 = new Box3().setFromObject(gltf.scene);
            gltf.scene.position.y -= bbox2.min.y;
            groupRef.current.add(gltf.scene);
            setLoaded(true);
          },
          undefined,
          (err) => {
            console.warn('Failed loading model', car.model, err);
            setLoaded(true);
          }
        );
      }
    };
    const interval = setInterval(attempt, 700);
    attempt();

    return () => {
      cancelled = true;
      clearInterval(interval);
      if (gltfRef.current) groupRef.current.remove(gltfRef.current.scene);
    };
  }, [scene, camera, loaded, car, loadingManager]);

  useEffect(() => {
    const g = groupRef.current;
    if (!g) return;
    if (selectedCar && selectedCar.id === car.id) {
      if (!outlineObjects.includes(g)) outlineObjects.push(g);
      g.userData._origScale = g.userData._origScale || g.scale.clone();
      g.scale.setScalar(g.userData._origScale.x * 1.03);
    } else {
      const idx = outlineObjects.indexOf(g);
      if (idx !== -1) outlineObjects.splice(idx, 1);
      if (g.userData._origScale) g.scale.copy(g.userData._origScale);
    }
  }, [selectedCar, car, outlineObjects]);

  return <group ref={groupRef} />;
}