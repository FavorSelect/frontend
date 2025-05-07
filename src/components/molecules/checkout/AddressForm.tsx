"use client";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { setShippingAddress } from "@/store/slices/checkout/checkoutSlice";
import { RootState } from "@/store/store";
import { Input } from "@/components/atoms/Input";
import Paragraph from "@/components/atoms/Paragraph";
import { useEffect } from "react";
import { Button } from "@/components/atoms/Button";
import Link from "next/link";

interface AddressFormValues {
  email: string;
  subscribe: boolean;
  firstName: string;
  lastName: string;
  address: string;
  apartment: string;
  city: string;
  state: string;
  postalCode: string;
  phone: string;
  saveInfo: boolean;
}

export default function AddressForm() {
  const dispatch = useDispatch();
  const shippingAddress = useSelector(
    (state: RootState) => state.checkout.shippingAddress
  );

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<AddressFormValues>({
    defaultValues: shippingAddress,
  });

  const onSubmit = (data: AddressFormValues) => {
    dispatch(setShippingAddress(data));
  };

  // Set initial form values from the Redux store
  useEffect(() => {
    Object.keys(shippingAddress).forEach((key) =>
      setValue(
        key as keyof AddressFormValues,
        shippingAddress[key as keyof AddressFormValues]
      )
    );
  }, [shippingAddress, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="w-full space-y-2">
        <div className="flex items-center justify-between">
          <label className="block text-gray-700 text-sm font-medium">
            Email
          </label>
          <Link href="/login" className="text-red-500 text-sm font-semibold">
            Already have an account? Log in
          </Link>
        </div>
        <div>
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
        </div>
        <div className="flex items-center">
          <input type="checkbox" {...register("subscribe")} className="mr-2" />
          <label className="text-sm text-gray-600">
            Email me with news and offers
          </label>
        </div>
      </div>
      <div className="flex gap-4">
        <div className="w-1/2">
          <Input
            type="text"
            {...register("firstName", { required: "First name is required" })}
            placeholder="First name"
            className="py-2 px-2 border border-gray-300 font-medium w-full"
          />
          {errors.firstName && (
            <Paragraph className="text-red-500 text-sm">
              {errors.firstName.message}
            </Paragraph>
          )}
        </div>
        <div className="w-1/2">
          <Input
            type="text"
            {...register("lastName", { required: "Last name is required" })}
            placeholder="Last name"
            className="py-2 px-2 border border-gray-300 font-medium w-full"
          />
          {errors.lastName && (
            <Paragraph className="text-red-500 text-sm">
              {errors.lastName.message}
            </Paragraph>
          )}
        </div>
      </div>

      <Input
        type="text"
        {...register("address", { required: "Address is required" })}
        placeholder="Address"
        className="py-2 px-2 border border-gray-300 font-medium w-full"
      />
      {errors.address && (
        <Paragraph className="text-red-500 text-sm">
          {errors.address.message}
        </Paragraph>
      )}

      <div className="flex gap-4">
        <Input
          type="text"
          {...register("apartment")}
          placeholder="Apartment, suite, etc. (optional)"
          className="py-2 px-2 border border-gray-300 font-medium w-full"
        />
        <Input
          type="text"
          {...register("city", { required: "City is required" })}
          placeholder="City"
          className="py-2 px-2 border border-gray-300 font-medium w-full"
        />
      </div>

      <div className="flex gap-4">
        <Input
          type="text"
          {...register("state", { required: "State is required" })}
          placeholder="State"
          className="py-2 px-2 border border-gray-300 font-medium w-1/3"
        />
        <Input
          type="text"
          {...register("postalCode", { required: "Postal code is required" })}
          placeholder="Postal code"
          className="py-2 px-2 border border-gray-300 font-medium w-1/3"
        />
        <Input
          type="text"
          {...register("phone", { required: "Phone is required" })}
          placeholder="Phone"
          className="py-2 px-2 border border-gray-300 font-medium w-1/3"
        />
      </div>

      <div className="flex items-center">
        <input type="checkbox" {...register("saveInfo")} className="mr-2" />
        <label className="text-sm text-gray-600">
          Save the information for the next time
        </label>
      </div>

      <Button
        type="submit"
        className=" bg-scarlet-red text-white px-3 py-2 rounded-md hover:bg-scarlet-red-600 transition duration-200 font-semibold"
      >
        Continue to shipping
      </Button>
    </form>
  );
}
