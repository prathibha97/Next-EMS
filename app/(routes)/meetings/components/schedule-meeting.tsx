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
import { Plus } from 'lucide-react';

import { DropdownMenuCheckboxItemProps } from '@radix-ui/react-dropdown-menu';

import { useScheduleMeetingMutation } from '@/app/redux/services/meetingApi';
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
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

type Checked = DropdownMenuCheckboxItemProps['checked'];

interface IMeetingScheduleMeetingProps {
  people: Employee[];
  selectedDay: Date;
  updateMeetings: Dispatch<SetStateAction<boolean>>;
}

function ScheduleMeeting({
  people,
  selectedDay,
  updateMeetings,
}: IMeetingScheduleMeetingProps) {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [checkedEmployees, setCheckedEmployees] = useState<
    Record<string, Checked>
  >(
    people.reduce((acc, person) => {
      // @ts-ignore
      acc[person.workEmail] = false; // Initialize all employees as unchecked
      return acc;
    }, {})
  );

  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true);
    }
  }, [isMounted]);

  const form = useForm<MeetingFormValues>({
    resolver: zodResolver(MeetingFormSchema),
    defaultValues: {
      summary: '',
      startDatetime: selectedDay.toISOString().slice(0, 16),
      endDatetime: new Date(selectedDay.getTime() + 60 * 60 * 1000)
        .toISOString()
        .slice(0, 16), // Adding one hour (60 minutes * 60 seconds * 1000 milliseconds),
      attendee: [],
    },
  });

  const handleEmployeeCheckboxChange = (employeeId: string) => {
    setCheckedEmployees((prevState) => ({
      ...prevState,
      [employeeId]: !prevState[employeeId],
    }));
  };
  const [scheduleMeeting, { isLoading }] = useScheduleMeetingMutation();

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
      router.refresh();
      toast({
        title: 'Meeting Scheduled Successfully',
      });
      // Trigger update in parent component
      if (updateMeetings) {
        updateMeetings(true); // Reset to false after triggering update
      }
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
        <Button size='icon' variant='ghost'>
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[525px] p-5'>
        <DialogHeader>
          <DialogTitle>Schedule New Meeting</DialogTitle>
          <DialogDescription>
            Select attendees and date to schedule your next meeting.
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

export default ScheduleMeeting;
