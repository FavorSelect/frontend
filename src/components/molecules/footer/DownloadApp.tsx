import Paragraph from "@/components/atoms/Paragraph";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import { cn } from "@/utils/cn";
import Subtitle from "@/components/atoms/Subtitles";
import { Facebook, Instagram, X, Youtube } from "@/assets/icon";

interface DownloadAppProps {
  className?: string;
  style?: React.CSSProperties;
}

const DownloadApp: FC<DownloadAppProps> = ({ className, style }) => {
  return (
    <div
      className={cn("bg-[#9393931A] space-y-4 rounded-lg", className)}
      style={style}
    >
      <Subtitle title="Download App" />
      <div className="space-y-2">
        <Paragraph className="text-base text-[#C2C2C2] font-normal">
          Scan to download our app
        </Paragraph>
        <div className="flex gap-x-2 items-center">
          <Image src="/Qr Code.png" alt="QR Code" width={80} height={80} />
          <div className="space-y-1">
            <Link href="#">
              <Image
                src="/GooglePlay.svg"
                alt="Google Play"
                width={110}
                height={40}
                className="h-auto"
              />
            </Link>
            <Link href="#">
              <Image
                src="/AppStore.svg"
                alt="App Store"
                width={110}
                height={40}
              />
            </Link>
          </div>
        </div>
      </div>
      <ul className="flex gap-x-4 items-center text-white justify-center py-2">
        <li>
          <Link href="#">
            <X />
          </Link>
        </li>
        <li>
          <Link href="#">
            <Instagram />
          </Link>
        </li>
        <li>
          <Link href="#">
            <Youtube />
          </Link>
        </li>
        <li>
          <Link href="#">
            <Facebook />
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default DownloadApp;
