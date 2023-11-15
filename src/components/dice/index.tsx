import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Mesh } from 'three';
import styles from "./styles.module.css";

interface MyBoxProps {
  position: [number, number, number];
  handleClick: () => void;
}

const MyBox: React.FC<MyBoxProps> = ({ position, handleClick }) => {
  const boxRef = useRef<Mesh>(null);

  useFrame(() => {
    if (boxRef.current) {
      boxRef.current.rotation.x += 0.09;
      boxRef.current.rotation.y += 0.09;
    }
  });

  return (
    <mesh ref={boxRef} position={position} onClick={handleClick}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial attach="material" color={0x00ff00} />
    </mesh>
  );
};

const App = () => {
  const [falling, setFalling] = useState(false);
  const [positionDice, setPositionDice] = useState<[number, number, number]>([0, 0, 0]);

  useEffect(() => {
    if (falling) {
      const animationId = requestAnimationFrame(() => {
        const gravity = 1;
        const acceleration = 2;
        const speedY = gravity * acceleration;
        const newPositionY = positionDice[1] - gravity * 0.01 * speedY;

        if (newPositionY <= 1) {
          setFalling(false);
          setPositionDice([positionDice[0], 1, positionDice[2]]);
        } else {
          setPositionDice([positionDice[0], newPositionY, positionDice[2]]);
        }
      });

      return () => cancelAnimationFrame(animationId);
    }
  }, [falling, positionDice]);

  const handleBoxClick = () => {
    if (!falling) {
      setFalling(true);
    }
  };

  return (
    <section className={styles.conteiner}>
      <Canvas>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} />
      <Suspense fallback={null}>
        <MyBox position={positionDice} handleClick={handleBoxClick} />
      </Suspense>
    </Canvas>
    </section>
  );
};

export default App;
