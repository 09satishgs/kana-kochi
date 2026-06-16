import { NextResponse } from "next/server";
import { getUser, createUser, updateUser } from "@/services/userService";
import { USERID_REQUIRED } from "@/constants/constants";

/* =========================
   GET /kanakochi/api/users?userId=&revision=
========================= */
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  const revision = Number(searchParams.get("revision"));

  if (!userId) {
    return NextResponse.json({ error: USERID_REQUIRED }, { status: 400 });
  }

  const user = await getUser(userId);

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // client already has latest
  if (revision && user.revision <= revision) {
    return NextResponse.json({ error: "No update needed" }, { status: 409 });
  }

  return NextResponse.json(user);
}

/* =========================
   POST /kanakochi/api/users
   create new user
========================= */
export async function POST(req) {
  const body = await req.json();

  const { userId } = body;

  if (!userId) {
    return NextResponse.json({ error: USERID_REQUIRED }, { status: 400 });
  }

  const user = await createUser(userId);
  return NextResponse.json(user, { status: 201 });
}

/* =========================
   PATCH /kanakochi/api/users
   optimistic update
========================= */
export async function PATCH(req) {
  const body = await req.json();

  const { userId, revision, delta } = body;

  if (!userId || !revision || !delta) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const updated = await updateUser({
    userId,
    revision,
    delta,
  });

  if (!updated) {
    return NextResponse.json(
      { error: "Stale update ignored" },
      { status: 409 },
    );
  }

  return NextResponse.json(updated);
}
