import React, { useMemo, useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

/**
 * DNA 노드 라벨 전용 '진짜 가우시안 블러' 텍스트 컴포넌트
 * @param {string} text 표시할 텍스트 (BIO, QA, MUSIC, MENTAL)
 * @param {string} color 텍스트 색상
 * @param {number} blurAmount 블러 강도 (px)
 * @param {number} opacity 투명도 (기본 1.0 유지)
 */
const BlurredText = ({ text, color, blurAmount, opacity = 1.0, scale = 1 }) => {
  const meshRef = useRef();
  
  // 캔버스 및 텍스처 생성 (고해상도 지원)
  const [canvas, texture] = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 256;
    const texture = new THREE.CanvasTexture(canvas);
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    return [canvas, texture];
  }, []);

  const ctx = useMemo(() => canvas.getContext('2d'), [canvas]);

  // 깊이(blurAmount) 변화에 따라 캔버스 다시 그리기
  useEffect(() => {
    if (!ctx) return;

    // 1. 캔버스 초기화
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // 2. 가우시안 블러 필터 적용 (진짜 블러)
    // blurAmount가 0.1보다 작으면 필터를 해제하여 선명도 유지
    ctx.filter = blurAmount > 0.1 ? `blur(${blurAmount}px)` : 'none';
    
    // 3. 텍스트 설정 및 그리기 (중앙 정렬)
    ctx.fillStyle = color;
    // 'black' 대신 표준 '900' 가중치 사용
    ctx.font = `900 120px "JetBrains Mono", "Fira Code", monospace`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // 4. 드로잉 (그림자/빛번짐 방지 및 순수 블러 집중)
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);
    
    // 5. 텍스처 업데이트 플래그
    texture.needsUpdate = true;
  }, [text, color, blurAmount, ctx, canvas, texture]);

  return (
    <mesh ref={meshRef} scale={scale}>
      <planeGeometry args={[4, 1]} /> 
      <meshBasicMaterial 
        map={texture} 
        transparent 
        opacity={opacity}
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

export default BlurredText;
