import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Hammer() {
  const groupRef = useRef();
  const hammerHeadRef = useRef();

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    
    // The container is 300vh. 
    // Scroll progress is mapped from 0 to 2*window.innerHeight.
    const scrollY = window.scrollY;
    const maxScroll = window.innerHeight * 2;
    const offset = Math.min(Math.max(scrollY / maxScroll, 0), 1);
    
    // Smooth the transform for premium feel
    const targetZ = THREE.MathUtils.lerp(-15, 6, offset);
    const targetY = THREE.MathUtils.lerp(-3, 0, offset);
    
    // Rotation: starts at an angle, rotates powerfully towards the user
    const targetRotX = THREE.MathUtils.lerp(Math.PI / 4, Math.PI / 2, offset);
    const targetRotY = THREE.MathUtils.lerp(0, Math.PI * 2, offset);

    groupRef.current.position.z = THREE.MathUtils.damp(groupRef.current.position.z, targetZ, 5, delta);
    groupRef.current.position.y = THREE.MathUtils.damp(groupRef.current.position.y, targetY, 5, delta);
    
    groupRef.current.rotation.x = THREE.MathUtils.damp(groupRef.current.rotation.x, targetRotX, 5, delta);
    
    // Base continuous rotation + scroll rotation
    const time = state.clock.getElapsedTime();
    groupRef.current.rotation.y = time * 0.15 + targetRotY;

    // Glowing core pulsing
    if (hammerHeadRef.current) {
      const pulse = (Math.sin(time * 3) + 1) / 2; // 0 to 1
      hammerHeadRef.current.material.color.setRGB(1 + pulse * 2, 3 + pulse * 4, 8 + pulse * 10);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Hammer Head - Premium Dark Metal */}
      <mesh position={[0, 1.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.8, 0.9, 0.9]} />
        <meshPhysicalMaterial 
          color="#1a1a1a" 
          metalness={1} 
          roughness={0.15} 
          clearcoat={1} 
          clearcoatRoughness={0.1}
          envMapIntensity={2}
        />
      </mesh>
      
      {/* Detailed Bevels / Inner Core */}
      <mesh position={[0, 1.5, 0]}>
        <boxGeometry args={[1.82, 0.1, 0.92]} />
        <meshPhysicalMaterial 
          color="#0f0f0f"
          metalness={0.9}
          roughness={0.5}
        />
      </mesh>

      {/* Glowing Energy Core */}
      <mesh position={[0, 1.5, 0]} ref={hammerHeadRef}>
        <boxGeometry args={[1.85, 0.02, 0.95]} />
        <meshBasicMaterial color={[1, 3, 8]} toneMapped={false} />
      </mesh>

      {/* Hammer Handle - Textured Metal / Carbon */}
      <mesh position={[0, -0.7, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.12, 0.1, 3.5, 32]} />
        <meshPhysicalMaterial 
          color="#0a0a0a" 
          metalness={0.8} 
          roughness={0.6}
        />
      </mesh>

      {/* Handle Base/Pommel */}
      <mesh position={[0, -2.45, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.18, 0.18, 0.2, 32]} />
        <meshPhysicalMaterial 
          color="#222" 
          metalness={1} 
          roughness={0.2}
        />
      </mesh>
    </group>
  );
}
