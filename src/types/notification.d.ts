export interface Notification {
  id: number;
  title: string;
  coverImage: string;
  message: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  userId: number | null;
}

export interface NotificationResponse {
  success: boolean;
  notifications: Notification[];
}
