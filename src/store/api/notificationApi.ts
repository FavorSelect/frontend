import { NotificationResponse } from "@/types/notification";
import { apiSlice } from "./api";

export const notificationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotification: builder.query<NotificationResponse, void>({
      query: () => ({
        url: "api/general/notifications",
        method: "GET",
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetNotificationQuery } = notificationApi;
