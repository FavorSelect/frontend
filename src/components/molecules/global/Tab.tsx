"use client";
import React from "react";
import { Button } from "@/components/atoms/Button";

type TabProps = {
  label: string;
  children: React.ReactNode;
};

type TabsProps = {
  children: React.ReactElement<TabProps>[] | React.ReactElement<TabProps>;
  activeTab: string;
  onTabChange: (tab: string) => void;
  className?: string;
};

export const Tab: React.FC<TabProps> = ({ children }) => {
  return <>{children}</>;
};

export const Tabs: React.FC<TabsProps> = ({
  children,
  activeTab,
  onTabChange,
  className = "",
}) => {
  const tabsArray = React.Children.toArray(
    children
  ) as React.ReactElement<TabProps>[];

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex gap-3" role="tablist">
        {tabsArray.map((tab) => (
          <Button
            key={tab.props.label}
            onClick={() => onTabChange(tab.props.label)}
            className={`py-2 px-4 border-b-2 ${
              activeTab === tab.props.label
                ? "border-scarlet-red text-scarlet-red"
                : "border-transparent text-gray-500"
            }`}
            role="tab"
            aria-selected={activeTab === tab.props.label}
          >
            {tab.props.label}
          </Button>
        ))}
      </div>
      <div>
        {tabsArray.map(
          (tab) =>
            tab.props.label === activeTab && (
              <div key={tab.props.label} role="tabpanel">
                {tab.props.children}
              </div>
            )
        )}
      </div>
    </div>
  );
};
