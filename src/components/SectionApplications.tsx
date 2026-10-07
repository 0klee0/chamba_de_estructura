import React, { useState } from 'react';
import { GitBranch, Network, Search, FileCode2, Binary, Cpu, Compass } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const SectionApplications: React.FC = () => {
  const [activeArea, setActiveArea] = useState<number>(0);

  const applications = [
    {
      title: "Divide y Vencerás (Divide & Conquer)",
      icon: GitBranch,
      lead: "Descomposición ortogonal de problemas en subinstancias disjuntas de orden menor, resolución recursiva y combinación lineal.",
      examples: [
        {
          name: "MergeSort & QuickSort",
          desc: "División del arreglo en mitades o mediante pivoteo. Resuelve el ordenamiento en tiempo óptimo O(n log n) frente al O(n²) de algoritmos iterativos ingenuos.",
        },
        {
          name: "Transformada Rápida de Fourier (FFT)",
          desc: "El algoritmo recursivo de Cooley-Tukey reduce la complejidad de O(N²) a O(N log N). Fundamento de telecomunicaciones inalámbricas (OFDM, 5G), compresión de audio MP3 y procesamiento de imágenes satelitales.",
        },
        {
          name: "Multiplicación de Karatsuba & Strassen",
          desc: "Multiplicación recursiva de enteros gigantescos y matrices densas con exponente asintótico sub-cúbico O(n^2.807).",
        },
      ],
      codeSample: `// Esquema Canónico Divide and Conquer
function divideYVenceras(problema: P): Solucion {
  if (esTrivial(problema)) return resolverBase(problema);
  const [sub1, sub2] = partir(problema);
  const sol1 = divideYVenceras(sub1);
  const sol2 = divideYVenceras(sub2);
  return combinar(sol1, sol2);
}`,
      citation: "[1] Cormen et al., Introduction to Algorithms, pp. 65–110.",
    },
    {
      title: "Estructuras Jerárquicas & Recorrido de Grafos",
      icon: Network,
      lead: "Navegación nativa de entidades de datos no lineales cuya topología es intrínsecamente autorreferente.",
      examples: [
        {
          name: "Árboles de Búsqueda Binaria (BST, AVL, Red-Black)",
          desc: "Las operaciones de inserción, balanceo por rotaciones y búsqueda se definen recursivamente: un nodo es un árbol cuyas ramas izquierda y derecha son a su vez árboles.",
        },
        {
          name: "Recorridos Inorden, Preorden & Postorden",
          desc: "Insustituibles para la evaluación de árboles sintácticos, serialización JSON/XML y cálculo de tamaños de directorios en discos duros.",
        },
        {
          name: "Búsqueda en Profundidad (DFS)",
          desc: "Detección de dependencias cíclicas en sistemas de compilación modernos (Webpack, Vite, Cargo, npm) y ordenamiento topológico.",
        },
      ],
      codeSample: `// Recorrido Inorden de Árbol Binario
function inorden(nodo: Nodo | null): void {
  if (nodo === null) return; // Caso Base
  inorden(nodo.izq);         // Subárbol Izquierdo
  procesar(nodo.valor);      // Raíz
  inorden(nodo.der);         // Subárbol Derecho
}`,
      citation: "[4] Sedgewick & Wayne, Algorithms, pp. 288–310.",
    },
    {
      title: "Backtracking & Optimización Combinatoria",
      icon: Search,
      lead: "Exploración sistemática del espacio de soluciones mediante poda heurística (pruning) y desapilado al violar restricciones.",
      examples: [
        {
          name: "Problema de las N-Reinas & Sudoku",
          desc: "Posicionamiento tentativo de elementos. Si una rama del árbol de decisiones colisiona con una restricción, la recursión retrocede (backtrack) restaurando el estado previo.",
        },
        {
          name: "Solucionadores SAT & Criptografía",
          desc: "Algoritmos DPLL recursivos para determinar la satisfacibilidad de fórmulas booleanas complejas, pilar de la verificación formal de microchips.",
        },
        {
          name: "Algoritmo Minimax con Poda Alfa-Beta",
          desc: "Árbol recursivo de toma de decisiones en motores de ajedrez (como Stockfish) evaluando millones de posiciones futuras alternando turnos.",
        },
      ],
      codeSample: `function backtrack(estado: Estado, candidatas: Opcion[]): boolean {
  if (esSolucionCompleta(estado)) return true;
  for (const c of candidatas) {
    if (esValida(c, estado)) {
      aplicar(c, estado);
      if (backtrack(estado, proximasOpciones(estado))) return true;
      deshacer(c, estado); // Retroceso en la pila
    }
  }
  return false;
}`,
      citation: "[6] Wirth, Algorithms + Data Structures = Programs, pp. 125–168.",
    },
    {
      title: "Compiladores, Parseo & AST",
      icon: FileCode2,
      lead: "Interpretación formal de gramáticas libres de contexto y traducción de lenguajes de alto nivel a código de máquina.",
      examples: [
        {
          name: "Analizador Sintáctico Descendente Recursivo",
          desc: "Cada regla gramatical en Notación de Backus-Naur (BNF) se traduce directamente en una función recursiva del compilador.",
        },
        {
          name: "Generación del Árbol de Sintaxis Abstracta (AST)",
          desc: "Transformación de texto plano de código fuente en grafos jerárquicos tipados procesados por linters, optimizadores y transpiladores (Babel, TypeScript).",
        },
        {
          name: "Evaluadores de Expresiones Aritméticas",
          desc: "Cálculo de expresiones anidadas con paréntesis mediante la precedencia de operadores resuelta recursivamente.",
        },
      ],
      codeSample: `// Regla gramatical: Expresion -> Termino ( ('+'|'-') Termino )*
function parseExpresion(): ASTNode {
  let izq = parseTermino();
  while (coincide('+', '-')) {
    const operador = consumir();
    const der = parseTermino();
    izq = new BinaryOpNode(operador, izq, der);
  }
  return izq;
}`,
      citation: "[5] Aho, Hopcroft & Ullman, Data Structures & Algorithms, pp. 37–63.",
    },
    {
      title: "Navegación GPS & Rutas Logísticas",
      icon: Compass,
      lead: "Cálculo de trayectorias óptimas en tiempo real en Google Maps, ruteo de entregas en Amazon y cálculo de grados de separación en redes sociales.",
      examples: [
        {
          name: "Rutas Óptimas en Google Maps & Waze (Algoritmo A*)",
          desc: "Exploración de grafos viales donde cada intersección evalúa recursivamente las calles vecinas más cortas hacia el destino, recalculando rutas alternas al instante si ocurre un accidente o bloqueo.",
        },
        {
          name: "Optimización de Envíos en Amazon & FedEx (VRP / TSP)",
          desc: "Planificación de rutas de reparto para camionetas de última milla. Divide la ciudad en zonas recursivas y calcula el orden de paradas para ahorrar miles de litros de combustible diarios.",
        },
        {
          name: "Redes Sociales & Conexiones (LinkedIn / Meta)",
          desc: "Exploración recursiva en anchura/profundidad para calcular los grados de separación («Conexión de 2º grado») y recomendar personas que quizás conozcas a partir de amigos en común.",
        },
      ],
      codeSample: `// Búsqueda Recursiva de Ruta Óptima (GPS)
function buscarRuta(actual: Nodo, destino: Nodo, visitados: Set<string>): Ruta | null {
  if (actual.id === destino.id) return [actual]; // Caso Base: Llegada
  visitados.add(actual.id);
  
  let mejorRuta: Ruta | null = null;
  for (const tramo of actual.viasConectadas) {
    if (!visitados.has(tramo.destino.id)) {
      const subRuta = buscarRuta(tramo.destino, destino, new Set(visitados));
      if (subRuta && (!mejorRuta || subRuta.tiempo < mejorRuta.tiempo)) {
        mejorRuta = [actual, ...subRuta];
      }
    }
  }
  return mejorRuta;
}`,
      citation: "[1] Cormen et al., Introduction to Algorithms, pp. 658–690.",
    },
    {
      title: "Gráficos 3D, Videojuegos & Cine",
      icon: Cpu,
      lead: "Simulación de luz fotorrealista (Ray Tracing en películas de Pixar y tarjetas gráficas RTX), detección de colisiones e infinitud procedural en videojuegos.",
      examples: [
        {
          name: "Trazado de Rayos (Ray Tracing en Pixar & Cine de Hollywood)",
          desc: "Para colorear cada píxel de una película animada, la computadora dispara un rayo de luz virtual. Cuando el rayo impacta un espejo o agua, genera llamadas recursivas para calcular los reflejos secundarios hasta agotar el límite de rebotes.",
        },
        {
          name: "Detección de Colisiones en Videojuegos (Árboles BVH)",
          desc: "Partición jerárquica del espacio 3D en cajas englobantes para saber en milisegundos si un disparo impactó a un jugador sin tener que analizar millones de polígonos uno por uno.",
        },
        {
          name: "Generación de Terrenos Infinitos (Minecraft)",
          desc: "Algoritmos recursivos de subdivisión de diamantes y cuadrados (Midpoint Displacement) que crean cordilleras, cavernas y archipiélagos con aspecto geológico natural sobre la marcha.",
        },
      ],
      codeSample: `// Ray Tracing: Rebote Recursivo de Rayos de Luz
function trazarRayo(rayo: Rayo, rebotesRestantes: number): ColorRGB {
  if (rebotesRestantes <= 0) return COLOR_AMBIENTE; // Caso Base
  
  const impacto = buscarColision3D(rayo);
  if (!impacto) return COLOR_CIELO; // Rayo escapa de la escena
  
  // Rebote recursivo sobre superficies reflectantes
  const rayoReflejado = calcularReflexion(rayo, impacto.normal);
  const luzReflejada = trazarRayo(rayoReflejado, rebotesRestantes - 1);
  
  return combinarLuz(impacto.material, luzReflejada);
}`,
      citation: "[7] B. Mandelbrot, The Fractal Geometry of Nature, pp. 24–48.",
    },
  ];

  return (
    <section id="aplicaciones" className="py-16 sm:py-20 border-b border-neutral-200 dark:border-neutral-800 bg-[#FBFBFB] dark:bg-[#0D0D0D] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 dark:text-neutral-400 uppercase tracking-widest mb-2">
            <span>Sección 03</span>
            <span aria-hidden="true">·</span>
            <span>Ingeniería Aplicada</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-medium text-neutral-950 dark:text-white tracking-tight">
            Procedimientos Recursivos en Problemas Reales
          </h2>
          <p className="mt-3 text-base text-neutral-600 dark:text-neutral-400 font-sans leading-relaxed">
            Lejos de ser un ejercicio puramente académico, la recursividad es la arquitectura subyacente de los motores de búsqueda, los compiladores de software y los sistemas de compresión digital que sostienen la infraestructura tecnológica moderna.
          </p>
        </div>

        {/* 6 Interactive Applications Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 mb-8">
          {applications.map((app, idx) => {
            const Icon = app.icon;
            const isSelected = activeArea === idx;
            return (
              <button
                key={idx}
                onClick={() => setActiveArea(idx)}
                className={`p-4 text-left border transition-all ${
                  isSelected
                    ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 border-neutral-900 dark:border-white shadow-sm'
                    : 'bg-white dark:bg-[#141414] text-neutral-800 dark:text-neutral-200 border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <Icon className={`w-5 h-5 ${isSelected ? 'text-white dark:text-neutral-950' : 'text-neutral-700 dark:text-neutral-300'}`} />
                  <span className={`text-[10px] font-mono ${isSelected ? 'text-neutral-300 dark:text-neutral-600' : 'text-neutral-400 dark:text-neutral-500'}`}>
                    0{idx + 1}
                  </span>
                </div>
                <h3 className="text-sm font-semibold tracking-tight leading-tight">
                  {app.title}
                </h3>
              </button>
            );
          })}
        </div>

        {/* Display Active Application Details with fluid blur motion */}
        <div className="border border-neutral-300/80 dark:border-neutral-800 bg-white/80 dark:bg-[#141414]/80 backdrop-blur-xl p-6 sm:p-8 shadow-xs min-h-[380px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeArea}
              initial={{ opacity: 0, y: 12, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -10, filter: 'blur(8px)' }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
                    Dominio de Aplicación 0{activeArea + 1}
                  </span>
                  <h3 className="text-2xl font-serif font-medium text-neutral-950 dark:text-white mt-1">
                    {applications[activeArea].title}
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-300 font-serif leading-relaxed mt-2">
                    {applications[activeArea].lead}
                  </p>
                </div>

                {/* Specific Engineering Examples */}
                <div className="space-y-4">
                  {applications[activeArea].examples.map((item, i) => (
                    <div key={i} className="p-4 border border-neutral-200/90 dark:border-neutral-800 bg-neutral-50/70 dark:bg-[#1C1C1C]/70 backdrop-blur-xs">
                      <h4 className="text-xs font-mono font-bold text-neutral-900 dark:text-white uppercase tracking-wide">
                        {item.name}
                      </h4>
                      <p className="text-xs text-neutral-600 dark:text-neutral-400 font-sans mt-1.5 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="pt-2 text-xs font-mono text-neutral-500 dark:text-neutral-400 border-t border-neutral-200 dark:border-neutral-800">
                  Referencia: <span className="text-neutral-900 dark:text-neutral-200 font-medium">{applications[activeArea].citation}</span>
                </div>
              </div>

              {/* Code / Algorithm implementation card */}
              <div className="lg:col-span-5 border border-neutral-200 dark:border-neutral-800 bg-neutral-950/95 dark:bg-[#0A0A0A]/95 backdrop-blur-md text-neutral-200 p-5 shadow-sm font-mono text-xs">
                <div className="flex items-center justify-between border-b border-neutral-800 pb-3 mb-3 text-neutral-400">
                  <span className="text-[11px] uppercase tracking-wider text-neutral-300 font-semibold">
                    Patrón Estructural
                  </span>
                  <span className="text-[10px]">Pseudocódigo Formal</span>
                </div>
                <pre className="text-neutral-100 overflow-x-auto leading-relaxed py-2">
                  {applications[activeArea].codeSample}
                </pre>
                <div className="mt-4 pt-3 border-t border-neutral-800 text-[11px] text-neutral-400 font-sans">
                  La implementación recursiva refleja con fidelidad la topología matemática del problema, garantizando corrección formal por inducción.
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};
