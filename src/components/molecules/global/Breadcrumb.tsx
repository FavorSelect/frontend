"use client";

import Link from "next/link";
import { BreadcrumbItem } from "@/types/component";
import React from "react";

export default function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="breadcrumb" className="text-sm text-gray-600 my-4">
      <ol className="flex flex-wrap gap-1">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="flex items-center gap-1">
              {!isLast && item.href ? (
                <Link
                  href={item.href}
                  className="hover:underline text-blue-600"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="font-medium text-gray-800">{item.label}</span>
              )}
              {!isLast && <span>/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
