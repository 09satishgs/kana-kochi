"use client";

import { useEffect, useRef, useState } from "react";
import Button from "./Button";
import { useAudio } from "@/hooks/useAudio";

export default function KanaVideo({ src, imageSrc, kana, romaji, script }) {
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

  /* ---------------- Canvas Drawing ---------------- */
  useEffect(() => {
    if (!showCanvas || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      ctx.lineWidth = 4;
      ctx.lineCap = "round";
      ctx.strokeStyle = "#000";
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
    const ctx = canvasRef.current.getContext("2d");
    ctx.beginPath();
  };

  const draw = (e) => {
    if (!drawing.current) return;

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
    const ctx = canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  return (
    <div className="p-4 bg-white/80 rounded-4xl ">
      <div className="border-8 border-black rounded-4xl p-6 flex flex-col gap-6">
        <div className="flex gap-6 h-100">
          {/* Video / Image */}
          <div className="flex-1 bg-white rounded-3xl p-4 flex items-center justify-center">
            <video
              ref={videoRef}
              src={src}
              autoPlay
              loop
              muted
              playsInline
              className="h-full w-full object-contain"
            />
          </div>

          {/* Canvas */}
          {showCanvas && (
            <div className="flex-1 rounded-3xl border-4 border-dashed bg-gray-200 border-black/20 relative">
              {showOverlay && (
                <div
                  className={`absolute w-full h-full opacity-5 z-10 left-0 top-0 pointer-events-none`}
                >
                  <img
                    src={imageSrc}
                    className="w-full h-full object-contain select-none"
                    draggable={false}
                  />
                </div>
              )}
              <canvas
                ref={canvasRef}
                className="w-full h-full touch-none"
                onMouseDown={startDraw}
                onMouseUp={endDraw}
                onMouseMove={draw}
                onTouchStart={startDraw}
                onTouchEnd={endDraw}
                onTouchMove={draw}
              />

              <button
                onClick={clearCanvas}
                className="absolute top-3 right-3 px-3 py-1 text-sm rounded bg-black text-white"
              >
                Clear
              </button>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between gap-6">
          <Button
            onClick={() => {
              speak(kana);
            }}
            variant="secondary"
          >
            Play Audio ({romaji})
          </Button>
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium">Speed</span>
            <input
              type="range"
              min="0.25"
              max="2"
              step="0.25"
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
            />
            <span className="text-sm w-10 text-right">{speed}×</span>
          </div>

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={showCanvas}
              onChange={(e) => setShowCanvas(e.target.checked)}
            />
            Enable practice canvas
          </label>
          {showCanvas && (
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={showOverlay}
                onChange={(e) => setShowOverlay(e.target.checked)}
              />
              Show tracing shadow
            </label>
          )}
        </div>
      </div>
    </div>
  );
}
