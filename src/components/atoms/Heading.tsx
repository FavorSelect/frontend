import { ReactNode } from "react";
import { cn } from "@/utils/cn";

const Heading = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return (
    <h2
      className={cn(
        "text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold !leading-snug",
        className
      )}
    >
      {children}
    </h2>
  );
};

export default Heading;
