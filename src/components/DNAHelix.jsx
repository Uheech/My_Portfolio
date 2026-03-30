import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DNAHelix = ({ onSelect, converging }) => {
  const [hoveredNode, setHoveredNode] = useState(null);
  
  const width = 1000;
  const height = 300;
  const points = 80;
  const wavelength = 400;
  const amplitude = converging ? 2 : 60;
  const centerY = height / 2;

  // Generate path points for strands
  const getStrandPoints = (phase = 0) => {
    const pts = [];
    for (let i = 0; i <= points; i++) {
      const x = (i / points) * width;
      const progress = x / wavelength;
      const y = centerY + amplitude * Math.sin(progress * 2 * Math.PI + phase);
      const z = Math.cos(progress * 2 * Math.PI + phase); // Simulated depth
      pts.push({ x, y, z });
    }
    return pts;
  };

  const strand1 = useMemo(() => getStrandPoints(0), [amplitude, converging]);
  const strand2 = useMemo(() => getStrandPoints(Math.PI), [amplitude, converging]);

  const generatePath = (pts) => {
    return `M ${pts[0].x} ${pts[0].y} ` + pts.slice(1).map(p => `L ${p.x} ${p.y}`).join(' ');
  };

  const projects = [
    { id: 'BIO', type: 'A', color: 'var(--color-neon-a)', label: 'BIO: RNA_ANALYSIS', x: 0.15 },
    { id: 'MUSIC', type: 'T', color: 'var(--color-neon-t)', label: 'MUSIC: RHYTHM_GA', x: 0.38 },
    { id: 'MENTAL', type: 'C', color: 'var(--color-neon-c)', label: 'MENTAL: AI_CHATBOT', x: 0.62 },
    { id: 'DATA/QA', type: 'G', color: 'var(--color-neon-g)', label: 'DATA/QA: PHILOSOPHY', x: 0.85 },
  ];

  return (
    <div className="relative w-full max-w-5xl h-[300px] flex items-center justify-center">
      <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
        {/* Rungs (Base Pairs) */}
        {!converging && Array.from({ length: 30 }).map((_, i) => {
          const x = (i / 30) * width;
          const progress = x / wavelength;
          const y1 = centerY + amplitude * Math.sin(progress * 2 * Math.PI);
          const y2 = centerY + amplitude * Math.sin(progress * 2 * Math.PI + Math.PI);
          const z = Math.cos(progress * 2 * Math.PI);
          
          return (
            <motion.line
              key={`rung-${i}`}
              x1={x} y1={y1}
              x2={x} y2={y2}
              stroke="#2D2D2D"
              strokeOpacity={Math.max(0.1, (z + 1) / 4)}
              strokeWidth={Math.max(0.5, (z + 1))}
              initial={false}
              animate={{ opacity: converging ? 0 : 1 }}
            />
          );
        })}

        {/* Strand 2 (Back) */}
        <motion.path
          d={generatePath(strand2)}
          stroke="#2D2D2D"
          strokeWidth="1"
          strokeDasharray="4 4"
          fill="none"
          strokeOpacity="0.3"
          animate={{ d: generatePath(strand2), strokeOpacity: converging ? 0 : 0.3 }}
          transition={{ duration: 0.8 }}
        />
        
        {/* Strand 1 (Front) */}
        <motion.path
          d={generatePath(strand1)}
          stroke="#2D2D2D"
          strokeWidth="2"
          fill="none"
          animate={{ d: generatePath(strand1), strokeWidth: converging ? 1 : 2 }}
          transition={{ duration: 0.8 }}
        />

        {/* Interaction Nodes */}
        {projects.map((project) => {
          const xPos = project.x * width;
          const progress = xPos / wavelength;
          const yPos = centerY + amplitude * Math.sin(progress * 2 * Math.PI);
          const isHovered = hoveredNode === project.id;
          
          return (
            <motion.g
              key={project.id}
              className="cursor-pointer group"
              onMouseEnter={() => setHoveredNode(project.id)}
              onMouseLeave={() => setHoveredNode(null)}
              onClick={() => onSelect(project.id)}
              animate={{ 
                x: 0, 
                y: converging ? (centerY - yPos) : 0,
                opacity: converging && !isHovered ? 0 : 1
              }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              {/* Pulse effect */}
              <AnimatePresence>
                {isHovered && (
                  <motion.circle
                    cx={xPos}
                    cy={yPos}
                    r="20"
                    fill={project.color}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 0.15, scale: 1.5 }}
                    exit={{ opacity: 0, scale: 2 }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  />
                )}
              </AnimatePresence>

              {/* Main Node */}
              <motion.circle
                cx={xPos}
                cy={yPos}
                r={isHovered ? "10" : "6"}
                fill={project.color}
                stroke="#FFF"
                strokeWidth="2"
                className="dna-node shadow-lg"
                animate={{ r: isHovered ? 12 : 6 }}
              />

              {/* Base Type Floating Tag */}
              <motion.text
                x={xPos}
                y={yPos - 25}
                textAnchor="middle"
                className="text-[14px] font-black tracking-tighter uppercase fill-white"
                style={{ fill: project.color }}
                initial={{ opacity: 0, y: yPos - 15 }}
                animate={{ opacity: isHovered ? 1 : 0.4, y: isHovered ? yPos - 30 : yPos - 25 }}
              >
                {project.type}
              </motion.text>

              {/* Project Title Label */}
              <motion.g
                initial={{ opacity: 0, y: 10 }}
                animate={{ 
                  opacity: (isHovered && !converging) ? 1 : 0, 
                  y: isHovered ? 40 : 50 
                }}
              >
                <rect 
                  x={xPos - 80} 
                  y={yPos} 
                  width="160" 
                  height="30" 
                  fill="white" 
                  stroke={project.color}
                  strokeWidth="1"
                />
                <text
                  x={xPos}
                  y={yPos + 20}
                  textAnchor="middle"
                  className="text-[10px] font-bold tracking-widest fill-lab-dark"
                >
                  {project.label}
                </text>
              </motion.g>

              {/* Permanent ID Label (Lower) */}
              {!isHovered && !converging && (
                <text
                  x={xPos}
                  y={yPos + 35}
                  textAnchor="middle"
                  className="text-[11px] font-bold tracking-[0.2em] uppercase fill-lab-dark/30"
                >
                  {project.id}
                </text>
              )}
            </motion.g>
          );
        })}
      </svg>
    </div>
  );
};

export default DNAHelix;

