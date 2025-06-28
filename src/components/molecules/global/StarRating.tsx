import { Star } from "lucide-react";
import React from "react";

type StarRatingProps = {
  rating: number;
  onRatingChange: (rating: number) => void;
};

const StarRating = ({ rating, onRatingChange }: StarRatingProps) => {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={24}
          onClick={() => onRatingChange(star)}
          className={`cursor-pointer hover:fill-yellow-500 hover:text-yellow-500 transition-all duration-150 ease-in-out ${
            star <= rating ? "fill-yellow-500 text-yellow-500" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
};

export default StarRating;
