import { trpc } from "@/lib/trpc";
import type { GoogleReview } from "../../../drizzle/schema";

export function useGoogleReviews(limit: number = 10) {
  const { data, isLoading, error } = trpc.googleBusiness.getReviews.useQuery({
    limit,
  });

  return {
    reviews: (data?.data || []) as GoogleReview[],
    averageRating: data?.averageRating || 0,
    ratingDistribution: data?.ratingDistribution || { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
    isLoading,
    error: error?.message,
  };
}
