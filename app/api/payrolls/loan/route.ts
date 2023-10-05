import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getAuthSession } from '../../auth/[...nextauth]/options';

export async function POST(req: Request) {
  const session = await getAuthSession();

  if (!session || session.user.role !== 'ADMIN') {
    throw new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const body = await req.json();
    const { amount, date, employeeId, installments } = body;
    const salaryAdvance = await prisma.loan.create({
      data: {
        amount: parseFloat(amount),
        date: new Date(date),
        installments: parseInt(installments),
        employee: {
          connect: {
            id: employeeId,
          },
        },
      },
    });
    return NextResponse.json(salaryAdvance);
  } catch (error: any) {
    console.error(error.message);
    return new Response(`Could not add loan record - ${error.message}`, {
      status: 500,
    });
  }
}
