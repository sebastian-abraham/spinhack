"use client";

export default function GuidelinesPage() {
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", paddingBottom: "3rem" }}>
      <h2 style={{ color: "var(--neon-blue)", borderBottom: "1px solid var(--neon-pink)", paddingBottom: "1rem", marginBottom: "2rem" }}>HACKATHON GUIDELINES</h2>
      
      <div className="dashboard-card" style={{ marginBottom: "2rem" }}>
        <h3 style={{ color: "var(--neon-pink)", marginBottom: "1.5rem", fontSize: "1.2rem" }}>1. RULES OF CONDUCT</h3>
        <ul style={{ listStyleType: "none", padding: 0, margin: 0, color: "rgba(255,255,255,0.8)", lineHeight: "1.8", fontSize: "0.9rem" }}>
          <li style={{ marginBottom: "1rem", display: "flex", gap: "1rem" }}><span style={{ color: "var(--neon-blue)" }}>&gt;</span> <span>Be respectful to all attendees, mentors, and organizers.</span></li>
          <li style={{ marginBottom: "1rem", display: "flex", gap: "1rem" }}><span style={{ color: "var(--neon-blue)" }}>&gt;</span> <span>Harassment of any form will not be tolerated.</span></li>
          <li style={{ marginBottom: "1rem", display: "flex", gap: "1rem" }}><span style={{ color: "var(--neon-blue)" }}>&gt;</span> <span>Ensure your workspace is clean before you leave.</span></li>
        </ul>
      </div>

      <div className="dashboard-card" style={{ marginBottom: "2rem" }}>
        <h3 style={{ color: "var(--neon-pink)", marginBottom: "1.5rem", fontSize: "1.2rem" }}>2. JUDGING CRITERIA</h3>
        <ul style={{ listStyleType: "none", padding: 0, margin: 0, color: "rgba(255,255,255,0.8)", lineHeight: "1.8", fontSize: "0.9rem" }}>
          <li style={{ marginBottom: "1rem", display: "flex", gap: "1rem" }}><span style={{ color: "var(--neon-blue)" }}>&gt;</span> <span><strong>Innovation:</strong> How unique is your solution?</span></li>
          <li style={{ marginBottom: "1rem", display: "flex", gap: "1rem" }}><span style={{ color: "var(--neon-blue)" }}>&gt;</span> <span><strong>Technical Complexity:</strong> How challenging was the implementation?</span></li>
          <li style={{ marginBottom: "1rem", display: "flex", gap: "1rem" }}><span style={{ color: "var(--neon-blue)" }}>&gt;</span> <span><strong>Impact:</strong> Does it solve a real-world problem effectively?</span></li>
          <li style={{ marginBottom: "1rem", display: "flex", gap: "1rem" }}><span style={{ color: "var(--neon-blue)" }}>&gt;</span> <span><strong>Presentation:</strong> How well was the pitch delivered?</span></li>
        </ul>
      </div>

      <div className="dashboard-card">
        <h3 style={{ color: "var(--neon-pink)", marginBottom: "1.5rem", fontSize: "1.2rem" }}>3. SUBMISSION FORMAT</h3>
        <p style={{ color: "rgba(255,255,255,0.8)", lineHeight: "1.8", fontSize: "0.9rem", marginBottom: "1rem" }}>
          All projects must be submitted via the Devpost portal before the deadline. Your submission must include:
        </p>
        <ul style={{ listStyleType: "none", padding: 0, margin: 0, color: "rgba(255,255,255,0.8)", lineHeight: "1.8", fontSize: "0.9rem" }}>
          <li style={{ marginBottom: "0.5rem", display: "flex", gap: "1rem" }}><span style={{ color: "var(--neon-pink)" }}>*</span> <span>Link to a public GitHub repository.</span></li>
          <li style={{ marginBottom: "0.5rem", display: "flex", gap: "1rem" }}><span style={{ color: "var(--neon-pink)" }}>*</span> <span>A 3-minute video demonstration.</span></li>
          <li style={{ marginBottom: "0.5rem", display: "flex", gap: "1rem" }}><span style={{ color: "var(--neon-pink)" }}>*</span> <span>Clear instructions on how to run the project locally.</span></li>
        </ul>
      </div>
    </div>
  );
}
