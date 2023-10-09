import { apiSlice } from './api';

export const meetingApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    myMeeting: builder.query({
      query: () => ({
        url: `/google/get_events`,
      }),
    }),
    scheduleMeeting: builder.mutation({
      query: (meeting) => ({
        url: `/google/schedule_event`,
        method: 'POST',
        body: { ...meeting },
      }),
    }),
    cancelMeeting: builder.mutation({
      query: ({ id }) => ({
        url: `/google/${id}`,
        method: 'DELETE',
      }),
    }),
    updateMeeting: builder.mutation({
      query: ({ id, meeting }) => ({
        url: `/google/${id}`,
        method: 'PUT',
        body: { ...meeting },
      }),
    }),
  }),
});

export const {
  useMyMeetingQuery,
  useScheduleMeetingMutation,
  useCancelMeetingMutation,
  useUpdateMeetingMutation,
} = meetingApi;
