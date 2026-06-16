"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const [team, setTeam] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const storedTeam = sessionStorage.getItem('spinhack_team');
    if (!storedTeam) {
      router.push('/');
      return;
    }
    setTeam(JSON.parse(storedTeam));
  }, [router]);

  if (!team) return <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", color: "var(--neon-pink)" }}>LOADING...</div>;

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", paddingBottom: "3rem" }}>
      <h2 style={{ color: "var(--neon-blue)", borderBottom: "1px solid var(--neon-pink)", paddingBottom: "1rem", marginBottom: "2rem" }}>TEAM PROFILE</h2>
      
      <div className="dashboard-card" style={{ marginBottom: "2rem" }}>
        <h3 style={{ color: "var(--neon-pink)", marginBottom: "1.5rem", fontSize: "1rem" }}>TEAM INFORMATION</h3>
        
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div>
            <label style={{ display: "block", color: "rgba(255,255,255,0.6)", fontSize: "0.7rem", marginBottom: "0.5rem" }}>TEAM NAME</label>
            <input type="text" className="retro-input" value={team.team_name} readOnly style={{ margin: 0, textAlign: "left", background: "rgba(0,0,0,0.3)" }} />
          </div>
          <div>
            <label style={{ display: "block", color: "rgba(255,255,255,0.6)", fontSize: "0.7rem", marginBottom: "0.5rem" }}>APPLICATION NUMBER</label>
            <input type="text" className="retro-input" value={team.app_number} readOnly style={{ margin: 0, textAlign: "left", background: "rgba(0,0,0,0.3)" }} />
          </div>
          <div>
            <label style={{ display: "block", color: "rgba(255,255,255,0.6)", fontSize: "0.7rem", marginBottom: "0.5rem" }}>CONTACT EMAIL (LEAD)</label>
            <input type="text" className="retro-input" defaultValue="lead@example.com" style={{ margin: 0, textAlign: "left" }} />
          </div>
        </div>
      </div>

      <div className="dashboard-card" style={{ marginBottom: "2rem", overflowX: "auto" }}>
        <h3 style={{ color: "var(--neon-pink)", marginBottom: "1.5rem", fontSize: "1rem" }}>MEMBERS</h3>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.8rem", textAlign: "left", minWidth: "400px" }}>
          <thead>
            <tr style={{ color: "var(--neon-blue)", borderBottom: "1px solid var(--neon-pink)" }}>
              <th style={{ padding: "1rem" }}>NAME</th>
              <th style={{ padding: "1rem" }}>ROLE</th>
              <th style={{ padding: "1rem" }}>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {[
              { name: "Alice Hacker", role: "Frontend", status: "Verified" },
              { name: "Bob Coder", role: "Backend", status: "Verified" },
              { name: "Charlie Dev", role: "Design", status: "Pending" },
              { name: "Diana Script", role: "Data", status: "Verified" },
            ].map((m, i) => (
              <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                <td style={{ padding: "1rem" }}>{m.name}</td>
                <td style={{ padding: "1rem" }}>{m.role}</td>
                <td style={{ padding: "1rem", color: m.status === "Verified" ? "#00ff00" : "orange" }}>{m.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button className="retro-button" style={{ opacity: 0.5, cursor: "not-allowed" }}>SAVE CHANGES</button>
    </div>
  );
}
