"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";
import useUserMetaData from "./useUserMetaData";
import { getLocalStrorageItem, setlocalStrorageItem } from "@/helpers";
import { PENDING_BACKEND_SYNC_KEY } from "@/constants/constants";
import { useGlobalsContext } from "@/contexts/GlobalsContext";

const getSectionFromPath = (path?: string) => {
  if (!path) return null;
  if (path.startsWith("/learn")) return "learn";
  if (path.startsWith("/practice")) return "practice";
  if (path.startsWith("/play")) return "play";
  return null;
};

/**
 * Custom navigation hook for Kana Kochi
 * Centralizes routing, prefetching, and future middleware logic.
 */
export const useNav = () => {
  const router = useRouter();
  const { syncBackend, updateMeta } = useUserMetaData();
  const { activeSection, enteredAt, setActiveSection, setEnteredAt } =
    useGlobalsContext();

  const updateTimeSpent = (nextHref?: string) => {
    console.log("update fn started", { activeSection, enteredAt });
    const now = Date.now();
    const nextSection = getSectionFromPath(nextHref);

    console.log(1, { activeSection, nextSection, enteredAt });
    // Same section → nothing to do
    if (activeSection === nextSection) return;

    // First meaningful entry
    if (!activeSection || !enteredAt) {
      console.log(2, "no active section or enteredAt", {
        activeSection,
        enteredAt,
      });
      if (nextSection) {
        console.log(3, "first meaningful entry", { activeSection, enteredAt });
        setActiveSection(nextSection);
        setEnteredAt(now);
      }
      return;
    }

    // Calculate delta
    const deltaMs = now - enteredAt;
    console.log(4, { deltaMs });
    if (deltaMs > 0) {
      updateMeta({ [`${activeSection}Ms`]: deltaMs }, "stats", {
        localOnly: true,
      });
      console.log(5, "marked localOnly update", { activeSection, enteredAt });
      // mark backend sync pending
      setlocalStrorageItem(PENDING_BACKEND_SYNC_KEY, true);
    }

    // Move to next section
    if (nextSection) {
      setActiveSection(nextSection);
      setEnteredAt(now);
      console.log(6, "moved to next section", { activeSection, enteredAt });
    }
  };

  // Helper for side effects (Analytics, Logging, etc.)
  const executeMiddleware = useCallback((action: string, href?: string) => {
    if (!href) {
      return;
    }
    // Future: logEvent("navigation", { action, href });
    // Future: playClickSound();
    // updateTimeSpent(href); todo: enable after through testing
    console.log(`[Nav]: ${action} ${href || ""}`);
    if (getLocalStrorageItem(PENDING_BACKEND_SYNC_KEY)) {
      setlocalStrorageItem(PENDING_BACKEND_SYNC_KEY, false);
      syncBackend();
    }
  }, []);

  /**
   * Navigate to a target path
   */
  const navigate = useCallback(
    (href: string, options?: { scroll?: boolean }) => {
      if (!href) return;

      executeMiddleware("push", href);
      router.push(href, options);
    },
    [router, executeMiddleware]
  );

  /**
   * Prefetch a route for faster transitions
   */
  const prefetch = useCallback(
    (href: string) => {
      if (!href) return;
      router.prefetch(href);
    },
    [router]
  );

  /**
   * Browser-level actions
   */
  const prev = useCallback(() => {
    executeMiddleware("back"); //todo: pass href?
    router.back();
  }, [router, executeMiddleware]);

  const reload = useCallback(() => {
    executeMiddleware("reload"); //todo: pass href?
    window.location.reload();
  }, [executeMiddleware]);

  const replace = useCallback(
    (href: string) => {
      executeMiddleware("replace", href);
      router.replace(href);
    },
    [router, executeMiddleware]
  );

  return {
    navigate,
    prefetch,
    prev,
    reload,
    replace,
  };
};
