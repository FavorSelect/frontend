"use client";

import React, { useState } from "react";
import { ChevronRight, X } from "lucide-react";
import { Drawer } from "vaul";
import Link from "next/link";
import Logo from "./Logo";
import { Button } from "@/components/atoms/Button";
import { categoryIconMap } from "@/utils/iconMaps";
import type { Category } from "@/types/category";
import { RootState } from "@/store/store";
import { useAppSelector } from "@/store/hook";
import { slugify } from "@/utils/slugify";
import { usePathname } from "next/navigation";
import { cn } from "@/utils/cn";
import { toPascalCase } from "@/utils/toPascal";
import Image from "next/image";

const MobileMenu = ({ categories }: { categories: Category[] }) => {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const user = useAppSelector((state: RootState) => state.user.userInfo);
  const isLoggedIn = useAppSelector(
    (state: RootState) => state.user.isLoggedIn
  );
  const pathName = usePathname();
  const parts = pathName.split("/shop/")[1]?.split("/") || [];
  const currentCategory = parts[0];
  const currentSubcategory = parts[1];

  const toggleDropdown = (label: string) => {
    setExpanded((prev) => (prev === label ? null : label));
  };

  const handleOpenChange = (open: boolean) => {
    if (open) {
      setScrollY(window.scrollY);
    } else {
      setTimeout(() => {
        window.scrollTo(0, scrollY);
      }, 0);
    }
    setIsOpen(open);
  };

  return (
    <Drawer.Root
      dismissible={true}
      open={isOpen}
      onOpenChange={handleOpenChange}
      direction="left"
    >
      <Drawer.Trigger className="xl:hidden space-y-1 cursor-pointer">
        <span
          className={`block w-7 h-1 bg-black rounded transition-all duration-300 ease-in-out ${
            isOpen ? "rotate-45 translate-y-2" : ""
          }`}
        />
        <span
          className={`block w-7 h-1 bg-black rounded transition-all duration-300 ease-in-out ${
            isOpen ? "opacity-0" : ""
          }`}
        />
        <span
          className={`block w-7 h-1 bg-black rounded transition-all duration-300 ease-in-out ${
            isOpen ? "-rotate-45 -translate-y-2" : ""
          }`}
        />
      </Drawer.Trigger>

      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/60 h-full z-100" />
        <Drawer.Content className="left-0 top-0 bottom-0 fixed z-[101] outline-none w-full max-w-[300px] flex h-full select-none font-montserrat">
          <Drawer.Title className="sr-only" />
          <div className="bg-white h-full w-full grow flex flex-col gap-3 overflow-y-auto">
            <div className="border-b border-b-[#eee] px-3 py-2.5 flex justify-between items-center">
              <Logo handler={() => setIsOpen(false)} />
              <Button
                onClick={() => setIsOpen(false)}
                className="cursor-pointer"
              >
                <X className="h-7 w-7 text-scarlet-red" />
              </Button>
            </div>

            <ul className="border-b border-b-[#eee] pb-3">
              {categories.map((category, index) => {
                const isExpanded = expanded === category.categoryName;
                const imageIconSrc =
                  categoryIconMap[toPascalCase(category.categoryName)] ??
                  "/category-image/electronics.jpg";
                const hasSubcategories = category.subcategories.length > 0;

                return (
                  <li key={index} className="mb-3">
                    {hasSubcategories ? (
                      <>
                        <div className="flex items-center gap-2 cursor-pointer pl-4 pr-3">
                          <div className="bg-white shadow-sm rounded-lg px-0.5 py-0.5">
                            <Image
                              src={imageIconSrc}
                              alt={category.categoryName}
                              className="w-10 h-10 object-contain"
                              width={50}
                              height={50}
                            />
                          </div>
                          <Link
                            href={`/shop/${slugify(category.categoryName)}`}
                            className={cn(
                              "text-sm font-medium text-eerie-black hover:text-scarlet-red transition-colors duration-150 ease-in-out",
                              currentCategory === slugify(category.categoryName)
                                ? "text-scarlet-red font-semibold"
                                : "text-eerie-black hover:text-scarlet-red"
                            )}
                            onClick={() => setIsOpen(false)}
                          >
                            {category.categoryName}
                          </Link>
                          <div
                            className={`ml-auto w-5 h-5 transform transition-transform duration-300 ${
                              isExpanded ? "rotate-90" : "rotate-0"
                            }`}
                          >
                            <Button
                              onClick={() =>
                                toggleDropdown(category.categoryName)
                              }
                            >
                              <ChevronRight className="w-5 h-5 text-[#888888]" />
                            </Button>
                          </div>
                        </div>

                        <div
                          className={`pl-9 overflow-hidden transition-all duration-300 bg-[#fcfcfc] ${
                            isExpanded ? "max-h-screen p-1.5" : "max-h-0"
                          }`}
                          style={{
                            maxHeight: isExpanded
                              ? `${category.subcategories.length * 40}px`
                              : "0px",
                          }}
                        >
                          <ul className="mt-1 ml-3">
                            {category.subcategories.map((subcategory) => (
                              <li
                                key={subcategory.id}
                                className="text-sm hover:text-scarlet-red transition-colors duration-150 ease-in-out mb-3"
                                style={{
                                  opacity: isExpanded ? 1 : 0,
                                  transform: isExpanded
                                    ? "translateY(0)"
                                    : "translateY(-15px)",
                                  transition: "opacity 300ms, transform 300ms",
                                }}
                              >
                                <Link
                                  href={`/shop/${slugify(
                                    category.categoryName
                                  )}/${slugify(subcategory.categoryName)}`}
                                  onClick={() => setIsOpen(false)}
                                  className={cn(
                                    currentSubcategory ===
                                      slugify(subcategory.categoryName)
                                      ? "text-scarlet-red font-semibold"
                                      : "text-gray-700 hover:text-scarlet-red"
                                  )}
                                >
                                  {subcategory.categoryName}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </>
                    ) : (
                      <Link
                        href={`/shop/${slugify(category.categoryName)}`}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "flex items-center gap-2 pl-4 pr-3 text-sm font-medium text-eerie-black hover:text-scarlet-red transition",
                          currentCategory === slugify(category.categoryName)
                            ? "text-scarlet-red font-semibold"
                            : "text-eerie-black hover:text-scarlet-red"
                        )}
                      >
                        <div
                          className="bg-white shadow-sm rounded-lg px-0.5 py-0.5
                        "
                        >
                          <Image
                            src={imageIconSrc}
                            alt={category.categoryName}
                            className="w-10 h-10 object-contain"
                            width={50}
                            height={50}
                          />
                        </div>
                        {category.categoryName}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>

            {!isLoggedIn && !user && (
              <div className="w-full absolute bottom-0 bg-white border-t border-t-[#eee] py-3 px-4">
                {/* Support Links */}
                <ul className="mb-3 space-y-1">
                  {[
                    { label: "Support", href: "/support" },
                    { label: "Warranty", href: "/warranty" },
                    { label: "Campaigns", href: "/campaigns" },
                    { label: "Privacy Policy", href: "/privacy-policy" },
                  ].map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="text-sm text-gray-700 hover:text-scarlet-red transition-colors duration-150 ease-in-out"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>

                {/* Auth Buttons */}
                <div className="flex gap-2">
                  <Link
                    href="/login"
                    onClick={() => setIsOpen(false)}
                    className="flex-1 text-sm font-semibold text-white bg-scarlet-red border border-scarlet-red rounded px-3 py-2 text-center hover:opacity-90"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setIsOpen(false)}
                    className="flex-1 text-sm font-semibold text-scarlet-red border border-scarlet-red rounded px-3 py-2 text-center hover:bg-scarlet-red/10"
                  >
                    Sign Up
                  </Link>
                </div>
              </div>
            )}
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export default MobileMenu;
