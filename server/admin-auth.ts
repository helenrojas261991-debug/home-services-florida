import crypto from "crypto";

/**
 * Admin authentication system for local development and testing
 * Uses simple username/password authentication with bcrypt-like hashing
 */

// Default admin credentials (can be overridden with environment variables)
const DEFAULT_ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
const DEFAULT_ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

// Session storage (in production, use Redis or database)
const sessions = new Map<string, { username: string; expiresAt: number }>();

/**
 * Hash a password using SHA256
 * Note: For production, use bcrypt instead
 */
function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password).digest("hex");
}

/**
 * Verify a password against a hash
 */
function verifyPassword(password: string, hash: string): boolean {
  return hashPassword(password) === hash;
}

/**
 * Generate a session token
 */
function generateSessionToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

/**
 * Authenticate admin with username and password
 * Returns session token if successful, null otherwise
 */
export function authenticateAdmin(username: string, password: string): string | null {
  // Verify credentials
  if (username !== DEFAULT_ADMIN_USERNAME) {
    return null;
  }

  const passwordHash = hashPassword(DEFAULT_ADMIN_PASSWORD);
  if (!verifyPassword(password, passwordHash)) {
    return null;
  }

  // Create session
  const token = generateSessionToken();
  const expiresAt = Date.now() + 24 * 60 * 60 * 1000; // 24 hours

  sessions.set(token, {
    username,
    expiresAt,
  });

  return token;
}

/**
 * Verify if a session token is valid
 */
export function verifySession(token: string): boolean {
  const session = sessions.get(token);

  if (!session) {
    return false;
  }

  // Check if session has expired
  if (session.expiresAt < Date.now()) {
    sessions.delete(token);
    return false;
  }

  return true;
}

/**
 * Get session info
 */
export function getSession(token: string) {
  const session = sessions.get(token);

  if (!session) {
    return null;
  }

  // Check if session has expired
  if (session.expiresAt < Date.now()) {
    sessions.delete(token);
    return null;
  }

  return session;
}

/**
 * Logout - invalidate session
 */
export function logoutAdmin(token: string): void {
  sessions.delete(token);
}

/**
 * Get all active sessions (for debugging)
 */
export function getActiveSessions() {
  const now = Date.now();
  const active = Array.from(sessions.entries())
    .filter(([_, session]) => session.expiresAt > now)
    .map(([token, session]) => ({
      token: token.substring(0, 8) + "...",
      username: session.username,
      expiresAt: new Date(session.expiresAt),
    }));

  return active;
}

/**
 * Clear all sessions (for testing)
 */
export function clearAllSessions(): void {
  sessions.clear();
}

/**
 * Get current admin credentials (for testing/development)
 */
export function getAdminCredentials() {
  return {
    username: DEFAULT_ADMIN_USERNAME,
    password: DEFAULT_ADMIN_PASSWORD,
  };
}
