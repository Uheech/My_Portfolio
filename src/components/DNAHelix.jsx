import React, { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence, useAnimationFrame, useMotionValue, useTransform } from 'framer-motion';

const DNAHelix = ({ onSelect, converging }) => {
  const [hoveredNode, setHoveredNode] = useState(null);
  const phase = useMotionValue(0);
  
  // Continuous flow animation
  useAnimationFrame((t) => {
    if (!converging) {
      phase.set(t / 2000); // Controlling flow speed
    }
  });

  const width = 1000;
  const height = 300;
  const points = 80;
  const wavelength = 350;
  const amplitude = converging ? 2 : 50;
  const centerY = height / 2;

  // Strand point generator that uses the dynamic phase
  const getStrandPoints = (p, pOffset = 0) => {
    const pts = [];
    for (let i = 0; i <= points; i++) {
      const x = (i / points) * width;
      const progress = x / wavelength;
      const y = centerY + amplitude * Math.sin(progress * 2 * Math.PI + p + pOffset);
      const z = Math.cos(progress * 2 * Math.PI + p + pOffset);
      pts.push({ x, y, z });
    }
    return pts;
  };

  // We use useTransform to create motion values that update with the phase
  const strand1Path = useTransform(phase, p => {
    const pts = getStrandPoints(p, 0);
    return `M ${pts[0].x} ${pts[0].y} ` + pts.slice(1).map(pt => `L ${pt.x} ${pt.y}`).join(' ');
  });

  const strand2Path = useTransform(phase, p => {
    const pts = getStrandPoints(p, Math.PI);
    return `M ${pts[0].x} ${pts[0].y} ` + pts.slice(1).map(pt => `L ${pt.x} ${pt.y}`).join(' ');
  });

  const projects = [
    { id: 'BIO', type: 'A', color: 'var(--color-neon-a)', label: 'BIO: RNA_ANALYSIS', x: 0.15 },
    { id: 'MUSIC', type: 'T', color: 'var(--color-neon-t)', label: 'MUSIC: RHYTHM_GA', x: 0.38 },
    { id: 'MENTAL', type: 'C', color: 'var(--color-neon-c)', label: 'MENTAL: AI_CHATBOT', x: 0.62 },
    { id: 'DATA/QA', type: 'G', color: 'var(--color-neon-g)', label: 'DATA/QA: PHILOSOPHY', x: 0.85 },
  ];

  return (
    <div className="relative w-full max-w-5xl h-[300px] flex items-center justify-center">
      <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
        {/* Rungs (Base Pairs) with dynamic phase */}
        {!converging && Array.from({ length: 40 }).map((_, i) => {
          const x = (i / 40) * width;
          const progress = x / wavelength;
          
          return (
            <Rung 
              key={`rung-${i}`} 
              x={x} 
              progress={progress} 
              phase={phase} 
              centerY={centerY} 
              amplitude={amplitude} 
            />
          );
        })}

        {/* Strand 2 (Back) */}
        <motion.path
          style={{ d: strand2Path }}
          stroke="#2D2D2D"
          strokeWidth="1"
          strokeDasharray="4 4"
          fill="none"
          strokeOpacity="0.2"
          animate={{ strokeOpacity: converging ? 0 : 0.2 }}
        />
        
        {/* Strand 1 (Front) */}
        <motion.path
          style={{ d: strand1Path }}
          stroke="#2D2D2D"
          strokeWidth="2"
          fill="none"
          animate={{ strokeWidth: converging ? 1 : 2 }}
        />

        {/* Interaction Nodes */}
        {projects.map((project) => (
          <DNAProjectNode 
            key={project.id}
            project={project}
            phase={phase}
            wavelength={wavelength}
            centerY={centerY}
            amplitude={amplitude}
            width={width}
            isHovered={hoveredNode === project.id}
            setHoveredNode={setHoveredNode}
            onSelect={onSelect}
            converging={converging}
          />
        ))}
      </svg>
    </div>
  );
};

// Sub-component for Rungs to optimize rendering
const Rung = ({ x, progress, phase, centerY, amplitude }) => {
  const y1 = useTransform(phase, p => centerY + amplitude * Math.sin(progress * 2 * Math.PI + p));
  const y2 = useTransform(phase, p => centerY + amplitude * Math.sin(progress * 2 * Math.PI + p + Math.PI));
  const z = useTransform(phase, p => Math.cos(progress * 2 * Math.PI + p));
  const opacity = useTransform(z, val => Math.max(0.05, (val + 1) / 5));

  const isShimmering = useMemo(() => Math.random() > 0.9, []);

  return (
    <motion.line
      x1={x}
      style={{ y1, y2, opacity }}
      x2={x}
      stroke="#2D2D2D"
      strokeWidth="1"
      className={isShimmering ? "animate-shimmer" : ""}
    />
  );
};

// Sub-component for Nodes to optimize rendering
const DNAProjectNode = ({ project, phase, wavelength, centerY, amplitude, width, isHovered, setHoveredNode, onSelect, converging }) => {
  const xPos = project.x * width;
  const progress = xPos / wavelength;
  const yPos = useTransform(phase, p => centerY + amplitude * Math.sin(progress * 2 * Math.PI + p));
  
  return (
    <motion.g
      className="cursor-pointer group"
      onMouseEnter={() => setHoveredNode(project.id)}
      onMouseLeave={() => setHoveredNode(null)}
      onClick={() => onSelect(project.id)}
      style={{ y: useTransform(yPos, val => converging ? (centerY - val) : 0) }}
      animate={{ 
        opacity: converging && !isHovered ? 0 : 1
      }}
      transition={{ duration: 0.8 }}
    >
      <AnimatePresence>
        {isHovered && (
          <motion.circle
            cx={xPos}
            style={{ cy: yPos }}
            r="24"
            fill={project.color}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 0.1, scale: 1.5 }}
            exit={{ opacity: 0, scale: 2 }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          />
        )}
      </AnimatePresence>

      <motion.circle
        cx={xPos}
        style={{ cy: yPos }}
        r={isHovered ? 12 : 6}
        fill={project.color}
        stroke="#FFF"
        strokeWidth="2"
        className="dna-node shadow-lg"
        animate={{ r: isHovered ? 12 : 6 }}
      />

      <motion.text
        x={xPos}
        textAnchor="middle"
        className="text-[14px] font-black tracking-tighter uppercase"
        style={{ 
          y: useTransform(yPos, val => val - 30),
          fill: project.color, 
          opacity: isHovered ? 1 : 0.4 
        }}
      >
        {project.type}
      </motion.text>

      <motion.g
        style={{ 
          opacity: isHovered ? 1 : 0,
          y: isHovered ? 20 : 30
        }}
      >
        <rect x={xPos - 80} y={160} width="160" height="30" fill="white" stroke={project.color} strokeWidth="1" />
        <text x={xPos} y={180} textAnchor="middle" className="text-[10px] font-bold tracking-widest fill-lab-dark">
          {project.label}
        </text>
      </motion.g>

      {!isHovered && !converging && (
        <text x={xPos} y={240} textAnchor="middle" className="text-[11px] font-bold tracking-[0.2em] uppercase fill-lab-dark/20">
          {project.id}
        </text>
      )}
    </motion.g>
  );
};

export default DNAHelix;


