import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();
  const {
    name,
    workEmail,
    position,
    department,
    workMobile,
    personalMobile,
    jobPosition,
    manager,
    profile_photo,
  } = body;
  try {
    const employee = await prisma.employee.create({
      data: {
        name,
        workEmail,
        position,
        department,
        workMobile,
        personalMobile,
        jobPosition,
        manager,
        profile_photo,
      },
    });
    return NextResponse.json(employee);
  } catch (error: any) {
    return new Response(`Could not create employee - ${error.message}`, {
      status: 500,
    });
  }
}
