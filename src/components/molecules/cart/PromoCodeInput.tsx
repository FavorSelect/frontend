import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import React, { useState } from "react";

type PromoCodeInputProps = {
  onApply: (code: string) => void;
};

export const PromoCodeInput: React.FC<PromoCodeInputProps> = ({ onApply }) => {
  const [code, setCode] = useState("");

  return (
    <div className="flex items-center gap-2 mt-4">
      <Input
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Enter Promo Code"
        className="flex-1 px-3 py-2 border border-gray-200 rounded text-sm"
      />
      <Button
        onClick={() => onApply(code)}
        className="bg-scarlet-red px-3 py-2 text-white rounded-lg font-semibold"
      >
        Apply
      </Button>
    </div>
  );
};
