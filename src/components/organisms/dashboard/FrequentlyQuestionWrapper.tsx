"use client";
import React from "react";
import Paragraph from "@/components/atoms/Paragraph";
import Accordion from "@/components/molecules/global/Accordion";
import Link from "next/link";
import { usePathname } from "next/navigation";

const FrequentlyQuestionWrapper = () => {
  const pathname = usePathname();

  return (
    <div className="relative h-full">
      <h2 className="text-xl font-bold text-scarlet-red mb-6">
        Need help and Questions
      </h2>
      <div className="flex flex-col gap-1 items-center mb-6">
        <h2 className="text-xl font-semibold">Popular Questions</h2>
        <Paragraph className="text-slate-600 text-base">
          Find quick answers to the most asked questions from FavorSelect
          customers
        </Paragraph>
      </div>
      <div className="space-y-3">
        <Accordion
          title="How do I track my order?"
          answer="You can track your order through your FavorSelect account dashboard under `My Orders`. A tracking link will be available once your order ships. "
        />
        <Accordion
          title="What is the return policy?"
          answer="We offer a 30-day return policy on all items. Simply go to `My Orders` and select the item you wish to return. "
        />
        <Accordion
          title="How can I contact support?"
          answer={
            <>
              You can reach our support team via the Need help? link in your
              account menu, by emailing support@favorselect.com, or by{" "}
              <Link
                href={`${pathname}/raise-ticket`}
                className="font-semibold text-scarlet-red"
              >
                raising a support ticket.
              </Link>
            </>
          }
        />
        <Accordion
          title="When will my order arrive?"
          answer="You can check your order from the My Orders page. We usually deliver products in week. When your order is out for delivery, you will receive SMS from the cargo company. After your order shipped you can track shipping from the Account->My Orders menu. "
        />
      </div>
    </div>
  );
};

export default FrequentlyQuestionWrapper;
