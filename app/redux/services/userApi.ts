import { User } from '@prisma/client';
import { apiSlice } from './api';

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => '/users',
    }),
    getUserById: builder.query<User, { userId: string }>({
      query: ({ userId }) => `/users/${userId}`,
    }),
    updateUser: builder.mutation<
      User,
      { userId: string | undefined; body: Partial<User> }
    >({
      query: ({ userId, body }) => ({
        url: `/users/${userId}`,
        method: 'PUT',
        body,
      }),
    }),
    removeUser: builder.mutation({
      query: (userId: string) => ({
        url: `/users/${userId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useRemoveUserMutation,
} = userApi;
