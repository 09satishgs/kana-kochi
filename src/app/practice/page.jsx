"use client";

import { useNav } from "@/hooks/useNav";
import Icon from "@/components/Icon";
import usePageTitleUpdater from "@/hooks/usePageTitleUpdater";
import LearningTips from "@/components/LearningTips";

export default function PracticeLandingPage() {
  const { navigate } = useNav();
  usePageTitleUpdater("Practice Writing Japanese Kana");
  return (
    <main
      className="
        min-h-screen
        px-6 py-12
        text-white
      "
    >
      <header className="max-w-4xl mx-auto mb-12 flex flex-col gap-4 justify-center">
        <p className="text-white/70 text-lg text-center">
          Writing kana helps reinforce correct pronunciation, shape recognition,
          and muscle memory. Stroke order matters in Japanese, and practicing it
          correctly will make reading and writing feel natural.
        </p>
        <LearningTips
          tips={[
            "Follow the correct stroke order — it affects balance and flow.",
            "Write slowly at first, focusing on shape rather than speed.",
            "Say the sound out loud as you write each character.",
            "Practice a small set of characters daily instead of cramming.",
            "Revisit characters you find difficult regularly.",
          ]}
          className="self-center"
          title="Practice Tips"
        />
      </header>

      {/* CTA Cards */}
      <section
        className="
          max-w-5xl mx-auto
          grid grid-cols-1 md:grid-cols-2
          gap-8
          mb-16
        "
      >
        {/* Hiragana Practice */}
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
            <h3 className="text-2xl font-semibold mb-3">Hiragana Practice</h3>
            <p className="text-white/70">
              Practice writing Hiragana characters one by one with guided stroke
              order animations and audio.
            </p>
          </div>

          <button
            onClick={() => navigate("/practice/hiragana")}
            className="
              mt-6
              px-5 py-3
              rounded-xl
              bg-white/20 hover:bg-white/30
              transition
              text-lg font-medium
            "
          >
            Start Hiragana Practice →
          </button>
        </div>

        {/* Katakana Practice */}
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
            <h3 className="text-2xl font-semibold mb-3">Katakana Practice</h3>
            <p className="text-white/70">
              Practice writing Katakana characters with proper stroke order,
              commonly used for foreign words.
            </p>
          </div>

          <button
            onClick={() => navigate("/practice/katakana")}
            className="
              mt-6
              px-5 py-3
              rounded-xl
              bg-white/20 hover:bg-white/30
              transition
              text-lg font-medium
            "
          >
            Start Katakana Practice →
          </button>
        </div>
      </section>
      {/* Practice Sheet */}
      <section
        className="
          max-w-5xl mx-auto
          mb-14
          rounded-3xl
          p-8
          bg-white/10
          backdrop-blur-xl
          border border-white/20
          shadow-xl
        "
      >
        <div className="flex items-center gap-3 mb-4">
          <Icon name="icon-pen" size={22} />
          <h2 className="text-2xl font-semibold">Printable Practice Sheets</h2>
        </div>

        <p className="text-white/70 mb-6">
          If you prefer pen and paper, use practice sheets to write each
          character repeatedly while following proper stroke order.
        </p>

        <a
          href="https://lesson.com/resources/pdf/characters/blank_writing_practice_sheet.pdf"
          download
          className="
            inline-flex items-center gap-2
            px-5 py-3
            rounded-xl
            bg-white/20 hover:bg-white/30
            transition
            text-lg font-medium
          "
        >
          ⬇ Download Practice Sheet
        </a>
      </section>
    </main>
  );
}
