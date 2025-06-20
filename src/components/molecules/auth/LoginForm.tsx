"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import ErrorMessage from "../global/ErrorMessage";
import { useLoginMutation } from "@/store/api/authApi";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/slices/user/userSlice";
import Spinner from "../global/Spinner";

type FormValues = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const dispatch = useDispatch();
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
      console.log(response);
      const is2FA = response.isTwoFactorAuthEnable;
      console.log(is2FA);
      // 2fa user
      if (is2FA) {
        toast.success(response.message, {
          duration: 4000,
        });
        router.push(`/login/verify-otp`);
        return;
      }
      console.log(response);
      // Normal user
      dispatch(
        setUser({
          name: response.user.firstName,
          email: response.user.email,
          profileImage: response.user.profilePhoto,
          userId: response.user.id,
        })
      );
      toast.success(response.message || "Login successful!");

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
          className="w-full py-2 px-3 border border-gray-300 text-sm rounded-md font-medium"
        />
        <ErrorMessage error={errors.email} />
      </div>
      <div className="space-y-1">
        <Input
          type="password"
          {...register("password", { required: "Password is required" })}
          placeholder="Enter your password"
          className="w-full py-2 px-3 border border-gray-300 text-sm rounded-md font-medium"
        />
        <ErrorMessage error={errors.password} />
      </div>
      <div className="flex justify-end">
        <Link
          href="/password-reset"
          className="text-sm text-blue-600 hover:underline"
        >
          Forgot Password?
        </Link>
      </div>
      <Button type="submit" disabled={isSubmitting} variant="authBtn">
        {isSubmitting ? (
          <>
            <Spinner /> Logging in...
          </>
        ) : (
          "Login"
        )}
      </Button>
    </form>
  );
}
