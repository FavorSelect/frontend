import { ReactNode } from "react";
import { cn } from "@/utils/cn";

const Heading = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return <h2 className={cn("text-2xl", className)}>{children}</h2>;
};

export default Heading;
