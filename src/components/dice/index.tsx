import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Box } from '@react-three/drei';

const Dice = () => {
  const cubeRef = useRef(null);

  useFrame(() => {
    // Função de animação aqui, se necessário
  });

  return (
    <Box 
        ref={cubeRef} 
        args={[1, 1, 1]} 
        position={[0, 0, 0]}>
      <meshBasicMaterial color={0x00ff00} />
    </Box>
  );
};

const App = () => {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Dice />
    </Canvas>
  );
};

export default App;
