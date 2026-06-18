"use client";

export default function SupportPage() {
  const contacts = [
    { name: "Abhiram", role: "Event Organizer", phone: "+91 8078 055 863" },
    { name: "Arin", role: "Event Organizer", phone: "+91 92071 79584" },
    { name: "Nandana", role: "Event Organizer", phone: "+91 85907 76933" },
    { name: "Shone", role: "Event Organizer", phone: "+91 85903 51752" },
  ];

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", paddingBottom: "3rem" }}>
      <h2 style={{ color: "var(--neon-blue)", borderBottom: "1px solid var(--neon-pink)", paddingBottom: "1rem", marginBottom: "2rem" }}>SUPPORT & HQ CONTACT</h2>
      
      <div className="dashboard-card">
        <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.9rem", lineHeight: "1.6", marginBottom: "2rem" }}>
          Need help? Encountered a technical issue or have a general query? Contact one of our organizers below.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {contacts.map((contact, i) => (
            <div key={i} style={{ border: "1px solid var(--neon-pink)", padding: "1.5rem", borderRadius: "4px", background: "rgba(255,0,127,0.05)" }}>
              <div style={{ color: "var(--neon-blue)", fontSize: "1.2rem", marginBottom: "0.5rem" }}>{contact.name}</div>
              <div style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.8rem", marginBottom: "1rem" }}>{contact.role}</div>
              <div style={{ color: "var(--neon-pink)", fontSize: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span>📞</span> {contact.phone}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
