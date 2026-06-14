import { NextResponse } from 'next/server';
import { getTeam, updateTeamLock } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { app_number } = await request.json();
    if (!app_number) {
      return NextResponse.json({ error: 'App number is required' }, { status: 400 });
    }

    const team = await getTeam(app_number);
    if (!team) {
      return NextResponse.json({ error: 'Invalid application number' }, { status: 401 });
    }

    if (!team.topic) {
      // If they haven't spun yet, clear the lock so someone else can login
      await updateTeamLock(app_number, null);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Logout error', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
