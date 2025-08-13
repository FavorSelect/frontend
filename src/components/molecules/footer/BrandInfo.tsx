import React, { FC } from "react";
import Paragraph from "@/components/atoms/Paragraph";
import { cn } from "@/utils/cn";
import Subtitle from "@/components/atoms/Subtitles";

interface BrandInfoProps {
  className?: string;
  style?: React.CSSProperties;
  isTitle?: boolean;
}

const BrandInfo: FC<BrandInfoProps> = ({
  className,
  style,
  isTitle = true,
}) => {
  return (
    <div className={cn("font-montserrat space-y-4", className)} style={style}>
      {isTitle && <Subtitle title="Support" />}
      <div className="text-sm sm:text-base space-y-2 text-[#6B7280] font-normal">
        <Paragraph className="hover:text-scarlet-red transition-colors duration-150 ease-in-out cursor-pointer">
          Address
        </Paragraph>
        <Paragraph className="hover:text-scarlet-red transition-colors duration-150 ease-in-out cursor-pointer">
          Dellas, United States
        </Paragraph>
        <Paragraph className="hover:text-scarlet-red transition-colors duration-150 ease-in-out cursor-pointer">
          <a href="mailto:support@favorselect.com">support@favorselect.com</a>
        </Paragraph>
        <Paragraph className="hover:text-scarlet-red transition-colors duration-150 ease-in-out cursor-pointer">
          <a href="tel:+1888889999">+1-88888-9999</a>
        </Paragraph>
      </div>
    </div>
  );
};

export default BrandInfo;
