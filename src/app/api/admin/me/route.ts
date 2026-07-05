import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySessionToken } from "@/lib/session";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_session")?.value;
    const email = token ? verifySessionToken(token) : null;

    if (!email) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    return NextResponse.json({ authenticated: true, email });
  } catch (error) {
    return NextResponse.json({ authenticated: false }, { status: 500 });
  }
}
