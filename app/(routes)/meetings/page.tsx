import useEmployee from '@/hooks/useEmployee';
import Calendar from './components/calendar';
import GoogleLoginButton from './components/google-login-button';
import { useMeetings } from '@/hooks/useMeetings';

export const revalidate = 0;

const MeetingsPage = async () => {
  const { getAllEmployees,getLoggedInEmployee } = useEmployee();
  const { getUserMeetings } = useMeetings();

  const employees = await getAllEmployees();

  const currentUser = await getLoggedInEmployee();

  const userMeetings = await getUserMeetings();

  return (
    <div className='w-full h-full m-auto'>
      <GoogleLoginButton />
      <Calendar
        employees={employees}
        // @ts-ignore
        currentUser={currentUser}
        userMeetings={userMeetings}
      />
    </div>
  );
};

export default MeetingsPage;
