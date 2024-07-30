import { Html, useProgress } from "@react-three/drei";

const CanvasLoader = () => {
  const { progress } = useProgress();

  return (
    <Html>
      <span className="canvas-load"></span>
      <p
        style={{
          fontSize: 10,
          color: '#000000',
          fontWeight: 800,
          marginTop: 40
        }}
      >{progress.toFixed(2)}%</p>
    </Html>
  );
};

export default CanvasLoader;