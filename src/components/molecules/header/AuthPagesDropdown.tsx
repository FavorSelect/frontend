"use client";
import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { User } from "lucide-react";
import Span from "@/components/atoms/Span";
import { cn } from "@/utils/cn";

const ProfileDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close the dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close the dropdown on link click
  const handleLinkClick = () => setIsOpen(false);

  return (
    <div ref={ref} className="relative text-sm cursor-pointer">
      {/* Profile Button */}
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        className="flex flex-col items-center group"
      >
        <User className="w-6 h-6 text-gray-700 " />
        <Span className="mt-1 text-gray-700">Profile</Span>
      </div>

      {/* Dropdown Menu */}
      <ul
        role="listbox"
        aria-labelledby="auth-pages-dropdown"
        className={cn(
          "absolute top-full left-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg transition-all duration-300 transform",
          isOpen
            ? "opacity-100 translate-y-1 pointer-events-auto"
            : "opacity-0 translate-y-0 pointer-events-none"
        )}
        tabIndex={0}
      >
        <li onClick={handleLinkClick}>
          <Link
            href="/signup"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
          >
            Sign Up
          </Link>
        </li>
        <li onClick={handleLinkClick}>
          <Link
            href="/login"
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
          >
            Login
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default ProfileDropdown;
