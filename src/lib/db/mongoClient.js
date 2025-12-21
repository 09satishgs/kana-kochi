import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB;

if (!uri) {
  throw new Error("❌ MONGODB_URI not defined");
}

let cached = global.mongo;

if (!cached) {
  cached = global.mongo = {
    client: null,
    db: null,
  };
}

export const connectToDatabase = async () => {
  if (cached.db) {
    return cached.db;
  }

  const client = new MongoClient(uri, {
    maxPoolSize: 10,
  });

  await client.connect();

  const db = client.db(dbName);

  cached.client = client;
  cached.db = db;

  console.log("✅ MongoDB connected");

  return db;
};
