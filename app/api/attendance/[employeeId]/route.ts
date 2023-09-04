import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

interface IParams {
  employeeId: string;
}

export async function GET(req: Request, { params }: { params: IParams }) {
  const session = await getServerSession();
  if (!session) {
    throw new NextResponse('Unauthorized', { status: 401 });
  }

  const { employeeId } = params;

  try {
    const attendance = await prisma.attendance.findMany({
      where: {
        employeeId,
      },
    });

    if(!attendance) {
      throw new NextResponse('Attendance data not found', { status: 404 });
    }

    return NextResponse.json({
      attendance,
    });
  } catch (error: any) {
    throw new NextResponse(
      `Failed to fetch attendance data - ${error.message}`,
      { status: 500 }
    );
  }
}
