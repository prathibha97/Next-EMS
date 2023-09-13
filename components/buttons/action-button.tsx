import { FC } from 'react';
import { Icons } from '../icons';
import { Button } from '../ui/button';

interface ActionButtonProps {
  isLoading?: boolean;
  variant?:
    | 'default'
    | 'secondary'
    | 'destructive'
    | 'ghost'
    | 'link'
    | 'outline';
  size?: 'sm' | 'lg' | 'default';
  onClick?: () => void;
  label: string;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

const ActionButton: FC<ActionButtonProps> = ({
  label,
  isLoading,
  onClick,
  size,
  variant,
  type,
  className
}) => {
  return (
    <Button variant={variant} size={size} onClick={onClick} type={type} className={className}>
      {isLoading && <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />}
      {label}
    </Button>
  );
};

export default ActionButton;
