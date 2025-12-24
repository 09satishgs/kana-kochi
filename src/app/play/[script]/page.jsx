"use client";

import { useNav } from "@/hooks/useNav";
import usePageTitleUpdater from "@/hooks/usePageTitleUpdater";
import { useParams } from "next/navigation";

export default function PlayScriptPage() {
  const { script } = useParams();
  const { navigate } = useNav();

  usePageTitleUpdater(`Play - ${script?.toUpperCase()}`);

  return (
    <main className="min-h-screen px-6 py-12  text-white">
      <header className="max-w-4xl mx-auto mb-12">
        <p className="text-white/70 text-lg text-center">
          Choose how you want to challenge yourself.
        </p>
      </header>

      <section className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <ModeCard
          title="Letters"
          description="Recognize individual characters by sound or shape."
          onClick={() => navigate(`/play/${script}/letters`)}
        />

        <ModeCard
          title="Words"
          description="Recognize complete words made of multiple characters."
          onClick={() => navigate(`/play/${script}/words`)}
        />
      </section>
    </main>
  );
}

function ModeCard({ title, description, onClick }) {
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
      <h2 className="text-2xl font-semibold mb-2">{title}</h2>
      <p className="text-white/70">{description}</p>
    </div>
  );
}
