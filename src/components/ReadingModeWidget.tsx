import React, { useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const ReadingModeWidget: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  // Listen for keyboard shortcut 't' or 'T' to toggle reading mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing inside input, textarea, or select
      const activeEl = document.activeElement;
      if (
        activeEl &&
        (activeEl.tagName === 'INPUT' ||
          activeEl.tagName === 'TEXTAREA' ||
          activeEl.tagName === 'SELECT' ||
          (activeEl instanceof HTMLElement && activeEl.isContentEditable))
      ) {
        return;
      }

      if (e.key === 't' || e.key === 'T') {
        toggleTheme();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleTheme]);

  return (
    <aside
      aria-label="Controles de lectura diurna y nocturna"
      className="fixed bottom-5 right-5 z-40 select-none print:hidden"
    >
      <div className="flex items-center gap-2">
        <button
          onClick={toggleTheme}
          className="group flex items-center gap-2 px-3 py-2 border border-neutral-300 dark:border-neutral-700 bg-white/95 dark:bg-[#161616]/95 backdrop-blur-md text-neutral-800 dark:text-neutral-200 hover:border-neutral-900 dark:hover:border-neutral-400 shadow-md transition-all text-xs font-mono rounded-none"
          title={
            theme === 'dark'
              ? 'Cambiar a modo lectura clara (fondo blanco). Atajo: Tecla [T]'
              : 'Cambiar a modo lectura nocturna (fondo oscuro). Atajo: Tecla [T]'
          }
          aria-label="Alternar modo de lectura día/noche"
        >
          {theme === 'dark' ? (
            <>
              <Sun className="w-3.5 h-3.5 text-amber-200 group-hover:rotate-45 transition-transform duration-300" />
              <span className="hidden sm:inline font-sans text-[11px] uppercase tracking-wider font-medium">
                Lectura Clara
              </span>
            </>
          ) : (
            <>
              <Moon className="w-3.5 h-3.5 text-neutral-800 group-hover:-rotate-12 transition-transform duration-300" />
              <span className="hidden sm:inline font-sans text-[11px] uppercase tracking-wider font-medium">
                Lectura Nocturna
              </span>
            </>
          )}
          <span className="hidden md:inline-block ml-1 px-1 py-0.2 border border-neutral-300 dark:border-neutral-700 text-[9px] text-neutral-500 dark:text-neutral-400 font-mono">
            T
          </span>
        </button>
      </div>
    </aside>
  );
};
