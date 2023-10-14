import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getAuthSession } from '../auth/[...nextauth]/options';

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();
    if (!session || session.user.role !== 'ADMIN') {
      throw new NextResponse('Unauthorized', { status: 401 });
    }
    const body = await req.json();
    const { title, status, project, priority, label, description } = body;
    console.log(body);

    if (!title || !status || !project || !priority) {
      return new Response(`Required fields are missing`, {
        status: 400,
      });
    }

    const lastTask = await prisma.task.findFirst({
      orderBy: { taskId: 'desc' },
      select: { taskId: true },
    });

    let newTaskId = 'TASK-0001';

    if (lastTask) {
      const lastNumber = parseInt(lastTask.taskId.split('-')[1]);
      const newNumber = lastNumber + 1;
      newTaskId = `TASK-${String(newNumber).padStart(4, '0')}`;
    }

    const task = await prisma.task.create({
      data: {
        title,
        taskId: newTaskId,
        status,
        project: {
          connect: {
            id: project,
          },
        },
        priority,
        label,
        description,
      },
    });
    return NextResponse.json(task);
  } catch (error: any) {
    console.log(error.message);
    return new Response(`Could not create task - ${error.message}`, {
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

    const tasks = await prisma.task.findMany({});
    return NextResponse.json(tasks);
  } catch (error: any) {
    console.log(error.message);
    return new Response(`Could not fetch tasks - ${error.message}`, {
      status: 500,
    });
  }
}
