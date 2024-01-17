import { DataTable } from '@/components/data-table';
import { Department, Payroll } from '@prisma/client';
import { FC } from 'react';
import EPFETFChart from './epf-etf-chart';
import { EPFEPTFColumns } from './monthly-columns';
import { yearlyColumns } from './yearly-columns';

type EmployeeWithDepartment = Payroll & {
  employeeDepartment: Department;
};

interface YearlyStatisticsProps {
  payrollData: EmployeeWithDepartment[];
}

const YearlyStatistics: FC<YearlyStatisticsProps> = ({ payrollData }) => {
  const getFormattedYear = (monthYear: string) => {
    const [year] = monthYear.split('-');
    return year;
  };

  // Create an object to group data by year
  const groupedYearlyEpfEtfData = payrollData.reduce((acc, data) => {
    const year = getFormattedYear(data.monthYear);
    const newData = {
      epf: data.companyEpfContribution,
      etf: data.companyEtfContribution,
      total: data.companyEpfContribution + data.companyEtfContribution,
    };

    if (!acc[year]) {
      acc[year] = [newData];
    } else {
      acc[year].push(newData);
    }

    return acc;
  }, {});

  // Transform the grouped data into the format you need for rendering
  const yearlyEpfEtfData = Object.entries(groupedYearlyEpfEtfData).map(
    ([year, data]) => ({
      year,
      epf: data.reduce((sum, item) => sum + item.epf, 0),
      etf: data.reduce((sum, item) => sum + item.etf, 0),
      total: data.reduce((sum, item) => sum + item.total, 0),
    })
  );

  return (
    <div>
      <div className='bg-[#fff]  rounded-lg p-4'>
        <div className='text-sm font-semibold my-2 text-center'>
          Table of ETF and EPF Contribution History
        </div>
        <div>
          <DataTable
            columns={yearlyColumns}
            data={yearlyEpfEtfData}
            placeholder='Year'
            searchFilter='year'
            inputType='text'
          />
        </div>
      </div>

      <div className='bg-[#fff]  rounded-lg p-2 mt-12'>
        <div className='text-sm font-semibold my-2 text-center'>
          ETF & EPF Contribution Graphical Visualization
        </div>
        <div>
          <EPFETFChart data={yearlyEpfEtfData} />
        </div>
      </div>
    </div>
  );
};

export default YearlyStatistics;
