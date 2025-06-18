import { useAddReviewMutation } from "@/store/api/addReviewApi";
import React from "react";
import { useForm } from "react-hook-form";
import ErrorMessage from "../global/ErrorMessage";
import { Button } from "@/components/atoms/Button";
import Spinner from "../global/Spinner";
import { toast } from "react-hot-toast";
import StarRating from "../global/StarRating";
import { Textarea } from "@/components/atoms/Textarea";

export interface ReviewFormData {
  rating: number;
  reviewText: string;
  reviewPhoto: FileList;
}

const AddProductReviewForm: React.FC<{ productId: number; token: string }> = ({
  productId,
  token,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ReviewFormData>();

  const [addReview, { isLoading }] = useAddReviewMutation();

  const onSubmit = async (data: ReviewFormData) => {
    const formData = new FormData();

    // Append the data to FormData
    formData.append("productId", productId.toString());
    formData.append("rating", data.rating.toString());
    formData.append("reviewText", data.reviewText);

    if (data.reviewPhoto.length > 0) {
      formData.append("reviewPhoto", data.reviewPhoto[0]);
    }

    if (!token) return;

    try {
      const response = await addReview({ formData }).unwrap();
      toast.success(response.message || "Review added successfully!");
      console.log("Review Response:", response);
      reset();
    } catch (err) {
      console.error("Failed to submit review:", err);
      toast.error("Failed to submit review.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">
          Rating
        </label>
        <StarRating
          rating={watch("rating")}
          onRatingChange={(value) => setValue("rating", value)}
        />
        <ErrorMessage error={errors.rating} />
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">
          Review Text
        </label>
        <Textarea
          {...register("reviewText", { required: "Review text is required" })}
          className="w-full py-2 px-3 border border-gray-300 text-sm rounded-md font-medium focus:ring-1"
          placeholder="Write your review here"
        />
        <ErrorMessage error={errors.reviewText} />
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">
          Review Photo
        </label>
        <input
          type="file"
          {...register("reviewPhoto", {
            required: "Review photo is required",
          })}
          className="w-full py-2 px-3 border border-gray-300 text-sm rounded-md font-medium"
        />
        <ErrorMessage error={errors.reviewPhoto} />
      </div>

      <Button
        type="submit"
        disabled={isSubmitting || isLoading}
        variant="authBtn"
        className="w-full"
      >
        {isSubmitting || isLoading ? (
          <>
            <Spinner /> Submitting...
          </>
        ) : (
          "Submit Review"
        )}
      </Button>
    </form>
  );
};

export default AddProductReviewForm;
