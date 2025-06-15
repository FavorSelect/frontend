import { getNotification } from "@/actions/getNotification";
import NotificationWrapper from "@/components/organisms/notification/NotificationWrapper";
import React from "react";

export default async function Page() {
  const notifications = await getNotification();

  return <NotificationWrapper notifications={notifications} />;
}
