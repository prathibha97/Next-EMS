import { DataTable } from '@/components/data-table';
import { Department, Payroll } from '@prisma/client';
import { FC } from 'react';
import EPFETFChart from './epf-etf-chart';
import { EPFEPTFColumns } from './monthly-columns';

type EmployeeWithDepartment = Payroll & {
  employeeDepartment: Department;
};

interface MonthlyStatisticsProps {
  payrollData: EmployeeWithDepartment[];
}

const MonthlyStatistics: FC<MonthlyStatisticsProps> = ({ payrollData }) => {
  const getFormattedMonth = (monthYear: string) => {
    const [year, month] = monthYear.split('-');
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    return `${monthNames[parseInt(month, 10) - 1]} ${year}`;
  };

  // Create an object to group data by month
  const groupedMonthlyEpfEtfData = payrollData.reduce((acc, data) => {
    const month = getFormattedMonth(data.monthYear);
    const newData = {
      epf: data.companyEpfContribution,
      etf: data.companyEtfContribution,
      total: data.companyEpfContribution + data.companyEtfContribution,
    };

    if (!acc[month]) {
      acc[month] = [newData];
    } else {
      acc[month].push(newData);
    }

    return acc;
  }, {});

  // Transform the grouped data into the format you need for rendering
  const monthlyEpfEtfData = Object.entries(groupedMonthlyEpfEtfData).map(
    ([month, data]) => ({
      month,
      epf: data.reduce((sum, item) => sum + item.epf, 0),
      etf: data.reduce((sum, item) => sum + item.etf, 0),
      total: data.reduce((sum, item) => sum + item.total, 0),
    })
  );
  return (
    <div>
      {/* grid column1 starts here */}
      <div className='bg-[#fff] border rounded-lg'>
        <div className='text-sm font-semibold mt-5 text-center'>
          Table of ETF and EPF Contribution History
        </div>
        <div>
          <DataTable
            columns={EPFEPTFColumns}
            data={monthlyEpfEtfData}
            placeholder='Month'
            searchFilter='month'
            inputType='text'
          />
        </div>
      </div>

      <div className='bg-[#fff] border rounded-lg p-2 mt-6'>
        <div className='text-sm font-semibold my-2 text-center'>
          ETF & EPF Contribution Graphical Visualization
        </div>
        <div>
          <EPFETFChart data={monthlyEpfEtfData} />
        </div>
      </div>
    </div>
  );
};

export default MonthlyStatistics;
