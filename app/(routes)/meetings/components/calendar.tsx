'use client';
import { useGetEmployeesQuery } from '@/app/redux/services/employeeApi';
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isEqual,
  isSameDay,
  isSameMonth,
  isToday,
  parse,
  parseISO,
  startOfToday,
} from 'date-fns';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { useState } from 'react';
import Meetings from './meeting';
import ScheduleMeeting from './schedule-meeting';
import { Button } from '@/components/ui/button';

function classNames(...classes: (string | boolean)[]): string {
  return classes.filter(Boolean).join(' ');
}


function Calendar() {
  const today = startOfToday();
  const [selectedDay, setSelectedDay] = useState(today);
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy'));

  const firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date());

  // Define a state variable to keep track of whether new meetings have been added or removed
  const [meetingChangeCount, setMeetingChangeCount] = useState(0);

  // const { data: meetings, refetch: refetchMeetings } = useMyMeetingQuery({
  //   refetchOnMountOrArgChange: true,
  //   refetchOnReconnect: true,
  //   refetchOnFocus: true,
  //   refetchOnWindowFocus: true,
  // });

  const meetings = [];
  const { data: employees, isLoading } = useGetEmployeesQuery();

  // Second useEffect hook to get meetings again and reset meetingChangeCount
  // useEffect(() => {
  //   if (meetingChangeCount > 0) {
  //     refetchMeetings();
  //     setMeetingChangeCount(0);
  //   }
  // }, [meetingChangeCount]);

  const days = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: endOfMonth(firstDayCurrentMonth),
  });

  function previousMonth() {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'));
  }

  function nextMonth() {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'));
  }

  const selectedDayMeetings = meetings?.filter((meeting) =>
    isSameDay(parseISO(meeting?.start?.dateTime), selectedDay)
  );

  const handleMeetingCancel = async (id) => {
    // try {
    //   const res = await cancelMeeting({ id }).unwrap();
    //   dispatch(setcancelMeeting({ meetingId: res._id }));
    //   setMeetingChangeCount(prev => prev + 1);
    //   setAlert({ open: true, message: 'Meeting Cancelled Successfully', severity: 'success' });
    // } catch (err) {
    //   setAlert({ open: true, message: err.response.data.message, severity: 'error' });
    // }
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

  const handleSubmit = async () =>
    // summary,
    // selectedPeople,
    // startValue,
    // endValue
    {
      // try {
      //   const meeting = await scheduleMeeting({ summary, attendee: selectedPeople.map((person) => person.email), startDatetime: startValue, endDatetime: endValue }).unwrap()
      //   dispatch(setScheduleMeeting({ meeting }))
      //   setMeetingChangeCount(prev => prev + 1);
      //   setAlert({ open: true, message: `meeting scheduled with ${selectedPeople?.map((person) => person?.name?.first)} ${selectedPeople?.map((person) => person?.name?.last)} on ${startValue} to ${endValue}`, severity: 'success' });
      // } catch (err) {
      //   setAlert({ open: true, message: error?.data?.messeage, severity: 'error' });
      // }
      // setIsOpen(false)
    };

  const colStartClasses = [
    '',
    'col-start-2',
    'col-start-3',
    'col-start-4',
    'col-start-5',
    'col-start-6',
    'col-start-7',
  ];

  // if (isCancelMeetingLoading) return <Loader />;
  if (isLoading) return <p>Loading...</p>;

  return (
    <div className=' pt-12'>
      <div className='max-w-md px-4 sm:px-7 md:max-w-4xl md:px-6'>
        <div className='md:grid md:grid-cols-2 md:divide-x md:divide-gray-200'>
          <div className='md:pr-14'>
            <div className='flex items-center'>
              <h2 className='flex-auto font-semibold text-gray-900'>
                {format(firstDayCurrentMonth, 'MMMM yyyy')}
              </h2>
              <button
                type='button'
                onClick={previousMonth}
                className='-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500'
              >
                <span className='sr-only'>Previous month</span>
                <ChevronLeft className='w-5 h-5 text-red-500' />
              </button>
              <button
                onClick={nextMonth}
                type='button'
                className='-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500'
              >
                <span className='sr-only'>Next month</span>

                <ChevronRight className='w-5 h-5 text-red-500' />
              </button>
            </div>
            <div className='grid grid-cols-7 mt-10 text-xs leading-6 text-center text-gray-500'>
              <div>S</div>
              <div>M</div>
              <div>T</div>
              <div>W</div>
              <div>T</div>
              <div>F</div>
              <div>S</div>
            </div>
            <div className='grid grid-cols-7 mt-2 text-sm'>
              {days.map((day, dayIdx) => (
                <div
                  key={day.toString()}
                  className={classNames(
                    dayIdx === 0 && colStartClasses[getDay(day)],
                    'py-1.5'
                  )}
                >
                  <button
                    type='button'
                    onClick={() => setSelectedDay(day)}
                    className={classNames(
                      isEqual(day, selectedDay) && 'text-white',
                      !isEqual(day, selectedDay) &&
                        isToday(day) &&
                        'text-red-500',
                      !isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        isSameMonth(day, firstDayCurrentMonth) &&
                        'text-gray-900',
                      !isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        !isSameMonth(day, firstDayCurrentMonth) &&
                        'text-gray-400',
                      isEqual(day, selectedDay) && isToday(day) && 'bg-red-500',
                      isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        'bg-gray-900',
                      !isEqual(day, selectedDay) && 'hover:bg-gray-200',
                      (isEqual(day, selectedDay) || isToday(day)) &&
                        'font-semibold',
                      'mx-auto flex h-8 w-8 items-center justify-center rounded-full'
                    )}
                  >
                    <time dateTime={format(day, 'yyyy-MM-dd')}>
                      {format(day, 'd')}
                    </time>
                  </button>

                  <div className='w-1 h-1 mx-auto mt-1'>
                    {meetings?.some((meeting) =>
                      isSameDay(parseISO(meeting.start.dateTime), day)
                    ) ? (
                      <div className='w-1 h-1 rounded-full bg-sky-500' />
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <section className='mt-12 md:mt-0 md:pl-10'>
            <div className='flex items-center justify-between'>
              <h2 className='font-semibold text-gray-900'>
                Schedule for{' '}
                <time dateTime={format(selectedDay, 'yyyy-MM-dd')}>
                  {format(selectedDay, 'MMM dd, yyy')}
                </time>
              </h2>
              <ScheduleMeeting
              // isOpen={isOpen}
              // setIsOpen={setIsOpen}
              // selectedDay={selectedDay}
              // people={employees}
              // handleSubmit={handleSubmit}
              />
            </div>
            <div>
              <ol className='mt-4 space-y-1 text-sm leading-6 text-gray-500'>
                {selectedDayMeetings?.length > 0 ? (
                  selectedDayMeetings?.map((meeting) => (
                    <Meetings
                    // meeting={meeting}
                    // key={meeting.id}
                    // handleMeetingCancel={handleMeetingCancel}
                    // currentUser={user}
                    // handleMeetingEdit={handleMeetingEdit}
                    // people={employees}
                    />
                  ))
                ) : (
                  <p>No meetings for today.</p>
                )}
              </ol>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Calendar;
