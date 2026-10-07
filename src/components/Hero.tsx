import React from 'react';
import { ChevronRight } from 'lucide-react';
import { ProjectMetadata } from '../data/teamMembers';
import { TeamMember } from '../types';

interface HeroProps {
  metadata: ProjectMetadata;
  members: TeamMember[];
  onOpenTeam: () => void;
}

export const Hero: React.FC<HeroProps> = ({ metadata, members, onOpenTeam }) => {
  return (
    <section className="relative pt-12 pb-16 lg:pt-20 lg:pb-24 border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0D0D0D] overflow-hidden transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Academic institutional kicker */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-200 dark:border-neutral-800 pb-4 mb-10 text-xs font-mono text-neutral-500 dark:text-neutral-400">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-neutral-900 dark:text-neutral-200 uppercase tracking-widest">
              {metadata.faculty}
            </span>
            <span aria-hidden="true" className="text-neutral-300 dark:text-neutral-700">/</span>
            <span>{metadata.course}</span>
          </div>
          <div className="flex items-center gap-3">
            <span>{metadata.institution}</span>
            <span aria-hidden="true" className="text-neutral-300 dark:text-neutral-700">·</span>
            <span className="text-neutral-900 dark:text-neutral-200 font-medium">{metadata.date}</span>
          </div>
        </div>

        {/* Main Grid: Headline + Visual Seal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-12">
          <div className="lg:col-span-8 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-neutral-600 dark:text-neutral-400 bg-neutral-100/80 dark:bg-neutral-900/80 px-3 py-1 border border-neutral-200 dark:border-neutral-800">
              <span>Investigación</span>
              <span className="text-neutral-400 dark:text-neutral-600">·</span>
              <span className="font-semibold text-neutral-900 dark:text-neutral-200">Estructuras de Datos</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-medium tracking-tight text-neutral-950 dark:text-white leading-[1.12] text-balance">
              <span className="italic font-normal">Recursividad</span> Computacional
            </h1>

            <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-300 font-light leading-relaxed max-w-2xl text-balance">
              Análisis formal de inducción algorítmica, anatomía de marcos en la pila de llamadas, 
              optimización <span className="font-mono text-neutral-900 dark:text-white text-base">TCO</span>, 
              complejidad asintótica <span className="font-mono text-neutral-900 dark:text-white text-base">O(n)</span> y laboratorio interactivo de simulación gráfica.
            </p>

            {/* Author summary & actions */}
            <div className="pt-2 flex flex-wrap items-center gap-4 sm:gap-6">
              <button
                onClick={onOpenTeam}
                className="group inline-flex items-center gap-2 px-4 py-2.5 bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 text-xs font-medium uppercase tracking-wider hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-all shadow-xs"
              >
                <span>Ficha de Integrantes ({members.length})</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <a
                href="#simuladores"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 text-xs font-medium uppercase tracking-wider hover:border-neutral-900 dark:hover:border-neutral-300 transition-colors shadow-xs"
              >
                <span>Explorar 4 Simuladores</span>
              </a>

              <a
                href="#referencias"
                className="text-xs text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white underline font-mono tracking-tight transition-colors"
              >
                Fuentes de consulta
              </a>
            </div>
          </div>

          {/* Right Column: Etching Monograph Image */}
          <div className="lg:col-span-4">
            <div className="relative border border-neutral-200 dark:border-neutral-800 p-2 bg-neutral-50/50 dark:bg-neutral-900/50 shadow-sm">
              <div className="overflow-hidden border border-neutral-200 dark:border-neutral-800 aspect-square relative bg-white dark:bg-neutral-950">
                <img
                  src="/src/assets/images/recursion_academic_seal_1791239034442.jpg"
                  alt="Emblema geométrico de recursividad computacional"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover grayscale contrast-125 dark:invert dark:opacity-90"
                />
              </div>
              <div className="pt-2.5 px-1 flex items-center justify-between text-[11px] font-mono text-neutral-500 dark:text-neutral-400">
                <span>FIG. 01 — AUTOSIMILITUD</span>
                <span>ESC. MATEMÁTICA</span>
              </div>
            </div>
          </div>
        </div>

        {/* Academic Drop-Cap Thesis Introduction */}
        <div className="pt-8 border-t border-neutral-200 dark:border-neutral-800">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-3 text-xs font-mono uppercase tracking-widest text-neutral-500 dark:text-neutral-400 pt-1">
              Prólogo Conceptual
            </div>
            <div className="lg:col-span-9 space-y-6 text-base sm:text-lg text-neutral-800 dark:text-neutral-200 font-serif leading-relaxed">
              <p className="first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-neutral-950 dark:first-letter:text-white">
                La recursividad no constituye meramente una técnica de programación ad-hoc, sino uno de los pilares ontológicos más profundos de las ciencias de la computación y la lógica matemática formal. Enraizada en el principio de inducción matemática formulado por Giuseppe Peano y en el cálculo lambda de Alonzo Church, la recursividad faculta a un procedimiento para definirse en términos de sí mismo, reduciendo instancias complejas a subproblemas de dimensión estrictamente decreciente hasta alcanzar un estado canónico o caso base.
              </p>
              
              {/* Accessible Non-Technical Reader Guide */}
              <div className="p-5 sm:p-6 bg-neutral-50/80 dark:bg-[#161616]/80 border border-neutral-200/90 dark:border-neutral-800 backdrop-blur-md font-sans text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 space-y-4">
                <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider font-semibold text-neutral-900 dark:text-white border-b border-neutral-200 dark:border-neutral-800 pb-2">
                  <span className="w-2 h-2 bg-neutral-900 dark:bg-white inline-block" />
                  <span>Guía: ¿De qué trata y qué vas a leer más adelante?</span>
                </div>
                
                <p className="leading-relaxed">
                  Si no tienes formación en programación o matemáticas avanzadas, no te preocupes: <strong>la recursividad es una de las ideas más naturales y cotidianas que existen</strong>. Es simplemente la estrategia de resolver un problema gigante dividiéndolo en una versión idéntica pero un poquito más pequeña, resolviendo ese pasito y repitiendo la receta hasta que la solución final se arme por sí sola (como abrir muñecas rusas o salir de un laberinto).
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1 font-sans text-xs">
                  <div className="p-3 bg-white/70 dark:bg-[#1E1E1E]/70 border border-neutral-200 dark:border-neutral-700">
                    <strong className="text-neutral-900 dark:text-white font-mono block mb-1">01. Fundamentos & Metáforas</strong>
                    <p className="text-neutral-600 dark:text-neutral-400">
                      Entenderás qué es el "Caso Base" (el freno de mano para que la máquina no trabaje por siempre) con analogías como la fila del cine y los espejos enfrentados.
                    </p>
                  </div>

                  <div className="p-3 bg-white/70 dark:bg-[#1E1E1E]/70 border border-neutral-200 dark:border-neutral-700">
                    <strong className="text-neutral-900 dark:text-white font-mono block mb-1">02. La Pila de Memoria (Call Stack)</strong>
                    <p className="text-neutral-600 dark:text-neutral-400">
                      Verás cómo la computadora apila tareas pendientes como una torre de platos y qué ocurre cuando se satura (el famoso error <em>Stack Overflow</em>).
                    </p>
                  </div>

                  <div className="p-3 bg-white/70 dark:bg-[#1E1E1E]/70 border border-neutral-200 dark:border-neutral-700">
                    <strong className="text-neutral-900 dark:text-white font-mono block mb-1">03. Casos Reales de la Vida Diaria</strong>
                    <p className="text-neutral-600 dark:text-neutral-400">
                      Descubrirás cómo la usan Google Maps para calcular tu ruta en tiempo real, Amazon para repartir pedidos, Pixar para simular luz en películas y los videojuegos para crear mundos infinitos.
                    </p>
                  </div>

                  <div className="p-3 bg-white/70 dark:bg-[#1E1E1E]/70 border border-neutral-200 dark:border-neutral-700">
                    <strong className="text-neutral-900 dark:text-white font-mono block mb-1">04. Laboratorio Gráfico</strong>
                    <p className="text-neutral-600 dark:text-neutral-400">
                      Podrás experimentar tú mismo con 4 simuladores visuales (mover discos en Hanói, podar árboles de Fibonacci y dibujar fractales geométricos en vivo).
                    </p>
                  </div>
                </div>

                <div className="pt-2 text-[11px] font-mono text-neutral-500 dark:text-neutral-400 flex items-center justify-between">
                  <span>No se requieren conocimientos previos de programación para explorar los simuladores.</span>
                  <a href="#simuladores" className="underline text-neutral-900 dark:text-white font-medium hover:opacity-80">
                    Ir directo al laboratorio ↓
                  </a>
                </div>
              </div>

              <p className="text-sm font-sans text-neutral-600 dark:text-neutral-400 leading-normal">
                Comprender la recursividad exige dominar simultáneamente dos dimensiones: la abstracción declarativa de alto nivel (división analítica del problema) y la mecánica física de bajo nivel regida por la pila de llamadas (call stack), los registros de activación y la gestión de memoria volátil. Este tratado aborda de forma unificada la teoría formal, la cota asintótica y la visualización interactiva paso a paso.
              </p>
            </div>
          </div>
        </div>

        {/* 3 Metric Rigor Pillars */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-neutral-200 dark:divide-neutral-800 border border-neutral-200 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-900/40">
          <div className="p-6 text-center sm:text-left">
            <span className="block text-2xl font-serif font-medium text-neutral-950 dark:text-white tabular-nums">
              4 Algoritmos
            </span>
            <span className="text-xs text-neutral-500 dark:text-neutral-400 font-mono uppercase tracking-wider mt-1 block">
              Simuladores Interactivos
            </span>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-2 font-sans">
              Factorial, Fibonacci, Torres de Hanói y Fractales en tiempo real.
            </p>
          </div>

          <div className="p-6 text-center sm:text-left">
            <span className="block text-2xl font-serif font-medium text-neutral-950 dark:text-white tabular-nums">
              O(2ⁿ) → O(1)
            </span>
            <span className="text-xs text-neutral-500 dark:text-neutral-400 font-mono uppercase tracking-wider mt-1 block">
              Espectro de Complejidad
            </span>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-2 font-sans">
              Deducción formal de cotas Big-O con Teorema Maestro y optimización TCO.
            </p>
          </div>

          <div className="p-6 text-center sm:text-left">
            <span className="block text-2xl font-serif font-medium text-neutral-950 dark:text-white tabular-nums">
              8 Fuentes IEEE
            </span>
            <span className="text-xs text-neutral-500 dark:text-neutral-400 font-mono uppercase tracking-wider mt-1 block">
              Rigor Bibliográfico
            </span>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-2 font-sans">
              Cormen, Knuth, Abelson & Sussman, Sedgewick, Mandelbrot y Wirth.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
