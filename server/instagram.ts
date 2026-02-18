import axios from "axios";
import { getIntegrationSettings, upsertIntegrationSettings, upsertInstagramPost } from "./db";
import type { InsertInstagramPost } from "../drizzle/schema";

const INSTAGRAM_API_BASE = "https://graph.instagram.com/v18.0";

interface InstagramPost {
  id: string;
  caption?: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  media_url?: string;
  permalink?: string;
  timestamp: string;
  like_count?: number;
  comments_count?: number;
}

interface InstagramError {
  error: {
    message: string;
    type: string;
    code: number;
  };
}

/**
 * Get Instagram Business Account ID from access token
 */
export async function getInstagramBusinessAccountId(accessToken: string): Promise<string | null> {
  try {
    const response = await axios.get(`${INSTAGRAM_API_BASE}/me`, {
      params: {
        fields: "id,username",
        access_token: accessToken,
      },
    });

    return response.data.id;
  } catch (error) {
    console.error("[Instagram] Error getting business account ID:", error);
    return null;
  }
}

/**
 * Refresh Instagram access token using refresh token
 */
export async function refreshInstagramAccessToken(
  refreshToken: string,
  appId: string,
  appSecret: string
): Promise<string | null> {
  try {
    const response = await axios.get(`${INSTAGRAM_API_BASE}/refresh_access_token`, {
      params: {
        grant_type: "ig_refresh_token",
        access_token: refreshToken,
      },
    });

    return response.data.access_token;
  } catch (error) {
    console.error("[Instagram] Error refreshing access token:", error);
    return null;
  }
}

/**
 * Fetch Instagram posts from business account
 */
export async function fetchInstagramPosts(
  businessAccountId: string,
  accessToken: string,
  limit: number = 12
): Promise<InstagramPost[]> {
  try {
    const response = await axios.get(
      `${INSTAGRAM_API_BASE}/${businessAccountId}/media`,
      {
        params: {
          fields:
            "id,caption,media_type,media_url,permalink,timestamp,like_count,comments_count",
          access_token: accessToken,
          limit,
        },
      }
    );

    return response.data.data || [];
  } catch (error) {
    console.error("[Instagram] Error fetching posts:", error);
    return [];
  }
}

/**
 * Get video URL for carousel or video posts
 */
export async function getInstagramMediaUrl(
  mediaId: string,
  accessToken: string
): Promise<string | null> {
  try {
    const response = await axios.get(`${INSTAGRAM_API_BASE}/${mediaId}`, {
      params: {
        fields: "media_url,video_data",
        access_token: accessToken,
      },
    });

    // For videos, try to get video_data first, then fall back to media_url
    if (response.data.video_data?.length > 0) {
      return response.data.video_data[0];
    }

    return response.data.media_url || null;
  } catch (error) {
    console.error("[Instagram] Error getting media URL:", error);
    return null;
  }
}

/**
 * Sync Instagram posts to database
 */
export async function syncInstagramPosts(): Promise<{
  success: boolean;
  synced: number;
  error?: string;
}> {
  try {
    // Get Instagram settings from database
    const settings = await getIntegrationSettings("instagram");

    if (!settings || !settings.isActive) {
      return {
        success: false,
        synced: 0,
        error: "Instagram integration not configured or inactive",
      };
    }

    if (!settings.accessToken || !settings.instagramBusinessAccountId) {
      return {
        success: false,
        synced: 0,
        error: "Missing Instagram access token or business account ID",
      };
    }

    // Fetch posts from Instagram
    const posts = await fetchInstagramPosts(
      settings.instagramBusinessAccountId,
      settings.accessToken,
      12
    );

    if (posts.length === 0) {
      return {
        success: true,
        synced: 0,
        error: "No posts found on Instagram account",
      };
    }

    // Save posts to database
    let syncedCount = 0;
    for (const post of posts) {
      try {
        // Get full media URL if needed
        let mediaUrl = post.media_url;
        if (!mediaUrl && (post.media_type === "VIDEO" || post.media_type === "CAROUSEL_ALBUM")) {
          mediaUrl = (await getInstagramMediaUrl(post.id, settings.accessToken)) || undefined;
        }

        const dbPost: InsertInstagramPost = {
          instagramId: post.id,
          caption: post.caption,
          mediaType: post.media_type,
          mediaUrl: mediaUrl || "",
          permalink: post.permalink,
          timestamp: post.timestamp ? new Date(post.timestamp) : new Date(),
          likeCount: post.like_count || 0,
          commentCount: post.comments_count || 0,
        };

        await upsertInstagramPost(dbPost);
        syncedCount++;
      } catch (error) {
        console.error(`[Instagram] Error saving post ${post.id}:`, error);
        continue;
      }
    }

    // Update last synced time
    await upsertIntegrationSettings({
      service: "instagram",
      lastSyncedAt: new Date(),
    });

    return {
      success: true,
      synced: syncedCount,
    };
  } catch (error) {
    console.error("[Instagram] Error syncing posts:", error);
    return {
      success: false,
      synced: 0,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Validate Instagram access token
 */
export async function validateInstagramAccessToken(accessToken: string): Promise<boolean> {
  try {
    const response = await axios.get(`${INSTAGRAM_API_BASE}/me`, {
      params: {
        fields: "id",
        access_token: accessToken,
      },
    });

    return !!response.data.id;
  } catch (error) {
    console.error("[Instagram] Error validating access token:", error);
    return false;
  }
}

/**
 * Get Instagram account info
 */
export async function getInstagramAccountInfo(accessToken: string): Promise<{
  id: string;
  username: string;
  name?: string;
  biography?: string;
  website?: string;
  profile_picture_url?: string;
} | null> {
  try {
    const response = await axios.get(`${INSTAGRAM_API_BASE}/me`, {
      params: {
        fields: "id,username,name,biography,website,profile_picture_url",
        access_token: accessToken,
      },
    });

    return response.data;
  } catch (error) {
    console.error("[Instagram] Error getting account info:", error);
    return null;
  }
}
