'use client'
import React from 'react';
import { departments } from '@/constants/departments';
import { usePathname } from 'next/navigation';

const EmployeeSidebar = () => {
  const pathname = usePathname();
  const shouldDisplaySidebar = pathname === '/organization/employees';

  // Calculate the total employee count across all departments
  const totalEmployees = departments.reduce(
    (total, department) => total + department.employeeCount,
    0
  );

  return (
    <div className={`flex ${shouldDisplaySidebar ? 'block' : 'hidden'}`}>
      <div className='flex flex-col h-full p-3 bg-gray-50 shadow w-60'>
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
            {departments.map((item) => (
              <li key={item.name} className='flex justify-between'>
                <span>{item.name}</span>
                <span>{item.employeeCount}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EmployeeSidebar;
