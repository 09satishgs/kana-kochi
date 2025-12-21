import { connectToDatabase } from "@/lib/db/mongoClient";

const COLLECTION = "kana_assets";

export const findKanaAsset = async ({ script, kana }) => {
  const db = await connectToDatabase();
  return db.collection(COLLECTION).findOne({ script, kana });
};
