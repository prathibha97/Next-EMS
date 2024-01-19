import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getAuthSession } from '../../auth/[...nextauth]/options';

interface IParams {
  userId: string;
}

export async function PUT(req: Request, { params }: { params: IParams }) {
  try {
    const session = await getAuthSession();
    if (!session) {
      throw new NextResponse('Unauthorized', { status: 401 });
    }

    const body = await req.json();
    const { role, email } = body;

    const user = await prisma.user.update({
      where: {
        id: params.userId,
      },
      data: {
        role,
        email,
      },
    });

    return NextResponse.json(user);
  } catch (error: any) {
    console.log(error.message);
    return new Response(`Could not update user - ${error.message}`, {
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
    const user = await prisma.user.findUnique({
      where: {
        id: params.userId,
      },
    });
    if (!user) {
      return new NextResponse('User not found', { status: 404 });
    }

    const removedUser = await prisma.user.delete({
      where: {
        id: params.userId,
      },
    });
    return NextResponse.json(removedUser);
  } catch (error: any) {
    console.log(error.message);
    return new Response(`Could not remove user - ${error.message}`, {
      status: 500,
    });
  }
}
