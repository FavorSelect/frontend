"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/utils/cn";

interface DualRangeSliderProps
  extends Omit<
    React.ComponentProps<typeof SliderPrimitive.Root>,
    "onValueChange"
  > {
  labelPosition?: "top" | "bottom";
  label?: (value: number | undefined) => React.ReactNode;
  value?: [number, number];
  onValueChange?: (value: [number, number]) => void;
}

const DualRangeSlider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  DualRangeSliderProps
>(
  (
    {
      className,
      label,
      labelPosition = "top",
      value = [0, 100],
      onValueChange,
      ...props
    },
    ref
  ) => {
    const handleValueChange = (newValue: number[]) => {
      if (onValueChange) {
        onValueChange([newValue[0], newValue[1]] as [number, number]);
      }
    };

    return (
      <SliderPrimitive.Root
        ref={ref}
        className={cn(
          "relative flex w-full touch-none select-none items-center",
          className
        )}
        value={value}
        onValueChange={handleValueChange}
        {...props}
      >
        <SliderPrimitive.Track className="relative h-3 w-full grow overflow-hidden rounded-full bg-scarlet-red">
          <SliderPrimitive.Range className="absolute h-full bg-blue-gradient dark:bg-darkPrimaryBg" />
        </SliderPrimitive.Track>
        {value.map((val, index) => (
          <React.Fragment key={index}>
            <SliderPrimitive.Thumb className="relative block h-6 w-6 rounded-full bg-white shadow-md transition-colors focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:pointer-events-none disabled:opacity-50 cursor-pointer border border-blue-500">
              {label && (
                <span
                  className={cn(
                    "absolute flex w-full justify-center",
                    labelPosition === "top" && "-top-11",
                    labelPosition === "bottom" && "top-4"
                  )}
                >
                  {label(val)}
                </span>
              )}
            </SliderPrimitive.Thumb>
          </React.Fragment>
        ))}
      </SliderPrimitive.Root>
    );
  }
);
DualRangeSlider.displayName = "DualRangeSlider";

export { DualRangeSlider };
