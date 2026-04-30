import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  Layers,
  GitBranch,
  ExternalLink,
  ChevronRight,
  Monitor,
  Database,
  Terminal, Download,
  FileCode,
  X,
  Maximize2
} from 'lucide-react';
import { projectsData } from '../data/projects';

const ProjectReport = ({ projectId, onBack }) => {
  const project = projectsData[projectId];
  const [selectedSnapshot, setSelectedSnapshot] = useState(null);

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
      content: project.problemBackground || ""
    },
    {
      label: '가설 설정 / 로직 설계',
      id: '02',
      icon: <Cpu size={18} />,
      content: project.hypothesisLogic || ""
    },
    {
      label: '방법론 & QA',
      id: '03',
      icon: <ShieldCheck size={18} />,
      content: project.methodologyQA?.methodology || "",
      qaPoint: project.methodologyQA?.qaPoint || ""
    },
    {
      label: '인사이트 & 기대 효과',
      id: '04',
      icon: <TrendingUp size={18} />,
      content: project.insightImpact || ""
    }
  ];

  const analysisDate = new Date().toISOString().split('T')[0].replace(/-/g, '.');

  return (
    <div className="min-h-screen bg-[#FBFBFA] p-4 sm:p-8 md:p-12 lg:p-20 flex flex-col font-mono max-w-7xl mx-auto relative overflow-x-hidden paper-texture">
      {/* 🔬 LAB_SYSTEM_OVERLAYS */}
      <div className="fixed inset-0 pointer-events-none z-0 lab-grid opacity-30" />
      <div className="scan-line opacity-[0.02] pointer-events-none" />

      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-0 overflow-hidden select-none">
        <div className="absolute top-10 left-10 text-[18rem] font-black text-lab-dark/10">{project.type}</div>
        <div className="absolute bottom-10 right-10 flex flex-col items-end">
          <span className="text-[8rem] font-light leading-none opacity-20 text-lab-dark">{projectId}</span>
          <span className="text-xs font-bold tracking-[0.8em] text-lab-dark/40">LAB_STATION_ANALYSIS_WHITE_VER</span>
        </div>
      </div>

      {/* Header Meta: Security & ID */}
      <div className="flex justify-between items-center mb-10 relative z-[120] border-b border-lab-dark/10 pb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.2em] bg-lab-dark text-white hover:bg-black px-5 py-2.5 border border-lab-dark transition-all w-fit shadow-lg shadow-lab-dark/10"
        >
          <ArrowLeft size={14} />
          <span>[ ← 메인으로 돌아가기 ]</span>
        </button>
      </div>
      <div className="relative flex-1">
        {/* 🚧 PREPARING_OVERLAY: For DATA/QA only - Fixed to viewport */}
        {projectId === 'DATA/QA' && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-20">
            <div className="absolute inset-0 backdrop-blur-[40px] bg-[#FBFBFA]/60 pointer-events-none" />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="relative z-[110] flex flex-col items-center gap-8 text-center"
            >
              <div className="p-6 bg-lab-dark text-white rounded-full shadow-2xl animate-pulse">
                <Terminal size={48} />
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="text-3xl sm:text-6xl md:text-8xl font-black text-lab-dark tracking-tighter uppercase">
                  준비중입니다
                </h2>
                <div className="flex items-center justify-center gap-4">
                  <div className="h-[1px] w-12 bg-lab-dark/20" />
                  <p className="text-[12px] font-black tracking-[0.6em] text-lab-dark/60 uppercase">
                    Project_Under_Construction
                  </p>
                  <div className="h-[1px] w-12 bg-lab-dark/20" />
                </div>
              </div>
              <p className="text-sm font-medium text-lab-dark/40 max-w-sm italic">
                해당 프로젝트의 Lab 리포트는 현재 데이터 무결성 검증 및 시각화 작업 중에 있습니다.
              </p>
            </motion.div>
          </div>
        )}

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className={`flex flex-col gap-16 relative z-10 transition-all duration-700 ${projectId === 'DATA/QA' ? 'pointer-events-none select-none blur-[15px] opacity-30 h-[50vh] overflow-hidden' : ''}`}
        >
          <motion.div variants={itemVariants} className="flex flex-col gap-10">
          <div className="flex items-center gap-4">
            <h3 className="text-lg font-black tracking-widest uppercase flex items-center gap-3 text-lab-dark">
              <Layers size={20} className="text-lab-dark/20" />
              01. 프로젝트 개요
            </h3>
            <div className="flex-1 h-[1px] bg-lab-dark/10" />
          </div>

          <motion.div
            variants={itemVariants}
            className="glass-lab p-8 md:p-14 border-l-[16px] flex flex-col gap-10 relative overflow-hidden"
            style={{ borderLeftColor: project.color }}
          >
            <div className="absolute -bottom-20 -right-20 p-4 opacity-[0.05] pointer-events-none rotate-12 text-lab-dark">
              <Dna size={400} strokeWidth={0.5} />
            </div>

            {/* MAIN CONTENT AREA (Unified Left Align) */}
            <div className="flex flex-col gap-10 relative z-10 max-w-5xl">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col md:flex-row justify-between items-start gap-8 w-full">
                  <h2 className="text-xl sm:text-3xl md:text-5xl font-black tracking-tight leading-[1.2] uppercase text-lab-dark text-left flex-1">
                    {project.title.includes(':') ? (
                      <>
                        {project.title.split(':')[0]} <br />
                        <span className="text-sm sm:text-xl md:text-2xl opacity-40 block mt-2 font-bold">{project.title.split(':')[1]}</span>
                      </>
                    ) : project.title}
                  </h2>

                  {/* Result Links (Relocated to Top Right) */}
                  <div className="flex flex-col items-end gap-2 pt-1 shrink-0">
                    <div className="flex items-center gap-2 text-[10px] font-black opacity-30 tracking-[0.2em] text-lab-dark uppercase">
                      <ExternalLink size={12} /><span>결과물</span>
                    </div>
                    <div className="flex gap-3">
                      {project.links?.repo && (
                        <a href={project.links?.repo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 py-2 px-4 bg-lab-dark text-white text-[11px] font-black hover:bg-black transition-all shadow-lg shadow-black/10">
                          <GitBranch size={14} /><span>GITHUB</span>
                        </a>
                      )}
                      {project.links?.demo && (
                        <a 
                          href={project.links?.demo} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          download={project.displayMode === 'presentation' && project.links.demo.endsWith('.pptx') ? true : undefined}
                          className="flex items-center gap-2 py-2 px-4 bg-white border-2 border-lab-dark text-[11px] font-black text-lab-dark hover:bg-lab-dark hover:text-white transition-all shadow-lg shadow-black/5"
                        >
                          {project.displayMode === 'presentation' ? (
                            <>{project.links.demo.endsWith('.pdf') ? <Monitor size={14} /> : <Download size={14} />}<span>{project.links.demo.endsWith('.pdf') ? 'VIEW_FULL_PDF' : 'DOWNLOAD_PPT'}</span></>
                          ) : (
                            <><ExternalLink size={14} /><span>LIVE_DEMO</span></>
                          )}
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Thin Separator */}
                <div className="h-[1px] w-full bg-lab-dark/10" />

                {/* Summary Keywords (Highlights) - Positioned right under title */}
                {project.overview.summaryKeywords && (
                  <div className="flex flex-wrap gap-3 md:gap-4 mt-2">
                    {project.overview.summaryKeywords.map((kw, i) => (
                      <span key={i} className="text-base sm:text-lg md:text-xl font-black text-lab-dark flex items-center gap-2">
                        <span style={{ color: project.color }}>{kw.split(' ')[0]}</span>
                        <span>{kw.split(' ').slice(1).join(' ')}</span>
                        {i < project.overview.summaryKeywords.length - 1 && <span className="opacity-20 ml-2 hidden sm:inline">|</span>}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <p className="text-sm sm:text-[15px] font-medium leading-[1.8] text-lab-dark/60 max-w-3xl italic whitespace-pre-line text-left">
                " {project.overview.definition} "
              </p>

              <div className="flex flex-col gap-3 mt-4">
                <div className="flex items-center gap-2 text-[11px] font-black opacity-60 tracking-[0.2em] text-lab-dark uppercase">
                  <Briefcase size={16} /><span>담당 역할</span>
                </div>
                <span className="text-lg sm:text-xl md:text-2xl font-black text-lab-dark uppercase border-b-4 border-lab-dark/10 pb-2 w-fit">
                  {project.overview.role}
                </span>
              </div>

              {/* Role Cards UI (Unified Left Design) */}
              {project.overview.roleCards ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
                  {project.overview.roleCards.map((card, ci) => (
                    <div key={ci} className="bg-lab-dark/[0.03] backdrop-blur-sm border border-lab-dark/5 p-8 flex flex-col gap-6 hover:bg-white/60 transition-all group rounded-sm shadow-sm">
                      <div className="flex items-center gap-3 border-b border-lab-dark/10 pb-4">
                        <span className="text-2xl">{card.icon}</span>
                        <span className="text-base font-black tracking-widest uppercase text-lab-dark">{card.category}</span>
                      </div>

                      <ul className="flex flex-col gap-4 flex-1">
                        {card.items.map((item, ii) => (
                          <li key={ii} className="text-[14px] leading-relaxed text-lab-dark/80 font-medium list-none flex gap-3">
                            <span className="mt-2 shrink-0 w-1.5 h-1.5 bg-lab-dark/20 rounded-full" />
                            <span
                              dangerouslySetInnerHTML={{
                                __html: item.replace(/\*\*(.*?)\*\*/g, '<strong class="font-black text-lab-dark" style="box-shadow: inset 0 -6px 0 rgba(165, 105, 189, 0.2)">$1</strong>')
                              }}
                            />
                          </li>
                        ))}
                      </ul>

                      {/* Tech Tags at the Bottom */}
                      <div className="flex flex-wrap gap-2 pt-6 border-t border-lab-dark/5">
                        {card.tech?.map((t, ti) => (
                          <span key={ti} className="text-[10px] font-black px-2 py-1 bg-lab-dark/5 text-lab-dark/40 border border-lab-dark/5 uppercase tracking-tighter">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : project.overview.roleDetail && (
                <div className="flex flex-col gap-5 mt-4 border-t border-lab-dark/10 pt-6">
                  {project.overview.roleDetail.map((section, si) => (
                    <div key={si} className="flex flex-col gap-2">
                      <span className="text-[11px] font-black text-lab-dark tracking-wider uppercase opacity-70">{section.category}</span>
                      <ul className="flex flex-col gap-2">
                        {section.items.map((item, ii) => (
                          <li key={ii} className="flex items-start gap-2 text-[12px] leading-[1.7] text-lab-dark/75 font-medium">
                            <span className="mt-1.5 shrink-0 w-1 h-1 rounded-full bg-lab-dark/40" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>

        {/* 02. 스크린샷 (RESEARCH_SAMPLES) - Only show if not in presentation mode */}
        {project.displayMode !== 'presentation' && project.snapshots && (
          <motion.div variants={itemVariants} className="flex flex-col gap-10">
          <div className="flex items-center gap-4">
            <h3 className="text-lg font-black tracking-widest uppercase flex items-center gap-3 text-lab-dark">
              <Monitor size={20} className="text-lab-dark/20" />
              02. 스크린샷
            </h3>
            <div className="flex-1 h-[1px] bg-lab-dark/10" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {project.snapshots.map((shot, i) => (
              <div
                key={i}
                className="flex flex-col gap-6 group cursor-zoom-in"
                onClick={() => setSelectedSnapshot(shot)}
              >
                <div className="relative aspect-video overflow-hidden border border-lab-dark/10 group-hover:border-lab-dark transition-all duration-700 bg-lab-dark/5 shadow-inner">
                  <img
                    src={shot.img}
                    alt={shot.title}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105 filter grayscale-[20%] group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-lab-dark/20 via-transparent to-transparent opacity-60" />

                  {/* Zoom Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/90 p-3 rounded-full shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <Maximize2 size={20} className="text-lab-dark" />
                    </div>
                  </div>

                  <div className="absolute bottom-4 left-4 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full animate-pulse shadow-sm shadow-black/20" style={{ background: project.color }} />
                    <span className="text-[11px] font-bold text-white tracking-[0.3em] uppercase drop-shadow-md">{shot.title}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2 pl-4 border-l-2 border-lab-dark/10 group-hover:border-lab-dark transition-all">
                  <span className="text-[11px] font-black opacity-20 uppercase tracking-[0.2em] text-lab-dark">Capture_Description</span>
                  <p className="text-[11px] font-medium leading-relaxed text-lab-dark/60 italic font-mono">
                    {shot.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

        {/* 03. 개발 과정 (NARRATIVE_HISTORY) - Only show if not in presentation mode */}
        {project.displayMode !== 'presentation' && project.problemBackground && (
          <motion.div variants={itemVariants} className="flex flex-col gap-10">
          <div className="flex items-center gap-4">
            <h3 className="text-lg font-black tracking-widest uppercase flex items-center gap-3 text-lab-dark">
              <Cpu size={20} className="text-lab-dark/20" />
              03. 개발 과정
            </h3>
            <div className="flex-1 h-[1px] bg-lab-dark/10" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {[
              { id: '01', title: '문제 정의', content: project.problemBackground, icon: <Search size={18} /> },
              { id: '02', title: '구현 로직', content: project.hypothesisLogic, icon: <Cpu size={18} /> },
              { id: '03', title: '검증 및 고도화', content: project.methodologyQA.methodology, icon: <ShieldCheck size={18} />, qa: project.methodologyQA.qaPoint }
            ].map((log, idx) => (
              <motion.div
                key={idx}
                custom={idx}
                variants={itemVariants}
                className="group p-8 border border-lab-dark/10 hover:border-lab-dark/30 transition-all duration-500 h-full flex flex-col gap-6 relative overflow-hidden bg-white shadow-sm hover:shadow-xl rounded-sm"
              >
                {/* Step Indicator */}
                <div className="flex items-center gap-3 border-b border-lab-dark/10 pb-5">
                  <div className="w-12 h-12 rounded-full bg-lab-dark/5 flex items-center justify-center text-lab-dark group-hover:bg-lab-dark group-hover:text-white transition-colors duration-500">
                    <span className="text-[10px] font-black font-mono">STEP_{log.id}</span>
                  </div>
                  <span className="text-base font-black tracking-tight uppercase text-lab-dark">{log.title}</span>
                </div>

                <div className="flex flex-col gap-6 flex-1">
                  <div className="flex flex-col gap-5">
                    {log.content.split('\n').map((paragraph, pIdx) => (
                      <p 
                        key={pIdx}
                        className="text-[14px] leading-[1.8] tracking-tight text-lab-dark/80 text-justify font-medium"
                        dangerouslySetInnerHTML={{ 
                          __html: paragraph.replace(/\*\*(.*?)\*\*/g, `<strong class="font-black text-lab-dark inline-block px-1" style="box-shadow: inset 0 -6px 0 rgba(165, 105, 189, 0.2)">$1</strong>`) 
                        }}
                      />
                    ))}
                  </div>

                  {log.qa && (
                    <div className="bg-[#F8FAFC] text-lab-dark p-8 border-l-[6px] flex flex-col gap-4 shadow-inner border-lab-dark/10" style={{ borderLeftColor: project.color }}>
                      <div className="flex items-center gap-3">
                        <ShieldCheck size={16} style={{ color: project.color }} />
                        <span className="text-[11px] font-black tracking-[0.4em] uppercase opacity-50">QA_VALIDATION_POINT</span>
                      </div>
                      <div className="h-[1px] w-full bg-lab-dark/5" />
                      <p className="text-[14px] leading-[1.8] italic font-medium text-lab-dark/80 whitespace-pre-line">
                        " {log.qa} "
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

        {/* 04. 통합 결론 및 회고 (FINAL_SYNTHESIS) */}
        <motion.div variants={itemVariants} className="flex flex-col gap-10">
          <div className="flex items-center gap-4">
            <h3 className="text-lg font-black tracking-widest uppercase flex items-center gap-3 text-lab-dark">
              <FlaskConical size={20} className="text-lab-dark/20" />
              04. 통합 결론 및 회고
            </h3>
            <div className="flex-1 h-[1px] bg-lab-dark/10" />
          </div>

          <div className="glass-lab p-6 sm:p-10 border border-lab-dark/10 shadow-sm relative overflow-hidden group">
            <div className={`flex flex-col gap-6 relative z-10 ${project.displayMode === 'presentation' ? '' : 'max-w-4xl border-l-[4px] border-lab-dark/20 pl-4 sm:pl-8 ml-1 sm:ml-2'}`}>
              <div className="text-[13px] sm:text-[14px] md:text-lg leading-[1.8] md:leading-[2] italic text-lab-dark font-medium w-full">
                {project.displayMode === 'presentation' ? (
                  <div className="flex flex-col gap-4">
                    {/* Lab Station PDF Header */}
                    <div className="flex items-center justify-between border-b border-lab-dark/20 pb-4 px-2">
                       <div className="flex items-center gap-3">
                         <div className="w-2.5 h-2.5 rounded-full bg-lab-dark animate-pulse" />
                         <span className="text-[11px] font-black tracking-[0.3em] uppercase opacity-70">Analysis_Equipment // Station_001_PDF_Preview</span>
                       </div>
                       <span className="text-[10px] font-mono opacity-40 uppercase tracking-widest hidden md:block">Streaming_Data_Protocol_v3.2</span>
                    </div>

                    {/* PDF Iframe Container */}
                    <div className="relative aspect-[4/3] w-full bg-lab-dark/5 border border-lab-dark/10 shadow-inner overflow-hidden rounded-sm">
                       <iframe 
                         src={`${project.links.demo}#toolbar=0&navpanes=0&scrollbar=0`}
                         className="w-full h-full border-none"
                         title="Project Presentation Preview"
                       />
                       
                       {/* Overlay Decoration */}
                       <div className="absolute top-4 right-4 text-[10px] font-mono text-lab-dark/20 rotate-90 select-none">
                         SERIAL_ID_{project.id}_REV_00
                       </div>
                    </div>

                    <div className="flex items-center gap-3 mt-2 text-[11px] font-medium opacity-50 not-italic">
                      <Monitor size={14} />
                      <span>위 화면은 실시간 미리보기입니다. 전체 내용을 보시려면 상단 버튼을 통해 PDF를 직접 열어주세요.</span>
                    </div>
                  </div>
                ) : (
                  project.insightImpact?.split('\n').map((line, i) => (
                    <span 
                      key={i} 
                      className="block mb-4 last:mb-0"
                      dangerouslySetInnerHTML={{ 
                        __html: line.replace(/\*\*(.*?)\*\*/g, `<strong class="font-black text-lab-dark inline-block px-1" style="box-shadow: inset 0 -6px 0 rgba(165, 105, 189, 0.2)">$1</strong>`) 
                      }}
                    />
                  ))
                )}
              </div>
            </div>
            <div className="absolute top-4 right-4 text-[5rem] font-black opacity-5 select-none pointer-events-none group-hover:opacity-10 transition-opacity text-lab-dark">
              {project.id}
            </div>
            <Dna size={300} className="absolute -bottom-20 -right-20 opacity-[0.03] -rotate-12 animate-pulse text-lab-dark" />
          </div>
        </motion.div>

        {/* 05. 기술 스택 요약 (SYSTEM_SPECS) - Only show if not in presentation mode */}
        {project.displayMode !== 'presentation' && project.keyFeatures && (
          <motion.div variants={itemVariants} className="flex flex-col gap-10">
          <div className="flex items-center gap-4">
            <h3 className="text-lg font-black tracking-widest uppercase flex items-center gap-3 text-lab-dark">
              <Terminal size={20} className="text-lab-dark/20" />
              05. 기술 스택 요약
            </h3>
            <div className="flex-1 h-[1px] bg-lab-dark/10" />
          </div>

          <div className="glass-lab p-10 border border-lab-dark/10 shadow-sm relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-lab-dark/[0.02] border-l border-b border-lab-dark/5 -rotate-45 translate-x-16 -translate-y-16" />

            <div className="flex flex-col relative z-10">

              <ul className="flex flex-col gap-5">
                {project.keyFeatures.map((feature, i) => {
                  // Separating the title (before colon) and the rest
                  const hasBoldTitle = feature.startsWith('**') && feature.includes('**:');
                  let renderedHtml = feature;

                  if (hasBoldTitle) {
                    const parts = feature.split('**:');
                    const title = parts[0].replace('**', '');
                    const rest = parts.slice(1).join('**:');
                    
                    // Apply special styling to title with project color shadow
                    renderedHtml = `<strong class="font-black text-lab-dark inline-block px-1 mr-1" style="box-shadow: inset 0 -8px 0 ${project.color}33">${title}</strong>: ${rest}`;
                  }

                  // Handle remaining bold tags in the rest of the text (without shadow)
                  renderedHtml = renderedHtml.replace(/\*\*(.*?)\*\*/g, '<strong class="font-black text-lab-dark">$1</strong>');

                  return (
                    <li
                      key={i}
                      className="flex items-start gap-4 transition-all hover:translate-x-1 group"
                    >
                      <span className="text-lab-dark/40 font-mono mt-0.5 group-hover:text-lab-dark transition-colors">—</span>
                      <p
                        className="text-[15px] font-medium tracking-tight leading-relaxed text-lab-dark/80 group-hover:text-lab-dark transition-colors"
                        dangerouslySetInnerHTML={{ __html: renderedHtml }}
                      />
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Subtle watermark */}
            <Dna size={120} className="absolute -bottom-6 -right-6 opacity-[0.03] rotate-12 text-lab-dark" />
          </div>
        </motion.div>
      )}
      </motion.div>
    </div>

      {/* 🔬 LIGHTBOX_OVERLAY: Zoomed View */}
      <AnimatePresence>
        {selectedSnapshot && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedSnapshot(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-lab-dark/95 backdrop-blur-xl p-4 md:p-12 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-6xl w-full flex flex-col gap-6 cursor-default"
            >
              {/* Image Container */}
              <div className="relative aspect-video bg-black overflow-hidden border border-white/10 shadow-2xl">
                <img
                  src={selectedSnapshot.img}
                  alt={selectedSnapshot.title}
                  className="w-full h-full object-contain"
                />

                {/* Close Button */}
                <button
                  onClick={() => setSelectedSnapshot(null)}
                  className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 border border-white/10 text-white transition-all backdrop-blur-md rounded-full"
                >
                  <X size={24} />
                </button>

                {/* Status Bar */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ background: project.color }} />
                    <span className="text-xs font-black tracking-[0.4em] text-white uppercase opacity-80">LIVE_DATA_CAPTURE // {selectedSnapshot.title}</span>
                  </div>
                </div>
              </div>

              {/* Description Box */}
              <div className="bg-white/5 border border-white/10 p-8 flex flex-col gap-4 backdrop-blur-sm">
                <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                  <Monitor size={18} className="text-white/40" />
                  <span className="text-sm font-black text-white tracking-widest uppercase">Analysis_Snapshot_Report</span>
                </div>
                <p className="text-base text-white/70 leading-relaxed font-medium italic">
                  {selectedSnapshot.desc}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer Decoration */}
      <footer className="mt-20 pt-10 border-t border-lab-dark/10 flex justify-between items-center opacity-40 relative z-10">
        <div className="flex flex-col">
          <span className="text-[10px] font-black tracking-widest">유희'S LAB ARCHIVE</span>

        </div>
      </footer>
    </div>
  );
};

export default ProjectReport;
