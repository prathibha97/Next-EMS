import prisma from '@/lib/prisma';

const useDepartments = () => {
  const getAllDepartments = async () => {
    const departments = await prisma.department.findMany({
      include:{
        employees:true,
        manager:true,
      }
    });
    return departments;
  };

  const getClientById = async (clientId: string) => {
    const client = await prisma.client.findUnique({
      where: {
        id: clientId,
      },
      include: {
        projects: true,
      },
    });
    return client;
  };
  return { getAllDepartments, getClientById };
};

export default useDepartments;
