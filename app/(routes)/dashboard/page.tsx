// 'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Image from 'next/image';
import { CalendarDateRangePicker } from './components/date-range-picker';
import { Overview } from './components/overview';
import { RecentProjects } from './components/recent-projects';

export default function DashboardPage() {
  return (
    <div>
      <div className='container flex-col md:flex'>
        <div className=' flex-1 space-y-4 p-8 pt-6'>
          <div className='flex items-center justify-between space-y-2'>
            <h2 className='accc text-3xl font-bold tracking-tight'>
              Dashboard
            </h2>
            <div className='flex items-center space-x-2'>
              <CalendarDateRangePicker />
              <Button>Download</Button>
            </div>
          </div>
          <Tabs defaultValue='overview' className='space-y-4'>
            <TabsList>
              <TabsTrigger value='overview'>Overview</TabsTrigger>
              <TabsTrigger value='analytics' disabled>
                Analytics
              </TabsTrigger>
              <TabsTrigger value='reports' disabled>
                Reports
              </TabsTrigger>
              <TabsTrigger value='notifications' disabled>
                Notifications
              </TabsTrigger>
            </TabsList>
            <TabsContent value='overview' className='space-y-4'>
              <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
                <Card className='bg-white drop-shadow-lg'>
                  <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle className='text-sm font-medium'>
                      Total Revenue
                    </CardTitle>
                    <div>
                      <Image
                        src='/icons/revenue.png'
                        alt='Image 1'
                        width={50}
                        height={50}
                      />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className='text-2xl font-bold'>$45,231.89</div>
                    <p className='text-xs text-muted-foreground'>
                      +20.1% from last month
                    </p>
                  </CardContent>
                </Card>

                <Card className='bg-white drop-shadow-lg'>
                  <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle className='text-sm font-medium'>
                      Subscriptions
                    </CardTitle>
                    <Image
                      src='/icons/subscriptions.png'
                      alt='Image 1'
                      width={50}
                      height={50}
                    />
                  </CardHeader>
                  <CardContent>
                    <div className='text-2xl font-bold'>+2350</div>
                    <p className='text-xs text-muted-foreground'>
                      +180.1% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card className='bg-white drop-shadow-lg'>
                  <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle className='text-sm font-medium'>Sales</CardTitle>
                    <Image
                      src='/icons/sales.png'
                      alt='Image 1'
                      width={50}
                      height={50}
                    />
                  </CardHeader>
                  <CardContent>
                    <div className='text-2xl font-bold'>+12,234</div>
                    <p className='text-xs text-muted-foreground'>
                      +19% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card className='bg-white drop-shadow-lg'>
                  <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle className='text-sm font-medium'>
                      Active Now
                    </CardTitle>
                    <Image
                      src='/icons/active.png'
                      alt='Image 1'
                      width={50}
                      height={50}
                    />
                  </CardHeader>
                  <CardContent>
                    <div className='text-2xl font-bold'>+573</div>
                    <p className='text-xs text-muted-foreground'>
                      +201 since last hour
                    </p>
                  </CardContent>
                </Card>
              </div>
              <div className=' grid gap-4 md:grid-cols-2 lg:grid-cols-7'>
                <Card className='col-span-4 bg-white drop-shadow-lg '>
                  <CardHeader>
                    <CardTitle>Overview</CardTitle>
                  </CardHeader>
                  <CardContent className='pl-2'>
                    <Overview />
                  </CardContent>
                </Card>

                <Card className='col-span-3 bg-white drop-shadow-lg'>
                  <CardHeader>
                    <CardTitle>Recent Projects</CardTitle>
                    <CardDescription>
                      You made 265 sales this month.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RecentProjects />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
