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

    if (team.topic) {
      // Already spun, allow entry to view topic
      return NextResponse.json({ success: true, team });
    }

    // Not spun, check lock
    const now = Date.now();
    if (team.locked_until && team.locked_until > now) {
      return NextResponse.json({ error: 'Another team member is currently logging in to spin. Please wait.' }, { status: 409 });
    }

    // Acquire lock for 5 minutes
    const lockUntil = now + 5 * 60 * 1000;
    await updateTeamLock(app_number, lockUntil);
    
    team.locked_until = lockUntil;

    return NextResponse.json({ success: true, team });
  } catch (err) {
    console.error('Login error', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
