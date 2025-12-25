"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";

/**
 * Custom navigation hook for Kana Kochi
 * Centralizes routing, prefetching, and future middleware logic.
 */
export const useNav = () => {
  const router = useRouter();

  // Helper for side effects (Analytics, Logging, etc.)
  const executeMiddleware = useCallback((action: string, href?: string) => {
    // Future: logEvent("navigation", { action, href });
    // Future: playClickSound();
    console.log(`[Nav]: ${action} ${href || ""}`);
  }, []);

  /**
   * Navigate to a target path
   */
  const navigate = useCallback((href: string, options?: { scroll?: boolean }) => {
    if (!href) return;
    
    executeMiddleware("push", href);
    router.push(href, options);
  }, [router, executeMiddleware]);

  /**
   * Prefetch a route for faster transitions
   */
  const prefetch = useCallback((href: string) => {
    if (!href) return;
    router.prefetch(href);
  }, [router]);

  /**
   * Browser-level actions
   */
  const prev = useCallback(() => {
    executeMiddleware("back");
    router.back();
  }, [router, executeMiddleware]);

  const reload = useCallback(() => {
    executeMiddleware("reload");
    window.location.reload(); 
  }, [executeMiddleware]);

  const replace = useCallback((href: string) => {
    executeMiddleware("replace", href);
    router.replace(href);
  }, [router, executeMiddleware]);

  return {
    navigate,
    prefetch,
    prev,
    reload,
    replace,
  };
};