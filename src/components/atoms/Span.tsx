import { cn } from "@/utils/cn";
import { ReactNode } from "react";

const Span = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return <span className={cn(className)}>{children}</span>;
};

export default Span;
