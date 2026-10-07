import React, { useState } from 'react';
import { Layers, GitFork, Move, Sparkles, BookOpen, HelpCircle, ChevronDown, ChevronUp, Play, MousePointer, Cpu, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { FactorialSimulator } from './simulators/FactorialSimulator';
import { FibonacciSimulator } from './simulators/FibonacciSimulator';
import { HanoiSimulator } from './simulators/HanoiSimulator';
import { FractalsSimulator } from './simulators/FractalsSimulator';

export const SimulatorsBlock: React.FC = () => {
  const [activeSim, setActiveSim] = useState<'factorial' | 'fibonacci' | 'hanoi' | 'fractals'>('factorial');
  const [showGuide, setShowGuide] = useState<boolean>(false);

  const guideContent = {
    factorial: {
      title: "Simulador de Factorial y Desglose de Pila",
      howItWorks:
        "Este simulador reproduce físicamente la dinámica del Call Stack (Pila de Llamadas) en la memoria del procesador. Cuando invocas factorial(n), el sistema apila sucesivamente un marco de activación (Stack Frame) por cada valor de n hasta llegar al caso base n <= 1 (Fase de Descenso o Winding). Al alcanzar el caso base, comienza la Fase de Ascenso (Unwinding), donde cada función multiplica n por el valor que le devolvió la llamada hija, destruye su marco y desciende el puntero de pila (RSP) hasta devolver el resultado final a main().",
      steps: [
        {
          title: "1. Seleccionar Entrada n",
          desc: "Usa el selector desplegable 'Entrada n' (de 1! a 7!) para definir la profundidad de la recursión.",
        },
        {
          title: "2. Iniciar o Avanzar Paso a Paso",
          desc: "Haz clic en 'Ejecutar' para ver la animación automática continua, o utiliza los botones 'Paso Anterior' (⏮) y 'Paso Siguiente' (⏭) para avanzar instrucción por instrucción.",
        },
        {
          title: "3. Monitorear la Pila y el Código",
          desc: "Observa en la columna izquierda cómo crecen los marcos de pila hacia arriba y en la columna derecha cómo se resalta la línea exacta de código TypeScript ejecutada en ese instante.",
        },
        {
          title: "4. Regular Velocidad y Reiniciar",
          desc: "Desliza la barra de 'Velocidad' para acelerar o pausar según tu ritmo de análisis, y presiona el botón circular de reinicio (↺) para volver al estado inicial.",
        },
      ],
      tip: "Presta especial atención al momento en que n=1: la etiqueta cambia a '★ CASO BASE' y la pila deja de crecer para comenzar a multiplicarse en reversa.",
    },
    fibonacci: {
      title: "Simulador de Árbol de Recursividad de Fibonacci",
      howItWorks:
        "Modela la bifurcación jerárquica de la recursión múltiple. En el cálculo de F(n) = F(n-1) + F(n-2), cada llamada genera dos llamadas hijas formando un árbol binario. En la versión ingenua, se produce una explosión exponencial O(2ⁿ) porque subproblemas como F(2) o F(3) se recalculan decenas de veces en ramas aisladas. Con la técnica de Memoización (Programación Dinámica de arriba hacia abajo), el sistema almacena los resultados en una tabla hash: la primera vez que resuelve un subproblema lo guarda, y en las siguientes lo devuelve en tiempo constante O(1), podando ramas enteras del árbol.",
      steps: [
        {
          title: "1. Seleccionar Término n",
          desc: "Elige el valor de n (de 1 a 5) en el selector para generar el árbol de llamadas correspondiente.",
        },
        {
          title: "2. Conmutar el Modo de Ejecución",
          desc: "Alterna entre 'Recursión Ingenua O(2ⁿ)' y 'Con Memoización O(n)' para comparar visualmente cómo la memoización poda ramas enteras y ahorra llamadas.",
        },
        {
          title: "3. Inspeccionar Nodos Interactivos",
          desc: "Haz clic sobre cualquier círculo del árbol SVG: el inspector inferior te indicará si el nodo se resolvió por caso base, por cálculo recursivo o si provino de un acierto de caché en O(1).",
        },
        {
          title: "4. Analizar Métricas Asintóticas",
          desc: "Revisa las tarjetas superiores de 'Total de Invocaciones' y 'Aciertos de Caché' para cuantificar la optimización algorítmica lograda.",
        },
      ],
      tip: "Compara F(4) en modo ingenuo (9 llamadas) contra F(4) memoizado (apenas 5 llamadas y 2 aciertos de caché instantáneos).",
    },
    hanoi: {
      title: "Simulador de las Torres de Hanói",
      howItWorks:
        "Representa el algoritmo clásico de reducción simétrica. Para mover n discos desde el poste Origen (A) al poste Destino (C) usando un Auxiliar (B), el algoritmo resuelve inductivamente tres tareas: 1) Mover recursivamente n-1 discos de A hacia B; 2) Mover el disco más grande restante de A hacia C; 3) Mover recursivamente los n-1 discos de B hacia C. Esto genera una recurrencia T(n) = 2T(n-1) + 1, cuya solución analítica estricta exige exactamente 2ⁿ - 1 movimientos mínimos.",
      steps: [
        {
          title: "1. Elegir Cantidad de Discos",
          desc: "Selecciona entre 3, 4, 5 o 6 discos en el menú superior para ver cómo escala el número de pasos óptimos (7, 15, 31 o 63 movimientos).",
        },
        {
          title: "2. Seleccionar Modo de Uso",
          desc: "Pulsa 'Solución Automática' para que el algoritmo recursivo te guíe paso a paso, o activa el 'Modo Práctica Manual' para jugar tú mismo.",
        },
        {
          title: "3. Cómo Jugar en Modo Manual",
          desc: "Haz clic en el poste que tenga el disco que deseas mover para levantarlo (se elevará visualmente). Luego haz clic en el poste donde quieras depositarlo. El simulador valida que nunca coloques un disco de mayor tamaño sobre uno menor.",
        },
        {
          title: "4. Controlar la Solución Automática",
          desc: "En modo automático, pulsa 'Resolver' para reproducir el traslado continuo o usa 'Paso Siguiente' (⏭) para estudiar cada llamada de la ecuación.",
        },
      ],
      tip: "En modo manual, intenta igualar el récord de 'Óptimo Teórico'. Si cometes un error de regla, el sistema te alertará sin penalizar tu progreso.",
    },
    fractals: {
      title: "Generador de Geometría Fractal Recursiva",
      howItWorks:
        "Renderiza en tiempo real mediante un lienzo HTML5 Canvas de alta definición las cuatro estructuras geométricas autosemejantes más célebres de las ciencias de la computación. Cada nivel de recursión n toma las figuras básicas del nivel anterior y las subdivide en réplicas reducidas por un factor de escala constante. La dimensión de Hausdorff-Besicovitch D = log(N)/log(S) cuantifica la densidad espacial con la que el fractal llena el plano euclidiano.",
      steps: [
        {
          title: "1. Seleccionar Tipo de Fractal",
          desc: "Elige entre Triángulo de Sierpinski (base 3), Curva de Koch (base 4), Árbol Fractal Binario (base 2) o Alfombra de Sierpinski (base 8).",
        },
        {
          title: "2. Variar Nivel de Profundidad n",
          desc: "Desplaza la barra de 'Nivel de Profundidad' para observar cómo la geometría se vuelve más densa y detallada en cada llamada recursiva.",
        },
        {
          title: "3. Ajustar Parámetros Geométricos",
          desc: "En el Árbol Fractal, puedes mover el deslizador del ángulo θ (de 15° a 50°) para experimentar con la simetría de la copa biológica.",
        },
        {
          title: "4. Animar y Exportar",
          desc: "Presiona 'Animar Subdivisión' para ver cómo evoluciona la figura desde n=0, cambia el fondo entre blanco y oscuro, o pulsa 'Exportar PNG' para guardar la imagen en alta calidad.",
        },
      ],
      tip: "Observa en las tarjetas inferiores cómo el número de entidades geométricas calculadas crece a razón de bⁿ, alcanzando miles de segmentos en niveles altos.",
    },
  }[activeSim];

  return (
    <section id="simuladores" className="py-16 sm:py-20 border-b border-neutral-200 dark:border-neutral-800 bg-[#FBFBFB] dark:bg-[#0D0D0D] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-8">
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 dark:text-neutral-400 uppercase tracking-widest mb-2">
            <span>Sección 05</span>
            <span aria-hidden="true">·</span>
            <span>Laboratorio Gráfico Interactivo</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-medium text-neutral-950 dark:text-white tracking-tight">
            Bloque de Algoritmos y Ejemplos Funcionales
          </h2>
          <p className="mt-3 text-base text-neutral-600 dark:text-neutral-400 font-sans leading-relaxed">
            Experimenta la recursividad en acción mediante cuatro simuladores. 
            Monitorea el desapilado de marcos en memoria, la bifurcación de subproblemas superpuestos, 
            el movimiento mecánico de discos de Hanói y la geometría fractal sobre lienzo digital.
          </p>
        </div>

        {/* Tab Segmented Control */}
        <div className="flex flex-wrap gap-2 mb-6 border-b border-neutral-200 dark:border-neutral-800 pb-4">
          <button
            onClick={() => setActiveSim('factorial')}
            className={`px-4 py-2.5 text-xs font-mono uppercase tracking-wider flex items-center gap-2 transition-all border ${
              activeSim === 'factorial'
                ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 border-neutral-900 dark:border-white font-semibold shadow-xs'
                : 'bg-white dark:bg-[#141414] text-neutral-700 dark:text-neutral-300 border-neutral-300 dark:border-neutral-800 hover:border-neutral-900 dark:hover:border-neutral-400'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>01. Factorial & Pila</span>
          </button>

          <button
            onClick={() => setActiveSim('fibonacci')}
            className={`px-4 py-2.5 text-xs font-mono uppercase tracking-wider flex items-center gap-2 transition-all border ${
              activeSim === 'fibonacci'
                ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 border-neutral-900 dark:border-white font-semibold shadow-xs'
                : 'bg-white dark:bg-[#141414] text-neutral-700 dark:text-neutral-300 border-neutral-300 dark:border-neutral-800 hover:border-neutral-900 dark:hover:border-neutral-400'
            }`}
          >
            <GitFork className="w-4 h-4" />
            <span>02. Árbol de Fibonacci</span>
          </button>

          <button
            onClick={() => setActiveSim('hanoi')}
            className={`px-4 py-2.5 text-xs font-mono uppercase tracking-wider flex items-center gap-2 transition-all border ${
              activeSim === 'hanoi'
                ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 border-neutral-900 dark:border-white font-semibold shadow-xs'
                : 'bg-white dark:bg-[#141414] text-neutral-700 dark:text-neutral-300 border-neutral-300 dark:border-neutral-800 hover:border-neutral-900 dark:hover:border-neutral-400'
            }`}
          >
            <Move className="w-4 h-4" />
            <span>03. Torres de Hanói</span>
          </button>

          <button
            onClick={() => setActiveSim('fractals')}
            className={`px-4 py-2.5 text-xs font-mono uppercase tracking-wider flex items-center gap-2 transition-all border ${
              activeSim === 'fractals'
                ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 border-neutral-900 dark:border-white font-semibold shadow-xs'
                : 'bg-white dark:bg-[#141414] text-neutral-700 dark:text-neutral-300 border-neutral-300 dark:border-neutral-800 hover:border-neutral-900 dark:hover:border-neutral-400'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>04. Generador de Fractales</span>
          </button>
        </div>

        {/* Section: ¿Cómo funciona y cómo usarlo? (Interactive Academic Guide) with fluid animation */}
        <div className="mb-8 border border-neutral-300/80 dark:border-neutral-800 bg-white/80 dark:bg-[#141414]/80 backdrop-blur-xl shadow-xs transition-all">
          <div className="p-4 sm:p-5 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50/80 dark:bg-[#181818]/80 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <BookOpen className="w-4 h-4 text-neutral-900 dark:text-white" />
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-neutral-900 dark:text-white">
                Guía de Funcionamiento & Manual de Uso: {guideContent.title}
              </span>
            </div>
            <button
              onClick={() => setShowGuide(!showGuide)}
              className="text-xs font-mono text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white flex items-center gap-1 font-medium transition-colors cursor-pointer"
              aria-expanded={showGuide}
            >
              <span>{showGuide ? 'Ocultar Guía' : 'Ver Guía de Uso'}</span>
              {showGuide ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>

          <AnimatePresence>
            {showGuide && (
              <motion.div
                initial={{ opacity: 0, height: 0, filter: 'blur(6px)' }}
                animate={{ opacity: 1, height: 'auto', filter: 'blur(0px)' }}
                exit={{ opacity: 0, height: 0, filter: 'blur(6px)' }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <div className="p-5 sm:p-7 space-y-6">
                  {/* How it works theoretically */}
                  <div className="border-l-2 border-neutral-900 dark:border-white pl-4 py-0.5">
                    <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-500 dark:text-neutral-400 font-semibold block mb-1">
                      1. ¿Cómo Funciona este Algoritmo en la Computadora?
                    </span>
                    <p className="text-sm font-serif text-neutral-800 dark:text-neutral-200 leading-relaxed">
                      {guideContent.howItWorks}
                    </p>
                  </div>

                  {/* Step by step how to use it */}
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-500 dark:text-neutral-400 font-semibold block mb-3">
                      2. ¿Cómo Utilizar el Simulador?
                    </span>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {guideContent.steps.map((st, idx) => (
                        <div key={idx} className="p-3.5 border border-neutral-200/90 dark:border-neutral-800 bg-neutral-50/70 dark:bg-[#1A1A1A]/70 backdrop-blur-sm flex flex-col justify-between">
                          <div>
                            <div className="flex items-center justify-between mb-1.5">
                              <span className="text-xs font-mono font-bold text-neutral-900 dark:text-white">
                                {st.title}
                              </span>
                              <span className="text-[10px] font-mono text-neutral-400 dark:text-neutral-500">PASO 0{idx + 1}</span>
                            </div>
                            <p className="text-xs text-neutral-600 dark:text-neutral-400 font-sans leading-relaxed">
                              {st.desc}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Didactic tip */}
                  <div className="p-3 bg-neutral-100/80 dark:bg-[#1A1A1A]/80 border border-neutral-200 dark:border-neutral-800 flex items-start gap-2.5 text-xs text-neutral-700 dark:text-neutral-300 font-sans backdrop-blur-xs">
                    <CheckCircle2 className="w-4 h-4 text-neutral-900 dark:text-white shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-neutral-900 dark:text-white font-mono">Consejo Didáctico:</strong>{' '}
                      <span>{guideContent.tip}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Dynamic Simulator View with Fluid Motion & Blur Transitions */}
        <div className="min-h-[500px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSim}
              initial={{ opacity: 0, y: 14, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -12, filter: 'blur(8px)' }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              {activeSim === 'factorial' && <FactorialSimulator />}
              {activeSim === 'fibonacci' && <FibonacciSimulator />}
              {activeSim === 'hanoi' && <HanoiSimulator />}
              {activeSim === 'fractals' && <FractalsSimulator />}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};
