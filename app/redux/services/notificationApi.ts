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

    markAllAsRead: builder.mutation<Notification, { employeeId: string }>({
      query: ({ employeeId }) => ({
        url: `/notifications/employee/${employeeId}`,
        method: 'PUT',
      }),
    }),
    clearNotifications: builder.mutation<Notification, { employeeId: string }>({
      query: ({ employeeId }) => ({
        url: `/notifications/employee/${employeeId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetNotificationsByEmployeeIdQuery,
  useMarkAllAsReadMutation,
  useClearNotificationsMutation,
} = notificationApi;
