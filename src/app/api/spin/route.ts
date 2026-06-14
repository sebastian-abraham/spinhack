import { NextResponse } from 'next/server';
import { getTeam, updateTeamTopic } from '@/lib/db';

// Placeholder topics
export const TOPICS = [
  'Colgate bag',
  'Pepsi scooter',
  'Godrej toothpaste',
  'Adidas Iron box',
  'Lenovo squash',
  'Apple chips',
  'Tata mobile',
  'Benz pencil',
  'Tesla cookies',
  'MacDonald wheelchair',
  'Oreo drinks'
];

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
      return NextResponse.json({ error: 'Team has already spun!', topic: team.topic }, { status: 400 });
    }

    const now = Date.now();
    // If not locked, or lock expired, deny spin (they should login again to acquire lock)
    // However, if locked_until is null, it means no lock. For safety, let's allow it if we are testing,
    // but ideally we enforce the lock.
    if (!team.locked_until || team.locked_until < now) {
       return NextResponse.json({ error: 'Session expired. Please log in again.' }, { status: 403 });
    }

    // Randomly select a topic
    const randomIndex = Math.floor(Math.random() * TOPICS.length);
    const selectedTopic = TOPICS[randomIndex];

    // Save to DB and clear lock
    await updateTeamTopic(app_number, selectedTopic);

    return NextResponse.json({ success: true, topic: selectedTopic });
  } catch (err) {
    console.error('Spin error', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
