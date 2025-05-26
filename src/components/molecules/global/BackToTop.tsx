"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/atoms/Button";

const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const scrollToTop = (): void => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const triggerHeight = window.innerHeight * 0.4;
      setIsVisible(scrollTop > triggerHeight);
    };

    let lastScroll = 0;
    const throttledScroll = () => {
      const now = Date.now();
      if (now - lastScroll > 95) {
        handleScroll();
        lastScroll = now;
      }
    };

    window.addEventListener("scroll", throttledScroll);
    return () => window.removeEventListener("scroll", throttledScroll);
  }, []);

  return (
    <div
      aria-live="polite"
      className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ease-out ${
        isVisible
          ? "opacity-100 scale-100 translate-y-0"
          : "opacity-0 scale-75 translate-y-8"
      }`}
    >
      <Button
        onClick={scrollToTop}
        className="flex items-center justify-center w-10 h-10 bg-scarlet-red text-white rounded-full cursor-pointer focus:outline-none focus:ring-4 focus:ring-red-400 shadow-lg hover:bg-red-500 transition-all"
        aria-label="Back to Top"
        title="Back to Top"
        style={{
          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)",
        }}
      >
        <ArrowUp className="w-5 h-5" />
        <span className="sr-only">Scroll back to top</span>
      </Button>
    </div>
  );
};

export default BackToTop;
