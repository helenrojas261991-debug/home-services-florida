import { z } from "zod";
import { publicProcedure, protectedProcedure, adminProcedure, router } from "./_core/trpc";
import { getGoogleReviews, upsertIntegrationSettings, getIntegrationSettings } from "./db";
import {
  validateGoogleAccessToken,
  getGoogleBusinessAccountInfo,
  syncGoogleReviews,
  fetchGoogleReviews,
} from "./google-business";

export const googleBusinessRouter = router({
  /**
   * Get cached Google reviews (public)
   */
  getReviews: publicProcedure
    .input(z.object({ limit: z.number().int().positive().max(50).optional() }).optional())
    .query(async ({ input }) => {
      try {
        const reviews = await getGoogleReviews(input?.limit || 10);
        
        // Calculate average rating from cached reviews
        const avgRating = reviews.length > 0
          ? Math.round((reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length) * 10) / 10
          : 0;
        
        // Calculate rating distribution
        const distribution: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
        reviews.forEach((r) => {
          distribution[r.rating]++;
        });
        
        return {
          success: true,
          data: reviews,
          averageRating: avgRating,
          ratingDistribution: distribution,
        };
      } catch (error) {
        return {
          success: false,
          data: [],
          error: error instanceof Error ? error.message : "Unknown error",
        };
      }
    }),

  /**
   * Get Google Business settings (admin only)
   */
  getSettings: adminProcedure.query(async () => {
    try {
      const settings = await getIntegrationSettings("google-business");
      if (!settings) {
        return {
          success: true,
          data: null,
        };
      }

      return {
        success: true,
        data: {
          isActive: settings.isActive,
          businessId: settings.businessId,
          googleLocationName: settings.googleLocationName,
          lastSyncedAt: settings.lastSyncedAt,
        },
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }),

  /**
   * Get Google Business account info (admin only)
   */
  getAccountInfo: adminProcedure.query(async () => {
    try {
      const settings = await getIntegrationSettings("google-business");
      if (!settings?.accessToken) {
        return {
          success: false,
          data: null,
          error: "Google Business not configured",
        };
      }

      const accountInfo = await getGoogleBusinessAccountInfo(settings.accessToken);
      if (!accountInfo) {
        return {
          success: false,
          data: null,
          error: "Could not retrieve account information",
        };
      }

      return {
        success: true,
        data: {
          accountId: accountInfo.accountId,
          accountName: accountInfo.accountName,
          locations: accountInfo.locations.map((loc: any) => ({
            name: loc.name,
            displayName: loc.displayName,
            primaryPhone: loc.primaryPhone,
            primaryWebsiteUrl: loc.primaryWebsiteUrl,
          })),
        },
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }),

  /**
   * Configure Google Business integration (admin only)
   */
  configureSettings: adminProcedure
    .input(
      z.object({
        accessToken: z.string().min(1),
        googleLocationName: z.string().min(1),
        isActive: z.boolean().optional(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        // Validate access token
        const isValid = await validateGoogleAccessToken(input.accessToken);
        if (!isValid) {
          return {
            success: false,
            error: "Invalid Google access token",
          };
        }

        // Save settings
        await upsertIntegrationSettings({
          service: "google-business",
          accessToken: input.accessToken,
          googleLocationName: input.googleLocationName,
          isActive: input.isActive ?? true,
        });

        return {
          success: true,
        };
      } catch (error) {
        return {
          success: false,
          error: error instanceof Error ? error.message : "Unknown error",
        };
      }
    }),

  /**
   * Sync Google reviews (admin only)
   */
  syncPosts: adminProcedure.mutation(async () => {
    try {
      const result = await syncGoogleReviews();
      return result;
    } catch (error) {
      return {
        success: false,
        synced: 0,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }),

  /**
   * Disable Google Business integration (admin only)
   */
  disable: adminProcedure.mutation(async () => {
    try {
      await upsertIntegrationSettings({
        service: "google-business",
        isActive: false,
      });

      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }),
});
