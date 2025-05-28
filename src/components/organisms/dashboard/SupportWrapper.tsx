"use client";
import React from "react";
import RaiseTicketForm from "@/components/molecules/dashboard/RaiseTicketForm";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setActiveTab } from "@/store/slices/dashboard/supportTab";
import { Button } from "@/components/atoms/Button";
import OpenTicket from "@/components/molecules/dashboard/OpenTicket";
import { useRouter } from "next/navigation";
import { MoveLeft } from "lucide-react";

const SupportWrapper = ({ token }: { token: string }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const activeTab = useSelector(
    (state: RootState) => state.supportTab.activeTab
  );

  return (
    <div className="space-y-4">
      <Button
        onClick={() => router.back()}
        className="text-sm text-gray-500 hover:text-black"
      >
        <MoveLeft />
      </Button>

      <div className="flex gap-3">
        {["Raise Ticket", "Open Tickets"].map((tab) => (
          <Button
            key={tab}
            onClick={() => dispatch(setActiveTab(tab))}
            className={`py-2 px-4 border-b-2 ${
              activeTab === tab
                ? "border-scarlet-red text-scarlet-red"
                : "border-transparent text-gray-500"
            }`}
          >
            {tab}
          </Button>
        ))}
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === "Raise Ticket" && <RaiseTicketForm token={token} />}
        {activeTab === "Open Tickets" && <OpenTicket token={token} />}
      </div>
    </div>
  );
};

export default SupportWrapper;
