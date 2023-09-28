import LeaveRequestEmail from '@/components/emails/leave-request-email';
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const {
      employeeId,
      type,
      startDate,
      endDate,
      reason,
      medical,
      otherProof,
    } = await req.json();

    const employee = await prisma.employee.findUnique({
      where: {
        id: employeeId,
      },
    });

    if (!employee) {
      return new NextResponse('Employee not found', { status: 404 });
    }

    const data = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'prsthibha@gmail.com',
      subject: 'New Leave Request',
      react: LeaveRequestEmail({
        company: 'Sphiria Digital Studio',
        username: employee.name,
        startDate: new Date(startDate).toLocaleDateString(),
        endDate: new Date(endDate).toLocaleDateString(),
        type,
        reason,
      }),
    });

    return NextResponse.json(data);
  } catch (error:any) {
    return NextResponse.json( error.message );
  }
}
