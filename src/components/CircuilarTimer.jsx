import React from "react";

const CircularTimer = ({
  timeLeft,
  totalTime,
  size = 120,
  strokeWidth = 8,
}) => {
  // 1. Calculate Geometry
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;

  // 2. Calculate Progress
  // Ensure we don't divide by zero or go below zero
  const validTotalTime = totalTime > 0 ? totalTime : 1;
  const percentage = Math.max(0, Math.min(timeLeft / validTotalTime, 1));
  const strokeDashoffset = circumference - percentage * circumference;

  // 3. Determine Color State
  const getColor = () => {
    if (percentage <= 0.1) return "#ef4444"; // Red (Critical)
    if (percentage <= 0.5) return "#f59e0b"; // Orange (Warning)
    return "#10b981"; // Green (Safe)
  };

  // 4. Format Time for Display (MM:SS)
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div
      style={{
        position: "relative",
        width: size,
        height: size,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* The SVG Container */}
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ transform: "rotate(-90deg)" }} // Rotate so it starts at the top
      >
        {/* Background Track (Grey Ring) */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="#e5e7eb" // Light grey
          strokeWidth={strokeWidth}
        />

        {/* Progress Indicator (Colored Ring) */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke={getColor()}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{
            transition: "stroke-dashoffset 0.5s ease, stroke 0.5s ease",
          }} // Smooth animation
        />
      </svg>

      {/* Centered Text */}
      <div style={{ position: "absolute", textAlign: "center" }}>
        <span
          style={{ fontSize: "1.2rem", fontWeight: "bold", color: "#374151" }}
        >
          {formatTime(timeLeft)}
        </span>
      </div>
    </div>
  );
};

export default CircularTimer;
