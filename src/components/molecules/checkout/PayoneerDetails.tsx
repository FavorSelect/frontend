import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { setPayoneerDetails } from "@/store/slices/checkout/checkoutSlice";
import { RootState } from "@/store/store";
import { Input } from "@/components/atoms/Input";
import Paragraph from "@/components/atoms/Paragraph";
import { useEffect } from "react";
import { Button } from "@/components/atoms/Button";

interface PayoneerDetailsFormValues {
  accountEmail: string;
  accountID: string;
}

export default function PayoneerDetails() {
  const dispatch = useDispatch();
  const payoneerDetails = useSelector(
    (state: RootState) => state.checkout.payoneerDetails
  );

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<PayoneerDetailsFormValues>({
    defaultValues: payoneerDetails,
  });

  const onSubmit = (data: PayoneerDetailsFormValues) => {
    dispatch(setPayoneerDetails(data));
  };

  useEffect(() => {
    Object.keys(payoneerDetails).forEach((key) =>
      setValue(
        key as keyof PayoneerDetailsFormValues,
        payoneerDetails[key as keyof PayoneerDetailsFormValues]
      )
    );
  }, [payoneerDetails, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        type="email"
        {...register("accountEmail", { required: "Account email is required" })}
        placeholder="Payoneer account email"
        className="py-2 px-2 border border-gray-300 font-medium w-full"
      />
      {errors.accountEmail && (
        <Paragraph className="text-red-500 text-sm">
          {errors.accountEmail.message}
        </Paragraph>
      )}

      <Input
        type="text"
        {...register("accountID", { required: "Account ID is required" })}
        placeholder="Payoneer account ID"
        className="py-2 px-2 border border-gray-300 font-medium w-full"
      />
      {errors.accountID && (
        <Paragraph className="text-red-500 text-sm">
          {errors.accountID.message}
        </Paragraph>
      )}

      <Button
        type="submit"
        className="bg-red-500 text-white py-2 px-4 rounded-md w-full font-semibold hover:bg-red-600 transition duration-200"
      >
        Pay Now
      </Button>
    </form>
  );
}
