import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const session = getServerSession();
  console.log(session);
  try {
    // const employee = await prisma.employee.findUnique({
    //   where: { workEmail: email },
    // });
    // return NextResponse.json(employee);
  } catch (error: any) {
    return new Response(`Could not fetch employee - ${error.message}`, {
      status: 500,
    });
  }
}
