import { NextResponse } from 'next/server';
import { getAuthSession } from '../../auth/[...nextauth]/options';
import prisma from '@/lib/prisma';
import { th } from 'date-fns/locale';

export async function GET(req: Request) {
  const session = await getAuthSession();

  try {
    const employee = await prisma.employee.findFirst({
      where: {
        userId: session?.user?.id,
      }
    })
    return NextResponse.json(employee);
  } catch (error) {
    throw new NextResponse('Failed to fetch employee', { status: 500 });
  }

}
