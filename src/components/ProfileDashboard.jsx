import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { personalInfo } from '../data/personalInfo';
import { 
  User, 
  Briefcase, 
  GraduationCap, 
  Target, 
  ShieldCheck, 
  X,
  Fingerprint,
  Zap
} from 'lucide-react';

const ProfileDashboard = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Blur */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-lab-dark/10 backdrop-blur-md z-[40] pointer-events-auto"
          />

          {/* Profile Panel */}
          <motion.div
            initial={{ x: '-100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '-100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 120 }}
            className="fixed top-0 left-0 h-screen w-full md:w-[600px] bg-lab-bg border-r-4 border-lab-dark z-[50] p-10 font-mono shadow-2xl flex flex-col gap-10 overflow-y-auto"
          >
            <div className="scan-line pointer-events-none opacity-5" />

            {/* Header: Analyst ID Card Style */}
            <div className="flex justify-between items-start border-b-4 border-lab-dark pb-8">
              <div className="flex gap-6 items-center">
                <div className="w-24 h-24 bg-lab-dark flex items-center justify-center relative overflow-hidden group">
                   <Fingerprint size={60} className="text-white opacity-20 group-hover:scale-110 transition-transform" />
                   <div className="absolute inset-0 border-2 border-neon-a/30 animate-pulse" />
                   {/* Scanning line animation */}
                   <motion.div 
                     animate={{ y: [0, 96, 0] }}
                     transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                     className="absolute top-0 left-0 w-full h-[1px] bg-neon-a shadow-[0_0_10px_#2ECC71]"
                   />
                </div>
                <div className="flex flex-col gap-1">
                   <div className="flex items-center gap-2">
                     <span className="text-[10px] font-black bg-lab-dark text-white px-2 py-0.5 tracking-widest uppercase">ID::VERIFIED</span>
                   </div>
                   <h2 className="text-4xl font-black tracking-tighter uppercase leading-none">
                     {personalInfo.identity.name}
                   </h2>
                   <span className="text-xs font-bold text-lab-dark/60 tracking-widest uppercase italic">
                     {personalInfo.identity.fullName}
                   </span>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-lab-dark hover:text-white transition-all border-2 border-lab-dark"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content Body */}
            <div className="flex flex-col gap-10">
              {/* Introduction */}
              <SectionWrapper title="IDENTITY_PURPOSE" icon={<User size={16} />}>
                <p className="text-[14px] leading-relaxed font-bold text-lab-dark/80 text-justify border-l-4 border-lab-dark pl-4">
                  {personalInfo.identity.bio}
                </p>
                <div className="mt-4 flex gap-4 text-[9px] font-black opacity-40 italic">
                   <span>LOC: {personalInfo.identity.location}</span>
                   <span>ST: {personalInfo.identity.status}</span>
                </div>
              </SectionWrapper>

              {/* Core Expertise / Radar Style Indicators */}
              <SectionWrapper title="CORE_COMPETENCIES" icon={<Target size={16} />}>
                <div className="flex flex-col gap-4">
                  {personalInfo.expertise.map((exp, i) => (
                    <div key={i} className="flex flex-col gap-1.5">
                      <div className="flex justify-between text-[11px] font-black">
                        <span>{exp.skill}</span>
                        <span className="text-neon-a">{exp.level}%</span>
                      </div>
                      <div className="w-full h-1 bg-lab-dark/10 relative">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${exp.level}%` }}
                          transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                          className={`h-full ${exp.type === 'CORE' ? 'bg-lab-dark' : 'bg-lab-dark/40'}`} 
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </SectionWrapper>

              {/* Career Log */}
              <SectionWrapper title="EXPERIENCE_CHRONICLE" icon={<Briefcase size={16} />}>
                <div className="flex flex-col gap-6">
                  {personalInfo.career.map((job, i) => (
                    <div key={i} className="border-l-2 border-lab-dark/20 pl-6 relative">
                      <div className="absolute left-[-5px] top-1.5 w-2 h-2 rounded-full bg-lab-dark" />
                      <div className="flex justify-between items-baseline mb-1">
                        <h4 className="text-sm font-black uppercase text-lab-dark">{job.role}</h4>
                        <span className="text-[10px] font-bold opacity-40">{job.period}</span>
                      </div>
                      <div className="text-[11px] font-black text-neon-p mb-2">{job.company}</div>
                      <p className="text-[12px] opacity-70 leading-relaxed italic">{job.description}</p>
                    </div>
                  ))}
                </div>
              </SectionWrapper>

              {/* Academic & Credentials */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <SectionWrapper title="ACADEMIC" icon={<GraduationCap size={16} />}>
                  {personalInfo.education.map((edu, i) => (
                    <div key={i} className="flex flex-col gap-1">
                      <span className="text-[12px] font-black">{edu.school}</span>
                      <span className="text-[10px] font-bold opacity-40 italic">{edu.degree}</span>
                    </div>
                  ))}
                </SectionWrapper>
                <SectionWrapper title="CERTIFICATES" icon={<ShieldCheck size={16} />}>
                   <div className="flex flex-wrap gap-2">
                     {personalInfo.credentials.map((cert, i) => (
                       <span key={i} className="text-[9px] font-black border border-lab-dark/20 px-2 py-0.5 hover:bg-lab-dark hover:text-white transition-all cursor-default">
                         {cert.id}
                       </span>
                     ))}
                   </div>
                </SectionWrapper>
              </div>
            </div>

            {/* Footer Sign-off */}
            <div className="mt-auto pt-10 border-t border-lab-dark/10 flex justify-between items-center opacity-30">
               <div className="flex gap-2 items-center">
                 <Zap size={14} />
                 <span className="text-[10px] font-bold uppercase tracking-widest">Analyst_Signature_Verified</span>
               </div>
               <span className="text-[8px] italic">0xFA22_B1...</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const SectionWrapper = ({ title, icon, children }) => (
  <div className="flex flex-col gap-4">
    <div className="flex items-center gap-3 border-b-2 border-lab-dark/5 pb-2">
      <span className="text-lab-dark/40">{icon}</span>
      <span className="text-[11px] font-black tracking-[0.3em] uppercase text-lab-dark/40">{title}</span>
    </div>
    {children}
  </div>
);

export default ProfileDashboard;
