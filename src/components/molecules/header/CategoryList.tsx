"use client";
import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import {
  Menu,
  ChevronDown,
  GiftIcon,
  Tag,
  CarFront,
  TvMinimal,
  Shirt,
  Dessert,
  Dumbbell,
  HeartPlus,
  Brain,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { cn } from "@/utils/cn";
import Span from "@/components/atoms/Span";

const categoriesDropdownItems = [
  {
    label: "Vehicle",
    icon: <CarFront className="w-5 h-5" />,
    subcategories: [
      "Cars",
      "Motorcycles",
      "Trucks",
      "Bicycles",
      "Electric Vehicles",
      "Car Accessories",
      "Motorcycle Helmets",
      "Car Care & Maintenance",
      "Spare Parts",
      "Vehicle Electronics",
    ],
  },
  {
    label: "Electronics",
    icon: <TvMinimal className="w-5 h-5" />,
    subcategories: [
      "Mobile Phones",
      "Laptops",
      "Tablets",
      "Smart Watches",
      "Televisions",
      "Home Audio",
      "Cameras",
      "Drones",
      "Gaming Consoles",
      "Wearable Tech",
    ],
  },
  {
    label: "Fashion",
    icon: <Shirt className="w-5 h-5" />,
    subcategories: [
      "Men's Clothing",
      "Women's Clothing",
      "Kids' Clothing",
      "Footwear",
      "Handbags",
      "Accessories",
      "Jewelry",
      "Watches",
      "Sunglasses",
      "Ethnic Wear",
    ],
  },
  {
    label: "Lotion",
    icon: <Dessert className="w-5 h-5" />,
    subcategories: [
      "Body Lotions",
      "Face Creams",
      "Moisturizers",
      "Sunscreen",
      "Hand Creams",
      "Body Butters",
      "Essential Oils",
      "Hair Serums",
      "Skin Serums",
      "Face Masks",
    ],
  },
  {
    label: "Sports Accessories",
    icon: <Dumbbell className="w-5 h-5" />,
    subcategories: [
      "Fitness Equipment",
      "Yoga Mats",
      "Dumbbells",
      "Resistance Bands",
      "Sports Apparel",
      "Water Bottles",
      "Sports Shoes",
      "Gym Bags",
      "Outdoor Gear",
      "Cycling Equipment",
    ],
  },
  {
    label: "Health",
    icon: <HeartPlus className="w-5 h-5" />,
    subcategories: [
      "Vitamins & Supplements",
      "Personal Care",
      "Fitness Trackers",
      "Medical Equipment",
      "First Aid",
      "Wellness Products",
      "Protein Powders",
      "Health Drinks",
      "Fitness Apps",
      "Weight Loss Products",
    ],
  },
  {
    label: "Hobby & Creativity",
    icon: <Brain className="w-5 h-5" />,
    subcategories: [
      "Art Supplies",
      "Musical Instruments",
      "DIY Craft Kits",
      "Board Games",
      "Puzzles",
      "Photography Gear",
      "Writing Tools",
      "Sewing & Knitting",
      "Model Kits",
      "Collectibles",
    ],
  },
];

const categories = [
  { label: "All Category", isCategory: true },
  { label: "Woman" },
  { label: "Male" },
  { label: "Mother & Child" },
  { label: "Home & Life" },
  { label: "Supermarket" },
  { label: "Cosmetics" },
  { label: "Shoes & Bags" },
  { label: "Electronics" },
  { label: "Top Sellers", icon: <Tag className="w-4 h-4 text-orange-500" /> },
  {
    label: "Flash Products",
    icon: <GiftIcon className="w-4 h-4 text-red-500" />,
  },
];

const CategoryList = ({ className }: { className?: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
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
          className={`w-5 h-5 transform transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </Button>
      {/* dropdown */}
      <div
        role="listbox"
        aria-labelledby="category-dropdown"
        className={cn(
          "absolute top-full left-0 text-sm mt-3 w-full bg-white rounded-md shadow-sm transition-all duration-300 transform z-50 flex",
          isOpen
            ? "opacity-100 translate-y-1 pointer-events-auto"
            : "opacity-0 translate-y-0 pointer-events-none"
        )}
        tabIndex={0}
      >
        <ul className="w-1/3 border-r border-[#ffdcdc]">
          {categoriesDropdownItems.map((categoryDropdown, index) => (
            <li
              key={index}
              onClick={() => setIsOpen(false)}
              onMouseEnter={() => setActiveCategory(categoryDropdown.label)}
            >
              <Link
                href="#"
                className="flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-scarlet-red hover:text-white transition-colors duration-100 ease-in"
              >
                <Span className="flex gap-x-2 items-center">
                  {categoryDropdown.icon}
                  {categoryDropdown.label}
                </Span>
                <ChevronRight className="w-5 h-5" />
              </Link>
            </li>
          ))}
        </ul>
        <div className="w-2/3 px-4 py-2">
          {categoriesDropdownItems
            .filter((category) => category.label === activeCategory)
            .map((category, index) => (
              <ul key={index}>
                {category.subcategories.map((subcategory, subIndex) => (
                  <li
                    key={subIndex}
                    className="text-gray-700 py-1 hover:text-scarlet-red cursor-pointer"
                  >
                    {subcategory}
                  </li>
                ))}
              </ul>
            ))}
        </div>
      </div>
      {/* dropdown */}

      {categories.map((item, i) => (
        <Link
          key={i}
          href="#"
          className="flex items-center font-medium text-sm text-eerie-black hover:text-scarlet-red transition-colors duration-200 ease-in-out cursor-pointer"
        >
          {item.icon && item.icon}
          {item.label}
        </Link>
      ))}
    </div>
  );
};

export default CategoryList;
