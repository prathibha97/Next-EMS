import prisma from '@/lib/prisma';
import { getNumberOfDays } from '@/lib/utils';
import { NextResponse } from 'next/server';
import { getAuthSession } from '../auth/[...nextauth]/options';

export async function POST(req: Request) {
  const session = await getAuthSession();

  if (!session) {
    throw new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const body = await req.json();
    const {
      type,
      startDate,
      endDate,
      reason,
      medical,
      otherProof,
      employeeId,
    } = body;

    const leaveBalance = await prisma.leaveBalance.findFirst({
      where: {
        employeeId: employeeId,
      },
    });

    if (!leaveBalance) {
      return new Response('Leave balance not found', { status: 400 });
    }

    //  @ts-ignore
    const availableBalance = leaveBalance[type.toLowerCase()];

    if (availableBalance === undefined) {
      return new Response('Invalid leave type', { status: 400 });
    }

    let requestedDuration = getNumberOfDays(startDate, endDate);

    if (requestedDuration <= 0 || requestedDuration > availableBalance) {
      return new Response('Insufficient leave balance', { status: 400 });
    }

    const leave = await prisma.leave.create({
      data: {
        type,
        startDate,
        endDate,
        reason,
        medical,
        otherProof,
        employee: {
          connect: {
            id: employeeId,
          },
        },
      },
    });
    return NextResponse.json(leave);
  } catch (error: any) {
    return new Response(`Could not create leave - ${error.message}`, {
      status: 500,
    });
  }
}
