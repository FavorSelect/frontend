"use client";
import { Notification } from "@/types/notification";
import React from "react";
import Image from "next/image";
import { format } from "date-fns";
import { useGetNotificationQuery } from "@/store/api/notificationApi";

const NotificationWrapper = () => {
  const { data, isLoading, isError } = useGetNotificationQuery();

  if (isLoading) {
    return (
      <p className="text-gray-500 text-center">Loading notifications...</p>
    );
  }

  if (isError || !data || !data.notifications) {
    return (
      <p className="text-red-500 text-center">Failed to load notifications.</p>
    );
  }

  const notifications: Notification[] = data.notifications;

  return (
    <div className="font-montserrat w-full max-w-xl mx-auto p-4 md:p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Notifications</h2>
      {notifications.length === 0 ? (
        <p className="text-gray-500">No notifications available.</p>
      ) : (
        notifications.map((note) => (
          <div
            key={note.id}
            className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 flex gap-4"
          >
            <div className="w-27 h-27 relative flex-shrink-0">
              <Image
                src={note.coverImage}
                alt={note.title}
                objectFit="cover"
                className="rounded-md"
                width={300}
                height={200}
              />
            </div>
            <div className="flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {note.title}
                </h3>
                <p className="text-sm text-gray-600 mt-1">{note.message}</p>
              </div>
              <p className="text-xs text-gray-400 mt-2">
                {format(new Date(note.createdAt), "MMM dd, yyyy")}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default NotificationWrapper;
