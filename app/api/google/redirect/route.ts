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
  const url = new URL(req.url);
  const code = url.searchParams.get('code');

  const { tokens } = await oauth2Client.getToken(code || '');
  oauth2Client.setCredentials(tokens);

  if (tokens.refresh_token) {
    const refresh_token = await prisma.token.create({
      data: {
        name: 'refresh_token',
        value: tokens.refresh_token,
      },
    });
    const access_token = await prisma.token.create({
      data: {
        name: 'access_token',
        value: tokens.access_token!,
      },
    });
  }

  return NextResponse.redirect('http://localhost:3000/meetings');
}
