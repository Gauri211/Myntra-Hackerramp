/* eslint-disable react/no-unknown-property */
import { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Preload, useGLTF } from '@react-three/drei';
import CanvasLoader from './Loader';

// eslint-disable-next-line react/prop-types
const Model = ({ isMobile }) => {
  const computer = useGLTF('/model.gltf'); // Adjust the path as needed

  return (
    <mesh>
      <hemisphereLight intensity={0.3} groundColor={'black'} />
      <pointLight intensity={1} />
      <spotLight
        position={[-50, 50, 20]}
        angle={0.15}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={2048} // Increased shadow map size for better resolution
      />
      <primitive
        object={computer.scene}
        scale={isMobile ? 2 : 1.5}
        position={isMobile ? [0, 0, 0] : [0, -1.5, 0]}
        rotation={[0, 0, 0]} // Explicitly setting rotation to zero
      />
    </mesh>
  );
};

const ModelViewer = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 500px)');
    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener('change', handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    };
  }, []);

  return (
    <Canvas
      frameloop='demand'
      shadows
      camera={{ position: [5, 3, 3], fov: 40, near: 0.1, far: 500 }} // Adjusted near and far planes
      gl={{ preserveDrawingBuffer: true, antialias: true }} // Enabled anti-aliasing
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={true}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Model isMobile={isMobile} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default ModelViewer;
