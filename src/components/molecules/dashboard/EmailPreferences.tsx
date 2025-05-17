import React, { useState } from "react";
import { Button } from "@/components/atoms/Button";
import { Checkbox } from "@/components/atoms/Checkbox";

const emailOptions = [
  {
    id: "orderUpdates",
    label: "Order Updates",
    description: "Get notified when your order ships or is delayed.",
  },
  {
    id: "promotions",
    label: "Promotions",
    description: "Receive exclusive deals and offers.",
  },
  {
    id: "newsletter",
    label: "Newsletter",
    description: "Stay up to date with the latest news and updates.",
  },
  {
    id: "accountAlerts",
    label: "Account Alerts",
    description: "Important info about your account security and privacy.",
  },
];

const EmailPreferences: React.FC = () => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({
    orderUpdates: false,
    promotions: false,
    newsletter: false,
    accountAlerts: false,
  });

  const handleCheckboxChange = (id: string, checked: boolean) => {
    setCheckedItems((prev) => ({ ...prev, [id]: checked }));
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Email Preferences</h2>

      <div className="space-y-4">
        {emailOptions.map(({ id, label, description }) => (
          <div key={id} className="flex items-start">
            <div className="mt-1">
              <Checkbox
                checked={checkedItems[id]}
                onChange={(checked) => handleCheckboxChange(id, checked)}
              />
            </div>
            <div className="text-sm">
              <label className="font-semibold ">{label}</label>
              <p className="text-sm text-gray-600 ">{description}</p>
            </div>
          </div>
        ))}
      </div>

      <Button className="px-6 py-2 rounded-md text-sm transition mt-4 bg-scarlet-red text-white hover:bg-red-600 font-semibold">
        Save Preferences
      </Button>
    </div>
  );
};

export default EmailPreferences;
