"use client";

import { Megaphone } from "lucide-react";

export default function AnnouncementsPage() {
  const announcements = [
    { title: "Code of Conduct", desc: "Please read the full code of conduct before arriving at the venue. Any violations will result in immediate disqualification.", date: "12 MAY 2025, 10:00 AM" },
    { title: "Important Update: Mid Check-in", desc: "The mid check-in time has been moved to 12:00 PM. Please ensure your team lead is present at the main desk.", date: "13 MAY 2025, 02:30 PM" },
    { title: "Mentor Sessions Live", desc: "Mentor booking slots are now open! Visit the portal to book a 15-minute slot with our industry experts.", date: "14 MAY 2025, 09:15 AM" },
    { title: "Food & Beverage Schedule", desc: "Dinner will be served at 08:00 PM on Day 1. Midnight snacks will be available near the hacking zone.", date: "15 MAY 2025, 04:00 PM" },
  ];

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
              <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.9rem", lineHeight: "1.6" }}>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
