import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getAuthSession } from '../../auth/[...nextauth]/options';

export async function GET(req: Request) {
  try {
    const session = await getAuthSession();
    if (!session) {
      throw new NextResponse('Unauthorized', { status: 401 });
    }

    const projects = await prisma.project.findMany({
      where: {
        projectAssignees: {
          some: {
            employee: {
              userId: session.user.id,
            },
          },
        },
      },
      select: {
        name: true,
        id:true
      },
      orderBy:{
        createdAt: 'desc'
      }
    });
    return NextResponse.json(projects);
  } catch (error: any) {
    console.log(error.message);
    return new Response(`Could not fetch projects - ${error.message}`, {
      status: 500,
    });
  }
}
