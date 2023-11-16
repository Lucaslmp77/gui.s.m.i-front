  import styles from './styles.module.css';

  import numero1 from "../../assets/SideDice/numero-1.png";
  import numero2 from "../../assets/SideDice/numero-2.png";
  import numero3 from "../../assets/SideDice/numero-3.png";
  import numero4 from "../../assets/SideDice/numero-4.png";
  import numero5 from "../../assets/SideDice/numero-5.png";
  import numero6 from "../../assets/SideDice/numero-6.png";
  import numero7 from "../../assets/SideDice/numero-7.png";
  import numero8 from "../../assets/SideDice/numero-8.png";
  import numero9 from "../../assets/SideDice/numero-9.png";
  import numero10 from "../../assets/SideDice/numero-10.png";
  import numero11 from "../../assets/SideDice/numero-11.png";
  import numero12 from "../../assets/SideDice/numero-12.png";
  import numero13 from "../../assets/SideDice/numero-13.png";
  import numero14 from "../../assets/SideDice/numero-14.png";
  import numero15 from "../../assets/SideDice/numero-15.png";
  import numero16 from "../../assets/SideDice/numero-16.png";
  import numero17 from "../../assets/SideDice/numero-17.png";
  import numero18 from "../../assets/SideDice/numero-18.png";
  import numero19 from "../../assets/SideDice/numero-19.png";
  import numero20 from "../../assets/SideDice/numero-20.png";

  import { useRef } from "react";
  import { Canvas } from '@react-three/fiber';
  import { useFrame } from '@react-three/fiber';
  import { useLoader } from '@react-three/fiber';
  import { Mesh, TextureLoader } from "three";

  interface GeoProps6D {
    position: [number, number, number];
    size: [number, number, number];
  }

  interface GeoProps20D {
    position: [number, number, number];
    size: [number, number];
  }

  const D6 = [1,2,3,4,5,6];
  const D20 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];

  const Cube6D: React.FC<GeoProps6D> = ({ position, size }) => {
    const meshRef = useRef<Mesh>(null);

    const textures = [
      useLoader(TextureLoader, numero1),
      useLoader(TextureLoader, numero2),
      useLoader(TextureLoader, numero3),
      useLoader(TextureLoader, numero4),
      useLoader(TextureLoader, numero5),
      useLoader(TextureLoader, numero6),
    ];

    useFrame(() => {
      if (meshRef.current) {
        meshRef.current.rotation.x += 0.001;
        meshRef.current.rotation.y += 0.001;
      }
    });

    return (
      <mesh ref={meshRef} position={position}>
      <boxGeometry attach="geometry" args={[size[0],size[1],size[2]]} />
      {(D6).map((index) => (
        <meshStandardMaterial 
          key={index} 
          map={textures[index]} 
          attach={`material-${index}`} 
          color={"lightgreen"}/>
      ))}
    </mesh>
    );
  };

  const IcosaHedron20D: React.FC<GeoProps20D> = ({position, size}) => {
    const meshRef = useRef<Mesh>(null);

    const textures = [
      useLoader(TextureLoader, numero1),
      useLoader(TextureLoader, numero2),
      useLoader(TextureLoader, numero3),
      useLoader(TextureLoader, numero4),
      useLoader(TextureLoader, numero5),
      useLoader(TextureLoader, numero6),
    ];

    useFrame(() => {
      if (meshRef.current) {
        meshRef.current.rotation.x += 0.001;
        meshRef.current.rotation.y += 0.001;
      }
    });

    return (
      <mesh ref={meshRef} position={position}>
        <icosahedronGeometry attach="geometry" args={[size[0],size[1]]} />
        {(D20).map((index) => (
          <meshStandardMaterial 
            key={index} 
            map={textures[index]} 
            attach={`material-${index}`} 
            color={"lightorange"}/>
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
          <Cube6D position={[0, 1, 0]} size={[1, 1, 1]} />
          <IcosaHedron20D position={[1, 1, 0]} size={[1, 1]} />
        </Canvas>
      </section>
    );
  }
