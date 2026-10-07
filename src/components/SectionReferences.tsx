import React, { useState } from 'react';
import { BookMarked, Copy, Check, ExternalLink, FileText, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { IEEE_REFERENCES, formatIEEEReference, formatBibTeX } from '../data/academicContent';

export const SectionReferences: React.FC = () => {
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [copiedAll, setCopiedAll] = useState<boolean>(false);
  const [copiedBibtex, setCopiedBibtex] = useState<boolean>(false);
  const [showAll, setShowAll] = useState<boolean>(false);

  const initialRefs = IEEE_REFERENCES.slice(0, 5);
  const remainingRefs = IEEE_REFERENCES.slice(5);

  const handleCopySingle = (id: number, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCopyAllIEEE = () => {
    const fullText = IEEE_REFERENCES.map(ref => formatIEEEReference(ref)).join('\n\n');
    navigator.clipboard.writeText(fullText);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  const handleCopyBibTeX = () => {
    const fullBibtex = IEEE_REFERENCES.map(ref => formatBibTeX(ref)).join('\n\n');
    navigator.clipboard.writeText(fullBibtex);
    setCopiedBibtex(true);
    setTimeout(() => setCopiedBibtex(false), 2000);
  };

  const renderRefCard = (ref: typeof IEEE_REFERENCES[0]) => {
    const formatted = formatIEEEReference(ref);
    const isCopied = copiedId === ref.id;

    return (
      <div
        key={ref.id}
        id={`ref-${ref.id}`}
        className="p-5 sm:p-6 transition-colors hover:bg-neutral-50/70 dark:hover:bg-[#1A1A1A] target:bg-neutral-100/90 dark:target:bg-[#222]"
      >
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="space-y-1.5 max-w-4xl">
            <p className="text-sm font-serif text-neutral-900 dark:text-neutral-100 leading-relaxed">
              <span className="font-mono font-bold text-neutral-950 dark:text-white mr-2 text-xs">
                [{ref.id}]
              </span>
              <span>{ref.authors}, </span>
              <span className="font-medium">"{ref.title}"</span>
              {ref.edition && <span>, {ref.edition}</span>}.{' '}
              <span className="italic">{ref.publication}</span>, {ref.year}
              {ref.pages && <span>, {ref.pages}</span>}.
            </p>

            {ref.notes && (
              <p className="text-xs text-neutral-500 dark:text-neutral-400 font-sans pl-6 italic">
                Nota curatorial: {ref.notes}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0 self-end sm:self-start">
            {ref.doiOrUrl && (
              <a
                href={ref.doiOrUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
                title="Ver enlace a fuente oficial"
                aria-label={`Ver enlace oficial de referencia ${ref.id}`}
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
            <button
              onClick={() => handleCopySingle(ref.id, formatted)}
              className="px-2.5 py-1 text-[11px] font-mono border border-neutral-200 dark:border-neutral-700 hover:border-neutral-900 dark:hover:border-neutral-300 text-neutral-700 dark:text-neutral-300 bg-neutral-50 dark:bg-[#1A1A1A] hover:bg-white dark:hover:bg-[#252525] flex items-center gap-1 transition-all cursor-pointer"
              title="Copiar cita en formato IEEE"
            >
              {isCopied ? (
                <>
                  <Check className="w-3 h-3 text-neutral-950 dark:text-white" /> Copiado
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3 text-neutral-500 dark:text-neutral-400" /> Citar
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="referencias" className="py-16 sm:py-20 border-b border-neutral-200 dark:border-neutral-800 bg-[#FBFBFB] dark:bg-[#0D0D0D] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-neutral-200 dark:border-neutral-800 pb-6 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 dark:text-neutral-400 uppercase tracking-widest mb-2">
              <span>Sección 07</span>
              <span aria-hidden="true">·</span>
              <span>Aparato Crítico ({IEEE_REFERENCES.length} Fuentes Canónicas)</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-medium text-neutral-950 dark:text-white tracking-tight">
              Referencias Bibliográficas (Norma IEEE)
            </h2>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400 font-sans">
              Listado formal y exhaustivo de obras fundamentales citadas en el texto con formato estricto IEEE.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            <button
              onClick={handleCopyAllIEEE}
              className="px-3.5 py-2 border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#1E1E1E] text-neutral-800 dark:text-neutral-200 hover:border-neutral-900 dark:hover:border-neutral-300 transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              {copiedAll ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedAll ? '¡Copiado!' : `Copiar Todas (${IEEE_REFERENCES.length} IEEE)`}</span>
            </button>

            <button
              onClick={handleCopyBibTeX}
              className="px-3.5 py-2 bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              {copiedBibtex ? <Check className="w-3.5 h-3.5" /> : <FileText className="w-3.5 h-3.5" />}
              <span>{copiedBibtex ? '¡Copiado!' : 'Exportar BibTeX'}</span>
            </button>
          </div>
        </div>

        {/* Citations List with Dropdown Continuation */}
        <div className="border border-neutral-300 dark:border-neutral-800 bg-white dark:bg-[#141414] shadow-xs">
          
          {/* Initial 5 References */}
          <div className="divide-y divide-neutral-200 dark:divide-neutral-800">
            {initialRefs.map((ref) => renderRefCard(ref))}
          </div>

          {/* Expandable Remaining References */}
          <AnimatePresence>
            {showAll && (
              <motion.div
                initial={{ opacity: 0, height: 0, filter: 'blur(6px)' }}
                animate={{ opacity: 1, height: 'auto', filter: 'blur(0px)' }}
                exit={{ opacity: 0, height: 0, filter: 'blur(6px)' }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden border-t border-neutral-200 dark:border-neutral-800 divide-y divide-neutral-200 dark:divide-neutral-800"
              >
                {remainingRefs.map((ref) => renderRefCard(ref))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Toggle Button Dropdown Controller */}
          <div className="p-4 bg-neutral-50/80 dark:bg-[#181818]/80 text-center border-t border-neutral-200 dark:border-neutral-800">
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-mono uppercase tracking-wider bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 hover:border-neutral-900 dark:hover:border-neutral-300 text-neutral-900 dark:text-neutral-100 shadow-xs transition-all cursor-pointer font-semibold"
            >
              {showAll ? (
                <>
                  <ChevronUp className="w-4 h-4" />
                  <span>↑</span>
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4" />
                  <span>Desplegar {remainingRefs.length} referencias adicionales ( {IEEE_REFERENCES.length}) ↓</span>
                </>
              )}
            </button>
          </div>

        </div>

        {/* IEEE Formal Standard Note */}
        <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-neutral-500 dark:text-neutral-400">
          <span>Estándar Editorial: IEEE Citation Reference Guide, Piscataway, NJ, USA.</span>
       
        </div>

      </div>
    </section>
  );
};

