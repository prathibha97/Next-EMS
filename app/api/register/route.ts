import prisma from '@/lib/prisma';
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { email, password } = body;

    if (!email || !password) {
      return new NextResponse('Missing info', { status: 400 });
    }

    // Check if there are any users in the database
    const usersCount = await prisma.user.count();

    // Determine the role of the new user
    const role = usersCount === 0 ? 'ADMIN' : 'USER';

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        hashedPassword,
        role,
      },
    });

    return NextResponse.json(user);
  } catch (error: any) {
    console.log(error, 'REGISTRATION ERROR');
    return new NextResponse('Internal error', { status: 500 });
  }
}
