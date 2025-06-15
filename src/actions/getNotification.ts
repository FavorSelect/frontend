import { Notification, NotificationResponse } from "@/types/notification";
import { getNotificationUrl } from "@/utils/getApirUrl";
import { handleError } from "@/utils/handleResponseError";

export const getNotification = async (): Promise<Notification[]> => {
  const url = getNotificationUrl();
  try {
    const response = await fetch(url, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw await handleError(response);
    }

    const responseData = (await response.json()) as NotificationResponse;
    return responseData.notifications;
  } catch (error: unknown) {
    console.error("Failed to fetch notification:", error);
    throw new Error(`An error occurred while fetching notification: ${error}`);
  }
};
