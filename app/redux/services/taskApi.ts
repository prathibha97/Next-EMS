import { Task } from '@prisma/client';
import { apiSlice } from './api';

export const taskApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchTasks: builder.query<Task[], void>({
      query: () => '/tasks',
    }),
    updateTask: builder.mutation<
      Task,
      { taskId: string | undefined; body: Partial<Task> }
    >({
      query: ({ taskId, body }) => ({
        url: `/tasks/${taskId}`,
        method: 'PUT',
        body,
      }),
    }),
    getTaskById: builder.query({
      query: (taskId: string) => `/tasks/${taskId}`,
    }),
    createTask: builder.mutation({
      query: (data) => ({
        url: '/tasks',
        method: 'POST',
        body: data,
      }),
    }),
    removeTask: builder.mutation({
      query: (taskId: string) => ({
        url: `/tasks/${taskId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useFetchTasksQuery,
  useUpdateTaskMutation,
  useGetTaskByIdQuery,
  useCreateTaskMutation,
  useRemoveTaskMutation,
} = taskApi;
