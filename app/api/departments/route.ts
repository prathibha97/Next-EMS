import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const session = getServerSession();
  if (!session) {
    throw new NextResponse('Unauthorized', { status: 401 });
  }
  const body = await req.json();
  const { name, description, manager } = body;

  if (!name || !description || !manager) {
    return new Response(`All fields are required`, {
      status: 400,
    });
  }
  try {
    const department = await prisma.department.create({
      data: {
        name,
        description,
        managerId: manager,
        employees: {
          connect: [{ id: manager }], // Connect the manager to the department's employees
        },
      },
      include: {
        employees: true, // Include the employees relation in the created department
      },
    });

    return NextResponse.json(department);
  } catch (error: any) {
    return new Response(`Could not create department - ${error.message}`, {
      status: 500,
    });
  }
}
