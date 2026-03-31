import React, { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence, useAnimationFrame, useMotionValue, useTransform } from 'framer-motion';

const DNAHelix = ({ onSelect, converging }) => {
  const [hoveredRung, setHoveredRung] = useState(null);
  const phase = useMotionValue(0);
  
  // Continuous rotation/flow animation
  useAnimationFrame((t) => {
    if (!converging) {
      phase.set(t / 3000); // Slower, more majestic rotation
    }
  });

  const width = 450; 
  const height = 800; 
  const wavelength = 320;
  const amplitude = converging ? 0 : 55;
  const centerX = width / 2;

  // Interactive Rungs Mapping
  const interactiveRungs = {
    14: { id: 'BIO', color: '#39FF14', label: 'Biological Systems' },
    18: { id: 'MUSIC', color: '#BF00FF', label: 'Music GA Rhythms' },
    22: { id: 'MENTAL', color: '#FF1493', label: 'AI Mental Health' },
    26: { id: 'DATA/QA', color: '#00FFFF', label: 'QA Philosophy' }
  };

  return (
    <motion.div 
      className="relative flex items-center justify-center pointer-events-none"
      animate={{ y: [0, -12, 0], rotate: [0, 0.5, 0] }}
      transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
    >
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
        <defs>
          <filter id="neon-bloom" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4.5" result="blur"/>
            <feMerge>
              <feMergeNode in="blur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <filter id="depth-blur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.5" />
          </filter>
        </defs>

        {/* 1. Back Layer Strands (z < 0) - Extreme thinness and blur */}
        {!converging && Array.from({ length: 48 }).map((_, i) => (
          <StrandSegment 
            key={`strand-back-${i}`} 
            phase={phase} 
            yStart={(i / 48) * height} 
            yEnd={((i + 1) / 48) * height} 
            centerX={centerX} 
            amplitude={amplitude} 
            wavelength={wavelength}
            isFront={false} 
          />
        ))}

        {/* 2. Mid Layer Rungs - BOLD Restoration */}
        {!converging && Array.from({ length: 40 }).map((_, i) => (
          <Rung 
            key={`rung-${i}`} 
            index={i}
            y={(i / 40) * height}
            progress={((i / 40) * height) / wavelength} 
            phase={phase} 
            centerX={centerX} 
            amplitude={amplitude}
            metadata={interactiveRungs[i]}
            isHovered={hoveredRung === i}
            onHover={setHoveredRung}
            onSelect={onSelect}
          />
        ))}

        {/* 3. Front Layer Strands (z >= 0) - Massive thickness and Glow */}
        {!converging && Array.from({ length: 48 }).map((_, i) => (
          <StrandSegment 
            key={`strand-front-${i}`} 
            phase={phase} 
            yStart={(i / 48) * height} 
            yEnd={((i + 1) / 48) * height} 
            centerX={centerX} 
            amplitude={amplitude} 
            wavelength={wavelength}
            isFront={true} 
          />
        ))}
      </svg>
    </motion.div>
  );
};

// Segmented strand rendering to handle overlap with Forced Perspective
const StrandSegment = ({ phase, yStart, yEnd, centerX, amplitude, wavelength, isFront }) => {
  const getSubPoints = (y, p, offset) => {
    const progress = y / wavelength;
    const phi = progress * 2 * Math.PI + p + offset;
    return { x: centerX + amplitude * Math.sin(phi), z: Math.cos(phi) };
  };

  const strand1D = useTransform(phase, p => {
    const midY = (yStart + yEnd) / 2;
    const { z } = getSubPoints(midY, p, 0);
    if ((isFront && z < 0) || (!isFront && z >= 0)) return "";
    const p1 = getSubPoints(yStart, p, 0);
    const p2 = getSubPoints(yEnd, p, 0);
    return `M ${p1.x} ${yStart} L ${p2.x} ${yEnd}`;
  });

  const strand2D = useTransform(phase, p => {
    const midY = (yStart + yEnd) / 2;
    const { z } = getSubPoints(midY, p, Math.PI);
    if ((isFront && z < 0) || (!isFront && z >= 0)) return "";
    const p1 = getSubPoints(yStart, p, Math.PI);
    const p2 = getSubPoints(yEnd, p, Math.PI);
    return `M ${p1.x} ${yStart} L ${p2.x} ${yEnd}`;
  });

  return (
    <motion.g filter={isFront ? "url(#neon-bloom)" : "url(#depth-blur)"}>
      <motion.path 
        d={strand1D} 
        stroke="#2D2D2D" 
        strokeWidth={isFront ? 6 : 1} 
        strokeOpacity={isFront ? 0.9 : 0.2} 
        fill="none" 
      />
      <motion.path 
        d={strand2D} 
        stroke="#2D2D2D" 
        strokeWidth={isFront ? 6 : 1} 
        strokeOpacity={isFront ? 0.9 : 0.2} 
        strokeDasharray={isFront ? "none" : "4 2"} 
        fill="none" 
      />
    </motion.g>
  );
};

