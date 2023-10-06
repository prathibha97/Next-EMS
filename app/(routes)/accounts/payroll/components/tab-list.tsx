import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import Image from 'next/image';

const TabList = () => {
  return (
    <TabsList className='bg-[#f1f5f9] h-[80px]'>
      <TabsTrigger
        className='w-28 h-16 data-[state=active]:border-b-4 border-[#2ebdaa] bg-white p-2 m-4'
        value='all'
      >
        <div className='flex gap-2'>
          <div>
            <Image
              src='/icons/department/all-icon.png'
              alt='Image 1'
              width={25}
              height={25}
            />
          </div>
          <div className='my-auto'>All</div>
        </div>
      </TabsTrigger>

      <TabsTrigger
        className='w-28 h-16 data-[state=active]:border-b-4 border-[#2ebdaa] bg-white p-2 m-4 '
        value='software'
      >
        <div className='flex gap-2'>
          <div>
            <Image
              src='/icons/department/software-icon.png'
              alt='Image 1'
              width={35}
              height={35}
            />
          </div>
          <div className='my-auto'>Software</div>
        </div>
      </TabsTrigger>

      <TabsTrigger
        className='w-28 h-16 data-[state=active]:border-b-4 border-[#2ebdaa] bg-white p-2 m-4'
        value='hr'
      >
        <div className='flex gap-2'>
          <div>
            <Image
              src='/icons/department/hr-new-icon.png'
              alt='Image 2'
              width={35}
              height={35}
            />
          </div>
          <div className='my-auto'>HR</div>
        </div>
      </TabsTrigger>

      <TabsTrigger
        className='w-28 h-16 data-[state=active]:border-b-4 border-[#2ebdaa] bg-white p-2 m-4'
        value='DigitalArts'
      >
        <div className='flex gap-2'>
          <div>
            <Image
              src='/icons/department/digital-artist-icon.png'
              alt='Image 1'
              width={35}
              height={35}
            />
          </div>
          <div className='my-auto'>
            Digital <br></br> Artists
          </div>
        </div>
      </TabsTrigger>

      <TabsTrigger
        className='w-28 h-16 data-[state=active]:border-b-4 border-[#2ebdaa] bg-white p-2 m-4'
        value='Marketing'
      >
        <div className='flex gap-2'>
          <div>
            <Image
              src='/icons/department/all-icon.png'
              alt='Image 1'
              width={35}
              height={35}
            />
          </div>
          <div className='my-auto'>Marketing</div>
        </div>
      </TabsTrigger>
    </TabsList>
  );
};

export default TabList;
