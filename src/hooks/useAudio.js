"use client";

import { useCallback } from "react";

/**
 * useAudio
 *
 * Centralized hook for handling SpeechSynthesis.
 * Keeps audio logic out of UI components.
 */
export function useAudio({ lang = "ja-JP", rate = 0.6, pitch = 0.8 } = {}) {
  const speak = useCallback(
    (text) => {
      if (typeof window === "undefined") return;
      if (!text) return;

      const synth = window.speechSynthesis;

      // Cancel any ongoing speech to avoid overlap
      synth.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = rate;
      utterance.pitch = pitch;

      synth.speak(utterance);
    },
    [lang, rate, pitch]
  );

  return { speak, play: speak };
}
