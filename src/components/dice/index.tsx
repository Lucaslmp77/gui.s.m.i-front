import { Text } from '@react-three/drei';
import styles from './styles.module.css';

import { useRef } from "react";
import { Canvas, useFrame } from "react-three-fiber";
import { Mesh } from "three";

interface CubeGeoProps {
  position: [number, number, number];
  size: [number, number, number];
  color: string;
  number: string | number;
}

const CubeGeo: React.FC<CubeGeoProps> = ({ position, size, color, number }) => {

  const meshRef = useRef<Mesh>(null);

  useFrame(() => {
    if (!meshRef.current){
      return;
    }
    meshRef.current.rotation.x += 0.01;
    meshRef.current.rotation.y += 0.01;
  });

  return(
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={size}/>
      <meshStandardMaterial color={color}/>
      <Text 
        position={[0, 0, size[2] / 2 + 0.01]}
        color="white"
        fontSize={0.5}
        anchorX="center"
        anchorY="middle"
      >
        {number}
      </Text>
    </mesh>
  )
}

export default function Dice(){
  return (
    <section className={styles.container}>
      <Canvas>
        <directionalLight 
          position={[0,0,0]}
          intensity={10}
        />
        <ambientLight />
        <pointLight position={[10, 10, 10]}/>
        <CubeGeo position={[0,1,0]} color={"green"} size={[1,1,1]} number={1}/>
      </Canvas>
    </section>
  )
}