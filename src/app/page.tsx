"use client";

export default function Home() {
  const skills = [
    { icon: "devicon-html5-plain colored", label: "HTML" },
    { icon: "devicon-css3-plain colored", label: "CSS" },
    { icon: "devicon-javascript-plain colored", label: "JavaScript" },
    { icon: "devicon-nodejs-plain colored", label: "Node.js" },
    { icon: "devicon-react-plain colored", label: "React" },
    { icon: "devicon-electron-original colored", label: "Electron" },
    { icon: "devicon-swift-plain colored", label: "Swift" },
    { icon: "devicon-python-plain colored", label: "Python" },
    { icon: "devicon-java-plain colored", label: "Java" },
  ];

  return (
    <div style={{ background: "#ffffff", color: "#1a1a1a", fontFamily: "'Inconsolata', monospace", fontWeight: 300, minHeight: "100vh" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "50px 20vw" }}>

        {/* Name */}
        <h1 style={{ fontSize: "3rem", fontWeight: 400, fontFamily: "'Inconsolata', monospace" }}>
          Sarani Tang
        </h1>

        {/* About */}
        <div style={{ margin: "20px 0", borderRadius: "0.5rem", background: "#F2F2F2", padding: "1rem" }}>
          <p style={{ fontSize: "1rem", fontWeight: 300, fontFamily: "'Inconsolata', monospace", margin: 0 }}>
            Hello! I'm Sarani (<i>"sarah-knee"</i>), a recent CSULB graduate focused on{" "}
            <strong style={{ fontWeight: 500 }}>front-end development</strong> and{" "}
            <strong style={{ fontWeight: 500 }}>UX/UI design</strong>.
            I create intuitive interfaces that balance clarity, performance, and thoughtful design.
          </p>
        </div>

        {/* Hobbies */}
        <div style={{ marginBottom: "30px" }}>
          <p style={{ fontSize: "1rem", fontWeight: 300, fontFamily: "'Inconsolata', monospace" }}>
            Outside of coding, I enjoy bouldering, reading, and gaming!
          </p>
        </div>

        {/* Skills */}
        <div style={{ margin: "20px 0", paddingBottom: "30px", borderBottom: "0.5px solid #656565" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 400, fontFamily: "'Inconsolata', monospace" }}>
            Skills
          </h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1.2rem", justifyContent: "center" }}>
            {skills.map((skill) => (
              <SkillBubble key={skill.label} icon={skill.icon} label={skill.label} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

function SkillBubble({ icon, label }: { icon: string; label: string }) {
  return (
    <div
      className="skill-bubble"
      style={{
        border: "1px solid #ccc",
        borderRadius: "20px",
        padding: "1rem",
        height: "20px",
        display: "flex",
        alignItems: "center",
        gap: "0.6rem",
        width: "fit-content",
        cursor: "default",
        transition: "transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        el.style.transform = "translateY(-6px)";
        el.style.borderColor = "lightpink";
        el.style.boxShadow = "0 8px 24px rgba(245, 161, 161, 0.8)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.transform = "translateY(0)";
        el.style.borderColor = "#ccc";
        el.style.boxShadow = "none";
      }}
    >
      <i className={icon} style={{ fontSize: "1.5rem" }}></i>
      <span style={{ color: "#696969", fontSize: "1rem", fontWeight: 400, fontFamily: "'Inconsolata', monospace" }}>
        {label}
      </span>
    </div>
  );
}