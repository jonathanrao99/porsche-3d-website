
import { useRef, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';

export function Car3DModel({ rotationSpeed = 0.003, ...props }) {
  const group = useRef<Group>(null);
  // Note: This URL should be replaced with an actual Porsche GT3 RS GLTF model URL
  const { scene, nodes, materials } = useGLTF('/porsche_911_gt3_rs.glb');

  // Handle loading errors gracefully
  useEffect(() => {
    console.log("3D Model loaded:", scene);
    return () => {
      // Clean up resources when component unmounts
    };
  }, [scene]);

  // Animate the car rotation
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y += rotationSpeed;
    }
  });

  return (
    <group ref={group} {...props} dispose={null}>
      <primitive object={scene} scale={1.5} position={[0, -1, 0]} />
    </group>
  );
}

// Preload the model for better performance
useGLTF.preload('/porsche_911_gt3_rs.glb');

export default Car3DModel;
