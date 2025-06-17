"use client";

import React, { useState } from "react";
import { ChevronDown, X, LucideIcon, Shirt } from "lucide-react";
import { Drawer } from "vaul";
import Link from "next/link";
import Span from "@/components/atoms/Span";
import Logo from "./Logo";
import { Button } from "@/components/atoms/Button";
import { categoryListIconMap } from "@/utils/iconMaps";
import type { Category } from "@/types/category";

const MobileMenu = ({ categories }: { categories: Category[] }) => {
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = (label: string) => {
    setExpanded((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  return (
    <Drawer.Root
      dismissible={false}
      open={isOpen}
      onOpenChange={setIsOpen}
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
            <div className="border-b border-scarlet-red px-3 py-2.5 flex justify-between items-center">
              <Logo />
              <Button
                onClick={() => setIsOpen(false)}
                className="cursor-pointer"
              >
                <X className="h-6 w-6 text-scarlet-red" />
              </Button>
            </div>

            <ul>
              {categories.map((category, index) => {
                const isExpanded = expanded[category.categoryName] || false;
                const Icon: LucideIcon =
                  categoryListIconMap[category.categoryName] || Shirt;
                const hasSubcategories = category.subcategories.length > 0;

                return (
                  <li key={index} className="mb-2">
                    {hasSubcategories ? (
                      <>
                        <div
                          className="flex items-center gap-2 cursor-pointer pl-4 pr-3"
                          onClick={() => toggleDropdown(category.categoryName)}
                        >
                          <Icon className="w-5 h-5" />
                          <Span className="text-sm font-medium">
                            {category.categoryName}
                          </Span>
                          <div
                            className={`ml-auto w-5 h-5 transform transition-transform duration-300 ${
                              isExpanded ? "rotate-180" : "rotate-0"
                            }`}
                          >
                            <ChevronDown className="w-5 h-5" />
                          </div>
                        </div>

                        <div
                          className={`ml-9 overflow-hidden transition-all duration-300 ${
                            isExpanded ? "max-h-screen" : "max-h-0"
                          }`}
                          style={{
                            maxHeight: isExpanded
                              ? `${category.subcategories.length * 40}px`
                              : "0px",
                          }}
                        >
                          <ul className="mt-1">
                            {category.subcategories.map((subcategory) => (
                              <li
                                key={subcategory.id}
                                className="text-sm text-scarlet-red mb-1"
                                style={{
                                  opacity: isExpanded ? 1 : 0,
                                  transform: isExpanded
                                    ? "translateY(0)"
                                    : "translateY(-15px)",
                                  transition: "opacity 300ms, transform 300ms",
                                }}
                              >
                                <Link href="#">{subcategory.categoryName}</Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </>
                    ) : (
                      <Link
                        href="#"
                        className="flex items-center gap-2 pl-4 pr-3 text-sm font-medium text-eerie-black hover:text-scarlet-red transition"
                      >
                        <Icon className="w-5 h-5" />
                        {category.categoryName}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>

            <div className="w-full absolute flex justify-center items-center bottom-0 gap-2 bg-white border-t border-scarlet-red py-2 px-3">
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="text-sm font-semibold"
              >
                Sign In
              </Link>
              <span className="text-scarlet-red">|</span>
              <Link
                href="/signup"
                onClick={() => setIsOpen(false)}
                className="text-sm font-semibold"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export default MobileMenu;
