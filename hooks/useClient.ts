import prisma from '@/lib/prisma';

const useClient = () => {
  const getAllClients = async () => {
    const clients = await prisma.client.findMany({});
    return clients;
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
  return { getAllClients, getClientById };
};

export default useClient;
