import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getAuthSession } from '../../auth/[...nextauth]/options';

export async function GET(req: Request) {
  try {
    const session = await getAuthSession();
    if (!session) {
      throw new NextResponse('Unauthorized', { status: 401 });
    }
    const url = new URL(req.url);

    const projectId = url.searchParams.get('projectId');

    const tasks = await prisma.task.findMany({
      where: {
        projectId: projectId!,
      },
    });
    return NextResponse.json(tasks);
  } catch (error: any) {
    console.log(error.message);
    return new Response(
      `Could not fetch tasks of the project - ${error.message}`,
      {
        status: 500,
      }
    );
  }
}
