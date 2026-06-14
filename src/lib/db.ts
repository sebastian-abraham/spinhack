import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Check if Firebase env variables are set
const isFirebaseConfigured = process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PRIVATE_KEY;

if (isFirebaseConfigured && getApps().length === 0) {
  try {
    initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        // Ensure literal \n in private key string are converted to actual newlines
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }),
    });
    console.log('Firebase Admin initialized successfully.');
  } catch (error) {
    console.error('Firebase admin initialization error', error);
  }
}

const db = isFirebaseConfigured ? getFirestore() : null;

export type Team = {
  app_number: string;
  team_name: string;
  topic: string | null;
  locked_until: number | null; // Timestamp in milliseconds
};

// --- MOCK DATABASE FALLBACK ---
let mockDb: Record<string, Team> = {
  'APP123': { app_number: 'APP123', team_name: 'Cyber Knights', topic: null, locked_until: null },
  'APP456': { app_number: 'APP456', team_name: 'Byte Bandits', topic: null, locked_until: null },
  'APP789': { app_number: 'APP789', team_name: 'Neon Ninjas', topic: null, locked_until: null },
};

export async function getTeam(appNumber: string): Promise<Team | null> {
  if (db) {
    const doc = await db.collection('teams').doc(appNumber).get();
    if (doc.exists) {
      return doc.data() as Team;
    }
    // Auto-create dummy teams in Firebase if they don't exist yet for testing purposes
    if (['APP123', 'APP456', 'APP789'].includes(appNumber)) {
        const dummyTeamName = mockDb[appNumber].team_name;
        const newTeam: Team = { app_number: appNumber, team_name: dummyTeamName, topic: null, locked_until: null };
        await db.collection('teams').doc(appNumber).set(newTeam);
        return newTeam;
    }
    return null;
  }
  
  return mockDb[appNumber] || null;
}

export async function updateTeamLock(appNumber: string, lockedUntil: number | null): Promise<void> {
  if (db) {
    await db.collection('teams').doc(appNumber).update({ locked_until: lockedUntil });
    return;
  }
  
  if (mockDb[appNumber]) {
    mockDb[appNumber].locked_until = lockedUntil;
  }
}

export async function updateTeamTopic(appNumber: string, topic: string): Promise<void> {
  if (db) {
    await db.collection('teams').doc(appNumber).update({ topic: topic, locked_until: null });
    return;
  }
  
  if (mockDb[appNumber]) {
    mockDb[appNumber].topic = topic;
    mockDb[appNumber].locked_until = null;
  }
}
