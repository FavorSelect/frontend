import { Button } from "@/components/atoms/Button";
import React from "react";

const ActionBtn = () => {
  return (
    <div className="flex gap-x-2 font-semibold">
      <Button className=" bg-scarlet-red text-white px-3 py-2 rounded cursor-pointer ">
        Buy Now
      </Button>
      <Button className="bg-black text-white px-3 py-2 rounded cursor-pointer ">
        Add to Cart
      </Button>
    </div>
  );
};

export default ActionBtn;
