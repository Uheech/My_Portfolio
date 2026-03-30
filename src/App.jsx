import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import MainView from './components/MainView';
import ProjectReport from './components/ProjectReport';

function App() {
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  return (
    <div className="min-h-screen bg-white text-lab-dark font-mono selection:bg-lab-dark selection:text-white relative">
      {/* Global Scanline Overlay */}
      <div className="scan-line opacity-[0.03]" />
      
      <AnimatePresence mode="wait">
        {selectedProjectId === null ? (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98, filter: 'blur(10px)' }}
            transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
          >
            <MainView onSelectProject={setSelectedProjectId} />
          </motion.div>
        ) : (
          <motion.div
            key="detail"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <ProjectReport 
              projectId={selectedProjectId} 
              onBack={() => setSelectedProjectId(null)} 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;

