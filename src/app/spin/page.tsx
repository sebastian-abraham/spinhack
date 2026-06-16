"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import SpinWheel from './SpinWheel';

export default function SpinPage() {
  const [team, setTeam] = useState<any>(null);
  const [finalTopic, setFinalTopic] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Load team from session storage
    const storedTeam = sessionStorage.getItem('spinhack_team');
    if (!storedTeam) {
      router.push('/');
      return;
    }

    const parsedTeam = JSON.parse(storedTeam);
    setTeam(parsedTeam);
    if (parsedTeam.topic) {
      router.push('/dashboard');
    }
  }, [router]);

  const handleLogout = async () => {
    if (team && !team.topic && !finalTopic) {
        // Unlock if they haven't spun
        try {
            await fetch('/api/logout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ app_number: team.app_number }),
            });
        } catch (e) {}
    }
    sessionStorage.removeItem('spinhack_team');
    router.push('/');
  };

  const onSpinComplete = (topic: string) => {
    setFinalTopic(topic);
    // Update session storage
    const newTeam = { ...team, topic };
    sessionStorage.setItem('spinhack_team', JSON.stringify(newTeam));
    setTeam(newTeam);
    
    // Redirect after a short delay so they can see the result
    setTimeout(() => {
      router.push('/dashboard');
    }, 2000);
  };

  if (!team) return <div className="retro-container">LOADING...</div>;

  return (
    <div className="retro-container" style={{ width: '800px', maxWidth: '95%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--neon-blue)', marginBottom: '0.5rem' }}>TEAM</div>
            <div style={{ fontSize: '1.2rem', color: 'white' }}>{team.team_name}</div>
        </div>
        <button 
            className="retro-button" 
            style={{ padding: '0.5rem 1rem', fontSize: '0.8rem', width: 'auto' }}
            onClick={handleLogout}
        >
            LOGOUT
        </button>
      </div>

      <hr style={{ borderColor: 'var(--neon-pink)', marginBottom: '2rem' }} />

      {!finalTopic ? (
        <SpinWheel onSpinComplete={onSpinComplete} appNumber={team.app_number} />
      ) : (
        <div style={{ margin: '4rem 0', textAlign: 'center' }}>
          <h2 style={{ marginBottom: '2rem', color: 'var(--neon-blue)', fontSize: '1.2rem', lineHeight: '1.8' }}>YOUR HACKATHON TOPIC IS</h2>
          <div className="topic-result">{finalTopic}</div>
        </div>
      )}
    </div>
  );
}
