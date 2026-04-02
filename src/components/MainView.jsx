import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import DNAHelix3D from './DNAHelix3D';
import ProfileDashboard from './ProfileDashboard';
import { UserCircle2, Fingerprint } from 'lucide-react';

const MainView = ({ onSelectProject, isReturning = false }) => {
  const [transitionPhase, setTransitionPhase] = useState(isReturning ? 'shrink' : 'idle');
  const [showProfile, setShowProfile] = useState(false);

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
      className="h-screen w-full flex flex-row items-center justify-center p-8 bg-lab-bg overflow-hidden relative font-mono"
      animate={{
        filter: transitionPhase === 'focus' ? 'blur(8px)' : 'blur(0px)',
        scale: transitionPhase === 'focus' ? 1.05 : 1
      }}
      transition={{ duration: 0.8 }}
    >
      {/* Profile Dashboard Component */}
      <ProfileDashboard isOpen={showProfile} onClose={() => setShowProfile(false)} />

      {/* TOP Technical Meta: Analysis_Report (Fixed to Right Edge) */}
      <motion.div
        className="absolute top-8 right-8 text-right flex flex-col items-end z-20 pointer-events-none"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: (transitionPhase === 'idle' && !showProfile) ? 0.4 : 0, y: (transitionPhase === 'idle' && !showProfile) ? 0 : -10 }}
      >
      </motion.div>

      {/* MAIN ALIGNMENT CONTAINER: Left-Aligned Vertical Grid (7xl) */}
      <div className="absolute inset-0 z-20 flex flex-col items-center pointer-events-none">
        <div className="w-full max-w-7xl h-full flex flex-col justify-between py-16 px-8 relative">

          {/* 1. TOP CENTER -> TOP LEFT Alignment Sync */}
          <motion.div
            className="flex flex-col items-start pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: (transitionPhase === 'idle' && !showProfile) ? 1 : 0 }}
          >
            <span className="text-[15px] tracking-[0.6em] text-lab-dark/30 uppercase font-black">
              유희'S GENE LAB
            </span>
          </motion.div>

          {/* 2. MIDDLE HERO SECTION (Existing Content) */}
          <div className="flex flex-row items-center gap-16 w-full">
            <motion.div
              className="flex flex-col gap-6 max-w-sm pointer-events-none"
              animate={{
                opacity: transitionPhase === 'idle' ? (showProfile ? 0.3 : 1) : 0,
                x: transitionPhase === 'idle' ? (showProfile ? 350 : 0) : -40
              }}
              transition={{ type: 'spring', damping: 25, stiffness: 100 }}
            >
              <div className="flex flex-col gap-12">
                <div className="flex flex-col gap-6 pointer-events-auto">
                  <div className="flex flex-col gap-6">
                    <h1 className="text-6xl font-black tracking-tighter text-lab-dark leading-[1.0]">
                      분야를 불문하고<br />
                      직접 부딪히는
                    </h1>
                    <div className="flex items-center gap-3">
                      <div className="h-[2px] w-8 bg-lab-dark" />
                      <p className="text-2xl font-black text-lab-dark tracking-tighter flex items-center">
                        데이터 분석가, <span className="bg-lab-dark text-white px-3 py-1 ml-2 inline-block">최유희</span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pl-0 pointer-events-auto">
                  <p className="text-[15px] text-lab-dark/80 tracking-tight font-semibold leading-relaxed">
                    {`사람을 위한 기술을 고민하며`}<br />
                    {`그 기술로 누군가의 갈증을 채울 때, 큰 기쁨을 느낍니다. `}
                  </p>
                </div>
              </div>

              <motion.button
                onClick={() => setShowProfile(true)}
                className="mt-8 flex items-center gap-4 w-fit group pointer-events-auto z-40"
              >
                <div className="relative">
                  <div className="absolute -inset-1 bg-neon-a/20 rounded-full blur opacity-50 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
                  <div className="relative p-2.5 border-2 border-[#333] rounded-full group-hover:bg-[#333] group-hover:text-white transition-all bg-lab-bg flex items-center justify-center">
                    <Fingerprint size={20} className={showProfile ? "text-neon-a" : ""} />
                  </div>
                </div>
                <div className="flex flex-col items-start gap-0.5">
                  <span className="text-[8px] font-black tracking-[0.3em] text-[#333]/40 uppercase">LAB_ACCESS_SCANNER</span>
                  <span className="text-sm font-black tracking-[0.2em] text-[#333]">[ 프로필 ]</span>
                </div>
              </motion.button>
            </motion.div>

            {/* Layout Spacer for DNA */}
            <div className="flex-1 pointer-events-none" />
          </div>

          {/* 3. BOTTOM ALIGNMENT: Instructions Sync */}
          <motion.div
            className="flex flex-col items-start gap-3 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: (transitionPhase === 'idle' && !showProfile) ? 1 : 0 }}
          >
            <div className="flex flex-col items-start gap-1.5">
              <div className="flex items-center gap-3">
                <span className="text-lab-dark animate-pulse font-mono text-xl">{`> `}</span>
                <p className="text-lg font-black text-lab-dark tracking-tight">
                  나를 구성하는 유전 코드를 확인해보세요.
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    className="inline-block ml-1 w-2.5 h-5 bg-lab-dark align-middle"
                  />
                </p>
              </div>
              <p className="text-xs font-bold text-lab-dark/40 tracking-wider">
                각 노드를 클릭하면 프로젝트 상세 데이터를 확인할 수 있습니다.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* DNA Helix Layer: Restored Behind Text Alignment Container */}
      <motion.div
        className="absolute inset-0 z-10 select-none"
        animate={{
          opacity: transitionPhase === 'shrink' ? 0 : (showProfile ? 0.8 : 1),
          scale: transitionPhase === 'shrink' ? 0.8 : (showProfile ? 0.9 : 1),
          x: showProfile ? 450 : 350 // Right-shifted position for visual balance with left text
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 100 }}
      >
        <DNAHelix3D onSelect={handleSelect} transitionPhase={transitionPhase} />
      </motion.div>


      {/* Left/Right Border Decor (Optional) */}
      <motion.div
        className="absolute bottom-8 left-8 flex flex-col gap-1 border-l-2 border-lab-dark/10 pl-4 z-20"
        animate={{
          opacity: transitionPhase === 'idle' ? 1 : 0,
          x: showProfile ? -20 : 0
        }}
      >
      </motion.div>

      <motion.div
        className="absolute bottom-8 right-8 text-right flex flex-col gap-1 border-r-2 border-lab-dark/10 pr-4 z-20"
        animate={{
          opacity: transitionPhase === 'idle' ? 1 : 0,
          x: showProfile ? 20 : 0
        }}
      >
      </motion.div>
    </motion.div>
  );
};

export default MainView;
