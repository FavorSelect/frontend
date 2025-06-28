"use client";
import React, { useState, useRef, useEffect } from "react";
import { useGetNotificationQuery } from "@/store/api/notificationApi";
import { format } from "date-fns";
import Image from "next/image";
import { Bell } from "lucide-react";
import { cn } from "@/utils/cn";
import Span from "@/components/atoms/Span";

export default function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const { data, isLoading, isError } = useGetNotificationQuery();

  const notifications = data?.notifications ?? [];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative text-sm">
      {/* Bell Button */}
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        className="flex flex-col items-center group cursor-pointer"
      >
        <Bell className="w-6 h-6" />
        <Span className="mt-1 hidden xl:block">Notifications</Span>
      </div>

      {/* Dropdown */}
      <div
        className={cn(
          "absolute top-full right-0 mt-2 w-80 z-50 bg-white border border-gray-200 rounded-lg shadow-lg transition-all duration-300 transform",
          isOpen
            ? "opacity-100 translate-y-1 pointer-events-auto"
            : "opacity-0 translate-y-0 pointer-events-none"
        )}
      >
        <div className="p-4">
          <h2 className="text-lg font-bold text-gray-800 mb-2">
            Notifications
          </h2>

          {isLoading && (
            <p className="text-gray-500 text-sm">Loading notifications...</p>
          )}

          {(isError || !data || !data.notifications) && !isLoading && (
            <p className="text-red-500 text-sm">
              Failed to load notifications.
            </p>
          )}

          {notifications.length === 0 && !isLoading && !isError && (
            <p className="text-gray-500 text-sm">No notifications available.</p>
          )}

          {notifications.length > 0 && (
            <ul className="space-y-3 max-h-80 overflow-y-auto">
              {notifications.map((note) => (
                <li
                  key={note.id}
                  className="border border-gray-100 rounded-md p-3 flex gap-3 hover:bg-gray-50 transition-colors"
                >
                  <div className="w-16 h-16 relative flex-shrink-0">
                    <Image
                      src={
                        note.coverImage && note.coverImage.trim() !== ""
                          ? note.coverImage
                          : "/blur-placeholder.png"
                      }
                      alt={note.title}
                      fill
                      className="rounded-md object-cover"
                    />
                  </div>
                  <div className="flex flex-col justify-between">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-800">
                        {note.title}
                      </h3>
                      <p className="text-xs text-gray-600 mt-0.5 line-clamp-2">
                        {note.message}
                      </p>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">
                      {format(new Date(note.createdAt), "MMM dd, yyyy")}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
