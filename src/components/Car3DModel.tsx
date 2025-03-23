
import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { Group } from 'three';

interface Car3DModelProps {
  color?: string;
  rotationSpeed?: number;
  position?: [number, number, number];
  scale?: [number, number, number];
  modelPath?: string;
}

export function Car3DModel({ 
  color = '#BFBFBF', 
  rotationSpeed = 0.003,
  position = [0, 0, 0],
  scale = [1, 1, 1],
  modelPath = '/porsche_911_gt3_rs.glb'
}: Car3DModelProps) {
  const group = useRef<Group>(null);
  const [hovered, setHovered] = useState(false);
  
  // Load the 3D model
  const { scene } = useGLTF(modelPath);
  
  // Clone the scene to avoid modifying the cached original
  const model = scene.clone();
  
  // Find all meshes in the model and apply the color if they're part of the car body
  if (model) {
    model.traverse((child: any) => {
      // Apply color to specific parts that should change color (like the car body)
      // You might need to adjust this based on your specific model's structure
      if (child.isMesh && child.material && 
         (child.name.includes('body') || child.name.includes('Body') || child.name.includes('exterior'))) {
        child.material.color.set(color);
      }
    });
  }
  
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
      {/* If we have a real model, use it */}
      {model && <primitive object={model} scale={hovered ? 1.03 : 1} />}
      
      {/* Fallback if model fails to load */}
      {!model && (
        <>
          {/* Car body */}
          <mesh position={[0, 0, 0]} scale={hovered ? [1.03, 1.03, 1.03] : [1, 1, 1]}>
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
        </>
      )}
    </group>
  );
}

// Pre-load the model
useGLTF.preload('/porsche_911_gt3_rs.glb');

export default Car3DModel;
