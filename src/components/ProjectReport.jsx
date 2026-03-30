import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Beaker, FileText, Activity, CheckCircle2 } from 'lucide-react';
import { projectsData } from '../data/projects';

const ProjectReport = ({ projectId, onBack }) => {
  const project = projectsData[projectId];

  if (!project) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const sections = [
    { label: 'PROBLEM', icon: <FileText size={16} />, content: project.problem },
    { label: 'HYPOTHESIS', icon: <Beaker size={16} />, content: project.hypothesis },
    { label: 'EXPERIMENT', icon: <Activity size={16} />, content: project.experiment },
    { label: 'RESULT', icon: <CheckCircle2 size={16} />, content: project.result }
  ];

  return (
    <div className="min-h-screen bg-white p-6 md:p-12 lg:p-20 flex flex-col font-mono max-w-7xl mx-auto relative">
      <div className="scan-line opacity-10" />
      
      {/* Background Watermark/Grid */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none opacity-[0.03] z-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[40rem] font-black select-none">
          {project.type}
        </div>
      </div>

      {/* Navigation Header */}
      <div className="flex justify-between items-start mb-16 relative z-10">
        <button 
          onClick={onBack}
          className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.2em] hover:text-lab-dark/50 transition-all group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-2 transition-transform" />
          <span>[ RETURN_TO_ROOT ]</span>
        </button>
        <div className="text-right flex flex-col items-end gap-2">
          <div className="px-3 py-1 bg-lab-dark text-white text-[10px] font-bold tracking-widest">
            LOG_REF: {project.id}_2026_ARCHIVE
          </div>
          <span className="text-[9px] opacity-40">UHEECH_LAB_SERIAL: 0x992B-00{project.type.charCodeAt(0)}</span>
        </div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10"
      >
        {/* Left Sidebar: Metadata */}
        <motion.div variants={itemVariants} className="lg:col-span-3 flex flex-col gap-10 border-l border-lab-dark/10 pl-6 h-fit sticky top-20">
          <div className="flex flex-col gap-2">
            <span className="text-[9px] opacity-40 uppercase tracking-widest">CLASSIFICATION</span>
            <span className="text-xs font-black uppercase text-lab-dark" style={{ color: project.color }}>
              {project.id === 'BIO' ? 'Biological_Systems' : 
               project.id === 'MUSIC' ? 'Acoustic_Algorithms' :
               project.id === 'MENTAL' ? 'Neurological_AI' : 'Data_Philosophy'}
            </span>
          </div>
          
          <div className="flex flex-col gap-2">
            <span className="text-[9px] opacity-40 uppercase tracking-widest">CORE_ELEMENT</span>
            <div className="flex items-center gap-3">
              <div className="text-3xl font-black italic" style={{ color: project.color }}>{project.type}</div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold leading-tight">NUCLEOTIDE</span>
                <span className="text-[8px] opacity-50 uppercase">Type_{project.type}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-[9px] opacity-40 uppercase tracking-widest">VERIFICATION_STATUS</span>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-neon-a shadow-[0_0_5px_rgba(57,255,20,0.5)]" />
              <span className="text-[10px] font-bold">100%_VALIDATED</span>
            </div>
          </div>

          <div className="mt-8">
            <div className="text-[8px] opacity-20 leading-loose break-all font-mono">
              SHA256: 3f78a6... b9c2d1e0f98a2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f
              BUILD_SUCCESS... [OK]
            </div>
          </div>
        </motion.div>

        {/* Main Content: The Report */}
        <motion.div variants={itemVariants} className="lg:col-span-9 flex flex-col gap-16">
          <header className="flex flex-col gap-4 border-b-2 border-lab-dark pb-8">
            <span className="text-[11px] font-black tracking-[0.4em] uppercase" style={{ color: project.color }}>
              EXPERIMENTAL_SUBJECT_REPORT
            </span>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-[0.9]">
              {project.title}
            </h1>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
            {sections.map((section) => (
              <div key={section.label} className="group flex flex-col gap-4 relative">
                {/* Section Header Decor */}
                <div className="flex items-center justify-between border-b border-lab-dark/10 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lab-dark/40">{section.icon}</span>
                    <span className="text-[12px] font-black tracking-[0.2em]">{section.label}</span>
                  </div>
                  <span className="text-[9px] font-mono opacity-20 group-hover:opacity-100 transition-opacity">
                    SECTION::{section.label.substring(0,3)}
                  </span>
                </div>
                
                {/* Section Content */}
                <p className="text-[15px] leading-relaxed text-lab-dark/90 text-justify hyphens-auto font-medium">
                  {section.content}
                </p>

                {/* Corner Decoration */}
                <div 
                  className="absolute -left-2 -top-2 w-1 h-1 transition-all duration-500 group-hover:w-4 group-hover:h-4 group-hover:border-l group-hover:border-t" 
                  style={{ borderColor: project.color }}
                />
              </div>
            ))}
          </div>

          {/* Abstract/Conclusion Footer */}
          <footer className="mt-8 p-6 bg-lab-dark/5 border-l-4 border-lab-dark flex flex-col gap-4">
            <span className="text-[10px] font-black tracking-widest opacity-60 uppercase">SUMMARY_SYNOPSIS</span>
            <p className="text-xs leading-relaxed italic opacity-80">
              이 실험은 {project.id} 도메인에서 발견된 임계 지점을 학제간 융합 사고를 통해 해결하고자 하는 시도였다. 
              {project.type} 염기의 특성에 기시하여, 복잡한 시스템 내부의 데이터 정합성과 논리적 흐름을 최적화하는 데 성공했다.
            </p>
          </footer>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ProjectReport;

