import { Project } from '@prisma/client';
import { apiSlice } from './api';

export const projectApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchProjects: builder.query<Project[], void>({
      query: () => '/projects',
    }),
    updateProject: builder.mutation<
      Project,
      { projectId: string | undefined; body: Partial<Project> }
    >({
      query: ({ projectId, body }) => ({
        url: `/projects/${projectId}`,
        method: 'PUT',
        body,
      }),
    }),
    getProjectById: builder.query({
      query: (projectId: string) => `/projects/${projectId}`,
    }),
    createProject: builder.mutation({
      query: (data) => ({
        url: '/projects',
        method: 'POST',
        body: data,
      }),
    }),
    removeProject: builder.mutation({
      query: (projectId: string) => ({
        url: `/projects/${projectId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useFetchProjectsQuery,
  useUpdateProjectMutation,
  useGetProjectByIdQuery,
  useCreateProjectMutation,
  useRemoveProjectMutation,
} = projectApi;
