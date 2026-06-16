"use client";

export default function SupportPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Message transmitted to HQ!");
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", paddingBottom: "3rem" }}>
      <h2 style={{ color: "var(--neon-blue)", borderBottom: "1px solid var(--neon-pink)", paddingBottom: "1rem", marginBottom: "2rem" }}>SUPPORT & HQ CONTACT</h2>
      
      <div className="dashboard-card">
        <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.9rem", lineHeight: "1.6", marginBottom: "2rem" }}>
          Need help? Encountered a technical issue or have a general query? Transmit a message to the organizers and we'll get back to you shortly.
        </p>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div>
            <label style={{ display: "block", color: "rgba(255,255,255,0.6)", fontSize: "0.7rem", marginBottom: "0.5rem" }}>ISSUE TYPE</label>
            <select className="retro-input" style={{ textAlign: "left", background: "rgba(0,0,0,0.5)", marginBottom: 0, padding: "1rem", cursor: "pointer" }}>
              <option value="technical">Technical Assistance</option>
              <option value="general">General Inquiry</option>
              <option value="emergency">Emergency / Urgent</option>
            </select>
          </div>
          
          <div>
            <label style={{ display: "block", color: "rgba(255,255,255,0.6)", fontSize: "0.7rem", marginBottom: "0.5rem" }}>MESSAGE LOG</label>
            <textarea className="retro-input" rows={6} style={{ textAlign: "left", background: "rgba(0,0,0,0.5)", resize: "vertical", marginBottom: 0, width: "100%", fontFamily: "inherit" }} placeholder="Describe your issue here..." required></textarea>
          </div>

          <button type="submit" className="retro-button" style={{ alignSelf: "flex-start", marginTop: "1rem", width: "auto" }}>
            TRANSMIT MESSAGE
          </button>
        </form>
      </div>
    </div>
  );
}
