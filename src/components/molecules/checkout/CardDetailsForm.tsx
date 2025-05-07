import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { setCardDetails } from "@/store/slices/checkout/checkoutSlice";
import { RootState } from "@/store/store";
import { Input } from "@/components/atoms/Input";
import Paragraph from "@/components/atoms/Paragraph";
import { useEffect } from "react";
import { Button } from "@/components/atoms/Button";
import Image from "next/image";

interface CardDetailsFormValues {
  cardName: string;
  cardNumber: string;
  expiryDate: string;
  cvc: string;
  saveCard: boolean;
}

const paymentIconFilenames = ["visa", "mastercard", "paypal", "unionpay"];

export default function CardDetailsForm() {
  const dispatch = useDispatch();
  const cardDetails = useSelector(
    (state: RootState) => state.checkout.cardDetails
  );

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CardDetailsFormValues>({
    defaultValues: cardDetails,
  });

  const onSubmit = (data: CardDetailsFormValues) => {
    dispatch(setCardDetails(data));
  };

  useEffect(() => {
    Object.keys(cardDetails).forEach((key) =>
      setValue(
        key as keyof CardDetailsFormValues,
        cardDetails[key as keyof CardDetailsFormValues]
      )
    );
  }, [cardDetails, setValue]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 bg-[#f4f4f4] rounded-lg py-5 px-4 border border-[#f4f4f4]"
    >
      {/* Payment Icons */}
      <div className="mb-4">
        <div className="flex flex-wrap gap-4">
          {paymentIconFilenames.map((file) => (
            <Image
              key={file}
              src={`/${file}.svg`}
              alt={file}
              width={36}
              height={24}
              className="transition-opacity hover:opacity-80"
            />
          ))}
        </div>
      </div>

      {/* Card Holder Name */}
      <div>
        <label className="block text-gray-700 font-medium mb-1">
          Card Holder Name
        </label>
        <Input
          type="text"
          {...register("cardName", {
            required: "Card holder name is required",
          })}
          className="py-2 px-2 border border-gray-300 font-medium w-full bg-white"
        />
        {errors.cardName && (
          <Paragraph className="text-red-500 text-sm">
            {errors.cardName.message}
          </Paragraph>
        )}
      </div>

      {/* Card Number */}
      <div>
        <label className="block text-gray-700 font-medium mb-1">
          Card Number
        </label>
        <Input
          type="text"
          {...register("cardNumber", { required: "Card number is required" })}
          className="py-2 px-2 border border-gray-300 font-medium w-full bg-white"
        />
        {errors.cardNumber && (
          <Paragraph className="text-red-500 text-sm">
            {errors.cardNumber.message}
          </Paragraph>
        )}
      </div>

      {/* Expiry Date and CVC */}
      <div className="flex gap-4">
        <div className="w-1/2">
          <label className="block text-gray-700 font-medium mb-1">
            Expiry Date (MM/YY)
          </label>
          <Input
            type="text"
            {...register("expiryDate", { required: "Expiry date is required" })}
            className="py-2 px-2 border border-gray-300 font-medium w-full bg-white"
          />
          {errors.expiryDate && (
            <Paragraph className="text-red-500 text-sm">
              {errors.expiryDate.message}
            </Paragraph>
          )}
        </div>

        <div className="w-1/2">
          <label className="block text-gray-700 font-medium mb-1">CVC</label>
          <Input
            type="text"
            {...register("cvc", { required: "CVC is required" })}
            className="py-2 px-2 border border-gray-300 font-medium w-full bg-white"
          />
          {errors.cvc && (
            <Paragraph className="text-red-500 text-sm">
              {errors.cvc.message}
            </Paragraph>
          )}
        </div>
      </div>

      {/* Save Card Checkbox */}
      <div className="flex items-center">
        <input type="checkbox" {...register("saveCard")} className="mr-2" />
        <label className="text-sm text-gray-600">
          Save card details for future use
        </label>
      </div>

      {/* Pay Now Button */}
      <Button
        type="submit"
        className="bg-red-500 text-white py-2 px-4 rounded-md w-full font-semibold hover:bg-red-600 transition duration-200"
      >
        Pay Now
      </Button>
    </form>
  );
}
