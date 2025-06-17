"use client";
import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { Menu, ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { cn } from "@/utils/cn";
import Span from "@/components/atoms/Span";
import { Category } from "@/types/category";
import { categoryListIconMap } from "@/utils/iconMaps";
import { slugify } from "@/utils/slugify";

// Receive categories from props
const CategoryList = ({
  className,
  categories,
}: {
  className?: string;
  categories: Category[];
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleButtonClick = () => setIsOpen((prev) => !prev);

  return (
    <div
      ref={ref}
      className={cn(
        "relative w-full font-montserrat font-normal flex items-center space-x-2 md:space-x-3 md:py-0 py-2.5",
        className
      )}
    >
      <Button
        className="flex items-center gap-x-2 text-sm font-semibold text-eerie-black"
        onClick={handleButtonClick}
      >
        <Menu className="w-4 h-4" />
        All Categories
        <ChevronDown
          className={`w-5 h-5 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </Button>

      {/* Dropdown */}
      <div
        className={cn(
          "absolute top-full left-0 text-sm mt-3 w-full bg-white rounded-md shadow-sm transition-all duration-300 transform z-50 flex",
          isOpen
            ? "opacity-100 translate-y-1 pointer-events-auto"
            : "opacity-0 translate-y-0 pointer-events-none"
        )}
      >
        {/* Category List */}
        <ul className="w-1/3 border-r border-[#ffdcdc]">
          {categories.map((category) => {
            const Icon = categoryListIconMap[category.categoryName] || Menu;
            return (
              <li
                key={category.id}
                onClick={() => setIsOpen(false)}
                onMouseEnter={() => {
                  setActiveCategory(category.categoryName);
                }}
              >
                <Link
                  href={`/shop/${slugify(category.categoryName)}`}
                  className="flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-scarlet-red hover:text-white transition-colors"
                >
                  <Span className="flex gap-x-2 items-center">
                    <Icon className="w-5 h-5" />
                    {category.categoryName}
                  </Span>
                  <ChevronRight className="w-5 h-5" />
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Subcategory Panel */}
        <div className="w-2/3 px-4 py-2">
          {categories
            .filter(
              (cat) =>
                cat.categoryName.toLowerCase() === activeCategory?.toLowerCase()
            )
            .map((cat) => (
              <ul key={cat.id}>
                {cat.subcategories.map((sub) => (
                  <li
                    key={sub.id}
                    className="text-gray-700 py-1 hover:text-scarlet-red cursor-pointer"
                    onClick={() => setIsOpen(false)}
                  >
                    <Link
                      href={`/shop/${slugify(cat.categoryName)}/${slugify(
                        sub.categoryName
                      )}`}
                    >
                      {sub.categoryName}
                    </Link>
                  </li>
                ))}
              </ul>
            ))}
        </div>
      </div>

      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/shop/${slugify(category.categoryName)}`}
          className="flex items-center font-medium text-sm text-eerie-black hover:text-scarlet-red transition-colors duration-200 ease-in-out cursor-pointer"
        >
          {category.categoryName}
        </Link>
      ))}
    </div>
  );
};

export default CategoryList;
