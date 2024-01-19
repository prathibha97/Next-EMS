import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { email, userEnteredOTP } = await req.json();

    const otpData = await prisma.otp.findUnique({
      where: {
        email: email,
      },
    });

    if (!otpData) {
      return new NextResponse('Otp not found', { status: 404 });
    }

    // @ts-ignore
    if (!otpData || otpData.expirationTime < Date.now()) {
      return NextResponse.json(
        { message: 'OTP has expired or is invalid' },
        { status: 400 }
      );
    }

    if (userEnteredOTP === otpData.otp) {
      await prisma.otp.delete({
        where: {
          email,
        },
      }); // Remove the used OTP
      return NextResponse.json(
        { message: 'OTP verified successfully', verified: true },
        { status: 200 }
      );
    } else {
      return NextResponse.json({
        message: 'Incorrect OTP',
        verified: false,
      }, {status:400});
    }

  } catch (error: any) {
    console.error('Failed to verify OTP - ', error.message);
    return NextResponse.json(error.message);
  }
}
