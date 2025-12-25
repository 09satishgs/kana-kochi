"use client";

import { useRouter } from "next/navigation";

/**
 * Custom navigation hook for Kana Kochi
 *
 * Centralizes all routing logic so UI components
 * never directly depend on Next.js APIs.
 */
export const useNav = () => {
  const router = useRouter();

  /**
   * Navigate to a new route
   * @param {string} href - target path
   */
  const navigate = (href) => {
    if (typeof href !== "string") return;

    // Future hooks:
    // - play click sound
    // - log analytics
    // - route guards
    // - animated transitions

    router.push(href);
  };

  const prev = () => {};
  const next = () => {};
  const reload = () => {};

  return {
    navigate,
    prev,
    next,
    reload,
  };
};
