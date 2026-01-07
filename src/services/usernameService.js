import USERNAME_POOL from "@/constants/usernamePool";
import { findUserIdsByPrefixes } from "@/dao/usernameDao";

/* =========================
   Helpers
========================= */

const pickRandom = (arr, count) => {
  return [...arr].sort(() => 0.5 - Math.random()).slice(0, count);
};

const extractSuffix = (base, userId) => {
  if (userId === base) return 0;

  const match = userId.match(new RegExp(`^${base}(\\d+)$`));
  return match ? Number(match[1]) : null;
};

/* =========================
   Main Service
========================= */

export async function getAvailableUsernames(count = 4) {
  // 1. Pick random base names
  const baseNames = pickRandom(USERNAME_POOL, count);

  // 2. Fetch ALL matching existing usernames (single DB call)
  const existingUserIds = await findUserIdsByPrefixes(baseNames);

  // 3. Resolve collisions per base name
  const results = [];

  for (const base of baseNames) {
    const matches = existingUserIds.filter((id) => id.startsWith(base));

    if (matches.length === 0) {
      results.push(base);
      continue;
    }

    let maxSuffix = 0;

    for (const id of matches) {
      const suffix = extractSuffix(base, id);
      if (suffix !== null && suffix > maxSuffix) {
        maxSuffix = suffix;
      }
    }

    results.push(`${base}${maxSuffix + 1}`);
  }

  return results;
}
