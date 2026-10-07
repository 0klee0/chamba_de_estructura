import React, { useState } from 'react';
import { AlertCircle, Check, ArrowRight, ShieldAlert, Code2, Sparkles, HelpCircle, Layers, Users, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const SectionDefinition: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'teoria' | 'induccion' | 'riesgos'>('teoria');

  return (
    <section id="definicion" className="py-16 sm:py-20 border-b border-neutral-200 dark:border-neutral-800 bg-[#FBFBFB] dark:bg-[#0D0D0D] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 dark:text-neutral-400 uppercase tracking-widest mb-2">
            <span>Sección 01</span>
            <span aria-hidden="true">·</span>
            <span>Fundamentos Epistemológicos</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-medium text-neutral-950 dark:text-white tracking-tight">
            Definición Formal de Recursividad
          </h2>
          <p className="mt-3 text-base text-neutral-600 dark:text-neutral-400 font-sans leading-relaxed">
            Una subrutina o función se define como recursiva si, durante su ciclo de ejecución, 
            se invoca a sí misma de manera directa o mediante una secuencia indirecta de intermediarios <a href="#referencias" className="text-neutral-900 dark:text-neutral-200 font-mono text-xs hover:underline">[1]</a>, <a href="#referencias" className="text-neutral-900 dark:text-neutral-200 font-mono text-xs hover:underline">[3]</a>.
          </p>
        </div>

        {/* 3 Interactive Tab Selector with subtle glassmorphic styling */}
        <div className="flex border-b border-neutral-200 dark:border-neutral-800 mb-8 overflow-x-auto gap-2">
          <button
            onClick={() => setActiveTab('teoria')}
            className={`pb-3 px-4 text-xs font-medium uppercase tracking-wider transition-all border-b-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'teoria'
                ? 'border-neutral-950 dark:border-white text-neutral-950 dark:text-white font-semibold'
                : 'border-transparent text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200'
            }`}
          >
            01. Estructura Canónica (Base & Recurrencia)
          </button>
          <button
            onClick={() => setActiveTab('induccion')}
            className={`pb-3 px-4 text-xs font-medium uppercase tracking-wider transition-all border-b-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'induccion'
                ? 'border-neutral-950 dark:border-white text-neutral-950 dark:text-white font-semibold'
                : 'border-transparent text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200'
            }`}
          >
            02. Isomorfismo con la Inducción Matemática
          </button>
          <button
            onClick={() => setActiveTab('riesgos')}
            className={`pb-3 px-4 text-xs font-medium uppercase tracking-wider transition-all border-b-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'riesgos'
                ? 'border-neutral-950 dark:border-white text-neutral-950 dark:text-white font-semibold'
                : 'border-transparent text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200'
            }`}
          >
            03. Patología: Desbordamiento de Pila (Stack Overflow)
          </button>
        </div>

        {/* Fluid Tab Content with Motion & Blur Transition */}
        <div className="min-h-[380px]">
          <AnimatePresence mode="wait">
            {activeTab === 'teoria' && (
              <motion.div
                key="teoria"
                initial={{ opacity: 0, y: 12, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -10, filter: 'blur(8px)' }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
              >
                <div className="lg:col-span-7 space-y-6">
                  <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed font-serif text-base sm:text-lg">
                    Para que un procedimiento recursivo sea computacionalmente válido y no desemboque en una divergencia infinita, debe satisfacer estrictamente dos componentes inmutables formulados por Niklaus Wirth <a href="#referencias" className="text-neutral-900 dark:text-neutral-200 font-mono text-xs hover:underline">[6]</a>:
                  </p>

                  <div className="space-y-4">
                    <div className="p-5 border border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-[#141414]/80 backdrop-blur-md shadow-xs">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-mono text-xs font-semibold uppercase tracking-wider text-neutral-900 dark:text-neutral-100 px-2 py-0.5 border border-neutral-900 dark:border-neutral-400">
                          Componente I
                        </span>
                        <h3 className="text-base font-serif font-semibold text-neutral-950 dark:text-white">
                          Caso Base (Condición de Anclaje o Parada)
                        </h3>
                      </div>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-normal">
                        Es la instancia del problema cuya solución es trivial o conocida a priori y no requiere ulteriores llamadas a la función. 
                        Actúa como el límite asintótico inferior que frena la expansión de la pila de ejecución e inicia la fase de resolución o retorno (unwinding).
                      </p>
                      <div className="mt-3 p-2.5 bg-neutral-50 dark:bg-[#1C1C1C] border border-neutral-200 dark:border-neutral-700 font-mono text-xs text-neutral-800 dark:text-neutral-200">
                        <code>if (n &lt;= 1) return 1; // Retorno inmediato sin invocar factorial()</code>
                      </div>
                    </div>

                    <div className="p-5 border border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-[#141414]/80 backdrop-blur-md shadow-xs">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-mono text-xs font-semibold uppercase tracking-wider text-neutral-900 dark:text-neutral-100 px-2 py-0.5 border border-neutral-900 dark:border-neutral-400">
                          Componente II
                        </span>
                        <h3 className="text-base font-serif font-semibold text-neutral-950 dark:text-white">
                          Caso Recursivo (Paso de Reducción)
                        </h3>
                      </div>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-normal">
                        Es la regla generativa que descompone el problema actual en uno o más subproblemas de idéntica naturaleza pero de dimensión estrictamente menor. 
                        La propiedad indispensable es la <em>convergencia monótona</em> hacia el caso base.
                      </p>
                      <div className="mt-3 p-2.5 bg-neutral-50 dark:bg-[#1C1C1C] border border-neutral-200 dark:border-neutral-700 font-mono text-xs text-neutral-800 dark:text-neutral-200">
                        <code>return n * factorial(n - 1); // Reducción de n hacia el caso base n=1</code>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Code / Visual Blueprint Card */}
                <div className="lg:col-span-5 border border-neutral-300 dark:border-neutral-800 bg-white/90 dark:bg-[#141414]/90 backdrop-blur-md p-6 shadow-sm">
                  <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-3 mb-4">
                    <span className="text-xs font-mono font-medium uppercase tracking-wider text-neutral-600 dark:text-neutral-400 flex items-center gap-1.5">
                      <Code2 className="w-4 h-4 text-neutral-800 dark:text-neutral-200" /> Plantilla Formal
                    </span>
                    <span className="text-[10px] font-mono text-neutral-400 dark:text-neutral-500">TypeScript / C99</span>
                  </div>

                  <pre className="font-mono text-xs text-neutral-800 dark:text-neutral-200 leading-relaxed overflow-x-auto p-3 bg-neutral-50 dark:bg-[#0A0A0A] border border-neutral-200 dark:border-neutral-800">
{`function resolver<T>(estado: Estado): Resultado {
  // 1. Caso Base: Verificación de Parada
  if (esCasoBase(estado)) {
    return valorTrivial(estado);
  }

  // 2. Descomposición del problema
  const subEstado = reducir(estado);

  // 3. Caso Recursivo: Auto-invocación
  const subResultado = resolver(subEstado);

  // 4. Combinación y Retorno
  return combinar(estado, subResultado);
}`}
                  </pre>

                  <div className="mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-800 text-xs text-neutral-600 dark:text-neutral-400 space-y-1.5">
                    <p className="font-semibold text-neutral-900 dark:text-neutral-100">Invariante Fundamental:</p>
                    <p className="font-serif italic text-neutral-700 dark:text-neutral-300">
                      Para cualquier entrada válida <span className="font-mono">x ∈ Dominio</span>, 
                      la cadena de aplicaciones sucesivas <span className="font-mono">reducirᵏ(x)</span> alcanza 
                      el caso base en un número finito de pasos <span className="font-mono">k &lt; ∞</span>.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'induccion' && (
              <motion.div
                key="induccion"
                initial={{ opacity: 0, y: 12, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -10, filter: 'blur(8px)' }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start"
              >
                <div className="p-6 border border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-[#141414]/80 backdrop-blur-md space-y-4">
                  <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
                    Fundamento Matemático
                  </span>
                  <h3 className="text-xl font-serif font-medium text-neutral-950 dark:text-white">
                    Inducción Matemática Débil y Fuerte
                  </h3>
                  <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                    En matemática discreta, para demostrar que una proposición <span className="font-serif italic font-medium">P(n)</span> es verdadera para todo entero <span className="font-serif italic">n ≥ 0</span>, se requiere:
                  </p>
                  <ul className="text-xs text-neutral-700 dark:text-neutral-300 space-y-2.5 font-sans">
                    <li className="flex items-start gap-2">
                      <span className="font-mono font-bold text-neutral-900 dark:text-white">1.</span>
                      <span><strong>Base inductiva:</strong> Demostrar que <span className="font-mono">P(0)</span> o <span className="font-mono">P(1)</span> es estrictamente verdadero.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-mono font-bold text-neutral-900 dark:text-white">2.</span>
                      <span><strong>Hipótesis inductiva:</strong> Asumir que <span className="font-mono">P(k)</span> se cumple para un valor arbitrario <span className="font-mono">k</span>.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-mono font-bold text-neutral-900 dark:text-white">3.</span>
                      <span><strong>Paso inductivo:</strong> Demostrar que la validez de <span className="font-mono">P(k)</span> implica lógicamente la validez de <span className="font-mono">P(k+1)</span>.</span>
                    </li>
                  </ul>
                  <div className="pt-2 border-t border-neutral-200 dark:border-neutral-800 text-xs font-mono text-neutral-500 dark:text-neutral-400">
                    Fuente: Graham, Knuth & Patashnik, Concrete Mathematics <a href="#referencias" className="text-neutral-900 dark:text-neutral-200 underline">[8]</a>.
                  </div>
                </div>

                <div className="p-6 border border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-[#141414]/80 backdrop-blur-md space-y-4">
                  <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
                    Equivalencia Computacional
                  </span>
                  <h3 className="text-xl font-serif font-medium text-neutral-950 dark:text-white">
                    El Espejo Algorítmico
                  </h3>
                  <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                    La recursividad algorítmica es la ejecución en reversa de la inducción matemática: mientras la inducción construye la verdad desde el caso base hacia arriba (<span className="font-mono">0 → 1 → 2 ...</span>), la llamada recursiva descompone desde <span className="font-mono">n</span> hacia el caso base (<span className="font-mono">n → n-1 → ... → 0</span>), y luego reconstruye la solución.
                  </p>
                  <div className="p-4 bg-neutral-50/90 dark:bg-[#1A1A1A]/90 border border-neutral-200 dark:border-neutral-700 text-xs text-neutral-800 dark:text-neutral-200 space-y-2">
                    <div className="flex justify-between items-center font-mono font-semibold text-neutral-900 dark:text-white border-b border-neutral-200 dark:border-neutral-700 pb-1.5">
                      <span>Inducción Matemática</span>
                      <span>Recursión Algorítmica</span>
                    </div>
                    <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
                      <span>Caso Base: P(0)</span>
                      <span>Caso Base: n === 0</span>
                    </div>
                    <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
                      <span>Hipótesis: P(k)</span>
                      <span>Subllamada: f(k)</span>
                    </div>
                    <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
                      <span>Paso: P(k) ⇒ P(k+1)</span>
                      <span>Combinación: n * f(n-1)</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'riesgos' && (
              <motion.div
                key="riesgos"
                initial={{ opacity: 0, y: 12, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -10, filter: 'blur(8px)' }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                className="border border-neutral-300 dark:border-neutral-800 bg-white/80 dark:bg-[#141414]/80 backdrop-blur-md p-6 sm:p-8 space-y-6"
              >
                <div className="flex items-start gap-3">
                  <ShieldAlert className="w-5 h-5 text-neutral-900 dark:text-neutral-100 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-lg font-serif font-semibold text-neutral-950 dark:text-white">
                      Desbordamiento de Pila de Ejecución (Stack Overflow)
                    </h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 font-sans mt-1">
                      La ausencia de caso base, una condición inalcanzable o una reducción no monótona provoca una recursión infinita que satura la memoria física asignada al hilo de ejecución <a href="#referencias" className="text-neutral-900 dark:text-neutral-200 font-mono text-xs hover:underline">[2]</a>.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-neutral-700 dark:text-neutral-300">
                  <div className="p-4 border border-neutral-200 dark:border-neutral-700 bg-neutral-50/80 dark:bg-[#1A1A1A]/80 backdrop-blur-sm space-y-2">
                    <span className="font-mono font-semibold text-neutral-900 dark:text-white uppercase">Mecanica en el Sistema Operativo</span>
                    <p className="leading-relaxed">
                      Cada llamada recursiva asigna un nuevo <strong>Marco de Pila (Stack Frame)</strong> que contiene la dirección de retorno (EIP/RIP), los argumentos y las variables locales. El registro puntero de pila (<span className="font-mono">RSP</span>) se decrementa sucesivamente hacia direcciones de memoria más bajas.
                    </p>
                  </div>

                  <div className="p-4 border border-neutral-200 dark:border-neutral-700 bg-neutral-50/80 dark:bg-[#1A1A1A]/80 backdrop-blur-sm space-y-2">
                    <span className="font-mono font-semibold text-neutral-900 dark:text-white uppercase">El error de la Segmentacin</span>
                    <p className="leading-relaxed">
                      Cuando la pila invade la <em>Guard Page</em> (página de protección sin permisos de lectura ni escritura), la Unidad de Manejo de Memoria (MMU) dispara una interrupción por fallo de página que el kernel traduce en un error irrecuperable: <code>SIGSEGV (Segmentation Fault)</code>.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Explicación Intuitiva para Personas No Técnicas (Reemplaza la tabla técnica) */}
        <div className="mt-14 border border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-[#121212]/80 backdrop-blur-xl p-6 sm:p-10 shadow-xs transition-all">
          
          <div className="border-b border-neutral-200 dark:border-neutral-800 pb-5 mb-8">
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 dark:text-neutral-400 uppercase tracking-widest mb-2">
              <Sparkles className="w-3.5 h-3.5 text-neutral-900 dark:text-neutral-200" />
              <span>Comprension </span>
              <span aria-hidden="true">·</span>
              <span>Para Todo Publico</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif font-medium text-neutral-950 dark:text-white tracking-tight">
              ¿Cómo entender la recursividad sin ser programador?
            </h3>
            <p className="mt-3 text-sm sm:text-base text-neutral-600 dark:text-neutral-300 font-sans leading-relaxed max-w-3xl">
              La palabra «recursividad» suena misteriosa, pero en el fondo es una de las ideas más sencillas y elegantes del pensamiento humano: 
              <strong> resolver una tarea grande pidiéndole a alguien que resuelva una versión idéntica pero un poquito más fácil</strong>, 
              hasta llegar a un punto donde la respuesta es tan obvia que ya no hay que pensar.
            </p>
          </div>

          {/* Tres Analogías Intuitivas con Transparencias Suaves e Ilustraciones */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            
            {/* Metáfora 1: Las Muñecas Rusas */}
            <div className="p-5 border border-neutral-200/90 dark:border-neutral-800 bg-neutral-50/70 dark:bg-[#181818]/70 backdrop-blur-md flex flex-col justify-between hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-8 h-8 rounded-full border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#202020] flex items-center justify-center text-xs font-mono font-bold text-neutral-950 dark:text-white">
                    01
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                    Analogía I
                  </span>
                </div>

                {/* Imagen Ilustrativa */}
                <div className="mb-4 overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#141414] aspect-[16/10] relative group">
                  <img
                    src="https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d2/Russian-Matroshka_no_bg.jpg/960px-Russian-Matroshka_no_bg.jpg?utm_source=es.wikipedia.org&utm_campaign=index&utm_content=thumbnail"
                    alt="Esquema visual de muñecas rusas y el freno del caso base en recursividad"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain p-1.5 transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                <h4 className="font-serif text-base font-semibold text-neutral-950 dark:text-white mb-2">
                  La Muñeca Rusa (Matrioshka)
                </h4>
                <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed font-sans">
                  Abres una muñeca y dentro hay otra idéntica pero más pequeña. La abres y encuentras otra aún menor. 
                  ¿Cuándo te detienes? Cuando llegas a la muñequita sólida más diminuta que ya no se puede abrir.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-neutral-200 dark:border-neutral-800 text-[11px] font-mono text-neutral-500 dark:text-neutral-400">
                Esa última muñeca es el <strong>Caso Base</strong>: el freno que evita abrir muñecas por siempre.
              </div>
            </div>

            {/* Metáfora 2: La Fila en el Banco */}
            <div className="p-5 border border-neutral-200/90 dark:border-neutral-800 bg-neutral-50/70 dark:bg-[#181818]/70 backdrop-blur-md flex flex-col justify-between hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-8 h-8 rounded-full border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#202020] flex items-center justify-center text-xs font-mono font-bold text-neutral-950 dark:text-white">
                    02
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                    Analogía II
                  </span>
                </div>

                {/* Imagen Ilustrativa */}
                <div className="mb-4 overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#141414] aspect-[16/10] relative group">
                  <img
                    src="https://imgs.search.brave.com/kzLpzK3EJVNlUg9qCzZ9TJa1M-d0kiIaKopsUJ16DPw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91cy4x/MjNyZi5jb20vNDUw/d20veGltYWdpbmF0/aW9uL3hpbWFnaW5h/dGlvbjIyMTAveGlt/YWdpbmF0aW9uMjIx/MDAwODQ1LzE5Mjcy/MDg0Mi1nZW50ZS1l/c3BlcmFuZG8tZW4t/ZmlsYS1jZXJjYS1k/ZWwtY29uY2VwdG8t/ZGUtaWx1c3RyYWNp/JUMzJUIzbi1kZS12/ZWN0b3ItM2QtaXNv/bSVDMyVBOXRyaWNv/LWRlLWNhamVyby5q/cGc_dmVyPTY"
                    alt="Diagrama de personas en fila preguntando su posición: llamadas y retornos"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain p-1.5 transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                <h4 className="font-serif text-base font-semibold text-neutral-950 dark:text-white mb-2">
                  La Fila en el Banco o Cine
                </h4>
                <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed font-sans">
                  Estás en una fila larga y quieres saber qué lugar ocupas. En vez de contar desde el principio, le preguntas al de adelante: 
                  <em>«¿Qué número eres tú?»</em>. Esa persona le pregunta a la suya, hasta llegar al primero, quien dice: <em>"Soy el 1"</em>.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-neutral-200 dark:border-neutral-800 text-[11px] font-mono text-neutral-500 dark:text-neutral-400">
                Cada uno suma 1 de regreso hasta ti. Preguntar hacia adelante es la <strong>llamada</strong>; traer la respuesta es el <strong>retorno</strong>.
              </div>
            </div>

            {/* Metáfora 3: Espejos y Naturaleza */}
            <div className="p-5 border border-neutral-200/90 dark:border-neutral-800 bg-neutral-50/70 dark:bg-[#181818]/70 backdrop-blur-md flex flex-col justify-between hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-8 h-8 rounded-full border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#202020] flex items-center justify-center text-xs font-mono font-bold text-neutral-950 dark:text-white">
                    03
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                    Analogía III
                  </span>
                </div>

                {/* Imagen Ilustrativa */}
                <div className="mb-4 overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#141414] aspect-[16/10] relative group">
                  <img
                    src="https://imgs.search.brave.com/tCJeR4tL_QAPcPqJJc0Rq6-6dnmJ-Xi9qeKDuhQubqU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMjI2/MjkyNDEzNC9lcy9m/b3RvL3BlcnNvbmEt/c29zdGVuaWVuZG8t/dW4tZXNwZWpvLXF1/ZS1yZWZsZWphLWxh/LXJlY3Vyc2klQzMl/QjNuLWluZmluaXRh/LWVuLWVsLWVzcGFj/aW8uanBnP3M9NjEy/eDYxMiZ3PTAmaz0y/MCZjPUlGaUw4RHpf/VTZGN3ctVm5Xd0xq/VFF5cFljVFRHR3Y3/d29uejdkU3Q3eVU9"
                    alt="Ilustración de espejos enfrentados en túnel infinito y ramas de árbol fractal"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain p-1.5 transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                <h4 className="font-serif text-base font-semibold text-neutral-950 dark:text-white mb-2">
                  Los Espejos Enfrentados
                </h4>
                <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed font-sans">
                  Si te colocas entre dos espejos paralelos, ves un túnel infinito con copias de ti mismo. 
                  En la naturaleza pasa igual: una ramita de brócoli Romanesco o una hoja de helecho tiene exactamente la misma forma geométrica que la planta completa.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-neutral-200 dark:border-neutral-800 text-[11px] font-mono text-neutral-500 dark:text-neutral-400">
                A esto se le llama <strong>Autosemejanza</strong>: el principio que da vida a los fractales.
              </div>
            </div>

          </div>

          {/* Los Dos Únicos Mandamientos de la Recursividad */}
          <div className="p-5 sm:p-6 bg-neutral-100/80 dark:bg-[#1A1A1A]/80 border border-neutral-200 dark:border-neutral-800 backdrop-blur-sm">
            <h4 className="text-xs font-mono uppercase tracking-wider font-semibold text-neutral-900 dark:text-white mb-3 flex items-center gap-2">
              <Check className="w-4 h-4 text-neutral-900 dark:text-white" />
              Los Dos Únicos Secretos para que Funcione
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans text-neutral-700 dark:text-neutral-300">
              <div className="space-y-1">
                <span className="font-semibold text-neutral-900 dark:text-white font-mono block">1. Saber cuándo frenar:</span>
                <p className="leading-relaxed">
                  Tiene que haber una respuesta fácil y directa (por ejemplo, «si tengo cero cosas, el resultado es cero»). Sin este freno, la computadora se quedaría pensando para siempre hasta quedarse sin memoria.
                </p>
              </div>
              <div className="space-y-1">
                <span className="font-semibold text-neutral-900 dark:text-white font-mono block">2. Dar un pasito más chico cada vez:</span>
                <p className="leading-relaxed">
                  No intentes resolver toda la tarea de golpe. Resuelve un trocito pequeño tú mismo y delega el resto a otra versión de ti mismo que trabaje con un problema un poco más fácil.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
