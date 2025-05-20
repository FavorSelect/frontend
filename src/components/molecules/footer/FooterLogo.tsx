import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import { cn } from "@/utils/cn";

interface FooterLogoProps {
  className?: string;
  style?: React.CSSProperties;
}

const FooterLogo: FC<FooterLogoProps> = ({ className, style }) => {
  return (
    <div className={cn("text-white", className)} style={style}>
      <Link href="/" className="flex md:justify-center">
        <Image
          src="/footer-logo.svg"
          alt="logo"
          width={198}
          height={118}
          className="w-[150px] object-cover xl:w-auto"
        />
      </Link>
    </div>
  );
};

export default FooterLogo;
