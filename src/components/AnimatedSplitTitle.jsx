"use client";

import { useMemo } from "react";

export default function AnimatedSplitTitle({ text }) {
  const [left, right] = useMemo(
    () => text.split("---").map((t) => t.trim()),
    [text]
  );

  // Changing key forces re-mount → animation replays
  const animationKey = text;

  return (
    <div className="w-full flex items-center justify-center overflow-hidden">
      <div className="flex items-center gap-6">
        {/* Left / Parent */}
        <h1
          key={`left-${animationKey}`}
          className="
            text-3xl font-extrabold
            text-white
            animate-slide-in-left
            whitespace-nowrap
          "
        >
          {left}
        </h1>

        {/* Divider */}
        <span
          key={`divider-${animationKey}`}
          className="
            text-2xl font-light
            text-white/40
            animate-divider-fade-in
          "
        >
          /
        </span>

        {/* Right / Child */}
        <h2
          key={`right-${animationKey}`}
          className="
            text-xl font-medium
            text-white/70
            animate-slide-in-right
            whitespace-nowrap
          "
        >
          {right}
        </h2>
      </div>
    </div>
  );
}
