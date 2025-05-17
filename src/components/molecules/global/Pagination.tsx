import { Button } from "@/components/atoms/Button";
import { cn } from "@/utils/cn";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
  disbaled?: boolean;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className,
  disbaled,
}) => {
  const getPages = (): (number | string)[] => {
    const pages: (number | string)[] = [];

    if (totalPages <= 6) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(
          1,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }

    return pages;
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Button
        className="w-9 h-9 flex items-center justify-center rounded-md bg-gray-100 text-gray-500 hover:bg-gray-200 disabled:opacity-30"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1 || disbaled}
      >
        <ChevronLeft className="w-5 h-5" />
      </Button>

      {getPages().map((page, index) => (
        <Button
          key={index}
          disabled={page === "..." || disbaled}
          onClick={() => typeof page === "number" && onPageChange(page)}
          className={`w-9 h-9 flex items-center justify-center rounded-md text-sm font-medium transition-colors
            ${
              page === currentPage
                ? "bg-scarlet-red text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }
            ${page === "..." ? "cursor-default" : ""}
          `}
        >
          {page}
        </Button>
      ))}

      <Button
        className="w-9 h-9 flex items-center justify-center rounded-md bg-gray-100 text-gray-500 hover:bg-gray-200 disabled:opacity-30"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages || disbaled}
      >
        <ChevronRight className="w-5 h-5" />
      </Button>
    </div>
  );
};

export default Pagination;
