import LanguageSelector from "@/components/molecules/header/LanguageSelector";
import SocialLinks from "@/components/molecules/header/SocialLinks";
import { cn } from "@/utils/cn";
import React, { FC } from "react";

interface TopHeaderProps {
  className?: string;
  style?: React.CSSProperties;
}

const TopHeader: FC<TopHeaderProps> = ({ className, style }) => {
  return (
    <div
      className={cn("flex justify-between  font-montserrat", className)}
      style={style}
    >
      <SocialLinks />
      <LanguageSelector />
    </div>
  );
};

export default TopHeader;
