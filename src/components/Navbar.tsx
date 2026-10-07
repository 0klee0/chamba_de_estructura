import React, { useState, useEffect } from 'react';
import { BookOpen, Users, BookmarkCheck, Menu, X, ArrowUpRight, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface NavbarProps {
  onOpenTeam: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenTeam }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const currentProgress = (window.scrollY / totalScroll) * 100;
        setScrollProgress(currentProgress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-[2px] bg-neutral-200 dark:bg-neutral-800 z-50">
        <div
          className="h-full bg-neutral-900 dark:bg-neutral-100 transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Top Bar following strict 3-zone contract */}
      <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#FBFBFB]/90 dark:bg-[#0D0D0D]/90 border-b border-neutral-200/80 dark:border-neutral-800/80 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#"
            className="text-base sm:text-lg font-serif tracking-tight text-neutral-900 dark:text-neutral-100 hover:opacity-80 transition-opacity flex items-center gap-2"
          >
            <span className="font-semibold uppercase tracking-widest text-xs border border-neutral-900 dark:border-neutral-200 px-1.5 py-0.5 text-neutral-900 dark:text-neutral-100">
              E5
            </span>
            <span className="font-medium">Recursividad</span>
          </a>

          {/* Zone 2: 4-6 text navigation links */}
          <nav className="hidden md:flex items-center space-x-6 text-xs font-medium uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
            <a href="#definicion" className="hover:text-neutral-950 dark:hover:text-white transition-colors">
              Definición
            </a>
            <a href="#caracteristicas" className="hover:text-neutral-950 dark:hover:text-white transition-colors">
              Pila & Fundamentos
            </a>
            <a href="#aplicaciones" className="hover:text-neutral-950 dark:hover:text-white transition-colors">
              Aplicaciones
            </a>
            <a href="#complejidad" className="hover:text-neutral-950 dark:hover:text-white transition-colors">
              Complejidad
            </a>
            <a href="#simuladores" className="hover:text-neutral-950 dark:hover:text-white transition-colors font-semibold text-neutral-950 dark:text-neutral-100">
              Simuladores
            </a>
            <a href="#referencias" className="hover:text-neutral-950 dark:hover:text-white transition-colors">
              Bibliografía
            </a>
          </nav>

          {/* Zone 3: 1-2 primary actions + theme toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Theme Toggle Button (Light/Dark Reading Mode) */}
            <button
              onClick={toggleTheme}
              className="flex items-center gap-1.5 px-2.5 py-1.5 border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 hover:border-neutral-900 dark:hover:border-neutral-400 transition-all text-xs font-mono shadow-xs cursor-pointer"
              title={theme === 'dark' ? 'Cambiar a lectura diurna (Modo Blanco/Claro)' : 'Cambiar a lectura nocturna (Modo Oscuro)'}
              aria-label="Alternar modo lectura día/noche"
            >
              {theme === 'dark' ? (
                <Sun className="w-3.5 h-3.5 text-amber-200" />
              ) : (
                <Moon className="w-3.5 h-3.5 text-neutral-700" />
              )}
            </button>

            <button
              onClick={onOpenTeam}
              className="px-3.5 py-1.5 text-xs font-medium tracking-wide uppercase text-neutral-900 dark:text-neutral-100 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 hover:border-neutral-900 dark:hover:border-neutral-300 transition-all flex items-center gap-1.5 shadow-xs"
            >
              <Users className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Autores</span>
            </button>

            <a
              href="#simuladores"
              className="hidden sm:inline-flex px-3.5 py-1.5 text-xs font-medium tracking-wide uppercase text-white dark:text-neutral-950 bg-neutral-900 dark:bg-white hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
            >
              Laboratorio
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white focus:outline-none"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-neutral-200 dark:border-neutral-800 bg-[#FBFBFB] dark:bg-[#0D0D0D] px-6 py-4 space-y-3 text-sm">
            {/* Quick reading mode toggle in mobile view */}
            <div className="pb-3 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                Lectura Día / Noche
              </span>
              <button
                onClick={toggleTheme}
                className="flex items-center gap-2 px-3 py-1.5 border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white text-xs font-mono"
              >
                {theme === 'dark' ? (
                  <>
                    <Sun className="w-3.5 h-3.5 text-amber-200" />
                    <span>Cambiar a Modo Día (Blanco)</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-3.5 h-3.5 text-neutral-700" />
                    <span>Cambiar a Modo Noche (Oscuro)</span>
                  </>
                )}
              </button>
            </div>

            <a
              href="#definicion"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white py-1"
            >
              1. Definición Formal
            </a>
            <a
              href="#caracteristicas"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white py-1"
            >
              2. Características & Pila de Ejecución
            </a>
            <a
              href="#aplicaciones"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white py-1"
            >
              3. Aplicaciones en la Ingeniería
            </a>
            <a
              href="#complejidad"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white py-1"
            >
              4. Complejidad Computacional (Big-O)
            </a>
            <a
              href="#simuladores"
              onClick={() => setMobileMenuOpen(false)}
              className="block font-semibold text-neutral-950 dark:text-white py-1"
            >
              5. Laboratorio de Simuladores
            </a>
            <a
              href="#referencias"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white py-1"
            >
              6. Referencias IEEE
            </a>
          </div>
        )}
      </header>
    </>
  );
};
