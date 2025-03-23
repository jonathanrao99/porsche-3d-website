
import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group, MeshStandardMaterial } from 'three';

interface Car3DModelProps {
  color?: string;
  rotationSpeed?: number;
  position?: [number, number, number];
  scale?: [number, number, number];
}

export function Car3DModel({ 
  color = '#BFBFBF', 
  rotationSpeed = 0.003,
  position = [0, 0, 0],
  scale = [1, 1, 1]
}: Car3DModelProps) {
  const group = useRef<Group>(null);
  const [hovered, setHovered] = useState(false);
  
  // Create a material that can be updated with the selected color
  const material = new MeshStandardMaterial({
    color: color,
    metalness: 0.6,
    roughness: 0.1,
  });

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
      scale={scale}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Car body */}
      <mesh 
        position={[0, 0, 0]} 
        material={material}
        scale={hovered ? [1.03, 1.03, 1.03] : [1, 1, 1]}
      >
        <boxGeometry args={[4, 1, 2]} />
      </mesh>
      
      {/* Roof */}
      <mesh position={[0, 0.8, 0]} material={material}>
        <boxGeometry args={[2.5, 0.6, 1.8]} />
      </mesh>
      
      {/* Hood */}
      <mesh position={[1.8, 0.2, 0]} material={material}>
        <boxGeometry args={[0.5, 0.4, 1.8]} />
      </mesh>
      
      {/* Trunk */}
      <mesh position={[-1.8, 0.2, 0]} material={material}>
        <boxGeometry args={[0.5, 0.4, 1.8]} />
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
    </group>
  );
}

export default Car3DModel;
