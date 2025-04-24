import React, { FC } from "react";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import { cn } from "@/utils/cn";

interface MainHeaderSearchBarProps {
  className?: string;
  style?: React.CSSProperties;
}

const MainHeaderSearchBar: FC<MainHeaderSearchBarProps> = ({
  className,
  style,
}) => {
  return (
    <div
      className={cn(
        "flex items-center w-full max-w-lg bg-[#fff1f1] font-roboto rounded-xl border border-[#F5282814]",
        className
      )}
      style={style}
    >
      <Input
        placeholder="What are you looking for?"
        className="bg-transparent placeholder:text-red-300 text-sm flex-1 outline-none border-none h-12 font-normal placeholder:[letter-spacing:0.05em]"
      />
      <Button className="bg-scarlet-red text-white text-sm font-semibold w-24 rounded-xl cursor-pointer h-12">
        Search
      </Button>
    </div>
  );
};

export default MainHeaderSearchBar;
