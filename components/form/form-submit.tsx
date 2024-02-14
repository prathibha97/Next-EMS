'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { FC } from 'react';
import { useFormStatus } from 'react-dom';

interface FormSubmitProps {
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link'
    | 'primary';
}

export const FormSubmit: FC<FormSubmitProps> = ({
  children,
  className,
  disabled,
  variant='primary',
}) => {
  const { pending } = useFormStatus();
  return (
    <Button
      disabled={disabled || pending}
      type='submit'
      variant={variant}
      size='sm'
      className={cn(className)}
    >
      {children}
    </Button>
  );
};
