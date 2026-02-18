import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import {
  syncInstagramPosts,
  validateInstagramAccessToken,
  getInstagramAccountInfo,
  getInstagramBusinessAccountId,
} from "./instagram";
import { getIntegrationSettings, upsertIntegrationSettings } from "./db";

export const instagramRouter = router({
  /**
   * Get Instagram posts (public)
   */
  getPosts: publicProcedure
    .input(z.object({ limit: z.number().default(12) }).optional())
    .query(async ({ input }) => {
      try {
        const { getInstagramPosts } = await import("./db");
        const posts = await getInstagramPosts(input?.limit || 12);
        return {
          success: true,
          data: posts,
        };
      } catch (error) {
        console.error("Error fetching Instagram posts:", error);
        return {
          success: false,
          data: [],
          error: "Failed to fetch Instagram posts",
        };
      }
    }),

  /**
   * Sync Instagram posts (admin only)
   */
  syncPosts: protectedProcedure.mutation(async ({ ctx }) => {
    if (ctx.user?.role !== "admin") {
      throw new Error("Unauthorized");
    }

    try {
      const result = await syncInstagramPosts();
      return {
        success: result.success,
        synced: result.synced,
        error: result.error,
      };
    } catch (error) {
      console.error("Error syncing Instagram posts:", error);
      return {
        success: false,
        synced: 0,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }),

  /**
   * Get Instagram settings (admin only)
   */
  getSettings: protectedProcedure.query(async ({ ctx }) => {
    if (ctx.user?.role !== "admin") {
      throw new Error("Unauthorized");
    }

    try {
      const settings = await getIntegrationSettings("instagram");
      return {
        success: true,
        data: settings
          ? {
              isActive: settings.isActive,
              businessAccountId: settings.instagramBusinessAccountId,
              lastSyncedAt: settings.lastSyncedAt,
              // Don't return the access token for security
            }
          : null,
      };
    } catch (error) {
      console.error("Error fetching Instagram settings:", error);
      return {
        success: false,
        data: null,
        error: "Failed to fetch settings",
      };
    }
  }),

  /**
   * Configure Instagram settings (admin only)
   */
  configureSettings: protectedProcedure
    .input(
      z.object({
        accessToken: z.string().min(1),
        businessAccountId: z.string().optional(),
        isActive: z.boolean().default(true),
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (ctx.user?.role !== "admin") {
        throw new Error("Unauthorized");
      }

      try {
        // Validate the access token
        const isValid = await validateInstagramAccessToken(input.accessToken);
        if (!isValid) {
          return {
            success: false,
            error: "Invalid Instagram access token",
          };
        }

        // Get business account ID if not provided
        let businessAccountId = input.businessAccountId;
        if (!businessAccountId) {
          businessAccountId = (await getInstagramBusinessAccountId(input.accessToken)) || undefined;
        }

        if (!businessAccountId) {
          return {
            success: false,
            error: "Could not retrieve Instagram business account ID",
          };
        }

        // Save settings
        await upsertIntegrationSettings({
          service: "instagram",
          accessToken: input.accessToken,
          instagramBusinessAccountId: businessAccountId,
          isActive: input.isActive,
        });

        return {
          success: true,
          message: "Instagram settings configured successfully",
        };
      } catch (error) {
        console.error("Error configuring Instagram settings:", error);
        return {
          success: false,
          error: error instanceof Error ? error.message : "Unknown error",
        };
      }
    }),

  /**
   * Get Instagram account info (admin only)
   */
  getAccountInfo: protectedProcedure.query(async ({ ctx }) => {
    if (ctx.user?.role !== "admin") {
      throw new Error("Unauthorized");
    }

    try {
      const settings = await getIntegrationSettings("instagram");
      if (!settings?.accessToken) {
        return {
          success: false,
          data: null,
          error: "Instagram not configured",
        };
      }

      const accountInfo = await getInstagramAccountInfo(settings.accessToken);
      return {
        success: !!accountInfo,
        data: accountInfo,
      };
    } catch (error) {
      console.error("Error fetching Instagram account info:", error);
      return {
        success: false,
        data: null,
        error: "Failed to fetch account info",
      };
    }
  }),

  /**
   * Disable Instagram integration (admin only)
   */
  disable: protectedProcedure.mutation(async ({ ctx }) => {
    if (ctx.user?.role !== "admin") {
      throw new Error("Unauthorized");
    }

    try {
      await upsertIntegrationSettings({
        service: "instagram",
        isActive: false,
      });

      return {
        success: true,
        message: "Instagram integration disabled",
      };
    } catch (error) {
      console.error("Error disabling Instagram integration:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }),
});
