"use client";

import { useEffect, useRef, useState } from "react";
import { setlocalStrorageItem, updateAtPath } from "../helpers";
import { STORAGE_KEY, PENDING_BACKEND_SYNC_KEY } from "@/constants/constants";

/**
 * Users MetaData Schema:
 * {
  _id: ObjectId,
  userId: String,          // e.g. "santa", "nobi7"
  createdAt: Number,       // Date.now()
  lastActiveAt: Number,    // Date.now()

  revision: Number,        // Date.now(), last-write-wins

  achievements: {
    hiragana: {
      letters: {
        lvl0: {
          wins: Number,
          gameOvers: Number,
          longestStreak: Number,
          bestTimeMs: Number
        },
        lvl1: { ... },
        lvl2: { ... },
        lvl3: { ... },
        lvl4: { ... }
      },
      words: {
        lvl0: { ... },
        lvl1: { ... },
        lvl2: { ... },
        lvl3: { ... },
        lvl4: { ... }
      }
    },

    katakana: {
      letters: { ... },
      words: { ... }
    }
  },

  // aggregate stats
  stats: {
    learnMs: Number,
    practiceMs: Number,
    playMs: Number
  }
}
 * 
 */

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
      if (res.status === 409) {
        setlocalStrorageItem(PENDING_BACKEND_SYNC_KEY, false);
        updateUserData({});
        return;
      }
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

  // Optimistic update with silent backend sync (revision needs to be passed every time)
  const updateUserData = async (delta) => {
    const local = userDataRef.current;
    if (!local?.userId) return;

    const updated = {
      ...local,
      ...delta,
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
          delta: { achievements: updated.achievements, stats: updated.stats },
        }),
      });
    } catch (e) {
      console.error(e);
      // ignore; will reconcile later
    }
  };

  const updateMeta = async (
    partialUpdate,
    path,
    options = { localOnly: false }
  ) => {
    const local = userDataRef.current;
    if (!local?.userId) return;

    const updatedUser = updateAtPath(local, path, partialUpdate);

    updatedUser.revision = Date.now();
    updatedUser.lastActiveAt = Date.now();

    // ✅ Always update locally
    userDataRef.current = updatedUser;
    saveToLocalStorage(updatedUser);

    // ❌ Skip backend if localOnly
    if (options.localOnly) {
      setlocalStrorageItem(PENDING_BACKEND_SYNC_KEY, true);
      return;
    }

    // ✅ Silent backend update
    try {
      await fetch("/api/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: updatedUser.userId,
          revision: updatedUser.revision,
          delta: updatedUser.achievements,
        }),
      });
    } catch {
      // silent failure
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
    updateMeta,
    refreshUserData,
    savedData: userDataRef.current,
    userFound,
    syncBackend: updateUserData.bind(null, {}),
  };
};

export default useUserMetaData;
