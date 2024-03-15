import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getAuthSession } from '../auth/[...nextauth]/options';
import { generateBoardAndLists } from '@/lib/generate-boards-and-lists';

export async function POST(req: Request) {
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

    const project = await prisma.project.create({
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

    // Generate board and lists for the project
    await generateBoardAndLists(project.id, project.name);

    return NextResponse.json(project);
  } catch (error: any) {
    console.log(error.message);
    return new Response(`Could not create project - ${error.message}`, {
      status: 500,
    });
  }
}

export async function GET(req: Request) {
  try {
    const session = await getAuthSession();
    if (!session || session.user.role !== 'ADMIN') {
      throw new NextResponse('Unauthorized', { status: 401 });
    }

    const projects = await prisma.project.findMany({});
    return NextResponse.json(projects);
  } catch (error: any) {
    console.log(error.message);
    return new Response(`Could not fetch projects - ${error.message}`, {
      status: 500,
    });
  }
}