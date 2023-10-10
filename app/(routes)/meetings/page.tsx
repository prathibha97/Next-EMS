import useEmployee from '@/hooks/useEmployee';
import Calendar from './components/calendar';
import GoogleLoginButton from './components/google-login-button';

export const revalidate = 0;

const MeetingsPage = async () => {
  const { getAllEmployees,getLoggedInEmployee } = useEmployee();
  const employees = await getAllEmployees();

  const currentUser = await getLoggedInEmployee();

  return (
    <div className='w-full h-full m-auto'>
      <GoogleLoginButton />
      <Calendar employees={employees} currentUser={currentUser}/>
    </div>
  );
};

export default MeetingsPage;
