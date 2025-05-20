"use client";

import React from "react";
import { Filter, X } from "lucide-react";
import { Drawer } from "vaul";
import { Button } from "@/components/atoms/Button";
import Span from "@/components/atoms/Span";
import Logo from "../header/Logo";

const ShopMobileFilter = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Drawer.Root
      dismissible={false}
      open={isOpen}
      onOpenChange={setIsOpen}
      direction="right"
    >
      <Drawer.Trigger className="bg-gray-100 text-sm text-gray-700 border border-gray-300 rounded-md px-3 font-semibold py-1.5 hover:bg-gray-200 focus:bg-[#fff1f1] focus:text-scarlet-red focus:border focus:border-[#F5282814] focus-visible:ring-gray-400 flex items-center space-x-1.5 lg:hidden cursor-pointer">
        <Span>Filter</Span> <Filter className="w-4 h-4 " />
      </Drawer.Trigger>

      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/50 h-full z-100" />
        <Drawer.Content className="right-2 top-0 bottom-0 fixed z-[101] outline-none w-full max-w-[300px] flex h-full select-none font-montserrat">
          <Drawer.Title className="sr-only" />
          <div className="bg-white h-full w-full grow flex flex-col gap-3 overflow-y-auto">
            <div className="border-b border-scarlet-red px-3 py-2.5 flex justify-between items-center">
              <Logo />
              <Button
                onClick={() => setIsOpen(false)}
                className="cursor-pointer"
              >
                <X className="h-6 w-6 text-scarlet-red" />
              </Button>
            </div>
            <div className="px-4 space-y-8"> {children}</div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export default ShopMobileFilter;
