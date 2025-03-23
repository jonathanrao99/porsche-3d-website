
import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';

interface Car3DModelProps {
  color?: string;
  rotationSpeed?: number;
  position?: [number, number, number];
  scale?: [number, number, number];
  modelPath?: string; // Keeping this prop for future use when real models are added
}

export function Car3DModel({ 
  color = '#BFBFBF', 
  rotationSpeed = 0.003,
  position = [0, 0, 0],
  scale = [1, 1, 1],
  modelPath = '/wheel.glb' // This will be used in the future
}: Car3DModelProps) {
  const group = useRef<Group>(null);
  const [hovered, setHovered] = useState(false);
  
  // Animate the car rotation
  useFrame(() => {
    if (group.current) {
      group.current.rotation.y += rotationSpeed;
    }
  });

  return (
    <group 
      ref={group} 
      position={position} 
      scale={hovered ? [scale[0] * 1.03, scale[1] * 1.03, scale[2] * 1.03] : scale}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Car body - main chassis */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[4, 1, 2]} />
        <meshStandardMaterial color={color} metalness={0.6} roughness={0.1} />
      </mesh>
      
      {/* Roof */}
      <mesh position={[0, 0.8, 0]}>
        <boxGeometry args={[2.5, 0.6, 1.8]} />
        <meshStandardMaterial color={color} metalness={0.6} roughness={0.1} />
      </mesh>
      
      {/* Hood */}
      <mesh position={[1.8, 0.2, 0]}>
        <boxGeometry args={[0.5, 0.4, 1.8]} />
        <meshStandardMaterial color={color} metalness={0.6} roughness={0.1} />
      </mesh>
      
      {/* Trunk */}
      <mesh position={[-1.8, 0.2, 0]}>
        <boxGeometry args={[0.5, 0.4, 1.8]} />
        <meshStandardMaterial color={color} metalness={0.6} roughness={0.1} />
      </mesh>
      
      {/* Wheels */}
      <mesh position={[1.5, -0.5, 1]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 0.3, 32]} />
        <meshStandardMaterial color="black" />
      </mesh>
      
      <mesh position={[1.5, -0.5, -1]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 0.3, 32]} />
        <meshStandardMaterial color="black" />
      </mesh>
      
      <mesh position={[-1.5, -0.5, 1]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 0.3, 32]} />
        <meshStandardMaterial color="black" />
      </mesh>
      
      <mesh position={[-1.5, -0.5, -1]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 0.3, 32]} />
        <meshStandardMaterial color="black" />
      </mesh>
      
      {/* Windows */}
      <mesh position={[0.5, 1, 0]}>
        <boxGeometry args={[1.5, 0.5, 1.7]} />
        <meshStandardMaterial color="#333" transparent opacity={0.5} />
      </mesh>
      
      {/* Headlights */}
      <mesh position={[2.01, 0.3, 0.6]}>
        <boxGeometry args={[0.1, 0.3, 0.4]} />
        <meshStandardMaterial color="white" emissive="white" emissiveIntensity={0.5} />
      </mesh>
      
      <mesh position={[2.01, 0.3, -0.6]}>
        <boxGeometry args={[0.1, 0.3, 0.4]} />
        <meshStandardMaterial color="white" emissive="white" emissiveIntensity={0.5} />
      </mesh>
      
      {/* Taillights */}
      <mesh position={[-2.01, 0.3, 0.6]}>
        <boxGeometry args={[0.1, 0.3, 0.4]} />
        <meshStandardMaterial color="red" emissive="red" emissiveIntensity={0.5} />
      </mesh>
      
      <mesh position={[-2.01, 0.3, -0.6]}>
        <boxGeometry args={[0.1, 0.3, 0.4]} />
        <meshStandardMaterial color="red" emissive="red" emissiveIntensity={0.5} />
      </mesh>
      
      {/* Spoiler - for the GT3 RS */}
      <mesh position={[-1.9, 1.1, 0]}>
        <boxGeometry args={[0.3, 0.5, 1.6]} />
        <meshStandardMaterial color="#222" metalness={0.5} roughness={0.2} />
      </mesh>
    </group>
  );
}

export default Car3DModel;
