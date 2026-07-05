import crypto from "crypto";

const SESSION_SECRET = process.env.SESSION_SECRET || "match-ce-soir-secret-key-12345-very-secure-random-phrase";

export function createSessionToken(email: string): string {
  const expires = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
  const payload = JSON.stringify({ email, expires });
  const hmac = crypto.createHmac("sha256", SESSION_SECRET).update(payload).digest("hex");
  return Buffer.from(payload).toString("base64") + "." + hmac;
}

export function verifySessionToken(token: string): string | null {
  try {
    if (!token) return null;
    const [payloadB64, signature] = token.split(".");
    if (!payloadB64 || !signature) return null;
    const payload = Buffer.from(payloadB64, "base64").toString("utf-8");
    const hmac = crypto.createHmac("sha256", SESSION_SECRET).update(payload).digest("hex");
    if (hmac !== signature) return null;
    const data = JSON.parse(payload);
    if (data.expires < Date.now()) return null;
    return data.email;
  } catch (e) {
    return null;
  }
}
