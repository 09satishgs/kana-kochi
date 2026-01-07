import {
  SCRIPT,
  KANA,
  SCRIPT_AND_KANA_ARE_REQUIRED,
} from "@/constants/constants";
import { getKanaAssets } from "@/services/kanaAssetService";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);

    const script = searchParams.get(SCRIPT);
    const kana = searchParams.get(KANA);

    if (!script || !kana) {
      return Response.json(
        { error: SCRIPT_AND_KANA_ARE_REQUIRED },
        { status: 400 }
      );
    }

    const assets = await getKanaAssets({ script, kana });

    return Response.json(assets);
  } catch (err) {
    return Response.json({ error: err.message }, { status: 404 });
  }
}
