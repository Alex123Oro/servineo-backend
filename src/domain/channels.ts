export interface NotificationPayload {
  userId: string;
  to?: string;
  balance?: number;
  threshold?: number;
  [key: string]: any;
}

