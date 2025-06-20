import { Star } from "lucide-react";
import React from "react";

type StarRating = 1 | 2 | 3 | 4 | 5;

type RatingDistributionProps = {
  averageRating: number;
  totalReviews: number;
  ratings?: Record<StarRating, number>;
};

const RatingDistribution: React.FC<RatingDistributionProps> = ({
  averageRating,
  totalReviews,
  ratings,
}) => {
  const defaultRatings: Record<StarRating, number> = {
    5: 100,
    4: 0,
    3: 0,
    2: 0,
    1: 0,
  };

  const ratingData = ratings ?? defaultRatings;

  return (
    <div className="space-y-4 text-gray-800">
      {/* Average Rating & Stars */}
      <div className="flex items-center gap-4">
        <div className="text-4xl font-bold">{averageRating.toFixed(1)}</div>
        <div>
          <div className="flex items-center text-blue-600">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3.5 w-3.5 ${
                  i < averageRating
                    ? "fill-yellow-500 text-yellow-500"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <p className="text-sm text-gray-500">{totalReviews} reviews</p>
        </div>
      </div>

      {/* Rating Distribution Bars */}
      <div className="space-y-1">
        {([5, 4, 3, 2, 1] as StarRating[]).map((star) => (
          <div key={star} className="flex items-center text-sm text-gray-600">
            <span className="w-6">{star}</span>
            <div className="flex-1 bg-gray-200 rounded h-2.5 mx-2">
              <div
                className="bg-scarlet-red h-2.5 rounded"
                style={{ width: `${ratingData[star]}%` }}
              />
            </div>
            <span>{ratingData[star]}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RatingDistribution;
