import { tailwindClass } from "@/constants";
import { useAudio } from "@/hooks/useAudio";
import React, { useState, useEffect } from "react";

export default function KeyboardSection({
  keyboardKeys,
  selectedChars,
  nextExpectedChar,
  selectLetter,
}) {
  const { play } = useAudio();
  const [consumedIndices, setConsumedIndices] = useState(new Set());
  const [transientErrors, setTransientErrors] = useState(new Set());

  useEffect(() => {
    if (selectedChars.length === 0) {
      setConsumedIndices(new Set());
    }
  }, [selectedChars]);

  const handleKeyClick = (key, index) => {
    play(key);
    const uniqueId = `${key}-${index}`;
    const isCorrect = key === nextExpectedChar;

    if (isCorrect) {
      setConsumedIndices((prev) => {
        const newSet = new Set(prev);
        newSet.add(index);
        return newSet;
      });
      selectLetter(key);
    } else {
      setTransientErrors((prev) => {
        const newSet = new Set(prev);
        newSet.add(uniqueId);
        return newSet;
      });

      setTimeout(() => {
        setTransientErrors((prev) => {
          const newSet = new Set(prev);
          newSet.delete(uniqueId);
          return newSet;
        });
      }, 500);

      selectLetter(key);
    }
  };

  return (
    <div className="h-full flex flex-col p-4 relative">
      {/* Header - Neon Style */}
      <div className="pb-4 border-b border-white/5 mb-2">
        <h3 className="text-xl font-bold text-white tracking-widest flex items-center gap-6 justify-center">
          Input
        </h3>
      </div>

      {/* Keyboard Grid */}
      <div
        className={`flex-1 pt-2 grid ${
          tailwindClass?.GRID_COLS?.[Math.ceil(keyboardKeys?.length / 2)]
        } gap-3 content-start overflow-y-auto custom-scrollbar`}
      >
        {keyboardKeys.map((key, index) => {
          const uniqueId = `${key}-${index}`;
          const isSelected = consumedIndices.has(index);
          const isFlashingError = transientErrors.has(uniqueId);

          return (
            <button
              key={uniqueId}
              onClick={() => handleKeyClick(key, index)}
              disabled={isSelected}
              className={`
                relative h-16 rounded-xl text-2xl font-bold border backdrop-blur-sm
                transition-all duration-200 outline-none
                
                ${
                  /* ERROR STATE: Red Neon Flash */
                  isFlashingError
                    ? "bg-red-500/20 border-red-500 text-red-500 shadow-[0_0_20px_rgba(239,68,68,0.5)] scale-95 z-20"
                    : ""
                }

                ${
                  /* SUCCESS STATE: Green Glass (Disabled) */
                  !isFlashingError && isSelected
                    ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-500/50 shadow-none cursor-not-allowed"
                    : ""
                }

                ${
                  /* DEFAULT STATE: Dark Glass with Cyan Hover */
                  !isFlashingError && !isSelected
                    ? "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:border-cyan-400/50 hover:text-cyan-400 hover:shadow-[0_0_15px_rgba(34,211,238,0.15)] active:scale-95"
                    : ""
                }
              `}
            >
              {isSelected && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-full bg-emerald-500/5 animate-pulse rounded-xl" />
                </div>
              )}
              <span className="relative z-10">{key}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
