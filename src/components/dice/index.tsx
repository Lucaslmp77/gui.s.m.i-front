import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Mesh} from "three";

interface MyBoxProps {
  position: [number, number, number];
  handleClick: () => void;
}

const MyBox: React.FC<MyBoxProps> = ({ position, handleClick }) => {
  const boxRef = useRef<Mesh>(null);

  useFrame(() => {
    if (boxRef.current) {
      boxRef.current.rotation.x += 0.01;
      boxRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh
      ref={boxRef}
      position={position}
      onClick={handleClick}
    >
      <boxGeometry args={[2, 2, 2]} />
      <meshBasicMaterial attach="material" color={0x00ff00} />
    </mesh>
  );
};

const Dice = () => {
  const [falling, setFalling] = useState(true);
  const [positionDice, setPositionDice] = useState<[number, number, number]>([0, 1, 0]);

  const handleBoxClick = () => {
    setFalling(true);
  };

  useFrame(({ clock }) => {
    if (falling) {
      const delta = clock.getDelta();
      const gravity = 9.8;
      const speedY = gravity * delta;
      let newPositionY = positionDice[1] - speedY;
  
      if (newPositionY <= 1) {
        setFalling(false);
        newPositionY = 1;
      }
  
      setPositionDice([positionDice[0], newPositionY, positionDice[2]]);
    }
  });
  

  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} />
      <MyBox position={positionDice} handleClick={handleBoxClick} />
    </Canvas>
  );
};

export default Dice;
