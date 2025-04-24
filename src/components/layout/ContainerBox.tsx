import { cn } from "@/utils/cn";
import { ReactNode } from "react";

const ContainerBox = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return <div className={cn("", className)}>{children}</div>;
};
export default ContainerBox;
