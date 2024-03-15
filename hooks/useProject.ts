import { getAuthSession } from '@/app/api/auth/[...nextauth]/options';
import prisma from '@/lib/prisma';
import useEmployee from './useEmployee';

const useProject = () => {
  const getAllProjects = async () => {
    const projects = await prisma.project.findMany({
      include: {
        client: {
          select: {
            name: true,
          },
        },
      },
      orderBy:{
        createdAt: 'desc'
      }
    });
    return projects;
  };

  const getProjectById = async (projectId: string) => {
    const project = await prisma.project.findUnique({
      where: {
        id: projectId,
      },
      include: {
        client: {
          select: {
            name: true,
          },
        },
        projectAssignees: {
          include: {
            employee: {
              select: {
                name: true,
              },
            },
          },
        },
        tasks: {
          select: {
            taskId: true,
            title: true,
            label: true,
            description: true,
            status: true,
            priority: true,
          },
        },
      },
    });
    return project;
  };

  const getDashboardProjects = async () => {
    const projects = await prisma.project.findMany({
      include: {
        client: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 5,
    });
    return projects;
  };

  const getCurrentEmployeeProjects = async () => {
    const { getLoggedInEmployee } = useEmployee();
    const employee = await getLoggedInEmployee();
    const projects = await prisma.project.findMany({
      where: {
        projectAssignees: {
          some: {
            employee: {
              id: employee?.id,
            },
          },
        },
      },
      include: {
        client: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 5,
    });
    return projects;
  };
  const getProjectBoards = async () => {
    const { getLoggedInEmployee } = useEmployee();
    const employee = await getLoggedInEmployee();
    const projects = await prisma.project.findMany({
      where: {
        projectAssignees: {
          some: {
            employee: {
              id: employee?.id,
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return projects;
  };
  return {
    getAllProjects,
    getProjectById,
    getDashboardProjects,
    getCurrentEmployeeProjects,
    getProjectBoards,
  };
};

export default useProject;
