const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const BASE = "https://api.telegram.org";

export const getTelegramFileUrl = async (fileId) => {
  const res = await fetch(`${BASE}/bot${BOT_TOKEN}/getFile?file_id=${fileId}`);

  const data = await res.json();

  if (!data.ok) {
    throw new Error("Telegram getFile failed");
  }

  return `${BASE}/file/bot${BOT_TOKEN}/${data.result.file_path}`;
};
