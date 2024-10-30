// src/Scene.tsx
import { Html, OrbitControls, Stats, useProgress } from "@react-three/drei";
import { Canvas, useLoader } from "@react-three/fiber";
import React, { Suspense, useRef, useState } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

function Loader() {
  const { progress } = useProgress();
  console.log(progress);
  return <Html center>{progress} % loaded</Html>;
}

const Scene: React.FC = () => {
  const gltf = useLoader(GLTFLoader, "/models/test.glb");
  const modelRef = useRef();

  // State for the sliders
  const [sizeX, setSizeX] = useState(1);
  const [sizeY, setSizeY] = useState(1);
  const [sizeZ, setSizeZ] = useState(1);

  // Handler functions for each slider
  const handleSizeXChange = (e: any) => setSizeX(e.target.value);
  const handleSizeYChange = (e: any) => setSizeY(e.target.value);
  const handleSizeZChange = (e: any) => setSizeZ(e.target.value);

  return (
    <>
      <Suspense fallback={<Loader />}>
        <Canvas camera={{ position: [6, 4, 2] }}>
          <directionalLight
            position={[0, 0, 25]}
            castShadow
            intensity={Math.PI * 1}
          />
          <directionalLight
            position={[-1, 0.6, 2.8]}
            castShadow
            intensity={Math.PI * 1}
          />
          {/* Apply the scale properties */}
          <primitive
            children-1-scale-x={sizeX}
            children-1-scale-y={sizeY}
            children-1-scale-z={sizeZ}
            ref={modelRef}
            object={gltf.scene}
            position={[0, -1, 0]}
          />

          <OrbitControls target={[0, 0, 0]} />
          <axesHelper args={[100]} />
          <gridHelper />
        </Canvas>
      </Suspense>

      {/* Sliders */}
      <div style={{ position: "absolute", top: 0, right: 0, padding: 10 }}>
        <label>Size X: </label>
        <input
          type="range"
          min="-10"
          max="10"
          step="0.1"
          value={sizeX}
          onChange={handleSizeXChange}
        />
        <label>Size Y: </label>
        <input
          type="range"
          min="-10"
          max="10"
          step="0.1"
          value={sizeY}
          onChange={handleSizeYChange}
        />
        <label>SizeZ: </label>
        <input
          type="range"
          min="-10"
          max="10"
          step="0.1"
          value={sizeZ}
          onChange={handleSizeZChange}
        />
      </div>
    </>
  );
};

export default Scene;
