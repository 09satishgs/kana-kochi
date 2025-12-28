import { ERROR, OK } from "@/constants";
import { connectToDatabase } from "@/lib/db/mongoClient";

export async function GET() {
  try {
    const db = await connectToDatabase();
    const collections = await db.collections();

    return Response.json({
      status: OK,
      db: db.databaseName,
      collections: collections.map((c) => c.collectionName),
    });
  } catch (err) {
    console.error(err);
    return Response.json(
      { status: ERROR, message: err.message },
      { status: 500 }
    );
  }
}
