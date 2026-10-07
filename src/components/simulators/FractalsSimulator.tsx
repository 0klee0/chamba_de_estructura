import React, { useState, useEffect, useRef } from 'react';
import { RefreshCw, Download, Play, Pause, ZoomIn, ZoomOut, Compass, Sparkles, Layers } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

type FractalType = 'sierpinski' | 'koch' | 'tree' | 'carpet';

export const FractalsSimulator: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [fractalType, setFractalType] = useState<FractalType>('sierpinski');
  const [depth, setDepth] = useState<number>(4);
  const [treeAngle, setTreeAngle] = useState<number>(30); // degrees for fractal tree
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Fractal mathematical metadata
  const fractalInfo = {
    sierpinski: {
      name: "Triángulo de Sierpinski",
      base: 3,
      scale: 2,
      dimension: "D = log(3) / log(2) ≈ 1.585",
      formula: "T(n) = 3T(n-1) + O(1) ⇒ 3ⁿ entidades",
      maxDepth: 7,
      description: "Subdivisión recursiva de un triángulo equilátero en 3 triángulos congruentes, retirando recursivamente el triángulo invertido central.",
    },
    koch: {
      name: "Curva de Copo de Koch",
      base: 4,
      scale: 3,
      dimension: "D = log(4) / log(3) ≈ 1.262",
      formula: "T(n) = 4T(n-1) + O(1) ⇒ 4ⁿ segmentos",
      maxDepth: 5,
      description: "Reemplazo recursivo del tercio central de cada segmento por dos segmentos de igual longitud formando una cúspide triangular equilátera.",
    },
    tree: {
      name: "Árbol Fractal Binario",
      base: 2,
      scale: 1.414,
      dimension: "D = log(2) / log(√2) ≈ 2.000",
      formula: "T(n) = 2T(n-1) + O(1) ⇒ 2ⁿ ramas",
      maxDepth: 8,
      description: "Ramificación autorreferente donde cada nodo genera dos ramas hijas rotadas en ángulos simétricos ±θ con reducción geométrica de longitud.",
    },
    carpet: {
      name: "Alfombra de Sierpinski",
      base: 8,
      scale: 3,
      dimension: "D = log(8) / log(3) ≈ 1.893",
      formula: "T(n) = 8T(n-1) + O(1) ⇒ 8ⁿ cuadrados",
      maxDepth: 4,
      description: "Partición recursiva de un cuadrado en una retícula 3×3 de 9 subcuadrados, vaciando el cuadrado central en cada nivel.",
    },
  }[fractalType];

  // Draw current fractal on Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Retina display resolution support
    const dpr = window.devicePixelRatio || 1;
    const width = 700;
    const height = 480;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    // Color definitions
    const bgColor = theme === 'light' ? '#FFFFFF' : '#121212';
    const strokeColor = theme === 'light' ? '#121212' : '#FFFFFF';
    const fillColor = theme === 'light' ? '#121212' : '#FFFFFF';

    // Clear background
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = strokeColor;
    ctx.fillStyle = fillColor;
    ctx.lineWidth = 1;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // 1. Sierpinski Triangle
    if (fractalType === 'sierpinski') {
      const p1 = { x: width / 2, y: 35 };
      const p2 = { x: 80, y: height - 40 };
      const p3 = { x: width - 80, y: height - 40 };

      const drawTriangle = (
        a: { x: number; y: number },
        b: { x: number; y: number },
        c: { x: number; y: number },
        d: number
      ) => {
        if (d === 0) {
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.lineTo(c.x, c.y);
          ctx.closePath();
          ctx.stroke();
          return;
        }

        const ab = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
        const bc = { x: (b.x + c.x) / 2, y: (b.y + c.y) / 2 };
        const ca = { x: (c.x + a.x) / 2, y: (c.y + a.y) / 2 };

        drawTriangle(a, ab, ca, d - 1);
        drawTriangle(ab, b, bc, d - 1);
        drawTriangle(ca, bc, c, d - 1);
      };

      drawTriangle(p1, p2, p3, depth);
    }

    // 2. Koch Curve
    else if (fractalType === 'koch') {
      const start = { x: 50, y: height - 120 };
      const end = { x: width - 50, y: height - 120 };

      const drawKoch = (
        p1: { x: number; y: number },
        p2: { x: number; y: number },
        d: number
      ) => {
        if (d === 0) {
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
          return;
        }

        const dx = (p2.x - p1.x) / 3;
        const dy = (p2.y - p1.y) / 3;

        const a = p1;
        const b = { x: p1.x + dx, y: p1.y + dy };
        // Apex of equilateral triangle
        const angle = -Math.PI / 3;
        const peak = {
          x: b.x + dx * Math.cos(angle) - dy * Math.sin(angle),
          y: b.y + dx * Math.sin(angle) + dy * Math.cos(angle),
        };
        const c = { x: p1.x + 2 * dx, y: p1.y + 2 * dy };
        const e = p2;

        drawKoch(a, b, d - 1);
        drawKoch(b, peak, d - 1);
        drawKoch(peak, c, d - 1);
        drawKoch(c, e, d - 1);
      };

      drawKoch(start, end, depth);
    }

    // 3. Fractal Tree
    else if (fractalType === 'tree') {
      const rootX = width / 2;
      const rootY = height - 30;
      const initialLength = 110;
      const rad = (treeAngle * Math.PI) / 180;

      const drawBranch = (
        x: number,
        y: number,
        len: number,
        angle: number,
        d: number
      ) => {
        if (d === 0) return;

        const xEnd = x + len * Math.sin(angle);
        const yEnd = y - len * Math.cos(angle);

        ctx.lineWidth = Math.max(0.7, d * 0.8);
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(xEnd, yEnd);
        ctx.stroke();

        // 2 recursive sub-branches
        drawBranch(xEnd, yEnd, len * 0.72, angle + rad, d - 1);
        drawBranch(xEnd, yEnd, len * 0.72, angle - rad, d - 1);
      };

      drawBranch(rootX, rootY, initialLength, 0, depth);
    }

    // 4. Sierpinski Carpet
    else if (fractalType === 'carpet') {
      const size = 360;
      const startX = (width - size) / 2;
      const startY = (height - size) / 2;

      // Draw initial square outline
      ctx.strokeRect(startX, startY, size, size);

      const drawCarpet = (x: number, y: number, s: number, d: number) => {
        if (d === 0) return;

        const sub = s / 3;
        // Fill center square
        ctx.fillRect(x + sub, y + sub, sub, sub);

        // Recursive 8 sub-squares
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            if (i === 1 && j === 1) continue; // center already removed
            drawCarpet(x + i * sub, y + j * sub, sub, d - 1);
          }
        }
      };

      drawCarpet(startX, startY, size, depth);
    }
  }, [fractalType, depth, theme, treeAngle]);

  // Progressive depth animation
  useEffect(() => {
    let animTimer: any;
    if (isAnimating) {
      animTimer = setInterval(() => {
        setDepth((prev) => {
          if (prev >= fractalInfo.maxDepth) {
            setIsAnimating(false);
            return 0;
          }
          return prev + 1;
        });
      }, 700);
    }
    return () => clearInterval(animTimer);
  }, [isAnimating, fractalInfo.maxDepth]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const url = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = `fractal_${fractalType}_nivel_${depth}.png`;
    a.click();
  };

  const calculatedEntities = Math.pow(fractalInfo.base, depth);

  return (
    <div className="border border-neutral-300 dark:border-neutral-800 bg-white dark:bg-[#141414] p-6 sm:p-8 shadow-xs transition-colors">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-200 dark:border-neutral-800 pb-5 mb-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
            Simulador 04 · Geometría Fractal & Dimensión de Hausdorff
          </span>
          <h3 className="text-xl sm:text-2xl font-serif font-medium text-neutral-950 dark:text-white mt-0.5">
            Generador Visual de Fractales Recursivos en Canvas
          </h3>
        </div>

        {/* Theme and Export actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="px-3 py-1.5 border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-xs font-mono uppercase tracking-wider text-neutral-800 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
            title="Alternar fondo del lienzo entre claro y oscuro"
          >
            Fondo: {theme === 'light' ? 'Claro (Día)' : 'Oscuro (Noche)'}
          </button>
          <button
            onClick={handleDownload}
            className="px-3 py-1.5 bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors shadow-xs"
          >
            <Download className="w-3.5 h-3.5" /> Exportar PNG
          </button>
        </div>
      </div>

      {/* Fractal Type Switcher */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
        {[
          { type: 'sierpinski', label: 'Triángulo Sierpinski' },
          { type: 'koch', label: 'Curva de Koch' },
          { type: 'tree', label: 'Árbol Fractal' },
          { type: 'carpet', label: 'Alfombra Sierpinski' },
        ].map((f) => (
          <button
            key={f.type}
            onClick={() => {
              setFractalType(f.type as FractalType);
              setIsAnimating(false);
              setDepth(3);
            }}
            className={`p-3 text-xs font-mono text-center border transition-all ${
              fractalType === f.type
                ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 border-neutral-900 dark:border-white font-semibold shadow-xs'
                : 'bg-white dark:bg-[#181818] text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Control Sliders & Animation Ticker */}
      <div className="flex flex-wrap items-center justify-between gap-6 p-4 border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-[#181818] mb-6 text-xs font-mono">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-neutral-900 dark:text-white">
            Nivel de Profundidad n: <strong className="text-base text-neutral-950 dark:text-neutral-100">{depth}</strong>
          </span>
          <input
            type="range"
            min="0"
            max={fractalInfo.maxDepth}
            value={depth}
            onChange={(e) => {
              setDepth(parseInt(e.target.value));
              setIsAnimating(false);
            }}
            className="w-32 accent-neutral-900 dark:accent-neutral-100 cursor-pointer"
          />
          <span className="text-neutral-500 dark:text-neutral-400">(0 a {fractalInfo.maxDepth})</span>
        </div>

        {fractalType === 'tree' && (
          <div className="flex items-center gap-3">
            <span className="text-neutral-700 dark:text-neutral-300">Ángulo θ: <strong>{treeAngle}°</strong></span>
            <input
              type="range"
              min="15"
              max="50"
              value={treeAngle}
              onChange={(e) => setTreeAngle(parseInt(e.target.value))}
              className="w-24 accent-neutral-900 dark:accent-neutral-100 cursor-pointer"
            />
          </div>
        )}

        <button
          onClick={() => setIsAnimating(!isAnimating)}
          className="px-3.5 py-1.5 border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 flex items-center gap-1.5 text-neutral-900 dark:text-white transition-colors"
        >
          {isAnimating ? (
            <>
              <Pause className="w-3.5 h-3.5" /> Detener Animación
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5" /> Animar Subdivisión
            </>
          )}
        </button>
      </div>

      {/* Main Canvas Viewport */}
      <div className="border border-neutral-300 dark:border-neutral-800 bg-neutral-100 dark:bg-[#111111] flex items-center justify-center p-2 sm:p-4 overflow-hidden">
        <canvas
          ref={canvasRef}
          style={{ width: '100%', maxWidth: '700px', height: 'auto', aspectRatio: '700 / 480' }}
          className="border border-neutral-200 dark:border-neutral-800 shadow-xs block bg-white dark:bg-[#0D0D0D]"
        />
      </div>

      {/* Real-time Mathematical Rigor Grid */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
        <div className="p-4 border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-[#181818]">
          <span className="text-[10px] text-neutral-500 dark:text-neutral-400 uppercase block">Cálculo de Entidades</span>
          <span className="text-xl font-serif font-bold text-neutral-950 dark:text-white tabular-nums block mt-1">
            {calculatedEntities.toLocaleString()}
          </span>
          <span className="text-[10px] text-neutral-500 dark:text-neutral-400 block mt-0.5">{fractalInfo.formula}</span>
        </div>

        <div className="p-4 border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-[#181818]">
          <span className="text-[10px] text-neutral-500 dark:text-neutral-400 uppercase block">Dimensión de Hausdorff</span>
          <span className="text-xl font-serif font-bold text-neutral-950 dark:text-white block mt-1">
            {fractalInfo.dimension.split('≈')[1]}
          </span>
          <span className="text-[10px] text-neutral-500 dark:text-neutral-400 block mt-0.5">{fractalInfo.dimension.split('≈')[0]}</span>
        </div>

        <div className="p-4 border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-[#181818]">
          <span className="text-[10px] text-neutral-500 dark:text-neutral-400 uppercase block">Factor de Ramificación</span>
          <span className="text-xl font-serif font-bold text-neutral-950 dark:text-white block mt-1">
            b = {fractalInfo.base}
          </span>
          <span className="text-[10px] text-neutral-500 dark:text-neutral-400 block mt-0.5">Escala por nivel: 1/{fractalInfo.scale}</span>
        </div>
      </div>

      <div className="mt-4 p-3 bg-neutral-50 dark:bg-[#181818] border border-neutral-200 dark:border-neutral-800 text-xs text-neutral-600 dark:text-neutral-300 font-serif leading-relaxed">
        <span className="font-mono text-neutral-900 dark:text-white font-semibold">{fractalInfo.name}:</span> {fractalInfo.description}{' '}
        Citado en <span className="font-sans font-medium text-neutral-900 dark:text-white">B. Mandelbrot, The Fractal Geometry of Nature [7]</span>.
      </div>

    </div>
  );
};
