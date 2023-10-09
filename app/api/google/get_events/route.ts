import prisma from '@/lib/prisma';
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
export async function GET(req: Request) {
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

  try {
    const { data } = await calendar.events.list({
      calendarId: 'primary',
      auth: oauth2Client,
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime',
    });
    return NextResponse.json(data.items);
  } catch (error) {
    console.error(error);
    return new NextResponse('Unable to retrieve events', { status: 500 });
  }
}
