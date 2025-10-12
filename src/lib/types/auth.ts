export type Role = "user" | "admin" | "educator";

/**
 * Authenticated user object
 */
export interface AuthUser {
  id: string;
  name?: string | null;
  email: string;
  role: Role;
  createdAtUtc: string; // ISO
  isActive: boolean;
  lastLoginUtc?: string | null; // ISO or null
}

/**
 * Response from backend containing the following:
 * - AccessToken (JWT)
 * - Authenticated user
 */
export interface AuthResponse {
  accessToken: string; // JWT
  user: AuthUser;
}
