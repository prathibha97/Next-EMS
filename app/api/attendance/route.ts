import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const session = await getServerSession();
  if (!session) {
    throw new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const body = await req.json();
    const { employeeId, date, timeIn, timeOut } = body;

    const recordDate = new Date(date);
    console.log('employeeId:', employeeId);
    console.log('date:', recordDate);


    // Check if an attendance record already exists for the given employee and date
    const existingAttendance = await prisma.attendance.findFirst({
      where: {
        employeeId,
      },
    });
    console.log('existing attendance',existingAttendance);

    if (!existingAttendance) {
      // Create a new attendance record with timeIn and other relevant details
      const timeInDate = new Date(timeIn);

      const newAttendance = await prisma.attendance.create({
        data: {
          employee: {
            connect: { id: employeeId },
          },
          date,
          timeIn: timeInDate,
          timeOut: null, // Initialize timeOut to null
          totalHours: '0.00', // Initialize total hours
        },
      });

      return NextResponse.json({
        message: 'Attendance marked successfully',
        attendance: newAttendance,
      });
    } else if (!existingAttendance.timeOut) {
      // Update the existing attendance record's timeOut and recalculate totalHours
      const timeOutDate = new Date(timeOut);
      const hoursDifference =
      // @ts-ignore
        Math.abs(timeOutDate - existingAttendance.timeIn) / 36e5; // Calculate hours difference

      const updatedAttendance = await prisma.attendance.update({
        where: { id: existingAttendance.id },
        data: {
          timeOut: timeOutDate,
          totalHours: hoursDifference.toFixed(2), // Convert hours to a fixed decimal format
        },
      });

      return NextResponse.json({
        message: 'Attendance updated successfully',
        attendance: updatedAttendance,
      });
    } else {
      // Attendance already marked for the day
      return NextResponse.json({
        error: 'Attendance already marked for the day',
      });
      
    }
  } catch (error: any) {
    return new Response(
      `Could not create/update attendance - ${error.message}`,
      {
        status: 500,
      }
    );
  }
}
