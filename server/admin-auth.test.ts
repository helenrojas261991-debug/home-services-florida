import { describe, expect, it, beforeEach, afterEach } from "vitest";
import {
  authenticateAdmin,
  verifySession,
  logoutAdmin,
  getSession,
  clearAllSessions,
  getAdminCredentials,
} from "./admin-auth";

describe("Admin Authentication", () => {
  beforeEach(() => {
    clearAllSessions();
  });

  afterEach(() => {
    clearAllSessions();
  });

  describe("authenticateAdmin", () => {
    it("should return null for invalid username", () => {
      const token = authenticateAdmin("invalid_user", "admin123");
      expect(token).toBeNull();
    });

    it("should return null for invalid password", () => {
      const token = authenticateAdmin("admin", "wrong_password");
      expect(token).toBeNull();
    });

    it("should return a token for valid credentials", () => {
      const token = authenticateAdmin("admin", "admin123");
      expect(token).not.toBeNull();
      expect(token).toBeTruthy();
      expect(typeof token).toBe("string");
      expect(token?.length).toBeGreaterThan(0);
    });

    it("should return different tokens for multiple logins", () => {
      const token1 = authenticateAdmin("admin", "admin123");
      const token2 = authenticateAdmin("admin", "admin123");

      expect(token1).not.toEqual(token2);
      expect(token1).not.toBeNull();
      expect(token2).not.toBeNull();
    });

    it("should be case-sensitive for username", () => {
      const token = authenticateAdmin("Admin", "admin123");
      expect(token).toBeNull();
    });

    it("should be case-sensitive for password", () => {
      const token = authenticateAdmin("admin", "Admin123");
      expect(token).toBeNull();
    });
  });

  describe("verifySession", () => {
    it("should return false for non-existent session", () => {
      const isValid = verifySession("invalid_token");
      expect(isValid).toBe(false);
    });

    it("should return true for valid session", () => {
      const token = authenticateAdmin("admin", "admin123");
      expect(token).not.toBeNull();

      if (token) {
        const isValid = verifySession(token);
        expect(isValid).toBe(true);
      }
    });

    it("should return false for empty token", () => {
      const isValid = verifySession("");
      expect(isValid).toBe(false);
    });
  });

  describe("getSession", () => {
    it("should return null for non-existent session", () => {
      const session = getSession("invalid_token");
      expect(session).toBeNull();
    });

    it("should return session info for valid token", () => {
      const token = authenticateAdmin("admin", "admin123");
      expect(token).not.toBeNull();

      if (token) {
        const session = getSession(token);
        expect(session).not.toBeNull();
        expect(session?.username).toBe("admin");
        expect(session?.expiresAt).toBeGreaterThan(Date.now());
      }
    });
  });

  describe("logoutAdmin", () => {
    it("should invalidate session after logout", () => {
      const token = authenticateAdmin("admin", "admin123");
      expect(token).not.toBeNull();

      if (token) {
        // Verify session is valid
        expect(verifySession(token)).toBe(true);

        // Logout
        logoutAdmin(token);

        // Verify session is invalid
        expect(verifySession(token)).toBe(false);
      }
    });

    it("should not throw error for invalid token", () => {
      expect(() => {
        logoutAdmin("invalid_token");
      }).not.toThrow();
    });
  });

  describe("getAdminCredentials", () => {
    it("should return default credentials", () => {
      const creds = getAdminCredentials();
      expect(creds.username).toBe("admin");
      expect(creds.password).toBe("admin123");
    });

    it("should match authenticateAdmin defaults", () => {
      const creds = getAdminCredentials();
      const token = authenticateAdmin(creds.username, creds.password);
      expect(token).not.toBeNull();
    });
  });

  describe("Session expiration", () => {
    it("should create session with 24-hour expiration", () => {
      const token = authenticateAdmin("admin", "admin123");
      expect(token).not.toBeNull();

      if (token) {
        const session = getSession(token);
        const expiresIn = session!.expiresAt - Date.now();
        const twentyFourHours = 24 * 60 * 60 * 1000;

        // Should expire in approximately 24 hours (within 1 second)
        expect(expiresIn).toBeGreaterThan(twentyFourHours - 1000);
        expect(expiresIn).toBeLessThanOrEqual(twentyFourHours);
      }
    });
  });

  describe("Multiple sessions", () => {
    it("should support multiple concurrent sessions", () => {
      const token1 = authenticateAdmin("admin", "admin123");
      const token2 = authenticateAdmin("admin", "admin123");
      const token3 = authenticateAdmin("admin", "admin123");

      expect(token1).not.toBeNull();
      expect(token2).not.toBeNull();
      expect(token3).not.toBeNull();

      // All tokens should be valid
      expect(verifySession(token1!)).toBe(true);
      expect(verifySession(token2!)).toBe(true);
      expect(verifySession(token3!)).toBe(true);

      // Logout one session
      logoutAdmin(token1!);

      // Other sessions should still be valid
      expect(verifySession(token1!)).toBe(false);
      expect(verifySession(token2!)).toBe(true);
      expect(verifySession(token3!)).toBe(true);
    });
  });
});
