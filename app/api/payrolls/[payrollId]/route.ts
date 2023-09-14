import { NextResponse } from "next/server";
import { getAuthSession } from "../../auth/[...nextauth]/options";
import prisma from "@/lib/prisma";

interface IParams {
  payrollId?: string;
}

export async function DELETE(req: Request, { params }: { params: IParams }) {
  const session = await getAuthSession();

  if (!session || session.user.role !== 'ADMIN') {
    throw new NextResponse('Unauthorized', { status: 401 });
  }

  const { payrollId } = params;

  try {
    await prisma.payroll.delete({
      where: {
        id: payrollId,
      },
    });
  } catch (error) {
    console.error(error);
    throw new NextResponse('Internal Server Error', { status: 500 });
  }

  return new NextResponse(null, { status: 204 });
}