import React, { useState } from 'react';
import { Layers, GitFork, ArrowDown, Cpu, FastForward, Check, HelpCircle } from 'lucide-react';

export const SectionCharacteristics: React.FC = () => {
  const [selectedFrame, setSelectedFrame] = useState<number | null>(2);

  return (
    <section id="caracteristicas" className="py-16 sm:py-20 border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#121212] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 dark:text-neutral-400 uppercase tracking-widest mb-2">
            <span>Sección 02</span>
            <span aria-hidden="true">·</span>
            <span>Arquitectura de Memoria & Teoría</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-medium text-neutral-950 dark:text-white tracking-tight">
            Características de la Recursividad & Control de la Pila
          </h2>
          <p className="mt-3 text-base text-neutral-600 dark:text-neutral-400 font-sans leading-relaxed">
            La ejecución de un algoritmo recursivo no ocurre en el vacío abstracto: cada invocación genera un registro de activación físico en la pila del sistema operativo. Comprender este mecanismo distingue la programación empírica del rigor computacional <a href="#ref-2" className="text-neutral-900 dark:text-neutral-200 font-mono text-xs hover:underline">[2]</a>, <a href="#ref-3" className="text-neutral-900 dark:text-neutral-200 font-mono text-xs hover:underline">[3]</a>.
          </p>
        </div>

        {/* Call Stack Architecture & Interactive Stack Frame Blueprint */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          <div className="lg:col-span-6 space-y-6">
            <h3 className="text-xl font-serif font-semibold text-neutral-950 dark:text-white">
              Anatomía del Registro de Activación (Stack Frame)
            </h3>
            <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed font-serif">
              Cuando la CPU procesa una instrucción de llamada a procedimiento (<span className="font-mono text-xs bg-neutral-100 dark:bg-neutral-800 px-1 py-0.5 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100">CALL</span> en arquitecturas x86_64), el hardware apila la dirección de retorno y asigna un nuevo bloque contiguo de memoria delimitado por el puntero de base (<span className="font-mono text-xs text-neutral-900 dark:text-neutral-100">RBP</span>) y el puntero de pila (<span className="font-mono text-xs text-neutral-900 dark:text-neutral-100">RSP</span>).
            </p>

            <div className="space-y-3 text-xs text-neutral-700 dark:text-neutral-300 font-sans">
              <div className="p-3.5 border border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-[#1A1A1A] flex items-start gap-3">
                <span className="font-mono font-bold text-neutral-900 dark:text-white mt-0.5">01.</span>
                <div>
                  <strong className="text-neutral-900 dark:text-white font-mono">Dirección de Retorno (Return Address):</strong>
                  <p className="mt-0.5 text-neutral-600 dark:text-neutral-400">
                    Puntero a la instrucción de código binario subsiguiente a la invocación, indispensable para que la CPU sepa adónde retornar cuando la función ejecute <span className="font-mono">RET</span>.
                  </p>
                </div>
              </div>

              <div className="p-3.5 border border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-[#1A1A1A] flex items-start gap-3">
                <span className="font-mono font-bold text-neutral-900 dark:text-white mt-0.5">02.</span>
                <div>
                  <strong className="text-neutral-900 dark:text-white font-mono">Parámetros Formales (Arguments):</strong>
                  <p className="mt-0.5 text-neutral-600 dark:text-neutral-400">
                    Valores o referencias transmitidos al invocar la función (por ejemplo, el valor actual de <span className="font-mono">n</span> en <span className="font-mono">factorial(n)</span>).
                  </p>
                </div>
              </div>

              <div className="p-3.5 border border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-[#1A1A1A] flex items-start gap-3">
                <span className="font-mono font-bold text-neutral-900 dark:text-white mt-0.5">03.</span>
                <div>
                  <strong className="text-neutral-900 dark:text-white font-mono">Variables Locales & Registros Preservados:</strong>
                  <p className="mt-0.5 text-neutral-600 dark:text-neutral-400">
                    Memoria aislada para cálculos temporales y respaldo de registros volátiles (como <span className="font-mono">RBX, R12–R15</span>) exigidos por la convención de llamadas (ABI).
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Stack Frame Graphic */}
          <div className="lg:col-span-6 border border-neutral-300 dark:border-neutral-800 bg-neutral-50/40 dark:bg-[#171717] p-6 shadow-xs">
            <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-3 mb-4">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-neutral-900 dark:text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-neutral-800 dark:text-neutral-200" /> Pila de Llamadas Físicas (Call Stack)
              </span>
              <span className="text-[10px] font-mono text-neutral-500 dark:text-neutral-400">Dirección: 0x7FFF... ↓ Crecimiento</span>
            </div>

            <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-4">
              Haz clic en cada marco de activación para inspeccionar su estado durante la llamada a <span className="font-mono font-medium text-neutral-900 dark:text-white">factorial(4)</span>:
            </p>

            {/* Stack Visualizer */}
            <div className="space-y-2 max-w-md mx-auto font-mono text-xs">
              {[
                { depth: 4, name: 'factorial(1)', arg: 'n = 1', status: 'Caso Base Alcanzado → Retorna 1', color: 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 border-neutral-900 dark:border-white' },
                { depth: 3, name: 'factorial(2)', arg: 'n = 2', status: 'En espera: 2 * factorial(1)', color: 'bg-white dark:bg-[#1E1E1E] text-neutral-900 dark:text-neutral-100 border-neutral-300 dark:border-neutral-700' },
                { depth: 2, name: 'factorial(3)', arg: 'n = 3', status: 'En espera: 3 * factorial(2)', color: 'bg-white dark:bg-[#1E1E1E] text-neutral-900 dark:text-neutral-100 border-neutral-300 dark:border-neutral-700' },
                { depth: 1, name: 'factorial(4)', arg: 'n = 4', status: 'En espera: 4 * factorial(3)', color: 'bg-white dark:bg-[#1E1E1E] text-neutral-900 dark:text-neutral-100 border-neutral-300 dark:border-neutral-700' },
                { depth: 0, name: 'main()', arg: 'caller', status: 'Invoca factorial(4)', color: 'bg-neutral-100 dark:bg-[#2A2A2A] text-neutral-700 dark:text-neutral-300 border-neutral-300 dark:border-neutral-700' },
              ].map((frame, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedFrame(frame.depth)}
                  className={`p-3 border cursor-pointer transition-all ${
                    selectedFrame === frame.depth
                      ? 'ring-2 ring-neutral-950 dark:ring-white shadow-sm ' + frame.color
                      : 'hover:opacity-90 ' + frame.color
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">{frame.name}</span>
                    <span className="text-[10px] opacity-80">Marco #{frame.depth}</span>
                  </div>
                  <div className="mt-1 flex items-center justify-between text-[11px] opacity-90">
                    <span>{frame.arg}</span>
                    <span className="truncate ml-2">{frame.status}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-neutral-200 dark:border-neutral-800 text-[11px] font-mono text-neutral-500 dark:text-neutral-400 text-center">
              Puntero RSP actual: <span className="text-neutral-900 dark:text-white font-semibold">0x7FFFFFFFDE40</span> · Profundidad de Pila: <span className="text-neutral-900 dark:text-white font-semibold">5 Frames (O(n))</span>
            </div>
          </div>
        </div>

        {/* Taxonomy of Recursion */}
        <div className="border-t border-neutral-200 dark:border-neutral-800 pt-12">
          <h3 className="text-2xl font-serif font-medium text-neutral-950 dark:text-white mb-8">
            Taxonomía de Procedimientos Recursivos
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="p-5 border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#141414]">
              <span className="font-mono text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-widest block mb-2">Tipo A</span>
              <h4 className="text-base font-serif font-semibold text-neutral-950 dark:text-white mb-2">Recursión Lineal (Simple)</h4>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed mb-3">
                Cada activación genera a lo sumo una única subllamada recursiva. La pila crece con factor de ramificación <span className="font-mono">b = 1</span>.
              </p>
              <div className="p-2 bg-neutral-50 dark:bg-[#1C1C1C] border border-neutral-200 dark:border-neutral-700 font-mono text-[11px] text-neutral-800 dark:text-neutral-200">
                Factorial, Búsqueda Binaria.
              </div>
            </div>

            <div className="p-5 border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#141414]">
              <span className="font-mono text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-widest block mb-2">Tipo B</span>
              <h4 className="text-base font-serif font-semibold text-neutral-950 dark:text-white mb-2">Recursión Múltiple (Árbol)</h4>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed mb-3">
                Cada activación genera dos o más subllamadas. La traza de llamadas forma un árbol jerárquico ramificado con crecimiento exponencial.
              </p>
              <div className="p-2 bg-neutral-50 dark:bg-[#1C1C1C] border border-neutral-200 dark:border-neutral-700 font-mono text-[11px] text-neutral-800 dark:text-neutral-200">
                Fibonacci, Torres de Hanói.
              </div>
            </div>

            <div className="p-5 border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#141414]">
              <span className="font-mono text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-widest block mb-2">Tipo C</span>
              <h4 className="text-base font-serif font-semibold text-neutral-950 dark:text-white mb-2">Recursión Indirecta (Mutua)</h4>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed mb-3">
                Una función <span className="font-mono">f()</span> invoca a <span className="font-mono">g()</span>, y esta a su vez vuelve a invocar a <span className="font-mono">f()</span>, formando un ciclo interactivo.
              </p>
              <div className="p-2 bg-neutral-50 dark:bg-[#1C1C1C] border border-neutral-200 dark:border-neutral-700 font-mono text-[11px] text-neutral-800 dark:text-neutral-200">
                Parseo gramatical (BNF).
              </div>
            </div>

            <div className="p-5 border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#141414]">
              <span className="font-mono text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-widest block mb-2">Tipo D</span>
              <h4 className="text-base font-serif font-semibold text-neutral-950 dark:text-white mb-2">Recursión de Cola (Tail)</h4>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed mb-3">
                La auto-invocación es la última operación atómica del cuerpo antes del retorno; no requiere operaciones pendientes al volver.
              </p>
              <div className="p-2 bg-neutral-50 dark:bg-[#1C1C1C] border border-neutral-200 dark:border-neutral-700 font-mono text-[11px] text-neutral-800 dark:text-neutral-200">
                Optimizable a O(1) vía TCO.
              </div>
            </div>

          </div>
        </div>

        {/* Deep Dive: Tail-Call Optimization (TCO) */}
        <div className="mt-12 p-6 sm:p-8 border border-neutral-300 dark:border-neutral-800 bg-neutral-50/70 dark:bg-[#171717]">
          <div className="flex items-center gap-2 mb-3">
            <Cpu className="w-5 h-5 text-neutral-900 dark:text-white" />
            <h3 className="text-lg font-serif font-semibold text-neutral-950 dark:text-white">
              La Revolución de TCO: De Proceso Recursivo a Proceso Iterativo
            </h3>
          </div>

          <p className="text-sm text-neutral-700 dark:text-neutral-300 font-serif leading-relaxed mb-6">
            Harold Abelson y Gerald Jay Sussman formalizaron en <em>SICP</em> <a href="#ref-3" className="text-neutral-900 dark:text-neutral-200 font-mono text-xs hover:underline">[3]</a> la distinción crucial: un procedimiento puede ser sintácticamente recursivo (escrito como una función que se llama a sí misma) pero generar un <strong>proceso computacional iterativo</strong> que consume memoria auxiliar constante <span className="font-mono text-neutral-950 dark:text-white">O(1)</span> gracias a la optimización de cola (Tail-Call Optimization).
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
            <div className="p-4 bg-white dark:bg-[#141414] border border-neutral-200 dark:border-neutral-800">
              <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-2 mb-3">
                <span className="font-semibold text-neutral-900 dark:text-white">Recursión Estándar (No-Cola)</span>
                <span className="text-[10px] text-neutral-500 dark:text-neutral-400">Memoria: O(n)</span>
              </div>
              <pre className="text-neutral-800 dark:text-neutral-200 leading-relaxed overflow-x-auto">
{`function fact(n: number): number {
  if (n <= 1) return 1;
  // Operación pendiente: la multiplicación
  // exige mantener el marco activo
  return n * fact(n - 1);
}`}
              </pre>
              <div className="mt-3 text-[11px] text-neutral-600 dark:text-neutral-400 font-sans border-t border-neutral-100 dark:border-neutral-800 pt-2">
                ✕ La CPU no puede destruir el marco de <span className="font-mono">n</span> porque debe recordar multiplicarlo por el resultado de <span className="font-mono">fact(n-1)</span>.
              </div>
            </div>

            <div className="p-4 bg-white dark:bg-[#141414] border border-neutral-900 dark:border-neutral-400">
              <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-2 mb-3">
                <span className="font-semibold text-neutral-900 dark:text-white">Recursión de Cola con Acumulador</span>
                <span className="text-[10px] font-bold text-neutral-900 dark:text-white">Memoria: O(1) con TCO</span>
              </div>
              <pre className="text-neutral-800 dark:text-neutral-200 leading-relaxed overflow-x-auto">
{`function factTail(n: number, acc = 1): number {
  if (n <= 1) return acc;
  // Llamada en posición de cola pura:
  // no hay cálculos tras el retorno
  return factTail(n - 1, n * acc);
}`}
              </pre>
              <div className="mt-3 text-[11px] text-neutral-900 dark:text-white font-sans border-t border-neutral-100 dark:border-neutral-800 pt-2 font-medium">
                ✓ El compilador sobrescribe el marco actual con un simple salto <span className="font-mono">JMP</span>. No existe riesgo de desbordamiento de pila.
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
