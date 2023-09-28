import { Notification } from '@prisma/client';
import { apiSlice } from './api';

export const notificationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotificationsByEmployeeId: builder.query<
      Notification,
      { employeeId: string }
    >({
      query: ({ employeeId }) => `/notifications/employee/${employeeId}`,
    }),

    readNotification: builder.mutation<
      Notification,
      { notificationId: string | undefined; body: Partial<Notification> }
    >({
      query: ({ notificationId, body }) => ({
        url: `/notifications/${notificationId}`,
        method: 'PUT',
        body,
      }),
    }),
    clearNotifications: builder.mutation<Notification, { employeeId: string }>({
      query: ({ employeeId }) => ({
        url: `/notifications/${employeeId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetNotificationsByEmployeeIdQuery,
  useReadNotificationMutation,
  useClearNotificationsMutation,
} = notificationApi;
