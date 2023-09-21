'use client'
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useGetDepartmentsQuery } from '@/app/redux/services/departmentApi';
import { SkeletonCard } from './loading-employee-card';
import { Department } from '@prisma/client';

const EmployeeSidebar = () => {
  const pathname = usePathname();
  const shouldDisplaySidebar = pathname === '/organization/employees';

  const {data:departmentData, isLoading} = useGetDepartmentsQuery()

  const [departments, setDepartments] = useState<Department[]>([])

  useEffect(() => {
    if (departmentData) {
      setDepartments(departmentData)
    }
  }, [departmentData])

  // Calculate the total employee count across all departments
  const totalEmployees = departments?.reduce(
    // @ts-ignore
    (total, department) => total + department?.employees?.length,
    0
  );

  if (isLoading) return <SkeletonCard/>;

  return (
    <div className={`flex ${shouldDisplaySidebar ? 'block' : 'hidden'}`}>
      <div className='flex flex-col h-full p-3 bg-gray-50 dark:bg-gray-900 rounded-md shadow w-60'>
        <div className='flex items-center'>
          <h2 className='text-md font-bold'>Departments</h2>
        </div>
        <div className='flex-1 mt-4'>
          <ul className='space-y-1 text-sm'>
            {/* Display All with the total employee count */}
            <li className='flex justify-between'>
              <span>All</span>
              <span>{totalEmployees}</span>
            </li>

            {/* Display individual departments */}
            {departments?.map((item) => (
              <li key={item.name} className='flex justify-between'>
                <span>{item.name}</span>
                {/* @ts-ignore */}
                <span>{item.employees.length}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EmployeeSidebar;
