import { useGoogleReviews } from "@/hooks/useGoogleReviews";
import { useLanguage } from "@/contexts/LanguageContext";
import { Star, Loader } from "lucide-react";
import { Card } from "@/components/ui/card";

export function GoogleReviewsSection() {
  const { t } = useLanguage();
  const { reviews, averageRating, ratingDistribution, isLoading } = useGoogleReviews(10);

  if (isLoading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container flex justify-center items-center min-h-96">
          <Loader className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      </section>
    );
  }

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {t("testimonials_title")}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t("testimonials_subtitle")}
          </p>
        </div>

        {/* Rating Summary */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Average Rating */}
            <div className="flex flex-col items-center justify-center">
              <div className="text-6xl font-bold text-blue-600 mb-2">
                {averageRating.toFixed(1)}
              </div>
              <div className="mb-2">{renderStars(Math.round(averageRating))}</div>
              <p className="text-gray-600">
                {reviews.length} {t("reviews_count")}
              </p>
            </div>

            {/* Rating Distribution */}
            <div className="space-y-3">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center gap-3">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${
                          star <= rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-yellow-400 h-2 rounded-full"
                      style={{
                        width: `${
                          reviews.length > 0
                            ? (ratingDistribution[rating] / reviews.length) * 100
                            : 0
                        }%`,
                      }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 w-12">
                    {ratingDistribution[rating]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.slice(0, 6).map((review) => (
            <Card key={review.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="mb-4">{renderStars(review.rating)}</div>

              <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                {review.comment}
              </p>

              <div className="flex items-center gap-3">
                {review.authorPhotoUrl && (
                  <img
                    src={review.authorPhotoUrl}
                    alt={review.authorName}
                    className="w-10 h-10 rounded-full"
                  />
                )}
                <div>
                  <p className="font-semibold text-gray-900 text-sm">
                    {review.authorName}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {review.replyComment && (
                <div className="mt-4 p-3 bg-blue-50 rounded border-l-4 border-blue-600">
                  <p className="text-xs font-semibold text-blue-900 mb-1">
                    {t("business_reply")}
                  </p>
                  <p className="text-xs text-blue-800">{review.replyComment}</p>
                </div>
              )}
            </Card>
          ))}
        </div>

        {reviews.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">
              {t("no_reviews_yet")}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
