import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import DNAHelix3D from './DNAHelix3D';

const MainView = ({ onSelectProject, isReturning = false }) => {
  const [timestamp, setTimestamp] = useState('');
  const [transitionPhase, setTransitionPhase] = useState(isReturning ? 'shrink' : 'idle');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimestamp(now.toISOString().replace('T', ' ').substring(0, 19) + 'Z');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isReturning) {
      const timer = setTimeout(() => {
        setTransitionPhase('idle');
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isReturning]);

  const handleSelect = (id) => {
    setTransitionPhase('focus');
    setTimeout(() => {
      setTransitionPhase('shrink');
      setTimeout(() => {
        onSelectProject(id);
      }, 1000);
    }, 800);
  };

  return (
    <motion.div 
      className="h-screen w-full flex flex-row items-center justify-center p-8 bg-white overflow-hidden relative font-mono"
      animate={{ 
        filter: transitionPhase === 'focus' ? 'blur(8px)' : 'blur(0px)',
        scale: transitionPhase === 'focus' ? 1.05 : 1
      }}
      transition={{ duration: 0.8 }}
    >
      {/* Background Decoration */}
      <div className="scan-line" />
      <DataStream />
      
      {/* Top Left Info */}
      <motion.div 
        className="absolute top-8 left-8 flex flex-col gap-1 border-l-2 border-lab-dark pl-4 z-20"
        initial={{ opacity: 0, x: -20 }}
        animate={{ 
          opacity: transitionPhase === 'idle' ? 1 : 0, 
          x: transitionPhase === 'idle' ? 0 : -20 
        }}
      >
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-neon-a animate-pulse" />
          <span className="text-[10px] font-bold tracking-[0.2em]">STATION_ACTIVE</span>
        </div>
        <span className="text-[9px] text-lab-dark/40">{timestamp}</span>
      </motion.div>

      {/* Top Right Info */}
      <motion.div 
        className="absolute top-8 right-8 text-right flex flex-col gap-1 border-r-2 border-lab-dark pr-4 z-20"
        initial={{ opacity: 0, x: 20 }}
        animate={{ 
          opacity: transitionPhase === 'idle' ? 1 : 0, 
          x: transitionPhase === 'idle' ? 0 : 20 
        }}
      >
        <span className="text-[10px] font-bold tracking-[0.2em]">LAB_ARCHIVE_V3</span>
        <span className="text-[9px] text-lab-dark/40">LAT: 37.5665 / LONG: 126.9780</span>
      </motion.div>

      {/* Left Content (Title) */}
      <motion.div
        className="absolute left-24 flex flex-col gap-6 z-10 max-w-sm"
        animate={{ 
          opacity: transitionPhase === 'idle' ? 1 : 0, 
          x: transitionPhase === 'idle' ? 0 : -40 
        }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col gap-3">
          <motion.span 
            className="text-[11px] tracking-[0.4em] text-lab-dark/30 uppercase font-black"
          >
            UHEECH_EXPERIMENTAL_STATION
          </motion.span>
          <h1 className="text-5xl font-black tracking-tighter text-lab-dark leading-[0.9]">
            <span className="block mb-2">전공의 담장을</span>
            <span className="block mb-2">허무는</span>
            <span className="inline-block bg-lab-dark text-white px-3 py-1 transform -skew-x-6 text-4xl">
              잡식성 해결사
            </span>
          </h1>
        </div>
        <p className="text-[10px] opacity-40 tracking-[0.3em] font-bold uppercase leading-relaxed">
          The Omnivorous Fixer<br/>Digital Blueprint v3.0 // Archive
        </p>

        <div className="mt-8 flex flex-col gap-3">
          <div className="w-12 h-[1px] bg-lab-dark/20" />
          <p className="text-[9px] text-lab-dark/40 leading-relaxed uppercase tracking-widest">
            Cross-disciplinary problem solving<br/>
            through biological logic and engineering.
          </p>
        </div>
      </motion.div>

      {/* Center: DNA Helix (Real 3D) */}
      <motion.div 
        className="z-20 w-full h-full flex items-center justify-center relative"
        animate={{
          opacity: transitionPhase === 'shrink' ? 0 : 1,
          scale: transitionPhase === 'shrink' ? 0.8 : 1
        }}
        transition={{ duration: 0.8 }}
      >
        <DNAHelix3D onSelect={handleSelect} transitionPhase={transitionPhase} />
      </motion.div>

      {/* Bottom Center Prompt */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: transitionPhase === 'idle' ? 1 : 0 }}
      >
        <p className="text-[9px] uppercase tracking-[0.4em] font-black text-lab-dark/30 animate-pulse">
          Select_Sequence_to_Analyze
        </p>
        <div className="w-[1px] h-8 bg-gradient-to-b from-lab-dark/0 via-lab-dark/20 to-lab-dark/0" />
      </motion.div>

      {/* Footer info labels */}
      <motion.div 
        className="absolute bottom-8 left-8 flex flex-col gap-1 border-l-2 border-lab-dark/10 pl-4 z-20"
        animate={{ opacity: transitionPhase === 'idle' ? 1 : 0 }}
      >
        <span className="text-[10px] text-lab-dark/40 tracking-[0.2em] font-black uppercase">MEMORY_DUMP: 0X4F2A...</span>
        <span className="text-[9px] text-lab-dark/20 uppercase tracking-[0.1em]">System_Log::Init_Success</span>
      </motion.div>

      <motion.div 
        className="absolute bottom-8 right-8 text-right flex flex-col gap-1 border-r-2 border-lab-dark/10 pr-4 z-20"
        animate={{ opacity: transitionPhase === 'idle' ? 1 : 0 }}
      >
        <span className="text-[10px] text-lab-dark/60 tracking-[0.2em] font-black uppercase">BUILT WITH LOGIC & CREATIVITY</span>
        <span className="text-[9px] text-lab-dark/20 uppercase tracking-[0.1em]">Verification_Key::7771-NX</span>
      </motion.div>
    </motion.div>
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

