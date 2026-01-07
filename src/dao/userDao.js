import { connectToDatabase } from "@/lib/db/mongoClient";

const COLLECTION = "users";

/* =========================
   Find user
========================= */
export async function findUserById(userId) {
  const db = await connectToDatabase();
  return db.collection(COLLECTION).findOne({ userId });
}

/* =========================
   Insert user
========================= */
export async function insertUser(user) {
  const db = await connectToDatabase();
  await db.collection(COLLECTION).insertOne(user);
  return user;
}

/* =========================
   Update user (optimistic)
========================= */
export async function updateUserIfNewer({ userId, revision, delta }) {
  const db = await connectToDatabase();
  const result = await db.collection(COLLECTION).findOneAndUpdate(
    {
      userId,
      revision: { $lt: revision },
    },
    {
      $set: {
        ...delta,
        revision,
        lastActiveAt: Date.now(),
      },
    },
    { returnDocument: "after" }
  );
  return result.value;
}
