import OtpEmail from '@/components/emails/otp-email';
import prisma from '@/lib/prisma';
import { generateFiveDigitOTP, isValidEmail } from '@/lib/utils';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const OTP_EXPIRATION_TIME = 600;
  try {
    const { email } = await req.json();

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { message: 'Invalid email format' },
        { status: 400 }
      );
    }

    const existingOtp = await prisma.otp.findUnique({
      where: {
        email: email,
      },
    });

    if (existingOtp) {
      // Check if the previous OTP has expired
      // @ts-ignore
      if (existingOtp.expirationTime > Date.now()) {
        return NextResponse.json(
          { message: 'Previous OTP is still valid' },
          { status: 400 }
        );
      }
      // Remove the previous OTP if it has expired
      await prisma.otp.delete({
        where: {
          email,
        },
      });
    }

    const otp = generateFiveDigitOTP();
    const expirationTime = new Date(Date.now() + OTP_EXPIRATION_TIME * 1000);

    await prisma.otp.create({
      data: {
        otp,
        email,
        expirationTime,
      },
    });

    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'Your OTP for Verification',
      react: OtpEmail({
        otp,
        expirationTime: OTP_EXPIRATION_TIME,
      }),
    });

    return NextResponse.json(
      { message: 'OTP sent successfully'},
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Failed to send OTP - ', error.message);
    return NextResponse.json(error.message);
  }
}
