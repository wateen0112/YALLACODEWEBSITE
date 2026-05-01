export const API_BASE_URL = process.env.API_BASE_URL
export const API_SECRET = process.env.API_SECRET
export const API_SECRET_HEADER = process.env.API_SECRET_HEADER?.trim() || "x-api-key";
export const API_PROJECTS_ENDPOINT = process.env.API_PROJECTS_ENDPOINT?.trim() || "/projects";

export const ADMIN_USERNAME = process.env.ADMIN_USERNAME
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD
export const ADMIN_SESSION_TOKEN =
  process.env.ADMIN_SESSION_TOKEN?.trim() || "dev-only-change-admin-session-token";
export const ADMIN_SESSION_COOKIE = "yc_admin_session" ;

    