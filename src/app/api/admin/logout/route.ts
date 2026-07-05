import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ success: true });
  // Clear the session cookie
  response.headers.set(
    "Set-Cookie",
    "admin_session=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict"
  );
  return response;
}
