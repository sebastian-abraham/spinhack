"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut, Calendar, Monitor, Users, ShieldCheck, ChevronRight, Clock, MapPin, Megaphone, User } from "lucide-react";

export default function DashboardPage() {
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

  const handleLogout = () => {
    sessionStorage.removeItem('spinhack_team');
    router.push('/');
  };

  if (!team) return <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", color: "var(--neon-pink)" }}>LOADING...</div>;

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
      {/* Top Bar */}
      <div className="top-bar">
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <Calendar color="var(--neon-blue)" />
          <div>
            <div style={{ color: "var(--neon-blue)", fontSize: "0.8rem", marginBottom: "0.2rem" }}>15 - 17 MAY 2025</div>
            <div style={{ fontSize: "0.6rem", color: "rgba(255,255,255,0.7)" }}>// THE ULTIMATE HACKATHON EXPERIENCE //</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
          <div style={{ textAlign: "right" }}>
            <div style={{ color: "var(--neon-pink)", fontSize: "0.6rem", marginBottom: "0.5rem" }}>HACK STARTS IN</div>
            <div style={{ color: "var(--neon-blue)", fontSize: "1.2rem" }}>02D : 14H : 22M : 18S</div>
          </div>
          <button onClick={handleLogout} style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: "transparent", border: "1px solid var(--neon-pink)", color: "var(--neon-pink)", padding: "0.5rem 1rem", cursor: "pointer", fontFamily: "inherit", fontSize: "0.8rem", transition: "all 0.3s" }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,0,127,0.2)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
            LOGOUT <LogOut size={16} />
          </button>
        </div>
      </div>

      {/* Welcome Banner */}
      <div style={{ border: "1px solid var(--neon-pink)", padding: "2rem", marginBottom: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(255,0,127,0.05)" }}>
        <div>
          <div style={{ color: "var(--neon-blue)", fontSize: "1rem", marginBottom: "1rem" }}>WELCOME BACK,</div>
          <h2 style={{ color: "var(--neon-pink)", fontSize: "2.5rem", margin: "0 0 1rem 0", textShadow: "0 0 10px var(--neon-pink)" }}>{team.team_name.toUpperCase()}</h2>
          <div style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.8rem" }}>Gear up. Build wild. Win big. 🚀</div>
        </div>
        <div>
          <Monitor size={100} color="var(--neon-blue)" style={{ filter: "drop-shadow(0 0 10px var(--neon-blue))" }} />
        </div>
      </div>

      {/* Stats Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem", marginBottom: "1.5rem" }}>
        <div className="dashboard-card" style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <div style={{ background: "rgba(255,0,127,0.2)", padding: "0.5rem", borderRadius: "4px" }}><User color="var(--neon-pink)" /></div>
          <div>
            <div style={{ color: "var(--neon-blue)", fontSize: "0.6rem", marginBottom: "0.5rem" }}>TEAM ID</div>
            <div style={{ fontSize: "1rem" }}>{team.app_number}</div>
          </div>
        </div>
        <div className="dashboard-card" style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <div style={{ background: "rgba(255,0,127,0.2)", padding: "0.5rem", borderRadius: "4px" }}><Users color="var(--neon-pink)" /></div>
          <div>
            <div style={{ color: "var(--neon-blue)", fontSize: "0.6rem", marginBottom: "0.5rem" }}>TEAM MEMBERS</div>
            <div style={{ fontSize: "1rem", color: "var(--neon-pink)" }}>4</div>
          </div>
        </div>
        <div className="dashboard-card" style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <div style={{ background: "rgba(255,0,127,0.2)", padding: "0.5rem", borderRadius: "4px" }}><Calendar color="var(--neon-pink)" /></div>
          <div>
            <div style={{ color: "var(--neon-blue)", fontSize: "0.6rem", marginBottom: "0.5rem" }}>REGISTRATION DATE</div>
            <div style={{ fontSize: "1rem" }}>10 MAY 2025</div>
          </div>
        </div>
        <div className="dashboard-card" style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <div style={{ background: "rgba(0,255,0,0.2)", padding: "0.5rem", borderRadius: "4px" }}><ShieldCheck color="#00ff00" /></div>
          <div>
            <div style={{ color: "var(--neon-blue)", fontSize: "0.6rem", marginBottom: "0.5rem" }}>TEAM STATUS</div>
            <div style={{ fontSize: "1rem", color: "#00ff00" }}>VERIFIED</div>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="dashboard-grid" style={{ gridTemplateColumns: "1fr 1fr 1fr" }}>
        
        {/* Topic */}
        <div className="dashboard-card" style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ color: "var(--neon-blue)", fontSize: "0.8rem", marginBottom: "2rem" }}>YOUR HACKATHON TOPIC</div>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <h3 className="topic-result" style={{ fontSize: "2rem", marginBottom: "2rem", textAlign: "left", lineHeight: "1.4" }}>{team.topic || "NOT ASSIGNED YET"}</h3>
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.7rem", lineHeight: "1.6", marginBottom: "2rem" }}>
              Revolutionizing snack breaks with smart, sustainable energy.
            </p>
          </div>
          <button style={{ background: "transparent", border: "1px solid var(--neon-pink)", color: "var(--neon-pink)", padding: "1rem", width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", fontFamily: "inherit" }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,0,127,0.2)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
            VIEW DETAILS <ChevronRight size={16} />
          </button>
        </div>

        {/* Schedule */}
        <div className="dashboard-card">
          <div style={{ color: "var(--neon-blue)", fontSize: "0.8rem", marginBottom: "2rem" }}>UPCOMING SCHEDULE</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", marginBottom: "2rem" }}>
            {[
              { title: "Hackathon Start", time: "15 May 2025, 09:00 AM" },
              { title: "Mid Check-in", time: "16 May 2025, 12:00 PM" },
              { title: "Final Submission", time: "17 May 2025, 05:00 PM" },
              { title: "Results & Closing", time: "17 May 2025, 07:00 PM" }
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", gap: "1rem", position: "relative" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <Clock size={16} color="var(--neon-pink)" />
                  {i < 3 && <div style={{ width: "1px", height: "100%", borderLeft: "dashed 1px rgba(255,0,127,0.5)", flex: 1, marginTop: "0.5rem" }}></div>}
                </div>
                <div>
                  <div style={{ color: "var(--neon-blue)", fontSize: "0.7rem", marginBottom: "0.3rem" }}>{item.title}</div>
                  <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.6rem" }}>{item.time}</div>
                </div>
              </div>
            ))}
          </div>
          <button style={{ background: "transparent", border: "1px solid var(--neon-pink)", color: "var(--neon-pink)", padding: "1rem", width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", fontFamily: "inherit" }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,0,127,0.2)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
            VIEW FULL SCHEDULE <ChevronRight size={16} />
          </button>
        </div>

        {/* Announcements */}
        <div className="dashboard-card">
          <div style={{ color: "var(--neon-blue)", fontSize: "0.8rem", marginBottom: "2rem" }}>ANNOUNCEMENTS</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", marginBottom: "2rem" }}>
            {[
              { title: "Code of Conduct", desc: "Please read before the event.", date: "12 MAY" },
              { title: "Important Update", desc: "Mid check-in time updated.", date: "13 MAY" },
              { title: "Mentor Sessions", desc: "Book your slot now!", date: "14 MAY" }
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", gap: "1rem" }}>
                <Megaphone size={20} color="var(--neon-pink)" style={{ flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.3rem" }}>
                    <div style={{ color: "var(--neon-blue)", fontSize: "0.7rem" }}>{item.title}</div>
                    <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.6rem" }}>{item.date}</div>
                  </div>
                  <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.6rem", lineHeight: "1.4" }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
          <button style={{ background: "transparent", border: "1px solid var(--neon-pink)", color: "var(--neon-pink)", padding: "1rem", width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", fontFamily: "inherit" }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,0,127,0.2)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
            VIEW ALL <ChevronRight size={16} />
          </button>
        </div>

      </div>

      <div style={{ marginTop: "3rem", display: "flex", justifyContent: "center", alignItems: "center", gap: "2rem", color: "var(--neon-blue)", fontSize: "0.7rem", paddingBottom: "2rem" }}>
        <div>POWERED BY</div>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <h2 style={{ margin: 0, fontSize: "1.5rem" }}>SB SPINHACK</h2>
          <div style={{ width: "1px", height: "30px", background: "var(--neon-blue)" }}></div>
          <div style={{ textAlign: "right" }}>
            <h2 style={{ margin: 0, fontSize: "1.5rem" }}>IEEE</h2>
            <div style={{ fontSize: "0.5rem" }}>Advancing Technology for Humanity</div>
          </div>
        </div>
      </div>
      
    </div>
  );
}
