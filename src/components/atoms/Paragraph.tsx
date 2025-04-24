import { ReactNode } from "react";
import { cn } from "@/utils/cn";

const Paragraph = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return <p className={cn("", className)}>{children}</p>;
};

export default Paragraph;
