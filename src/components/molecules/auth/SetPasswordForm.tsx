/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import Paragraph from "@/components/atoms/Paragraph";
import { setPassword } from "@/store/slices/auth/setPasswordSlice";
import toast from "react-hot-toast";
import ErrorMessage from "../global/ErrorMessage";

type FormValues = {
  password: string;
  confirmPassword: string;
};

export default function SetPasswordForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<FormValues>();
  const dispatch = useDispatch();

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  const onSubmit = (data: FormValues) => {
    dispatch(
      setPassword({
        password: data.password,
        confirmPassword: data.confirmPassword,
      })
    );

    console.log("Set Password Form Data Submitted:", data);

    // Show success toast
    toast.success("Password set successfully!");
  };

  const isSubmitDisabled =
    !password || !confirmPassword || password !== confirmPassword || !isValid;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-1">
        <Input
          type="password"
          {...register("password", { required: "Password is required" })}
          placeholder="Enter new password"
          className="w-full py-2 px-3 border border-gray-300 text-sm rounded-md font-medium"
        />
        <ErrorMessage error={errors.password} />
      </div>

      <div className="space-y-1">
        <Input
          type="password"
          {...register("confirmPassword", {
            required: "Please confirm your password",
            validate: (value) =>
              value === watch("password") || "Passwords do not match",
          })}
          placeholder="Confirm new password"
          className="w-full py-2 px-3 border border-gray-300 text-sm rounded-md font-medium"
        />
        <ErrorMessage error={errors.confirmPassword} />
      </div>

      <Button type="submit" variant="authBtn">
        Set Password
      </Button>
    </form>
  );
}
