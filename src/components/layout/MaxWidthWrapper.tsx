import { ReactNode } from "react";
import { cn } from "@/utils/cn";

const MaxWidthWrapper = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return (
    <div
      className={cn(
        "w-full max-w-[1536px] mx-auto px-[14px] sm:px-[24px] new:text-amber-300",
        className
      )}
    >
      {children}
    </div>
  );
};

export default MaxWidthWrapper;
