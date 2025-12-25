import { getGameWords, createWord } from "@/services/wordService";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);

    const words = await getGameWords({
      script: searchParams.get("script"),
      total: 100,
    });
    return Response.json(words);
  } catch (err) {
    return Response.json({ error: err.message }, { status: 400 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const result = await createWord(body);
    return Response.json(result, { status: 201 });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 400 });
  }
}
