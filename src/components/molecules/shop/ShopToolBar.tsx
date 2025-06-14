/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { itemsPerPageOptions } from "@/data/itemsPerPageOptions";
import Span from "@/components/atoms/Span";
import { RootState } from "@/store/store";
import { setProductViewMode } from "@/store/slices/product-view/productViewSlice";
import { Grid2x2, List } from "lucide-react";
import { Button } from "@/components/atoms/Button";
import SortByFilter from "./SortByFilter";

const ShopToolBar = () => {
  const [itemsPerPage, setItemsPerPage] = useState("16");

  const dispatch = useDispatch();
  const viewMode = useSelector((state: RootState) => state.productView.mode);

  const handleItemsPerPageChange = (selected: any) => {
    setItemsPerPage(selected?.value || "");
    console.log("Selected Items per Page:", selected?.value);
  };

  const handleViewChange = (mode: "grid" | "list") => {
    dispatch(setProductViewMode(mode));
  };

  return (
    <div className="w-auto md:w-full flex items-center justify-end space-x-2">
      <div className="flex items-center space-x-2">
        <Span className="text-gray-600 font-medium text-sm hidden md:block">
          Sort:
        </Span>
        <SortByFilter />

        <Span className="text-gray-600 font-medium text-sm hidden md:block">
          Show:
        </Span>
        <Select
          value={itemsPerPageOptions.find((opt) => opt.value === itemsPerPage)}
          onChange={handleItemsPerPageChange}
          options={itemsPerPageOptions}
          placeholder="Items per page"
          className="text-sm w-40"
          classNamePrefix="react-select"
        />
      </div>

      <Button
        onClick={() => handleViewChange("grid")}
        className={`p-2 rounded-md border transition-all ${
          viewMode === "grid"
            ? "bg-gray-200 border-gray-400"
            : "border-gray-300"
        }`}
      >
        <Grid2x2 className="w-4 h-4" />
      </Button>

      <Button
        onClick={() => handleViewChange("list")}
        className={`p-2 rounded-md border transition-all ${
          viewMode === "list"
            ? "bg-gray-200 border-gray-400"
            : "border-gray-300"
        }`}
      >
        <List className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default ShopToolBar;
