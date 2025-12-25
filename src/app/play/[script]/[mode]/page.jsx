"use client";

import { useNav } from "@/hooks/useNav";
import usePageTitleUpdater from "@/hooks/usePageTitleUpdater";
import { useParams } from "next/navigation";

const LEVELS = [
  { level: 0, label: "Lv0", desc: "Very easy, beginner friendly." },
  { level: 1, label: "Lv1", desc: "Basic recognition practice." },
  { level: 2, label: "Lv2", desc: "Moderate difficulty." },
  { level: 3, label: "Lv3", desc: "Challenging and faster paced." },
  { level: 4, label: "Lv4", desc: "Advanced mastery level." },
];

export default function PlayModePage() {
  const { script, mode } = useParams();
  const { navigate } = useNav();
  usePageTitleUpdater(
    `Play - ${script?.toUpperCase()} · ${mode?.toUpperCase()}`
  );
  return (
    <main className="min-h-screen px-6 py-12 text-white">
      <header className="max-w-4xl mx-auto mb-12">
        <p className="text-white/70 text-lg text-center">
          Select a difficulty level to begin.
        </p>
      </header>

      <section className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-6">
        {LEVELS.map((lvl) => (
          <LevelCard
            key={lvl.level}
            {...lvl}
            onClick={() => navigate(`/play/${script}/${mode}/${lvl.level}`)}
          />
        ))}
      </section>
    </main>
  );
}

function LevelCard({ label, desc, onClick }) {
  return (
    <div
      onClick={onClick}
      className="
        cursor-pointer
        rounded-2xl p-6
        bg-white/10 backdrop-blur-xl
        border border-white/20
        shadow-lg
        hover:bg-white/20
        transition
      "
    >
      <h3 className="text-xl font-semibold mb-2">{label}</h3>
      <p className="text-white/70 text-sm">{desc}</p>
    </div>
  );
}
