import { getAuthSession } from '@/app/api/auth/[...nextauth]/options';
import prisma from '@/lib/prisma';
import { pusherServer } from '@/lib/pusher';
import { getNumberOfDays } from '@/lib/utils';
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
      const leave = await prisma.leave.findUnique({
        where: {
          id: leaveId,
        },
      });

      if (!leave) {
        return new NextResponse('Leave request not found', { status: 404 });
      }

      const leaveBalance = await prisma.leaveBalance.findFirst({
        where: {
          employeeId: leave.employeeId,
        },
      });

      const requestedDuration = getNumberOfDays(
        leave.startDate as Date,
        leave.endDate as Date
      );

      // Calculate the available balance for the corresponding leave type
      let availableBalance: number | undefined;

      if (leave.type === 'Annual') {
        availableBalance = leaveBalance?.annual;
      } else if (leave.type === 'Casual') {
        availableBalance = leaveBalance?.casual;
      } else if (leave.type === 'Medical') {
        availableBalance = leaveBalance?.medical;
      } // Add more conditions for other leave types if needed

      // @ts-ignore
      if (requestedDuration <= 0 || requestedDuration > availableBalance) {
        return new Response('Insufficient leave balance', { status: 400 });
      }

      // Deduct the requested duration from the appropriate leave balance category
      const updatedLeaveBalance = await prisma.leaveBalance.update({
        where: {
          id: leaveBalance!.id,
        },
        data: {
          [leave.type.toLowerCase()]: {
            decrement: requestedDuration,
          },
        },
      });

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
           type: 'leave-approve-notification',
           employee: {
             connect: {
               id: updatedLeave.employeeId,
             },
           },
         },
       });
    }

    return NextResponse.json(updatedLeave);
  } catch (error: any) {
    return new Response(`Could not ${status.toLowerCase()} leaves request - ${error.message}`, {
      status: 500,
    });
  }
}
