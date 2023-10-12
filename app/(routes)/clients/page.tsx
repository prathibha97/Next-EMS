import useClient from '@/hooks/useClient';
import ViewClients from './components/view-clients';

export const revalidate = 0;
const ClientPage = async () => {
  const { getAllClients } = useClient();
  const clients = await getAllClients();
  return (
    <div>
      <ViewClients clients={clients} />
    </div>
  );
};

export default ClientPage;
