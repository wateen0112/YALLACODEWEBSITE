import { NextRequest } from "next/server";
import {
  ADMIN_PASSWORD,
  ADMIN_SESSION_COOKIE,
  ADMIN_SESSION_TOKEN,
  ADMIN_USERNAME
} from "@/lib/api-config";

export function getAdminLoginPath(locale: string) {
  return `/${locale}/internal/login`;
}

export function isAuthenticated(request: NextRequest) {
  return request.cookies.get(ADMIN_SESSION_COOKIE)?.value === ADMIN_SESSION_TOKEN;
}

export function validateAdminCredentials(username: string, password: string) {
  if (!ADMIN_USERNAME || !ADMIN_PASSWORD) return false;
  return username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
}

export const adminSessionCookie = {
  name: ADMIN_SESSION_COOKIE,
  value: ADMIN_SESSION_TOKEN,
  options: {
    httpOnly: true,
    sameSite: "strict" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8
  }
};

