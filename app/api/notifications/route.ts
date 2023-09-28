import { NextResponse } from "next/server";
import { getAuthSession } from "../auth/[...nextauth]/options";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  const session = await getAuthSession();

  if (!session || session.user.role !== "ADMIN") {
    throw new NextResponse('Unauthorized', { status: 401 });
  }
  try {
    const notifications = await prisma.notification.findMany();
    return NextResponse.json(notifications);
  } catch (error: any) {
    return new Response(`Could not fetch notifications - ${error.message}`, {
      status: 500,
    });
  }
}