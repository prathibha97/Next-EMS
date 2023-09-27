import { Employee, Leave } from '@prisma/client';
import { apiSlice } from './api';

export const leaveApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllLeaves: builder.query<Leave[], void>({
      query: () => '/leaves',
    }),
    getLeavesByEmployeeId: builder.query<Leave, { employeeId: string }>({
      query: ({ employeeId }) => `/leaves/employee/${employeeId}`,
    }),

    createLeaveRequest: builder.mutation<Leave, Partial<Leave>>({
      query: (body) => ({
        url: '/leaves',
        method: 'POST',
        body,
      }),
    }),
    updateLeaveRequest: builder.mutation<
      Leave,
      { leaveId: string | undefined; body: Partial<Leave> }
    >({
      query: ({ leaveId, body }) => ({
        url: `/leaves/${leaveId}`,
        method: 'PUT',
        body,
      }),
    }),
    removeLeaveRequest: builder.mutation<Leave, { leaveId: string }>({
      query: ({ leaveId }) => ({
        url:`/leaves/${leaveId}`,
        method: 'DELETE'
      }),
    }),
  }),
});

export const {
  useGetAllLeavesQuery,
  useGetLeavesByEmployeeIdQuery,
  useCreateLeaveRequestMutation,
  useUpdateLeaveRequestMutation,
  useRemoveLeaveRequestMutation
} = leaveApi;
