import { connectToDatabase } from "@/lib/db/mongoClient";

const COLLECTION = "words";

export const insertWord = async (word) => {
  const db = await connectToDatabase();
  return db.collection(COLLECTION).insertOne(word);
};

export const fetchBalancedWords = async ({ script, total = 100 }) => {
  const db = await connectToDatabase();

  const perBucket = Math.floor(total / 9);

  return db
    .collection(COLLECTION)
    .aggregate([
      {
        $facet: {
          easy_short: [
            {
              $match: {
                difficulty: 1,
                length: { $gte: 3, $lte: 4 },
                [`scripts.${script}`]: { $exists: true },
              },
            },
            { $sample: { size: perBucket } },
          ],
          easy_medium: [
            {
              $match: {
                difficulty: 1,
                length: { $gte: 5, $lte: 6 },
                [`scripts.${script}`]: { $exists: true },
              },
            },
            { $sample: { size: perBucket } },
          ],
          easy_long: [
            {
              $match: {
                difficulty: 1,
                length: { $gte: 7 },
                [`scripts.${script}`]: { $exists: true },
              },
            },
            { $sample: { size: perBucket } },
          ],

          medium_short: [
            {
              $match: {
                difficulty: 2,
                length: { $gte: 3, $lte: 4 },
                [`scripts.${script}`]: { $exists: true },
              },
            },
            { $sample: { size: perBucket } },
          ],
          medium_medium: [
            {
              $match: {
                difficulty: 2,
                length: { $gte: 5, $lte: 6 },
                [`scripts.${script}`]: { $exists: true },
              },
            },
            { $sample: { size: perBucket } },
          ],
          medium_long: [
            {
              $match: {
                difficulty: 2,
                length: { $gte: 7 },
                [`scripts.${script}`]: { $exists: true },
              },
            },
            { $sample: { size: perBucket } },
          ],

          hard_short: [
            {
              $match: {
                difficulty: 3,
                length: { $gte: 3, $lte: 4 },
                [`scripts.${script}`]: { $exists: true },
              },
            },
            { $sample: { size: perBucket } },
          ],
          hard_medium: [
            {
              $match: {
                difficulty: 3,
                length: { $gte: 5, $lte: 6 },
                [`scripts.${script}`]: { $exists: true },
              },
            },
            { $sample: { size: perBucket } },
          ],
          hard_long: [
            {
              $match: {
                difficulty: 3,
                length: { $gte: 7 },
                [`scripts.${script}`]: { $exists: true },
              },
            },
            { $sample: { size: perBucket } },
          ],
        },
      },
      {
        $project: {
          words: {
            $concatArrays: [
              "$easy_short",
              "$easy_medium",
              "$easy_long",
              "$medium_short",
              "$medium_medium",
              "$medium_long",
              "$hard_short",
              "$hard_medium",
              "$hard_long",
            ],
          },
        },
      },
    ])
    .toArray();
};
