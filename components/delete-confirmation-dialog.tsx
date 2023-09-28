'use client';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { FC } from 'react';
// import { Input } from './ui/input';
import { Label } from './ui/label';

interface DeleteConfirmationDialogProps {
  onClick: () => void;
  label: string;
}

const DeleteConfirmationDialog: FC<DeleteConfirmationDialogProps> = ({
  onClick,
  label,
}) => {
  // const [remark, setRemark] = useState('');
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Label className='text-red-500 cursor-pointer mt-1 pl-2 p-2 min-w-full rounded hover:bg-slate-100 dark:hover:bg-slate-700/40 dark:hover:text-white'>
          {label}
        </Label>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete data from
            our servers.
          </AlertDialogDescription>
          {/* {label === 'Reject leave' && (
              <Input
                className='w-full'
                placeholder='Add remark...'
                value={remark}
                onChange={(e) => {
                  console.log(e.target.value);
                  setRemark(e.target.value);
                }}
              />
            )} */}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onClick}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteConfirmationDialog;
