import { FC } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';


interface RecentMonthsProps {
  
}

const RecentMonths: FC<RecentMonthsProps> = ({}) => {
  return (
    <div>
      <div className='text-lg font-semibold mb-4'>Recent Months</div>
      <div>
        <div>
          <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
            <Card className='drop-shadow-lg'>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-semibold text-black'>
                  August
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold text-black'>12500.00</div>
                <p className='text-xs text-muted-foreground text-black'>
                  +20.1% from last month
                </p>
              </CardContent>
            </Card>

            <Card className=' drop-shadow-lg'>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-semibold text-black'>
                  July
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold text-black'>10700.00</div>
                <p className='text-xs text-muted-foreground text-black'>
                  +180.1% from last month
                </p>
              </CardContent>
            </Card>
            <Card className=' drop-shadow-lg'>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-semibold text-black'>
                  June
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold text-black'>14270.00</div>
                <p className='text-xs text-muted-foreground text-black'>
                  +19% from last month
                </p>
              </CardContent>
            </Card>
            <Card className='drop-shadow-lg'>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-semibold text-black'>
                  May
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold text-black'>11400.00</div>
                <p className='text-xs text-muted-foreground text-black'>
                  +201 since last hour
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecentMonths