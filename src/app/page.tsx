"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [appNumber, setAppNumber] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!appNumber.trim()) {
      setError('PLEASE ENTER YOUR APPLICATION NO.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ app_number: appNumber.toUpperCase() }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'LOGIN FAILED');
      } else {
        // Store in sessionStorage so spin page knows who is logged in
        sessionStorage.setItem('spinhack_team', JSON.stringify(data.team));
        if (data.team.topic) {
          router.push('/dashboard');
        } else {
          router.push('/spin');
        }
      }
    } catch (err) {
      setError('NETWORK ERROR. PLEASE TRY AGAIN.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="retro-container">
      <h1>SPINHACK</h1>
      <form onSubmit={handleLogin}>
        <input 
          type="text" 
          className="retro-input" 
          placeholder="APPLICATION NO." 
          value={appNumber}
          onChange={(e) => setAppNumber(e.target.value.toUpperCase())}
          disabled={loading}
        />
        <div className="error-text">{error}</div>
        <button type="submit" className="retro-button" disabled={loading}>
          {loading ? 'WAIT...' : 'PRESS START'}
        </button>
      </form>
    </div>
  );
}
