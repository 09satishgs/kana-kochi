"use client";

import { useNav } from "@/hooks/useNav";
import usePageTitleUpdater from "@/hooks/usePageTitleUpdater";
import React, { useState } from "react";

export default function SettingsPage() {
  // Mock state for display purposes
  const [username, setUsername] = useState("Satoshi_Ash");
  const [pitch, setPitch] = useState(1.0);
  const [rate, setRate] = useState(1.0);
  const { navigate } = useNav();
  usePageTitleUpdater(`Settings --- Customize Your Experience`);

  return (
    <div className="relative w-full h-full bg-black text-gray-100 font-sans p-12 overflow-hidden">
      {/* =========================================================================
          UNDERLYING CONTENT (Grid Layout for Full Width / No Scroll)
          pointer-events-none ensures no interaction behind the overlay.
         ========================================================================= */}
      <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 gap-8 pointer-events-none content-center">
        {/* LEFT COLUMN: Account & Audio */}
        <div className="space-y-8 flex flex-col justify-center">
          {/* 1. Account Section */}
          <section>
            <h2 className="text-xl font-semibold text-white flex items-center gap-2 mb-4">
              👤 Account
            </h2>
            <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Username
              </label>
              <input
                type="text"
                value={username}
                readOnly
                className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none"
              />
              <p className="text-xs text-gray-500 mt-2">
                Visible on leaderboards.
              </p>
            </div>
          </section>

          {/* 2. Audio Preferences */}
          <section>
            <h2 className="text-xl font-semibold text-white flex items-center gap-2 mb-4">
              🔊 Audio & Voice
            </h2>
            <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800 space-y-6">
              {/* Pitch */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium text-gray-400">
                    Voice Pitch
                  </label>
                  <span className="text-sm text-gray-300 font-mono">
                    {pitch}
                  </span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.1"
                  value={pitch}
                  readOnly
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none"
                />
              </div>

              {/* Rate */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium text-gray-400">
                    Speaking Rate
                  </label>
                  <span className="text-sm text-gray-300 font-mono">
                    {rate}x
                  </span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.1"
                  value={rate}
                  readOnly
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none"
                />
              </div>
            </div>
          </section>
        </div>

        {/* RIGHT COLUMN: Appearance & Danger Zone */}
        <div className="space-y-8 flex flex-col justify-center">
          {/* 3. Appearance */}
          <section>
            <h2 className="text-xl font-semibold text-white flex items-center gap-2 mb-4">
              🎨 Appearance
            </h2>
            <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800 flex items-center justify-between h-24">
              <div>
                <p className="font-medium text-gray-200">App Theme</p>
                <p className="text-sm text-gray-500">Select visual style.</p>
              </div>
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-white border-4 border-blue-500 shadow-lg"></div>
                <div className="w-10 h-10 rounded-full bg-gray-800 border border-gray-600 opacity-50"></div>
                <div className="w-10 h-10 rounded-full bg-indigo-900 border border-gray-600 opacity-50"></div>
              </div>
            </div>
          </section>

          {/* 4. Danger Zone (Consolidated) */}
          <section>
            <h2 className="text-xl font-semibold text-red-500 flex items-center gap-2 mb-4">
              ⚠️ Danger Zone
            </h2>
            <div className="bg-red-900/10 p-6 rounded-xl border border-red-900/30 flex items-center justify-between h-24">
              <div>
                <p className="font-medium text-gray-200">Delete Save Data</p>
                <p className="text-sm text-gray-500">
                  Permanently reset progress & history.
                </p>
              </div>
              <button className="px-5 py-2.5 bg-red-600/20 text-red-500 border border-red-600/50 rounded-lg text-sm font-bold hover:bg-red-600 hover:text-white transition">
                DELETE
              </button>
            </div>
          </section>
        </div>
      </div>

      {/* =========================================================================
          THE OVERLAY
         ========================================================================= */}
      <div className="absolute inset-0 z-40 bg-black/50 flex items-center justify-center backdrop-grayscale-[50%]">
        <div className="bg-gray-900 opacity-40 hover:opacity-100 hover:shadow-2xl shadow-gray-300/50 shadow-none border border-gray-700 p-8 rounded-2xl text-center max-w-sm mx-4 transform transition-all hover:scale-105">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-yellow-500/10 mb-4">
            <svg
              className="w-7 h-7 text-yellow-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
              />
            </svg>
          </div>

          <h3 className="text-2xl font-bold text-white mb-2">Coming Soon</h3>
          <p className="text-gray-400 mb-6">
            We are working hard to bring you these customization options.
          </p>

          <button
            onClick={() => navigate("/")}
            className="w-full py-3 bg-white hover:bg-gray-200 text-black font-bold rounded-lg transition-colors cursor-pointer"
          >
            Back to Game
          </button>
        </div>
      </div>
    </div>
  );
}
