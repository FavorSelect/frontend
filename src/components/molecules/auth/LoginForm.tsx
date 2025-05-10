"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import ErrorMessage from "../global/ErrorMessage";
import { useLoginMutation } from "@/store/api/authApi";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type FormValues = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  const [login] = useLoginMutation();
  const router = useRouter();

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await login(data).unwrap();
      toast.success(response.message || "Login successful!");

      // Redirect to dashboard or home page
      router.push("/");
    } catch (error: unknown) {
      console.error("Login failed:", error);

      if (typeof error === "object" && error !== null && "data" in error) {
        const apiError = error as { data: { message?: string } };
        toast.error(apiError.data.message || "Invalid email or password");
      } else {
        toast.error("Failed to login. Please try again.");
      }
    }
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
          placeholder="Enter your email"
          className="py-2 px-2 border border-gray-300 font-medium"
        />
        <ErrorMessage error={errors.email} />
      </div>

      <div className="space-y-1">
        <Input
          type="password"
          {...register("password", { required: "Password is required" })}
          placeholder="Enter your password"
          className="py-2 px-2 border border-gray-300 font-medium"
        />
        <ErrorMessage error={errors.password} />
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full max-w-full bg-scarlet-red text-white py-2 rounded-md hover:bg-scarlet-red-600 transition duration-200 font-semibold"
      >
        {isSubmitting ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
}
