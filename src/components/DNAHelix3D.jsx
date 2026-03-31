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
  const backboneDensity = 6000;
  const totalRungs = 60; // 밀도 추가 상향 (약 60개)

  const interactiveRungs = [
    { id: 'BIO', yIndex: 12, color: '#2ECC71' },
    { id: 'MUSIC', yIndex: 20, color: '#A569BD' },
    { id: 'MENTAL', yIndex: 28, color: '#EC4899' },
    { id: 'DATA/QA', yIndex: 36, color: '#0EA5E9' }
  ];

  // 더 세련된 테크니컬 필러 컬러 팔레트
  const fillerColors = ['#94a3b8'];

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

  const backbonePositions = useMemo(() => {
    const posA = new Float32Array(backboneDensity * 3);
    const posB = new Float32Array(backboneDensity * 3);
    for (let i = 0; i < backboneDensity; i++) {
      const t = (i / backboneDensity) * height - height / 2;
      const phi = ((t + height / 2) / wavelength) * 2 * Math.PI;
      const jitter = 0.1;
      posA[i * 3] = amplitude * Math.sin(phi) + (Math.random() - 0.5) * jitter;
      posA[i * 3 + 1] = t + (Math.random() - 0.5) * jitter;
      posA[i * 3 + 2] = amplitude * Math.cos(phi) + (Math.random() - 0.5) * jitter;
      posB[i * 3] = amplitude * Math.sin(phi + Math.PI) + (Math.random() - 0.5) * jitter;
      posB[i * 3 + 1] = t + (Math.random() - 0.5) * jitter;
      posB[i * 3 + 2] = amplitude * Math.cos(phi + Math.PI) + (Math.random() - 0.5) * jitter;
    }
    return { posA, posB };
  }, [backboneDensity, height, wavelength, amplitude]);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.scale.lerp(new THREE.Vector3(targetScale.current, targetScale.current, targetScale.current), delta * 4);
      groupRef.current.rotation.y = time * 0.32;
      groupRef.current.position.y = Math.sin(time * 0.4) * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      <Points positions={backbonePositions.posA} stride={3}>
        <PointMaterial transparent color="#1e293b" size={0.06} sizeAttenuation={true} depthWrite={false} opacity={targetOpacity.current * 0.45} />
      </Points>
      <Points positions={backbonePositions.posB} stride={3}>
        <PointMaterial transparent color="#1e293b" size={0.06} sizeAttenuation={true} depthWrite={false} opacity={targetOpacity.current * 0.45} />
      </Points>

      {Array.from({ length: totalRungs }).map((_, i) => {
        // 인터랙티브 노드 간격(8)의 절반인 4단위로 노드 배치 (i: 0, 4, 8, 12, 16, 20, 24...)
        if ((i - 4) % 4 !== 0) return null;

        const y = (i / totalRungs) * height - height / 2;
        const phi = ((y + height / 2) / wavelength) * 2 * Math.PI;
        const interaction = interactiveRungs.find(r => Math.abs(r.yIndex - i) < 0.5);
        const fixedFillerColor = fillerColors[0];

        return (
          <RungSolidLine
            key={i}
            y={y}
            phi={phi}
            amplitude={amplitude}
            metadata={interaction}
            color={interaction ? interaction.color : fixedFillerColor}
            isHovered={interaction ? hoveredRung === interaction.id : false}
            onHover={setHoveredRung}
            onSelect={onSelect}
            targetOpacity={targetOpacity.current}
            isInteractive={!!interaction}
          />
        );
      })}
    </group>
  );
};

const RungSolidLine = ({ y, phi, amplitude, metadata, color, isHovered, onHover, onSelect, targetOpacity, isInteractive }) => {
  const p1 = new THREE.Vector3(amplitude * Math.sin(phi), y, amplitude * Math.cos(phi));
  const p2 = new THREE.Vector3(amplitude * Math.sin(phi + Math.PI), y, amplitude * Math.cos(phi + Math.PI));
  const mid = new THREE.Vector3().lerpVectors(p1, p2, 0.5);
  const dir = new THREE.Vector3().subVectors(p1, p2).normalize();
  const quaternion = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);

  const gap = isHovered ? 0.05 : 0.65;
  const lineOpacity = isInteractive ? targetOpacity : targetOpacity * 0.5;
  const lineWidth = isInteractive ? (isHovered ? 0.08 : 0.04) : 0.03;

  return (
    <group
      onPointerOver={() => isInteractive && onHover(metadata.id)}
      onPointerOut={() => isInteractive && onHover(null)}
      onClick={() => isInteractive && onSelect(metadata.id)}
    >
      {isInteractive && (
        <mesh position={mid} quaternion={quaternion}>
          <cylinderGeometry args={[0.7, 0.7, amplitude * 2.5, 8]} />
          <meshBasicMaterial transparent opacity={0} depthWrite={false} />
        </mesh>
      )}

      <group position={mid} quaternion={quaternion}>
        {/* p1 방향 메쉬 (텍스트 쪽): 형광색 적용 및 인터랙티브 전용 굵기 유지 */}
        <mesh position={[0, (gap / 2 + (amplitude - gap / 2) / 2), 0]}>
          <cylinderGeometry args={[lineWidth, lineWidth, (amplitude - gap / 2), 8]} />
          <meshStandardMaterial
            color={color}
            transparent
            opacity={lineOpacity}
            emissive={color}
            emissiveIntensity={isInteractive ? 0.5 : 0}
          />
        </mesh>
        {/* p2 방향 메쉬 (반대쪽): 항상 회색 적용 및 배경 노드와 동일한 굵기(0.03) 적용 */}
        <mesh position={[0, -(gap / 2 + (amplitude - gap / 2) / 2), 0]}>
          <cylinderGeometry args={[0.03, 0.03, (amplitude - gap / 2), 8]} />
          <meshStandardMaterial
            color={isInteractive ? "#94a3b8" : color}
            transparent
            opacity={isInteractive ? targetOpacity * 0.5 : lineOpacity}
            emissive="#94a3b8"
            emissiveIntensity={0}
          />
        </mesh>
      </group>

      {isInteractive && (
        <Billboard position={[amplitude * Math.sin(phi) * 1.8, y, amplitude * Math.cos(phi) * 1.8]}>
          <Text
            fontSize={0.8}
            color={color}
            anchorX="center"
            anchorY="middle"
            scale={isHovered ? 1.4 : 1}
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

