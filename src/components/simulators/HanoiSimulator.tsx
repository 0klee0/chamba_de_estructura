import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, SkipForward, SkipBack, CheckCircle2, AlertCircle, Award } from 'lucide-react';

interface Move {
  disk: number;
  from: 'A' | 'B' | 'C';
  to: 'A' | 'B' | 'C';
  description: string;
}

export const HanoiSimulator: React.FC = () => {
  const [numDisks, setNumDisks] = useState<number>(3);
  const [mode, setMode] = useState<'auto' | 'manual'>('auto');
  
  // Peg states: arrays of disk sizes (e.g. [3, 2, 1] means 3 at bottom, 1 at top)
  const [pegs, setPegs] = useState<{ A: number[]; B: number[]; C: number[] }>({
    A: [3, 2, 1],
    B: [],
    C: [],
  });

  // Moves list for automatic
  const [moves, setMoves] = useState<Move[]>([]);
  const [currentMoveIdx, setCurrentMoveIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(600);

  // Manual mode states
  const [selectedPeg, setSelectedPeg] = useState<'A' | 'B' | 'C' | null>(null);
  const [manualMoveCount, setManualMoveCount] = useState<number>(0);
  const [manualError, setManualError] = useState<string | null>(null);
  const [hasWon, setHasWon] = useState<boolean>(false);

  // Generate recursive solution moves
  useEffect(() => {
    const generatedMoves: Move[] = [];

    const solveHanoi = (n: number, from: 'A' | 'B' | 'C', to: 'A' | 'B' | 'C', aux: 'A' | 'B' | 'C') => {
      if (n === 1) {
        generatedMoves.push({
          disk: 1,
          from,
          to,
          description: `Mover disco 1 directamente desde ${from} hacia ${to} (Caso Base)`,
        });
        return;
      }
      solveHanoi(n - 1, from, aux, to);
      generatedMoves.push({
        disk: n,
        from,
        to,
        description: `Mover disco ${n} desde ${from} hacia ${to}`,
      });
      solveHanoi(n - 1, aux, to, from);
    };

    solveHanoi(numDisks, 'A', 'C', 'B');
    setMoves(generatedMoves);
    resetGame(numDisks);
  }, [numDisks]);

  const resetGame = (n: number) => {
    setIsPlaying(false);
    setCurrentMoveIdx(0);
    setSelectedPeg(null);
    setManualMoveCount(0);
    setManualError(null);
    setHasWon(false);

    // Initial state: disks n down to 1 on peg A
    const initialDisks = Array.from({ length: n }, (_, i) => n - i);
    setPegs({
      A: initialDisks,
      B: [],
      C: [],
    });
  };

  // Autoplay ticker
  useEffect(() => {
    let timer: any;
    if (isPlaying && currentMoveIdx < moves.length) {
      timer = setTimeout(() => {
        applyMove(moves[currentMoveIdx]);
        setCurrentMoveIdx((prev) => prev + 1);
      }, speed);
    } else if (currentMoveIdx >= moves.length) {
      setIsPlaying(false);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentMoveIdx, moves, speed]);

  const applyMove = (move: Move) => {
    setPegs((prev) => {
      const fromStack = [...prev[move.from]];
      const toStack = [...prev[move.to]];
      const disk = fromStack.pop();
      if (disk !== undefined) {
        toStack.push(disk);
      }
      return {
        ...prev,
        [move.from]: fromStack,
        [move.to]: toStack,
      };
    });
  };

  const handleStepForward = () => {
    if (currentMoveIdx < moves.length) {
      applyMove(moves[currentMoveIdx]);
      setCurrentMoveIdx((prev) => prev + 1);
    }
  };

  const handleStepBack = () => {
    if (currentMoveIdx > 0) {
      const targetIdx = currentMoveIdx - 1;
      // Rebuild pegs state from beginning up to targetIdx
      const initialDisks = Array.from({ length: numDisks }, (_, i) => numDisks - i);
      const newPegs: { A: number[]; B: number[]; C: number[] } = { A: [...initialDisks], B: [], C: [] };
      for (let i = 0; i < targetIdx; i++) {
        const m = moves[i];
        const disk = newPegs[m.from].pop();
        if (disk !== undefined) newPegs[m.to].push(disk);
      }
      setPegs(newPegs);
      setCurrentMoveIdx(targetIdx);
    }
  };

  // Manual interactive click handler
  const handlePegClick = (pegId: 'A' | 'B' | 'C') => {
    if (mode !== 'manual' || hasWon) return;
    setManualError(null);

    if (!selectedPeg) {
      // Pick up top disk from peg
      if (pegs[pegId].length === 0) {
        setManualError(`El poste ${pegId} no tiene discos para mover.`);
        return;
      }
      setSelectedPeg(pegId);
    } else {
      // Trying to place on pegId
      if (selectedPeg === pegId) {
        // Deselect
        setSelectedPeg(null);
        return;
      }

      const sourceStack = pegs[selectedPeg];
      const targetStack = pegs[pegId];
      const movingDisk = sourceStack[sourceStack.length - 1];
      const topTargetDisk = targetStack[targetStack.length - 1];

      // Validate invariant: cannot place larger disk on smaller
      if (topTargetDisk !== undefined && movingDisk > topTargetDisk) {
        setManualError(
          `Movimiento Inválido: No puedes colocar el disco ${movingDisk} sobre el disco ${topTargetDisk} (regla sagrada de Hanói).`
        );
        setSelectedPeg(null);
        return;
      }

      // Valid move!
      const newSource = [...sourceStack];
      const newTarget = [...targetStack];
      const disk = newSource.pop();
      if (disk !== undefined) newTarget.push(disk);

      const nextPegs = {
        ...pegs,
        [selectedPeg]: newSource,
        [pegId]: newTarget,
      };

      setPegs(nextPegs);
      setSelectedPeg(null);
      setManualMoveCount((prev) => prev + 1);

      // Check win condition: all disks on Peg C
      if (nextPegs.C.length === numDisks) {
        setHasWon(true);
      }
    }
  };

  const optimalMoves = Math.pow(2, numDisks) - 1;

  return (
    <div className="border border-neutral-300 dark:border-neutral-800 bg-white dark:bg-[#141414] p-6 sm:p-8 shadow-xs transition-colors">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-200 dark:border-neutral-800 pb-5 mb-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
            Simulador 03 · Algoritmo de Reducción Simétrica
          </span>
          <h3 className="text-xl sm:text-2xl font-serif font-medium text-neutral-950 dark:text-white mt-0.5">
            Torres de Hanói: Mecánica Gráfica & Recursión 2ⁿ - 1
          </h3>
        </div>

        {/* Mode Switcher & Disks */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 border border-neutral-200 dark:border-neutral-700 px-3 py-1.5 bg-neutral-50 dark:bg-[#1A1A1A] text-xs font-mono">
            <span className="text-neutral-500 dark:text-neutral-400">Discos:</span>
            <select
              value={numDisks}
              onChange={(e) => setNumDisks(parseInt(e.target.value))}
              disabled={isPlaying}
              className="bg-transparent font-bold text-neutral-900 dark:text-white cursor-pointer focus:outline-none"
            >
              {[3, 4, 5, 6].map((cnt) => (
                <option key={cnt} value={cnt} className="bg-white dark:bg-[#1A1A1A] text-neutral-900 dark:text-white">
                  {cnt} Discos (2^{cnt}-1 = {Math.pow(2, cnt) - 1})
                </option>
              ))}
            </select>
          </div>

          <div className="flex border border-neutral-300 dark:border-neutral-700 p-0.5 bg-neutral-100 dark:bg-neutral-800 text-xs font-mono">
            <button
              onClick={() => {
                setMode('auto');
                resetGame(numDisks);
              }}
              className={`px-3 py-1.5 font-medium transition-all ${
                mode === 'auto'
                  ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 shadow-xs'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              Solución Automática
            </button>
            <button
              onClick={() => {
                setMode('manual');
                resetGame(numDisks);
              }}
              className={`px-3 py-1.5 font-medium transition-all ${
                mode === 'manual'
                  ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 shadow-xs'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              Modo Práctica Manual
            </button>
          </div>
        </div>
      </div>

      {/* Mode Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 text-xs font-mono text-neutral-600 dark:text-neutral-400">
        {mode === 'auto' ? (
          <>
            <div className="flex items-center gap-3">
              <span>Paso {currentMoveIdx} de {moves.length}</span>
              <span aria-hidden="true">·</span>
              <span>
                Movimientos óptimos: <strong className="text-neutral-950 dark:text-white font-bold">{optimalMoves}</strong>
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center border border-neutral-300 dark:border-neutral-700 divide-x divide-neutral-200 dark:divide-neutral-700 bg-white dark:bg-neutral-900">
                <button
                  onClick={handleStepBack}
                  disabled={currentMoveIdx === 0}
                  className="p-1.5 hover:bg-neutral-50 dark:hover:bg-neutral-800 disabled:opacity-30 text-neutral-800 dark:text-neutral-200"
                  title="Paso Anterior"
                >
                  <SkipBack className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="px-3 py-1.5 text-neutral-900 dark:text-white hover:bg-neutral-50 dark:hover:bg-neutral-800 font-semibold uppercase flex items-center gap-1.5"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-3.5 h-3.5" /> Pausa
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5" /> Resolver
                    </>
                  )}
                </button>
                <button
                  onClick={handleStepForward}
                  disabled={currentMoveIdx === moves.length}
                  className="p-1.5 hover:bg-neutral-50 dark:hover:bg-neutral-800 disabled:opacity-30 text-neutral-800 dark:text-neutral-200"
                  title="Paso Siguiente"
                >
                  <SkipForward className="w-4 h-4" />
                </button>
                <button
                  onClick={() => resetGame(numDisks)}
                  className="p-1.5 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200"
                  title="Reiniciar"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center gap-2">
                <span>Velocidad:</span>
                <input
                  type="range"
                  min="150"
                  max="1200"
                  step="50"
                  value={1350 - speed}
                  onChange={(e) => setSpeed(1350 - parseInt(e.target.value))}
                  className="w-20 accent-neutral-900 dark:accent-neutral-100 cursor-pointer"
                />
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-between w-full">
            <div>
              <span>Movimientos realizados: <strong className="text-neutral-950 dark:text-white">{manualMoveCount}</strong></span>
              <span className="mx-2">/</span>
              <span>Óptimo teórico: <strong className="text-neutral-950 dark:text-white">{optimalMoves}</strong></span>
            </div>
            <button
              onClick={() => resetGame(numDisks)}
              className="px-3 py-1 border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800 flex items-center gap-1 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reiniciar Tablero
            </button>
          </div>
        )}
      </div>

      {/* Manual Mode Error / Success Notices */}
      {manualError && (
        <div className="mb-4 p-3 bg-neutral-100 dark:bg-neutral-900 border border-neutral-800 dark:border-neutral-600 text-xs font-mono text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{manualError}</span>
        </div>
      )}

      {hasWon && (
        <div className="mb-6 p-4 border border-neutral-950 dark:border-white bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <Award className="w-6 h-6 text-white dark:text-neutral-950" />
            <div>
              <h4 className="font-serif text-base font-semibold">¡Problema de Hanói Resuelto!</h4>
              <p className="text-xs font-mono text-neutral-300 dark:text-neutral-700">
                Has trasladado todos los discos al poste destino en {manualMoveCount} movimientos {manualMoveCount === optimalMoves ? '(¡Eficiencia Óptima Exacta!)' : `(Óptimo: ${optimalMoves})`}.
              </p>
            </div>
          </div>
          <button
            onClick={() => resetGame(numDisks)}
            className="px-3 py-1.5 text-xs font-mono bg-white dark:bg-neutral-950 text-neutral-950 dark:text-white uppercase font-bold hover:bg-neutral-100 dark:hover:bg-neutral-800"
          >
            Jugar de nuevo
          </button>
        </div>
      )}

      {/* Graphic Canvas: The 3 Pegs Stage */}
      <div className="border border-neutral-300 dark:border-neutral-800 bg-neutral-50/60 dark:bg-[#121212] p-6 sm:p-10 select-none transition-colors">
        <div className="grid grid-cols-3 gap-4 sm:gap-8 items-end min-h-[260px] pb-4 border-b-4 border-neutral-900 dark:border-neutral-200 relative">
          
          {(['A', 'B', 'C'] as const).map((pegId) => {
            const isSelected = selectedPeg === pegId;
            const pegDisks = pegs[pegId];

            return (
              <div
                key={pegId}
                onClick={() => handlePegClick(pegId)}
                className={`relative flex flex-col items-center justify-end h-56 cursor-pointer transition-all ${
                  mode === 'manual' ? 'hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50' : ''
                } ${isSelected ? 'ring-2 ring-neutral-950 dark:ring-white bg-neutral-200/60 dark:bg-neutral-800/60' : ''}`}
              >
                {/* Peg Vertical Rod */}
                <div className="absolute bottom-0 w-2.5 h-48 bg-neutral-400 dark:bg-neutral-600 rounded-t-sm" />

                {/* Disks stacked vertically */}
                <div className="relative z-10 w-full flex flex-col-reverse items-center gap-1 mb-0.5">
                  {pegDisks.map((diskVal, idx) => {
                    const widthPct = 25 + (diskVal / numDisks) * 65; // from 30% to 90%
                    const isTopDisk = idx === pegDisks.length - 1;
                    const isLifted = isSelected && isTopDisk;

                    return (
                      <div
                        key={idx}
                        style={{ width: `${widthPct}%` }}
                        className={`h-6 sm:h-7 border flex items-center justify-center font-mono text-[11px] font-bold shadow-xs transition-transform duration-200 ${
                          isLifted ? '-translate-y-4 ring-2 ring-neutral-950 dark:ring-white' : ''
                        } ${
                          diskVal === 1
                            ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 border-neutral-900 dark:border-white'
                            : diskVal === 2
                            ? 'bg-neutral-800 dark:bg-neutral-200 text-neutral-100 dark:text-neutral-900 border-neutral-800 dark:border-neutral-200'
                            : diskVal === 3
                            ? 'bg-neutral-700 dark:bg-neutral-300 text-neutral-100 dark:text-neutral-900 border-neutral-700 dark:border-neutral-300'
                            : diskVal === 4
                            ? 'bg-neutral-600 dark:bg-neutral-400 text-white dark:text-neutral-950 border-neutral-600 dark:border-neutral-400'
                            : diskVal === 5
                            ? 'bg-neutral-500 dark:bg-neutral-500 text-white border-neutral-500'
                            : 'bg-neutral-400 dark:bg-neutral-600 text-neutral-900 dark:text-white border-neutral-400 dark:border-neutral-600'
                        }`}
                      >
                        {diskVal}
                      </div>
                    );
                  })}
                </div>

                {/* Peg Label Badge */}
                <div className="absolute -bottom-8 flex flex-col items-center">
                  <span className="font-mono text-xs font-bold text-neutral-900 dark:text-white">
                    Poste {pegId}
                  </span>
                  <span className="text-[10px] text-neutral-500 dark:text-neutral-400 font-sans">
                    {pegId === 'A' ? 'Origen' : pegId === 'B' ? 'Auxiliar' : 'Destino'}
                  </span>
                </div>
              </div>
            );
          })}

        </div>

        {/* Instructions helper for manual mode */}
        {mode === 'manual' && !hasWon && (
          <div className="mt-12 text-center text-xs font-mono text-neutral-500 dark:text-neutral-400">
            {selectedPeg
              ? `Disco tomado del Poste ${selectedPeg}. Haz clic en el poste destino para depositarlo.`
              : 'Haz clic en cualquier poste para tomar el disco superior.'}
          </div>
        )}

        {/* Current Move Step Log for Auto Mode */}
        {mode === 'auto' && (
          <div className="mt-12 p-3 bg-white dark:bg-[#181818] border border-neutral-200 dark:border-neutral-800 flex flex-wrap items-center justify-between text-xs font-mono">
            <span className="text-neutral-500 dark:text-neutral-400">Estado del Algoritmo:</span>
            <span className="font-semibold text-neutral-900 dark:text-white">
              {currentMoveIdx > 0
                ? moves[currentMoveIdx - 1]?.description
                : 'Listo para iniciar resolución recursiva.'}
            </span>
            <span className="text-neutral-400 dark:text-neutral-500">
              T(n) = 2T(n-1) + 1
            </span>
          </div>
        )}
      </div>

      {/* Recurrence Equation Card */}
      <div className="mt-6 p-4 border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-[#181818] text-xs text-neutral-700 dark:text-neutral-300 font-serif leading-relaxed">
        <strong className="font-sans text-neutral-900 dark:text-white">Ecuación de Recurrencia & Cotas:</strong>
        <p className="mt-1">
          La resolución recursiva de las Torres de Hanói exige exactamente resolver el subproblema de <span className="font-mono font-medium text-neutral-900 dark:text-white">n-1</span> discos dos veces (de Origen a Auxiliar, y de Auxiliar a Destino), más un movimiento físico para el disco mayor:{' '}
          <span className="font-mono text-neutral-900 dark:text-white font-semibold">T(n) = 2T(n - 1) + 1</span>.
          Por expansión geométrica, <span className="font-mono font-semibold text-neutral-900 dark:text-white">T(n) = 2ⁿ - 1 ∈ O(2ⁿ)</span>.{' '}
          El espacio en memoria de la pila es puramente lineal <span className="font-mono font-semibold text-neutral-900 dark:text-white">O(n)</span>, pues solo se apilan como máximo <span className="font-mono text-neutral-900 dark:text-white">n</span> marcos activos simultáneamente <a href="#referencias" className="text-neutral-900 dark:text-white font-mono text-xs hover:underline">[8]</a>.
        </p>
      </div>

    </div>
  );
};
