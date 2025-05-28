import { Button } from "@/components/atoms/Button";
import { cn } from "@/utils/cn";
import React, { useState } from "react";

const Accordion = ({
  title,
  answer,
}: {
  title: string;
  answer: React.ReactNode;
}) => {
  const [accordionOpen, setAccordionOpen] = useState(false);

  return (
    <div className="border border-[#eeeeee] rounded-lg">
      <Button
        onClick={() => setAccordionOpen(!accordionOpen)}
        className="flex justify-between w-full transition-colors duration-150 ease-in-out hover:bg-[#eeeeee] px-2 py-3 rounded-t-md text-base"
      >
        <span
          className={cn(
            "font-semibold text-black",
            accordionOpen && "text-scarlet-red"
          )}
        >
          {title}
        </span>
        <svg
          className={cn(
            "fill-gray-500 shrink-0 ml-8",
            accordionOpen && "fill-scarlet-red"
          )}
          width="16"
          height="16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            y="7"
            width="16"
            height="2"
            rx="1"
            className={`transform origin-center transition duration-200 ease-out ${
              accordionOpen && "!rotate-180"
            }`}
          />
          <rect
            y="7"
            width="16"
            height="2"
            rx="1"
            className={`transform origin-center rotate-90 transition duration-200 ease-out ${
              accordionOpen && "!rotate-180"
            }`}
          />
        </svg>
      </Button>
      <div
        className={`grid overflow-hidden transition-all px-2 duration-300 ease-in-out text-slate-600 text-sm ${
          accordionOpen
            ? "grid-rows-[1fr] opacity-100 pb-2"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">{answer}</div>
      </div>
    </div>
  );
};

export default Accordion;
