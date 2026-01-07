import { NextResponse } from "next/server";
import { getAvailableUsernames } from "@/services/usernameService";

export async function GET() {
  try {
    const usernames = await getAvailableUsernames(4);
    return NextResponse.json({ usernames });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to generate usernames" },
      { status: 500 }
    );
  }
}
