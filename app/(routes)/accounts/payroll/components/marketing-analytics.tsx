import { FC } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DataTable } from '@/components/data-table';
import { EPFEPTFColumns } from './epf-etf-columns';
import { monthlyEpfEtfData } from '@/constants/sample/monthly-Epf-etf-data';
import EPFETFChart from './epf-etf-chart';


interface MarketingAnalyticsProps {
  
}

const MarketingAnalytics: FC<MarketingAnalyticsProps> = ({}) => {
  return (
    <div>
      <div className='bg-slate-200 mt-10 p-4 drop-shadow-md rounded-lg '>
        <div className='text-xl font-semibold text-center mb-4'>
          ETF & EPF Contribution
        </div>
        <Tabs defaultValue='account'>
          <div className='text-center'>
            <TabsList>
              <TabsTrigger value='account'>Monthly</TabsTrigger>
              <TabsTrigger value='password'>Yearly</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value='account'>
            <div>
              {/* grid column1 starts here */}
              <div className='bg-[#fff]  rounded-lg p-4'>
                <div className='text-sm font-semibold my-2 text-center'>
                  Table of ETF and EPF Contribution History
                </div>
                <div>
                  <DataTable
                    columns={EPFEPTFColumns}
                    data={monthlyEpfEtfData}
                    placeholder='Month'
                    searchFilter='month'
                  />
                </div>
              </div>
              {/* grid column1 ends here */}

              {/* grid column2 starts here */}
              <div className='bg-[#fff]  rounded-lg p-2 mt-12'>
                <div className='text-sm font-semibold my-2 text-center'>
                  ETF & EPF Contribution Graphical Visualization
                </div>
                <div>
                  <EPFETFChart />
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value='password'>
            <div>
              {/* grid column1 starts here */}
              <div className='bg-[#fff]  rounded-lg  p-4'>
                <div className='text-sm font-semibold my-2 text-center'>
                  Table of ETF and EPF Contribution History
                </div>
                <div>
                  <DataTable
                    columns={EPFEPTFColumns}
                    data={monthlyEpfEtfData}
                    placeholder='Month'
                    searchFilter='month'
                  />
                </div>
              </div>
              {/* grid column1 ends here */}

              {/* grid column2 starts here */}
              <div className='bg-[#fff] rounded-lg  p-2 mt-12'>
                <div className='text-sm font-semibold my-2 text-center'>
                  ETF & EPF Contribution Graphical Visualization
                </div>
                <div>
                  <EPFETFChart />
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default MarketingAnalytics