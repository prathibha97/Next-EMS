'use client';

import ActionButton from '@/components/buttons/action-button';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Employee } from '@prisma/client';

import { DropdownMenuCheckboxItemProps } from '@radix-ui/react-dropdown-menu';

import {
  useMyMeetingQuery,
  useScheduleMeetingMutation,
} from '@/app/redux/services/meetingApi';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { toast } from '@/hooks/use-toast';
import {
  MeetingFormSchema,
  MeetingFormValues,
} from '@/lib/validation/meeting-form-validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { parseISO } from 'date-fns';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

type Checked = DropdownMenuCheckboxItemProps['checked'];

interface IEditMeetingProps {
  people: Employee[];
  meeting: any;
}

function EditMeeting({ people, meeting }: IEditMeetingProps) {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  const [checkedEmployees, setCheckedEmployees] = useState<
    Record<string, Checked>
  >(
    people.reduce((acc, person) => {
      // @ts-ignore
      acc[person.workEmail] = people.includes(person) ? true : false;
      return acc;
    }, {})
  );

  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true);
      setCheckedEmployees((prevState) =>
        people.reduce(
          (acc, person) => {
            acc[person.workEmail] = true; // Mark employees as checked if they are in `people`
            return acc;
          },
          { ...prevState }
        )
      );
    }
  }, [isMounted, people]);

  const startDateTime = parseISO(meeting.start.dateTime);
  const endDateTime = parseISO(meeting.end.dateTime);

  const form = useForm<MeetingFormValues>({
    resolver: zodResolver(MeetingFormSchema),
    defaultValues: {
      summary: meeting.summary,
      startDatetime: startDateTime.toISOString().slice(0, 16),
      endDatetime: endDateTime.toISOString().slice(0, 16),
      attendee: people.map((person) => person.workEmail),
    },
  });

  const handleEmployeeCheckboxChange = (employeeId: string) => {
    setCheckedEmployees((prevState) => ({
      ...prevState,
      [employeeId]: !prevState[employeeId],
    }));
  };
  const [scheduleMeeting, { isLoading }] = useScheduleMeetingMutation();
  // @ts-ignore
  const { refetch: refetchMeetings } = useMyMeetingQuery();

  const onSubmit = async (values: MeetingFormValues) => {
    try {
      const meeting = await scheduleMeeting({
        summary: values.summary,
        attendee: Object.keys(checkedEmployees).filter(
          (key) => checkedEmployees[key]
        ),
        startDatetime: new Date(values.startDatetime),
        endDatetime: new Date(values.endDatetime),
      }).unwrap();
      refetchMeetings();
      router.refresh();
      toast({
        title: 'Meeting Scheduled Successfully',
      });
    } catch (error: any) {
      toast({
        title: 'Something went wrong!',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size='icon' variant='ghost' className='w-full'>
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[525px] p-5'>
        <DialogHeader>
          <DialogTitle>Edit Meeting</DialogTitle>
          <DialogDescription>
            Update details of your your next meeting.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className='flex flex-col w-full gap-4'>
              <div className='w-full'>
                <Label>Meeting Summary</Label>
                <FormField
                  control={form.control}
                  name='summary'
                  render={({ field }) => (
                    <FormItem>
                      <Input className='w-full' {...field} />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className='w-full space-x-4'>
                <Label>Meeting Attendees</Label>
                <Controller
                  control={form.control}
                  name='attendee'
                  render={({ field }) => (
                    <FormItem>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant='outline'>
                            Click to view employees
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className='w-56'>
                          <DropdownMenuLabel>Select Employee</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          {people.map((person) => (
                            <DropdownMenuCheckboxItem
                              checked={checkedEmployees[person.workEmail]}
                              onCheckedChange={() =>
                                handleEmployeeCheckboxChange(person.workEmail)
                              }
                              key={person.id}
                              {...field}
                            >
                              {person.name}
                            </DropdownMenuCheckboxItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className='flex justify-between gap-4'>
                <div className='w-1/2'>
                  <Label>Start Date & Time</Label>
                  <FormField
                    control={form.control}
                    name='startDatetime'
                    render={({ field }) => (
                      <FormItem>
                        <Input
                          type='datetime-local'
                          className='w-full'
                          {...field}
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className='w-1/2'>
                  <Label>End Date & Time</Label>
                  <FormField
                    control={form.control}
                    name='endDatetime'
                    render={({ field }) => (
                      <FormItem>
                        <Input
                          type='datetime-local'
                          className='w-full'
                          {...field}
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
            <DialogFooter className='mt-5'>
              <ActionButton
                type='submit'
                label='Schedule'
                isLoading={isLoading}
              />
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default EditMeeting;
