'use client';
import { useGetDepartmentByIdQuery } from '@/app/redux/services/departmentApi';
import { DataTable } from '@/components/data-table';
import { FC, useEffect } from 'react';
import LoadingState from '../components/loading-state';
import { columns } from './components/columns';

interface DepartmentPageProps {
  params: {
    departmentId: string;
  };
}

const DepartmentPage: FC<DepartmentPageProps> = ({ params }) => {
  const {
    data: department,
    isLoading,
    refetch: refetchDepartmentEmployees,
  } = useGetDepartmentByIdQuery({
    departmentId: params.departmentId,
  });
  // @ts-ignore
  const data = department?.employees;

  useEffect(() => {
    refetchDepartmentEmployees();
    // @ts-ignore
  }, [department?.employees]);

  if (isLoading) return <LoadingState />;
  return (
    <div className="border lg:w-full mt-5 p-5 rounded-lg">
      <div className=" bg-slate-100 dark:bg-gray-900/60 p-5 rounded-lg">
        <div className="flex gap-3 flex-col md:flex-row justify-between">
          <div>
            <span className="font-semibold">Department Name: </span>
            <span className="font-light">{department?.name}</span>
          </div>
          <div>
            <span className="font-semibold">Department Manager: </span>
            {/* @ts-ignore */}
            <span className="font-light">{department?.manager?.name}</span>
          </div>
        </div>
        <div className="mt-3">
          <span className="font-semibold">Department Description: </span>
          <span className="font-light">{department?.description}</span>
        </div>
      </div>
      <div className="mx-auto py-6">
        <DataTable
          columns={columns}
          data={data}
          inputType="text"
          searchFilter="name"
          placeholder="Name"
        />
      </div>
    </div>
  );
};

export default DepartmentPage;
