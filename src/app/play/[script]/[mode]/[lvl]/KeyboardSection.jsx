import { useAudio } from "@/hooks/useAudio";
import React, { useState, useEffect } from "react";

export default function KeyboardSection({
  keyboardKeys,
  selectedChars,
  nextExpectedChar,

  selectLetter,
}) {
  const { play } = useAudio();
  // 1. Track specific button INDICES that are "Green" (Correctly Selected)
  // We use a Set of numbers (indices) instead of string values to handle duplicates.
  const [consumedIndices, setConsumedIndices] = useState(new Set());

  // 2. Track specific button INDICES that are "Red" (Transient Error)
  const [transientErrors, setTransientErrors] = useState(new Set());

  // 3. SYNC EFFECT: Reset local state when the parent resets the game
  // If selectedChars is emptied (on error or restart), we must clear our green buttons.
  useEffect(() => {
    if (selectedChars.length === 0) {
      setConsumedIndices(new Set());
    }
  }, [selectedChars]);

  const handleKeyClick = (key, index) => {
    play(key);
    // Unique ID for animation tracking
    const uniqueId = `${key}-${index}`;

    // Check Logic
    const isCorrect = key === nextExpectedChar;

    if (isCorrect) {
      // --- CORRECT PATH ---
      // Mark this specific index as "consumed" so it stays green
      setConsumedIndices((prev) => {
        const newSet = new Set(prev);
        newSet.add(index);
        return newSet;
      });
      // Fire Parent Action
      selectLetter(key);
    } else {
      // --- INCORRECT PATH ---
      // Trigger Red Flash on this specific button
      setTransientErrors((prev) => {
        const newSet = new Set(prev);
        newSet.add(uniqueId);
        return newSet;
      });

      // Revert Red Flash after delay
      setTimeout(() => {
        setTransientErrors((prev) => {
          const newSet = new Set(prev);
          newSet.delete(uniqueId);
          return newSet;
        });
      }, 800);

      // Fire Parent Action (which will likely handle the mistake logic/reset)
      selectLetter(key);
    }
  };

  return (
    <div className="h-full flex flex-col relative bg-slate-50/50">
      {/* Instructions */}
      <div className="p-6 pb-2">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">
          Select the matching sound
        </h3>
      </div>

      {/* Keyboard Grid */}
      <div className="flex-1 p-6 pt-2 grid grid-cols-2 sm:grid-cols-3 gap-4 content-start overflow-y-auto">
        {keyboardKeys.map((key, index) => {
          // Unique ID
          const uniqueId = `${key}-${index}`;

          // Determine State based on INDEX, not Value
          const isSelected = consumedIndices.has(index); // Green?
          const isFlashingError = transientErrors.has(uniqueId); // Red?

          return (
            <button
              key={uniqueId}
              onClick={() => handleKeyClick(key, index)}
              // Disable if this SPECIFIC button is already used, or if game is frozen
              disabled={isSelected}
              className={`
                relative group h-20 rounded-2xl text-2xl font-bold shadow-[0_4px_0_0_rgba(0,0,0,0.1)] 
                transition-all duration-200 active:shadow-none active:translate-y-1 border-2
                
                ${
                  /* Priority 1: Flashing Error (Transient Red) */
                  isFlashingError
                    ? "bg-red-500 border-red-600 text-white scale-95 shadow-none z-20"
                    : ""
                }

                ${
                  /* Priority 2: Selected (Persistent Green) */
                  !isFlashingError && isSelected
                    ? "bg-emerald-500 border-emerald-600 text-white shadow-none opacity-50 cursor-default"
                    : ""
                }

                ${
                  /* Priority 3: Default (White) */
                  !isFlashingError && !isSelected
                    ? "bg-white border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-600 hover:-translate-y-1"
                    : ""
                }
              `}
            >
              <span className="relative z-10">{key}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
