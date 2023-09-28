import { getAuthSession } from '@/app/api/auth/[...nextauth]/options';
import prisma from '@/lib/prisma';
import { pusherServer } from '@/lib/pusher';
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

export async function PUT(req: Request, { params }: { params: IParams }) {
  const session = await getAuthSession();
  const { status } = await req.json();

  if (!session || session.user.role !== 'ADMIN') {
    throw new NextResponse('Unauthorized', { status: 401 });
  }

  const { leaveId } = params;
  let updatedLeave;
  try {
    if (status === 'Rejected') {
      updatedLeave = await prisma.leave.update({
        where: {
          id: leaveId,
        },
        data: {
          status,
        },
      });
      const notification = `Your leave from ${updatedLeave.startDate?.toLocaleDateString()} to ${updatedLeave.endDate?.toLocaleDateString()} has been ${status.toLowerCase()}.`;

      await pusherServer.trigger(
        updatedLeave.employeeId,
        'notifications:new',
        notification
      );

      await prisma.notification.create({
        data: {
          message: notification,
          type: 'leave-reject-notification',
          employee: {
            connect: {
              id: updatedLeave.employeeId,
            },
          },
        },
      });
    }

    if (status === 'Approved') {
      updatedLeave = await prisma.leave.update({
        where: {
          id: leaveId,
        },
        data: {
          status,
        },
      });
    }

    return NextResponse.json(updatedLeave);
  } catch (error: any) {
    return new Response(`Could not delete leaves request - ${error.message}`, {
      status: 500,
    });
  }
}
