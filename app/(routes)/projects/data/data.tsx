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

export const priorities = [
  {
    label: 'Low',
    value: 'low',
    icon: ArrowDownIcon,
  },
  {
    label: 'Medium',
    value: 'medium',
    icon: ArrowRightIcon,
  },
  {
    label: 'High',
    value: 'high',
    icon: ArrowUpIcon,
  },
];
