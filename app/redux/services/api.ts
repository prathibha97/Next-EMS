import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: `https://next-ems.vercel.app/api`,
  // prepareHeaders: (headers) => {
  //   // Add the access token to the headers
  //   const session = getSession();
  //   if (session) {
  //     headers.set('Authorization', `Bearer ${session.}`);
  //   }
  //   return headers;
  // },
});

export const apiSlice = createApi({
  baseQuery,
  endpoints: (builder) => ({}),
});
