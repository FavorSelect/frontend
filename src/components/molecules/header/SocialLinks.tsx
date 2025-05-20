import React from "react";
import Span from "@/components/atoms/Span";
import Link from "next/link";
import { Facebook, Instagram, X, Youtube } from "@/assets/icon";

const SocialLinks = () => {
  return (
    <div className="flex gap-x-2.5 items-center">
      <Span className="font-semibold text-sm text-eerie-black">Follow Us:</Span>
      <ul className="flex gap-x-2 md:gap-x-2.5 items-center">
        <li>
          <Link href="#">
            <Instagram className="w-3.5 h-3.5 md:w-4 xl:h-4 text-gray-700" />
          </Link>
        </li>
        <li>
          <Link href="#">
            <Youtube className="w-3.5 h-3.5 md:w-4 xl:h-4 text-gray-700" />
          </Link>
        </li>
        <li>
          <Link href="#">
            <Facebook className="w-3.5 h-3.5 md:w-4 xl:h-4 text-gray-700" />
          </Link>
        </li>
        <li>
          <Link href="#">
            <X className="w-3.5 h-3.5 md:w-4 xl:h-4 text-gray-700" />
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SocialLinks;
