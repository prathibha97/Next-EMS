import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

interface IParams {
  departmentId: string;
  employeeId: string;
}

export async function DELETE(req: Request, { params }: { params: IParams }) {
  const session = getServerSession();
  if (!session) {
    throw new NextResponse('Unauthorized', { status: 401 });
  }

  const { departmentId, employeeId } = params;
  console.log(params);

  try {
    // Check if the department exists
    const department = await prisma.department.findUnique({
      where: { id: departmentId },
    });

    if (!department) {
      return new Response(`Department not found`, { status: 404 });
    }

    // Check if the employee is part of the department
    const employee = await prisma.employee.findFirst({
      where: { id: employeeId, departmentId },
    });

    if (!employee) {
      return new Response(`Employee not found in the department`, {
        status: 404,
      });
    }

    // Remove the employee from the department
    await prisma.employee.update({
      where: { id: employeeId },
      data: { departmentId: null },
    });

    return new Response(`Employee removed from the department`, {
      status: 200,
    });
  } catch (error: any) {
    return new Response(`Error: ${error.message}`, { status: 500 });
  }
}
