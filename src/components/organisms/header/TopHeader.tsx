import LanguageSelector from "@/components/molecules/header/LanguageSelector";
import SocialLinks from "@/components/molecules/header/SocialLinks";
import { cn } from "@/utils/cn";
import React, { FC } from "react";

interface TopHeaderProps {
  className?: string;
  style?: React.CSSProperties;
  scrollDirection: string | null;
}

const TopHeader: FC<TopHeaderProps> = ({
  className,
  style,
  scrollDirection,
}) => {
  return (
    <div
      className={cn(
        "flex justify-between  font-montserrat transform transition-transform duration-300",
        scrollDirection === "down"
          ? " -translate-y-full xs:translate-y-0"
          : "translate-y-0",
        className
      )}
      style={style}
    >
      <SocialLinks />
      <LanguageSelector />
    </div>
  );
};

export default TopHeader;
