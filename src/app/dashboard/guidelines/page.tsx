"use client";

export default function GuidelinesPage() {
  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", paddingBottom: "3rem" }}>
      <h2 style={{ color: "var(--neon-blue)", borderBottom: "1px solid var(--neon-pink)", paddingBottom: "1rem", marginBottom: "2rem" }}>HACKATHON GUIDELINES</h2>
      
      <div className="dashboard-card" style={{ marginBottom: "2rem" }}>
        <h3 style={{ color: "var(--neon-pink)", marginBottom: "1.5rem", fontSize: "1.2rem" }}>TEAM COMPOSITION</h3>
        <ul style={{ listStyleType: "none", padding: 0, margin: 0, color: "rgba(255,255,255,0.8)", lineHeight: "1.8", fontSize: "0.9rem" }}>
          <li style={{ marginBottom: "1rem", display: "flex", gap: "1rem" }}><span style={{ color: "var(--neon-blue)" }}>&gt;</span> <span>Participants must register as a team of 2-4 members.</span></li>
          <li style={{ marginBottom: "1rem", display: "flex", gap: "1rem" }}><span style={{ color: "var(--neon-blue)" }}>&gt;</span> <span>Teams can be formed across departments and years.</span></li>
          <li style={{ marginBottom: "1rem", display: "flex", gap: "1rem" }}><span style={{ color: "var(--neon-blue)" }}>&gt;</span> <span>Each participant can be part of only one team.</span></li>
        </ul>
      </div>

      <div className="dashboard-card" style={{ marginBottom: "2rem" }}>
        <h3 style={{ color: "var(--neon-pink)", marginBottom: "1.5rem", fontSize: "1.2rem" }}>DURATION AND STRUCTURE</h3>
        <ul style={{ listStyleType: "none", padding: 0, margin: 0, color: "rgba(255,255,255,0.8)", lineHeight: "1.8", fontSize: "0.9rem" }}>
          <li style={{ marginBottom: "1rem", display: "flex", gap: "1rem" }}><span style={{ color: "var(--neon-blue)" }}>&gt;</span> <span>Total hackathon duration will be 4 hrs.</span></li>
          <li style={{ marginBottom: "1rem", display: "flex", gap: "1rem" }}><span style={{ color: "var(--neon-blue)" }}>&gt;</span> <span>Key Phases: Planning, Development, Submission.</span></li>
        </ul>
      </div>

      <div className="dashboard-card" style={{ marginBottom: "2rem" }}>
        <h3 style={{ color: "var(--neon-pink)", marginBottom: "1.5rem", fontSize: "1.2rem" }}>PROBLEM STATEMENT</h3>
        <p style={{ color: "rgba(255,255,255,0.8)", lineHeight: "1.8", fontSize: "0.9rem", marginBottom: "0" }}>
          Each team will select their problem statement at the start of the event via a 'Spin the Wheel'.
        </p>
      </div>

      <div className="dashboard-card" style={{ marginBottom: "2rem" }}>
        <h3 style={{ color: "var(--neon-pink)", marginBottom: "1.5rem", fontSize: "1.2rem" }}>TOOLS AND RESOURCES</h3>
        <ul style={{ listStyleType: "none", padding: 0, margin: 0, color: "rgba(255,255,255,0.8)", lineHeight: "1.8", fontSize: "0.9rem" }}>
          <li style={{ marginBottom: "1rem", display: "flex", gap: "1rem" }}><span style={{ color: "var(--neon-blue)" }}>&gt;</span> <span>Participants may use any Generative AI tools like [ChatGPT, etc.] to develop their website.</span></li>
          <li style={{ marginBottom: "1rem", display: "flex", gap: "1rem" }}><span style={{ color: "var(--neon-blue)" }}>&gt;</span> <span>The use of HTML, CSS, JavaScript is allowed for refining outputs.</span></li>
          <li style={{ marginBottom: "1rem", display: "flex", gap: "1rem" }}><span style={{ color: "var(--neon-blue)" }}>&gt;</span> <span>Internet is allowed for documentation, references, libraries, etc.</span></li>
          <li style={{ marginBottom: "1rem", display: "flex", gap: "1rem" }}><span style={{ color: "var(--neon-blue)" }}>&gt;</span> <span>Use of open-source libraries and APIs are permitted however proper credits and citations must be provided.</span></li>
        </ul>
      </div>

      <div className="dashboard-card" style={{ marginBottom: "2rem" }}>
        <h3 style={{ color: "var(--neon-pink)", marginBottom: "1.5rem", fontSize: "1.2rem" }}>SUBMISSION</h3>
        <ul style={{ listStyleType: "none", padding: 0, margin: 0, color: "rgba(255,255,255,0.8)", lineHeight: "1.8", fontSize: "0.9rem" }}>
          <li style={{ marginBottom: "1rem", display: "flex", gap: "1rem" }}><span style={{ color: "var(--neon-blue)" }}>&gt;</span> <span>Teams must submit their final work through GitHub. Each team will be provided with a private GitHub repository where all project files must be committed during the event.</span></li>
          <li style={{ marginBottom: "1rem", display: "flex", gap: "1rem" }}>
            <span style={{ color: "var(--neon-blue)" }}>&gt;</span> 
            <div>
              <span style={{ display: "block", marginBottom: "0.5rem" }}>The repository must include:</span>
              <ul style={{ listStyleType: "none", paddingLeft: "1rem", margin: 0 }}>
                <li style={{ marginBottom: "0.5rem", display: "flex", gap: "0.5rem" }}><span style={{ color: "var(--neon-pink)" }}>-</span> An abstract (maximum 1 page) summarizing the project, approach, key findings, and the Generative AI tools used (at least 3).</li>
                <li style={{ marginBottom: "0.5rem", display: "flex", gap: "0.5rem" }}><span style={{ color: "var(--neon-pink)" }}>-</span> A PowerPoint presentation (PPT) clearly explaining the problem, solution, and implementation.</li>
              </ul>
            </div>
          </li>
          <li style={{ marginBottom: "1rem", display: "flex", gap: "1rem" }}><span style={{ color: "var(--neon-blue)" }}>&gt;</span> <span>Only the organizing team and respective team members will have access to each repository.</span></li>
        </ul>
      </div>

      <div className="dashboard-card" style={{ marginBottom: "2rem" }}>
        <h3 style={{ color: "var(--neon-pink)", marginBottom: "1.5rem", fontSize: "1.2rem" }}>JUDGING CRITERIA</h3>
        <p style={{ color: "rgba(255,255,255,0.8)", lineHeight: "1.8", fontSize: "0.9rem", marginBottom: "1rem" }}>Judgment will be based on the following criteria:</p>
        <ul style={{ listStyleType: "none", padding: 0, margin: 0, color: "rgba(255,255,255,0.8)", lineHeight: "1.8", fontSize: "0.9rem" }}>
          <li style={{ marginBottom: "0.5rem", display: "flex", gap: "1rem" }}><span style={{ color: "var(--neon-pink)" }}>*</span> Creativity & Innovation</li>
          <li style={{ marginBottom: "0.5rem", display: "flex", gap: "1rem" }}><span style={{ color: "var(--neon-pink)" }}>*</span> Design & Aesthetics</li>
          <li style={{ marginBottom: "0.5rem", display: "flex", gap: "1rem" }}><span style={{ color: "var(--neon-pink)" }}>*</span> Functionality & Usability</li>
          <li style={{ marginBottom: "0.5rem", display: "flex", gap: "1rem" }}><span style={{ color: "var(--neon-pink)" }}>*</span> Use of Generative AI Tools</li>
          <li style={{ marginBottom: "0.5rem", display: "flex", gap: "1rem" }}><span style={{ color: "var(--neon-pink)" }}>*</span> Relevance to Theme</li>
          <li style={{ marginBottom: "0.5rem", display: "flex", gap: "1rem" }}><span style={{ color: "var(--neon-pink)" }}>*</span> Technical Execution</li>
          <li style={{ marginBottom: "0.5rem", display: "flex", gap: "1rem" }}><span style={{ color: "var(--neon-pink)" }}>*</span> Presentation & Pitch</li>
          <li style={{ marginBottom: "0.5rem", display: "flex", gap: "1rem" }}><span style={{ color: "var(--neon-pink)" }}>*</span> Bonus (Exceptional Use of AI)</li>
        </ul>
      </div>

      <div className="dashboard-card">
        <h3 style={{ color: "var(--neon-pink)", marginBottom: "1.5rem", fontSize: "1.2rem" }}>RULES AND CONDUCT</h3>
        <ul style={{ listStyleType: "none", padding: 0, margin: 0, color: "rgba(255,255,255,0.8)", lineHeight: "1.8", fontSize: "0.9rem" }}>
          <li style={{ marginBottom: "1rem", display: "flex", gap: "1rem" }}><span style={{ color: "var(--neon-blue)" }}>&gt;</span> <span>The website created should be original and developed during the hackathon timeframe.</span></li>
          <li style={{ marginBottom: "1rem", display: "flex", gap: "1rem" }}><span style={{ color: "var(--neon-blue)" }}>&gt;</span> <span>All codes must be maintained in a public GitHub repository with regular commits throughout the hackathon.</span></li>
          <li style={{ marginBottom: "1rem", display: "flex", gap: "1rem" }}><span style={{ color: "var(--neon-blue)" }}>&gt;</span> <span>Plagiarism and copying of existing projects are strictly prohibited and will lead to immediate disqualification.</span></li>
          <li style={{ marginBottom: "1rem", display: "flex", gap: "1rem" }}><span style={{ color: "var(--neon-blue)" }}>&gt;</span> <span>Teams will have access to mentors and technical support throughout the hackathon however all stages in the development of the website must be done independently.</span></li>
          <li style={{ marginBottom: "1rem", display: "flex", gap: "1rem" }}><span style={{ color: "var(--neon-blue)" }}>&gt;</span> <span>All projects must be submitted within the specified timeframe of 4 hrs.</span></li>
          <li style={{ marginBottom: "1rem", display: "flex", gap: "1rem" }}><span style={{ color: "var(--neon-blue)" }}>&gt;</span> <span>Late submissions will not be considered for judgement.</span></li>
          <li style={{ marginBottom: "1rem", display: "flex", gap: "1rem" }}><span style={{ color: "var(--neon-blue)" }}>&gt;</span> <span>All participants must adhere to Purdue Fort Wayne's code of conduct and ethical guidelines.</span></li>
          <li style={{ marginBottom: "1rem", display: "flex", gap: "1rem" }}><span style={{ color: "var(--neon-blue)" }}>&gt;</span> <span>Any form of misconduct, dishonesty or disrespect towards others will result in instant disqualification.</span></li>
          <li style={{ marginBottom: "1rem", display: "flex", gap: "1rem" }}><span style={{ color: "var(--neon-blue)" }}>&gt;</span> <span>Organizers hold the right to modify the schedule and rules at anytime.</span></li>
          <li style={{ marginBottom: "1rem", display: "flex", gap: "1rem" }}><span style={{ color: "var(--neon-blue)" }}>&gt;</span> <span>The decisions of the judges and the organizers will be final and binding.</span></li>
        </ul>
      </div>

    </div>
  );
}
