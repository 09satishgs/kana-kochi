"use client";

import { useAudio } from "@/hooks/useAudio";

export default function SoundButton({ kana }) {
  const { speak } = useAudio({
    lang: "ja-JP",
    rate: 1,
    pitch: 1,
  });

  return (
    <button
      onClick={() => speak(kana)}
      className="
        relative
        w-32 h-32
        flex items-center justify-center
        rounded-full
        bg-linear-to-br from-cyan-400 to-blue-600
        text-5xl
        shadow-lg shadow-cyan-500/40
        hover:scale-105 hover:shadow-cyan-400/70
        active:scale-95
        transition-all duration-200
        select-none
        cursor-pointer
      "
    >
      🔊
      <span className="absolute -bottom-8 text-sm text-blue-900">Sound</span>
    </button>
  );
}
