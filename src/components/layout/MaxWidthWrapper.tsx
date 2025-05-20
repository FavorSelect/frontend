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
        "w-full mx-auto lg:max-w-screen-xl lg:mx-auto px-[17px] sm:px-[24px]",
        className
      )}
    >
      {children}
    </div>
  );
};

export default MaxWidthWrapper;
