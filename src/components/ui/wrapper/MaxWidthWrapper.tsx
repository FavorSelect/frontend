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
        "w-full py-0 px-[14px] sm:px-[24px] max-w-screen-4xl mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
};
export default MaxWidthWrapper;
