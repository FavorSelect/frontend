"use client";
import { Button } from "@/components/atoms/Button";
import Span from "@/components/atoms/Span";
import { MapPin, X } from "lucide-react";
import React, { useState } from "react";
import { Drawer } from "vaul";
import Logo from "../header/Logo";
import AddressForm from "./AddressForm";

const EmptyAddressList = ({ token }: { token: string }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div className="relative h-full flex flex-col">
      {/* Header Section */}
      <div className="w-full flex justify-between items-center p-4">
        <h2 className="text-xl font-bold text-scarlet-red">Saved Address</h2>
        <Span className="text-sm text-gray-500 hover:text-gray-700">
          Manage your shipping and billing addresses
        </Span>
      </div>

      {/* Content Section */}
      <div className="flex-grow flex items-center justify-center">
        <div className="flex flex-col items-center">
          <MapPin className="text-gray-300 w-12 h-12 mb-4" />
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            No addresses saved
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            Add an address for faster checkout
          </p>

          <Drawer.Root
            dismissible={true}
            open={isOpen}
            onOpenChange={setIsOpen}
            direction="right"
          >
            <Drawer.Trigger className="px-6 py-2 border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer border">
              Add Address
            </Drawer.Trigger>

            <Drawer.Portal>
              <Drawer.Overlay className="fixed inset-0 bg-black/60 h-full z-100" />
              <Drawer.Content className="right-0 top-0 bottom-0 fixed z-[101] outline-none w-full max-w-[400px] flex h-full font-montserrat">
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
                  <AddressForm token={token} setIsOpen={setIsOpen} />
                </div>
              </Drawer.Content>
            </Drawer.Portal>
          </Drawer.Root>
        </div>
      </div>
    </div>
  );
};

export default EmptyAddressList;
