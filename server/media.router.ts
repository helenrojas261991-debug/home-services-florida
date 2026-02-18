import { z } from "zod";
import { adminProcedure, router } from "./_core/trpc";
import { storagePut } from "./storage";
import { upsertContent, getContentByKey, getAllContent, deleteContent } from "./db";
import { nanoid } from "nanoid";

// File size limits (in bytes)
const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10MB
const MAX_VIDEO_SIZE = 100 * 1024 * 1024; // 100MB

// Allowed file types
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const ALLOWED_VIDEO_TYPES = ["video/mp4", "video/webm", "video/quicktime"];

export const mediaRouter = router({
  /**
   * Upload image to S3
   */
  uploadImage: adminProcedure
    .input(
      z.object({
        file: z.instanceof(Buffer),
        filename: z.string(),
        mimeType: z.string(),
        contentKey: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        // Validate file type
        if (!ALLOWED_IMAGE_TYPES.includes(input.mimeType)) {
          return {
            success: false,
            error: "Invalid image type. Allowed: JPEG, PNG, WebP, GIF",
          };
        }

        // Validate file size
        if (input.file.length > MAX_IMAGE_SIZE) {
          return {
            success: false,
            error: `Image too large. Maximum size: 10MB`,
          };
        }

        // Generate unique filename
        const ext = input.filename.split(".").pop() || "jpg";
        const uniqueFilename = `images/${nanoid()}.${ext}`;

        // Upload to S3
        const { url, key } = await storagePut(uniqueFilename, input.file, input.mimeType);

        // If contentKey provided, update content with new image URL
        if (input.contentKey) {
          await upsertContent({
            key: input.contentKey,
            imageUrl: url,
          });
        }

        return {
          success: true,
          data: {
            url,
            key,
            filename: input.filename,
          },
        };
      } catch (error) {
        console.error("[Media] Error uploading image:", error);
        return {
          success: false,
          error: error instanceof Error ? error.message : "Failed to upload image",
        };
      }
    }),

  /**
   * Upload video to S3
   */
  uploadVideo: adminProcedure
    .input(
      z.object({
        file: z.instanceof(Buffer),
        filename: z.string(),
        mimeType: z.string(),
        contentKey: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        // Validate file type
        if (!ALLOWED_VIDEO_TYPES.includes(input.mimeType)) {
          return {
            success: false,
            error: "Invalid video type. Allowed: MP4, WebM, MOV",
          };
        }

        // Validate file size
        if (input.file.length > MAX_VIDEO_SIZE) {
          return {
            success: false,
            error: `Video too large. Maximum size: 100MB`,
          };
        }

        // Generate unique filename
        const ext = input.filename.split(".").pop() || "mp4";
        const uniqueFilename = `videos/${nanoid()}.${ext}`;

        // Upload to S3
        const { url, key } = await storagePut(uniqueFilename, input.file, input.mimeType);

        // If contentKey provided, update content with new video URL
        if (input.contentKey) {
          await upsertContent({
            key: input.contentKey,
            videoUrl: url,
          });
        }

        return {
          success: true,
          data: {
            url,
            key,
            filename: input.filename,
          },
        };
      } catch (error) {
        console.error("[Media] Error uploading video:", error);
        return {
          success: false,
          error: error instanceof Error ? error.message : "Failed to upload video",
        };
      }
    }),

  /**
   * Update content text fields
   */
  updateContent: adminProcedure
    .input(
      z.object({
        key: z.string(),
        titleEn: z.string().optional(),
        titleEs: z.string().optional(),
        descriptionEn: z.string().optional(),
        descriptionEs: z.string().optional(),
        metadata: z.record(z.string(), z.any()).optional(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        await upsertContent({
          key: input.key,
          titleEn: input.titleEn,
          titleEs: input.titleEs,
          descriptionEn: input.descriptionEn,
          descriptionEs: input.descriptionEs,
          metadata: input.metadata,
        });

        return {
          success: true,
        };
      } catch (error) {
        console.error("[Media] Error updating content:", error);
        return {
          success: false,
          error: error instanceof Error ? error.message : "Failed to update content",
        };
      }
    }),

  /**
   * Get content by key
   */
  getContent: adminProcedure
    .input(z.object({ key: z.string() }))
    .query(async ({ input }) => {
      try {
        const content = await getContentByKey(input.key);
        return {
          success: true,
          data: content,
        };
      } catch (error) {
        console.error("[Media] Error fetching content:", error);
        return {
          success: false,
          data: null,
          error: error instanceof Error ? error.message : "Failed to fetch content",
        };
      }
    }),

  /**
   * Get all content
   */
  getAllContent: adminProcedure.query(async () => {
    try {
      const content = await getAllContent();
      return {
        success: true,
        data: content,
      };
    } catch (error) {
      console.error("[Media] Error fetching all content:", error);
      return {
        success: false,
        data: [],
        error: error instanceof Error ? error.message : "Failed to fetch content",
      };
    }
  }),

  /**
   * Delete content
   */
  deleteContent: adminProcedure
    .input(z.object({ key: z.string() }))
    .mutation(async ({ input }) => {
      try {
        await deleteContent(input.key);
        return {
          success: true,
        };
      } catch (error) {
        console.error("[Media] Error deleting content:", error);
        return {
          success: false,
          error: error instanceof Error ? error.message : "Failed to delete content",
        };
      }
    }),
});