const Rung = ({ index, y, progress, phase, centerX, amplitude, metadata, isHovered, onHover, onSelect }) => {
  const x1 = useTransform(phase, p => centerX + amplitude * Math.sin(progress * 2 * Math.PI + p));
  const x2 = useTransform(phase, p => centerX + amplitude * Math.sin(progress * 2 * Math.PI + p + Math.PI));
  const z = useTransform(phase, p => Math.cos(progress * 2 * Math.PI + p));
  
  // BOLD Visibility: Minimum 0.4 opacity for the "back" parts
  const opacity = useTransform(z, val => metadata ? 1 : Math.max(0.4, (val + 1) / 3));
  const strokeColor = metadata ? metadata.color : "#2D2D2D";
  const strokeWidth = metadata ? (isHovered ? 8 : 4) : 1.5;

  // Heavy Magnet Effect
  const gapOffset = isHovered ? 0.2 : 1; 

  return (
    <motion.g
      className={metadata ? "cursor-pointer pointer-events-auto" : "pointer-events-none"}
      onMouseEnter={() => metadata && onHover(index)}
      onMouseLeave={() => metadata && onHover(null)}
      onClick={() => metadata && onSelect(metadata.id)}
    >
      {/* Left Segment */}
      <motion.line
        style={{ x1, x2: useTransform(x1, (val) => centerX - gapOffset), y1: y, y2: y, opacity }}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        filter={metadata ? "url(#neon-bloom)" : "none"}
        animate={{ strokeOpacity: isHovered ? 1 : 0.8 }}
      />
      {/* Right Segment */}
      <motion.line
        style={{ x1: useTransform(x2, (val) => centerX + gapOffset), x2, y1: y, y2: y, opacity }}
        stroke={metadata ? metadata.color : strokeColor}
        strokeWidth={strokeWidth}
        filter={metadata ? "url(#neon-bloom)" : "none"}
        animate={{ strokeOpacity: isHovered ? 1 : 0.8 }}
      />

      {/* Side Labels */}
      {metadata && (
        <motion.g style={{ opacity }}>
          <motion.text
            x={centerX + 110}
            y={y + 4}
            className="text-[14px] font-mono font-black tracking-widest"
            style={{ 
              fill: metadata.color, 
              scale: isHovered ? 1.25 : 1,
              filter: isHovered ? "url(#neon-bloom)" : "none"
            }}
          >
            {metadata.id}
          </motion.text>
          
          <AnimatePresence>
            {isHovered && (
              <motion.text
                x={centerX + 180}
                y={y + 4}
                initial={{ opacity: 0, x: centerX + 160 }}
                animate={{ opacity: 0.8, x: centerX + 190 }}
                exit={{ opacity: 0 }}
                className="text-[10px] font-mono font-bold tracking-[0.2em] fill-lab-dark/60 italic"
              >
                // SCAN_COMPLETE::[READY]
              </motion.text>
            )}
          </AnimatePresence>
        </motion.g>
      )}
    </motion.g>
  );
};

export default DNAHelix;






