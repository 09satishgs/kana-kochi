"use client";

import { useEffect, useRef, useState } from "react";
import { useAudio } from "@/hooks/useAudio";
// Assuming your generic Icon component is located here
import Icon from "./Icon";

/**
 * Props now include onNext and onPrev to handle navigation logic
 * from the parent component.
 */
export default function KanaVideo({
  src,
  imageSrc,
  kana,
  romaji,
  onNext,
  onPrev,
  prevKana,
  nextKana,
}) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const drawing = useRef(false);

  const { speak } = useAudio();

  const [speed, setSpeed] = useState(1);
  const [showCanvas, setShowCanvas] = useState(true);
  const [showOverlay, setShowOverlay] = useState(true);

  /* ---------------- Video Speed ---------------- */
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
  }, [speed]);

  /* ---------------- Canvas Logic ---------------- */
  useEffect(() => {
    if (!showCanvas || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      // Small buffer to prevent layout thrashing
      if (canvas.offsetWidth > 0 && canvas.offsetHeight > 0) {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        ctx.lineWidth = 6; // Thicker stroke for "Brush" feel
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.strokeStyle = "#1a1a1a"; // Soft black
      }
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [showCanvas]);

  const startDraw = (e) => {
    drawing.current = true;
    draw(e);
  };

  const endDraw = () => {
    drawing.current = false;
    const ctx = canvasRef.current?.getContext("2d");
    if (ctx) ctx.beginPath();
  };

  const draw = (e) => {
    if (!drawing.current || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();

    const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
    const y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const clearCanvas = () => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  return (
    // Outer Card: Dark Theme with Cyan Glow
    <div className="w-full max-w-5xl mx-auto p-1 rounded-[3rem] bg-linear-to-b from-slate-800/40 to-slate-900/40 shadow-[0_0_40px_-10px_rgba(6,182,212,0.15)] ring-1 ring-[#000b0a] backdrop-blur-sm">
      {/* Inner Container */}
      <div className="bg-slate-900/60 rounded-[2.5rem] p-6 flex flex-col gap-6 backdrop-blur-md">
        {/* --- Top Control Bar --- */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-800/80 p-3 rounded-full border border-cyan-500/20 shadow-inner">
          {/* Speed Control */}
          <div className="flex items-center gap-3 px-4 border-r border-cyan-500/20">
            <Icon name="Settings2" className="w-4 h-4 text-cyan-400/70" />
            <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">
              Speed
            </span>
            <input
              type="range"
              min="0.25"
              max="2"
              step="0.25"
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="w-24 h-1 bg-slate-600 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
            <span className="text-xs font-bold text-cyan-400 w-8">
              {speed}x
            </span>
          </div>

          {/* Toggles */}
          <div className="flex items-center gap-4 px-2">
            <label className="flex items-center gap-2 text-sm text-slate-300 cursor-pointer hover:text-cyan-200 transition-colors">
              <input
                type="checkbox"
                checked={showCanvas}
                onChange={(e) => setShowCanvas(e.target.checked)}
                className="w-4 h-4 rounded border-slate-600 bg-slate-700 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-0"
              />
              Canvas
            </label>

            {showCanvas && (
              <button
                onClick={() => setShowOverlay(!showOverlay)}
                className={`flex items-center gap-2 text-sm transition-colors ${
                  showOverlay ? "text-cyan-400" : "text-slate-500"
                }`}
              >
                {showOverlay ? (
                  <Icon name="Eye" size={16} />
                ) : (
                  <Icon name="EyeOff" size={16} />
                )}
                <span>Shadow</span>
              </button>
            )}
          </div>
        </div>

        {/* --- Main Workspace (Grid) --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-100">
          {/* Left: Demonstration (Video) */}
          <div className="relative group flex flex-col h-full bg-white rounded-3xl overflow-hidden shadow-[0_0_20px_-5px_rgba(34,211,238,0.15)] border border-cyan-500/30">
            <div className="absolute top-4 left-4 z-10 bg-black/5 px-3 py-1 rounded-full">
              <span className="text-xs font-bold text-black/50 uppercase tracking-widest">
                Demonstration
              </span>
            </div>

            {/* Container Logic */}
            <div className="flex-1 flex items-center justify-center p-6 min-h-0">
              <div className="relative aspect-square max-h-full max-w-full w-full flex items-center justify-center">
                <video
                  ref={videoRef}
                  src={src}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-contain mix-blend-multiply"
                />
              </div>
            </div>

            {/* Audio Button Floating at Bottom */}
            <div className="absolute bottom-6 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button
                onClick={() => speak(kana)}
                className="cursor-pointer flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-full hover:bg-cyan-500 hover:scale-105 transition-all shadow-lg shadow-cyan-900/50"
              >
                <Icon name="Volume2" size={18} />
                <span className="text-sm font-semibold">
                  Play Audio ({romaji})
                </span>
              </button>
            </div>
          </div>

          {/* Right: Practice (Canvas) */}
          {showCanvas ? (
            <div className="relative h-full bg-slate-100 rounded-3xl overflow-hidden border-2 border-dashed border-cyan-400/40 group shadow-[inset_0_2px_15px_rgba(0,0,0,0.05)]">
              <div className="absolute top-4 left-4 z-10 bg-white/50 px-3 py-1 rounded-full">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                  Practice
                </span>
              </div>

              {/* Tracing Shadow Overlay */}
              {showOverlay && (
                <div className="absolute inset-0 z-0 flex items-center justify-center opacity-10 pointer-events-none">
                  <img
                    src={imageSrc}
                    className="h-[80%] w-[80%] object-contain"
                    draggable={false}
                    alt="tracing shadow"
                  />
                </div>
              )}

              {/* Active Canvas */}
              <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full touch-none cursor-crosshair z-10"
                onMouseDown={startDraw}
                onMouseUp={endDraw}
                onMouseMove={draw}
                onTouchStart={startDraw}
                onTouchEnd={endDraw}
                onTouchMove={draw}
              />

              {/* Clear Button */}
              <button
                onClick={clearCanvas}
                className="absolute top-4 right-4 p-2 bg-white text-rose-500 rounded-xl shadow-sm border border-slate-200 hover:bg-rose-50 hover:border-rose-200 transition-colors z-20"
                title="Clear Canvas"
              >
                <Icon name="Eraser" size={20} />
              </button>

              {/* Active State Indicator (Neon Pulse) */}
              <div className="absolute inset-0 rounded-3xl border-4 border-transparent group-hover:border-cyan-400/60 group-hover:shadow-[inset_0_0_20px_rgba(34,211,238,0.2)] pointer-events-none transition-all duration-300" />
            </div>
          ) : (
            <div className="h-full flex items-center justify-center rounded-3xl bg-slate-800/50 border border-slate-700/50">
              <p className="text-slate-500">Practice mode disabled</p>
            </div>
          )}
        </div>

        {/* --- Bottom Navigation --- */}
        <div className="flex items-center justify-between pt-2 px-2">
          <button
            onClick={onPrev}
            disabled={!prevKana}
            className="flex items-center gap-3 text-slate-400 hover:text-cyan-400 disabled:opacity-30 disabled:hover:text-slate-400 transition-colors group"
          >
            <div className="p-3 rounded-full border border-slate-700 bg-slate-800 group-hover:border-cyan-400/50 group-hover:shadow-[0_0_10px_rgba(34,211,238,0.2)] transition-all">
              <Icon name="ArrowLeft" size={20} />
            </div>
            <span className="text-sm font-medium hidden sm:block">
              Prev Kana
            </span>
          </button>

          <div className="flex flex-col items-center">
            <span className="text-xs text-slate-500 uppercase tracking-widest">
              Navigation
            </span>
            <span className="text-[10px] text-slate-600">Use ← / → arrows</span>
          </div>

          <button
            onClick={onNext}
            disabled={!nextKana}
            className="flex items-center gap-3 text-slate-400 hover:text-cyan-400 disabled:opacity-30 disabled:hover:text-slate-400 transition-colors group"
          >
            <span className="text-sm font-medium hidden sm:block">
              Next Kana
            </span>
            <div className="p-3 rounded-full border border-slate-700 bg-slate-800 group-hover:border-cyan-400/50 group-hover:shadow-[0_0_10px_rgba(34,211,238,0.2)] transition-all">
              <Icon name="ArrowRight" size={20} />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
