import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { comparePassword } from "@/lib/auth";
import { createSessionToken } from "@/lib/session";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Veuillez remplir tous les champs" }, { status: 400 });
    }

    const admin = await prisma.admin.findUnique({
      where: { email },
    });

    if (!admin) {
      return NextResponse.json({ error: "Identifiants invalides" }, { status: 401 });
    }

    const isMatch = comparePassword(password, admin.password);
    if (!isMatch) {
      return NextResponse.json({ error: "Identifiants invalides" }, { status: 401 });
    }

    const token = createSessionToken(admin.email);

    const response = NextResponse.json({ success: true });
    
    // Set the cookie
    response.headers.set(
      "Set-Cookie",
      `admin_session=${token}; HttpOnly; Path=/; Max-Age=86400; SameSite=Strict`
    );

    return response;
  } catch (error) {
    console.error("Admin login API error:", error);
    return NextResponse.json({ error: "Erreur interne du serveur" }, { status: 500 });
  }
}
