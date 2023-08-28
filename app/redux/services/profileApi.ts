import { Employee } from '@prisma/client';
import { apiSlice } from './api';

export const profileApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserProfile: builder.query<Employee[], void>({
      query: () => '/profile',
    }),
  }),
});

export const { useGetUserProfileQuery } = profileApi;
