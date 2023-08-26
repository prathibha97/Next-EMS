import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json(users);
  } catch (error:any) {
    return new Response(`Could not fetch users - ${error.message}`, {
      status: 500,
    });
  }
}