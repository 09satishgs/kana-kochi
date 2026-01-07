"use client";

import { useEffect } from "react";
import useUserMetaData from "@/hooks/useUserMetaData";
import { getLocalStrorageItem, setlocalStrorageItem } from "@/helpers";
import { PENDING_BACKEND_SYNC_KEY } from "@/constants/constants";

export default function BackendSyncGate() {
  const { syncBackend } = useUserMetaData();

  /* =========================
     1. Periodic sync (every 10 min)
  ========================= */
  useEffect(() => {
    const INTERVAL_MS = 10 * 60 * 1000; // 10 minutes

    const intervalId = setInterval(() => {
      const hasPendingSync = getLocalStrorageItem(PENDING_BACKEND_SYNC_KEY);
      if (!hasPendingSync) return;

      syncBackend();
      setlocalStrorageItem(PENDING_BACKEND_SYNC_KEY, false);
    }, INTERVAL_MS);

    return () => clearInterval(intervalId);
  }, [syncBackend]);

  /* =========================
     2. Visibility change sync
  ========================= */
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState !== "hidden") return;

      const hasPendingSync = getLocalStrorageItem(PENDING_BACKEND_SYNC_KEY);
      if (!hasPendingSync) return;

      syncBackend();
      setlocalStrorageItem(PENDING_BACKEND_SYNC_KEY, false);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [syncBackend]);

  return null;
}
