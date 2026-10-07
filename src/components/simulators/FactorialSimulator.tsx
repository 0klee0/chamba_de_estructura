import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, SkipForward, SkipBack, Layers, CheckCircle, Code } from 'lucide-react';

interface StackFrame {
  id: string;
  n: number;
  phase: 'call' | 'waiting' | 'base' | 'return';
  returnValue?: number;
}

interface Step {
  activeLine: number;
  stack: StackFrame[];
  currentN: number;
  description: string;
  phase: 'winding' | 'base' | 'unwinding' | 'done';
  result?: number;
}

export const FactorialSimulator: React.FC = () => {
  const [inputN, setInputN] = useState<number>(4);
  const [steps, setSteps] = useState<Step[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(800); // ms per step

  // Generate complete execution steps trace for factorial(n)
  useEffect(() => {
    const generatedSteps: Step[] = [];

    // Helper to clone stack
    const cloneStack = (s: StackFrame[]): StackFrame[] =>
      s.map(f => ({ ...f }));

    let currentStack: StackFrame[] = [];

    const traceFactorial = (n: number): number => {
      // Step: Enter function
      const frameId = `frame_${n}_${Date.now()}_${Math.random()}`;
      const newFrame: StackFrame = { id: frameId, n, phase: 'call' };
      currentStack.push(newFrame);

      generatedSteps.push({
        activeLine: 1,
        stack: cloneStack(currentStack),
        currentN: n,
        description: `Invocación de factorial(${n}). Se reserva nuevo marco de pila (Stack Frame).`,
        phase: n <= 1 ? 'base' : 'winding',
      });

      // Step: Check base case
      generatedSteps.push({
        activeLine: 2,
        stack: cloneStack(currentStack),
        currentN: n,
        description: `Evaluación de condición: if (${n} <= 1) → ${n <= 1 ? 'VERDADERO (Caso Base)' : 'FALSO'}`,
        phase: n <= 1 ? 'base' : 'winding',
      });

      if (n <= 1) {
        // Base case hit
        const top = currentStack[currentStack.length - 1];
        top.phase = 'base';
        top.returnValue = 1;

        generatedSteps.push({
          activeLine: 2,
          stack: cloneStack(currentStack),
          currentN: n,
          description: `Caso Base alcanzado para n = ${n}. Se retorna valor trivial 1 sin recursión.`,
          phase: 'base',
          result: 1,
        });

        // Pop base case frame
        currentStack.pop();
        return 1;
      }

      // Recursive case: wait for factorial(n-1)
      const currentTop = currentStack[currentStack.length - 1];
      currentTop.phase = 'waiting';

      generatedSteps.push({
        activeLine: 3,
        stack: cloneStack(currentStack),
        currentN: n,
        description: `Caso Recursivo: factorial(${n}) suspende ejecución esperando retorno de factorial(${n - 1}).`,
        phase: 'winding',
      });

      const subResult = traceFactorial(n - 1);

      // Returning: resume factorial(n)
      const resumeTop = currentStack[currentStack.length - 1];
      resumeTop.phase = 'return';
      const myResult = n * subResult;
      resumeTop.returnValue = myResult;

      generatedSteps.push({
        activeLine: 4,
        stack: cloneStack(currentStack),
        currentN: n,
        description: `Retorno de llamada hija: ${n} * factorial(${n - 1}) = ${n} * ${subResult} = ${myResult}.`,
        phase: 'unwinding',
        result: myResult,
      });

      currentStack.pop();
      return myResult;
    };

    traceFactorial(inputN);

    // Final Done step
    generatedSteps.push({
      activeLine: 0,
      stack: [],
      currentN: inputN,
      description: `Ejecución finalizada. Pila de llamadas vaciada (RSP restaurado). Resultado final: ${inputN}! = ${generatedSteps[generatedSteps.length - 1]?.result || 1}.`,
      phase: 'done',
      result: generatedSteps[generatedSteps.length - 1]?.result || 1,
    });

    setSteps(generatedSteps);
    setCurrentStepIndex(0);
    setIsPlaying(false);
  }, [inputN]);

  // Autoplay ticker
  useEffect(() => {
    let timer: any;
    if (isPlaying && currentStepIndex < steps.length - 1) {
      timer = setTimeout(() => {
        setCurrentStepIndex(prev => prev + 1);
      }, speed);
    } else if (currentStepIndex >= steps.length - 1) {
      setIsPlaying(false);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentStepIndex, steps.length, speed]);

  const currentStep = steps[currentStepIndex] || {
    activeLine: 1,
    stack: [],
    currentN: inputN,
    description: 'Iniciando trazador...',
    phase: 'winding',
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStepIndex(0);
  };

  const handleStepForward = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    }
  };

  const handleStepBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  return (
    <div className="border border-neutral-300 dark:border-neutral-800 bg-white dark:bg-[#141414] p-6 sm:p-8 shadow-xs transition-colors">
      
      {/* Simulator Header & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-200 dark:border-neutral-800 pb-5 mb-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
            Simulador 01 · Recursión Lineal
          </span>
          <h3 className="text-xl sm:text-2xl font-serif font-medium text-neutral-950 dark:text-white mt-0.5">
            Factorial & Desglose de Pila 
          </h3>
        </div>

        {/* N selector & Playback controls */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 border border-neutral-200 dark:border-neutral-700 px-3 py-1.5 bg-neutral-50 dark:bg-[#1A1A1A] text-xs font-mono">
            <span className="text-neutral-500 dark:text-neutral-400 font-medium">Entrada n:</span>
            <select
              value={inputN}
              onChange={(e) => setInputN(parseInt(e.target.value))}
              disabled={isPlaying}
              className="bg-transparent font-bold text-neutral-900 dark:text-white cursor-pointer focus:outline-none"
            >
              {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                <option key={num} value={num} className="bg-white dark:bg-[#1A1A1A] text-neutral-900 dark:text-white">
                  {num}!
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center border border-neutral-300 dark:border-neutral-700 divide-x divide-neutral-200 dark:divide-neutral-700 bg-white dark:bg-[#1A1A1A]">
            <button
              onClick={handleStepBack}
              disabled={currentStepIndex === 0}
              className="p-2 text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white hover:bg-neutral-50 dark:hover:bg-[#252525] disabled:opacity-30 disabled:hover:bg-transparent"
              title="Paso Anterior"
            >
              <SkipBack className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="px-3 py-2 text-neutral-900 dark:text-white hover:bg-neutral-100 dark:hover:bg-[#252525] flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider font-semibold"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-4 h-4" /> Pausa
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" /> Ejecutar
                </>
              )}
            </button>
            <button
              onClick={handleStepForward}
              disabled={currentStepIndex === steps.length - 1}
              className="p-2 text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white hover:bg-neutral-50 dark:hover:bg-[#252525] disabled:opacity-30 disabled:hover:bg-transparent"
              title="Paso Siguiente"
            >
              <SkipForward className="w-4 h-4" />
            </button>
            <button
              onClick={handleReset}
              className="p-2 text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white hover:bg-neutral-50 dark:hover:bg-[#252525]"
              title="Reiniciar"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Speed & Progress Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 text-xs font-mono text-neutral-500 dark:text-neutral-400">
        <div className="flex items-center gap-3">
          <span>Paso {currentStepIndex + 1} de {steps.length}</span>
          <span aria-hidden="true">·</span>
          <span className="capitalize">
            Fase: <strong className="text-neutral-900 dark:text-white">{currentStep.phase === 'winding' ? 'Descenso (Winding)' : currentStep.phase === 'base' ? 'Caso Base (Ancla)' : currentStep.phase === 'unwinding' ? 'Ascenso (Unwinding)' : 'Completado'}</strong>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span>Velocidad:</span>
          <input
            type="range"
            min="200"
            max="1500"
            step="100"
            value={1700 - speed}
            onChange={(e) => setSpeed(1700 - parseInt(e.target.value))}
            className="w-24 accent-neutral-900 dark:accent-neutral-100 cursor-pointer"
          />
        </div>
      </div>

      {/* Main Grid: Call Stack visualization (Left) + Code & State (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Physical Call Stack visualizer */}
        <div className="lg:col-span-6 border border-neutral-300 dark:border-neutral-800 p-5 bg-neutral-50/50 dark:bg-[#171717]">
          <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-3 mb-4">
            <span className="text-xs font-mono uppercase font-semibold text-neutral-900 dark:text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-neutral-800 dark:text-neutral-200" /> Pila en Memoria (Call Stack)
            </span>
            <span className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400">
              Profundidad actual: {currentStep.stack.length}
            </span>
          </div>

          <div className="min-h-[280px] flex flex-col-reverse justify-start gap-2 border border-dashed border-neutral-300 dark:border-neutral-700 p-4 bg-white dark:bg-[#101010]">
            {currentStep.stack.length === 0 ? (
              <div className="my-auto text-center py-10 font-mono text-xs text-neutral-400 dark:text-neutral-500">
                [Pila vacía — Memoria liberada]
              </div>
            ) : (
              currentStep.stack.map((frame, index) => {
                const isTop = index === currentStep.stack.length - 1;
                return (
                  <div
                    key={frame.id || index}
                    className={`p-3 border transition-all duration-200 font-mono text-xs ${
                      isTop
                        ? 'border-neutral-950 dark:border-white bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 shadow-xs'
                        : 'border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-[#1E1E1E] text-neutral-800 dark:text-neutral-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold">
                        factorial({frame.n})
                      </span>
                      <span className="text-[10px] uppercase tracking-wider opacity-80">
                        {frame.phase === 'base'
                          ? '★ CASO BASE'
                          : frame.phase === 'return'
                          ? '✔ RETORNO'
                          : isTop
                          ? '● EN EJECUCIÓN'
                          : '⏸ ESPERANDO HIJA'}
                      </span>
                    </div>

                    <div className="mt-1 flex items-center justify-between text-[11px] opacity-90">
                      <span>Argumento: n = {frame.n}</span>
                      <span>
                        {frame.returnValue !== undefined ? `Retorna: ${frame.returnValue}` : 'Retorno pendiente'}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-neutral-500 dark:text-neutral-400">
            <span>Base de la Pila (Caller)</span>
            <span>Tope de Pila (RSP) ↑</span>
          </div>
        </div>

        {/* Right: Code Inspector & Step Log */}
        <div className="lg:col-span-6 space-y-4">
          <div className="border border-neutral-300 dark:border-neutral-800 bg-neutral-900 dark:bg-[#0A0A0A] text-neutral-200 p-4 font-mono text-xs shadow-xs">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-2 mb-3 text-neutral-400">
              <span className="flex items-center gap-1.5 text-neutral-300 font-semibold">
                <Code className="w-3.5 h-3.5" /> factorial.ts
              </span>
              <span className="text-[10px]">Línea activa: {currentStep.activeLine || 'Fin'}</span>
            </div>

            <div className="space-y-1">
              {[
                { line: 1, code: 'function factorial(n: number): number {' },
                { line: 2, code: '  if (n <= 1) return 1; // Caso Base' },
                { line: 3, code: '  const sub = factorial(n - 1); // Caso Recursivo' },
                { line: 4, code: '  return n * sub; // Combinación' },
                { line: 5, code: '}' },
              ].map((item) => {
                const isActive = currentStep.activeLine === item.line;
                return (
                  <div
                    key={item.line}
                    className={`flex items-center px-2 py-1 rounded transition-colors ${
                      isActive ? 'bg-neutral-800 dark:bg-neutral-800 text-white font-bold border-l-2 border-white' : 'text-neutral-400'
                    }`}
                  >
                    <span className="w-6 text-neutral-600 select-none text-[11px]">{item.line}</span>
                    <span className="font-mono">{item.code}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Real-time Narrative Description Card */}
          <div className="p-4 border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#171717]">
            <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400 block mb-1">
              Explicación del Ciclo de Máquina
            </span>
            <p className="text-sm font-serif text-neutral-900 dark:text-neutral-100 leading-relaxed">
              {currentStep.description}
            </p>

            {currentStep.result !== undefined && (
              <div className="mt-3 pt-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-xs font-mono">
                <span className="text-neutral-500 dark:text-neutral-400">Valor Retornado:</span>
                <span className="font-bold text-neutral-950 dark:text-white text-sm">{currentStep.result}</span>
              </div>
            )}
          </div>

          {/* Academic Complexity Note */}
          <div className="p-3 bg-neutral-50 dark:bg-[#1A1A1A] border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-600 dark:text-neutral-400 font-sans">
            <strong className="text-neutral-900 dark:text-neutral-200">Análisis Formal:</strong> Genera exactamente <span className="font-mono font-medium text-neutral-900 dark:text-neutral-100">{inputN}</span> llamadas apiladas. Tiempo de ejecución <span className="font-mono font-medium text-neutral-900 dark:text-neutral-100">O(n)</span> y espacio auxiliar en memoria <span className="font-mono font-medium text-neutral-900 dark:text-neutral-100">O(n)</span>.
          </div>
        </div>

      </div>

    </div>
  );
};
