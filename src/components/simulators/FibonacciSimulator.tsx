import React, { useState, useMemo } from 'react';
import { GitFork, Layers, Database, Sparkles, Check, Info } from 'lucide-react';

interface TreeNode {
  id: string;
  n: number;
  value: number;
  isBaseCase: boolean;
  isMemoHit: boolean;
  left?: TreeNode;
  right?: TreeNode;
  x: number;
  y: number;
}

export const FibonacciSimulator: React.FC = () => {
  const [n, setN] = useState<number>(4);
  const [mode, setMode] = useState<'naive' | 'memoized'>('naive');
  const [selectedNode, setSelectedNode] = useState<{ n: number; val: number; memo: boolean; id: string } | null>(null);

  // Build recursive tree with layout coordinates
  const { tree, stats } = useMemo(() => {
    let totalCalls = 0;
    let memoHits = 0;
    const memoTable: { [key: number]: number } = {};

    let nodeIdCounter = 0;

    const buildTree = (
      currentN: number,
      depth: number,
      leftBound: number,
      rightBound: number
    ): TreeNode => {
      totalCalls++;
      const id = `node_${currentN}_${nodeIdCounter++}`;
      const x = (leftBound + rightBound) / 2;
      const y = depth * 75 + 40;

      // Base cases
      if (currentN <= 0) {
        return { id, n: 0, value: 0, isBaseCase: true, isMemoHit: false, x, y };
      }
      if (currentN === 1) {
        return { id, n: 1, value: 1, isBaseCase: true, isMemoHit: false, x, y };
      }

      // If memoized mode and already cached
      if (mode === 'memoized' && memoTable[currentN] !== undefined) {
        memoHits++;
        return {
          id,
          n: currentN,
          value: memoTable[currentN],
          isBaseCase: false,
          isMemoHit: true,
          x,
          y,
        };
      }

      // Recursive descent
      const mid = (leftBound + rightBound) / 2;
      const leftChild = buildTree(currentN - 1, depth + 1, leftBound, mid);
      const rightChild = buildTree(currentN - 2, depth + 1, mid, rightBound);

      const val = leftChild.value + rightChild.value;
      if (mode === 'memoized') {
        memoTable[currentN] = val;
      }

      return {
        id,
        n: currentN,
        value: val,
        isBaseCase: false,
        isMemoHit: false,
        left: leftChild,
        right: rightChild,
        x,
        y,
      };
    };

    const root = buildTree(n, 0, 20, 780);
    return {
      tree: root,
      stats: {
        totalCalls,
        memoHits,
        result: root.value,
        height: n,
      },
    };
  }, [n, mode]);

  // Flatten tree for SVG rendering
  const renderTreeLinesAndNodes = (node: TreeNode) => {
    const lines: React.ReactNode[] = [];
    const nodes: React.ReactNode[] = [];

    const traverse = (curr: TreeNode) => {
      // Connect to left child
      if (curr.left) {
        lines.push(
          <line
            key={`line_l_${curr.id}_${curr.left.id}`}
            x1={curr.x}
            y1={curr.y}
            x2={curr.left.x}
            y2={curr.left.y}
            stroke="#737373"
            strokeWidth="1.5"
            strokeDasharray={curr.left.isMemoHit ? "3 3" : undefined}
          />
        );
        traverse(curr.left);
      }

      // Connect to right child
      if (curr.right) {
        lines.push(
          <line
            key={`line_r_${curr.id}_${curr.right.id}`}
            x1={curr.x}
            y1={curr.y}
            x2={curr.right.x}
            y2={curr.right.y}
            stroke="#737373"
            strokeWidth="1.5"
            strokeDasharray={curr.right.isMemoHit ? "3 3" : undefined}
          />
        );
        traverse(curr.right);
      }

      // Render node circle and text
      const isSelected = selectedNode?.id === curr.id;

      nodes.push(
        <g
          key={curr.id}
          className="cursor-pointer transition-transform hover:scale-110"
          onClick={() => setSelectedNode({ n: curr.n, val: curr.value, memo: curr.isMemoHit, id: curr.id })}
        >
          <circle
            cx={curr.x}
            cy={curr.y}
            r={18}
            className={`transition-colors ${
              curr.isMemoHit
                ? 'fill-neutral-200 dark:fill-[#2A2A2A] stroke-neutral-600 dark:stroke-neutral-400 stroke-2 stroke-dasharray-2'
                : curr.isBaseCase
                ? 'fill-neutral-900 dark:fill-white stroke-neutral-900 dark:stroke-white'
                : 'fill-white dark:fill-[#1A1A1A] stroke-neutral-900 dark:stroke-neutral-200 stroke-2'
            } ${isSelected ? 'stroke-neutral-950 dark:stroke-white stroke-[3px]' : ''}`}
          />
          <text
            x={curr.x}
            y={curr.y + 4}
            textAnchor="middle"
            className={`font-mono text-[11px] font-bold select-none ${
              curr.isBaseCase ? 'fill-white dark:fill-neutral-950' : 'fill-neutral-900 dark:fill-neutral-100'
            }`}
          >
            F({curr.n})
          </text>
        </g>
      );
    };

    traverse(node);
    return { lines, nodes };
  };

  const { lines, nodes } = renderTreeLinesAndNodes(tree);

  return (
    <div className="border border-neutral-300 dark:border-neutral-800 bg-white dark:bg-[#141414] p-6 sm:p-8 shadow-xs transition-colors">
      
      {/* Simulator Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-200 dark:border-neutral-800 pb-5 mb-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
            Simulador 02 · Recursión Múltiple & Bifurcación
          </span>
          <h3 className="text-xl sm:text-2xl font-serif font-medium text-neutral-950 dark:text-white mt-0.5">
            Árbol de Recursividad de Fibonacci: O(2ⁿ) vs Memoización O(n)
          </h3>
        </div>

        {/* Mode switcher & N selector */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 border border-neutral-200 dark:border-neutral-700 px-3 py-1.5 bg-neutral-50 dark:bg-[#1A1A1A] text-xs font-mono">
            <span className="text-neutral-500 dark:text-neutral-400">Término n:</span>
            <select
              value={n}
              onChange={(e) => {
                setN(parseInt(e.target.value));
                setSelectedNode(null);
              }}
              className="bg-transparent font-bold text-neutral-900 dark:text-white cursor-pointer focus:outline-none"
            >
              {[1, 2, 3, 4, 5].map((val) => (
                <option key={val} value={val} className="bg-white dark:bg-[#1A1A1A] text-neutral-900 dark:text-white">
                  F({val})
                </option>
              ))}
            </select>
          </div>

          <div className="flex border border-neutral-300 dark:border-neutral-700 p-0.5 bg-neutral-100 dark:bg-[#1A1A1A] text-xs font-mono">
            <button
              onClick={() => {
                setMode('naive');
                setSelectedNode(null);
              }}
              className={`px-3 py-1.5 font-medium transition-all ${
                mode === 'naive'
                  ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 shadow-xs'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              Recursión Ingenua O(2ⁿ)
            </button>
            <button
              onClick={() => {
                setMode('memoized');
                setSelectedNode(null);
              }}
              className={`px-3 py-1.5 font-medium transition-all ${
                mode === 'memoized'
                  ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 shadow-xs'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              Con Memoización O(n)
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6 font-mono text-xs">
        <div className="p-3 border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-[#1A1A1A]">
          <span className="text-[10px] text-neutral-500 dark:text-neutral-400 uppercase block">Resultado F({n})</span>
          <span className="text-lg font-serif font-bold text-neutral-950 dark:text-white tabular-nums">
            {stats.result}
          </span>
        </div>
        <div className="p-3 border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-[#1A1A1A]">
          <span className="text-[10px] text-neutral-500 dark:text-neutral-400 uppercase block">Total de Invocaciones</span>
          <span className="text-lg font-serif font-bold text-neutral-950 dark:text-white tabular-nums">
            {stats.totalCalls}
          </span>
        </div>
        <div className="p-3 border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-[#1A1A1A]">
          <span className="text-[10px] text-neutral-500 dark:text-neutral-400 uppercase block">Aciertos de Caché (O(1))</span>
          <span className="text-lg font-serif font-bold text-neutral-950 dark:text-white tabular-nums">
            {stats.memoHits}
          </span>
        </div>
        <div className="p-3 border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-[#1A1A1A]">
          <span className="text-[10px] text-neutral-500 dark:text-neutral-400 uppercase block">Altura del Árbol</span>
          <span className="text-lg font-serif font-bold text-neutral-950 dark:text-white tabular-nums">
            {stats.height} niveles
          </span>
        </div>
      </div>

      {/* Interactive Tree Viewport */}
      <div className="border border-neutral-300 dark:border-neutral-800 bg-white dark:bg-[#101010] p-4 relative overflow-x-auto min-h-[380px]">
        <div className="flex items-center justify-between text-xs font-mono text-neutral-500 dark:text-neutral-400 mb-2 border-b border-neutral-100 dark:border-neutral-800 pb-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-neutral-900 dark:bg-white border border-neutral-900 dark:border-white" /> Caso Base
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-white dark:bg-[#1E1E1E] border border-neutral-900 dark:border-neutral-300" /> Bifurcación
            </span>
            {mode === 'memoized' && (
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-neutral-200 dark:bg-[#2A2A2A] border border-dashed border-neutral-800 dark:border-neutral-400" /> Resuelto en Caché
              </span>
            )}
          </div>
          <span>Haz clic en un nodo para inspeccionar</span>
        </div>

        {/* SVG Canvas for Tree */}
        <div className="flex justify-center">
          <svg
            viewBox="0 0 800 420"
            className="w-full max-w-[800px] h-auto select-none"
            style={{ minHeight: '340px' }}
          >
            {lines}
            {nodes}
          </svg>
        </div>

        {/* Selected Node Inspector Flyout */}
        {selectedNode && (
          <div className="mt-4 p-3 bg-neutral-50 dark:bg-[#1A1A1A] border border-neutral-200 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
            <div>
              <span className="font-semibold text-neutral-900 dark:text-white">Nodo Seleccionado:</span>{' '}
              F({selectedNode.n}) = <strong className="text-neutral-950 dark:text-white">{selectedNode.val}</strong>
            </div>
            <div className="text-neutral-600 dark:text-neutral-400 font-sans">
              {selectedNode.memo
                ? '✔ Recuperado en tiempo O(1) desde la tabla de memoización (Caché Hit).'
                : selectedNode.n <= 1
                ? '★ Resuelto directamente por la regla del caso base.'
                : `Bifurca en F(${selectedNode.n - 1}) + F(${selectedNode.n - 2}).`}
            </div>
          </div>
        )}
      </div>

      {/* Theoretical Explanation Footer */}
      <div className="mt-6 p-4 bg-neutral-50 dark:bg-[#171717] border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-700 dark:text-neutral-300 font-sans space-y-1">
        <p className="font-semibold text-neutral-900 dark:text-white font-mono">
          Lección Asintótica:
        </p>
        <p className="font-serif leading-relaxed">
          En la versión ingenua, subproblemas idénticos se recalculan múltiples veces en ramas separadas, causando la explosión exponencial <span className="font-mono">O(ϕⁿ) ≈ O(1.618ⁿ)</span>. 
          Al introducir una tabla hash o vector de memoización (Programación Dinámica de arriba hacia abajo), el tiempo decrece a <span className="font-mono">O(n)</span> con memoria espacial <span className="font-mono">O(n)</span>.
        </p>
      </div>

    </div>
  );
};
