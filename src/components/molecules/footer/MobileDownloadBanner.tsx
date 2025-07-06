"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const MobileDownloadBanner: React.FC = () => {
  return (
    <div className="w-full">
      <p className="text-white text-sm md:text-base font-medium mb-3">
        More deals & promos in the FavorSelect app
      </p>
      <div className="flex flex-wrap gap-2">
        <Link href="#" aria-label="Download on App Store">
          <Image
            src="/AppStore.svg"
            alt="Download on the App Store"
            width={130}
            height={40}
          />
        </Link>
        <Link href="#" aria-label="Get it on Google Play">
          <Image
            src="/GooglePlay.svg"
            alt="Get it on Google Play"
            width={130}
            height={40}
          />
        </Link>
      </div>
    </div>
  );
};

export default MobileDownloadBanner;
