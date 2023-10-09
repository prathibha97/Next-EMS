import prisma from '@/lib/prisma';
import {v4 as uuid} from 'uuid'
import { google } from 'googleapis';
import { NextResponse } from 'next/server';

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
export async function POST(req: Request) {
  try {
    const { summary, attendee, startDatetime, endDatetime } = await req.json();

    const refresh_token = await prisma.token.findFirst({
      where: {
        name: 'refresh_token',
      },
    });

    const access_token = await prisma.token.findFirst({
      where: {
        name: 'access_token',
      },
    });

    oauth2Client.setCredentials({
      refresh_token: refresh_token?.value,
      access_token: access_token?.value,
    });

    const { data } = await calendar.events.insert({
      calendarId: 'primary',
      auth: oauth2Client,
      conferenceDataVersion: 1,
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
    console.log(data);
    return NextResponse.json(data);
  } catch (error: any) {
    console.log(error.message);
    return new NextResponse(`Failed to schedule meeting - ${error.message}`, {
      status: 500,
    });
  }
}
