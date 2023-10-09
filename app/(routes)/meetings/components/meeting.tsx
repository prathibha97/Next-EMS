'use client';
import {
  useCancelMeetingMutation,
  useMyMeetingQuery,
} from '@/app/redux/services/meetingApi';
import { EmployeeHoverCard } from '@/components/cards/employee-hover-card';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from '@/hooks/use-toast';

import { EmployeeWithLeaveBalance } from '@/types';
import { Employee } from '@prisma/client';
import { format, parseISO } from 'date-fns';
import { MoreHorizontal } from 'lucide-react';
import { useRouter } from 'next/navigation';
import EditMeeting from './edit-meeting';

interface IMeetingProps {
  meeting: any;
  currentUser: EmployeeWithLeaveBalance;
  people: Employee[];
}
const Meeting = ({ currentUser, meeting, people }: IMeetingProps) => {
  const router = useRouter();
  const [cancelMeeting] = useCancelMeetingMutation();
  // @ts-ignore
  const { refetch: refetchMeetings } = useMyMeetingQuery();

  const startDateTime = parseISO(meeting.start.dateTime);
  const endDateTime = parseISO(meeting.end.dateTime);

  const isCreator = meeting?.organizer?.email === currentUser?.workEmail;

  const handleJoinMeeting = () => {
    window.open(meeting.hangoutLink, '_blank');
  };
  const handleGoogleCalendar = () => {
    window.open(meeting.htmlLink, '_blank');
  };

  const handleMeetingCancel = async (id: string) => {
    try {
      const res = await cancelMeeting({ id }).unwrap();
      toast({
        title: 'Meeting Canceled Successfully',
      });
      refetchMeetings();
      router.refresh();
    } catch (error: any) {
      toast({
        title: 'Something went wrong!',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const handleMeetingEdit = () =>
    // id,
    // summary,
    // selectedPeople,
    // startValue,
    // endValue
    {
      // try {
      //   dispatch(editMeeting(id, summary, selectedPeople.map((person) => person.email), startValue, endValue));
      //   setMeetingChangeCount(prev => prev + 1);
      //   setAlert({ open: true, message: 'Meeting Edited Successfully', severity: 'success' });
      // } catch (err) {
      //   setAlert({ open: true, message: err.response.data.message, severity: 'error' });
      // }
    };

  return (
    <li>
      <Card>
        <CardHeader>
          <CardTitle className='flex justify-between'>
            <div className='text-2xl'>{meeting.summary}</div>
            {isCreator && (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <MoreHorizontal />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem asChild>
                    <EditMeeting meeting={meeting} people={people} />
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className='flex text-red-500 text-center w-full'
                    onClick={() => handleMeetingCancel(meeting.id)}
                  >
                    Cancel
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </CardTitle>
          <CardDescription>
            <p>Organized by: {meeting.organizer.email}</p>
            <p>
              Duration:{' '}
              <time dateTime={meeting.startDatetime}>
                {format(startDateTime, 'h:mm a')}{' '}
              </time>{' '}
              -{' '}
              <time dateTime={meeting.end.dateTime}>
                {format(endDateTime, 'h:mm a')}{' '}
              </time>{' '}
            </p>
            <p>
              Attendees:
              {people.map((person) => (
                <EmployeeHoverCard key={person.id} employee={person} />
              ))}
            </p>
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-3'>
          <Button variant={'secondary'} onClick={handleJoinMeeting}>
            Join Meeting
          </Button>
          <Button variant={'outline'} onClick={handleGoogleCalendar}>
            View in Google Calendar
          </Button>
        </CardContent>
      </Card>
    </li>
  );
};

export default Meeting;
