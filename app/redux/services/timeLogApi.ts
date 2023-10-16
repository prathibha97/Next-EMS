import { Client, TaskWork } from '@prisma/client';
import { apiSlice } from './api';

export const timeLogApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // fetchClients: builder.query<Client[], void>({
    //   query: () => '/clients',
    // }),
    updateTimeLog: builder.mutation<
      TaskWork,
      { timeLogId: string | undefined; body: Partial<TaskWork> }
    >({
      query: ({ timeLogId, body }) => ({
        url: `/timelogs/${timeLogId}`,
        method: 'PUT',
        body,
      }),
    }),
    // getClientById: builder.query({
    //   query: (clientId: string) => `/clients/${clientId}`,
    // }),
    createTimeLog: builder.mutation({
      query: (data) => ({
        url: '/timelogs',
        method: 'POST',
        body: data,
      }),
    }),
    removeTimeLog: builder.mutation({
      query: (timeLogId: string) => ({
        url: `/timelogs/${timeLogId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  // useFetchClientsQuery,
  useUpdateTimeLogMutation,
  // useGetClientByIdQuery,
  useCreateTimeLogMutation,
  useRemoveTimeLogMutation,
} = timeLogApi;
