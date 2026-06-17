import { NextResponse } from 'next/server';
import { getAnnouncements } from '@/lib/db';

// Public endpoint for dashboard
export async function GET() {
  try {
      const announcements = await getAnnouncements();
      return NextResponse.json({ announcements });
  } catch (e) {
      return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}
