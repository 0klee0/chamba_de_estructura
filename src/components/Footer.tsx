import React from 'react';
import { ArrowUp, BookOpen, ShieldCheck, Sun, Moon } from 'lucide-react';
import { ProjectMetadata } from '../data/teamMembers';
import { useTheme } from '../context/ThemeContext';

interface FooterProps {
  metadata: ProjectMetadata;
  onOpenTeam: () => void;
}

export const Footer: React.FC<FooterProps> = ({ metadata, onOpenTeam }) => {
  const { theme, toggleTheme } = useTheme();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-neutral-300 dark:border-neutral-800 bg-white dark:bg-[#0D0D0D] py-12 lg:py-16 text-xs text-neutral-600 dark:text-neutral-400 font-sans transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          {/* Col 1: Wordmark & Institutional Description */}
          <div className="md:col-span-6 space-y-3">
            <span className="font-serif text-lg font-semibold text-neutral-950 dark:text-white tracking-tight block">
              Recursividad Computacional
            </span>
            <p className="font-serif text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-md">
              Monografía académica interactiva y laboratorio experimental diseñado bajo criterios de rigor formal, análisis algorítmico y estándares IEEE.
            </p>
            <div className="pt-2 text-[11px] font-mono text-neutral-500 dark:text-neutral-400">
              {metadata.institution} {metadata.department && `· ${metadata.department}`}
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-3 space-y-2">
            <span className="font-mono text-xs uppercase tracking-wider text-neutral-950 dark:text-white font-semibold block mb-3">
              Capítulos
            </span>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#definicion" className="hover:text-neutral-950 dark:hover:text-white transition-colors">
                  01. Definición Formal & Inducción
                </a>
              </li>
              <li>
                <a href="#caracteristicas" className="hover:text-neutral-950 dark:hover:text-white transition-colors">
                  02. Anatomía de Pila & TCO
                </a>
              </li>
              <li>
                <a href="#aplicaciones" className="hover:text-neutral-950 dark:hover:text-white transition-colors">
                  03. Aplicaciones en Ingeniería
                </a>
              </li>
              <li>
                <a href="#complejidad" className="hover:text-neutral-950 dark:hover:text-white transition-colors">
                  04. Análisis de Complejidad Big-O
                </a>
              </li>
              <li>
                <a href="#simuladores" className="hover:text-neutral-950 dark:hover:text-white transition-colors font-medium text-neutral-900 dark:text-neutral-200">
                  05. Laboratorio de Simuladores
                </a>
              </li>
              <li>
                <a href="#referencias" className="hover:text-neutral-950 dark:hover:text-white transition-colors">
                  06. Referencias Bibliográficas IEEE
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Academic Credits & Jump to Top */}
          <div className="md:col-span-3 space-y-4">
            <span className="font-mono text-xs uppercase tracking-wider text-neutral-950 dark:text-white font-semibold block mb-3">
              Investigación
            </span>
            <button
              onClick={onOpenTeam}
              className="text-left block text-neutral-800 dark:text-neutral-200 hover:text-neutral-950 dark:hover:text-white font-medium underline"
            >
              Consultar Ficha de Autores
            </button>
            <p className="text-[11px] text-neutral-500 dark:text-neutral-400 font-mono">
              Asignatura: {metadata.course}
            </p>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-neutral-300 dark:border-neutral-700 hover:border-neutral-900 dark:hover:border-neutral-400 text-neutral-900 dark:text-neutral-200 transition-colors font-mono text-xs"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Volver al Inicio</span>
            </button>
          </div>
        </div>

        {/* Bottom Colophon Bar */}
        <div className="pt-8 border-t border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-neutral-500 dark:text-neutral-400">
          <p>© {new Date().getFullYear()} {metadata.title}. Todos los derechos reservados.</p>
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 hover:border-neutral-900 dark:hover:border-neutral-400 transition-colors"
              title="Alternar entre modo claro (diurno) y modo oscuro (nocturno)"
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="w-3 h-3 text-amber-200" />
                  <span className="text-[10px]">Modo Claro</span>
                </>
              ) : (
                <>
                  <Moon className="w-3 h-3 text-neutral-700" />
                  <span className="text-[10px]">Modo Oscuro</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
