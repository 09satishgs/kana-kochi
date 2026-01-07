"use client";

import Icon from "@/components/Icon";
import usePageTitleUpdater from "@/hooks/usePageTitleUpdater";
import useUserMetaData from "@/hooks/useUserMetaData";
import React, { useEffect, useState } from "react";

// --- Helper Functions ---
const formatDuration = (ms) => {
  if (!ms) return "0m";
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (hours > 0) return `${hours}h ${minutes % 60}m`;
  if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
  return `${seconds}s`;
};

const formatDate = (timestamp) => {
  if (!timestamp) return "N/A";
  return new Date(timestamp).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

// --- Main Component ---
export default function AchievementsPage() {
  usePageTitleUpdater(`History --- Achievements`);
  const { getUserData, savedData } = useUserMetaData();
  const [activeScript, setActiveScript] = useState("hiragana");
  const [activeMode, setActiveMode] = useState("letters");
  const [user, setUser] = useState({});

  useEffect(() => {
    setUser(savedData || {});
    getUserData().then((data) => {
      setUser(data || {});
    });
  }, []);

  // Safely access nested data using optional chaining
  const currentLevels = user?.achievements?.[activeScript]?.[activeMode] || {};

  // Sort levels to ensure lvl0 -> lvl4 order
  const sortedLevelKeys = Object.keys(currentLevels).sort();

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8 font-sans selection:bg-white selection:text-black">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* 1. Header & Profile Section */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-zinc-800 pb-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-2">
              {user.userId}
            </h1>
            <div className="flex items-center gap-2 text-zinc-400">
              <div className="flex items-center gap-1 text-xs font-medium uppercase tracking-wide">
                <Icon name="calendar" className="w-3 h-3" />
                Joined {formatDate(user.createdAt)}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-zinc-500">
            <div className="flex items-center gap-2 bg-zinc-900/50 px-4 py-2 rounded-full border border-zinc-800">
              <Icon name="activity" className="w-4 h-4 text-emerald-500" />
              Last Active:
              <span className="text-zinc-300">
                {formatDate(user.lastActiveAt)}
              </span>
            </div>
          </div>
        </header>

        {/* 2. Global Stats Overview */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard
            iconName="icon-book"
            iconColor="text-blue-400"
            label="Learning Time"
            value={formatDuration(user?.stats?.learnMs)}
          />
          <StatCard
            iconName="PenTool"
            iconColor="text-purple-400"
            label="Practice Time"
            value={formatDuration(user?.stats?.practiceMs)}
          />
          <StatCard
            iconName="icon-gamepad"
            iconColor="text-rose-400"
            label="Play Time"
            value={formatDuration(user?.stats?.playMs)}
          />
        </section>

        {/* 3. Game Achievements Area */}
        <section className="space-y-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <h2 className="text-2xl font-bold uppercase tracking-widest flex items-center gap-3">
              <Icon name="icon-trophy" className="w-6 h-6 text-yellow-500" />
              Game History
            </h2>

            {/* Controls */}
            <div className="flex flex-wrap gap-4">
              {/* Script Toggle */}
              <div className="bg-zinc-900 p-1 rounded-xl border border-zinc-800 flex">
                {["hiragana", "katakana"].map((script) => (
                  <button
                    key={script}
                    onClick={() => setActiveScript(script)}
                    className={`px-6 py-2 rounded-lg text-sm font-bold uppercase tracking-wider transition-all
                      ${
                        activeScript === script
                          ? "bg-white text-black shadow-lg"
                          : "text-zinc-500 hover:text-white"
                      }`}
                  >
                    {script}
                  </button>
                ))}
              </div>

              {/* Mode Toggle */}
              <div className="bg-zinc-900 p-1 rounded-xl border border-zinc-800 flex">
                {["letters", "words"].map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setActiveMode(mode)}
                    className={`px-6 py-2 rounded-lg text-sm font-bold uppercase tracking-wider transition-all
                      ${
                        activeMode === mode
                          ? "bg-zinc-700 text-white shadow-inner"
                          : "text-zinc-500 hover:text-white"
                      }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Levels Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {sortedLevelKeys.map((levelKey) => {
              const stats = currentLevels[levelKey];
              // Calculate win rate for visual context
              const totalGames = stats.wins + stats.gameOvers;
              const winRate =
                totalGames > 0
                  ? Math.round((stats.wins / totalGames) * 100)
                  : 0;

              return (
                <div
                  key={levelKey}
                  className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-5 hover:border-zinc-600 transition-colors group relative overflow-hidden"
                >
                  {/* Header */}
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-zinc-500 text-xs font-black uppercase tracking-[0.2em]">
                      {levelKey.replace("lvl", "Level ")}
                    </span>
                    {totalGames > 0 && (
                      <span
                        className={`text-xs font-bold px-2 py-0.5 rounded border 
                        ${
                          winRate >= 50
                            ? "bg-emerald-950/30 text-emerald-400 border-emerald-900"
                            : "bg-rose-950/30 text-rose-400 border-rose-900"
                        }`}
                      >
                        {winRate}% WR
                      </span>
                    )}
                  </div>

                  {/* Stats List */}
                  {totalGames === 0 ? (
                    <div className="h-32 flex flex-col items-center justify-center text-zinc-700 space-y-2">
                      <Icon
                        name="icon-gamepad"
                        className="w-8 h-8 opacity-20"
                      />
                      <span className="text-xs uppercase font-medium tracking-wide">
                        No Data
                      </span>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-zinc-400">
                          <Icon
                            name="icon-trophy"
                            className="w-4 h-4 text-emerald-500"
                          />
                          <span className="text-xs font-medium uppercase">
                            Wins
                          </span>
                        </div>
                        <span className="font-mono text-lg font-bold text-white">
                          {stats.wins}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-zinc-400">
                          <Icon
                            name="icon-skull"
                            className="w-4 h-4 text-rose-500"
                          />
                          <span className="text-xs font-medium uppercase">
                            Deaths
                          </span>
                        </div>
                        <span className="font-mono text-lg font-bold text-zinc-500">
                          {stats.gameOvers}
                        </span>
                      </div>

                      <div className="w-full h-px bg-zinc-800 my-2" />

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-zinc-400">
                          <Icon
                            name="icon-fire"
                            className="w-4 h-4 text-orange-500"
                          />
                          <span className="text-xs font-medium uppercase">
                            Streak
                          </span>
                        </div>
                        <span className="font-mono text-sm font-bold text-white">
                          {stats.longestStreak}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-zinc-400">
                          <Icon
                            name="icon-clock"
                            className="w-4 h-4 text-blue-500"
                          />
                          <span className="text-xs font-medium uppercase">
                            Best
                          </span>
                        </div>
                        <span className="font-mono text-sm font-bold text-white">
                          {stats.bestTimeMs > 0
                            ? formatDuration(stats.bestTimeMs)
                            : "--"}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}

// --- Sub-components ---

function StatCard({ iconName, iconColor, label, value }) {
  return (
    <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 flex items-center gap-5">
      <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 shadow-inner">
        <Icon name={iconName} className={`w-5 h-5 ${iconColor}`} />
      </div>
      <div>
        <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-1">
          {label}
        </p>
        <p className="text-3xl font-black text-white tracking-tight">{value}</p>
      </div>
    </div>
  );
}
