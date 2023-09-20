import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { getAuthSession } from '../../auth/[...nextauth]/options';

interface IParams {
  employeeId?: string;
}

export async function GET(req: Request, { params }: { params: IParams }) {
  const session = await getAuthSession();
  if (!session || session.user.role !== 'ADMIN') {
    throw new NextResponse('Unauthorized', { status: 401 });
  }

  const { employeeId } = params;
  try {
    const employee = await prisma.employee.findUnique({
      where: {
        id: employeeId,
      },
      include: {
        Department: true,
        user: true,
        Attendance: true,
        Payroll: true,
        Leave: true,
        leaveBalance: true,
      },
    });
    return NextResponse.json(employee);
  } catch (error: any) {
    return new Response(`Could not fetch employee - ${error.message}`, {
      status: 500,
    });
  }
}

// export async function PUT(req: Request, { params }: { params: IParams }) {
//   const session = await getAuthSession();
//   if (!session || session.user.role !== 'ADMIN') {
//     throw new NextResponse('Unauthorized', { status: 401 });
//   }

//   try {
//     const { employeeId } = params;
//     const body = await req.json();

//     // Validate that the provided userId corresponds to an existing User record
//     const { userId, ...otherEmployeeData } = body;

//     if (!userId) {
//       throw new Error('userId is undefined');
//     }

//     const user = await prisma.user.findUnique({
//       where: { id: userId },
//     });

//     if (!user) {
//       throw new Error(`User with id ${userId} not found.`);
//     }

//     const employee = await prisma.employee.update({
//       where: {
//         id: employeeId,
//       },
//       data: {
//         ...otherEmployeeData,
//         user: {
//           connect: {
//             id: userId,
//           },
//         },
//       },
//     });

//     return NextResponse.json(employee);
//   } catch (error: any) {
//     return new Response(`Could not update employee - ${error.message}`, {
//       status: 500,
//     });
//   }
// }

export async function PUT(req: Request, { params }: { params: IParams }) {
  const session = await getAuthSession();
  if (!session || session.user.role !== 'ADMIN') {
    throw new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const { employeeId } = params;
    const body = await req.json();

    const { userId, ...otherEmployeeData } = body;

    if (userId) {
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        throw new Error(`User with id ${userId} not found.`);
      }
    }

    const updateData = {
      ...otherEmployeeData,
    };

    if (userId) {
      updateData.user = {
        connect: {
          id: userId,
        },
      };
    }

    const employee = await prisma.employee.update({
      where: {
        id: employeeId,
      },
      data: updateData,
    });

    return NextResponse.json(employee);
  } catch (error: any) {
    return new Response(`Could not update employee - ${error.message}`, {
      status: 500,
    });
  }

}
