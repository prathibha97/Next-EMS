import { Payroll } from '@prisma/client';
import { apiSlice } from './api';

export const payrollApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchPayrolls: builder.query<Payroll[], void>({
      query: () => '/payrolls',
    }),
    updatePayroll: builder.mutation<void, Partial<Payroll>>({
      query: (payrollData) => ({
        url: `/payrolls/${payrollData.id}`,
        method: 'PUT',
        body: payrollData,
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
  }),
});

export const {
  useFetchPayrollsQuery,
  useUpdatePayrollMutation,
  useGetPayrollByIdQuery,
  useAddPayrollMutation,
} = payrollApi;
