import { findUserById, insertUser, updateUserIfNewer } from "@/dao/userDao";

/* =========================
   Default user object
========================= */
const createEmptyUser = (userId) => ({
  userId,
  createdAt: Date.now(),
  lastActiveAt: Date.now(),
  revision: Date.now(),

  achievements: {
    hiragana: { letters: {}, words: {} },
    katakana: { letters: {}, words: {} },
  },

  stats: {
    learnMs: 0,
    practiceMs: 0,
    playMs: 0,
  },
});

/* =========================
   Get user
========================= */
export async function getUser(userId) {
  return findUserById(userId);
}

/* =========================
   Create user (idempotent)
========================= */
export async function createUser(userId) {
  const existing = await findUserById(userId);
  if (existing) return existing;

  const user = createEmptyUser(userId);
  return insertUser(user);
}

/* =========================
   Update user (optimistic)
========================= */
export async function updateUser({ userId, revision, delta }) {
  return updateUserIfNewer({
    userId,
    revision,
    delta,
  });
}
