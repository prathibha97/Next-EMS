import { Employee } from '@prisma/client';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const employeeApi = createApi({
  reducerPath: 'employeeApi',
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/api',
  }),
  endpoints: (builder) => ({
    getEmployees: builder.query<Employee[], void>({
      query: () => '/employees',
    }),
    getEmployeeById: builder.query<Employee, { employeeId: string }>({
      query: ({ employeeId }) => `/employees/${employeeId}`,
    }),
    addEmployee: builder.mutation<Employee, Partial<Employee>>({
      query: (body) => ({
        url: '/employees',
        method: 'POST',
        body,
      }),
    }),
    updateEmployee: builder.mutation<
      Employee,
      { employeeId: string; body: Partial<Employee> }
    >({
      query: ({ employeeId, body }) => ({
        url: `/employees/${employeeId}`,
        method: 'PUT',
        body,
      }),
    }),
  }),
});

export const {
  useGetEmployeesQuery,
  useGetEmployeeByIdQuery,
  useAddEmployeeMutation,
  useUpdateEmployeeMutation,
} = employeeApi;
