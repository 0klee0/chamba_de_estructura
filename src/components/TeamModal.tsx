import React, { useEffect } from 'react';
import { X, Building, BookMarked, Calendar, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TeamMember } from '../types';
import { ProjectMetadata } from '../data/teamMembers';

interface TeamModalProps {
  isOpen: boolean;
  onClose: () => void;
  metadata: ProjectMetadata;
  members: TeamMember[];
}

export const TeamModal: React.FC<TeamModalProps> = ({
  isOpen,
  onClose,
  metadata,
  members,
}) => {
  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 select-none">
          {/* Fluid Backdrop with notable blur and transparency */}
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(16px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            onClick={onClose}
            className="fixed inset-0 bg-neutral-950/70 dark:bg-black/80"
          />

          {/* Fluid Translucent Modal Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20, filter: 'blur(8px)' }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.94, y: 14, filter: 'blur(6px)' }}
            transition={{ type: 'spring', damping: 26, stiffness: 320 }}
            className="relative w-full max-w-xl bg-white/95 dark:bg-[#121212]/95 backdrop-blur-2xl border border-neutral-300/80 dark:border-neutral-700/80 shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto select-text z-10 transition-colors"
          >
            <div className="flex items-start justify-between border-b border-neutral-200/90 dark:border-neutral-800 pb-4 mb-6">
              <div>
                <span className="text-[11px] uppercase tracking-widest text-neutral-500 dark:text-neutral-400 font-mono">
                  Ficha Técnica Universitaria
                </span>
                <h2 className="text-xl sm:text-2xl font-serif text-neutral-900 dark:text-white font-semibold mt-1">
                  Comité Académico & Autores
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 border border-neutral-200 dark:border-neutral-700 bg-white/80 dark:bg-neutral-900/80 text-neutral-500 hover:text-neutral-950 dark:hover:text-white hover:border-neutral-900 dark:hover:border-neutral-400 transition-all cursor-pointer"
                aria-label="Cerrar modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Institutional details with subtle glass styling */}
            <div className="bg-neutral-50/80 dark:bg-[#1A1A1A]/80 backdrop-blur-md border border-neutral-200/80 dark:border-neutral-800 p-4 mb-6 text-xs text-neutral-700 dark:text-neutral-300 space-y-2">
              <div className="flex items-center gap-2">
                <Building className="w-4 h-4 text-neutral-500 dark:text-neutral-400 shrink-0" />
                <span className="font-semibold text-neutral-900 dark:text-white">Institución:</span>
                <span>{metadata.institution} — {metadata.faculty}</span>
              </div>
              <div className="flex items-center gap-2">
                <BookMarked className="w-4 h-4 text-neutral-500 dark:text-neutral-400 shrink-0" />
                <span className="font-semibold text-neutral-900 dark:text-white">Asignatura:</span>
                <span>{metadata.course}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-neutral-500 dark:text-neutral-400 shrink-0" />
                <span className="font-semibold text-neutral-900 dark:text-white">Fecha de Publicación:</span>
                <span>{metadata.date}</span>
              </div>
            </div>

            {/* Members list - Read-only */}
            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 pb-2">
                <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
                  Integrantes ({members.length})
                </h3>
                <span className="text-[10px] font-mono text-neutral-400 dark:text-neutral-500">
                  Registro Oficial
                </span>
              </div>

              <div className="divide-y divide-neutral-200 dark:divide-neutral-800 border border-neutral-200 dark:border-neutral-800">
                {members.map((member, idx) => (
                  <div key={idx} className="p-4 bg-white/60 dark:bg-[#141414]/60 hover:bg-neutral-50/80 dark:hover:bg-[#1C1C1C]/80 transition-colors flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-neutral-100 dark:bg-[#222] border border-neutral-200 dark:border-neutral-700 flex items-center justify-center text-neutral-700 dark:text-neutral-300">
                        <User className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-neutral-900 dark:text-white">
                          {member.name}
                        </h4>
                        <div className="text-xs text-neutral-600 dark:text-neutral-400 font-mono mt-0.5">
                        
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono border border-neutral-300 dark:border-neutral-700 px-2 py-0.5 text-neutral-500 dark:text-neutral-400">
                      0{idx + 1}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-neutral-200 dark:border-neutral-800 pt-4 flex items-center justify-end">
              <button
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium tracking-wide uppercase bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors shadow-xs cursor-pointer"
              >
                Cerrar
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

