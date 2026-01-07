"use client";
import React from "react";
import { useGameEngine } from "@/hooks/useGameEngine";
import Icon from "@/components/Icon";
import { useParams } from "next/navigation";
import KeyboardSection from "./KeyboardSection";
import CircularTimer from "@/components/CircuilarTimer";
import usePageTitleUpdater from "@/hooks/usePageTitleUpdater";

export default function AudioGameScreen() {
  const { script, mode, lvl } = useParams();
  usePageTitleUpdater(
    `Play --- ${
      mode === "words" ? "Form the correct Word" : "Click on the correct letter"
    } (Lvl${lvl})`
  );

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

  return (
    // 1. Global Wrapper: Deep Void Background
    <div className="w-full flex items-center justify-center p-2 sm:p-8">
      {/* 2. Main Glass Console */}
      <div className="relative w-full max-w-7xl bg-black/60 backdrop-blur-xl rounded-[2.5rem] border border-white/10 shadow-[0_0_50px_-10px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col">
        {/* --- Decorative Top Glow --- */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-cyan-400/50 blur-[20px]" />

        {/* --- MODAL (Dark Glass Variant) --- */}
        <FeedbackModal
          proceedToNext={proceedToNext}
          restartLvl={restartLvl}
          timeSpent={timeSpent}
          streak={streak}
          {...feedback}
        />

        {/* --- HUD HEADER (Stats) --- */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-white/5 bg-slate-900/40">
          {/* Left: Lives (Neon Hearts) */}
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              {Array.from({ length: maxAllowedMistakes }).map((_, i) => {
                const livesRemaining =
                  maxAllowedMistakes - incorrectValues.length;
                const isAlive = i < livesRemaining;
                return (
                  <div
                    key={i}
                    className={`transition-all duration-300 ${
                      isAlive ? "scale-100" : "scale-90 opacity-30 grayscale"
                    }`}
                  >
                    <div
                      className={`w-6 h-6 ${
                        isAlive
                          ? "text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.6)]"
                          : "text-slate-600"
                      }`}
                    >
                      {/* Assuming Icon renders SVG, we use text-color to fill currently */}
                      <Icon name="icon-heart" className="fill-current" />
                    </div>
                  </div>
                );
              })}
            </div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
              Lives
            </span>
          </div>

          {/* Right: Timer (Integrated) */}
          <div className="flex items-center gap-4">
            <span
              className={`text-xs font-bold uppercase tracking-widest ${
                timeLeft < 15 ? "text-red-400 animate-pulse" : "text-slate-500"
              }`}
            >
              Time Left
            </span>
            <div className="relative w-12 h-12">
              {/* Ensure CircularTimer accepts className or styles to fit dark theme if needed */}
              <div className="text-cyan-400 drop-shadow-[0_0_5px_rgba(34,211,238,0.4)]">
                <CircularTimer timeLeft={timeLeft} totalTime={totalTime} />
              </div>
            </div>
          </div>
        </div>

        {/* --- MAIN GAME BODY --- */}
        <div
          className="flex flex-col lg:flex-row h-full min-h-100"
          title={current?.chars?.join(" ")} //Todo: Only for Testing. Remove before Production
        >
          {/* COLUMN 1: The "Arena" (Audio & Slots) */}
          <div className="flex-3 flex flex-col items-center justify-center p-8 gap-12 border-b lg:border-b-0 lg:border-r border-white/5 relative">
            {/* 1. Word Construction Slots (Glass Tiles) */}
            <div className="flex flex-wrap justify-center gap-4">
              {current?.chars?.map((_, index) => {
                const isFilled = index < selectedChars.length;
                const nextInput = index === selectedChars.length;
                const char = isFilled ? selectedChars[index] : "";

                return (
                  <div
                    key={index}
                    className={`
                      relative w-20 h-24 rounded-2xl flex items-center justify-center text-4xl font-bold transition-all duration-300
                      ${
                        isFilled
                          ? "bg-slate-800/80 border-2 border-cyan-400 text-white shadow-[0_0_20px_rgba(34,211,238,0.3)] scale-100 -translate-y-2"
                          : "bg-white/5 border border-white/10 text-transparent scale-95"
                      }
                      ${nextInput ? "animate-pulse border-white/30" : ""}
                    `}
                  >
                    {char}
                    {/* Empty Slot Indicator */}
                    {!isFilled && (
                      <div className="absolute bottom-4 w-6 h-1 bg-white/10 rounded-full" />
                    )}
                  </div>
                );
              })}
            </div>

            {/* 2. Interaction Zone (Audio Orb & Hint) */}
            <div className="flex flex-col items-center gap-8">
              {/* The Reactor Core (Audio Button) */}
              <button
                onClick={replayAudio}
                className="group relative flex items-center justify-center w-28 h-28 rounded-full transition-all duration-300 hover:scale-105 active:scale-95 outline-none"
              >
                {/* Glow Effects */}
                <div className="absolute inset-0 bg-cyan-500 rounded-full opacity-20 blur-xl group-hover:opacity-40 transition-opacity" />
                <div className="absolute inset-0 bg-linear-to-br from-cyan-400 to-blue-600 rounded-full shadow-[inset_0_2px_20px_rgba(255,255,255,0.3),0_10px_30px_rgba(6,182,212,0.4)]" />

                {/* Icon */}
                <div className="relative z-10 text-white drop-shadow-md">
                  <Icon name="icon-volume-high" size={32} />
                </div>

                {/* Ripple */}
                <span className="absolute w-full h-full rounded-full border border-cyan-400/50 opacity-0 group-hover:animate-ping" />
              </button>

              {/* Glass Hint Pill */}
              <div
                onClick={!showHint ? revealHint : undefined}
                className={`
                  relative px-6 py-2 rounded-full border transition-all duration-500 flex items-center gap-3 select-none
                  ${
                    showHint
                      ? "bg-slate-800/50 border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.1)]"
                      : "bg-white/5 border-white/10 cursor-pointer hover:bg-white/10 hover:border-white/20"
                  }
                `}
              >
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                  {showHint ? "Romaji" : "Show Hint"}
                </span>

                <div className="flex items-center">
                  {showHint ? (
                    <span className="text-lg font-mono font-bold text-cyan-400 tracking-wider">
                      {Array.isArray(current?.romaji)
                        ? current.romaji.join("")
                        : current?.romaji}
                    </span>
                  ) : (
                    <div className="text-slate-600">
                      <Icon name="icon-block" size={16} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* COLUMN 2: The "Control Panel" (Keyboard & History) */}
          <div className="bg-slate-900/30 flex flex-col flex-2">
            {/* Keyboard Section */}
            <div className="flex-1 p-6 flex flex-col justify-center">
              <div className="bg-slate-800/40 p-1 rounded-3xl border border-white/5 shadow-inner">
                {/* Assuming KeyboardSection can adapt, or we might need to pass styling props. 
                      Ideally, KeyboardSection buttons should use 'bg-slate-700 text-white' styles. */}
                <KeyboardSection
                  keyboardKeys={keyboardKeys}
                  nextExpectedChar={nextExpectedChar}
                  selectLetter={selectLetter}
                  selectedChars={selectedChars}
                />
              </div>
            </div>

            {/* Mistakes History (The "Log") */}
            <div className="p-6 border-t border-white/5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                  System Log: Errors
                </h3>
              </div>

              <div className="min-h-15">
                {!incorrectValues.length ? (
                  <div className="text-slate-700 text-xs italic font-mono">
                    No anomalies detected.
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {incorrectValues.map((val, index) => (
                      <div
                        key={`${val}-${index}`}
                        className="
                          animate-fade-in-up px-3 py-1 rounded-md
                          bg-red-500/10 border border-red-500/20
                          text-red-400 font-mono font-bold text-sm
                          flex items-center gap-2
                        "
                      >
                        <span>{val}</span>
                        <span className="text-[10px] opacity-50">✕</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- DARK MODE FEEDBACK MODAL ---
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

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const theme = isCorrect
    ? {
        color: "text-cyan-400",
        glow: "shadow-[0_0_30px_rgba(34,211,238,0.3)]",
        border: "border-cyan-500/50",
        bgIcon: "bg-cyan-500/20",
        title: "Level Complete",
        iconName: "icon-trophy",
        buttonText: "Proceed",
        buttonClass:
          "bg-gradient-to-r from-cyan-500 to-blue-600 hover:brightness-110 text-white shadow-cyan-500/40",
        buttonAction: proceedToNext,
      }
    : {
        color: "text-red-500",
        glow: "shadow-[0_0_30px_rgba(239,68,68,0.3)]",
        border: "border-red-500/50",
        bgIcon: "bg-red-500/20",
        title: "System Failure",
        iconName: "icon-refresh",
        buttonText: "Reboot Level",
        buttonClass:
          "bg-gradient-to-r from-red-500 to-orange-600 hover:brightness-110 text-white shadow-red-500/40",
        buttonAction: restartLvl,
      };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md transition-opacity" />

      <div
        className={`relative w-full max-w-sm bg-slate-900 rounded-3xl border ${theme.border} ${theme.glow} overflow-hidden transform animate-pop-in`}
      >
        <div className="p-8 flex flex-col items-center text-center">
          {/* Icon Ring */}
          <div
            className={`mb-6 w-20 h-20 rounded-full flex items-center justify-center ${theme.bgIcon} border border-white/5`}
          >
            <div className={`${theme.color}`}>
              <Icon name={theme.iconName} />
            </div>
          </div>

          {/* Titles */}
          <h2
            className={`text-2xl font-black uppercase tracking-wider mb-2 ${theme.color}`}
          >
            {theme.title}
          </h2>
          <p className="text-slate-400 text-sm font-medium mb-8 leading-relaxed">
            {message}
          </p>

          {/* Stats Grid */}
          <div className="w-full grid grid-cols-2 gap-4 mb-8">
            <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-white/5 border border-white/5">
              <span className="text-[10px] font-bold uppercase text-slate-500 tracking-wider mb-1">
                Time
              </span>
              <span className="text-lg font-mono font-bold text-white">
                {formatTime(timeSpent)}
              </span>
            </div>
            <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-white/5 border border-white/5">
              <span className="text-[10px] font-bold uppercase text-slate-500 tracking-wider mb-1">
                Streak
              </span>
              <div className="flex items-center gap-2">
                <span
                  className={`text-lg font-mono font-bold ${
                    isCorrect ? "text-orange-400" : "text-white"
                  }`}
                >
                  {streak}
                </span>
                <span className="text-orange-500 text-xs">
                  <Icon name="icon-fire" />
                </span>
              </div>
            </div>
          </div>

          {/* Button */}
          <button
            onClick={theme.buttonAction}
            className={`
              w-full py-4 rounded-xl font-bold text-sm uppercase tracking-widest shadow-lg
              flex items-center justify-center gap-3 transition-transform active:scale-95
              ${theme.buttonClass}
            `}
          >
            {theme.buttonText}
            <div className="w-4 h-4">
              <Icon name="icon-arrow-right" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
