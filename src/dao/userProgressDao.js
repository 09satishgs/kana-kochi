import { connectToDatabase } from "@/lib/db/mongoClient";

const COLLECTION = "users";

export const getUserById = async (userId) => {
  const db = await connectToDatabase();
  return db.collection(COLLECTION).findOne({ userId });
};

export const upsertUser = async (user) => {
  const db = await connectToDatabase();
  return db
    .collection(COLLECTION)
    .updateOne(
      { userId: user.userId },
      { $set: user, $setOnInsert: { createdAt: new Date() } },
      { upsert: true }
    );
};
