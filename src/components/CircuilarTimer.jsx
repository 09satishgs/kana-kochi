import React from "react";

const CircularTimer = ({
  timeLeft,
  totalTime,
  size = 50, // Default to a smaller size for the HUD
  strokeWidth = 6,
}) => {
  // 1. Logic
  // Using viewBox allows the SVG to scale to any parent container size (w-full h-full)
  const center = size / 2;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;

  const validTotalTime = totalTime > 0 ? totalTime : 1;
  const percentage = Math.max(0, Math.min(timeLeft / validTotalTime, 1));
  const strokeDashoffset = circumference - percentage * circumference;

  // 2. Neon Color Palette
  const getColor = () => {
    if (percentage <= 0.15) return "#ef4444"; // Red-500 (Critical)
    if (percentage <= 0.4) return "#f97316"; // Orange-500 (Warning)
    return "#22d3ee"; // Cyan-400 (Standard Neon)
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${size} ${size}`}
        className="rotate-[-90deg] overflow-visible"
      >
        {/* Background Track (Dark Translucent) */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="transparent"
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth={strokeWidth}
        />

        {/* Progress Indicator (Neon Glow) */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="transparent"
          stroke={getColor()}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-[stroke-dashoffset] duration-1000 ease-linear"
          style={{
            // Optional: Add a subtle drop shadow to the stroke itself for neon effect
            filter: `drop-shadow(0 0 2px ${getColor()})`,
          }}
        />
      </svg>

      {/* Centered Text (Only shows if there's room, distinct text color) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span
          className={`font-mono font-bold text-white ${
            size < 60 ? "text-[10px]" : "text-xl"
          }`}
        >
          {/* If size is very small (like in HUD), we might hide text or show small number */}
          {Math.ceil(timeLeft)}
        </span>
      </div>
    </div>
  );
};

export default CircularTimer;
