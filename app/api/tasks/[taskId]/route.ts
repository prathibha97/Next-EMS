import prisma from '@/lib/prisma';
import { updateProjectProgress } from '@/lib/updateProjectProgress';
import { NextResponse } from 'next/server';
import { getAuthSession } from '../../auth/[...nextauth]/options';

interface IParams {
  taskId: string;
}

export async function PUT(req: Request, { params }: { params: IParams }) {
  try {
    const session = await getAuthSession();
    if (!session) {
      throw new NextResponse('Unauthorized', { status: 401 });
    }

    const body = await req.json();
    const {
      title,
      status,
      project,
      priority,
      label,
      description,
      projectId,
      assignee,
    } = body;

    const updateData = {
      ...(title && { title }),
      ...(project && {
        project: {
          connect: {
            id: project,
          },
        },
        employee: {
          connect: {
            id: assignee,
          },
        },
      }),
      ...(priority && { priority }),
      ...(label && { label }),
      ...(description && { description }),
    };

    if (status !== undefined) {
      updateData.status = status;
    }

    const task = await prisma.task.update({
      where: {
        id: params.taskId,
      },
      data: updateData,
    });

    if (status === 'Done') {
      await updateProjectProgress(projectId);
    }

    return NextResponse.json(task);
  } catch (error: any) {
    console.log(error.message);
    return new Response(`Could not update task - ${error.message}`, {
      status: 500,
    });
  }
}

export async function DELETE(req: Request, { params }: { params: IParams }) {
  try {
    const session = await getAuthSession();
    if (!session || session.user.role !== 'ADMIN') {
      throw new NextResponse('Unauthorized', { status: 401 });
    }
    const task = await prisma.task.findUnique({
      where: {
        id: params.taskId,
      },
    });
    if (!task) {
      return new NextResponse('Task not found', { status: 404 });
    }

    const removedTask = await prisma.task.delete({
      where: {
        id: params.taskId,
      },
    });
    return NextResponse.json(removedTask);
  } catch (error: any) {
    console.log(error.message);
    return new Response(`Could not remove task - ${error.message}`, {
      status: 500,
    });
  }
}
