import * as wordDao from "@/dao/wordDao";

export const getGameWords = async ({ script, total }) => {
  if (!script) {
    throw new Error("script is required");
  }
  const response = await wordDao.fetchBalancedWords({
    script,
    total,
  });
  return response?.[0]?.words;
};

export const createWord = async (payload) => {
  if (!payload.romaji || !payload.scripts) {
    throw new Error("invalid word payload");
  }

  return wordDao.insertWord({
    ...payload,
    length: payload.scripts.hiragana.length,
  });
};
