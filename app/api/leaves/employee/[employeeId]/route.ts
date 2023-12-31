import { getAuthSession } from '@/app/api/auth/[...nextauth]/options';
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

interface IParams {
  employeeId?: string;
}

export async function GET(req: Request, { params }: { params: IParams }) {
  const session = await getAuthSession();
  if (!session || session.user.role !== 'ADMIN') {
    throw new NextResponse('Unauthorized', { status: 401 });
  }

  const { employeeId } = params;
  try {
    const leaves = await prisma.leave.findMany({
      where: {
        employeeId,
      },
    });
    return NextResponse.json(leaves);
  } catch (error: any) {
    return new Response(`Could not fetch employee leaves - ${error.message}`, {
      status: 500,
    });
  }
}
