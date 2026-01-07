"use client";

import { useState } from "react";
import Link from "next/link";
import { useAudio } from "@/hooks/useAudio"; // Assuming you have this
import Icon from "./Icon";

export default function KanaCard({
  kana,
  romaji,
  mode = "learn", // 'learn' | 'practice'
  href = "#",
}) {
  const { speak } = useAudio();
  const [isRevealed, setIsRevealed] = useState(false);

  // ----------------------------------------------------------------
  // Variant 1: Cheat Sheet Logic
  // ----------------------------------------------------------------
  if (mode === "learn") {
    const handlePlay = () => {
      speak(kana);
      setIsRevealed(true);
    };

    return (
      <button
        onClick={handlePlay}
        className={`
          group relative aspect-video sm:aspect-square w-full rounded-2xl p-4 flex flex-col items-center justify-center transition-all duration-300
          border backdrop-blur-sm cursor-pointer
          ${
            isRevealed
              ? "bg-slate-800/80 border-black/50 shadow-[0_0_15px_rgba(34,211,238,0.2)]"
              : "bg-slate-900/40 border-white/5 hover:bg-slate-800/60 hover:border-white/10"
          }
        `}
      >
        {/* Main Kana - Moves up when revealed */}
        <span
          className={`text-4xl sm:text-5xl font-bold text-white transition-transform duration-300 ${
            isRevealed ? "-translate-y-2" : "translate-y-0"
          }`}
        >
          {kana}
        </span>

        {/* Romaji & Icon - Fades in when revealed */}
        <div
          className={`absolute bottom-3 left-0 right-0 flex items-center justify-around gap-2 transition-all duration-300 ${
            isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          }`}
        >
          <span className="text-sm font-medium text-white tracking-widest uppercase">
            {romaji}
          </span>
          <Icon name="Volume2" size={14} className="text-white" />
        </div>
      </button>
    );
  }

  // ----------------------------------------------------------------
  // Variant 2: Practice Sheet Logic (Direct Link)
  // ----------------------------------------------------------------
  return (
    <Link
      href={href}
      className="
        group relative aspect-video sm:aspect-square w-full rounded-2xl p-4 flex flex-col items-center justify-around transition-all duration-300
        bg-slate-900/40 border border-white/5 backdrop-blur-sm
        hover:bg-slate-800/60 hover:border-black/50 hover:shadow-[0_0_15px_rgba(232,121,249,0.2)] hover:-translate-y-1
        cursor-pointer
      "
    >
      {/* Main Kana */}
      <span className="text-4xl sm:text-5xl font-bold text-white group-hover:scale-110 transition-transform duration-300">
        {kana}
      </span>

      {/* Hover Icon (Visual cue that this is for drawing) */}
      <div className="absolute bottom-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
        <Icon name="PenTool" size={16} className="text-white" />
      </div>
    </Link>
  );
}
