import React from "react";
import { X } from "lucide-react";
import { Button } from "@/components/atoms/Button";

type RemoveIconProps = {
  onClick: () => void;
};

export const RemoveCart: React.FC<RemoveIconProps> = ({ onClick }) => {
  return (
    <Button onClick={onClick} className=" text-scarlet-red">
      <X className="w-5 h-5 font-semibold" />
    </Button>
  );
};
