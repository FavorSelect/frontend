import React from "react";
import Link from "next/link";
import { Facebook, Instagram, X, Youtube, Linkedin } from "@/assets/icon";

const SocialLinks = () => {
  return (
    <div className="flex gap-x-2.5 items-center">
      <span className="font-semibold text-sm text-eerie-black">Follow Us:</span>
      <ul className="flex gap-x-2 md:gap-x-2.5 items-center">
        <li>
          <Link
            href="https://instagram.com/FavorSelect"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Instagram className="w-3.5 h-3.5 md:w-4 xl:h-4 text-gray-700" />
          </Link>
        </li>
        <li>
          <Link
            href="https://youtube.com/@FavorSelect"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Youtube className="w-3.5 h-3.5 md:w-4 xl:h-4 text-gray-700" />
          </Link>
        </li>
        <li>
          <Link
            href="https://facebook.com/favorselectofficial"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Facebook className="w-3.5 h-3.5 md:w-4 xl:h-4 text-gray-700" />
          </Link>
        </li>
        <li>
          <Link
            href="https://x.com/@FavorSelect"
            target="_blank"
            rel="noopener noreferrer"
          >
            <X className="w-3.5 h-3.5 md:w-4 xl:h-4 text-gray-700" />
          </Link>
        </li>
        <li>
          <Link
            href="https://linkedin.com/company/favorselect"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin className="w-3.5 h-3.5 md:w-4 xl:h-4 text-gray-700" />
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SocialLinks;
