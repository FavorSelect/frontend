"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import { useRouter } from "next/navigation";
import ErrorMessage from "../global/ErrorMessage";
import toast from "react-hot-toast";
import Link from "next/link";
import { useSignupMutation } from "@/store/api/authApi";

export type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();
  const [checked, setChecked] = useState(false);
  const router = useRouter();
  const [signup] = useSignupMutation();

  // form submitting
  const onSubmit = async (data: FormValues) => {
    try {
      const response = await signup(data).unwrap();
      toast.success(response.message || "Account created successfully!");
      router.push("/signup/otp-verification");
    } catch (error: unknown) {
      console.error("Signup failed:", error);
      if (typeof error === "object" && error !== null && "data" in error) {
        const apiError = error as { data: { message?: string } };
        toast.error(
          apiError.data.message || "Failed to create account. Please try again."
        );
      } else {
        toast.error("Failed to create account. Please try again.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="space-y-1">
          <Input
            type="text"
            {...register("firstName", { required: "First name is required" })}
            placeholder="First name"
            className="w-full py-2 px-3 border border-gray-300 text-sm rounded-md font-medium"
          />
          <ErrorMessage error={errors.firstName} />
        </div>

        <div className="space-y-1">
          <Input
            type="text"
            {...register("lastName", { required: "Last name is required" })}
            placeholder="Last name"
            className="w-full py-2 px-3 border border-gray-300 text-sm rounded-md font-medium"
          />
          <ErrorMessage error={errors.lastName} />
        </div>
      </div>

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
        <ErrorMessage error={errors.email} />
      </div>

      <div className="space-y-1">
        <Input
          type="password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 10,
              message: "Must be at least 10 characters",
            },
          })}
          placeholder="Enter a password"
          className="w-full py-2 px-3 border border-gray-300 text-sm rounded-md font-medium"
        />
        <ErrorMessage error={errors.password} />
      </div>

      <div className="space-y-1">
        <Input
          type="password"
          {...register("confirmPassword", {
            required: "Please confirm your password",
            minLength: {
              value: 10,
              message: "Must be at least 10 characters",
            },
            validate: (value) =>
              value === watch("password") || "Passwords do not match",
          })}
          placeholder="Re-enter password"
          className="w-full py-2 px-3 border border-gray-300 text-sm rounded-md font-medium"
        />
        <ErrorMessage error={errors.confirmPassword} />
      </div>

      <div className="flex items-start mb-6">
        <label className="flex items-start cursor-pointer">
          <input
            type="checkbox"
            checked={checked}
            onChange={() => setChecked(!checked)}
            className="hidden"
          />
          <span
            className={`w-4 h-4 flex items-center justify-center border rounded mt-1 mr-2
            ${checked ? "bg-red-500 border-red-500" : "border-gray-400"}
            transition-all duration-200`}
          >
            {checked && (
              <svg
                className="w-3.5 h-3.5 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                viewBox="0 0 24 24"
              >
                <path d="M5 13l4 4L19 7" />
              </svg>
            )}
          </span>
        </label>

        <p className="text-xs lg:text-sm text-gray-600 leading-snug">
          By creating an account, you agree to our
          <Link href="#" className="text-gray-800 underline">
            {" "}
            Terms of use{" "}
          </Link>
          and
          <Link href="#" className="text-gray-800 underline">
            {" "}
            Privacy Policy
          </Link>
          .
        </p>
      </div>

      <Button disabled={isSubmitting} type="submit" variant="authBtn">
        {isSubmitting ? "Creating Account..." : "Create Account"}
      </Button>
    </form>
  );
}
