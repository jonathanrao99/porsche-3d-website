
import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { Group, Mesh } from 'three';

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
  const [modelLoaded, setModelLoaded] = useState(false);
  const [modelError, setModelError] = useState(false);
  
  // Attempt to load the 3D model with error handling
  let model: any;
  try {
    const { scene } = useGLTF(modelPath);
    model = scene.clone();
    
    // Update material colors for any meshes in the model
    if (model && !modelError) {
      model.traverse((child: any) => {
        if (child.isMesh && child.material && 
          (child.name.includes('body') || child.name.includes('Body') || child.name.includes('exterior'))) {
          child.material.color.set(color);
        }
      });
    }

    useEffect(() => {
      setModelLoaded(true);
    }, []);
  } catch (error) {
    console.error("Error loading 3D model:", error);
    setModelError(true);
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
      scale={hovered ? [scale[0] * 1.03, scale[1] * 1.03, scale[2] * 1.03] : scale}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Render the model if successfully loaded */}
      {model && !modelError && <primitive object={model} />}
      
      {/* Fallback car representation using primitives when model fails to load */}
      {(!model || modelError) && (
        <>
          {/* Car body */}
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
        </>
      )}
    </group>
  );
}

export default Car3DModel;
