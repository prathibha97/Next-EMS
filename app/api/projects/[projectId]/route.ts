import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getAuthSession } from '../../auth/[...nextauth]/options';

interface IParams {
  projectId: string;
}

export async function PUT(req: Request, { params }: { params: IParams }) {
  try {
    const session = await getAuthSession();
    if (!session || session.user.role !== 'ADMIN') {
      throw new NextResponse('Unauthorized', { status: 401 });
    }
    const body = await req.json();
    const {
      name,
      clientId,
      designLink,
      employees,
      startDate,
      endDate,
      status,
      nftBaseDesignCount,
      nftCollectionSize,
      nftTraitCount,
      projectScope,
      specialNotes,
      category,
    } = body;

    // Find employees by their names
    const employeeNames = employees as string[];
    const employeeRecords = await prisma.employee.findMany({
      where: {
        name: {
          in: employeeNames,
        },
      },
    });

    // Extract employee IDs
    const employeeIds = employeeRecords.map((employee) => employee.id);

    const project = await prisma.project.update({
      where: {
        id: params.projectId,
      },
      data: {
        name,
        client: {
          connect: {
            id: clientId,
          },
        },
        designLink,
        startDate,
        endDate,
        status,
        nftBaseDesignCount,
        nftCollectionSize,
        nftTraitCount,
        projectScope,
        specialNotes,
        category,
        projectAssignees: {
          create: employeeIds.map((id: string) => ({
            employee: {
              connect: {
                id: id,
              },
            },
          })),
        },
      },
    });
    return NextResponse.json(project);
  } catch (error: any) {
    console.log(error.message);
    return new Response(`Could not create project - ${error.message}`, {
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
    const project = await prisma.project.findUnique({
      where: {
        id: params.projectId,
      },
    });
    if (!project) {
      return new NextResponse('Client not found', { status: 404 });
    }

    const removedProject = await prisma.project.delete({
      where: {
        id: params.projectId,
      },
    });
    return NextResponse.json(removedProject);
  } catch (error: any) {
    console.log(error.message);
    return new Response(`Could not remove project - ${error.message}`, {
      status: 500,
    });
  }
}
