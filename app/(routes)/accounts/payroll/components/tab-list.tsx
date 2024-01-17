import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Department } from '@prisma/client';

import { FC } from 'react';

interface TablistProps {
  departments: Department[];
}
const TabList: FC<TablistProps> = ({ departments }) => {
  return (
    <TabsList className='bg-[#f1f5f9] h-[80px]'>
      <TabsTrigger
        className='w-full data-[state=active]:border-b-4 border-[#2ebdaa] bg-white p-2 m-4 rounded-md'
        value='all'
      >
        <div className='flex gap-2'>
          <div className='my-auto'>All</div>
        </div>
      </TabsTrigger>
      {departments?.map((department) => (
        <TabsTrigger
          key={department.id}
          className='w-full data-[state=active]:border-b-4 border-[#2ebdaa] bg-white p-2 m-4 rounded-md'
          value={department.id}
        >
          <div className='flex gap-2'>
            <div className='my-auto'>{department.name}</div>
          </div>
        </TabsTrigger>
      ))}
    </TabsList>
  );
};

export default TabList;
