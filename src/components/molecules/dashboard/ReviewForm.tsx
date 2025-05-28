/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/atoms/Button";
import ErrorMessage from "../global/ErrorMessage";
import toast from "react-hot-toast";
import Spinner from "../global/Spinner";
import Image from "next/image";
import { Textarea } from "@/components/atoms/Textarea";
import { useAddReviewMutation } from "@/store/api/userDashboardApi";
import StarRating from "../global/StarRating";

type AddReviewFormValues = {
  rating: number;
  reviewText: string;
  reviewPhoto: FileList;
};

const AddReviewForm = ({
  productId,
  token,
}: {
  productId: string;
  token: string;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
    reset,
  } = useForm<AddReviewFormValues>();

  const [addReview] = useAddReviewMutation();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const onSubmit = async (data: AddReviewFormValues) => {
    const formData = new FormData();
    formData.append("productId", productId.toString());
    formData.append("rating", data.rating.toString());
    formData.append("reviewText", data.reviewText);

    const file = data.reviewPhoto?.[0];
    if (file) formData.append("reviewPhoto", file);

    try {
      const response = await addReview({ formData, token }).unwrap();

      console.log(response);
      toast.success(response.message || "Review submitted successfully!");
      reset();
      setImagePreview(null);
    } catch (error: any) {
      console.error("Review submission error:", error);
      toast.error(
        error?.data?.message || "An error occurred while submitting the review."
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 flex flex-col justify-center h-full"
    >
      <div className="bg-[#fff1f1] border border-scarlet-red rounded-lg p-3 shadow-sm">
        <h2 className="text-lg font-bold text-scarlet-red">Write a Review</h2>
        <p className="text-sm text-gray-600 mt-1">
          Share your thoughts about this product. Your feedback helps others and
          keeps us improving!
        </p>
      </div>
      <div className="space-y-1">
        <div className="space-y-1">
          <label className="text-sm font-semibold inline-block">Rating</label>
          <StarRating
            rating={watch("rating")}
            onRatingChange={(value) => setValue("rating", value)}
          />
          <ErrorMessage error={errors.rating} />
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-sm font-semibold">Review</label>
        <Textarea
          {...register("reviewText", { required: "Review is required" })}
          placeholder="Write your review..."
          rows={4}
          className="w-full py-2 px-3 border border-gray-300 text-sm rounded-md font-medium mt-1"
        />
        <ErrorMessage error={errors.reviewText} />
      </div>

      <div className="space-y-1">
        <label className="text-sm font-semibold">
          Upload Photo (optional){" "}
        </label>
        <input
          type="file"
          accept="image/*"
          {...register("reviewPhoto")}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              const preview = URL.createObjectURL(file);
              setImagePreview(preview);
            } else {
              setImagePreview(null);
            }
          }}
        />
        {imagePreview && (
          <div className="mt-2">
            <Image
              src={imagePreview}
              alt="preview"
              width={100}
              height={100}
              className="rounded object-cover"
            />
          </div>
        )}
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting} variant="authBtn">
          {isSubmitting ? (
            <>
              <Spinner /> Submitting...
            </>
          ) : (
            "Submit Review"
          )}
        </Button>
      </div>
    </form>
  );
};

export default AddReviewForm;
