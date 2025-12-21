import { getKanaAssets } from "@/services/kanaAssetService";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);

    const script = searchParams.get("script");
    const kana = searchParams.get("kana");

    if (!script || !kana) {
      return Response.json(
        { error: "script and kana are required" },
        { status: 400 }
      );
    }

    const assets = await getKanaAssets({ script, kana });

    return Response.json(assets);
  } catch (err) {
    return Response.json({ error: err.message }, { status: 404 });
  }
}
