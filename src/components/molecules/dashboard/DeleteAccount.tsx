import { Button } from "@/components/atoms/Button";
import Paragraph from "@/components/atoms/Paragraph";
import React from "react";

function DeleteAccount() {
  return (
    <div className="pb-3">
      <h3 className="text-base text-gray-800 mb-2 font-semibold">
        Delete Account
      </h3>
      <Paragraph className="text-gray-600 mb-4 text-sm">
        This will permanently remove your account and data.
      </Paragraph>
      <Button className="px-6 py-2 rounded-md text-sm transition bg-scarlet-red text-white hover:bg-red-600 font-semibold">
        Delete Account
      </Button>
    </div>
  );
}

export default DeleteAccount;
