"use client";

import { Drawer } from "vaul";
import { X } from "lucide-react";
import React from "react";
import { Button } from "@/components/atoms/Button";
import Logo from "../header/Logo";

type DrawerContainerProps = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  children: React.ReactNode;
  maxWidth?: string;
};

const DrawerContainer = ({
  isOpen,
  setIsOpen,
  children,
  maxWidth = "max-w-[400px]",
}: DrawerContainerProps) => {
  return (
    <Drawer.Root
      open={isOpen}
      onOpenChange={setIsOpen}
      dismissible={false}
      direction="right"
    >
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/60 h-full z-40" />
        <Drawer.Content
          className={`fixed right-0 top-0 bottom-0 z-[101] outline-none w-full ${maxWidth} flex h-full font-montserrat`}
        >
          <Drawer.Title className="sr-only" />
          <div className="bg-white h-full w-full flex flex-col overflow-y-auto space-y-2">
            {/* Header with Logo and Close */}
            <div className="border-b border-scarlet-red px-3 py-2.5 flex justify-between items-center">
              <Logo />
              <Button
                onClick={() => setIsOpen(false)}
                className="cursor-pointer"
              >
                <X className="h-6 w-6 text-scarlet-red" />
              </Button>
            </div>

            {/* Dynamic Content */}
            <div>{children}</div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export default DrawerContainer;
