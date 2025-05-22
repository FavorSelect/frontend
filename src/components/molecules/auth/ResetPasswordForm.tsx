"use client";
import { useForm } from "react-hook-form";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import Paragraph from "@/components/atoms/Paragraph";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useFindMyAccountMutation } from "@/store/api/authApi";

type FormValues = {
  email: string;
};

export default function ResetPasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  const router = useRouter();
  const [findMyAccount] = useFindMyAccountMutation();

  const onSubmit = async (data: FormValues) => {
    try {
      toast.loading("Checking account...");
      const res = await findMyAccount({ email: data.email }).unwrap();
      console.log(res);

      toast.dismiss();
      toast.success(res.message || "Check your email for a reset link.");

      localStorage.setItem("resetEmail", data.email);
      setTimeout(() => {
        localStorage.removeItem("resetEmail");
      }, 3 * 60 * 1000);

      router.push(
        `/password-reset/check-your-email/${encodeURIComponent(data.email)}`
      );
    } catch (error: unknown) {
      toast.dismiss();
      console.error("Reset request failed:", error);

      if (typeof error === "object" && error !== null && "data" in error) {
        const apiError = error as { data: { message?: string } };
        toast.error(
          apiError.data.message || "Account not found or server error"
        );
      } else {
        toast.error("Something went wrong. Please try again.");
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
          placeholder="Enter your email address"
          className="w-full py-2 px-3 border border-gray-300 text-sm rounded-md font-medium"
        />
        {errors.email && (
          <Paragraph className="text-red-500 text-sm">
            {errors.email.message}
          </Paragraph>
        )}
      </div>

      <Button type="submit" disabled={isSubmitting} variant="authBtn">
        {isSubmitting ? "Submitting..." : "Submit"}
      </Button>
    </form>
  );
}
