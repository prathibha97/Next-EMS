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
    const { name, email, address, phone } = body;
    console.log(body);

    if (!name || !email) {
      return new Response(`All fields are required`, {
        status: 400,
      });
    }
    const client = await prisma.client.create({
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
    return new Response(`Could not create client - ${error.message}`, {
      status: 500,
    });
  }
}
