import Paragraph from "@/components/atoms/Paragraph";
import React from "react";

const ProductDescription = ({ description }: { description: string }) => {
  return (
    <div className="text-gray-800 space-y-6">
      {/* Description */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Description</h2>
        <Paragraph>{description}</Paragraph>
      </div>
    </div>
  );
};

export default ProductDescription;
