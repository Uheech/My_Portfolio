import React, { useState, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Points, PointMaterial, Text, Float, Billboard, Cylinder } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

const DNAHelix3D = ({ onSelect }) => {
  return (
    <div style={{ width: '800px', height: '100vh' }} className="relative bg-transparent flex items-center justify-center">
      <Canvas 
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 22]} fov={45} />
        <ambientLight intensity={1.5} />
        <pointLight position={[10, 10, 20]} intensity={2.5} />
        
        <DNAStructure onSelect={onSelect} />
        
        <EffectComposer disableNormalPass multisampling={4}>
          <Bloom 
            intensity={1.5} 
            luminanceThreshold={0.1} 
            luminanceSmoothing={1.0} 
            mipmapBlur
          />
        </EffectComposer>

        <BackgroundParticles />
      </Canvas>
    </div>
  );
};

const DNAStructure = ({ onSelect }) => {
  const groupRef = useRef();
  const [hoveredRung, setHoveredRung] = useState(null);

  const wavelength = 8;
  const amplitude = 3;
  const rungCount = 38;
  const height = 18;

  const interactiveRungs = {
    14: { id: 'BIO', color: '#39FF14' },
    18: { id: 'MUSIC', color: '#BF00FF' },
    22: { id: 'MENTAL', color: '#FF1493' },
    26: { id: 'DATA/QA', color: '#00FFFF' }
  };

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.3;
      groupRef.current.position.y = Math.sin(time * 0.4) * 0.25;
    }
  });

  return (
    <group ref={groupRef}>
      {/* 1. Base Pair Rungs */}
      {Array.from({ length: rungCount }).map((_, i) => {
        const y = (i / rungCount) * height - height / 2;
        const phi = ((y + height / 2) / wavelength) * 2 * Math.PI;
        
        return (
          <Rung3D 
            key={i}
            index={i}
            y={y}
            phi={phi}
            amplitude={amplitude}
            metadata={interactiveRungs[i]}
            isHovered={hoveredRung === i}
            onHover={setHoveredRung}
            onSelect={onSelect}
          />
        );
      })}

      {/* 2. Backbone Strands (Spheres for a dot-matrix blueprint look) */}
      {Array.from({ length: 120 }).map((_, i) => {
        const y = (i / 120) * height - height / 2;
        const phi = ((y + height / 2) / wavelength) * 2 * Math.PI;
        
        return (
          <group key={i}>
            <mesh position={[amplitude * Math.sin(phi), y, amplitude * Math.cos(phi)]}>
              <sphereGeometry args={[0.07, 8, 8]} />
              <meshStandardMaterial color="#000" />
            </mesh>
            <mesh position={[amplitude * Math.sin(phi + Math.PI), y, amplitude * Math.cos(phi + Math.PI)]}>
              <sphereGeometry args={[0.07, 8, 8]} />
              <meshStandardMaterial color="#000" />
            </mesh>
          </group>
        );
      })}
    </group>
  );
};

const Rung3D = ({ index, y, phi, amplitude, metadata, isHovered, onHover, onSelect }) => {
  const gap = isHovered ? 0.05 : 0.6;
  
  // Rung endpoints
  const p1 = new THREE.Vector3(amplitude * Math.sin(phi), y, amplitude * Math.cos(phi));
  const p2 = new THREE.Vector3(amplitude * Math.sin(phi + Math.PI), y, amplitude * Math.cos(phi + Math.PI));
  
  // Calculate orientation for the cylinder
  const midPoint = new THREE.Vector3().lerpVectors(p1, p2, 0.5);
  const direction = new THREE.Vector3().subVectors(p1, p2).normalize();
  
  // Quaternion to rotate the cylinder from [0, 1, 0] to the rung direction
  const quaternion = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction);

  const color = metadata ? metadata.color : "#94a3b8";
  const opacity = metadata ? 1 : 0.4;
  const radius = isHovered ? 0.12 : 0.04;

  return (
    <group
      onPointerOver={(e) => { e.stopPropagation(); if (metadata) onHover(index); }}
      onPointerOut={() => metadata && onHover(null)}
      onClick={() => metadata && onSelect(metadata.id)}
    >
      {/* Left part of the split rung */}
      <mesh 
        position={[
          midPoint.x + (amplitude/2 + gap/2) * direction.x, 
          midPoint.y, 
          midPoint.z + (amplitude/2 + gap/2) * direction.z
        ]} 
        quaternion={quaternion}
      >
        <cylinderGeometry args={[radius, radius, amplitude - gap, 8]} />
        <meshStandardMaterial color={color} transparent opacity={opacity} emissive={color} emissiveIntensity={isHovered ? 2 : 0.2} />
      </mesh>

      {/* Right part of the split rung */}
      <mesh 
        position={[
          midPoint.x - (amplitude/2 + gap/2) * direction.x, 
          midPoint.y, 
          midPoint.z - (amplitude/2 + gap/2) * direction.z
        ]} 
        quaternion={quaternion}
      >
        <cylinderGeometry args={[radius, radius, amplitude - gap, 8]} />
        <meshStandardMaterial color={color} transparent opacity={opacity} emissive={color} emissiveIntensity={isHovered ? 2 : 0.2} />
      </mesh>

      {metadata && (
        <Billboard
          position={[amplitude * Math.sin(phi) + (direction.x * 2), y, amplitude * Math.cos(phi) + (direction.z * 2)]}
          follow={true}
          lockX={false}
          lockY={false}
          lockZ={false}
        >
          <Text
            fontSize={0.6}
            color={color}
            anchorX="center"
            anchorY="middle"
            scale={isHovered ? 1.4 : 1}
          >
            {metadata.id}
          </Text>
        </Billboard>
      )}
    </group>
  );
};

const BackgroundParticles = () => {
  const points = useMemo(() => {
    const p = new Float32Array(1000 * 3);
    for (let i = 0; i < 1000; i++) {
        p[i * 3] = (Math.random() - 0.5) * 40;
        p[i * 3 + 1] = (Math.random() - 0.5) * 40;
        p[i * 3 + 2] = (Math.random() - 0.5) * 40;
    }
    return p;
  }, []);

  return (
    <Points positions={points}>
      <PointMaterial transparent color="#CBD5E1" size={0.04} sizeAttenuation={true} depthWrite={false} opacity={0.2} />
    </Points>
  );
};

export default DNAHelix3D;






