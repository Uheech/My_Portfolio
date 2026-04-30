import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import MainView from './components/MainView';
import ProjectReport from './components/ProjectReport';

function App() {
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [wasInDetail, setWasInDetail] = useState(false);

  // URL 파라미터 감지 (?project=MENTAL 형식)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const projectIdFromUrl = params.get('project');
    
    if (projectIdFromUrl) {
      // 대문자로 변환하여 매칭 (데이터 구조가 대문자 키를 사용하므로)
      const targetId = projectIdFromUrl.toUpperCase();
      setSelectedProjectId(targetId);
    }
  }, []);

  const handleSelect = (id) => {
    setSelectedProjectId(id);
    setWasInDetail(false);
  };

  const handleBack = () => {
    setSelectedProjectId(null);
    setWasInDetail(true);
    // 뒤로 가기 시 URL 파라미터 제거 (선택 사항)
    window.history.replaceState({}, '', window.location.pathname);
  };

  return (
    <div className="min-h-screen bg-lab-bg text-lab-dark font-mono selection:bg-lab-dark selection:text-white relative">
      {/* Global Scanline Overlay */}
      <div className="scan-line opacity-[0.03]" />
      
      <AnimatePresence mode="wait">
        {selectedProjectId === null ? (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.1 } }} // MainView의 자체 애니메이션 이후 즉시 교체
          >
            <MainView 
              onSelectProject={handleSelect} 
              isReturning={wasInDetail} 
            />
          </motion.div>
        ) : (
          <motion.div
            key="detail"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <ProjectReport 
              projectId={selectedProjectId} 
              onBack={handleBack} 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;

