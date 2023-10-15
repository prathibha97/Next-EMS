import ProjectDeadlineReminderEmail from '@/components/emails/deadline-reminder-email';
import prisma from '@/lib/prisma';
import { NextResponse, type NextRequest } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const twoDaysFromNow = new Date();
    twoDaysFromNow.setDate(twoDaysFromNow.getDate() + 2);
    const projects = await prisma.project.findMany({
      where: {
        endDate: {
          lte: twoDaysFromNow,
        },
      },
      include: {
        client: true,
      },
    });

    // Iterate through projects and send notifications
    for (const project of projects) {
      const data = await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: 'prsthibha@gmail.com',
        subject: 'Project Deadline Reminder',
        react: ProjectDeadlineReminderEmail({
          project,
        }),
      });
    }
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(error.message);
  }
}
