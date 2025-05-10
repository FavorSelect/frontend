"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setSignupData } from "@/store/slices/auth/signupSlice";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import Paragraph from "@/components/atoms/Paragraph";
import axios from "axios";
import { useRouter } from "next/navigation";


type FormValues = {
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
    formState: { errors },
  } = useForm<FormValues>();
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);
  const router = useRouter();

  const onSubmit = async(data: FormValues) => {
    dispatch(
      setSignupData({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
      })
    );

    try {
      const response = await axios.post("http://localhost:8000/api/auth/signup", {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
      });

      console.log("Signup successful:", response.data);

    
      router.push("/otp"); 
    } catch (error: any) {
      console.error("Signup failed:", error.response?.data || error.message);
    }
  };

  

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div
          className="space-y-1
        "
        >
          <Input
            type="text"
            {...register("firstName", { required: "First name is required" })}
            placeholder="First name"
            className="py-2 px-2 border border-gray-300 font-medium"
          />
          {errors.firstName && (
            <Paragraph className="text-red-500 text-sm">
              {errors.firstName.message}
            </Paragraph>
          )}
        </div>

        <div className="space-y-1">
          <Input
            type="text"
            {...register("lastName", { required: "Last name is required" })}
            placeholder="Last name"
            className="py-2 px-2 border border-gray-300 font-medium"
          />
          {errors.lastName && (
            <Paragraph className="text-red-500 text-sm">
              {errors.lastName.message}
            </Paragraph>
          )}
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
          className="py-2 px-2 border border-gray-300 font-medium"
        />
        {errors.email && (
          <Paragraph className="text-red-500 text-sm">
            {errors.email.message}
          </Paragraph>
        )}
      </div>
      <div className="space-y-1">
        <Input
          type="password"
          {...register("password", { required: "Password is required" })}
          placeholder="Enter a password"
          className="py-2 px-2 border border-gray-300 font-medium"
        />
        {errors.password && (
          <Paragraph className="text-red-500 text-sm">
            {errors.password.message}
          </Paragraph>
        )}
      </div>
      <div className="space-y-1">
        <Input
          type="password"
          {...register("confirmPassword", {
            required: "Please confirm your password",
            validate: (value) =>
              value === watch("password") || "Passwords do not match",
          })}
          placeholder="Re-enter password"
          className="py-2 px-2 border border-gray-300 font-medium"
        />
        {errors.confirmPassword && (
          <Paragraph className="text-red-500 text-sm">
            {errors.confirmPassword.message}
          </Paragraph>
        )}
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

        <p className="text-sm text-gray-600">
          By creating an account, you agree to our
          <a href="#" className="text-gray-800 underline">
            {" "}
            Terms of use{" "}
          </a>
          and
          <a href="#" className="text-gray-800 underline">
            {" "}
            Privacy Policy
          </a>
          .
        </p>
      </div>

      <Button
        type="submit"
        className="w-full bg-scarlet-red text-white py-2 rounded-md hover:bg-scarlet-red-600 transition duration-200 font-semibold"
      >
        Create Account
      </Button>
    </form>
  );
}
