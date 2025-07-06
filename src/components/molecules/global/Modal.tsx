import { Button } from "@/components/atoms/Button";
import { cn } from "@/utils/cn";
import { X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
  children: React.ReactNode;
}

const Modal = React.forwardRef<HTMLDivElement, ModalProps>(
  ({ isOpen, onClose, className, children, ...props }, ref) => {
    const [shouldRender, setShouldRender] = useState(isOpen);
    const [closing, setClosing] = useState(false);

    // Watch isOpen to control rendering and animations
    useEffect(() => {
      if (isOpen) {
        setShouldRender(true);
        setClosing(false);
      } else if (shouldRender) {
        // Start closing animation
        setClosing(true);
        // Wait for animation to finish before unmounting
        const timeout = setTimeout(() => {
          setShouldRender(false);
        }, 300); // Adjust to match your animation duration

        return () => clearTimeout(timeout);
      }
    }, [isOpen, shouldRender]);

    // Close on Escape key
    useEffect(() => {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          onClose();
        }
      };

      if (isOpen) {
        document.addEventListener("keydown", handleEscape);
      }

      return () => {
        document.removeEventListener("keydown", handleEscape);
      };
    }, [isOpen, onClose]);

    if (!shouldRender) return null;

    return createPortal(
      <div
        className={cn(
          "modal-overlay",
          "bg-black/50",
          "fixed",
          "inset-0",
          "z-50",
          "flex",
          "items-center",
          "justify-center",
          closing ? "animate-fade-out" : "animate-fade-in"
        )}
        onClick={(e) => {
          if (
            e.target instanceof HTMLElement &&
            e.target.classList.contains("modal-overlay")
          ) {
            onClose();
          }
        }}
        aria-modal="true"
        role="dialog"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <div
          ref={ref}
          className={cn(
            "modal-content",
            closing ? "animate-slide-out" : "animate-slide-in",
            className
          )}
          {...props}
        >
          <Button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </Button>
          {children}
        </div>
      </div>,
      document.body
    );
  }
);

Modal.displayName = "Modal";

export { Modal, type ModalProps };
