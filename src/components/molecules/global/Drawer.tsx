"use client";
import { Drawer } from "vaul";
import React from "react";
import { Button } from "@/components/atoms/Button";
import { X } from "lucide-react";

type DrawerContainerProps = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  children: React.ReactNode;
  maxWidth?: string;
  dismissible?: boolean;
};

const DrawerContainer = ({
  isOpen,
  setIsOpen,
  children,
  maxWidth = "max-w-[400px]",
  dismissible,
}: DrawerContainerProps) => {
  return (
    <Drawer.Root
      open={isOpen}
      onOpenChange={setIsOpen}
      dismissible={dismissible}
      direction="right"
    >
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/60 h-full z-40" />
        <Drawer.Content
          className={`fixed right-0 top-0 bottom-0 z-[101] outline-none w-full ${maxWidth} flex h-full font-montserrat`}
        >
          <Drawer.Title className="sr-only" />
          <div className="bg-white h-full w-full flex flex-col overflow-y-auto space-y-2">
            {!dismissible && (
              <Button
                onClick={() => setIsOpen(false)}
                className="absolute top-3 right-3 text-dark-chocolate hover:text-scarlet-red transition"
                aria-label="Close drawer"
              >
                <X size={20} />
              </Button>
            )}
            {/* Dynamic Content */}
            <div className="pt-4">{children}</div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export default DrawerContainer;
