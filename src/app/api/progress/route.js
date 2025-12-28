import { OK, USERID_REQUIRED } from "@/constants";
import { touchUser } from "@/services/userProgressService";

export async function POST(req) {
  const body = await req.json();
  const { userId, meta } = body;

  if (!userId) {
    return Response.json({ error: USERID_REQUIRED }, { status: 400 });
  }

  await touchUser(userId, meta);

  return Response.json({ status: OK });
}
