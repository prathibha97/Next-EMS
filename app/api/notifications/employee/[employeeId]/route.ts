import { getAuthSession } from '@/app/api/auth/[...nextauth]/options';
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

interface IParams {
  employeeId?: string;
}

export async function GET(req: Request, { params }: { params: IParams }) {
  const session = await getAuthSession();
  if (!session) {
    throw new NextResponse('Unauthorized', { status: 401 });
  }

  const { employeeId } = params;
  try {
    const notifications = await prisma.notification.findMany({
      where: {
        employeeId: employeeId,
      },
    });

    if(!notifications){
      return new NextResponse('No notifications found', {status:404})
    }
    console.log(notifications);
    return NextResponse.json(notifications);
  } catch (error: any) {
    return new Response(`Could not fetch employee notifications - ${error.message}`, {
      status: 500,
    });
  }
}
