import { Client } from '@prisma/client';
import { apiSlice } from './api';

export const clientApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchClients: builder.query<Client[], void>({
      query: () => '/clients',
    }),
    updateClient: builder.mutation<
      Client,
      { clientId: string | undefined; body: Partial<Client> }
    >({
      query: ({ clientId, body }) => ({
        url: `/clients/${clientId}`,
        method: 'PUT',
        body,
      }),
    }),
    getClientById: builder.query({
      query: (clientId: string) => `/clients/${clientId}`,
    }),
    createClient: builder.mutation({
      query: (data) => ({
        url: '/clients',
        method: 'POST',
        body: data,
      }),
    }),
    removeClient: builder.mutation({
      query: (clientId: string) => ({
        url: `/clients/${clientId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useFetchClientsQuery,
  useUpdateClientMutation,
  useGetClientByIdQuery,
  useCreateClientMutation,
  useRemoveClientMutation,
} = clientApi;
