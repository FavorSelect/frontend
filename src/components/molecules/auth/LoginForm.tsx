"use client";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setLoginData } from "@/store/slices/loginSlice";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import Paragraph from "@/components/atoms/Paragraph";

type FormValues = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const dispatch = useDispatch();

  const onSubmit = (data: FormValues) => {
    dispatch(
      setLoginData({
        email: data.email,
        password: data.password,
      })
    );

    // Here you can handle the form submission, e.g., send data to an API
    console.log("Login Form Data Submitted:", data);
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
          placeholder="Enter your password"
          className="py-2 px-2 border border-gray-300 font-medium"
        />
        {errors.password && (
          <Paragraph className="text-red-500 text-sm">
            {errors.password.message}
          </Paragraph>
        )}
      </div>

      <Button
        type="submit"
        className="w-full max-w-full bg-scarlet-red text-white py-2 rounded-md hover:bg-scarlet-red-600 transition duration-200 font-semibold"
      >
        Login
      </Button>
    </form>
  );
}
