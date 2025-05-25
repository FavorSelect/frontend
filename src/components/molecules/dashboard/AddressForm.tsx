import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/atoms/Input";
import { Button } from "@/components/atoms/Button";
import ErrorMessage from "../global/ErrorMessage";
import { SingleSelectField } from "../global/SingleSelectField";
import { useAddShippingAddressMutation } from "@/store/api/userDashboardApi";
import toast from "react-hot-toast";
import Spinner from "../global/Spinner";

export type AddressFormValues = {
  recipientName: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phoneNumber: string;
  isDefault: boolean;
};

const countries = [
  { value: "india", label: "India" },
  { value: "us", label: "United States" },
  { value: "uk", label: "United Kingdom" },
];

const cities = [
  { value: "mumbai", label: "Mumbai" },
  { value: "delhi", label: "Delhi" },
  { value: "bangalore", label: "Bangalore" },
];

const AddressForm = ({
  token,
  setIsOpen,
}: {
  token: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AddressFormValues>();

  const [addShippingAddress] = useAddShippingAddressMutation();

  console.log(token);

  const onSubmit = async (data: AddressFormValues) => {
    try {
      const response = await addShippingAddress({ data, token }).unwrap();

      console.log("Shipping Address Response:", response);
      toast.success(response.message || "Address added successfully!");
      setIsOpen(false);
    } catch (error) {
      console.error("Shipping Address Failed:", error);

      if (typeof error === "object" && error !== null && "data" in error) {
        const apiError = error as { data: { message?: string } };
        toast.error(apiError.data.message || "Something went wrong.");
      } else {
        toast.error("Failed to add address. Please try again.");
      }
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 px-5">
      <div className="space-y-1">
        <label className="inline-block font-semibold text-sm">
          Recipient Name
        </label>
        <Input
          type="text"
          {...register("recipientName", {
            required: "Recipient name is required",
          })}
          placeholder="Enter full name"
          className="w-full py-2 px-3 border border-gray-300 text-sm rounded-md font-medium"
        />
        <ErrorMessage error={errors.recipientName} />
      </div>

      <div className="space-y-1">
        <label className="inline-block font-semibold text-sm">
          Phone Number
        </label>
        <Input
          type="text"
          {...register("phoneNumber", { required: "Phone number is required" })}
          placeholder="Enter phone number"
          className="w-full py-2 px-3 border border-gray-300 text-sm rounded-md font-medium"
        />
        <ErrorMessage error={errors.phoneNumber} />
      </div>

      <div className="space-y-1">
        <label className="inline-block font-semibold text-sm">
          Street Address
        </label>
        <Input
          type="text"
          {...register("street", { required: "Street address is required" })}
          placeholder="123 Main Street"
          className="w-full py-2 px-3 border border-gray-300 text-sm rounded-md font-medium"
        />
        <ErrorMessage error={errors.street} />
      </div>

      <div className="space-y-1">
        <label className="inline-block font-semibold text-sm">City</label>
        <Controller
          name="city"
          control={control}
          rules={{ required: "City is required" }}
          render={({ field, fieldState, formState }) => (
            <>
              <SingleSelectField
                field={field}
                fieldState={fieldState}
                formState={formState}
                options={cities}
                placeholder="Select city"
              />
              <ErrorMessage error={fieldState.error} />
            </>
          )}
        />
      </div>

      <div className="space-y-1">
        <label className="inline-block font-semibold text-sm">State</label>
        <Input
          type="text"
          {...register("state", { required: "State is required" })}
          placeholder="Enter state"
          className="w-full py-2 px-3 border border-gray-300 text-sm rounded-md font-medium"
        />
        <ErrorMessage error={errors.state} />
      </div>

      <div className="space-y-1">
        <label className="inline-block font-semibold text-sm">
          Postal Code
        </label>
        <Input
          type="text"
          {...register("postalCode", { required: "Postal code is required" })}
          placeholder="400001"
          className="w-full py-2 px-3 border border-gray-300 text-sm rounded-md font-medium"
        />
        <ErrorMessage error={errors.postalCode} />
      </div>

      <div className="space-y-1">
        <label className="inline-block font-semibold text-sm">Country</label>
        <Controller
          name="country"
          control={control}
          rules={{ required: "Country is required" }}
          render={({ field, fieldState, formState }) => (
            <>
              <SingleSelectField
                field={field}
                fieldState={fieldState}
                formState={formState}
                options={countries}
                placeholder="Select country"
              />
              <ErrorMessage error={fieldState.error} />
            </>
          )}
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          {...register("isDefault")}
          id="isDefault"
          className="h-4 w-4"
        />
        <label htmlFor="isDefault" className="text-sm font-medium">
          Set as default address
        </label>
      </div>

      <div className="flex justify-end pt-2">
        <Button type="submit" disabled={isSubmitting} variant="authBtn">
          {isSubmitting ? (
            <>
              <Spinner /> Saving...
            </>
          ) : (
            "Save Address"
          )}
        </Button>
      </div>
    </form>
  );
};

export default AddressForm;
