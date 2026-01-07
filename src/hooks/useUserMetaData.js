"use client";

import { useEffect, useRef, useState } from "react";

const STORAGE_KEY = "kanaKochiUserData";

const useUserMetaData = () => {
  const userDataRef = useRef(null);
  const [userFound, setUserFound] = useState(false);
  /* =========================
     LocalStorage helpers
  ========================= */

  const loadFromLocalStorage = () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  };

  const saveToLocalStorage = (data) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  };

  /* =========================
     Backend sync
  ========================= */

  const refreshUserData = async () => {
    const local = userDataRef.current;
    if (!local?.userId || !local?.revision) return;

    try {
      const res = await fetch(
        `/api/users?userId=${local.userId}&revision=${local.revision}`
      );

      // 409 = client already has latest
      if (res.status === 409) return;
      if (!res.ok) return;

      const fresh = await res.json();

      userDataRef.current = fresh;
      saveToLocalStorage(fresh);
    } catch {
      // silent fail (offline, etc.)
    }
  };

  /* =========================
     Public API
  ========================= */

  const getUserData = async () => {
    // in-memory cache
    if (userDataRef.current) {
      return userDataRef.current;
    }
    // localStorage cache
    const saved = loadFromLocalStorage();
    if (saved?.userId) {
      userDataRef.current = saved;
      refreshUserData(); // silent reconciliation
      return saved;
    }

    // user not created yet
    return null;
  };

  const createUser = async (userId) => {
    const res = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    });
    if (!res.ok) return null;
    const user = await res.json();
    console.info("created user", user);
    userDataRef.current = user;
    saveToLocalStorage(user);
    return user;
  };

  const updateUserData = async (delta) => {
    const local = userDataRef.current;
    if (!local?.userId) return;

    const updated = {
      ...local,
      ...delta,
      revision: Date.now(),
      lastActiveAt: Date.now(),
    };

    // optimistic local update
    userDataRef.current = updated;
    saveToLocalStorage(updated);

    // silent backend sync
    try {
      await fetch("/api/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: updated.userId,
          revision: updated.revision,
          delta,
        }),
      });
    } catch (e) {
      console.error(e);
      // ignore; will reconcile later
    }
  };

  useEffect(() => {
    // on mount, load from localStorage
    const saved = loadFromLocalStorage();
    setUserFound(!!saved?.userId);
    if (saved?.userId) {
      userDataRef.current = saved;
    }
  }, []);

  return {
    getUserData,
    createUser,
    updateUserData,
    refreshUserData,
    savedData: userDataRef.current,
    userFound,
  };
};

export default useUserMetaData;
