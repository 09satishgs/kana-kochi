import { findKanaAsset } from "@/dao/kanaAssetDao";
import { getTelegramFileUrl } from "@/lib/telegram/telegramClient";

const cache = new Map();

export const getKanaAssets = async ({ script, kana }) => {
  const cacheKey = `${script}_${kana}`;

  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }

  const doc = await findKanaAsset({ script, kana });

  if (!doc) {
    throw new Error("Kana asset not found");
  }

  const imageUrl = await getTelegramFileUrl(doc.assets.image.fileId);
  const strokeUrl = await getTelegramFileUrl(doc.assets.stroke.fileId);

  const result = { imageUrl, strokeUrl };

  cache.set(cacheKey, result);

  return result;
};
