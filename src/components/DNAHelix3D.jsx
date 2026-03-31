import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera, Points, PointMaterial, Text, Billboard } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

const DNAHelix3D = ({ onSelect, transitionPhase = 'idle' }) => {
  return (
    <div className="w-full h-full relative bg-transparent flex items-center justify-center">
      <Canvas 
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, logarithmicDepthBuffer: true }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 24]} fov={45} />
        <ambientLight intensity={1.5} />
        <pointLight position={[10, 10, 20]} intensity={3} />
        
        <DNAStructure onSelect={onSelect} transitionPhase={transitionPhase} />
        
        <EffectComposer disableNormalPass multisampling={4}>
          <Bloom 
            intensity={transitionPhase === 'focus' ? 2.5 : 1.0} 
            luminanceThreshold={0.8} 
            luminanceSmoothing={0.1} 
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
  const amplitude = 3.6;
  const height = 18;
  const backboneDensity = 6000; // 가닥당 파티클 수

  const interactiveRungs = [
    { id: 'BIO', yIndex: 14, color: '#2ECC71' },
    { id: 'MUSIC', yIndex: 18, color: '#A569BD' },
    { id: 'MENTAL', yIndex: 22, color: '#EC4899' },
    { id: 'DATA/QA', yIndex: 26, color: '#0EA5E9' }
  ];

  const targetScale = useRef(1);
  const targetOpacity = useRef(1);

  useEffect(() => {
    if (transitionPhase === 'focus') {
      targetScale.current = 1.6;
      targetOpacity.current = 1;
    } else if (transitionPhase === 'shrink') {
      targetScale.current = 0.22;
      targetOpacity.current = 0.1;
    } else {
      targetScale.current = 1;
      targetOpacity.current = 1;
    }
  }, [transitionPhase]);

  // Backbone 파티클 데이터 생성
  const backbonePositions = useMemo(() => {
    const posA = new Float32Array(backboneDensity * 3);
    const posB = new Float32Array(backboneDensity * 3);
    
    for (let i = 0; i < backboneDensity; i++) {
        const t = (i / backboneDensity) * height - height / 2;
        const phi = ((t + height / 2) / wavelength) * 2 * Math.PI;
        
        // 미세한 노이즈(Jitter) 추가
        const jitter = 0.12;
        const nx = (Math.random() - 0.5) * jitter;
        const ny = (Math.random() - 0.5) * jitter;
        const nz = (Math.random() - 0.5) * jitter;

        // Strand A
        posA[i * 3] = amplitude * Math.sin(phi) + nx;
        posA[i * 3 + 1] = t + ny;
        posA[i * 3 + 2] = amplitude * Math.cos(phi) + nz;

        // Strand B (Offset by PI)
        posB[i * 3] = amplitude * Math.sin(phi + Math.PI) + nx;
        posB[i * 3 + 1] = t + ny;
        posB[i * 3 + 2] = amplitude * Math.cos(phi + Math.PI) + nz;
    }
    return { posA, posB };
  }, [backboneDensity, height, wavelength, amplitude]);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.scale.lerp(new THREE.Vector3(targetScale.current, targetScale.current, targetScale.current), delta * 4);
      groupRef.current.rotation.y = time * 0.35;
      groupRef.current.position.y = Math.sin(time * 0.4) * 0.25;
    }
  });

  return (
    <group ref={groupRef}>
      {/* 1. Precise Particle Strands (Dark on Light) */}
      <Points positions={backbonePositions.posA} stride={3}>
        <PointMaterial 
          transparent 
          color="#1e293b" 
          size={0.06} 
          sizeAttenuation={true} 
          depthWrite={false} 
          opacity={targetOpacity.current * 0.4}
        />
      </Points>
      <Points positions={backbonePositions.posB} stride={3}>
        <PointMaterial 
          transparent 
          color="#1e293b" 
          size={0.06} 
          sizeAttenuation={true} 
          depthWrite={false} 
          opacity={targetOpacity.current * 0.4}
        />
      </Points>

      {/* 2. Interactive Rungs (Swarms + Invisible Hitboxes) */}
      {interactiveRungs.map((rung, i) => {
        const y = (rung.yIndex / 38) * height - height / 2;
        const phi = ((y + height / 2) / wavelength) * 2 * Math.PI;
        
        return (
          <RungParticleSwarm 
            key={rung.id}
            y={y}
            phi={phi}
            amplitude={amplitude}
            metadata={rung}
            isHovered={hoveredRung === rung.id}
            onHover={setHoveredRung}
            onSelect={onSelect}
            targetOpacity={targetOpacity.current}
          />
        );
      })}

      {/* 3. Static/Filler Rungs (Light Gray Particles) */}
      {Array.from({ length: 30 }).map((_, i) => {
        if ([14, 18, 22, 26].some(idx => Math.abs(idx - i*1.2) < 1)) return null;
        const y = (i / 30) * height - height / 2;
        const phi = ((y + height / 2) / wavelength) * 2 * Math.PI;
        return (
          <StaticRungParticles 
            key={i} 
            y={y} 
            phi={phi} 
            amplitude={amplitude} 
            targetOpacity={targetOpacity.current} 
          />
        );
      })}
    </group>
  );
};

