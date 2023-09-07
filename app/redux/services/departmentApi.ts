import { Department } from '@prisma/client';
import { apiSlice } from './api';

export const departmentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDepartments: builder.query<Department[], void>({
      query: () => '/departments',
    }),
    getDepartmentById: builder.query<Department, { departmentId: string }>({
      query: ({ departmentId }) => `/departments/${departmentId}`,
    }),
    addDepartment: builder.mutation<Department, Partial<Department>>({
      query: (body) => ({
        url: '/departments',
        method: 'POST',
        body,
      }),
    }),
    updateDepartment: builder.mutation<
      Department,
      { departmentId: string | undefined; body: Partial<Department> }
    >({
      query: ({ departmentId, body }) => ({
        url: `/departments/${departmentId}`,
        method: 'PUT',
        body,
      }),
    }),
    removeEmployeeFromDepartment: builder.mutation<
      void,
      { departmentId: string; employeeId: string }
    >({
      query: ({ departmentId, employeeId }) => ({
        url: `/departments/${departmentId}/employees/${employeeId}`,
        method: 'DELETE',
      }),
    }),
    removeDepartment: builder.mutation<void, { departmentId: string }>({
      query: ({ departmentId }) => ({
        url: `/departments/${departmentId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetDepartmentsQuery,
  useGetDepartmentByIdQuery,
  useAddDepartmentMutation,
  useUpdateDepartmentMutation,
  useRemoveEmployeeFromDepartmentMutation,
  useRemoveDepartmentMutation,
} = departmentApi;
