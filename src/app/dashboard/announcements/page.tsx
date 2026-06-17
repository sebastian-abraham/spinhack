"use client";

import { useEffect, useState } from "react";
import { Megaphone } from "lucide-react";

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      const res = await fetch('/api/announcements');
      if (res.ok) {
        const data = await res.json();
        setAnnouncements(data.announcements);
      }
      setLoading(false);
    };
    fetchAnnouncements();
  }, []);

  if (loading) return <div style={{ color: "var(--neon-pink)", textAlign: "center", marginTop: "2rem" }}>LOADING...</div>;

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", paddingBottom: "3rem" }}>
      <h2 style={{ color: "var(--neon-blue)", borderBottom: "1px solid var(--neon-pink)", paddingBottom: "1rem", marginBottom: "2rem" }}>ANNOUNCEMENTS</h2>
      
      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        {announcements.map((item, i) => (
          <div key={i} className="dashboard-card" style={{ display: "flex", gap: "1.5rem" }}>
            <div style={{ background: "rgba(255,0,127,0.1)", padding: "1rem", borderRadius: "50%", height: "fit-content" }}>
              <Megaphone size={30} color="var(--neon-pink)" />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem", flexWrap: "wrap", gap: "1rem" }}>
                <h3 style={{ color: "var(--neon-blue)", margin: 0, fontSize: "1.2rem", lineHeight: "1.4" }}>{item.title}</h3>
                <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.6rem" }}>{item.date}</span>
              </div>
              <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.9rem", lineHeight: "1.6", whiteSpace: "pre-wrap" }}>{item.desc}</p>
            </div>
          </div>
        ))}
        {announcements.length === 0 && (
          <div style={{ textAlign: "center", color: "rgba(255,255,255,0.5)", padding: "2rem" }}>NO ANNOUNCEMENTS YET.</div>
        )}
      </div>
    </div>
  );
}
