import { connectToDatabase } from "@/lib/db/mongoClient";

const COLLECTION = "users";

/**
 * Fetch all userIds that start with any of the given base names.
 * This performs a SINGLE query using $or + regex.
 */
export async function findUserIdsByPrefixes(prefixes = []) {
  if (!prefixes.length) return [];

  const db = await connectToDatabase();

  const query = {
    $or: prefixes.map((name) => ({
      userId: { $regex: `^${name}(\\d*)$` },
    })),
  };

  const users = await db
    .collection(COLLECTION)
    .find(query)
    .project({ userId: 1 })
    .toArray();

  return users.map((u) => u.userId);
}
