import { ERROR, SCRIPT, TOTAL } from "@/constants/constants";
import { getGameWords, createWord } from "@/services/wordService";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);

    const words = await getGameWords({
      script: searchParams.get(SCRIPT),
      total: TOTAL,
    });
    return Response.json(words);
  } catch (err) {
    return Response.json({ [ERROR]: err.message }, { status: 400 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const result = await createWord(body);
    return Response.json(result, { status: 201 });
  } catch (err) {
    return Response.json({ [ERROR]: err.message }, { status: 400 });
  }
}
