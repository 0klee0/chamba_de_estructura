import React, { useState } from 'react';
import { Calculator, TrendingUp, Layers, CheckCircle2, ChevronRight, Eye, BookOpen, Lightbulb } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ALGORITHM_COMPLEXITIES } from '../data/academicContent';

export const SectionComplexity: React.FC = () => {
  const [selectedAlgo, setSelectedAlgo] = useState<number>(0);
  const [interactiveN, setInteractiveN] = useState<number>(6);

  // Computations for asymptotic growth display
  const factorialOps = (n: number) => n;
  const fibonacciOps = (n: number) => Math.round((Math.pow(1.618, n) - Math.pow(-0.618, n)) / Math.sqrt(5));
  const hanoiOps = (n: number) => Math.pow(2, n) - 1;
  const sierpinskiOps = (n: number) => Math.pow(3, n);
  const kochOps = (n: number) => Math.pow(4, n);

  return (
    <section id="complejidad" className="py-16 sm:py-20 border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#121212] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 dark:text-neutral-400 uppercase tracking-widest mb-2">
            <span>Sección 04</span>
            <span aria-hidden="true">·</span>
            <span>Análisis Asintótico Riguroso</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-medium text-neutral-950 dark:text-white tracking-tight">
            Complejidad Computacional en Algoritmos Recursivos
          </h2>
          <p className="mt-3 text-base text-neutral-600 dark:text-neutral-400 font-sans leading-relaxed">
            A diferencia de los algoritmos iterativos donde basta con contar iteraciones de bucles anidados, 
            la complejidad de una función recursiva se expresa mediante una <strong>ecuación de recurrencia</strong> cuya resolución formal requiere herramientas analíticas avanzadas <a href="#ref-1" className="text-neutral-900 dark:text-neutral-200 font-mono text-xs hover:underline">[1]</a>, <a href="#ref-5" className="text-neutral-900 dark:text-neutral-200 font-mono text-xs hover:underline">[5]</a>.
          </p>
        </div>

        {/* 3 Recurrence Resolution Methods */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="p-5 border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-[#171717]">
            <span className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 uppercase tracking-widest block mb-1">Método I</span>
            <h3 className="text-base font-serif font-semibold text-neutral-950 dark:text-white mb-2">
              Teorema Maestro de Cormen
            </h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed font-sans mb-3">
              Aplica a recurrencias de la forma <span className="font-mono text-neutral-900 dark:text-white font-medium">T(n) = aT(n/b) + f(n)</span> con <span className="font-mono">a ≥ 1, b &gt; 1</span>. Compara asintóticamente la función de combinación <span className="font-mono">f(n)</span> con la función de partición del árbol <span className="font-mono">n^(log_b a)</span>.
            </p>
            <div className="text-[11px] font-mono text-neutral-700 dark:text-neutral-300 bg-white dark:bg-[#1E1E1E] p-2 border border-neutral-200 dark:border-neutral-700">
              Caso 1: f(n) menor ⇒ Θ(n^log_b a)<br/>
              Caso 2: f(n) igual ⇒ Θ(n^log_b a · log n)<br/>
              Caso 3: f(n) mayor ⇒ Θ(f(n))
            </div>
          </div>

          <div className="p-5 border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-[#171717]">
            <span className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 uppercase tracking-widest block mb-1">Método II</span>
            <h3 className="text-base font-serif font-semibold text-neutral-950 dark:text-white mb-2">
              Árbol de Recurrencia
            </h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed font-sans mb-3">
              Visualiza la descomposición como un árbol n-ario donde cada nodo representa el coste local de una llamada. Se computa la sumatoria vertical de costes por nivel y se multiplica por la altura total del árbol <span className="font-mono">h = log_b n</span>.
            </p>
            <div className="text-[11px] font-mono text-neutral-700 dark:text-neutral-300 bg-white dark:bg-[#1E1E1E] p-2 border border-neutral-200 dark:border-neutral-700">
              T(n) = ∑ [costo_nivel(i)] para i = 0 hasta h
            </div>
          </div>

          <div className="p-5 border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-[#171717]">
            <span className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 uppercase tracking-widest block mb-1">Método III</span>
            <h3 className="text-base font-serif font-semibold text-neutral-950 dark:text-white mb-2">
              Sustitución e Inducción
            </h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed font-sans mb-3">
              Se formula una hipótesis sobre la cota superior e inferior (por ejemplo, conjeturar que <span className="font-mono">T(n) ≤ c · 2^n</span>) y se demuestra rigurosamente utilizando el principio de inducción matemática débil o fuerte.
            </p>
            <div className="text-[11px] font-mono text-neutral-700 dark:text-neutral-300 bg-white dark:bg-[#1E1E1E] p-2 border border-neutral-200 dark:border-neutral-700">
              Paso Base + Hipótesis ⇒ Paso Inductivo
            </div>
          </div>
        </div>

        {/* Master Big-O Matrix for the 4 Algorithms - Reduced to 3 columns as requested */}
        <div className="border border-neutral-300 dark:border-neutral-800 bg-white dark:bg-[#141414] mb-12 shadow-xs">
          <div className="p-4 sm:p-6 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-[#171717] flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
                Matriz Comparativa Canónica
              </span>
              <h3 className="text-lg font-serif font-semibold text-neutral-950 dark:text-white mt-0.5">
                Comportamiento de los Algoritmos Explicado Paso a Paso
              </h3>
            </div>
            <span className="text-xs font-mono border border-neutral-300 dark:border-neutral-700 px-2.5 py-1 bg-white dark:bg-[#1E1E1E] text-neutral-700 dark:text-neutral-300">
              🦖
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse font-sans">
              <thead>
                <tr className="border-b border-neutral-200 dark:border-neutral-800 bg-neutral-100/60 dark:bg-neutral-900/60 font-mono text-neutral-800 dark:text-neutral-200">
                  <th className="p-4 pl-6 font-semibold w-[22%] min-w-[170px]">Algoritmo</th>
                  <th className="p-4 font-semibold w-[28%] min-w-[210px]">Ecuación de Recurrencia</th>
                  <th className="p-4 pr-6 font-semibold w-[50%] min-w-[320px]">Explicación</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800 text-neutral-700 dark:text-neutral-300">
                {ALGORITHM_COMPLEXITIES.map((algo, idx) => (
                  <tr
                    key={idx}
                    onClick={() => setSelectedAlgo(idx)}
                    className={`cursor-pointer transition-colors ${
                      selectedAlgo === idx ? 'bg-neutral-100/90 dark:bg-[#1E1E1E]' : 'hover:bg-neutral-50 dark:hover:bg-[#181818]'
                    }`}
                  >
                    <td className="p-4 pl-6 align-top">
                      <div className="flex items-center gap-2 font-mono font-bold text-neutral-950 dark:text-white">
                        <span className={`w-2 h-2 shrink-0 ${selectedAlgo === idx ? 'bg-neutral-950 dark:bg-white' : 'bg-neutral-300 dark:bg-neutral-700'}`} />
                        <span>{algo.name}</span>
                      </div>
                      <div className="mt-1.5 pl-4 text-[11px] font-mono text-neutral-500 dark:text-neutral-400">
                        Crecimiento: <span className="font-semibold text-neutral-900 dark:text-neutral-100">{algo.timeComplexity}</span>
                      </div>
                    </td>
                    <td className="p-4 align-top font-mono text-neutral-800 dark:text-neutral-200 text-xs">
                      <div className="p-2.5 border border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-[#181818] font-mono text-[11px] leading-relaxed">
                        {algo.recurrence}
                      </div>
                    </td>
                    <td className="p-4 pr-6 align-top">
                      <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 font-sans leading-relaxed">
                        {algo.simpleExplanation}
                      </p>
                      <div className="mt-2.5 flex flex-wrap items-center gap-2 text-[10px] font-mono text-neutral-500 dark:text-neutral-400">
                        <span className="px-2 py-0.5 border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-[#1E1E1E]">
                          Pila: {algo.spaceComplexity}
                        </span>
                        {algo.spaceWithTCO && (
                          <span className="text-neutral-500 dark:text-neutral-400 font-sans text-[11px]">
                            {algo.spaceWithTCO}
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Deep dive detail for selected algorithm with fluid blur transition */}
          <div className="p-6 bg-neutral-50/70 dark:bg-[#181818]/70 backdrop-blur-md border-t border-neutral-200 dark:border-neutral-800 min-h-[90px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedAlgo}
                initial={{ opacity: 0, y: 6, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -6, filter: 'blur(6px)' }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="flex items-center gap-2 text-xs font-mono text-neutral-900 dark:text-white font-semibold uppercase mb-1">
                  <Eye className="w-4 h-4" /> Demostración y Método Riguroso: {ALGORITHM_COMPLEXITIES[selectedAlgo].name} ({ALGORITHM_COMPLEXITIES[selectedAlgo].method})
                </div>
                <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 font-serif leading-relaxed">
                  {ALGORITHM_COMPLEXITIES[selectedAlgo].details}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Live Asymptotic Growth Calculator & Explosion Demonstration */}
        <div className="border border-neutral-300 dark:border-neutral-800 bg-neutral-50/60 dark:bg-[#171717] p-6 sm:p-8">
          <div className="max-w-2xl mb-6">
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
              Demostración Cuantitativa 
            </span>
            <h3 className="text-xl font-serif font-medium text-neutral-950 dark:text-white mt-1">
              La Explosión Exponencial: Evaluación en n = {interactiveN}
            </h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1 font-sans">
              Desliza el control de <span className="font-mono">n</span> para presenciar cómo los algoritmos lineales crecen suavemente mientras los árboles recursivos y fractales multiplican sus operaciones a ritmos inmanejables.
            </p>
          </div>

          <div className="flex items-center gap-4 mb-8 max-w-md">
            <span className="font-mono text-xs font-semibold text-neutral-900 dark:text-white">n = {interactiveN}</span>
            <input
              type="range"
              min="1"
              max="10"
              value={interactiveN}
              onChange={(e) => setInteractiveN(parseInt(e.target.value))}
              className="w-full accent-neutral-900 dark:accent-neutral-100 cursor-pointer"
            />
            <span className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400">Max: 10</span>
          </div>

          {/* Metrics comparison cards */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 font-mono">
            <div className="p-4 border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#141414]">
              <span className="text-[10px] text-neutral-500 dark:text-neutral-400 block uppercase">Factorial O(n)</span>
              <span className="text-xl sm:text-2xl font-serif text-neutral-900 dark:text-white font-medium tabular-nums block mt-1">
                {factorialOps(interactiveN)}
              </span>
              <span className="text-[10px] text-neutral-500 dark:text-neutral-400 font-sans mt-1 block">Pasos de llamada</span>
            </div>

            <div className="p-4 border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#141414]">
              <span className="text-[10px] text-neutral-500 dark:text-neutral-400 block uppercase">Fibonacci O(2ⁿ)</span>
              <span className="text-xl sm:text-2xl font-serif text-neutral-900 dark:text-white font-medium tabular-nums block mt-1">
                {fibonacciOps(interactiveN)}
              </span>
              <span className="text-[10px] text-neutral-500 dark:text-neutral-400 font-sans mt-1 block">Llamadas ingenuas</span>
            </div>

            <div className="p-4 border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#141414]">
              <span className="text-[10px] text-neutral-500 dark:text-neutral-400 block uppercase">Hanói O(2ⁿ)</span>
              <span className="text-xl sm:text-2xl font-serif text-neutral-900 dark:text-white font-medium tabular-nums block mt-1">
                {hanoiOps(interactiveN).toLocaleString()}
              </span>
              <span className="text-[10px] text-neutral-500 dark:text-neutral-400 font-sans mt-1 block">2ⁿ - 1 movimientos</span>
            </div>

            <div className="p-4 border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#141414]">
              <span className="text-[10px] text-neutral-500 dark:text-neutral-400 block uppercase">Sierpinski O(3ⁿ)</span>
              <span className="text-xl sm:text-2xl font-serif text-neutral-900 dark:text-white font-medium tabular-nums block mt-1">
                {sierpinskiOps(interactiveN).toLocaleString()}
              </span>
              <span className="text-[10px] text-neutral-500 dark:text-neutral-400 font-sans mt-1 block">3ⁿ triángulos</span>
            </div>

            <div className="p-4 border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#141414] col-span-2 sm:col-span-1">
              <span className="text-[10px] text-neutral-500 dark:text-neutral-400 block uppercase">Curva Koch O(4ⁿ)</span>
              <span className="text-xl sm:text-2xl font-serif text-neutral-900 dark:text-white font-medium tabular-nums block mt-1">
                {kochOps(interactiveN).toLocaleString()}
              </span>
              <span className="text-[10px] text-neutral-500 dark:text-neutral-400 font-sans mt-1 block">4ⁿ segmentos</span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-neutral-200 dark:border-neutral-800 text-xs font-mono text-neutral-500 dark:text-neutral-400 flex items-center justify-between">
            <span>Dimensión Fractal Hausdorff: Sierpinski D ≈ 1.585 · Koch D ≈ 1.262</span>
            <span>Benoît Mandelbrot [7]</span>
          </div>
        </div>

        {/* Explicación General de la Sección 04 para el Usuario Común */}
        <div className="mt-10 p-6 sm:p-8 border border-neutral-300 dark:border-neutral-800 bg-white dark:bg-[#141414] shadow-xs">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 dark:text-neutral-400 uppercase tracking-widest mb-2">
              <BookOpen className="w-4 h-4 text-neutral-900 dark:text-white" />
              <span>Guía Conceptual</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-serif font-medium text-neutral-950 dark:text-white mb-2">
              ¿Que nos ensena esta seccion? 
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 font-sans leading-relaxed mb-6">
              El objetivo de esta seccion no es memorizar símbolos matemáticos, sino entender una regla universal de las computadoras: <strong>cómo reacciona el sistema cuando el problema crece</strong>. A continuación, los tres principios que todo usuario o estudiante debe comprender:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-5 border-t border-neutral-200 dark:border-neutral-800">
            <div className="p-5 border border-neutral-200 dark:border-neutral-800 bg-neutral-50/60 dark:bg-[#181818]">
              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-neutral-950 dark:text-white mb-2">
                <span className="w-2 h-2 bg-neutral-950 dark:bg-white inline-block"></span>
                <span>1. El Crecimiento Inmanejable</span>
              </div>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 font-sans leading-relaxed">
                Resolver el <strong>Factorial</strong> es como contar pasos: para 10 elementos das 10 pasos. En cambio, <strong>Fibonacci</strong> y las <strong>Torres de Hanói</strong> duplican el esfuerzo con cada dato nuevo. Para un valor pequeño como <span className="font-mono">n = 5</span> casi no notas la diferencia, pero para <span className="font-mono">n = 64</span> la computadora tardaría miles de millones de años.
              </p>
            </div>

            <div className="p-5 border border-neutral-200 dark:border-neutral-800 bg-neutral-50/60 dark:bg-[#181818]">
              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-neutral-950 dark:text-white mb-2">
                <span className="w-2 h-2 bg-neutral-950 dark:bg-white inline-block"></span>
                <span>2. La Memoria se Agota (Stack Overflow)</span>
              </div>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 font-sans leading-relaxed">
                Cada vez que una función se llama a sí misma, deja un recordatorio pendiente en la memoria RAM (la <em>pila de llamadas</em>). Si acumulas miles de recordatorios abiertos sin resolver los anteriores, el espacio se llena por completo y el programa se cierra abruptamente con el temido error <em>Stack Overflow</em>.
              </p>
            </div>

            <div className="p-5 border border-neutral-200 dark:border-neutral-800 bg-neutral-950/5 dark:bg-[#181818]">
              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-neutral-950 dark:text-white mb-2">
                <span className="w-2 h-2 bg-neutral-950 dark:bg-white inline-block"></span>
                <span>3. Estrategias Inteligentes</span>
              </div>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 font-sans leading-relaxed">
                Para evitar que el programa se congele, los desarrolladores aplican dos trucos: la <strong>memoización</strong> (guardar en un cuaderno las respuestas que ya calculaste para no repetirlas) y la <strong>optimización de cola</strong> (descartar notas viejas). Con esto, un cálculo imposible pasa a resolverse en fracciones de segundo.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
