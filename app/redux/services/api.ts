import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: `http://localhost:3000/api`,
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

// prepareHeaders: (headers) => {
//   // Add the access token to the headers
//   const session = getSession();
//   if (session) {
//     headers.set('Authorization', `Bearer ${session.}`);
//   }
//   return headers;
// },1234567890

//abcdasfsd
