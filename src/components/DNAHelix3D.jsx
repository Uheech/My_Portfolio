import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Points, PointMaterial, Text, Billboard, Cylinder } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

const DNAHelix3D = ({ onSelect, transitionPhase = 'idle' }) => {
  return (
    <div className="w-full h-full relative bg-transparent flex items-center justify-center">
      <Canvas 
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 24]} fov={45} />
        <ambientLight intensity={1.5} />
        <pointLight position={[10, 10, 20]} intensity={2.5} />
        
        <DNAStructure onSelect={onSelect} transitionPhase={transitionPhase} />
        
        <EffectComposer disableNormalPass multisampling={4}>
          <Bloom 
            intensity={transitionPhase === 'focus' ? 3.5 : 1.5} 
            luminanceThreshold={0.1} 
            luminanceSmoothing={1.0} 
            mipmapBlur
          />
        </EffectComposer>

        <BackgroundParticles transitionPhase={transitionPhase} />
      </Canvas>
    </div>
  );
};

const DNAStructure = ({ onSelect, transitionPhase }) => {
  const groupRef = useRef();
  const [hoveredRung, setHoveredRung] = useState(null);

  const wavelength = 8;
  const amplitude = 3.5;
  const rungCount = 38;
  const height = 18;

  const interactiveRungs = {
    14: { id: 'BIO', color: '#39FF14' },
    18: { id: 'MUSIC', color: '#BF00FF' },
    22: { id: 'MENTAL', color: '#FF1493' },
    26: { id: 'DATA/QA', color: '#00FFFF' }
  };

  const targetScale = useRef(1);
  const targetOpacity = useRef(1);

  useEffect(() => {
    if (transitionPhase === 'focus') {
      targetScale.current = 1.6;
      targetOpacity.current = 1;
    } else if (transitionPhase === 'shrink') {
      targetScale.current = 0.25;
      targetOpacity.current = 0.05;
    } else {
      targetScale.current = 1;
      targetOpacity.current = 1;
    }
  }, [transitionPhase]);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      // 부드러운 스케일 및 투명도 전환
      groupRef.current.scale.lerp(new THREE.Vector3(targetScale.current, targetScale.current, targetScale.current), delta * 4);
      
      // 세로 회전 및 부유 애니메이션
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
            targetOpacity={targetOpacity.current}
          />
        );
      })}

      {/* 2. Backbone Strands */}
      {Array.from({ length: 140 }).map((_, i) => {
        const y = (i / 140) * height - height / 2;
        const phi = ((y + height / 2) / wavelength) * 2 * Math.PI;
        
        return (
          <group key={i}>
            <mesh position={[amplitude * Math.sin(phi), y, amplitude * Math.cos(phi)]}>
              <sphereGeometry args={[0.07, 8, 8]} />
              <meshStandardMaterial color="#000" transparent opacity={targetOpacity.current} />
            </mesh>
            <mesh position={[amplitude * Math.sin(phi + Math.PI), y, amplitude * Math.cos(phi + Math.PI)]}>
              <sphereGeometry args={[0.07, 8, 8]} />
              <meshStandardMaterial color="#000" transparent opacity={targetOpacity.current} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
};

const Rung3D = ({ index, y, phi, amplitude, metadata, isHovered, onHover, onSelect, targetOpacity }) => {
  const gap = isHovered ? 0.05 : 0.6;
  
  const p1 = new THREE.Vector3(amplitude * Math.sin(phi), y, amplitude * Math.cos(phi));
  const p2 = new THREE.Vector3(amplitude * Math.sin(phi + Math.PI), y, amplitude * Math.cos(phi + Math.PI));
  
  const midPoint = new THREE.Vector3().lerpVectors(p1, p2, 0.5);
  const direction = new THREE.Vector3().subVectors(p1, p2).normalize();
  const quaternion = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction);

  const color = metadata ? metadata.color : "#94a3b8";
  const opacity = metadata ? targetOpacity : targetOpacity * 0.4;
  const radius = isHovered ? 0.15 : 0.045;

  return (
    <group
      onPointerOver={(e) => { e.stopPropagation(); if (metadata) onHover(index); }}
      onPointerOut={() => metadata && onHover(null)}
      onClick={() => metadata && onSelect(metadata.id)}
    >
      <mesh 
        position={[
          midPoint.x + (gap/2 + (amplitude - gap)/2) * direction.x, 
          midPoint.y, 
          midPoint.z + (gap/2 + (amplitude - gap)/2) * direction.z
        ]} 
        quaternion={quaternion}
      >
        <cylinderGeometry args={[radius, radius, (amplitude - gap), 8]} />
        <meshStandardMaterial 
          color={color} 
          transparent 
          opacity={opacity} 
          emissive={color} 
          emissiveIntensity={isHovered ? 3 : 0.2} 
        />
      </mesh>

      <mesh 
        position={[
          midPoint.x - (gap/2 + (amplitude - gap)/2) * direction.x, 
          midPoint.y, 
          midPoint.z - (gap/2 + (amplitude - gap)/2) * direction.z
        ]} 
        quaternion={quaternion}
      >
        <cylinderGeometry args={[radius, radius, (amplitude - gap), 8]} />
        <meshStandardMaterial 
          color={color} 
          transparent 
          opacity={opacity} 
          emissive={color} 
          emissiveIntensity={isHovered ? 3 : 0.2} 
        />
      </mesh>

      {metadata && (
        <Billboard
          position={[amplitude * Math.sin(phi) + (direction.x * 2.5), y, amplitude * Math.cos(phi) + (direction.z * 2.5)]}
        >
          <Text
            fontSize={0.6}
            color={color}
            anchorX="center"
            anchorY="middle"
            scale={isHovered ? 1.5 : 1}
            fillOpacity={targetOpacity}
          >
            {metadata.id}
          </Text>
        </Billboard>
      )}
    </group>
  );
};

const BackgroundParticles = ({ transitionPhase }) => {
  const points = useMemo(() => {
    const p = new Float32Array(800 * 3);
    for (let i = 0; i < 800; i++) {
        p[i * 3] = (Math.random() - 0.5) * 50;
        p[i * 3 + 1] = (Math.random() - 0.5) * 50;
        p[i * 3 + 2] = (Math.random() - 0.5) * 50;
    }
    return p;
  }, []);

  return (
    <Points positions={points}>
      <PointMaterial 
        transparent 
        color="#CBD5E1" 
        size={0.06} 
        sizeAttenuation={true} 
        depthWrite={false} 
        opacity={transitionPhase === 'shrink' ? 0.05 : 0.2} 
      />
    </Points>
  );
};

export default DNAHelix3D;
