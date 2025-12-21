"use client";

import { useParams } from "next/navigation";

import LearnKanaClient from "./LearnKanaClient.jsx";
import { hiragana } from "@/data/hiragana";
import { katakana } from "@/data/katakana";
import { useEffect } from "react";
import { useGlobals } from "@/contexts/GlobalsContext.js";

/* =========================
   Constants
========================= */

const SCRIPT_CONFIG = {
  hiragana: {
    label: "Hiragana",
    data: hiragana,
  },
  katakana: {
    label: "Katakana",
    data: katakana,
  },
};

const INVALID_ROUTE_COPY = {
  title: "Page not found",
  description: "The requested learning mode does not exist.",
};

/* =========================
   Component
========================= */

const LearnScriptPage = () => {
  const params = useParams();
  const { changeTitle } = useGlobals();
  const script = params?.script;
  const config = SCRIPT_CONFIG?.[script];

  useEffect(() => {
    changeTitle(`Cheat Sheet - ${params?.script?.toUpperCase()}`);
  }, [params]);

  if (!config) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <h1 className="text-3xl font-bold mb-2">{INVALID_ROUTE_COPY.title}</h1>
        <p className="text-muted max-w-md">{INVALID_ROUTE_COPY.description}</p>
      </main>
    );
  }

  return <LearnKanaClient data={config?.data} />;
};

export default LearnScriptPage;
