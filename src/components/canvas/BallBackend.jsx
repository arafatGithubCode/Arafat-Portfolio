/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
import { Suspense } from "react";
import {
  Decal,
  Float,
  OrbitControls,
  Preload,
  useTexture,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import CanvasLoader from "../Loader";
import { motion } from "framer-motion";

const BallBackend = (props) => {
  const [decal] = useTexture([props.imgUrl]);
  return (
    <Float speed={1.75} rotationIntensity={1} floatIntensity={2}>
      <ambientLight intensity={0.25} />
      <directionalLight position={[0, 0, 0.05]} />
      <mesh castShadow receiveShadow scale={2.75}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#fff8eb"
          polygonOffset
          polygonOffsetFactor={-5}
          flatShading
        />
        <Decal
          position={[0, 0, 1]}
          scale={1}
          flatShading
          map={decal}
          rotation={[Math.PI * 2, 0, 6.25]}
        />
      </mesh>
    </Float>
  );
};

const BallCanvasBackend = ({ icon, name }) => {
  return (
    <div>
      <Canvas
        frameloop="demand"
        dpr={[1, 2]}
        gl={{ preserveDrawingBuffer: true }}
      >
        <Suspense fallback={<CanvasLoader />}>
          <OrbitControls enableZoom={false} />
          <BallBackend imgUrl={icon} />
        </Suspense>
        <Preload all />
      </Canvas>

      <div className="mt-2 ml-5 whitespace-nowrap bg-gradient-to-r from-sky-500 via-pink-500 to-green-500 inline-block text-transparent bg-clip-text text-2xl font-bold border-b border-gray-500 relative">
        {name}
        <motion.div
          animate={{
            x: [0, 64, 0],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            repeatType: "loop",
          }}
          className="w-10 h-5 bg-slate-300/10 absolute top-0 rounded-xl"
        />
      </div>
    </div>
  );
};

export default BallCanvasBackend;
