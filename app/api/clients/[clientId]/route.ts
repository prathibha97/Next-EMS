import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getAuthSession } from '../../auth/[...nextauth]/options';

interface IParams {
  clientId: string;
}

export async function PUT(req: Request, { params }: { params: IParams }) {
  try {
    const session = await getAuthSession();
    if (!session || session.user.role !== 'ADMIN') {
      throw new NextResponse('Unauthorized', { status: 401 });
    }
    const body = await req.json();
    const { name, email, address, phone } = body;

    if (!name || !email) {
      return new Response(`All fields are required`, {
        status: 400,
      });
    }
    const client = await prisma.client.update({
      where: {
        id: params.clientId,
      },
      data: {
        name,
        email,
        phone,
        address,
      },
    });
    return NextResponse.json(client);
  } catch (error: any) {
    console.log(error.message);
    return new Response(`Could not update client - ${error.message}`, {
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
    const client = await prisma.client.findUnique({
      where: {
        id: params.clientId,
      },
    });
    if (!client) {
      return new NextResponse('Client not found', { status: 404 });
    }

    const removedClient = await prisma.client.delete({
      where: {
        id: params.clientId,
      },
    });
    return NextResponse.json(removedClient);
  } catch (error: any) {
    console.log(error.message);
    return new Response(`Could not remove client - ${error.message}`, {
      status: 500,
    });
  }
}
