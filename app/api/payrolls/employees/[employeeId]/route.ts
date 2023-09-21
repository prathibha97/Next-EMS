import { getAuthSession } from '@/app/api/auth/[...nextauth]/options';
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

interface IParams {
  params: {
    employeeId: string;
  };
}

export async function GET(req: Request, { params }: IParams) {
  const { employeeId } = params;
  const session = await getAuthSession();

  if (!session || session.user.role !== 'ADMIN') {
    throw new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const payrolls = await prisma.payroll.findMany({
      where: {
        employeeId,
      },
      include:{
        employee: {
          select: {
            name: true,
            employeeDepartment:{
              select:{
                name: true,
              }
            },
            employeeNumber: true,
            jobPosition: true,
            bankName: true,
            bankAccountNumber: true,
          },
        },
      },
      orderBy: {
        monthYear: 'desc',
      },
    });
    return NextResponse.json(payrolls);
  } catch (error:any) {
    throw new NextResponse(`Internal Server Error - ${error.message}`, { status: 500 });
  }
}
