import prisma from '@/lib/prisma';
import { getSession } from 'next-auth/react';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const session = await getSession();

  if (!session) {
    throw new NextResponse('Unauthorized', { status: 401 });
  }
console.log(session.user.id);
     try {
       const { id } = session.user; 
       const date = new Date(); 
       const timeIn = date.toISOString();

       // Check if an attendance record already exists for the given employee and date
       const existingAttendance = await prisma.attendance.findFirst({
         where: {
           AND: [
             { userId: id },
             { date: { gte: new Date(date.toDateString()) } }, // Check if date is today or later
           ],
         },
       });

       if (existingAttendance) {
         if (!existingAttendance.timeOut) {
           // If timeOut is not marked, mark it as the current time
           existingAttendance.timeOut = date;
           await prisma.attendance.update({
             where: { id: existingAttendance.id },
             data: { timeOut: existingAttendance.timeOut },
           });
           return NextResponse.json(existingAttendance);  
         } else {
           // Attendance has already been marked for the day
             throw new NextResponse('Attendance already marked for the day', { status: 400 });
         }
       }

       // Create a new attendance record in the database with timeIn
       const attendance = await prisma.attendance.create({
         data: {
           date,
           timeIn,
           employee: {
             connect: { userId: id },
           },
         },
       });

       return NextResponse.json(attendance);
     } catch (error) {
       console.error('Error creating attendance:', error);
       throw new NextResponse('Internal Server Error', { status: 500 });
     }

}
