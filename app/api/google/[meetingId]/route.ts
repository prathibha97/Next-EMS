import { google } from 'googleapis';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { v4 as uuid } from 'uuid';

interface IParams {
  meetingId: string;
}

const calendar = google.calendar({
  version: 'v3',
  auth: process.env.GOOGLE_CALENDAR_API_KEY,
});

const scopes = ['https://www.googleapis.com/auth/calendar'];

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URL
);
export async function DELETE(req: Request, { params }: { params: IParams }) {
    const session = await getServerSession();
    if (!session) {
      throw new NextResponse('Unauthorized', { status: 401 });
    }
  try {
    const { data } = await calendar.events.delete({
      calendarId: 'primary',
      eventId: params.meetingId,
      auth: oauth2Client,
    });
    return NextResponse.json(data);
  } catch (error:any) {
    console.error(error.message);
    return new NextResponse(`Unable to cancel even - ${error.message}`, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: IParams }) {
   const { summary, attendee, startDatetime, endDatetime } = await req.json();

   try {
     const { data } = await calendar.events.update({
       calendarId: 'primary',
       eventId: params.meetingId,
       auth: oauth2Client,
       requestBody: {
         summary,
         description: 'This is a test event',
         start: {
           dateTime: startDatetime,
           timeZone: 'Asia/Colombo',
         },
         end: {
           dateTime: endDatetime,
           timeZone: 'Asia/Colombo',
         },
         conferenceData: {
           createRequest: {
             requestId: uuid(),
           },
         },
         attendees: [{ email: attendee }],
       },
     });
     return NextResponse.json(data)
   } catch (error) {
     console.error(error);
     return new NextResponse('Unable to edit event', { status: 500 });
   }
}