"use client";

import React, { ReactNode, useEffect } from "react";
import { X } from "lucide-react";
import { createPortal } from "react-dom";
import { Button } from "@/components/atoms/Button";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative bg-white rounded-lg shadow-lg w-[700px] max-h-[60vh] p-4 animate-fade-in scale-95 transition-all overflow-y-scroll">
        {/* Close Button */}
        <Button
          onClick={onClose}
          className="absolute top-2 right-2 p-1 rounded-full bg-gray-100 hover:bg-gray-200"
        >
          <X className="w-5 h-5" />
        </Button>

        {/* Modal Content */}
        <div className="overflow-auto">{children}</div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
