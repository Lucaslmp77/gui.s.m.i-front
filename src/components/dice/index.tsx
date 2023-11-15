import { Text } from '@react-three/drei';
import styles from './styles.module.css';

import { useRef } from "react";
import { Canvas, useFrame, useLoader } from "react-three-fiber";
import { Mesh, TextureLoader } from "three";

interface CubeGeoProps {
  position: [number, number, number];
  size: [number, number, number];
  color: string;
  number: [number, number, number, number, number, number]
}

const CubeGeo: React.FC<CubeGeoProps> = ({ position, size }) => {

  const meshRef = useRef<Mesh>(null);

  useFrame(() => {
    if (!meshRef.current){
      return;
    }
    meshRef.current.rotation.x += 0.1;
    meshRef.current.rotation.y += 0.01;
  });

  const faces = [
    useLoader(TextureLoader, "src/assets/SideDice/numero-1.png"),
    useLoader(TextureLoader, "src/assets/SideDice/numero-2.png"),
    useLoader(TextureLoader, "src/assets/SideDice/numero-3.png"),
    useLoader(TextureLoader, "src/assets/SideDice/numero-4.png"),
    useLoader(TextureLoader, "src/assets/SideDice/numero-5.png"),
    useLoader(TextureLoader, "src/assets/SideDice/numero-6.png"),
  ]

  return(
    <mesh ref={meshRef} position={position}>
      <boxGeometry attach="geometry" args={size} />
      {faces.map((texture, index) => (
        <meshStandardMaterial key={index} map={texture} />
      ))}
    </mesh>
  )
}

export default function Dice(){
  return (
    <section className={styles.container}>
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]}/>
        <CubeGeo position={[0,1,0]} color={"green"} size={[1,1,1]}/>
      </Canvas>
    </section>
  )
}