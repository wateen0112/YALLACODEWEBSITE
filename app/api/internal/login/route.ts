import { NextResponse } from "next/server";
import { adminSessionCookie, validateAdminCredentials } from "@/lib/admin-auth";

type LoginBody = { username?: string; password?: string };

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as LoginBody;
  const username = (body.username ?? "").trim();
  const password = body.password ?? "";


  if (!validateAdminCredentials(username, password)) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }


  const response = NextResponse.json({ ok: true });
  response.cookies.set(adminSessionCookie.name, adminSessionCookie.value, adminSessionCookie.options);
  return response;
}
