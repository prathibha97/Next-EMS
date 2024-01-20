import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FC } from 'react';

interface RecentMonthsProps {
  monthlyData: {
    month: string;
    epf: number;
    etf: number;
    total: number;
  }[];
}

const RecentMonths: FC<RecentMonthsProps> = ({ monthlyData }) => {
  const calculatePercentageChange = (
    current: number,
    previous: number
  ): string => {
    if (previous === 0) {
      return '0%';
    }

    const percentageChange = ((current - previous) / previous) * 100;
    return `${percentageChange >= 0 ? '+' : ''} ${percentageChange.toFixed(
      1
    )}% `;
  };

  // Take only the last 4 items from the monthlyData array
  const last4MonthsData = monthlyData?.slice(-4);
  return (
    <div>
      <div className='text-lg font-semibold mb-4'>Recent Months</div>
      <div>
        <div>
          <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
            {last4MonthsData?.map((monthData, index) => {
              const previousMonthData =
                last4MonthsData[index - 1] || last4MonthsData[index];

              return (
                <Card key={monthData.month}>
                  <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle className='text-sm font-semibold text-black'>
                      {monthData.month}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className='text-2xl font-bold text-black'>
                      {monthData.total.toFixed(2)}
                    </div>
                    <p className='text-xs text-muted-foreground text-black'>
                      {`${calculatePercentageChange(
                        monthData.total,
                        previousMonthData.total
                      )} from last month`}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentMonths;
