"use client";

import { useNav } from "@/hooks/useNav";
import Icon from "@/components/Icon";
import usePageTitleUpdater from "@/hooks/usePageTitleUpdater";
import LearningTips from "@/components/LearningTips";

export default function LearnLandingPage() {
  const { navigate } = useNav();
  usePageTitleUpdater("Learn Japanese Kana");
  return (
    <main className="px-6 py-12 text-white">
      <header className="max-w-4xl mx-auto mb-12 flex flex-col justify-center">
        <p className="text-white/70 text-lg mb-4 text-center">
          Japanese uses phonetic writing systems called kana. Start by
          understanding how they work, then explore each character with
          sound-first learning.
        </p>
        <LearningTips
          className="self-center"
          tips={[
            "Focus on sound first, not romaji",
            "Say the sound out loud after tapping a character.",
            "Don't rush — familiarity comes from repetition.",
            "Use Play and Practice modes once characters feel familiar.",
          ]}
        />
      </header>

      {/* Cards */}
      <section
        className="
          max-w-5xl mx-auto
          grid grid-cols-1 md:grid-cols-2
          gap-8
          mb-16
        "
      >
        {/* Hiragana */}
        <div
          className="
            rounded-3xl
            p-8
            bg-white/10
            backdrop-blur-xl
            border border-white/20
            shadow-xl
            flex flex-col justify-between
          "
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Icon name="icon-book" size={24} />
              <h2 className="text-2xl font-semibold">Hiragana</h2>
            </div>

            <p className="text-white/70 mb-4">
              Hiragana is the primary phonetic script used in Japanese. It
              represents native Japanese words and grammatical endings.
            </p>

            <p className="text-white/60 text-sm">
              <strong>Learn Hiragana first.</strong> It forms the foundation of
              reading and pronunciation in Japanese.
            </p>
          </div>

          <button
            onClick={() => navigate("/learn/hiragana")}
            className="
              mt-6
              px-5 py-3
              rounded-xl
              bg-white/20 hover:bg-white/30
              transition
              text-lg font-medium
            "
          >
            View Hiragana Cheat Sheet →
          </button>
        </div>

        {/* Katakana */}
        <div
          className="
            rounded-3xl
            p-8
            bg-white/10
            backdrop-blur-xl
            border border-white/20
            shadow-xl
            flex flex-col justify-between
          "
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Icon name="icon-book" size={24} />
              <h2 className="text-2xl font-semibold">Katakana</h2>
            </div>

            <p className="text-white/70 mb-4">
              Katakana is used mainly for foreign words, loanwords, names, and
              emphasis in Japanese writing.
            </p>

            <p className="text-white/60 text-sm">
              Katakana is best learned after Hiragana, as it shares the same
              sounds but different shapes.
            </p>
          </div>

          <button
            onClick={() => navigate("/learn/katakana")}
            className="
              mt-6
              px-5 py-3
              rounded-xl
              bg-white/20 hover:bg-white/30
              transition
              text-lg font-medium
            "
          >
            View Katakana Cheat Sheet →
          </button>
        </div>
      </section>
    </main>
  );
}
