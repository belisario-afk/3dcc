import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

export function CarModel({ path }: { path: string }) {
  const gltf = useGLTF(path);
  return <primitive object={gltf.scene} />;
}

export function CarModelViewer({ modelPath }: { modelPath: string }) {
  return (
    <div style={{ width: "100%", height: 400 }}>
      <Canvas camera={{ position: [2, 1, 3], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <CarModel path={modelPath} />
        <OrbitControls />
      </Canvas>
    </div>
  );
}