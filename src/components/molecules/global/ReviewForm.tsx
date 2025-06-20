/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/atoms/Button";
import ErrorMessage from "../global/ErrorMessage";
import toast from "react-hot-toast";
import Spinner from "../global/Spinner";
import StarRating from "../global/StarRating";
import { Textarea } from "@/components/atoms/Textarea";
import { useRouter } from "next/navigation";
import { handleApiError } from "@/utils/handleApiError";
import Image from "next/image";
import { Input } from "@/components/atoms/Input";
import { X } from "lucide-react";
import { getFilenameFromUrl } from "@/utils/getFilenameFromUrl";
import Span from "@/components/atoms/Span";

type ReviewFormProps = {
  productId?: string | number;
  token?: string | undefined;
  addReviewMutation: any;
  editDefaultValues?: {
    rating?: number;
    reviewText?: string;
    reviewPhoto?: string;
  };
  isEdit?: boolean;
  reviewId?: string;
  setShowReviewForm?: React.Dispatch<React.SetStateAction<boolean>>;
};

type ReviewFormValues = {
  rating: number;
  reviewText?: string;
  reviewPhoto?: FileList;
};

const ReviewForm: React.FC<ReviewFormProps> = ({
  productId,
  token,
  addReviewMutation,
  editDefaultValues,
  isEdit,
  reviewId,
  setShowReviewForm,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    typeof editDefaultValues?.reviewPhoto === "string"
      ? editDefaultValues.reviewPhoto
      : null
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
    reset,
  } = useForm<ReviewFormValues>({
    defaultValues: {
      rating: editDefaultValues?.rating ?? 0,
      reviewText: editDefaultValues?.reviewText ?? "",
    },
  });

  const [addReview] = addReviewMutation;
  const router = useRouter();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && e.target.files) {
      setValue("reviewPhoto", e.target.files);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setValue("reviewPhoto", undefined);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const onSubmit: SubmitHandler<ReviewFormValues> = async (data) => {
    if (!data.rating || data.rating === 0) {
      toast.error("Please provide a rating.");
      return;
    }
    const formData = new FormData();
    if (!isEdit && productId) {
      formData.append("productId", productId.toString());
    }
    formData.append("rating", data.rating.toString());
    if (data.reviewText !== undefined) {
      formData.append("reviewText", data.reviewText);
    }
    if (data.reviewPhoto?.[0]) {
      formData.append("reviewPhoto", data.reviewPhoto[0]);
    }

    if (!token) {
      toast.error("You must be logged in to submit a review.");
      setTimeout(() => {
        router.push("/login");
      }, 1000);
      return;
    }

    try {
      let response;

      if (isEdit) {
        response = await addReview({ reviewId, formData }).unwrap();
        if (setShowReviewForm) {
          setShowReviewForm(false);
        }
      } else {
        response = await addReview({ formData }).unwrap();
      }

      toast.success(response.message || "Review submitted successfully!");
      reset();
      setPreviewUrl(null); // reset image preview
    } catch (error) {
      handleApiError(error, "Failed to submit review");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 flex flex-col justify-center h-full"
    >
      <div className="space-y-1">
        <label className="text-sm font-semibold inline-block">Rating</label>
        <StarRating
          rating={watch("rating")}
          onRatingChange={(value) => setValue("rating", value)}
        />
        <ErrorMessage error={errors.rating} />
      </div>

      <div className="space-y-1">
        <label className="text-sm font-semibold">Review</label>
        <Textarea
          {...register("reviewText")}
          placeholder="Write your review..."
          rows={4}
          className="w-full py-2 px-3 border border-gray-300 text-sm rounded-md font-medium focus:ring-1"
        />
        <ErrorMessage error={errors.reviewText} />
      </div>

      <div className="space-y-1 w-full">
        <Span className="text-sm font-semibold">
          {isEdit ? "Update review photo" : "Upload a file"}
        </Span>
        <label
          onClick={() => fileInputRef.current?.click()}
          className="w-full inline-block border border-dashed border-gray-400 py-2 px-3 mt-1 text-sm rounded-md font-medium bg-white cursor-pointer text-gray-700 hover:bg-gray-100 transition"
        >
          📎{" "}
          {watch("reviewPhoto")?.[0]?.name ||
            getFilenameFromUrl(previewUrl || "") ||
            "Choose a file"}
        </label>
        <Input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
        <ErrorMessage error={errors.reviewPhoto} />

        {/* Preview */}
        {previewUrl && (
          <div className="relative mt-2 w-full max-w-xs">
            <Image
              src={previewUrl}
              alt="Preview"
              width={150}
              height={100}
              className="w-full h-32 object-cover rounded-md border border-pale-rose"
            />
            <Button
              type="button"
              onClick={removeImage}
              className="absolute top-1 right-1 bg-white text-black border border-gray-300 rounded-full p-1 text-xs hover:bg-red-500 hover:text-white transition"
            >
              <X size={18} />
            </Button>
          </div>
        )}
      </div>

      <div className="flex justify-end">
        <Button type="submit" variant="authBtn" disabled={isSubmitting}>
          {isSubmitting && <Spinner />}
          {isSubmitting
            ? isEdit
              ? "Updating..."
              : "Adding..."
            : isEdit
            ? "Update Review"
            : "Add Review"}
        </Button>
      </div>
    </form>
  );
};

export default ReviewForm;
