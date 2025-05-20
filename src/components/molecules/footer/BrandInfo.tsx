import React, { FC } from "react";
import Paragraph from "@/components/atoms/Paragraph";
import { cn } from "@/utils/cn";
import Subtitle from "@/components/atoms/Subtitles";

interface BrandInfoProps {
  className?: string;
  style?: React.CSSProperties;
}

const BrandInfo: FC<BrandInfoProps> = ({ className, style }) => {
  return (
    <div className={cn("font-montserrat space-y-4", className)} style={style}>
      <Subtitle title="Support" />
      <div className="text-sm sm:text-base space-y-2 text-[#C2C2C2] font-normal">
        <Paragraph>Address</Paragraph>
        <Paragraph>Dellas, United States</Paragraph>
        <Paragraph>support@favorselect.com</Paragraph>
        <Paragraph>+1-88888-9999</Paragraph>
      </div>
    </div>
  );
};

export default BrandInfo;
