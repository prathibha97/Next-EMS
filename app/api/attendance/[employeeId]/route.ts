import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getAuthSession } from '../../auth/[...nextauth]/options';

interface IParams {
  employeeId: string;
}

export async function GET(req: Request, { params }: { params: IParams }) {
  const session = await getAuthSession();
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

    if (!attendance) {
      throw new NextResponse('Attendance data not found', { status: 404 });
    }
    console.log('attendance', attendance);

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
