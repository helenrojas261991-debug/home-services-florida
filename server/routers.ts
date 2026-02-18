import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { instagramRouter } from "./instagram.router";
import { googleBusinessRouter } from "./google-business.router";
import { mediaRouter } from "./media.router";
import { z } from "zod";
import {
  getGoogleReviews,
  getInstagramPosts,
  getContentByKey,
  getAllContent,
  upsertContent,
  getIntegrationSettings,
  upsertIntegrationSettings,
  createContactSubmission,
  getContactSubmissions,
} from "./db";

export const appRouter = router({
  system: systemRouter,
  instagram: instagramRouter,
  googleBusiness: googleBusinessRouter,
  media: mediaRouter,
  
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Public procedures for frontend
  public: router({
    /**
     * Get Google Business Profile reviews
     */
    getGoogleReviews: publicProcedure
      .input(z.object({ limit: z.number().default(10) }).optional())
      .query(async ({ input }) => {
        try {
          const reviews = await getGoogleReviews(input?.limit || 10);
          return {
            success: true,
            data: reviews,
          };
        } catch (error) {
          console.error("Error fetching Google reviews:", error);
          return {
            success: false,
            data: [],
            error: "Failed to fetch reviews",
          };
        }
      }),

    /**
     * Get Instagram posts from cache
     */
    getInstagramPosts: publicProcedure
      .input(z.object({ limit: z.number().default(12) }).optional())
      .query(async ({ input }) => {
        try {
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
            error: "Failed to fetch posts",
          };
        }
      }),

    /**
     * Get content by key
     */
    getContent: publicProcedure
      .input(z.object({ key: z.string() }))
      .query(async ({ input }) => {
        try {
          const content = await getContentByKey(input.key);
          return {
            success: true,
            data: content,
          };
        } catch (error) {
          console.error("Error fetching content:", error);
          return {
            success: false,
            data: null,
            error: "Failed to fetch content",
          };
        }
      }),

    /**
     * Get all content
     */
    getAllContent: publicProcedure.query(async () => {
      try {
        const content = await getAllContent();
        return {
          success: true,
          data: content,
        };
      } catch (error) {
        console.error("Error fetching all content:", error);
        return {
          success: false,
          data: [],
          error: "Failed to fetch content",
        };
      }
    }),

    /**
     * Submit contact form
     */
    submitContact: publicProcedure
      .input(
        z.object({
          name: z.string().min(1),
          email: z.string().email(),
          phone: z.string().optional(),
          message: z.string().min(1),
        })
      )
      .mutation(async ({ input }) => {
        try {
          await createContactSubmission({
            name: input.name,
            email: input.email,
            phone: input.phone,
            message: input.message,
          });
          return {
            success: true,
          };
        } catch (error) {
          console.error("Error submitting contact form:", error);
          return {
            success: false,
            error: "Failed to submit contact form",
          };
        }
      }),
  }),

  // Admin procedures
  admin: router({
    /**
     * Update content (admin only)
     */
    updateContent: protectedProcedure
      .input(
        z.object({
          key: z.string(),
          titleEn: z.string().optional(),
          titleEs: z.string().optional(),
          descriptionEn: z.string().optional(),
          descriptionEs: z.string().optional(),
          imageUrl: z.string().optional(),
          videoUrl: z.string().optional(),
          metadata: z.record(z.string(), z.any()).optional(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        if (ctx.user?.role !== "admin") {
          throw new Error("Unauthorized");
        }

        try {
          await upsertContent({
            key: input.key,
            titleEn: input.titleEn,
            titleEs: input.titleEs,
            descriptionEn: input.descriptionEn,
            descriptionEs: input.descriptionEs,
            imageUrl: input.imageUrl,
            videoUrl: input.videoUrl,
            metadata: input.metadata,
          });
          return {
            success: true,
          };
        } catch (error) {
          console.error("Error updating content:", error);
          return {
            success: false,
            error: "Failed to update content",
          };
        }
      }),

    /**
     * Get integration settings (admin only)
     */
    getIntegrationSettings: protectedProcedure
      .input(z.object({ service: z.string() }))
      .query(async ({ ctx, input }) => {
        if (ctx.user?.role !== "admin") {
          throw new Error("Unauthorized");
        }

        try {
          const settings = await getIntegrationSettings(input.service);
          return {
            success: true,
            data: settings,
          };
        } catch (error) {
          console.error("Error fetching integration settings:", error);
          return {
            success: false,
            data: null,
            error: "Failed to fetch settings",
          };
        }
      }),

    /**
     * Update integration settings (admin only)
     */
    updateIntegrationSettings: protectedProcedure
      .input(
        z.object({
          service: z.string(),
          accessToken: z.string().optional(),
          refreshToken: z.string().optional(),
          businessId: z.string().optional(),
          instagramBusinessAccountId: z.string().optional(),
          googleLocationName: z.string().optional(),
          isActive: z.boolean().optional(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        if (ctx.user?.role !== "admin") {
          throw new Error("Unauthorized");
        }

        try {
          await upsertIntegrationSettings({
            service: input.service,
            accessToken: input.accessToken,
            refreshToken: input.refreshToken,
            businessId: input.businessId,
            instagramBusinessAccountId: input.instagramBusinessAccountId,
            googleLocationName: input.googleLocationName,
            isActive: input.isActive,
          });
          return {
            success: true,
          };
        } catch (error) {
          console.error("Error updating integration settings:", error);
          return {
            success: false,
            error: "Failed to update settings",
          };
        }
      }),

    /**
     * Get contact submissions (admin only)
     */
    getContactSubmissions: protectedProcedure
      .input(z.object({ limit: z.number().optional() }))
      .query(async ({ ctx, input }) => {
        if (ctx.user?.role !== "admin") {
          throw new Error("Unauthorized");
        }

        try {
          const submissions = await getContactSubmissions(input?.limit);
          return {
            success: true,
            data: submissions,
          };
        } catch (error) {
          console.error("Error fetching contact submissions:", error);
          return {
            success: false,
            data: [],
            error: "Failed to fetch submissions",
          };
        }
      }),
  }),
});

export type AppRouter = typeof appRouter;
