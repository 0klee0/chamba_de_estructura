import React from 'react';

export const SectionConclusion: React.FC = () => {
  return (
    <section id="conclusion" className="py-16 sm:py-20 border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#121212] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 dark:text-neutral-400 uppercase tracking-widest mb-2">
            <span>Sección 06</span>
            <span aria-hidden="true">·</span>
            <span>Epílogo Académico</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-medium text-neutral-950 dark:text-white tracking-tight">
            Conclusión & Reflexión Epistemológica
          </h2>
          <p className="mt-3 text-base text-neutral-600 dark:text-neutral-400 font-sans leading-relaxed">
            La trascendencia perenne de la recursividad como lenguaje universal del pensamiento algorítmico y fundamento de la computación moderna.
          </p>
        </div>

        {/* Pull Quote Editorial Anchor */}
        <div className="my-10 border-y border-neutral-200 dark:border-neutral-800 py-8 px-4 sm:px-12 text-center max-w-4xl mx-auto">
          <p className="text-xl sm:text-2xl lg:text-3xl font-serif italic text-neutral-900 dark:text-neutral-100 leading-relaxed text-balance">
            «Para entender la recursión, uno debe primero entender la recursión; pero para dominar la computación, uno debe entender cuándo la recursión es la verdad más pura y cuándo es un lujo de memoria que debe compilarse a un bucle.»
          </p>
          <span className="block mt-4 text-xs font-mono uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
            Aforismo Clásico en Teoría de la Computación · L. Peter Deutsch
          </span>
        </div>

        {/* Academic Synthesis Text */}
        <div className="max-w-4xl mx-auto space-y-6 text-neutral-800 dark:text-neutral-300 font-serif text-base sm:text-lg leading-relaxed">
          <p>
            El estudio exhaustivo de la recursividad desvela una verdad profunda: <strong>todo algoritmo computable puede expresarse de forma recursiva o iterativa</strong>. Esta equivalencia formal, anclada en la correspondencia entre la Máquina de Turing de Alan Turing y el Cálculo Lambda de Alonzo Church, demuestra que ambas son formulaciones isomórficas de la computabilidad universal.
          </p>

          <p>
            Sin embargo, la adopción del paradigma recursivo trasciende la mera capacidad de cómputo. Su valor reside en su <em>potencia declarativa</em>: permite al ingeniero formular algoritmos cuya estructura sintáctica coincide exactamente con la definición matemática del problema. Cuando procesamos estructuras jerárquicas como árboles de sintaxis abstracta en un compilador, sistemas de archivos o geometrías fractales, la recursividad no es una opción forzada, sino la topología natural de los datos.
          </p>

          <p>
            Paralelamente, la ingeniería moderna impone un balance de sobriedad: los riesgos de agotamiento de pila (<span className="font-mono text-sm text-neutral-900 dark:text-white font-sans font-medium">Stack Overflow</span>) y la explosión combinatoria de subproblemas superpuestos exigen técnicas rigurosas de <strong>optimización de cola (TCO)</strong> y <strong>programación dinámica</strong>. Así, la recursividad evoluciona de un concepto abstracto a una disciplina de diseño eficiente que continúa modelando los paradigmas funcionales contemporáneos y el futuro del software formalmente verificado.
          </p>
        </div>

      </div>
    </section>
  );
};
