import { Star } from "lucide-react";
import React, { useState } from "react";

type StarRatingProps = {
  rating: number;
  onRatingChange: (rating: number) => void;
  allowZero?: boolean;
};

const ratingLabels = ["", "Poor", "Fair", "Good", "Very Good", "Excellent"];

const StarRating = ({
  rating,
  onRatingChange,
  allowZero = true,
}: StarRatingProps) => {
  const [hoverRating, setHoverRating] = useState(0);

  const handleClick = (star: number) => {
    const newRating = star === rating ? rating - 1 : star;
    onRatingChange(allowZero ? newRating : Math.max(newRating, 1));
  };

  return (
    <div className="flex flex-col items-start gap-2">
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => {
          const isFilled = hoverRating ? star <= hoverRating : star <= rating;

          return (
            <Star
              key={star}
              size={24}
              onClick={() => handleClick(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className={`cursor-pointer transition-all duration-150 ease-in-out ${
                isFilled ? "fill-yellow-500 text-yellow-500" : "text-gray-300"
              }`}
              aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") handleClick(star);
              }}
            />
          );
        })}
      </div>

      {/* Only show label if rating is set */}
      {rating > 0 && (
        <span className="text-sm font-medium text-gray-600">
          {ratingLabels[rating]}
        </span>
      )}
    </div>
  );
};

export default StarRating;
