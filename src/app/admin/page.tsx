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
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Teams Add/Edit State
  const [newAppNumber, setNewAppNumber] = useState('');
  const [newTeamName, setNewTeamName] = useState('');
  const [newMembers, setNewMembers] = useState<{name: string, role: string, status: string}[]>([]);
  
  const [editAppNumber, setEditAppNumber] = useState<string | null>(null);
  const [editTeamName, setEditTeamName] = useState('');
  const [editTopic, setEditTopic] = useState('');
  const [editMembers, setEditMembers] = useState<{name: string, role: string, status: string}[]>([]);

  // Announcements Add State
  const [newAnnouncementTitle, setNewAnnouncementTitle] = useState('');
  const [newAnnouncementDesc, setNewAnnouncementDesc] = useState('');
  const [newAnnouncementDate, setNewAnnouncementDate] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const res = await fetch('/api/admin/teams');
    if (res.ok) {
      const data = await res.json();
      setTeams(data.teams);
      setIsAuthenticated(true);
      fetchAnnouncements();
    } else {
      setIsAuthenticated(false);
    }
    setLoading(false);
  };

  const fetchAnnouncements = async () => {
    const res = await fetch('/api/admin/announcements');
    if (res.ok) {
      const data = await res.json();
      setAnnouncements(data.announcements);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    if (res.ok) {
      fetchData();
    } else {
      alert('Invalid credentials');
    }
  };

  // Team Functions
  const handleAddTeam = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/admin/teams', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ app_number: newAppNumber.toUpperCase(), team_name: newTeamName, members: newMembers })
    });
    if (res.ok) {
      setNewAppNumber('');
      setNewTeamName('');
      setNewMembers([]);
      fetchData();
    } else {
      alert('Failed to add team');
    }
  };

  const handleUpdateTeam = async () => {
    const res = await fetch('/api/admin/teams', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ app_number: editAppNumber, team_name: editTeamName, topic: editTopic || null, members: editMembers })
    });
    if (res.ok) {
      setEditAppNumber(null);
      fetchData();
    } else {
      alert('Failed to update team');
    }
  };

  const handleDeleteTeam = async (app_number: string) => {
    if (!confirm(`Are you sure you want to delete ${app_number}?`)) return;
    const res = await fetch(`/api/admin/teams?app_number=${app_number}`, { method: 'DELETE' });
    if (res.ok) fetchData();
    else alert('Failed to delete team');
  };

  // Announcement Functions
  const handleAddAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/admin/announcements', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newAnnouncementTitle, desc: newAnnouncementDesc, date: newAnnouncementDate, createdAt: Date.now() })
    });
    if (res.ok) {
      setNewAnnouncementTitle('');
      setNewAnnouncementDesc('');
      setNewAnnouncementDate('');
      fetchAnnouncements();
    } else alert('Failed to add announcement');
  };

  const handleDeleteAnnouncement = async (id: string) => {
    if (!confirm(`Are you sure you want to delete this announcement?`)) return;
    const res = await fetch(`/api/admin/announcements?id=${id}`, { method: 'DELETE' });
    if (res.ok) fetchAnnouncements();
    else alert('Failed to delete announcement');
  };

  // Export functions
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
    <div className="retro-container" style={{ width: '90%', maxWidth: '1200px', padding: '2rem' }}>
      <h1>ADMIN DASHBOARD</h1>
      
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <button className="retro-button" style={{ fontSize: '0.8rem', padding: '0.5rem 1rem' }} onClick={exportPDF}>EXPORT PDF</button>
        <button className="retro-button" style={{ fontSize: '0.8rem', padding: '0.5rem 1rem' }} onClick={exportExcel}>EXPORT EXCEL</button>
      </div>

      {/* TEAMS SECTION */}
      <h2 style={{ color: 'var(--neon-blue)', borderBottom: '1px solid var(--neon-pink)', paddingBottom: '0.5rem', marginBottom: '1rem', textAlign: 'left' }}>TEAMS MANAGEMENT</h2>
      
      <div style={{ border: '2px solid var(--neon-blue)', padding: '1rem', marginBottom: '2rem', textAlign: 'left' }}>
        <h3 style={{ color: 'var(--neon-blue)', marginBottom: '1rem', fontSize: '1rem' }}>ADD NEW TEAM</h3>
        <form onSubmit={handleAddTeam} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <input className="retro-input" style={{ marginBottom: 0, flex: 1, minWidth: '150px' }} placeholder="APP NO." value={newAppNumber} onChange={e => setNewAppNumber(e.target.value)} required />
            <input className="retro-input" style={{ marginBottom: 0, flex: 2, minWidth: '200px' }} placeholder="TEAM NAME" value={newTeamName} onChange={e => setNewTeamName(e.target.value)} required />
          </div>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--neon-pink)', marginBottom: '0.5rem' }}>MEMBERS</div>
            {newMembers.map((m, i) => (
              <div key={i} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <input className="retro-input" style={{ marginBottom: 0, padding: '0.5rem' }} placeholder="Name" value={m.name} onChange={e => { const nm = [...newMembers]; nm[i].name = e.target.value; setNewMembers(nm); }} required />
                <input className="retro-input" style={{ marginBottom: 0, padding: '0.5rem' }} placeholder="Role" value={m.role} onChange={e => { const nm = [...newMembers]; nm[i].role = e.target.value; setNewMembers(nm); }} required />
                <input className="retro-input" style={{ marginBottom: 0, padding: '0.5rem' }} placeholder="Status" value={m.status} onChange={e => { const nm = [...newMembers]; nm[i].status = e.target.value; setNewMembers(nm); }} required />
                <button type="button" onClick={() => setNewMembers(newMembers.filter((_, idx) => idx !== i))} style={{ background: '#ff3333', color: 'white', padding: '0.5rem', border: '1px solid white', cursor: 'pointer' }}>X</button>
              </div>
            ))}
            <button type="button" className="retro-button" style={{ padding: '0.5rem', fontSize: '0.8rem', width: 'auto' }} onClick={() => setNewMembers([...newMembers, {name: '', role: '', status: 'Verified'}])}>+ ADD MEMBER</button>
          </div>
          <button className="retro-button" type="submit" style={{ padding: '0.5rem 1rem', width: 'auto', alignSelf: 'flex-start' }}>ADD TEAM</button>
        </form>
      </div>

      <div style={{ overflowX: 'auto', marginBottom: '3rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', color: 'white', fontSize: '0.8rem', minWidth: '800px' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--neon-pink)', color: 'var(--neon-pink)' }}>
              <th style={{ padding: '1rem', textAlign: 'left' }}>APP NO</th>
              <th style={{ padding: '1rem', textAlign: 'left' }}>TEAM</th>
              <th style={{ padding: '1rem', textAlign: 'left' }}>TOPIC</th>
              <th style={{ padding: '1rem', textAlign: 'left' }}>MEMBERS</th>
              <th style={{ padding: '1rem', textAlign: 'center' }}>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {teams.map(team => (
              <tr key={team.app_number} style={{ borderBottom: '1px solid rgba(255,255,255,0.2)' }}>
                <td style={{ padding: '1rem', verticalAlign: 'top' }}>{team.app_number}</td>
                <td style={{ padding: '1rem', verticalAlign: 'top' }}>
                  {editAppNumber === team.app_number ? (
                    <input className="retro-input" style={{ marginBottom: 0, padding: '0.5rem', width: '100%', fontSize: '0.8rem' }} value={editTeamName} onChange={e => setEditTeamName(e.target.value)} />
                  ) : team.team_name}
                </td>
                <td style={{ padding: '1rem', verticalAlign: 'top' }}>
                  {editAppNumber === team.app_number ? (
                    <input className="retro-input" style={{ marginBottom: 0, padding: '0.5rem', width: '100%', fontSize: '0.8rem' }} value={editTopic} onChange={e => setEditTopic(e.target.value)} placeholder="Topic" />
                  ) : (team.topic || '-')}
                </td>
                <td style={{ padding: '1rem', verticalAlign: 'top' }}>
                  {editAppNumber === team.app_number ? (
                    <div>
                      {editMembers.map((m, i) => (
                        <div key={i} style={{ display: 'flex', gap: '0.2rem', marginBottom: '0.5rem' }}>
                          <input className="retro-input" style={{ marginBottom: 0, padding: '0.3rem', width: '80px', fontSize: '0.7rem' }} value={m.name} onChange={e => { const nm = [...editMembers]; nm[i].name = e.target.value; setEditMembers(nm); }} />
                          <input className="retro-input" style={{ marginBottom: 0, padding: '0.3rem', width: '60px', fontSize: '0.7rem' }} value={m.role} onChange={e => { const nm = [...editMembers]; nm[i].role = e.target.value; setEditMembers(nm); }} />
                          <button type="button" onClick={() => setEditMembers(editMembers.filter((_, idx) => idx !== i))} style={{ background: '#ff3333', color: 'white', padding: '0.3rem', border: '1px solid white', cursor: 'pointer', fontSize: '0.6rem' }}>X</button>
                        </div>
                      ))}
                      <button type="button" style={{ background: 'transparent', color: 'var(--neon-pink)', border: '1px solid var(--neon-pink)', padding: '0.3rem', cursor: 'pointer', fontSize: '0.6rem' }} onClick={() => setEditMembers([...editMembers, {name: '', role: '', status: 'Verified'}])}>+ MEM</button>
                    </div>
                  ) : (
                    <div>
                      {team.members?.map((m: any, i: number) => <div key={i} style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.7)' }}>{m.name} ({m.role})</div>) || '-'}
                    </div>
                  )}
                </td>
                <td style={{ padding: '1rem', textAlign: 'center', verticalAlign: 'top' }}>
                  {editAppNumber === team.app_number ? (
                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                      <button onClick={handleUpdateTeam} style={{ background: '#00cc00', color: 'black', padding: '0.5rem', border: '2px solid white', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 'bold' }}>SAVE</button>
                      <button onClick={() => setEditAppNumber(null)} style={{ background: '#555', color: 'white', padding: '0.5rem', border: '2px solid white', cursor: 'pointer', fontFamily: 'inherit' }}>CANCEL</button>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                      <button onClick={() => { setEditAppNumber(team.app_number); setEditTeamName(team.team_name); setEditTopic(team.topic || ''); setEditMembers(team.members || []); }} style={{ background: 'var(--neon-purple)', color: 'white', padding: '0.5rem', border: '2px solid white', cursor: 'pointer', fontFamily: 'inherit' }}>EDIT</button>
                      <button onClick={() => handleDeleteTeam(team.app_number)} style={{ background: '#ff3333', color: 'white', padding: '0.5rem', border: '2px solid white', cursor: 'pointer', fontFamily: 'inherit' }}>DEL</button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
            {teams.length === 0 && (
              <tr><td colSpan={5} style={{ padding: '2rem', textAlign: 'center' }}>NO TEAMS FOUND</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ANNOUNCEMENTS SECTION */}
      <h2 style={{ color: 'var(--neon-blue)', borderBottom: '1px solid var(--neon-pink)', paddingBottom: '0.5rem', marginBottom: '1rem', textAlign: 'left' }}>ANNOUNCEMENTS MANAGEMENT</h2>
      
      <div style={{ border: '2px solid var(--neon-blue)', padding: '1rem', marginBottom: '2rem', textAlign: 'left' }}>
        <h3 style={{ color: 'var(--neon-blue)', marginBottom: '1rem', fontSize: '1rem' }}>ADD ANNOUNCEMENT</h3>
        <form onSubmit={handleAddAnnouncement} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input className="retro-input" style={{ marginBottom: 0 }} placeholder="TITLE" value={newAnnouncementTitle} onChange={e => setNewAnnouncementTitle(e.target.value)} required />
          <input className="retro-input" style={{ marginBottom: 0 }} placeholder="DATE (e.g. 15 MAY 2025, 09:00 AM)" value={newAnnouncementDate} onChange={e => setNewAnnouncementDate(e.target.value)} required />
          <textarea className="retro-input" style={{ marginBottom: 0, resize: 'vertical' }} rows={3} placeholder="DESCRIPTION" value={newAnnouncementDesc} onChange={e => setNewAnnouncementDesc(e.target.value)} required />
          <button className="retro-button" type="submit" style={{ padding: '0.5rem 1rem', width: 'auto', alignSelf: 'flex-start' }}>POST ANNOUNCEMENT</button>
        </form>
      </div>

      <div style={{ overflowX: 'auto', marginBottom: '3rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', color: 'white', fontSize: '0.8rem', minWidth: '600px' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--neon-pink)', color: 'var(--neon-pink)' }}>
              <th style={{ padding: '1rem', textAlign: 'left' }}>TITLE</th>
              <th style={{ padding: '1rem', textAlign: 'left' }}>DATE</th>
              <th style={{ padding: '1rem', textAlign: 'left' }}>DESCRIPTION</th>
              <th style={{ padding: '1rem', textAlign: 'center' }}>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {announcements.map(ann => (
              <tr key={ann.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.2)' }}>
                <td style={{ padding: '1rem', verticalAlign: 'top' }}>{ann.title}</td>
                <td style={{ padding: '1rem', verticalAlign: 'top' }}>{ann.date}</td>
                <td style={{ padding: '1rem', verticalAlign: 'top', maxWidth: '300px', wordWrap: 'break-word' }}>{ann.desc}</td>
                <td style={{ padding: '1rem', textAlign: 'center', verticalAlign: 'top' }}>
                  <button onClick={() => handleDeleteAnnouncement(ann.id)} style={{ background: '#ff3333', color: 'white', padding: '0.5rem', border: '2px solid white', cursor: 'pointer', fontFamily: 'inherit' }}>DEL</button>
                </td>
              </tr>
            ))}
            {announcements.length === 0 && (
              <tr><td colSpan={4} style={{ padding: '2rem', textAlign: 'center' }}>NO ANNOUNCEMENTS</td></tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}
