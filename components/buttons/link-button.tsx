'use client';
import { useRouter } from 'next/navigation';
import { FC } from 'react';
import { Icons } from '../icons';
import { Button } from '../ui/button';

interface LinkButtonProps {
  isLoading?: boolean;
  variant?:
    | 'default'
    | 'secondary'
    | 'destructive'
    | 'ghost'
    | 'link'
    | 'outline';
  size?: 'sm' | 'lg' | 'default';
  link: string;
  label: string;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  
}

const LinkButton: FC<LinkButtonProps> = ({
  label,
  isLoading,
  size,
  link,
  variant,
  type,
  className,
}) => {
  const router = useRouter();
  return (
    <Button
      variant={variant}
      size={size}
      onClick={() => router.push(link)}
      type={type}
      className={className}
    >
      {isLoading && <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />}
      {label}
    </Button>
  );
};

export default LinkButton;
