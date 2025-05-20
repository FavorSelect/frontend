"use client";

import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setResetPasswordData } from "@/store/slices/auth/resetPasswordSlice"; // updated slice import
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import Paragraph from "@/components/atoms/Paragraph";

type FormValues = {
  email: string;
};

export default function ResetPasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const dispatch = useDispatch();

  const onSubmit = (data: FormValues) => {
    dispatch(
      setResetPasswordData({
        email: data.email,
      })
    );

    // Handle reset password request here
    console.log("Reset Password Email Submitted:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-1">
        <Input
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Invalid email address",
            },
          })}
          placeholder="Enter your email address"
          className="w-full py-2 px-3 border border-gray-300 text-sm rounded-md font-medium"
        />
        {errors.email && (
          <Paragraph className="text-red-500 text-sm">
            {errors.email.message}
          </Paragraph>
        )}
      </div>

      <Button type="submit" variant="authBtn">
        Submit
      </Button>
    </form>
  );
}
