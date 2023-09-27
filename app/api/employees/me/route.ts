import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getAuthSession } from '../../auth/[...nextauth]/options';

export async function GET(req: Request) {
  const session = await getAuthSession();

  if (!session) {
    throw new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const employee = await prisma.employee.findFirst({
      where: {
        userId: session?.user?.id,
      },
      include: {
        Department: true,
        Attendance: true,
        leaveBalance: true,
        Leave: true
      },
    });
    return NextResponse.json(employee);
  } catch (error) {
    throw new NextResponse('Failed to fetch employee', { status: 500 });
  }
}
