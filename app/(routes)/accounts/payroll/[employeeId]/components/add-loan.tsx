'use client';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { FC } from 'react';

import { Button } from '@/components/ui/button';

interface AddLoanProps {}

const AddLoan: FC<AddLoanProps> = ({}) => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button>Add Loan</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AddLoan;
