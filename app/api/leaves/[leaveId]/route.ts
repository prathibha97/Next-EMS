import { getAuthSession } from '@/app/api/auth/[...nextauth]/options';
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

interface IParams {
  leaveId?: string;
}

export async function DELETE(req: Request, { params }: { params: IParams }) {
  const session = await getAuthSession();
  if (!session || session.user.role !== 'ADMIN') {
    throw new NextResponse('Unauthorized', { status: 401 });
  }

  const { leaveId } = params;
  try {
    const leaves = await prisma.leave.delete({
      where: {
        id: leaveId,
      },
    });
    return NextResponse.json(leaves);
  } catch (error: any) {
    return new Response(`Could not delete leaves request - ${error.message}`, {
      status: 500,
    });
  }
}
