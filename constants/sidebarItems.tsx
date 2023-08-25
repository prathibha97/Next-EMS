import { IdCardIcon } from '@radix-ui/react-icons';
import {
  Briefcase,
  CalendarIcon,
  ClockIcon,
  HomeIcon,
  RocketIcon,
  SlidersHorizontal,
  Sparkles,
} from 'lucide-react';

export const sidebarItems = [
  {
    name: 'Home',
    icon: <HomeIcon className='h-6 w-6' />,
    link: '/dashboard',
  },
  {
    name: 'Profile',
    icon: <IdCardIcon className='h-6 w-6' />,
    link: '/profile',
  },
  {
    name: 'Tasks',
    icon: <RocketIcon className='h-6 w-6' />,
    link: '/tasks',
  },
  {
    name: 'TimeSheet',
    icon: <ClockIcon className='h-6 w-6' />,
    link: '/timesheet',
  },
  {
    name: 'Meetings',
    icon: <CalendarIcon className='h-6 w-6' />,
    link: '/meetings',
  },
  {
    name: 'Attendance Sheet',
    icon: <Briefcase className='h-6 w-6' />,
    link: '/attendance',
  },
  {
    name: 'Apply Leave',
    icon: <Sparkles className='h-6 w-6' />,
    link: '/leaves',
  },
  {
    name: 'Settings',
    icon: <SlidersHorizontal className='h-6 w-6' />,
    link: '/settings',
  },
] as const;
