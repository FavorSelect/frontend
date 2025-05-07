import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Dropdown from "@/components/molecules/global/Dropdown";
import { sortOptions } from "@/data/sortOptions";
import { itemsPerPageOptions } from "@/data/itemsPerPageOptions";
import Span from "@/components/atoms/Span";
import { RootState } from "@/store/store";
import { setProductViewMode } from "@/store/slices/product-view/productViewSlice";
import { Grid2x2, List } from "lucide-react";
import { Button } from "@/components/atoms/Button";

const ShopToolbar = () => {
  const [sortBy, setSortBy] = useState("latest");
  const [itemsPerPage, setItemsPerPage] = useState("16");

  const dispatch = useDispatch();
  const viewMode = useSelector((state: RootState) => state.productView.mode);

  const handleSortChange = (value: string) => {
    setSortBy(value);
    console.log("Selected Sort Option:", value);
  };

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(value);
    console.log("Selected Items per Page:", value);
  };

  const handleViewChange = (mode: "grid" | "list") => {
    dispatch(setProductViewMode(mode));
  };

  return (
    <div className="flex items-center justify-end space-x-2">
      <div className="flex items-center space-x-2">
        <Span className="text-gray-600 font-medium text-sm">Sort:</Span>
        <Dropdown
          value={sortBy}
          onChange={handleSortChange}
          options={sortOptions}
          placeholder="Choose an option"
          className="w-50"
        />

        <Span className="text-gray-600 font-medium text-sm">Show:</Span>
        <Dropdown
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
          options={itemsPerPageOptions}
          placeholder="Items per page"
          className="w-50"
        />
      </div>
      <div className="flex space-x-2">
        {/* Grid and List View Buttons */}
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
    </div>
  );
};

export default ShopToolbar;
