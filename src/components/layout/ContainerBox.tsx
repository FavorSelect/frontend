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
        "p-0 sm:py-4 sm:px-4 xl:py-8 xl:px-5",
        className,
        hasBackground &&
          "bg-transparent sm:bg-white sm:rounded-lg shadow-none sm:shadow-sm font-montserrat"
      )}
    >
      {children}
    </div>
  );
};
export default ContainerBox;
