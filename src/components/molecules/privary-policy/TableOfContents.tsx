import { MoveRight } from "lucide-react";
import React from "react";

const sections = [
  "Introduction",
  "Data Collection",
  "Data Usage",
  "Cookies",
  "User Rights",
  "Contact Us",
];

export default function TableOfContents() {
  return (
    <nav className="w-full md:w-1/4 mb-2 md:mb-0 sticky top-5 max-h-screen overflow-y-auto overflow-x-hidden no-scrollbar bg-white backdrop-blur-sm md:bg-transparent z-10">
      <h3 className="text-base font-semibold text-gray-800 mb-4 ">
        Table of Contents
      </h3>
      <ul className="space-y-3">
        {sections.map((section) => (
          <li key={section}>
            <a
              href={`#${section.toLowerCase().replace(/\s+/g, "-")}`}
              className="flex items-center justify-between text-sm text-gray-700 hover:text-red-600 transition-colors"
            >
              {section}
              <span aria-hidden="true">
                <MoveRight />
              </span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
