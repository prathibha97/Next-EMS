// Import necessary dependencies
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { TaskWork } from '@prisma/client';
import { format } from 'date-fns';
import { Dispatch, FC, SetStateAction } from 'react';

interface ViewTimeLogProps {
  isOpen: boolean;
  timeLog: TaskWork;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const ViewTimeLog: FC<ViewTimeLogProps> = ({ isOpen, setIsOpen, timeLog }) => {
  const formattedDate = format(timeLog.date, 'dd MMMM yyyy');
  const formattedStartTime = format(timeLog.startTime, 'HH:mm');
  const formattedEndTime = format(timeLog.endTime, 'HH:mm');

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant='outline' className='mb-4'>
          View Time Record
        </Button>
      </DialogTrigger>
      <DialogContent className='bg-white rounded-lg shadow-lg p-8 sm:max-w-[425px] '>
        <DialogHeader>
          <DialogTitle className='text-2xl font-bold mb-4'>
            View Time Record
          </DialogTitle>
        </DialogHeader>
        <div className='mb-4'>
          <p className=' font-semibold'>Date:</p>
          <p>{formattedDate}</p>
        </div>
        <div className='mb-4'>
          <p className=' font-semibold'>Start Time:</p>
          <p>{formattedStartTime}</p>
        </div>
        <div className='mb-4'>
          <p className=' font-semibold'>End Time:</p>
          <p>{formattedEndTime}</p>
        </div>
        <div className='mb-4'>
          <p className=' font-semibold'>Hours Worked:</p>
          <p>{timeLog.hoursWorked}</p>
        </div>
        <div className='mb-4'>
          <p className=' font-semibold'>Work Performed:</p>
          <p>{timeLog.description}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewTimeLog;
