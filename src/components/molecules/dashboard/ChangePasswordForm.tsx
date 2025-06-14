import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/atoms/Input";
import { Button } from "@/components/atoms/Button";
import { useChangePasswordMutation } from "@/store/api/userDashboardApi";
import toast from "react-hot-toast";
import ErrorMessage from "../global/ErrorMessage";

type PasswordFormValues = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

const ChangePasswordForm = ({ token }: { token: string }) => {
  const [changePassword] = useChangePasswordMutation();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm<PasswordFormValues>();

  const onSubmit = async (data: PasswordFormValues) => {
    try {
      const response = await changePassword({
        data: {
          currentPassword: data.currentPassword,
          newPassword: data.newPassword,
        },
        token,
      }).unwrap();

      toast.success(response.message || "Password changed successfully.");
      reset();
    } catch (err) {
      if (err instanceof Error) {
        toast.error(
          err?.message || "Failed to change password. Please try again."
        );
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
      <div>
        <label className="text-sm font-medium">Current Password</label>
        <Input
          type="password"
          {...register("currentPassword", {
            required: "Current password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
          className="w-full py-2 px-3 border border-gray-300 text-sm rounded-md font-medium mt-1"
        />
        <ErrorMessage error={errors.currentPassword} />
      </div>

      <div>
        <label className="text-sm font-medium">New Password</label>
        <Input
          type="password"
          {...register("newPassword", {
            required: "New password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
          className="w-full py-2 px-3 border border-gray-300 text-sm rounded-md font-medium mt-1"
        />
        <ErrorMessage error={errors.newPassword} />
      </div>

      <div>
        <label className="text-sm font-medium">Confirm New Password</label>
        <Input
          type="password"
          {...register("confirmPassword", {
            required: "Please confirm your new password",
            validate: (value) =>
              value === watch("newPassword") || "Passwords do not match",
          })}
          className="w-full py-2 px-3 border border-gray-300 text-sm rounded-md font-medium mt-1"
        />
        <ErrorMessage error={errors.confirmPassword} />
      </div>

      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-scarlet-red text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-scarlet-red-600"
        >
          {isSubmitting ? "Saving..." : "Save Password"}
        </Button>
      </div>
    </form>
  );
};

export default ChangePasswordForm;
