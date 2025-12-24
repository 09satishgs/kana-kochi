"use client";
import React from "react";
import { useGameEngine } from "@/hooks/useGameEngine"; // Path to your hook
import Icon from "@/components/Icon";
import { useParams } from "next/navigation";
import KeyboardSection from "./KeyboardSection";

export default function AudioGameScreen() {
  const { script, mode, lvl } = useParams();

  // Initialize Hook
  const {
    current,
    showHint,
    feedback,
    selectedChars,
    incorrectValues,
    streak,
    keyboardKeys,
    maxAllowedMistakes,
    timeLeft,
    selectLetter,
    replayAudio,
    revealHint,
    restartLvl,
    proceedToNext,
    nextExpectedChar,
    timeSpent,
    totalTime,
  } = useGameEngine({ script, mode, lvl });

  // Formatting Time (mm:ss)
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // Calculating Lives Remaining
  const livesRemaining = Math.max(
    0,
    maxAllowedMistakes - incorrectValues.length
  );

  return (
    <div className="m-8 bg-slate-50 p-8 rounded-[2.5rem] flex flex-col gap-6 shadow-2xl shadow-slate-200 border border-white ring-1 ring-slate-100">
      <FeedbackModal
        proceedToNext={proceedToNext}
        restartLvl={restartLvl}
        timeSpent={timeSpent}
        streak={streak}
        {...feedback}
      />
      {/* --- Top Section --- */}
      <div className="flex items-stretch gap-6">
        {/* Column 1: Stats & Visuals */}
        <div className="flex flex-col gap-6 flex-2 h-full">
          {/* Lives Section */}
          <div className="p-6 rounded-3xl bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex-1 relative overflow-hidden group flex flex-col items-center justify-center">
            {/* Label */}
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
              Lives
              <span className="bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full text-[10px]">
                {Math.max(0, maxAllowedMistakes - incorrectValues.length)} /{" "}
                {maxAllowedMistakes}
              </span>
            </h3>

            {/* Hearts Container (Handles Overflow) */}
            <div className="w-full flex flex-wrap justify-center content-center gap-3">
              {Array.from({ length: maxAllowedMistakes }).map((_, i) => {
                // Calculate if this specific heart is "Alive" or "Lost"
                const livesRemaining =
                  maxAllowedMistakes - incorrectValues.length;
                const isAlive = i < livesRemaining;

                return (
                  <div
                    key={i}
                    className={`
            transition-all duration-500 ease-out
            ${
              isAlive
                ? "text-red-500 scale-100 animate-pulse-slow" // Alive State
                : "text-slate-200 scale-90 grayscale" // Lost State
            }
          `}
                  >
                    {/* Using a filled heart for alive, outline/gray for dead */}
                    <div
                      className={`w-8 h-8 ${
                        isAlive ? "fill-red-500" : "fill-slate-100"
                      }`}
                    >
                      <Icon name="icon-heart" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {/* Stats Card */}
          <div className="p-6 h-fit rounded-3xl bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex-none">
            <ul className="flex flex-col gap-3">
              {/* Total Time */}
              <li className="flex justify-between items-center p-3 rounded-2xl bg-slate-50/50 border border-slate-100/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 text-blue-500 rounded-lg">
                    <Icon name="icon-clock" />
                  </div>
                  <b className="text-xs font-bold uppercase tracking-widest text-slate-400">
                    Total Time
                  </b>
                </div>
                <div className="font-mono text-lg font-bold text-slate-700">
                  {formatTime(totalTime)}
                </div>
              </li>

              {/* Time Spent */}
              <li className="flex justify-between items-center p-3 rounded-2xl bg-slate-50/50 border border-slate-100/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-50 text-purple-500 rounded-lg">
                    <Icon name="icon-history" />
                  </div>
                  <b className="text-xs font-bold uppercase tracking-widest text-slate-400">
                    Time Spent
                  </b>
                </div>
                <div className="font-mono text-lg font-bold text-slate-700">
                  {formatTime(timeSpent)}
                </div>
              </li>

              {/* Time Left */}
              <li className="flex justify-between items-center p-3 rounded-2xl bg-slate-50/50 border border-slate-100/50">
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-lg ${
                      timeLeft < 15
                        ? "bg-red-50 text-red-500 animate-pulse"
                        : "bg-emerald-50 text-emerald-500"
                    }`}
                  >
                    <Icon name="icon-timer" />
                  </div>
                  <b className="text-xs font-bold uppercase tracking-widest text-slate-400">
                    Time Left
                  </b>
                </div>
                <div
                  className={`font-mono text-lg font-bold ${
                    timeLeft < 15 ? "text-red-500" : "text-slate-700"
                  }`}
                >
                  {formatTime(timeLeft)}
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Column 2: Feedbacks Placeholder */}
        <div className="h-full flex-4 flex flex-col justify-center">
          {/* Column 2: Feedbacks Placeholder - Content */}
          <div className="flex flex-col h-full">
            {/* --- TOP SECTION: Character Slots --- */}
            <div className="flex-1 flex flex-col justify-center items-center py-8">
              <div className="flex flex-wrap justify-center gap-4">
                {current?.chars?.map((_, index) => {
                  const isFilled = index < selectedChars.length;
                  const char = isFilled ? selectedChars[index] : "";

                  return (
                    <div
                      key={index}
                      className={`
              relative w-20 h-24 rounded-2xl flex items-center justify-center text-4xl font-black transition-all duration-300
              ${
                isFilled
                  ? "bg-white text-slate-800 shadow-[0_4px_20px_rgb(0,0,0,0.08)] border-2 border-blue-100 scale-100 -translate-y-2"
                  : "bg-slate-100/50 text-transparent border-2 border-slate-200/50 scale-95"
              }
            `}
                    >
                      {char}

                      {/* Underline decoration for empty slots */}
                      {!isFilled && (
                        <div className="absolute bottom-4 w-8 h-1 bg-slate-200 rounded-full" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* --- BOTTOM SECTION: Actions & Hints --- */}
            <div className="flex-1 flex flex-col items-center justify-start gap-10">
              {/* Action: Speaker Button */}
              <button
                onClick={replayAudio}
                className="group relative flex items-center justify-center w-24 h-24 rounded-full bg-blue-500 shadow-xl shadow-blue-200 transition-transform hover:scale-105 active:scale-95"
              >
                {/* Ripple Animation */}
                <span className="absolute w-full h-full rounded-full bg-blue-400 opacity-0 group-hover:animate-ping" />

                {/* Icon */}
                <div className="relative z-10 text-white">
                  <Icon name="icon-volume-high" />
                </div>
              </button>

              {/* Hint: Masked/Unmasked Romaji */}
              <div className="relative">
                <div
                  onClick={!showHint ? revealHint : undefined}
                  className={`
          px-8 py-3 rounded-full border transition-all duration-500 flex items-center gap-3 select-none
          ${
            showHint
              ? "bg-white border-blue-100 shadow-sm"
              : "bg-slate-100 border-slate-200 cursor-pointer hover:bg-slate-200"
          }
        `}
                >
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                    Show Romaji
                  </span>
                  <span
                    className={`
            text-lg font-bold font-mono transition-all duration-500
            ${
              showHint
                ? "text-slate-700 blur-none opacity-100 w-fit"
                : "text-slate-400 blur-sm opacity-50 w-0"
            }
          `}
                  >
                    {/* Join array if it's an array, otherwise show string */}
                    {Array.isArray(current?.romaji)
                      ? current.romaji.join("")
                      : current?.romaji || "Not Available"}
                  </span>

                  {/* Lock Icon Overlay if hidden */}
                  {!showHint && (
                    <div className="absolute inset-0 flex items-center justify-center text-slate-500/50">
                      <div className="w-fit h-4">
                        <Icon name="icon-lock" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Helper text below hint */}
                {!showHint && (
                  <div className="absolute -bottom-6 left-0 right-0 text-center text-[10px] text-slate-400 font-medium">
                    Tap to reveal
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Column 3: Keyboard Placeholder */}
        <div className="h-full flex-3 flex flex-col gap-8">
          <div className="rounded-3xl bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex-3 relative overflow-hidden">
            <KeyboardSection
              keyboardKeys={keyboardKeys}
              nextExpectedChar={nextExpectedChar}
              selectLetter={selectLetter}
              selectedChars={selectedChars}
            />
          </div>
          {/* Bottom Section: Mistakes History */}
          <div className="h-full min-h-fit w-full p-6 flex flex-col gap-3">
            {/* Header */}
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              Mistakes History
            </h3>

            {/* Content Area */}
            <div className="flex-1 w-full">
              {!incorrectValues.length ? (
                // Empty State
                <div className="flex items-center justify-start text-slate-400/60 text-sm font-medium italic">
                  No mistakes yet. Keep it up!
                </div>
              ) : (
                // Horizontal Wrappable List
                <div className="flex flex-wrap content-start gap-3 pr-2 h-fit w-full">
                  {incorrectValues.map((val, index) => (
                    <div
                      key={`${val}-${index}`}
                      className="
              animate-fade-in-up
              px-4 py-2 rounded-xl 
              bg-red-50 border border-red-100 
              text-red-600 font-bold text-lg 
              shadow-sm flex items-center gap-2
              select-none
            "
                    >
                      {/* Small X Icon decoration */}
                      <span className="text-red-300 text-xs">✕</span>
                      {val}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeedbackModal({
  isCompleted,
  isCorrect,
  restartLvl,
  proceedToNext,
  streak,
  message,
  timeSpent,
}) {
  if (!isCompleted) return null;

  // Helper to format time for display
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // Theme configuration based on success/failure
  const theme = isCorrect
    ? {
        color: "text-emerald-600",
        bg: "bg-emerald-500",
        lightBg: "bg-emerald-50",
        border: "border-emerald-100",
        title: "Outstanding!",
        iconName: "icon-trophy",
        buttonText: "Next Level",
        buttonAction: proceedToNext,
        buttonIcon: "icon-arrow-right",
      }
    : {
        color: "text-red-500",
        bg: "bg-red-500",
        lightBg: "bg-red-50",
        border: "border-red-100",
        title: "Don't give up!",
        iconName: "icon-refresh",
        buttonText: "Try Again",
        buttonAction: restartLvl,
        buttonIcon: "icon-refresh-ccw",
      };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop with Blur */}
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" />

      {/* Modal Card */}
      <div className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden transform animate-pop-in">
        {/* Decorative Top Banner */}
        <div className={`h-2 w-full ${theme.bg}`} />

        <div className="p-8 flex flex-col items-center text-center">
          {/* Main Icon Circle */}
          <div
            className={`
            mb-6 w-24 h-24 rounded-full flex items-center justify-center shadow-lg
            ${theme.lightBg} ${theme.color}
          `}
          >
            <div className="w-10 h-10">
              <Icon name={theme.iconName} />
            </div>
          </div>

          {/* Titles */}
          <h2 className={`text-3xl font-black mb-2 ${theme.color}`}>
            {theme.title}
          </h2>
          <p className="text-slate-500 font-medium mb-8 px-4 leading-relaxed">
            {message}
          </p>

          {/* Stats Grid */}
          <div className="w-full grid grid-cols-2 gap-4 mb-8">
            {/* Time Stat */}
            <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-1">
                Time
              </span>
              <span className="text-xl font-mono font-bold text-slate-700">
                {formatTime(timeSpent)}
              </span>
            </div>

            {/* Streak Stat */}
            <div
              className={`
                flex flex-col items-center justify-center p-4 rounded-2xl border 
                ${
                  isCorrect
                    ? "bg-orange-50 border-orange-100"
                    : "bg-slate-50 border-slate-100"
                }
            `}
            >
              <span className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-1 flex items-center gap-1">
                Streak{" "}
                <span className="text-orange-500">
                  <Icon name="icon-fire" />
                </span>
              </span>
              <span
                className={`text-xl font-mono font-bold ${
                  isCorrect ? "text-orange-500" : "text-slate-700"
                }`}
              >
                {streak}
              </span>
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={theme.buttonAction}
            className={`
              w-full py-4 rounded-xl font-bold text-lg text-white shadow-lg shadow-blue-500/20
              flex items-center justify-center gap-3 transition-transform active:scale-95
              ${theme.bg} hover:brightness-110
            `}
          >
            {theme.buttonText}
            <div className="w-5 h-5">
              <Icon name={theme.buttonIcon} />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
