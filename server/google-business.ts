import axios from "axios";
import { getIntegrationSettings, upsertIntegrationSettings, upsertGoogleReview } from "./db";
import type { InsertGoogleReview } from "../drizzle/schema";

const GOOGLE_BUSINESS_API_BASE = "https://mybusinessbusinessinformation.googleapis.com/v1";
const GOOGLE_REVIEWS_API_BASE = "https://mybusinessreviews.googleapis.com/v1";

interface GoogleReview {
  name: string;
  reviewId: string;
  reviewer: {
    displayName: string;
    profilePhotoUrl?: string;
  };
  reviewReply?: {
    comment: string;
    updateTime: string;
  };
  starRating: "ONE" | "TWO" | "THREE" | "FOUR" | "FIVE";
  comment: string;
  createTime: string;
  updateTime: string;
  reviewOpenEndReason?: string;
}

interface GoogleBusinessLocation {
  name: string;
  displayName: string;
  type: string;
  primaryPhone: string;
  primaryWebsiteUrl: string;
  regularHours?: {
    periods: Array<{
      openDay: string;
      openTime: {
        hours: number;
        minutes: number;
      };
      closeDay: string;
      closeTime: {
        hours: number;
        minutes: number;
      };
    }>;
  };
}

/**
 * Get list of business locations
 */
export async function getBusinessLocations(accessToken: string): Promise<GoogleBusinessLocation[]> {
  try {
    const response = await axios.get(`${GOOGLE_BUSINESS_API_BASE}/accounts`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const accounts = response.data.accounts || [];
    if (accounts.length === 0) {
      return [];
    }

    // Get locations for the first account
    const accountName = accounts[0].name;
    const locationsResponse = await axios.get(
      `${GOOGLE_BUSINESS_API_BASE}/${accountName}/locations`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return locationsResponse.data.locations || [];
  } catch (error) {
    console.error("[Google Business] Error getting locations:", error);
    return [];
  }
}

/**
 * Get business location by name
 */
export async function getBusinessLocation(
  accessToken: string,
  locationName: string
): Promise<GoogleBusinessLocation | null> {
  try {
    const response = await axios.get(
      `${GOOGLE_BUSINESS_API_BASE}/${locationName}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("[Google Business] Error getting location:", error);
    return null;
  }
}

/**
 * Fetch reviews from Google Business Profile
 */
export async function fetchGoogleReviews(
  accessToken: string,
  locationName: string,
  limit: number = 20
): Promise<GoogleReview[]> {
  try {
    const response = await axios.get(
      `${GOOGLE_REVIEWS_API_BASE}/${locationName}/reviews`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          pageSize: limit,
          orderBy: "updateTime desc",
        },
      }
    );

    return response.data.reviews || [];
  } catch (error) {
    console.error("[Google Business] Error fetching reviews:", error);
    return [];
  }
}

/**
 * Convert Google star rating to number
 */
function starRatingToNumber(rating: string): number {
  const ratingMap: Record<string, number> = {
    ONE: 1,
    TWO: 2,
    THREE: 3,
    FOUR: 4,
    FIVE: 5,
  };
  return ratingMap[rating] || 0;
}

/**
 * Sync Google reviews to database
 */
export async function syncGoogleReviews(): Promise<{
  success: boolean;
  synced: number;
  error?: string;
}> {
  try {
    // Get Google Business settings from database
    const settings = await getIntegrationSettings("google-business");

    if (!settings || !settings.isActive) {
      return {
        success: false,
        synced: 0,
        error: "Google Business integration not configured or inactive",
      };
    }

    if (!settings.accessToken || !settings.googleLocationName) {
      return {
        success: false,
        synced: 0,
        error: "Missing Google Business access token or location name",
      };
    }

    // Fetch reviews from Google
    const reviews = await fetchGoogleReviews(
      settings.accessToken,
      settings.googleLocationName,
      20
    );

    if (reviews.length === 0) {
      return {
        success: true,
        synced: 0,
        error: "No reviews found on Google Business profile",
      };
    }

    // Save reviews to database
    let syncedCount = 0;
    for (const review of reviews) {
      try {
        const dbReview: InsertGoogleReview = {
          googleReviewId: review.reviewId,
          authorName: review.reviewer.displayName,
          authorPhotoUrl: review.reviewer.profilePhotoUrl,
          rating: starRatingToNumber(review.starRating),
          comment: review.comment,
          replyComment: review.reviewReply?.comment,
          replyTime: review.reviewReply?.updateTime ? new Date(review.reviewReply.updateTime) : null,
          createdAt: new Date(review.createTime),
          updatedAt: new Date(review.updateTime),
        };

        await upsertGoogleReview(dbReview);
        syncedCount++;
      } catch (error) {
        console.error(`[Google Business] Error saving review ${review.reviewId}:`, error);
        continue;
      }
    }

    // Update last synced time
    await upsertIntegrationSettings({
      service: "google-business",
      lastSyncedAt: new Date(),
    });

    return {
      success: true,
      synced: syncedCount,
    };
  } catch (error) {
    console.error("[Google Business] Error syncing reviews:", error);
    return {
      success: false,
      synced: 0,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Validate Google access token
 */
export async function validateGoogleAccessToken(accessToken: string): Promise<boolean> {
  try {
    const response = await axios.get(`${GOOGLE_BUSINESS_API_BASE}/accounts`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return !!response.data.accounts;
  } catch (error) {
    console.error("[Google Business] Error validating access token:", error);
    return false;
  }
}

/**
 * Get Google Business account info
 */
export async function getGoogleBusinessAccountInfo(accessToken: string): Promise<{
  accountId: string;
  accountName: string;
  locations: GoogleBusinessLocation[];
} | null> {
  try {
    const response = await axios.get(`${GOOGLE_BUSINESS_API_BASE}/accounts`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const accounts = response.data.accounts || [];
    if (accounts.length === 0) {
      return null;
    }

    const account = accounts[0];
    const accountName = account.name;

    // Get locations
    const locationsResponse = await axios.get(
      `${GOOGLE_BUSINESS_API_BASE}/${accountName}/locations`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return {
      accountId: account.accountId,
      accountName: accountName,
      locations: locationsResponse.data.locations || [],
    };
  } catch (error) {
    console.error("[Google Business] Error getting account info:", error);
    return null;
  }
}

/**
 * Get average rating from reviews
 */
export function calculateAverageRating(reviews: GoogleReview[]): number {
  if (reviews.length === 0) return 0;

  const sum = reviews.reduce((acc, review) => {
    return acc + starRatingToNumber(review.starRating);
  }, 0);

  return Math.round((sum / reviews.length) * 10) / 10;
}

/**
 * Get rating distribution from reviews
 */
export function getRatingDistribution(reviews: GoogleReview[]): Record<number, number> {
  const distribution: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

  reviews.forEach((review) => {
    const rating = starRatingToNumber(review.starRating);
    distribution[rating]++;
  });

  return distribution;
}