const RungParticleSwarm = ({ y, phi, amplitude, metadata, isHovered, onHover, onSelect, targetOpacity }) => {
  const particleCount = isHovered ? 450 : 180;
  const gap = isHovered ? 0.05 : 0.6;
  
  const positions = useMemo(() => {
    const p = new Float32Array(particleCount * 3);
    const p1 = new THREE.Vector3(amplitude * Math.sin(phi), y, amplitude * Math.cos(phi));
    const p2 = new THREE.Vector3(amplitude * Math.sin(phi + Math.PI), y, amplitude * Math.cos(phi + Math.PI));
    
    for (let i = 0; i < particleCount; i++) {
        const t = Math.random();
        const side = Math.random() > 0.5 ? 1 : -1;
        const offset = (gap/2 + (amplitude - gap/2) * t) * side;
        
        const mid = new THREE.Vector3().lerpVectors(p1, p2, 0.5);
        const dir = new THREE.Vector3().subVectors(p1, p2).normalize();
        
        const jitter = isHovered ? 0.25 : 0.12;
        p[i * 3] = mid.x + offset * dir.x + (Math.random() - 0.5) * jitter;
        p[i * 3 + 1] = mid.y + offset * dir.y + (Math.random() - 0.5) * jitter;
        p[i * 3 + 2] = mid.z + offset * dir.z + (Math.random() - 0.5) * jitter;
    }
    return p;
  }, [particleCount, isHovered, gap, amplitude, phi, y]);

  // Hitbox parameters
  const p1 = new THREE.Vector3(amplitude * Math.sin(phi), y, amplitude * Math.cos(phi));
  const p2 = new THREE.Vector3(amplitude * Math.sin(phi + Math.PI), y, amplitude * Math.cos(phi + Math.PI));
  const mid = new THREE.Vector3().lerpVectors(p1, p2, 0.5);
  const dir = new THREE.Vector3().subVectors(p1, p2).normalize();
  const quaternion = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);

  return (
    <group
      onPointerOver={() => onHover(metadata.id)}
      onPointerOut={() => onHover(null)}
      onClick={() => onSelect(metadata.id)}
    >
      {/* Invisible Hitbox for easier raycasting */}
      <mesh position={mid} quaternion={quaternion}>
        <cylinderGeometry args={[0.5, 0.5, amplitude * 2, 8]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      <Points positions={positions} stride={3}>
        <PointMaterial 
          transparent 
          color={metadata.color} 
          size={isHovered ? 0.14 : 0.09} 
          sizeAttenuation={true} 
          depthWrite={false} 
          opacity={targetOpacity * 0.9} 
        />
      </Points>

      <Billboard position={[amplitude * Math.sin(phi) * 1.6, y, amplitude * Math.cos(phi) * 1.6]}>
        <Text
          fontSize={0.65}
          color={metadata.color}
          anchorX="center"
          anchorY="middle"
          scale={isHovered ? 1.6 : 1}
          fillOpacity={targetOpacity}
        >
          {metadata.id}
        </Text>
      </Billboard>
    </group>
  );
};

const StaticRungParticles = ({ y, phi, amplitude, targetOpacity }) => {
  const positions = useMemo(() => {
    const count = 40;
    const p = new Float32Array(count * 3);
    const p1 = new THREE.Vector3(amplitude * Math.sin(phi), y, amplitude * Math.cos(phi));
    const p2 = new THREE.Vector3(amplitude * Math.sin(phi + Math.PI), y, amplitude * Math.cos(phi + Math.PI));
    
    for (let i = 0; i < count; i++) {
        const t = Math.random();
        const pos = new THREE.Vector3().lerpVectors(p1, p2, t);
        // 중앙 갭 유지
        if (t > 0.45 && t < 0.55) {
            pos.y += 100; // 화면 밖으로
        }
        p[i * 3] = pos.x;
        p[i * 3 + 1] = pos.y;
        p[i * 3 + 2] = pos.z;
    }
    return p;
  }, [y, phi, amplitude]);

  return (
    <Points positions={positions} stride={3}>
      <PointMaterial 
        transparent 
        color="#cbd5e1" 
        size={0.04} 
        sizeAttenuation={true} 
        depthWrite={false} 
        opacity={targetOpacity * 0.6} 
      />
    </Points>
  );
};

const BackgroundParticles = ({ transitionPhase }) => {
  const points = useMemo(() => {
    const count = 1200;
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        p[i * 3] = (Math.random() - 0.5) * 60;
        p[i * 3 + 1] = (Math.random() - 0.5) * 60;
        p[i * 3 + 2] = (Math.random() - 0.5) * 60;
    }
    return p;
  }, []);

  return (
    <Points positions={points}>
      <PointMaterial 
        transparent 
        color="#cbd5e1" 
        size={0.05} 
        sizeAttenuation={true} 
        depthWrite={false} 
        opacity={transitionPhase === 'shrink' ? 0.1 : 0.3} 
      />
    </Points>
  );
};

export default DNAHelix3D;

