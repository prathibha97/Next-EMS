import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import { FC } from 'react';

interface HintProps {
  children: React.ReactNode;
  description?: string;
  side?: 'left' | 'right' | 'top' | 'bottom';
  sideOffset?: number;
}

export const Hint: FC<HintProps> = ({
  children,
  description,
  side = 'bottom',
  sideOffset = 0,
}) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent
          side={side}
          sideOffset={sideOffset}
          className='text-xs max-w-[220px] break-words'
        >
          {description}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
