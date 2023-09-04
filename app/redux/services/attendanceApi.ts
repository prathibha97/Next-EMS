import { Attendance } from '@prisma/client';
import { apiSlice } from './api';

export const attendanceApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchAttendance: builder.query<Attendance[], void>({
      query: () => '/attendance',
    }),
    updateAttendance: builder.mutation<void, Partial<Attendance>>({
      query: (attendanceData) => ({
        url: `/attendance/${attendanceData.id}`,
        method: 'PUT',
        body: attendanceData,
      }),
    }),
    getAttendanceById: builder.query({
      query: (employeeId:string) => `/attendance/${employeeId}`,
    }),
    markAttendance: builder.mutation({
      query: (data) => ({
        url: '/attendance',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {
  useFetchAttendanceQuery,
  useUpdateAttendanceMutation,
  useGetAttendanceByIdQuery,
  useMarkAttendanceMutation,
} = attendanceApi;
