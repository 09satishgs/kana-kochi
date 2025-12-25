"use client";

import { useNav } from "@/hooks/useNav";
import Icon from "@/components/Icon";
import usePageTitleUpdater from "@/hooks/usePageTitleUpdater";

export default function PlayLandingPage() {
  const { navigate } = useNav();
  usePageTitleUpdater("Play  ---  Choose the Kana");
  return (
    <main className="min-h-screen px-6 py-12 text-white">
      <header className="max-w-4xl mx-auto mb-12">
        <p className="text-white/70 text-lg text-center">
          Test your recognition skills through interactive games. Choose a
          script to begin.
        </p>
      </header>

      <section className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <PlayCard
          title="Hiragana"
          description="Play games to recognize Hiragana characters and words."
          icon="icon-play"
          onClick={() => navigate("/play/hiragana")}
        />

        <PlayCard
          title="Katakana"
          description="Practice recognizing Katakana used for foreign words."
          icon="icon-play"
          onClick={() => navigate("/play/katakana")}
        />
      </section>
    </main>
  );
}

function PlayCard({ title, description, icon, onClick }) {
  return (
    <div
      onClick={onClick}
      className="
        cursor-pointer
        rounded-3xl p-8
        bg-white/10 backdrop-blur-xl
        border border-white/20
        shadow-xl
        hover:bg-white/20
        transition
      "
    >
      <div className="flex items-center gap-3 mb-4">
        <Icon name={icon} size={22} />
        <h2 className="text-2xl font-semibold">{title}</h2>
      </div>
      <p className="text-white/70">{description}</p>
    </div>
  );
}
