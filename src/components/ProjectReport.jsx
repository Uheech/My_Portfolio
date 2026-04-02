import React from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Search, 
  Cpu, 
  ShieldCheck, 
  TrendingUp, 
  FlaskConical, 
  Dna, 
  Tag, 
  Briefcase,
  Layers
} from 'lucide-react';
import { projectsData } from '../data/projects';

const ProjectReport = ({ projectId, onBack }) => {
  const project = projectsData[projectId];

  if (!project) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const sections = [
    { 
      label: '문제 정의 / 배경', 
      id: '01', 
      icon: <Search size={18} />, 
      content: project.problemBackground 
    },
    { 
      label: '가설 설정 / 로직 설계', 
      id: '02', 
      icon: <Cpu size={18} />, 
      content: project.hypothesisLogic 
    },
    { 
      label: '방법론 & QA', 
      id: '03', 
      icon: <ShieldCheck size={18} />, 
      content: project.methodologyQA.methodology,
      qaPoint: project.methodologyQA.qaPoint 
    },
    { 
      label: '인사이트 & 기대 효과', 
      id: '04', 
      icon: <TrendingUp size={18} />, 
      content: project.insightImpact 
    }
  ];

  const analysisDate = new Date().toISOString().split('T')[0].replace(/-/g, '.');

  return (
    <div className="min-h-screen bg-lab-bg p-6 md:p-12 lg:p-20 flex flex-col font-mono max-w-7xl mx-auto relative overflow-x-hidden">
      <div className="scan-line opacity-5" />
      
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.015] z-0 overflow-hidden select-none">
        <div className="absolute top-10 left-10 text-[18rem] font-black">{project.type}</div>
        <div className="absolute bottom-10 right-10 flex flex-col items-end">
          <span className="text-[8rem] font-light leading-none opacity-40">{projectId}</span>
          <span className="text-xs font-bold tracking-[0.8em]">LAB_STATION_ANALYSIS</span>
        </div>
      </div>

      {/* Header Meta */}
      <div className="flex flex-col md:flex-row justify-between items-start mb-16 relative z-10 border-b-2 border-lab-dark/20 pb-8 gap-8">
        <div className="flex flex-col gap-6 w-full md:w-1/2">
          <button 
            onClick={onBack}
            className="flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.2em] hover:bg-lab-dark hover:text-white px-4 py-2 border-2 border-lab-dark transition-all w-fit"
          >
            <ArrowLeft size={14} />
            <span>[ ← 메인으로 돌아가기 ]</span>
          </button>
          
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-lab-dark/30 tracking-widest uppercase mb-1">RECORD_IDENTIFICATION</span>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none">
              REPORT_{project.id}
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-10 gap-y-4 w-full md:w-fit px-0 md:px-8 border-l-0 md:border-l-2 border-lab-dark/10">
          <div className="flex flex-col">
            <span className="text-[9px] font-bold opacity-30 uppercase tracking-widest">분석 일자</span>
            <span className="text-xs font-black">{analysisDate}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] font-bold opacity-30 uppercase tracking-widest">분석 상태</span>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-neon-a animate-pulse" />
              <span className="text-[10px] font-black text-neon-a bg-lab-dark px-2 py-0.5" style={{ background: '#000' }}>검증됨</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] font-bold opacity-30 uppercase tracking-widest">시퀀스 코드</span>
            <span className="text-xs font-black" style={{ color: project.color }}>#{project.type}_{project.id}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] font-bold opacity-30 uppercase tracking-widest">책임 분석자</span>
            <span className="text-xs font-black">최유희 (UHEECH)</span>
          </div>
        </div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col gap-10 relative z-10"
      >
        {/* [PROJECT_OVERVIEW] Section Upgrade */}
        <motion.div 
          variants={itemVariants}
          className="bg-lab-dark text-white p-8 md:p-12 border-l-[12px] flex flex-col md:flex-row gap-10" 
          style={{ borderColor: project.color }}
        >
          <div className="flex flex-col gap-6 flex-1">
            <div className="flex items-center gap-3">
              <Dna size={18} style={{ color: project.color }} />
              <span className="text-[10px] font-black tracking-[0.4em] uppercase opacity-60 italic">[ 프로젝트 개요 ]</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-none uppercase">
              {project.title}
            </h2>
            <p className="text-sm md:text-base font-medium leading-relaxed opacity-80 border-t border-white/10 pt-4">
              {project.overview.definition}
            </p>
          </div>

          <div className="flex flex-col gap-8 md:w-1/3 border-l-0 md:border-l border-white/10 pl-0 md:pl-10">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-[10px] font-bold opacity-40 tracking-widest uppercase">
                <Briefcase size={12} />
                <span>Primary_Role</span>
              </div>
              <span className="text-sm font-black text-white/90 bg-white/5 py-1 px-3 border-l-2" style={{ borderColor: project.color }}>
                {project.overview.role}
              </span>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-[10px] font-bold opacity-40 tracking-widest uppercase">
                <Layers size={12} />
                <span>Tech_Stack</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.overview.techStack.map((tech, i) => (
                  <span key={i} className="text-[10px] font-bold px-2 py-1 bg-white/10 border border-white/5 hover:border-white/20 transition-all">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* 4-Stage Core Analysis Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {sections.map((section) => (
            <motion.div 
              key={section.label} 
              variants={itemVariants}
              className="group p-8 border-2 border-lab-dark/5 hover:border-lab-dark transition-all h-full flex flex-col gap-6 relative overflow-hidden bg-lab-dark/[0.01]"
            >
              <div 
                className="absolute top-0 right-0 px-3 py-1 text-[10px] font-black text-white" 
                style={{ background: project.color }}
              >
                [{section.id}]
              </div>

              <div className="flex items-center gap-3 border-b-2 border-lab-dark/10 pb-4">
                <span className="text-lab-dark/60">{section.icon}</span>
                <span className="text-[13px] font-black tracking-[0.25em] uppercase">{section.label}</span>
              </div>
              
              <div className="flex flex-col gap-6">
                <p className="text-[14px] leading-relaxed text-lab-dark/90 text-justify font-medium">
                  {section.content}
                </p>

                {/* Specialized QA Point Box */}
                {section.qaPoint && (
                  <div className="bg-lab-dark text-white p-6 border-l-4 border-neon-p flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                      <ShieldCheck size={14} className="text-neon-p" />
                      <span className="text-[10px] font-black tracking-widest uppercase text-neon-p">QA_Test_Point</span>
                    </div>
                    <p className="text-[12px] leading-relaxed italic opacity-90">
                      "{section.qaPoint}"
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-auto pt-6 flex justify-between items-center opacity-10 group-hover:opacity-40 transition-opacity">
                <div className="flex gap-1">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="w-[1.5px] h-3 bg-lab-dark" />
                  ))}
                </div>
                <span className="text-[8px] font-black uppercase">LOG::DATA_SYNC_SUCCESS</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Conclusion / Insight Banner */}
        <motion.div variants={itemVariants} className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8 pt-10 border-t-2 border-lab-dark/10">
          <div className="md:col-span-2 p-10 border-4 border-double border-lab-dark bg-lab-dark text-white flex flex-col gap-6 relative overflow-hidden">
            <div className="flex items-center gap-3 relative z-10">
              <FlaskConical size={20} className="text-neon-a" />
              <span className="text-sm font-black tracking-widest uppercase">CONSOLIDATED_LOG_SUMMARY</span>
            </div>
            <p className="text-sm leading-relaxed italic opacity-90 font-medium relative z-10">
              "본 실험은 데이터 품질 보증(QA)의 무결성 철학을 바탕으로, 비즈니스 지표의 신뢰 임계점을 확보하고자 한 시도였다. 
              설계 초기 단계부터 예외 Case를 철저히 관리하여 시스템의 변동성을 최소화하고, 최종적으로 데이터 중심 의사결정의 완결성을 입증하는 성과를 도출했다."
            </p>
            <Dna className="absolute -bottom-10 -right-10 w-40 h-40 opacity-5 -rotate-12" />
          </div>

          <div className="flex flex-col gap-6 justify-center bg-lab-dark/5 p-8 border-r-8 border-lab-dark">
            <span className="text-[10px] font-black tracking-widest uppercase opacity-40">INTEGRITY_METRICS</span>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-[11px] font-bold">
                <span>DATA_CONSISTENCY</span>
                <span className="text-neon-a">99.9%</span>
              </div>
              <div className="w-full h-1 bg-lab-dark/10">
                <div className="h-full bg-neon-a w-[99.9%]" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <span>QA_VERIFICATION_LOAD</span>
              <div className="w-full h-1 bg-lab-dark/10">
                <div className="h-full bg-neon-p w-[75%]" />
              </div>
            </div>
            <div className="mt-2 text-[8px] opacity-30 break-all font-mono italic">
              VERIFY_HASH::0x8D9E22...[DATA_SECURE]
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ProjectReport;
