import React, { useState } from "react";
import { Edit, Star, ThumbsUp, Trash } from "lucide-react";
import Image from "next/image";
import Paragraph from "@/components/atoms/Paragraph";
import { Button } from "@/components/atoms/Button";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import {
  useDeleteReviewMutation,
  useLikeReviewToggleMutation,
  useUpdateReviewMutation,
} from "@/store/api/productDetailsApi";
import Spinner from "../global/Spinner";
import { RootState } from "@/store/store";
import { useAppSelector } from "@/store/hook";
import { format } from "date-fns";
import ReviewForm from "../global/ReviewForm";
import { handleApiError } from "@/utils/handleApiError";

type ReviewCardProps = {
  review: {
    id: number;
    reviewText: string;
    reviewPhoto?: string;
    rating: number;
    reviewDate: string;
    reviewLike: number;
    likeCount: number;
    user: {
      firstName: string;
      lastName: string;
      id: number;
    };
  };
  token: string | undefined;
};

const ProductReviewCard: React.FC<ReviewCardProps> = ({ review, token }) => {
  const { reviewText, rating, reviewPhoto, reviewDate, reviewLike, user } =
    review;
  const router = useRouter();
  const [likeReviewToggle, { isLoading, isSuccess, isError }] =
    useLikeReviewToggleMutation();
  const [updateReview] = useUpdateReviewMutation();
  const [deleteReview, { isLoading: isDeleting }] = useDeleteReviewMutation();
  const userId = useAppSelector(
    (state: RootState) => state.user.userInfo?.userId
  );
  const [reviewForm, setShowReviewForm] = useState(false);

  const isEditReview = userId !== undefined && userId === user.id;

  const handleLikeToggle = async () => {
    if (!token) {
      toast.error("You must be logged in to like a review.");
      setTimeout(() => {
        router.push("/login");
      }, 1000);
      return;
    }
    try {
      const res = await likeReviewToggle(review.id.toString()).unwrap();
      toast.success(res?.message || "Review like toggled!");
    } catch (err) {
      handleApiError(err, "An error occured while toggling like");
    }
  };

  const handleDeleteReview = async () => {
    if (!token) {
      toast.error("You must be logged in to delete a review.");
      setTimeout(() => {
        router.push("/login");
      }, 1000);
      return;
    }

    try {
      const res = await deleteReview(review.id.toString()).unwrap();
      toast.success(res?.message || "Review deleted");
    } catch (err) {
      handleApiError(err, "An error occured while deleting review");
    }
  };

  return (
    <div className="border-b border-gray-200 pb-6 mb-6">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="font-semibold text-gray-800 flex gap-x-2 items-center">
            <span className="text-lg">
              {user.firstName} {user.lastName}
            </span>
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 transition-transform ${
                    i < rating
                      ? "fill-yellow-500 text-yellow-500 transform scale-110"
                      : "text-gray-300"
                  }`}
                />
              ))}
              <span className="ml-2 text-sm text-gray-500">{rating}/5</span>
            </div>
          </div>
          <div className="text-sm text-gray-500">
            {format(new Date(reviewDate), "MMMM dd, yyyy")}
          </div>
        </div>

        {/* Optional Image */}
        {reviewPhoto && (
          <div className="flex gap-2 mb-2">
            <div className="relative group">
              <Image
                src={reviewPhoto}
                width={100}
                height={100}
                alt={`Review photo`}
                className="w-27 h-27 object-cover rounded-md border border-gray-300 transition-transform transform group-hover:scale-105"
              />
              <span className="absolute bottom-0 w-full p-1 text-center text-scarlet-red bg-[#fff1f1] opacity-80 text-xs px-1 rounded">
                Review Photo
              </span>
            </div>
          </div>
        )}
        {/* Comment & Likes */}
        <div className="flex justify-between items-start">
          <Paragraph className="text-gray-700 text-sm">{reviewText}</Paragraph>
          <div className="pt-2 text-sm text-gray-500">
            <Button
              className="flex items-center gap-1"
              onClick={handleLikeToggle}
              disabled={isLoading}
            >
              {isLoading ? (
                <Spinner className="text-scarlet-red" />
              ) : isSuccess ? (
                <ThumbsUp className="w-4 h-4 text-scarlet-red animate-pulse" />
              ) : isError ? (
                <ThumbsUp className="w-4 h-4 text-gray-500" />
              ) : (
                <ThumbsUp className="w-4 h-4 text-gray-500" />
              )}
              <span className="ml-1">({reviewLike})</span>
            </Button>
          </div>
        </div>

        {/* Edit Review Button */}
        {isEditReview && (
          <div className="flex gap-x-2">
            <Button
              onClick={() => setShowReviewForm(!reviewForm)}
              className="mt-1 flex items-center gap-1 bg-scarlet-red text-white px-2 py-2
           rounded hover:bg-red-700 transition-colors duration-200 text-xs font-semibold"
            >
              <Edit size={18} />
              Edit Review
            </Button>
            <Button
              onClick={handleDeleteReview}
              disabled={isDeleting}
              className="mt-1 flex items-center gap-1 bg-scarlet-red text-white px-2 py-2
           rounded hover:bg-red-700 transition-colors duration-200 text-xs font-semibold"
            >
              {isDeleting ? (
                <Spinner className="w-4 h-4" />
              ) : (
                <Trash size={18} />
              )}
              Delete Review
            </Button>
          </div>
        )}

        {reviewForm && (
          <ReviewForm
            reviewId={review.id.toString()}
            token={token}
            addReviewMutation={[updateReview]}
            editDefaultValues={{
              rating: review.rating,
              reviewText: review.reviewText,
              reviewPhoto: review.reviewPhoto,
            }}
            isEdit={true}
            setShowReviewForm={setShowReviewForm}
          />
        )}
      </div>
    </div>
  );
};

export default ProductReviewCard;
