import styles from './styles.module.css';

import numero1 from "../../assets/SideDice/numero-1.png";
import numero2 from "../../assets/SideDice/numero-2.png";
import numero3 from "../../assets/SideDice/numero-3.png";
import numero4 from "../../assets/SideDice/numero-4.png";
import numero5 from "../../assets/SideDice/numero-5.png";
import numero6 from "../../assets/SideDice/numero-6.png";

import { useRef } from "react";
import { Canvas } from '@react-three/fiber';
import { useFrame } from '@react-three/fiber';
import { useLoader } from '@react-three/fiber';
import { Mesh, TextureLoader } from "three";

interface CubeGeoProps {
  position: [number, number, number];
  size: [number, number, number];
}

const CubeGeo: React.FC<CubeGeoProps> = ({ position, size }) => {
  const meshRef = useRef<Mesh>(null);

  const textures = [
    useLoader(TextureLoader, numero1),
    useLoader(TextureLoader, numero2),
    useLoader(TextureLoader, numero3),
    useLoader(TextureLoader, numero4),
    useLoader(TextureLoader, numero5),
    useLoader(TextureLoader, numero6),
  ];

  console.log('Textures:', textures);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.05;
      meshRef.current.rotation.y += 0.05;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
    <boxGeometry attach="geometry" args={size} />
    {[0, 1, 2, 3, 4, 5].map((index) => (
      <meshStandardMaterial key={index} map={textures[index]} attach={`material-${index}`} />
    ))}
  </mesh>
  );
};


export default function Dice() {
  return (
    <section className={styles.container}>
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <CubeGeo position={[0, 1, 0]} size={[1, 1, 1]} />
      </Canvas>
    </section>
  );
}
