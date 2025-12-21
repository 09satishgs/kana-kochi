"use client";

import { useState } from "react";

/* =========================
   Constants
========================= */

const COLOR_VARIANTS = {
  idle: "bg-white/10 border-white/20 text-white",
  learn: "bg-blue-500/20 border-blue-400/40 text-blue-100",
  correct: "bg-green-500/20 border-green-400/40 text-green-100",
  wrong: "bg-red-500/20 border-red-400/40 text-red-100",
};

const ANIMATION_VARIANTS = {
  none: "",
  jump: "animate-kana-jump",
  shake: "animate-kana-shake",
  pulse: "animate-kana-pulse",
};

/* =========================
   Component
========================= */

const Character = ({
  value,
  onClick,
  ariaLabel,
  size = "lg",
  feedback = "idle",
  activeFeedback = "learn",
  animation = "none",
  romaji,
}) => {
  const [state, setState] = useState("idle");

  const handleClick = () => {
    setState(activeFeedback);
    onClick?.(value);
  };
  const sizeClasses =
    size === "lg" ? "w-full h-full text-3xl" : "w-full h-full text-xl";

  return (
    <button
      title={romaji}
      type="button"
      aria-label={ariaLabel}
      onClick={handleClick}
      className={`
        ${sizeClasses}
        ${COLOR_VARIANTS[state === "idle" ? feedback : state]}
        ${ANIMATION_VARIANTS[animation]}
        backdrop-blur-md
        border
        rounded-2xl
        flex items-center justify-center
        font-semibold
        transition-all
        duration-200
        hover:bg-white/20
        hover:scale-105
        active:scale-95
        select-none
        py-3
        cursor-pointer
      `}
    >
      {value}
    </button>
  );
};

export default Character;
