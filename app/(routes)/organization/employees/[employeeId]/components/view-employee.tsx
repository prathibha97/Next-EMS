'use client';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Pencil } from 'lucide-react';
import Image from 'next/image';
import { FC } from 'react';
import HRSettings from './hr-settings';
import PrivateInfo from './private-info';
import WorkInfo from './work-info';
import { Employee } from '@prisma/client';
import { useRouter } from 'next/navigation';

interface ViewEmployeeProps {
  employee: Employee | null;
}

const ViewEmployee: FC<ViewEmployeeProps> = ({ employee }) => {
  const router = useRouter();
  return (
    <div className='p-5 md:p-10'>
      <div className="flex flex-col w-full border p-5 rounded-lg dark:bg-gray-800/40">
        <div>
          <div className="flex flex-col-reverse md:flex-row justify-center md:justify-between">
            <div className="flex flex-col">
              <h1 className="text-2xl md:text-3xl font-semibold">
                {employee?.name || 'Employee Name'}
              </h1>
              <h2 className="mt-2 text-xl text-gray-500 dark:text-gray-300">
                {employee?.position || 'Position'}
              </h2>
            </div>
            <div className='flex justify-center'>
              <Image
                src={employee?.profile_photo || '/prathibha.jpg'}
                alt="Image"
                width={100}
                height={100}
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-2 justify-between mt-5">
          <div className="flex flex-col gap-2">
            <span>
              Work Mobile:{' '}
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {employee?.workMobile || 'Work Mobile not specified'}
              </span>
            </span>
            <span>
              Personal Mobile:{' '}
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {' '}
                {employee?.personalMobile || 'Personal Mobile not specified'}
              </span>
            </span>
            <span>
              Work Email:{' '}
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {employee?.workEmail || 'prathibha@sphiriadigital.com'}
              </span>
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <span>
              Department:{' '}
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {(employee &&
                  // @ts-ignore
                  employee.Department?.map(
                    (department) => department.name
                  ).join(' ,')) ||
                  `Department not specified`}
              </span>
            </span>
            <span>
              Job Position:{' '}
              <span className="text-sm text-gray-600 dark:text-gray-300">
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {employee?.jobPosition || `Job Position not specified`}
                </span>
              </span>
            </span>
            <span>
              Employee Type:{' '}
              <span className="text-sm text-gray-600">
                {employee?.employeeType || `Employee type not specified`}
              </span>
            </span>
          </div>
        </div>

        <Separator className="mt-3" />

        <div className="mt-8">
          <Tabs defaultValue="work" className="w-full">
            <TabsList className="md:grid w-full md:grid-cols-3 flex flex-col h-full">
              <TabsTrigger value="work">Work Information</TabsTrigger>
              <TabsTrigger value="private">Private Information</TabsTrigger>
              <TabsTrigger value="HR">HR Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="work">
              <WorkInfo employee={employee} />
            </TabsContent>
            <TabsContent value="private">
              <PrivateInfo employee={employee} />
            </TabsContent>
            <TabsContent value="HR">
              <HRSettings employee={employee} />
            </TabsContent>
          </Tabs>
        </div>

        <div className="mt-10">
          <Button
            onClick={() =>
              router.push(`/organization/employees/${employee?.id}/edit`)
            }
          >
            <Pencil className="w-4 h-4 mr-2" /> Edit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ViewEmployee;
