import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Beaker, FileText, Activity, CheckCircle2, FlaskConical, Dna } from 'lucide-react';
import { projectsData } from '../data/projects';

const ProjectReport = ({ projectId, onBack }) => {
  const project = projectsData[projectId];

  if (!project) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const sections = [
    { label: 'PROBLEM', id: '01', icon: <FileText size={18} />, content: project.problem },
    { label: 'HYPOTHESIS', id: '02', icon: <Beaker size={18} />, content: project.hypothesis },
    { label: 'EXPERIMENT', id: '03', icon: <Activity size={18} />, content: project.experiment },
    { label: 'RESULT', id: '04', icon: <CheckCircle2 size={18} />, content: project.result }
  ];

  const analysisDate = new Date().toISOString().split('T')[0].replace(/-/g, '.');

  return (
    <div className="min-h-screen bg-white p-6 md:p-12 lg:p-20 flex flex-col font-mono max-w-7xl mx-auto relative overflow-x-hidden">
      <div className="scan-line opacity-10" />
      
      {/* Background Microgrid Decor */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.02] z-0 overflow-hidden select-none">
        <div className="absolute top-10 left-10 text-[20rem] font-black">{project.type}</div>
        <div className="absolute bottom-10 right-10 flex flex-col items-end">
          <span className="text-[10rem] font-light leading-none opacity-50">{projectId}</span>
          <span className="text-sm font-bold tracking-[1em]">EXPERIMENTAL_LOG</span>
        </div>
      </div>

      {/* Laboratory Metadata Header */}
      <div className="flex flex-col md:flex-row justify-between items-start mb-20 relative z-10 border-b-4 border-lab-dark pb-8 gap-8">
        <div className="flex flex-col gap-6 w-full md:w-1/2">
          <button 
            onClick={onBack}
            className="flex items-center gap-3 text-[12px] font-black uppercase tracking-[0.3em] hover:bg-lab-dark hover:text-white px-4 py-2 border-2 border-lab-dark transition-all w-fit"
          >
            <ArrowLeft size={16} />
            <span>[ ← RETURN_TO_ARCHIVE ]</span>
          </button>
          
          <div className="flex flex-col">
            <span className="text-[11px] font-bold text-lab-dark/40 tracking-widest uppercase mb-1">SUBJECT::IDENTIFICATION</span>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none">
              PROJECT_{project.id}_01
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-8 gap-y-4 w-full md:w-fit border-l-0 md:border-l-2 border-lab-dark/10 pl-0 md:pl-8">
          <div className="flex flex-col">
            <span className="text-[9px] font-bold opacity-30 uppercase tracking-widest">ANALYSIS_DATE</span>
            <span className="text-sm font-black">{analysisDate}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] font-bold opacity-30 uppercase tracking-widest">STATUS</span>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-neon-a animate-pulse" />
              <span className="text-sm font-black text-neon-a bg-lab-dark px-2 py-0.5" style={{ background: '#000' }}>COMPLETED</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] font-bold opacity-30 uppercase tracking-widest">NUCLEOTIDE_TYPE</span>
            <span className="text-sm font-black" style={{ color: project.color }}>TYPE_{project.type} // SEQUENCE_ALPHA</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] font-bold opacity-30 uppercase tracking-widest">ANALYST</span>
            <span className="text-sm font-black">UHEECH_LAB_STATION</span>
          </div>
        </div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col gap-12 relative z-10"
      >
        {/* Project Title Banner */}
        <motion.div variants={itemVariants} className="flex flex-col gap-2">
          <div className="flex items-center gap-4">
            <Dna size={24} style={{ color: project.color }} />
            <span className="text-xs font-black tracking-[0.5em] text-lab-dark/40 uppercase">Research_Project_Summary</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-lab-dark uppercase border-l-8 pl-8" style={{ borderColor: project.color }}>
            {project.title}
          </h2>
        </motion.div>

        {/* 4-Stage Report Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-10">
          {sections.map((section) => (
            <motion.div 
              key={section.label} 
              variants={itemVariants}
              className="group p-8 border-2 border-lab-dark/5 hover:border-lab-dark transition-all h-full flex flex-col gap-6 relative overflow-hidden bg-lab-dark/[0.01]"
            >
              {/* Corner Index */}
              <div 
                className="absolute top-0 right-0 px-3 py-1 text-[10px] font-black text-white" 
                style={{ background: project.color }}
              >
                [{section.id}]
              </div>

              <div className="flex items-center gap-3 border-b-2 border-lab-dark/10 pb-4">
                <span className="text-lab-dark/60">{section.icon}</span>
                <span className="text-[14px] font-black tracking-[0.3em] uppercase">{section.label}</span>
              </div>
              
              <p className="text-[15px] leading-relaxed text-lab-dark/90 text-justify font-medium">
                {section.content}
              </p>

              {/* Decorative Elements */}
              <div className="mt-auto pt-6 flex justify-between items-center opacity-10 group-hover:opacity-40 transition-opacity">
                <div className="flex gap-1">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="w-[2px] h-3 bg-lab-dark" />
                  ))}
                </div>
                <span className="text-[9px] font-black uppercase">SECTION::{section.label.substring(0,3)}</span>
              </div>
              
              {/* Hover Glow Mask */}
              <div 
                className="absolute bottom-0 right-0 w-32 h-32 opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none translate-x-16 translate-y-16 rounded-full blur-3xl"
                style={{ background: project.color }}
              />
            </motion.div>
          ))}
        </div>

        {/* Conclusion / Digital Blueprint Data */}
        <motion.div variants={itemVariants} className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t-2 border-lab-dark/10">
          <div className="md:col-span-2 p-10 border-4 border-double border-lab-dark bg-lab-dark text-white flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <FlaskConical size={20} className="text-neon-a" />
              <span className="text-sm font-black tracking-widest uppercase">CONSOLIDATED_INSIGHT</span>
            </div>
            <p className="text-sm leading-relaxed italic opacity-90 font-medium">
              "본 실험은 {project.id} 도메인에서 관찰된 비효율 임계 지점을 학제간 융합 사고와 데이터 중심의 가설 검증을 통해 돌파하고자 한 시도였다. 
              {project.type} 염기 구조의 정합성에 기반한 고도의 설계 철학을 반영하여, 시스템 내부의 부조화를 기술적 완결성으로 승화시키는 성과를 도출했다."
            </p>
          </div>

          <div className="flex flex-col gap-6 justify-center bg-lab-dark/5 p-8 border-r-8 border-lab-dark">
            <span className="text-[10px] font-black tracking-widest uppercase opacity-40">SYSTEM_METRICS</span>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-[11px] font-bold">
                <span>RELIABILITY</span>
                <span className="text-neon-a">99.9%</span>
              </div>
              <div className="w-full h-1 bg-lab-dark/10">
                <div className="h-full bg-neon-a w-[99%]" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-[11px] font-bold">
                <span>SCALABILITY</span>
                <span className="text-neon-p">87.5%</span>
              </div>
              <div className="w-full h-1 bg-lab-dark/10">
                <div className="h-full bg-neon-p w-[87.5%]" />
              </div>
            </div>
            <div className="mt-2 text-[8px] opacity-30 break-all font-mono italic">
              HASH_VERIFY::0xFA01B22...[SUCCESS]
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ProjectReport;
