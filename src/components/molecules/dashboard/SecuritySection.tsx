import React from "react";
import { Button } from "@/components/atoms/Button";
import Paragraph from "@/components/atoms/Paragraph";

const SecuritySection = () => {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-2">Security</h3>
      <div className="mb-4">
        <div className="flex justify-between items-center">
          <h4 className="text-base font-semibold text-gray-800">Password</h4>
          <Button className="px-6 py-2 rounded-md text-sm transition border border-scarlet-red text-scarlet-red hover:bg-red-50 font-semibold">
            Change
          </Button>
        </div>
        <div className="w-full mb-4">
          <Paragraph className="text-gray-600 text-sm">
            Last changed: Never
          </Paragraph>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2 mb-2">
            <div
              className="bg-orange-400 h-2.5 rounded-full"
              style={{ width: "60%" }}
            ></div>
          </div>
          <Paragraph className="text-orange-500 text-sm">
            Medium strength
          </Paragraph>
        </div>
      </div>
      <div>
        <div className="flex justify-between items-center">
          <h4 className="text-base font-semibold text-gray-800">
            Two-Factor Authentication
          </h4>
          <Button className="px-6 py-2 rounded-md text-sm transition border border-scarlet-red text-scarlet-red hover:bg-red-50 font-semibold">
            Enable
          </Button>
        </div>
        <Paragraph className="text-gray-500 text-sm">
          Not enabled – Add extra protection to your account.
        </Paragraph>
      </div>
    </div>
  );
};

export default SecuritySection;
