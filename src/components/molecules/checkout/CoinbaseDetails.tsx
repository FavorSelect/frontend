"use client";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { setCoinbaseDetails } from "@/store/slices/checkout/checkoutSlice";
import { RootState } from "@/store/store";
import { Input } from "@/components/atoms/Input";
import Paragraph from "@/components/atoms/Paragraph";
import { useEffect } from "react";
import { Button } from "@/components/atoms/Button";

interface CoinbaseDetailsFormValues {
  walletAddress: string;
}

export default function CoinbaseDetails() {
  const dispatch = useDispatch();
  const coinbaseDetails = useSelector(
    (state: RootState) => state.checkout.coinbaseDetails
  );

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CoinbaseDetailsFormValues>({
    defaultValues: coinbaseDetails,
  });

  const onSubmit = (data: CoinbaseDetailsFormValues) => {
    dispatch(setCoinbaseDetails(data));
  };

  useEffect(() => {
    setValue("walletAddress", coinbaseDetails.walletAddress);
  }, [coinbaseDetails, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        type="text"
        {...register("walletAddress", {
          required: "Wallet address is required",
        })}
        placeholder="Coinbase wallet address"
        className="py-2 px-2 border border-gray-300 font-medium w-full"
      />
      {errors.walletAddress && (
        <Paragraph className="text-red-500 text-sm">
          {errors.walletAddress.message}
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
