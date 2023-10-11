import useClient from '@/hooks/useClient';
import { FC } from 'react';
import ViewClient from './components/view-client';

interface ClientIdPageProps {
  params: {
    clientId: string;
  };
}

export const revalidate = 0;

const ClientIdPage: FC<ClientIdPageProps> = async ({ params }) => {
  const { getClientById } = useClient();
  const client = await getClientById(params.clientId);
  return (
    <div>
      <ViewClient client={client}/>
    </div>
  );
};

export default ClientIdPage;
