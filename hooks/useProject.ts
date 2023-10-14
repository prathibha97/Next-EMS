import prisma from '@/lib/prisma';

const useProject = () => {
  const getAllProjects = async () => {
    const projects = await prisma.project.findMany({
      include: {
        client: {
          select: {
            name: true
          }
        },
      },
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
        projectAssignees:{
          include:{
            employee:{
              select:{
                name: true,
              }
            }
          }
        },
        tasks: {
          select:{
            taskId:true,
            title:true,
            label:true,
            description:true,
            status:true,
            priority:true
          }
        }
      },
    });
    return project;
  };
  return { getAllProjects, getProjectById };
};

export default useProject;
