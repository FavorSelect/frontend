import React, { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/utils/cn";

interface LogoProps {
  className?: string;
  style?: React.CSSProperties;
}

const Logo: FC<LogoProps> = ({ className, style }) => {
  return (
    <div className={cn("flex items-center md:mr-4", className)} style={style}>
      <Link href="/" className="flex items-center">
        <Image
          src="/logo.svg"
          alt="logo"
          width={202}
          height={31}
          className="w-[150px] object-cover xl:w-auto"
        />
      </Link>
    </div>
  );
};

export default Logo;
