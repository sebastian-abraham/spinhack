"use client";

import { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [teams, setTeams] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // State for Add/Edit
  const [newAppNumber, setNewAppNumber] = useState('');
  const [newTeamName, setNewTeamName] = useState('');
  const [editAppNumber, setEditAppNumber] = useState<string | null>(null);
  const [editTeamName, setEditTeamName] = useState('');
  const [editTopic, setEditTopic] = useState('');

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    setLoading(true);
    const res = await fetch('/api/admin/teams');
    if (res.ok) {
      const data = await res.json();
      setTeams(data.teams);
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
    setLoading(false);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    if (res.ok) {
      fetchTeams();
    } else {
      alert('Invalid credentials');
    }
  };

  const handleAddTeam = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/admin/teams', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ app_number: newAppNumber.toUpperCase(), team_name: newTeamName })
    });
    if (res.ok) {
      setNewAppNumber('');
      setNewTeamName('');
      fetchTeams();
    } else {
      alert('Failed to add team');
    }
  };

  const handleUpdateTeam = async () => {
    const res = await fetch('/api/admin/teams', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ app_number: editAppNumber, team_name: editTeamName, topic: editTopic || null })
    });
    if (res.ok) {
      setEditAppNumber(null);
      fetchTeams();
    } else {
      alert('Failed to update team');
    }
  };

  const handleDeleteTeam = async (app_number: string) => {
    if (!confirm(`Are you sure you want to delete ${app_number}?`)) return;
    const res = await fetch(`/api/admin/teams?app_number=${app_number}`, {
      method: 'DELETE'
    });
    if (res.ok) {
      fetchTeams();
    } else {
      alert('Failed to delete team');
    }
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("SpinHack Teams", 14, 15);
    autoTable(doc, {
      head: [['App Number', 'Team Name', 'Topic']],
      body: teams.map(t => [t.app_number, t.team_name, t.topic || 'Not Spun']),
      startY: 20
    });
    doc.save('spinhack-teams.pdf');
  };

  const exportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(teams.map(t => ({
      'App Number': t.app_number,
      'Team Name': t.team_name,
      'Topic': t.topic || 'Not Spun'
    })));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Teams");
    XLSX.writeFile(wb, "spinhack-teams.xlsx");
  };

  if (loading) return <div className="retro-container">LOADING...</div>;

  if (!isAuthenticated) {
    return (
      <div className="retro-container">
        <h1>ADMIN LOGIN</h1>
        <form onSubmit={handleLogin}>
          <input className="retro-input" placeholder="USERNAME" value={username} onChange={e => setUsername(e.target.value)} />
          <input className="retro-input" type="password" placeholder="PASSWORD" value={password} onChange={e => setPassword(e.target.value)} />
          <button className="retro-button" type="submit">LOGIN</button>
        </form>
      </div>
    );
  }

  return (
    <div className="retro-container" style={{ width: '900px', maxWidth: '95%', padding: '2rem' }}>
      <h1>ADMIN DASHBOARD</h1>
      
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <button className="retro-button" style={{ fontSize: '0.8rem', padding: '0.5rem 1rem' }} onClick={exportPDF}>EXPORT PDF</button>
        <button className="retro-button" style={{ fontSize: '0.8rem', padding: '0.5rem 1rem' }} onClick={exportExcel}>EXPORT EXCEL</button>
      </div>

      <div style={{ border: '2px solid var(--neon-blue)', padding: '1rem', marginBottom: '2rem', textAlign: 'left' }}>
        <h3 style={{ color: 'var(--neon-blue)', marginBottom: '1rem', fontSize: '1rem' }}>ADD NEW TEAM</h3>
        <form onSubmit={handleAddTeam} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <input className="retro-input" style={{ marginBottom: 0, flex: 1, minWidth: '150px' }} placeholder="APP NO." value={newAppNumber} onChange={e => setNewAppNumber(e.target.value)} required />
          <input className="retro-input" style={{ marginBottom: 0, flex: 2, minWidth: '200px' }} placeholder="TEAM NAME" value={newTeamName} onChange={e => setNewTeamName(e.target.value)} required />
          <button className="retro-button" type="submit" style={{ padding: '0.5rem 1rem', width: 'auto' }}>ADD</button>
        </form>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', color: 'white', fontSize: '0.8rem', minWidth: '600px' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--neon-pink)', color: 'var(--neon-pink)' }}>
              <th style={{ padding: '1rem', textAlign: 'left' }}>APP NO</th>
              <th style={{ padding: '1rem', textAlign: 'left' }}>TEAM</th>
              <th style={{ padding: '1rem', textAlign: 'left' }}>TOPIC</th>
              <th style={{ padding: '1rem', textAlign: 'center' }}>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {teams.map(team => (
              <tr key={team.app_number} style={{ borderBottom: '1px solid rgba(255,255,255,0.2)' }}>
                <td style={{ padding: '1rem' }}>{team.app_number}</td>
                <td style={{ padding: '1rem' }}>
                  {editAppNumber === team.app_number ? (
                    <input className="retro-input" style={{ marginBottom: 0, padding: '0.5rem', width: '100%', fontSize: '0.8rem' }} value={editTeamName} onChange={e => setEditTeamName(e.target.value)} />
                  ) : team.team_name}
                </td>
                <td style={{ padding: '1rem' }}>
                  {editAppNumber === team.app_number ? (
                    <input className="retro-input" style={{ marginBottom: 0, padding: '0.5rem', width: '100%', fontSize: '0.8rem' }} value={editTopic} onChange={e => setEditTopic(e.target.value)} placeholder="Topic" />
                  ) : (team.topic || '-')}
                </td>
                <td style={{ padding: '1rem', textAlign: 'center' }}>
                  {editAppNumber === team.app_number ? (
                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                      <button onClick={handleUpdateTeam} style={{ background: '#00cc00', color: 'black', padding: '0.5rem', border: '2px solid white', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 'bold' }}>SAVE</button>
                      <button onClick={() => setEditAppNumber(null)} style={{ background: '#555', color: 'white', padding: '0.5rem', border: '2px solid white', cursor: 'pointer', fontFamily: 'inherit' }}>CANCEL</button>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                      <button onClick={() => { setEditAppNumber(team.app_number); setEditTeamName(team.team_name); setEditTopic(team.topic || ''); }} style={{ background: 'var(--neon-purple)', color: 'white', padding: '0.5rem', border: '2px solid white', cursor: 'pointer', fontFamily: 'inherit' }}>EDIT</button>
                      <button onClick={() => handleDeleteTeam(team.app_number)} style={{ background: '#ff3333', color: 'white', padding: '0.5rem', border: '2px solid white', cursor: 'pointer', fontFamily: 'inherit' }}>DEL</button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
            {teams.length === 0 && (
              <tr><td colSpan={4} style={{ padding: '2rem', textAlign: 'center' }}>NO TEAMS FOUND</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
