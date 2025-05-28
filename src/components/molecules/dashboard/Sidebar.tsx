"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/utils/cn";
import Span from "@/components/atoms/Span";

interface Tab {
  label: string;
  icon: React.ReactNode;
  href: string;
}

interface TabNavigationProps {
  tabs: Tab[];
  defaultTab?: string;
}

const Sidebar: React.FC<TabNavigationProps> = ({ tabs, defaultTab }) => {
  const pathname = usePathname();

  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  return (
    <nav className="flex items-center w-full">
      <div ref={scrollContainerRef} className="flex flex-col gap-2.5">
        {tabs.map((tab, index) => {
          const isActive =
            (pathname === "/dashboard" && tab.href === defaultTab) ||
            pathname.startsWith(tab.href);

          return (
            <Link
              key={index}
              href={tab.href}
              className={cn(
                "relative text-sm text-center font-medium rounded-lg flex gap-x-2 items-center whitespace-nowrap px-2.5 py-3",
                isActive ? "bg-[#fff1f1] text-scarlet-red" : "text-black"
              )}
            >
              {tab.icon}

              <Span>{tab.label}</Span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Sidebar;
