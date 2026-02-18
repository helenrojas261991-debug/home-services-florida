import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  validateGoogleAccessToken,
  getGoogleBusinessAccountInfo,
  fetchGoogleReviews,
  syncGoogleReviews,
  calculateAverageRating,
  getRatingDistribution,
} from "./google-business";

// Mock axios
vi.mock("axios");

describe("Google Business Integration", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("validateGoogleAccessToken", () => {
    it("should return true for valid access token", async () => {
      const axios = await import("axios");
      vi.mocked(axios.default.get).mockResolvedValueOnce({
        data: { accounts: [{ accountId: "123456789" }] },
      });

      const result = await validateGoogleAccessToken("valid_token");
      expect(result).toBe(true);
    });

    it("should return false for invalid access token", async () => {
      const axios = await import("axios");
      vi.mocked(axios.default.get).mockRejectedValueOnce(new Error("Invalid token"));

      const result = await validateGoogleAccessToken("invalid_token");
      expect(result).toBe(false);
    });
  });

  describe("getGoogleBusinessAccountInfo", () => {
    it("should return account info for valid token", async () => {
      const axios = await import("axios");
      vi.mocked(axios.default.get)
        .mockResolvedValueOnce({
          data: {
            accounts: [
              {
                accountId: "123456789",
                name: "accounts/123456789",
              },
            ],
          },
        })
        .mockResolvedValueOnce({
          data: {
            locations: [
              {
                name: "accounts/123456789/locations/987654321",
                displayName: "Main Office",
                primaryPhone: "555-1234",
                primaryWebsiteUrl: "https://example.com",
              },
            ],
          },
        });

      const result = await getGoogleBusinessAccountInfo("valid_token");
      expect(result).not.toBeNull();
      expect(result?.accountId).toBe("123456789");
      expect(result?.locations).toHaveLength(1);
    });

    it("should return null for invalid token", async () => {
      const axios = await import("axios");
      vi.mocked(axios.default.get).mockRejectedValueOnce(new Error("Invalid token"));

      const result = await getGoogleBusinessAccountInfo("invalid_token");
      expect(result).toBeNull();
    });
  });

  describe("fetchGoogleReviews", () => {
    it("should fetch reviews from Google API", async () => {
      const axios = await import("axios");
      const mockReviews = [
        {
          name: "review1",
          reviewId: "review1",
          reviewer: { displayName: "John Doe", profilePhotoUrl: "https://example.com/photo.jpg" },
          starRating: "FIVE" as const,
          comment: "Great service!",
          createTime: "2026-02-18T00:00:00Z",
          updateTime: "2026-02-18T00:00:00Z",
        },
        {
          name: "review2",
          reviewId: "review2",
          reviewer: { displayName: "Jane Smith" },
          starRating: "FOUR" as const,
          comment: "Good work",
          createTime: "2026-02-17T00:00:00Z",
          updateTime: "2026-02-17T00:00:00Z",
        },
      ];

      vi.mocked(axios.default.get).mockResolvedValueOnce({
        data: { reviews: mockReviews },
      });

      const result = await fetchGoogleReviews("123456789", "valid_token", 12);
      expect(result).toHaveLength(2);
      expect(result[0].comment).toBe("Great service!");
      expect(result[1].starRating).toBe("FOUR");
    });

    it("should return empty array on error", async () => {
      const axios = await import("axios");
      vi.mocked(axios.default.get).mockRejectedValueOnce(new Error("API Error"));

      const result = await fetchGoogleReviews("123456789", "invalid_token", 12);
      expect(result).toEqual([]);
    });
  });

  describe("calculateAverageRating", () => {
    it("should calculate average rating correctly", () => {
      const reviews = [
        {
          name: "r1",
          reviewId: "r1",
          reviewer: { displayName: "User1" },
          starRating: "FIVE" as const,
          comment: "Great",
          createTime: "2026-02-18T00:00:00Z",
          updateTime: "2026-02-18T00:00:00Z",
        },
        {
          name: "r2",
          reviewId: "r2",
          reviewer: { displayName: "User2" },
          starRating: "FOUR" as const,
          comment: "Good",
          createTime: "2026-02-17T00:00:00Z",
          updateTime: "2026-02-17T00:00:00Z",
        },
        {
          name: "r3",
          reviewId: "r3",
          reviewer: { displayName: "User3" },
          starRating: "FIVE" as const,
          comment: "Excellent",
          createTime: "2026-02-16T00:00:00Z",
          updateTime: "2026-02-16T00:00:00Z",
        },
      ];

      const average = calculateAverageRating(reviews);
      expect(average).toBe(4.7); // (5 + 4 + 5) / 3 = 4.666... ≈ 4.7
    });

    it("should return 0 for empty reviews", () => {
      const average = calculateAverageRating([]);
      expect(average).toBe(0);
    });
  });

  describe("getRatingDistribution", () => {
    it("should calculate rating distribution correctly", () => {
      const reviews = [
        {
          name: "r1",
          reviewId: "r1",
          reviewer: { displayName: "User1" },
          starRating: "FIVE" as const,
          comment: "Great",
          createTime: "2026-02-18T00:00:00Z",
          updateTime: "2026-02-18T00:00:00Z",
        },
        {
          name: "r2",
          reviewId: "r2",
          reviewer: { displayName: "User2" },
          starRating: "FIVE" as const,
          comment: "Good",
          createTime: "2026-02-17T00:00:00Z",
          updateTime: "2026-02-17T00:00:00Z",
        },
        {
          name: "r3",
          reviewId: "r3",
          reviewer: { displayName: "User3" },
          starRating: "FOUR" as const,
          comment: "Excellent",
          createTime: "2026-02-16T00:00:00Z",
          updateTime: "2026-02-16T00:00:00Z",
        },
      ];

      const distribution = getRatingDistribution(reviews);
      expect(distribution[5]).toBe(2);
      expect(distribution[4]).toBe(1);
      expect(distribution[1]).toBe(0);
    });
  });

  describe("syncGoogleReviews", () => {
    it("should return error if integration not configured", async () => {
      const result = await syncGoogleReviews();
      expect(result.success).toBe(false);
      expect(result.error).toContain("not configured");
    });
  });
});
