import * as userDao from "@/dao/userProgressDao";

export const touchUser = async (userId, meta) => {
  return userDao.upsertUser({
    userId,
    lastActiveAt: new Date(),
    meta,
  });
};
