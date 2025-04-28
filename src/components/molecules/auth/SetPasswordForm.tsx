"use client";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import Paragraph from "@/components/atoms/Paragraph";
import { setPassword } from "@/store/slices/setPasswordSlice";
import toast from "react-hot-toast";

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
          placeholder="Confirm new password"
          className="py-2 px-2 border border-gray-300 font-medium"
        />
        {errors.confirmPassword && (
          <Paragraph className="text-red-500 text-sm">
            {errors.confirmPassword.message}
          </Paragraph>
        )}
      </div>

      <Button
        type="submit"
        disabled={isSubmitDisabled}
        className={`w-full max-w-full py-2 rounded-md transition duration-200 font-semibold ${
          isSubmitDisabled
            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
            : "bg-scarlet-red text-white hover:bg-scarlet-red-600"
        }`}
      >
        Set Password
      </Button>
    </form>
  );
}
