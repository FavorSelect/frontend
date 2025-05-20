import { cn } from "@/utils/cn";
import { ReactNode } from "react";

const ContainerBox = ({
  className,
  children,
  hasBackground = false,
}: {
  className?: string;
  children: ReactNode;
  hasBackground?: boolean;
}) => {
  return (
    <div
      className={cn(
        "py-4 px-4 xl:py-8 xl:px-5",
        className,
        hasBackground && "bg-white rounded-lg shadow-sm font-montserrat"
      )}
    >
      {children}
    </div>
  );
};
export default ContainerBox;
