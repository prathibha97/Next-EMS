import { DataTable } from '@/components/data-table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { monthlyEpfEtfData } from '@/constants/sample/monthly-Epf-etf-data';
import useEmployee from '@/hooks/useEmployee';
import { columns } from './components/columns';
import EPFETFChart from './components/epf-etf-chart';
import { EPFEPTFColumns } from './components/epf-etf-columns';
import { PayrollDataTable } from './components/payroll-data-table';

const PayrollsPage = async () => {
  const { getAllEmployees } = useEmployee();
  const employeeData = await getAllEmployees();
  return (
    <div>
      <Tabs defaultValue='payroll'>
        <TabsList>
          <TabsTrigger value='payroll'>Payroll</TabsTrigger>
          <TabsTrigger value='analytics'>Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value='payroll' className='mt-5'>
          <PayrollDataTable columns={columns} data={employeeData} />
        </TabsContent>
        <TabsContent value='analytics' className='mt-5'>
          <div className='text-lg font-semibold'>Recent Months</div>

          <div>
            <div>
              <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
                <Card className='bg-[#fbbc08] drop-shadow-none'>
                  <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle className='text-sm font-semibold text-slate-50'>
                      August
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className='text-2xl font-bold text-slate-50'>
                      12500.00
                    </div>
                    <p className='text-xs text-muted-foreground text-slate-50'>
                      +20.1% from last month
                    </p>
                  </CardContent>
                </Card>

                <Card className='bg-[#4286f4] drop-shadow-none'>
                  <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle className='text-sm font-semibold text-slate-50'>
                      July
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className='text-2xl font-bold text-slate-50'>
                      10700.00
                    </div>
                    <p className='text-xs text-muted-foreground text-slate-50'>
                      +180.1% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card className='bg-[#eb4235] drop-shadow-none'>
                  <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle className='text-sm font-semibold text-slate-50'>
                      June
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className='text-2xl font-bold text-slate-50'>
                      14270.00
                    </div>
                    <p className='text-xs text-muted-foreground text-slate-50'>
                      +19% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card className='bg-[#34a953] drop-shadow-none'>
                  <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle className='text-sm font-semibold text-slate-50'>
                      May
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className='text-2xl font-bold text-slate-50'>
                      11400.00
                    </div>
                    <p className='text-xs text-muted-foreground text-slate-50'>
                      +201 since last hour
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* <div className="grid grid-cols-2 gap-4 mt-8"> */}
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
                <div className='grid grid-cols-3 gap-6 mt-6'>
                  {/* grid column1 starts here */}
                  <div className='bg-[#fff] col-span-1 rounded-lg p-2'>
                    <div className='text-sm font-semibold my-2 text-center'>
                      Table of ETF and EPF Contribution History
                    </div>
                    <div>
                      {/* <Image
                        src='/icons/epf-table.png'
                        alt='Image 1'
                        width={360}
                        height={250}
                      /> */}
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
                  <div className='bg-[#fff] col-span-2 rounded-lg p-2'>
                    <div className='text-sm font-semibold my-2 text-center'>
                      ETF & EPF Contribution Graphical Visualization
                    </div>
                    <div>
                      {/* <Image
                        src='/icons/chart-example.png'
                        alt='Image 1'
                        width={760}
                        height={250}
                      /> */}
                      <EPFETFChart />
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value='password'>
                <div className='grid grid-cols-3 gap-4 mt-8'>
                  {/* grid column1 starts here */}
                  <div className='bg-[#fff] col-span-1 rounded-lg  p-2'>
                    <div className='text-sm font-semibold my-2 text-center'>
                      Table of ETF and EPF Contribution History
                    </div>
                    <div>
                      {/* <Image
                        src='/icons/epf-table-02.png'
                        alt='Image 1'
                        width={360}
                        height={250}
                      /> */}
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
                  <div className='bg-[#fff] col-span-2 rounded-lg  p-2'>
                    <div className='text-sm font-semibold my-2 text-center'>
                      ETF & EPF Contribution Graphical Visualization
                    </div>
                    <div>
                      {/* <Image
                        src="/icons/chart-example.png"
                        alt="Image 1"
                        width={760}
                        height={250}
                      /> */}
                      <EPFETFChart />
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* grid column 2 ends here */}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PayrollsPage;
