import prisma from '@/lib/prisma';
import { pusherServer } from '@/lib/pusher';
import { NextResponse } from 'next/server';
import { getAuthSession } from '../auth/[...nextauth]/options';

export async function POST(req: Request) {
  try {
    const session = await getAuthSession();
    if (!session || session.user.role !== 'ADMIN') {
      throw new NextResponse('Unauthorized', { status: 401 });
    }
    const body = await req.json();
    const { title, project, priority, label, description, assignee } = body;

    if (!title || !project || !priority || !assignee) {
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
        project: {
          connect: {
            id: project,
          },
        },
        priority,
        label,
        description,
        employee: {
          connect: {
            id: assignee,
          },
        },
      },
    });

    // Fetch the ID of the "TODO" list associated with the project board
    const todoList = await prisma.list.findFirst({
      where: {
        board: {
          projectId: project,
        },
        title: 'TODO', // Assuming the title of the list is 'TODO'
      },
      select: { id: true },
    });

    if (!todoList) {
      throw new Error('TODO list not found for the project');
    }

    // Create a card for the task in the project board's "TODO" list
    const card = await prisma.card.create({
      data: {
        title: task.title,
        description: task.description,
        order: 0, // Set the order as needed
        listId: todoList.id,
        projectId: task.projectId,
        taskId: task.id,
      },
    });

    const projectToNotify = await prisma.project.findUnique({
      where: {
        id: project,
      },
      select: {
        name: true,
      },
    });

    if (!project) {
      throw new Error('Project not found');
    }

    const notification = `You have been assigned a new task: "${task.title}" in project "${projectToNotify?.name}".`;

    await pusherServer.trigger(
      task.assignee,
      'notifications:new',
      notification
    );

    await prisma.notification.create({
      data: {
        message: notification,
        type: 'task-allocation-notification',
        employee: {
          connect: {
            id: task.assignee,
          },
        },
      },
    });

    return NextResponse.json({ task, message: 'Task created successfully!' });
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
