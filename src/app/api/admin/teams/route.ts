import { NextResponse } from 'next/server';
import { getAllTeams, addTeam, updateTeam, deleteTeam } from '@/lib/db';
import { cookies } from 'next/headers';

const isAdmin = async () => {
  const cookieStore = await cookies();
  return cookieStore.get('spinhack_admin')?.value === 'true';
}

export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
      const teams = await getAllTeams();
      return NextResponse.json({ teams });
  } catch (e) {
      console.error(e);
      return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
      const { app_number, team_name, members } = await request.json();
      if (!app_number || !team_name) return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
      
      await addTeam({ app_number, team_name, topic: null, locked_until: null, members: members || [] });
      return NextResponse.json({ success: true });
  } catch (e) {
      return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
      const { app_number, team_name, topic, members } = await request.json();
      if (!app_number) return NextResponse.json({ error: 'Missing app_number' }, { status: 400 });
      
      const updateData: any = {};
      if (team_name !== undefined) updateData.team_name = team_name;
      if (topic !== undefined) updateData.topic = topic;
      if (members !== undefined) updateData.members = members;
      
      await updateTeam(app_number, updateData);
      return NextResponse.json({ success: true });
  } catch (e) {
      return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
      const { searchParams } = new URL(request.url);
      const app_number = searchParams.get('app_number');
      if (!app_number) return NextResponse.json({ error: 'Missing app_number' }, { status: 400 });
      
      await deleteTeam(app_number);
      return NextResponse.json({ success: true });
  } catch (e) {
      return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}
