import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import ErrorMessage from "../global/ErrorMessage";
import { Input } from "@/components/atoms/Input";
import { Button } from "@/components/atoms/Button";
import { SingleSelectField } from "../global/SingleSelectField";
import {
  useGetPersonalInformationQuery,
  useUpdatePersonalInformationMutation,
} from "@/store/api/userDashboardApi";
import SkeletonPersonalForm from "./SkeletonPersonalInformationForm";
import toast from "react-hot-toast";
import Spinner from "../global/Spinner";

export type PersonalFormValues = {
  id: number;
  firstName: string;
  lastName: string;
  phone: number;
  email: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
};
const country = [
  { value: "us", label: "United States" },
  { value: "ca", label: "Canada" },
  { value: "gb", label: "United Kingdom" },
  { value: "au", label: "Australia" },
  { value: "de", label: "Germany" },
  { value: "jp", label: "Japan" },
  { value: "tr", label: "Turkey" },
];

const PersonalInformation = () => {
  const { data, isLoading, refetch } = useGetPersonalInformationQuery();
  const [updatePersonalInformation] = useUpdatePersonalInformationMutation();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<PersonalFormValues>();

  useEffect(() => {
    if (data?.user) {
      reset({
        firstName: data.user.firstName || "",
        lastName: data.user.lastName || "",
        phone: data.user.phone,
        email: data.user.email || "",
        city: data.user.city || "",
        state: data.user.state || "",
        zipCode: data.user.zipCode || "",
        country: data.user.country || "",
      });
    }
  }, [data, reset]);

  const onSubmit = async (formData: PersonalFormValues) => {
    const userId = data?.user?.id;
    if (!userId) {
      toast.error("User ID not found.");
      return;
    }
    try {
      const response = await updatePersonalInformation({
        data: formData,
        id: userId,
      }).unwrap();
      toast.success(response?.message || "Profile updated successfully.");
      refetch();
    } catch (err) {
      if (err instanceof Error) {
        toast.error(
          err.message || "Failed to update profile. Please try again."
        );
      }
    }
  };

  if (isLoading) {
    return <SkeletonPersonalForm />;
  }

  return (
    <div>
      <h2 className="text-xl font-bold text-scarlet-red mb-6">
        Personal Information
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset
          disabled={isSubmitting}
          className={`space-y-4 ${
            isSubmitting ? "opacity-70 pointer-events-none" : ""
          }`}
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="space-y-1 flex-1">
              <label
                htmlFor="firstName"
                className="inline-block font-semibold text-sm"
              >
                First Name
              </label>
              <Input
                type="text"
                id="firstName"
                {...register("firstName", {
                  required: "First name is required",
                })}
                placeholder="Enter your first name"
                className="py-2 px-2 border border-gray-300 font-medium"
              />
              <ErrorMessage error={errors.firstName} />
            </div>

            <div className="space-y-1 flex-1">
              <label
                htmlFor="lastName"
                className="inline-block font-semibold text-sm"
              >
                Last Name
              </label>
              <Input
                type="text"
                id="lastName"
                {...register("lastName", { required: "Last name is required" })}
                placeholder="Enter your last name"
                className="py-2 px-2 border border-gray-300 font-medium"
              />
              <ErrorMessage error={errors.lastName} />
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="space-y-1 flex-1">
              <label
                htmlFor="phoneNumber"
                className="inline-block font-semibold text-sm"
              >
                Phone Number
              </label>
              <Input
                type="number"
                id="phoneNumber"
                {...register("phone", {
                  required: "Phone number is required",
                })}
                placeholder="Enter your phone number"
                className="py-2 px-2 border border-gray-300 font-medium"
              />
              <ErrorMessage error={errors.phone} />
            </div>

            <div className="space-y-1 flex-1">
              <label
                htmlFor="email"
                className="inline-block font-semibold text-sm"
              >
                Email
              </label>
              <Input
                type="text"
                id="email"
                {...register("email")}
                placeholder="Enter your email address"
                className="py-2 px-2 border border-gray-300 font-medium cursor-not-allowed"
                disabled={true}
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="space-y-1 flex-1">
              <label
                htmlFor="city"
                className="inline-block font-semibold text-sm"
              >
                City
              </label>
              <Input
                type="text"
                id="state"
                {...register("city")}
                placeholder="Enter your state"
                className="py-2 px-2 border border-gray-300 font-medium"
              />
              <ErrorMessage error={errors.city} />
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="space-y-1 flex-1">
              <label
                htmlFor="state"
                className="inline-block font-semibold text-sm"
              >
                State
              </label>
              <Input
                type="text"
                id="state"
                {...register("state", {
                  required: "State is required",
                })}
                placeholder="Enter your zip code"
                className="py-2 px-2 border border-gray-300 font-medium"
              />
              <ErrorMessage error={errors.state} />
            </div>
            <div className="space-y-1 flex-1">
              <label
                htmlFor="zipCode"
                className="inline-block font-semibold text-sm"
              >
                Zip Code
              </label>
              <Input
                type="number"
                id="zipCode"
                {...register("zipCode", {
                  required: "Zip code is required",
                })}
                placeholder="Enter your zip code"
                className="py-2 px-2 border border-gray-300 font-medium"
              />
              <ErrorMessage error={errors.zipCode} />
            </div>
          </div>
          <div className="flex flex-col space-y-1">
            <label className="inline-block font-semibold text-sm">
              Select Country
            </label>
            <Controller
              name="country"
              control={control}
              rules={{ required: "Country is required" }}
              render={({ field, fieldState, formState }) => {
                return (
                  <>
                    <SingleSelectField
                      field={field}
                      fieldState={fieldState}
                      formState={formState}
                      options={country}
                      placeholder="Select the country"
                    />
                    <ErrorMessage error={fieldState.error} />
                  </>
                );
              }}
            />
          </div>
          <div className="flex justify-end">
            <Button
              disabled={isSubmitting}
              type="submit"
              className="bg-scarlet-red text-white mt-3 px-4 py-2 rounded-md hover:bg-scarlet-red-600 transition duration-200 font-semibold text-sm flex items-center gap-2"
            >
              {isSubmitting && <Spinner />}
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default PersonalInformation;
