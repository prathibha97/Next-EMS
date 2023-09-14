import { Payroll } from '@prisma/client';
import { apiSlice } from './api';

export const payrollApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchPayrolls: builder.query<Payroll[], void>({
      query: () => '/payrolls',
    }),
    updatePayroll: builder.mutation<
      Payroll,
      { payrollId: string | undefined; body: Partial<Payroll> }
    >({
      query: ({ payrollId, body }) => ({
        url: `/payrolls/${payrollId}`,
        method: 'PUT',
        body,
      }),
    }),
    getPayrollById: builder.query({
      query: (payrollId: string) => `/payrolls/${payrollId}`,
    }),
    addPayroll: builder.mutation<
      Payroll,
      { employeeId: string | undefined; body: Partial<Payroll> }
    >({
      query: ({ employeeId, body }) => ({
        url: `/payrolls/new/${employeeId}`,
        method: 'POST',
        body: body,
      }),
    }),
    removePayroll: builder.mutation<void, string>({
      query: (payrollId) => ({
        url: `/payrolls/${payrollId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useFetchPayrollsQuery,
  useUpdatePayrollMutation,
  useGetPayrollByIdQuery,
  useAddPayrollMutation,
  useRemovePayrollMutation,
} = payrollApi;
