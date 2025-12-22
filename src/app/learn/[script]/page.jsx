"use client";

import { useParams } from "next/navigation";

import LearnKanaClient from "./LearnKanaClient.jsx";
import usePageTitleUpdater from "@/hooks/usePageTitleUpdater.js";
import { SCRIPT_CONFIG, INVALID_ROUTE_COPY } from "@/constants.js";

/* =========================
   Component
========================= */

const LearnScriptPage = () => {
  const params = useParams();
  const script = params?.script;
  const config = SCRIPT_CONFIG?.[script];
  usePageTitleUpdater(`Cheat Sheet - ${params?.script?.toUpperCase()}`);

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
