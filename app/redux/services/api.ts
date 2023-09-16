import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: `https://next-ems.vercel.app/api`,
});

export const apiSlice = createApi({
  baseQuery,
  endpoints: (builder) => ({}),
});