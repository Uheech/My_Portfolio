import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import DNAHelix from './DNAHelix';

const MainView = ({ onSelectProject }) => {
  const [isConverging, setIsConverging] = useState(false);
  const [timestamp, setTimestamp] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setTimestamp(new Date().toISOString());
    }, 100);
    return () => clearInterval(timer);
  }, []);

  const handleSelect = (id) => {
    setIsConverging(true);
    setTimeout(() => {
      onSelectProject(id);
    }, 1000);
  };

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center p-8 bg-white overflow-hidden relative">
      {/* Background Decoration */}
      <div className="scan-line" />
      <DataStream />
      
      {/* Top Left Info */}
      <motion.div 
        className="absolute top-8 left-8 flex flex-col gap-1 border-l-2 border-lab-dark pl-4 z-20"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-neon-a animate-pulse" />
          <span className="text-[10px] font-bold tracking-[0.2em]">SYSTEM_ACTIVE</span>
        </div>
        <span className="text-[9px] text-lab-dark/40 font-mono">{timestamp}</span>
      </motion.div>

      {/* Top Right Info */}
      <motion.div 
        className="absolute top-8 right-8 text-right flex flex-col gap-1 border-r-2 border-lab-dark pr-4 z-20"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <span className="text-[10px] font-bold tracking-[0.2em]">LAB_ARCHIVE_01</span>
        <span className="text-[9px] text-lab-dark/40">LAT: 37.5665 / LONG: 126.9780</span>
      </motion.div>

      {/* Main Content */}
      <div className="flex flex-col items-center relative gap-16 z-10">
        <motion.div
          className="text-center flex flex-col gap-6"
          animate={{ opacity: isConverging ? 0 : 1, y: isConverging ? -40 : 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex flex-col gap-2">
            <motion.span 
              className="text-[10px] tracking-[0.5em] text-lab-dark/40 uppercase"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              UHEECH_EXPERIMENTAL_STATION
            </motion.span>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-lab-dark leading-none">
              <span className="block">전공의 담장을 허무는</span>
              <span className="inline-block bg-lab-dark text-white px-4 py-1 mt-2 transform -skew-x-6">
                잡식성 해결사
              </span>
            </h1>
          </div>
          <p className="text-[11px] opacity-60 tracking-[0.4em] font-light uppercase">
            Cross-Disciplinary Problem Solver _ Project Index
          </p>
        </motion.div>

        {/* DNA Helix Navigation */}
        <DNAHelix onSelect={handleSelect} converging={isConverging} />

        <motion.div
          className="text-center"
          animate={{ opacity: isConverging ? 0 : 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col items-center gap-4">
            <div className="w-[1px] h-12 bg-gradient-to-b from-lab-dark/0 via-lab-dark/40 to-lab-dark/0" />
            <p className="text-[9px] uppercase tracking-[0.3em] font-bold animate-pulse">
              Select_Node_to_Initialize
            </p>
          </div>
        </motion.div>
      </div>

      {/* Footer Decoration */}
      <motion.div 
        className="absolute bottom-8 left-8 flex flex-col gap-1 border-l-2 border-lab-dark/20 pl-4 z-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <span className="text-[9px] text-lab-dark/40 uppercase">Memory_Dump: 0x4F2A...</span>
      </motion.div>

      <motion.div 
        className="absolute bottom-8 right-8 text-right flex flex-col gap-1 border-r-2 border-lab-dark/20 pr-4 z-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <span className="text-[10px] text-lab-dark/60 tracking-[0.1em] font-bold">V.1.0.4_STABLE</span>
        <span className="text-[9px] text-lab-dark/40 uppercase">Built with Logic & Creativity</span>
      </motion.div>
    </div>
  );
};

// Subtle background data stream component
const DataStream = () => {
  const streams = Array.from({ length: 15 });
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.03] flex justify-around">
      {streams.map((_, i) => (
        <motion.div
          key={i}
          className="text-[10px] font-mono whitespace-nowrap orientation-vertical writing-mode-vertical"
          initial={{ y: -500 }}
          animate={{ y: 1000 }}
          transition={{
            duration: 15 + Math.random() * 15,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 10
          }}
        >
          {Array.from({ length: 40 }).map(() => 
            Math.floor(Math.random() * 16).toString(16).toUpperCase()
          ).join('')}
        </motion.div>
      ))}
    </div>
  );
};


export default MainView;

