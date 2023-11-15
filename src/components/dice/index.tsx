import styles from './styles.module.css';

import { useRef } from "react";
import { Canvas, useFrame } from "react-three-fiber";
import { Mesh } from "three";
import { color } from 'three/examples/jsm/nodes/Nodes.js';

function Cube({position, size, color}){

  const meshRef = useRef<Mesh>(null);

  useFrame(() => {
    if (!meshRef.current){
      return;
    }

    meshRef.current.rotation.x += 0.01;
    meshRef.current.rotation.y += 0.01;

  });
  return(
    <mesh 
      ref={meshRef}
      position={position}
      >
      <boxGeometry args={size}/>
      <meshStandardMaterial color={color}/>
    </mesh>
  )
}

export default function Dice(){
  return (
    <section className={styles.container}>
      <Canvas>
        <directionalLight position={[0,5,0]}/>
        <ambientLight />
        <pointLight position={[10, 10, 10]}/>
        <Cube position={[1,2,0]} color={"green"} size={[1,1,1]}/>
        <Cube position={[-1,2,0]} color={"green"} size={[1,1,1]}/>
        <Cube position={[-1,0,0]} color={"green"} size={[1,1,1]}/>
        <Cube position={[1,0,0]} color={"green"} size={[1,1,1]}/>
      </Canvas>
    </section>
  )
}