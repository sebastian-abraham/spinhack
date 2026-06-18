"use client";

import { Home, User, Megaphone, FileText, Headphones, ShieldCheck } from "lucide-react";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="dashboard-layout">
      <div className="sidebar">
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <div className="logo-container" style={{ marginBottom: "0", gap: "0.3rem" }}>
            <div className="logo-arrows" style={{ fontSize: "0.6rem", gap: "0.1rem" }}>
              <span style={{ animationDelay: '0s' }}>&gt;</span>
              <span style={{ animationDelay: '0.2s' }}>&gt;</span>
              <span style={{ animationDelay: '0.4s' }}>&gt;</span>
            </div>
            <h1 className="logo-text" style={{ fontSize: "0.85rem", whiteSpace: "nowrap" }}>SPINHACK 2.0</h1>
            <div className="logo-arrows" style={{ fontSize: "0.6rem", gap: "0.1rem" }}>
              <span style={{ animationDelay: '0.4s' }}>&lt;</span>
              <span style={{ animationDelay: '0.2s' }}>&lt;</span>
              <span style={{ animationDelay: '0s' }}>&lt;</span>
            </div>
          </div>
        </div>

        <nav style={{ flex: 1 }}>
          <Link href="/dashboard" className={`nav-item ${pathname === '/dashboard' ? 'active' : ''}`}>
            <Home size={20} />
            DASHBOARD
          </Link>
          <Link href="/dashboard/profile" className={`nav-item ${pathname === '/dashboard/profile' ? 'active' : ''}`}>
            <User size={20} />
            TEAM PROFILE
          </Link>
          <Link href="/dashboard/announcements" className={`nav-item ${pathname === '/dashboard/announcements' ? 'active' : ''}`}>
            <Megaphone size={20} />
            ANNOUNCEMENTS
          </Link>
          <Link href="/dashboard/guidelines" className={`nav-item ${pathname === '/dashboard/guidelines' ? 'active' : ''}`}>
            <FileText size={20} />
            GUIDELINES
          </Link>
          <Link href="/dashboard/support" className={`nav-item ${pathname === '/dashboard/support' ? 'active' : ''}`}>
            <Headphones size={20} />
            SUPPORT
          </Link>
        </nav>

        <div style={{ marginTop: "auto", borderTop: "1px solid var(--neon-pink)", paddingTop: "1rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#00ff00", fontSize: "0.7rem", marginBottom: "0.5rem" }}>
            <div style={{ width: "8px", height: "8px", background: "#00ff00", borderRadius: "50%", boxShadow: "0 0 5px #00ff00" }}></div>
            SYSTEM ONLINE
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--neon-blue)", fontSize: "0.7rem" }}>
            <ShieldCheck size={14} />
            SECURE CONNECTION
          </div>
          <div style={{ display: "flex", gap: "2px", marginTop: "0.5rem" }}>
            {[...Array(10)].map((_, i) => (
              <div key={i} style={{ flex: 1, height: "4px", background: "#00ff00", boxShadow: "0 0 2px #00ff00" }}></div>
            ))}
          </div>
        </div>
      </div>
      <div className="main-content">
        {children}
      </div>
    </div>
  );
}
