import React from 'react';
import { Environment, Float, Sparkles, BakeShadows } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import Hammer from './Hammer';

export default function Scene() {
  return (
    <>
      <ambientLight intensity={0.2} />
      
      {/* Cinematic spot lighting */}
      <spotLight 
        position={[10, 10, 10]} 
        angle={0.15} 
        penumbra={1} 
        intensity={2} 
        castShadow 
        color="#ffffff"
      />
      <spotLight 
        position={[-10, -10, -10]} 
        angle={0.15} 
        penumbra={1} 
        intensity={4} 
        color="#4488ff" 
      />

      {/* Environmental reflections are crucial for the premium metallic look */}
      <Environment preset="city" />

      {/* Subtle organic floating motion */}
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <Hammer />
      </Float>

      {/* Cinematic dust particles */}
      <Sparkles 
        count={200} 
        scale={15} 
        size={1.5} 
        speed={0.2} 
        opacity={0.15} 
        color="#88bfff" 
      />

      {/* Post-processing: Bloom for glowing elements, Vignette for moody cinematic edges */}
      <EffectComposer disableNormalPass multisampling={0}>
        <Bloom luminanceThreshold={1} mipmapBlur intensity={1.5} />
        <Vignette eskil={false} offset={0.1} darkness={1.2} />
      </EffectComposer>
    </>
  );
}
