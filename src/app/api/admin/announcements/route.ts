import { NextResponse } from 'next/server';
import { getAnnouncements, addAnnouncement, deleteAnnouncement } from '@/lib/db';
import { cookies } from 'next/headers';

const isAdmin = async () => {
  const cookieStore = await cookies();
  return cookieStore.get('spinhack_admin')?.value === 'true';
}

export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
      const announcements = await getAnnouncements();
      return NextResponse.json({ announcements });
  } catch (e) {
      return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
      const ann = await request.json();
      if (!ann.title || !ann.desc) return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
      
      await addAnnouncement(ann);
      return NextResponse.json({ success: true });
  } catch (e) {
      return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
      const { searchParams } = new URL(request.url);
      const id = searchParams.get('id');
      if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
      
      await deleteAnnouncement(id);
      return NextResponse.json({ success: true });
  } catch (e) {
      return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}
