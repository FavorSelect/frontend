/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useResetPasswordMutation } from "@/store/api/authApi";
import toast from "react-hot-toast";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import ErrorMessage from "../global/ErrorMessage";

type FormValues = {
  password: string;
  confirmPassword: string;
};

type SetPasswordFormProps = {
  resetToken: string;
};

export default function SetPasswordForm({ resetToken }: SetPasswordFormProps) {
  const router = useRouter();
  const [resetPassword] = useResetPasswordMutation();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    if (!resetToken) {
      toast.error("Reset token is missing.");
      return;
    }

    try {
      await resetPassword({ resetToken, password: data.password }).unwrap();
      toast.success("Password reset successful!");
      router.push("/login");
    } catch (err: any) {
      toast.error(err?.data?.message || "Password reset failed.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Input
          type="password"
          {...register("password", { required: "Password is required" })}
          placeholder="New Password"
          className="w-full py-2 px-3 border border-gray-300 text-sm rounded-md font-medium"
        />
        <ErrorMessage error={errors.password} />
      </div>

      <div>
        <Input
          type="password"
          {...register("confirmPassword", {
            required: "Please confirm your password",
            validate: (value) =>
              value === watch("password") || "Passwords do not match",
          })}
          placeholder="Confirm Password"
          className="w-full py-2 px-3 border border-gray-300 text-sm rounded-md font-medium"
        />
        <ErrorMessage error={errors.confirmPassword} />
      </div>

      <Button type="submit" variant="authBtn" disabled={isSubmitting}>
        {isSubmitting ? "Updating..." : "Set Password"}
      </Button>
    </form>
  );
}
