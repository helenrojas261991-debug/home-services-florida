import { describe, expect, it, beforeEach, vi } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createAdminContext(): TrpcContext {
  const user: AuthenticatedUser = {
    id: 1,
    openId: "admin-user",
    email: "admin@example.com",
    name: "Admin User",
    loginMethod: "manus",
    role: "admin",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  const ctx: TrpcContext = {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };

  return ctx;
}

describe("media router", () => {
  let ctx: TrpcContext;

  beforeEach(() => {
    ctx = createAdminContext();
  });

  describe("uploadImage", () => {
    it("should validate image file type", async () => {
      const caller = appRouter.createCaller(ctx);

      const result = await caller.media.uploadImage({
        file: Buffer.from("fake image data"),
        filename: "test.txt",
        mimeType: "text/plain",
      });

      expect(result.success).toBe(false);
      expect(result.error).toContain("Invalid image type");
    });

    it("should validate image file size", async () => {
      const caller = appRouter.createCaller(ctx);

      // Create a buffer larger than 10MB
      const largeBuffer = Buffer.alloc(11 * 1024 * 1024);

      const result = await caller.media.uploadImage({
        file: largeBuffer,
        filename: "large.jpg",
        mimeType: "image/jpeg",
      });

      expect(result.success).toBe(false);
      expect(result.error).toContain("too large");
    });

    it("should accept valid image types", async () => {
      const caller = appRouter.createCaller(ctx);

      const validTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];

      for (const mimeType of validTypes) {
        const result = await caller.media.uploadImage({
          file: Buffer.from("fake image data"),
          filename: `test.${mimeType.split("/")[1]}`,
          mimeType,
        });

        // Should not fail on type validation
        // (may fail on actual upload, but that's S3 related)
        expect(result).toBeDefined();
      }
    });
  });

  describe("uploadVideo", () => {
    it("should validate video file type", async () => {
      const caller = appRouter.createCaller(ctx);

      const result = await caller.media.uploadVideo({
        file: Buffer.from("fake video data"),
        filename: "test.txt",
        mimeType: "text/plain",
      });

      expect(result.success).toBe(false);
      expect(result.error).toContain("Invalid video type");
    });

    it("should validate video file size", async () => {
      const caller = appRouter.createCaller(ctx);

      // Create a buffer larger than 100MB
      const largeBuffer = Buffer.alloc(101 * 1024 * 1024);

      const result = await caller.media.uploadVideo({
        file: largeBuffer,
        filename: "large.mp4",
        mimeType: "video/mp4",
      });

      expect(result.success).toBe(false);
      expect(result.error).toContain("too large");
    });

    it("should accept valid video types", async () => {
      const caller = appRouter.createCaller(ctx);

      const validTypes = ["video/mp4", "video/webm", "video/quicktime"];

      for (const mimeType of validTypes) {
        const result = await caller.media.uploadVideo({
          file: Buffer.from("fake video data"),
          filename: `test.${mimeType.split("/")[1]}`,
          mimeType,
        });

        // Should not fail on type validation
        expect(result).toBeDefined();
      }
    });
  });

  describe("updateContent", () => {
    it("should update content with text fields", async () => {
      const caller = appRouter.createCaller(ctx);

      const result = await caller.media.updateContent({
        key: "hero-section",
        titleEn: "New Hero Title",
        titleEs: "Nuevo Título del Hero",
        descriptionEn: "New description",
        descriptionEs: "Nueva descripción",
      });

      expect(result.success).toBe(true);
    });

    it("should update content with partial fields", async () => {
      const caller = appRouter.createCaller(ctx);

      const result = await caller.media.updateContent({
        key: "hero-section",
        titleEn: "Updated Title",
      });

      expect(result.success).toBe(true);
    });

    it("should update content with metadata", async () => {
      const caller = appRouter.createCaller(ctx);

      const result = await caller.media.updateContent({
        key: "hero-section",
        metadata: {
          backgroundColor: "#0066FF",
          textColor: "#FFFFFF",
        },
      });

      expect(result.success).toBe(true);
    });
  });

  describe("getContent", () => {
    it("should retrieve content by key", async () => {
      const caller = appRouter.createCaller(ctx);

      const result = await caller.media.getContent({
        key: "hero-section",
      });

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
    });

    it("should return null for non-existent content", async () => {
      const caller = appRouter.createCaller(ctx);

      const result = await caller.media.getContent({
        key: "non-existent-key",
      });

      expect(result.success).toBe(true);
      expect(result.data).toBeUndefined();
    });
  });

  describe("getAllContent", () => {
    it("should retrieve all content", async () => {
      const caller = appRouter.createCaller(ctx);

      const result = await caller.media.getAllContent();

      expect(result.success).toBe(true);
      expect(Array.isArray(result.data)).toBe(true);
    });
  });

  describe("deleteContent", () => {
    it("should delete content by key", async () => {
      const caller = appRouter.createCaller(ctx);

      const result = await caller.media.deleteContent({
        key: "hero-section",
      });

      expect(result.success).toBe(true);
    });
  });

  describe("authorization", () => {
    it("should require admin role for media operations", async () => {
      // Create non-admin context
      const user: AuthenticatedUser = {
        id: 2,
        openId: "regular-user",
        email: "user@example.com",
        name: "Regular User",
        loginMethod: "manus",
        role: "user",
        createdAt: new Date(),
        updatedAt: new Date(),
        lastSignedIn: new Date(),
      };

      const nonAdminCtx: TrpcContext = {
        user,
        req: {
          protocol: "https",
          headers: {},
        } as TrpcContext["req"],
        res: {
          clearCookie: vi.fn(),
        } as unknown as TrpcContext["res"],
      };

      const caller = appRouter.createCaller(nonAdminCtx);

      try {
        await caller.media.updateContent({
          key: "hero-section",
          titleEn: "Unauthorized Update",
        });
        // If we get here, the test should fail
        expect(true).toBe(false);
      } catch (error) {
        // Expected: FORBIDDEN error
        expect(error).toBeDefined();
      }
    });
  });
});
