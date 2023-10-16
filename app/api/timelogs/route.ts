import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getAuthSession } from '../auth/[...nextauth]/options';


export async function POST(req: Request) {
  try {
    const session = await getAuthSession();
    if (!session) {
      throw new NextResponse('Unauthorized', { status: 401 });
    }
    const body = await req.json();
    const {
      date,
      description,
      endTime,
      projectId,
      startTime,
      taskId,
      hoursWorked,
      employeeId,
    } = body;

    if (
      !date ||
      !description ||
      !endTime ||
      !projectId ||
      !startTime ||
      !taskId
    ) {
      return new Response(`All Fields are Required`, {
        status: 400,
      });
    }

    const timeRecord = await prisma.taskWork.create({
      data: {
        date: date,
        endTime: endTime,
        startTime: startTime,
        description,
        hoursWorked,
        projectId,
        task: {
          connect: { id: taskId },
        },
        employee: {
          connect: { id: employeeId }, // Replace with the actual employee ID
        },
      },
    });
    return NextResponse.json(timeRecord);
  } catch (error: any) {
    console.log(error.message);
    return new Response(`Could not create time record - ${error.message}`, {
      status: 500,
    });
  }
}

export async function GET(req: Request) {
  try {
    const session = await getAuthSession();
    if (!session || session.user.role !== 'ADMIN') {
      throw new NextResponse('Unauthorized', { status: 401 });
    }

    const timeRecords = await prisma.taskWork.findMany({});
    return NextResponse.json(timeRecords);
  } catch (error: any) {
    console.log(error.message);
    return new Response(`Could not fetch time records - ${error.message}`, {
      status: 500,
    });
  }
}
