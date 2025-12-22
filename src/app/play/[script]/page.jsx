"use client";

import { useParams } from "next/navigation";
import Button from "@/components/Button";
import { useNav } from "@/hooks/useNav";
import { useEffect } from "react";
import { useGlobalsContext } from "@/contexts/GlobalsContext";
import usePageTitleUpdater from "@/hooks/usePageTitleUpdater";

/* =========================
   Constants
========================= */

const SCRIPT_CONFIG = {
  hiragana: {
    label: "Hiragana",
  },
  katakana: {
    label: "Katakana",
  },
};

const PAGE_COPY = {
  titleSuffix: "Games",
  description:
    "Choose a game mode to start practicing sound-based recognition.",
};

const GAME_MODES = [
  {
    id: "characters",
    label: "Character Recognition",
    description: "Identify individual characters by sound.",
    path: "characters",
  },
  {
    id: "words",
    label: "Word Recognition",
    description: "Identify full words by selecting characters in order.",
    path: "words",
  },
];

const INVALID_ROUTE_COPY = {
  title: "Page not found",
  description: "The requested play mode does not exist.",
};

/* =========================
   Component
========================= */

const PlayScriptPage = () => {
  const params = useParams();
  const { navigate } = useNav();
  const script = params?.script;
  const config = SCRIPT_CONFIG?.[script];
  usePageTitleUpdater(`${script?.toUpperCase()} - Play`);

  if (!config) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <h1 className="text-3xl font-bold mb-2">{INVALID_ROUTE_COPY.title}</h1>
        <p className="text-muted max-w-md">{INVALID_ROUTE_COPY.description}</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-6 py-10">
      <header className="mb-10 max-w-2xl">
        <h1 className="text-3xl font-bold mb-2">
          {config.label} {PAGE_COPY.titleSuffix}
        </h1>
        <p className="text-muted">{PAGE_COPY.description}</p>
      </header>

      <section
        className="grid gap-6 max-w-3xl"
        aria-label={`${config.label} game modes`}
      >
        {GAME_MODES.map((mode) => (
          <div
            key={mode.id}
            className="bg-card border border-default rounded-lg p-6"
          >
            <h2 className="text-xl font-semibold mb-2">{mode.label}</h2>
            <p className="text-muted mb-4">{mode.description}</p>

            <Button
              variant="secondary"
              ariaLabel={`Start ${mode.label} game`}
              onClick={() => navigate(`/play/${script}/${mode.path}`)}
            >
              Start
            </Button>
          </div>
        ))}
      </section>
    </main>
  );
};

export default PlayScriptPage;
