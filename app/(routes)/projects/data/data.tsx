import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CircleIcon,
  RocketIcon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from '@radix-ui/react-icons';

export const labels = [
  {
    value: 'NFT',
    label: 'NFT',
  },
  {
    value: 'Digital Arts',
    label: 'ART',
  },
  {
    value: 'Graphic Design',
    label: 'GRD',
  },
  {
    value: 'Web Development',
    label: 'WEB',
  },
  {
    value: 'Social Media Marketing',
    label: 'SME',
  },
];


export const statuses = [
  {
    value: 'ACTIVE',
    label: 'Active',
    icon: RocketIcon,
  },
  {
    value: 'INACTIVE',
    label: 'Inactive',
    icon: CircleIcon,
  },
  {
    value: 'ON_HOLD',
    label: 'On Hold',
    icon: StopwatchIcon,
  },
  {
    value: 'COMPLETED',
    label: 'Completed',
    icon: CheckCircledIcon,
  },
  {
    value: 'CANCELLED',
    label: 'Canceled',
    icon: CrossCircledIcon,
  },
];

export const taskStatuses = [
  {
    value: 'Backlog',
    label: 'Backlog',
    icon: QuestionMarkCircledIcon,
  },
  {
    value: 'Todo',
    label: 'Todo',
    icon: CircleIcon,
  },
  {
    value: 'In_Progress',
    label: 'In Progress',
    icon: StopwatchIcon,
  },
  {
    value: 'Done',
    label: 'Done',
    icon: CheckCircledIcon,
  },
  {
    value: 'Canceled',
    label: 'Canceled',
    icon: CrossCircledIcon,
  },
];

export const priorities = [
  {
    label: 'Low',
    value: 'Low',
    icon: ArrowDownIcon,
  },
  {
    label: 'Medium',
    value: 'Medium',
    icon: ArrowRightIcon,
  },
  {
    label: 'High',
    value: 'High',
    icon: ArrowUpIcon,
  },
];
