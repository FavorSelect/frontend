"use client";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { setContactInfo } from "@/store/slices/checkout/checkoutSlice";
import { RootState } from "@/store/store";
import { Input } from "@/components/atoms/Input";
import { useEffect } from "react";
import Paragraph from "@/components/atoms/Paragraph";
import Link from "next/link";

interface ContactFormValues {
  email: string;
  subscribe: boolean;
}

export default function ContactForm() {
  const dispatch = useDispatch();
  const contactInfo = useSelector(
    (state: RootState) => state.checkout.contactInfo
  );

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ContactFormValues>({
    defaultValues: contactInfo,
  });

  const onSubmit = (data: ContactFormValues) => {
    dispatch(setContactInfo(data));
  };

  // Set initial form values from the Redux store
  useEffect(() => {
    setValue("email", contactInfo.email);
    setValue("subscribe", contactInfo.subscribe);
  }, [contactInfo, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-gray-700 text-sm font-medium mb-2">
          Email
        </label>
        <Link href="/login" className="text-red-500 text-sm font-semibold">
          Already have an account? Log in
        </Link>
      </div>
      <Input
        type="email"
        {...register("email", { required: "Email is required" })}
        placeholder="Enter your email address"
        className="py-2 px-2 border border-gray-300 font-medium w-full"
      />
      {errors.email && (
        <Paragraph className="text-red-500 text-sm">
          {errors.email.message}
        </Paragraph>
      )}

      <div className="flex items-center">
        <input type="checkbox" {...register("subscribe")} className="mr-2" />
        <label className="text-sm text-gray-600">
          Email me with news and offers
        </label>
      </div>

      <button type="submit" className="hidden" />
    </form>
  );
}
