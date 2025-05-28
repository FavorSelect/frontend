/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/atoms/Input";
import { Button } from "@/components/atoms/Button";
import ErrorMessage from "../global/ErrorMessage";
import toast from "react-hot-toast";
import Spinner from "../global/Spinner";
import Image from "next/image";
import { useRaiseSupportTicketMutation } from "@/store/api/userDashboardApi";
import { Textarea } from "@/components/atoms/Textarea";

export type RaiseTicketFormValues = {
  subject: string;
  description: string;
  image: FileList;
};

const RaiseTicketForm = ({ token }: { token: string }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RaiseTicketFormValues>();

  const [raiseSupportTicket] = useRaiseSupportTicketMutation();

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const onSubmit = async (data: RaiseTicketFormValues) => {
    const formData = new FormData();
    formData.append("subject", data.subject);
    formData.append("description", data.description);

    const singleFile = data.image?.[0];
    if (singleFile) {
      formData.append("image", singleFile);
    }

    try {
      const response = await raiseSupportTicket({
        formData,
        token,
      }).unwrap();
      console.log(response);
      toast.success(response.message || "Ticket raised successfully!");
      reset();
      setImagePreview(null);
    } catch (error: any) {
      console.error("Raise ticket error:", error);
      toast.error(
        error?.data?.message || "An error occurred while submitting the ticket."
      );
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const subject = watch("subject");

    if (subject?.toLowerCase().includes("billing")) {
      toast.error("Image upload is not allowed for billing-related tickets.");
      e.target.value = "";
      setImagePreview(null);
      return;
    }

    //check file size (e.g. 2MB max)
    if (file && file.size > 2 * 1024 * 1024) {
      toast.error("Image must be smaller than 2MB.");
      e.target.value = "";
      setImagePreview(null);
      return;
    }

    if (file) {
      const previewURL = URL.createObjectURL(file);
      setImagePreview(previewURL);
    } else {
      setImagePreview(null);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-1">
        <label className="text-sm font-semibold">Subject</label>
        <Input
          type="text"
          {...register("subject", { required: "Subject is required" })}
          placeholder="Enter ticket subject"
          className="w-full py-2 px-3 border border-gray-300 text-sm rounded-md font-medium mt-1"
        />
        <ErrorMessage error={errors.subject} />
      </div>

      <div className="space-y-1">
        <label className="text-sm font-semibold">Description</label>
        <Textarea
          {...register("description", { required: "Description is required" })}
          placeholder="Describe your issue"
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm mt-1"
          rows={4}
        />
        <ErrorMessage error={errors.description} />
      </div>

      <div className="space-y-1">
        <label className="text-sm font-semibold">Upload Image (optional)</label>
        <input
          type="file"
          accept="image/*"
          {...register("image")}
          onChange={handleFileChange}
          className="text-sm"
        />
        {imagePreview && (
          <div className="mt-2">
            <Image
              src={imagePreview}
              alt="preview"
              className="h-20 w-20 object-cover rounded"
              width={100}
              height={100}
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
            "Raise Ticket"
          )}
        </Button>
      </div>
    </form>
  );
};

export default RaiseTicketForm;
