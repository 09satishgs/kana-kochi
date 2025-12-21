"use client";
import Button from "@/components/Button";
import { useNav } from "@/hooks/useNav";
/* =========================
   Constants
========================= */

const APP_TITLE = "Kana Kochi";

const APP_TAGLINE =
  "Learn Hiragana and Katakana through sound-based games. Train your ears and eyes — not romaji.";

const PRIMARY_ACTIONS = [
  {
    id: "learn",
    label: "Start Learning",
    href: "/learn/hiragana",
    ariaLabel: "Start learning Hiragana with a kana cheat sheet",
    variant: "primary",
  },
  {
    id: "play",
    label: "Start Playing",
    href: "/play/hiragana",
    ariaLabel: "Start playing Hiragana recognition games",
    variant: "secondary",
  },
];

/* =========================
   Component
========================= */

const HomePage = () => {
  const navigate = useNav();
  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center px-6"
      aria-labelledby="app-title"
    >
      <h1
        id="app-title"
        className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
      >
        {APP_TITLE}
      </h1>

      <p
        className="text-neutral-400 text-center max-w-xl mb-10"
        aria-describedby="app-title"
      >
        {APP_TAGLINE}
      </p>

      <nav aria-label="Primary actions">
        <ul className="flex flex-col sm:flex-row gap-4">
          {PRIMARY_ACTIONS.map((action) => (
            <li key={action.id}>
              <Button
                variant={action.variant}
                ariaLabel={action.ariaLabel}
                onClick={() => navigate(action.href)}
              >
                {action.label}
              </Button>
            </li>
          ))}
        </ul>
      </nav>
    </main>
  );
};
export default HomePage;
