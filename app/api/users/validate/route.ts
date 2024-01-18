import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email');
  try {
    const user = await prisma.user.findUnique({ where: { email: email! } });
    if (!user) {
      return NextResponse.json({
        message: 'We cannot find your account',
        isValid: false,
      });
    }
    return NextResponse.json({
      message: 'We found your account',
      isValid: true,
    });
  } catch (error: any) {
    return new Response(`Could not validate user - ${error.message}`, {
      status: 500,
    });
  }
}
