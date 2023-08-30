import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

interface IParams {
  departmentId: string;
  employeeId: string;
}

export async function GET(req: Request, { params }: { params: IParams }) {
  const session = getServerSession();
  if (!session) {
    throw new NextResponse('Unauthorized', { status: 401 });
  }
  const { departmentId } = params;
  try {
    const departments = await prisma.department.findUnique({
      where: {
        id: departmentId,
      },
      include: {
        employees: true,
        manager: true,
      },
    });
    if (!departments) {
      return new Response(`Could not find departments`, {
        status: 404,
      });
    }
    return NextResponse.json(departments);
  } catch (error: any) {
    return new Response(`Could not fetch department - ${error.message}`, {
      status: 500,
    });
  }
}


