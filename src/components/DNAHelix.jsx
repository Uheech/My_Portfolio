import React, { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence, useAnimationFrame, useMotionValue, useTransform } from 'framer-motion';

const DNAHelix = ({ onSelect, converging }) => {
  const [hoveredRung, setHoveredRung] = useState(null);
  const phase = useMotionValue(0);
  
  // Continuous flow animation
  useAnimationFrame((t) => {
    if (!converging) {
      phase.set(t / 2000); 
    }
  });

  const width = 1000;
  const height = 300;
  const wavelength = 350;
  const amplitude = converging ? 0 : 50;
  const centerY = height / 2;

  // Highlights mapping (Interactive Rungs)
  const interactiveRungs = {
    6: { id: 'BIO', color: 'var(--color-neon-a)', label: 'BIO_SYSTEMS' },
    15: { id: 'MUSIC', color: 'var(--color-neon-t)', label: 'MUSIC_GA_LOGS' },
    24: { id: 'MENTAL', color: 'var(--color-neon-c)', label: 'AI_LAB_SESSION' },
    33: { id: 'DATA/QA', color: 'var(--color-neon-g)', label: 'QA_PHILOSOPHY' }
  };

  const getStrandPoints = (p, pOffset = 0) => {
    const pts = [];
    const points = 60;
    for (let i = 0; i <= points; i++) {
      const x = (i / points) * width;
      const progress = x / wavelength;
      const y = centerY + amplitude * Math.sin(progress * 2 * Math.PI + p + pOffset);
      pts.push({ x, y });
    }
    return pts;
  };

  const strand1Path = useTransform(phase, p => {
    const pts = getStrandPoints(p, 0);
    return `M ${pts[0].x} ${pts[0].y} ` + pts.slice(1).map(pt => `L ${pt.x} ${pt.y}`).join(' ');
  });

  const strand2Path = useTransform(phase, p => {
    const pts = getStrandPoints(p, Math.PI);
    return `M ${pts[0].x} ${pts[0].y} ` + pts.slice(1).map(pt => `L ${pt.x} ${pt.y}`).join(' ');
  });

  return (
    <div className="relative w-full max-w-5xl h-[300px] flex items-center justify-center">
      <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3.5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* DNA Rungs (Base Pairs) */}
        {!converging && Array.from({ length: 40 }).map((_, i) => (
          <Rung 
            key={`rung-${i}`} 
            index={i}
            x={(i / 40) * width}
            progress={((i / 40) * width) / wavelength} 
            phase={phase} 
            centerY={centerY} 
            amplitude={amplitude}
            metadata={interactiveRungs[i]}
            isHovered={hoveredRung === i}
            onHover={setHoveredRung}
            onSelect={onSelect}
          />
        ))}

        {/* Global Strands */}
        <motion.path
          style={{ d: strand1Path }}
          stroke="#2D2D2D"
          strokeWidth="1.5"
          fill="none"
          strokeOpacity="0.8"
        />
        <motion.path
          style={{ d: strand2Path }}
          stroke="#2D2D2D"
          strokeWidth="1"
          strokeDasharray="4 2"
          fill="none"
          strokeOpacity="0.3"
        />
      </svg>
    </div>
  );
};

const Rung = ({ index, x, progress, phase, centerY, amplitude, metadata, isHovered, onHover, onSelect }) => {
  // Split Base Pair Logic: Meet in the middle
  const y1 = useTransform(phase, p => centerY + amplitude * Math.sin(progress * 2 * Math.PI + p));
  const y2 = useTransform(phase, p => centerY + amplitude * Math.sin(progress * 2 * Math.PI + p + Math.PI));
  const z = useTransform(phase, p => Math.cos(progress * 2 * Math.PI + p));
  
  const opacity = useTransform(z, val => metadata ? 1 : Math.max(0.05, (val + 1) / 6));
  const strokeColor = metadata ? metadata.color : "#2D2D2D";
  const strokeWidth = metadata ? (isHovered ? 6 : 4) : 1;

  return (
    <motion.g
      className={metadata ? "cursor-pointer" : "pointer-events-none"}
      onMouseEnter={() => metadata && onHover(index)}
      onMouseLeave={() => metadata && onHover(null)}
      onClick={() => metadata && onSelect(metadata.id)}
    >
      {/* Upper Segment */}
      <motion.line
        x1={x}
        style={{ y1, y2: centerY, opacity }}
        x2={x}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        filter={metadata ? "url(#glow)" : "none"}
        animate={{ strokeOpacity: isHovered ? 1 : 0.8 }}
      />
      {/* Lower Segment */}
      <motion.line
        x1={x}
        style={{ y1: centerY, y2, opacity }}
        x2={x}
        stroke={metadata ? "#FFFFFF" : strokeColor} // Differentiating base pairs (White meets Neon)
        strokeWidth={strokeWidth}
        filter={metadata ? "url(#glow)" : "none"}
        animate={{ strokeOpacity: isHovered ? 1 : 0.8 }}
      />

      {/* Label for highlighted rungs */}
      {metadata && (
        <motion.g style={{ opacity }}>
          <motion.text
            x={x}
            textAnchor="middle"
            className="text-[10px] font-black tracking-widest uppercase"
            style={{ 
              y: useTransform(y1, val => val < centerY ? val - 15 : val + 25),
              fill: metadata.color, 
              scale: isHovered ? 1.2 : 1,
              filter: "url(#glow)"
            }}
          >
            {metadata.id}
          </motion.text>
          
          <AnimatePresence>
            {isHovered && (
              <motion.text
                x={x}
                y={centerY + 80}
                textAnchor="middle"
                initial={{ opacity: 0, y: centerY + 60 }}
                animate={{ opacity: 1, y: centerY + 80 }}
                exit={{ opacity: 0 }}
                className="text-[12px] font-bold tracking-[0.3em] fill-lab-dark bg-white"
              >
                [ {metadata.label} ]
              </motion.text>
            )}
          </AnimatePresence>
        </motion.g>
      )}
    </motion.g>
  );
};

export default DNAHelix;



