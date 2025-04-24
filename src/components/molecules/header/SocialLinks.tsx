import React from "react";
import Span from "@/components/atoms/Span";
import Link from "next/link";
import { Facebook, Instagram, Twitter, Youtube } from "@/assets/icon";

const SocialLinks = () => {
  return (
    <div className="flex gap-x-2.5 items-center">
      <Span className="font-medium text-sm text-eerie-black">Follow Us:</Span>
      <ul className="flex gap-x-2.5 items-center">
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
        <li>
          <Link href="#">
            <Twitter />
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SocialLinks;
