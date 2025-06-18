import React from "react";
import { Star, ThumbsUp } from "lucide-react";
import Image from "next/image";
import Paragraph from "@/components/atoms/Paragraph";
import { Button } from "@/components/atoms/Button";

type ReviewCardProps = {
  review: {
    id: number;
    reviewText: string;
    reviewPhoto?: string;
    rating: number;
    reviewDate: string;
    reviewLike: number;
    likeCount: number;
    user?: {
      firstName: string;
      lastName: string;
    };
  };
};

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  const { reviewText, rating, reviewPhoto, reviewDate, reviewLike, likeCount } =
    review;

  return (
    <div className="border-b border-gray-200 pb-6 mb-6">
      <div className="space-y-3">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="font-semibold text-gray-800 flex gap-x-2 items-center">
            Omar Pervez
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3.5 w-3.5 ${
                    i < rating
                      ? "fill-yellow-500 text-yellow-500"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
          <div className="text-sm text-gray-500">
            {new Date(reviewDate).toLocaleDateString()}
          </div>
        </div>

        {/* Optional Image */}
        {reviewPhoto && (
          <div className="flex gap-2 mb-2">
            <Image
              src={reviewPhoto}
              width={70}
              height={70}
              alt={`Review photo`}
              className="w-20 h-20 object-cover rounded-md border"
            />
          </div>
        )}

        {/* Comment & Likes */}
        <div className="flex justify-between items-center">
          <Paragraph className="text-gray-700 text-sm">{reviewText}</Paragraph>
          <div className="pt-2 text-sm text-gray-500">
            <Button className="flex items-center gap-1 hover:text-scarlet-red">
              <ThumbsUp className="w-4 h-4" />
              <span>
                ({likeCount}) {reviewLike}
              </span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
