"use client";
import { useState, useEffect} from "react";

const navLinks = [
  { label: "Home", href:"#home", icon:"ti-home"},
  { label: "About", href:"#about", icon:"ti-user"},
  { label: "Projects", href:"#projects", icon:"ti-layout-grid"},
  { label: "Contact Me!", href:"#contact", icon:"ti-mail"},
];

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

export default function Home() {
    const [active, setActive] = useState("Home");
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
      const handleScroll = () => {
        setScrolled(window.scrollY > 20);

        const mid = window.scrollY + window.innerHeight / 2;
        let current = navLinks[0].label;
        navLinks.forEach(({label, href}) => {
          const el = document.querySelector(href);
          if (el && (el as HTMLElement).offsetTop <= mid) current = label;
        });
        setActive(current);
      };
      window.addEventListener("scroll", handleScroll, {passive: true});
      handleScroll();
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleClick = (href: string) => {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({behavior: "smooth"});
    };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inconsolata:wght@300;400;500&display=swap');
 
        .top-nav {
          position: fixed;
          top: 16px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 100;
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 8px 12px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.15);
          border: 1px solid rgba(0, 0, 0, 0.06);
          backdrop-filter: blur(0px);
          -webkit-backdrop-filter: blur(0px);
          transition: background 0.3s ease, border-color 0.3s ease, backdrop-filter 0.3s ease, box-shadow 0.3s ease;
        }
 
        .top-nav.scrolled {
          background: rgba(255, 255, 255, 0.75);
          border-color: rgba(0, 0, 0, 0.1);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          box-shadow: 0 2px 20px rgba(0, 0, 0, 0.08);
        }
 
        .top-nav-link {
          background: none;
          border: none;
          cursor: pointer;
          font-family: 'Inconsolata', monospace;
          font-size: 0.88rem;
          font-weight: 400;
          color: #555;
          padding: 6px 14px;
          border-radius: 999px;
          transition: color 0.2s, background 0.2s;
          white-space: nowrap;
        }
 
        .top-nav-link:hover {
          color: #1a1a1a;
          background: rgba(0, 0, 0, 0.05);
        }
 
        .top-nav-link.active {
          color: #1a1a1a;
          background: rgba(0, 0, 0, 0.07);
          font-weight: 500;
        }
      `}</style>

      {/* Navigation Bar */}
      <nav className={`top-nav${scrolled ? " scrolled" : ""}`} role="navigation" aria-label="Page navigation">
        {navLinks.map(({label, href}) => (
          <button
            key={label}
            className={`top-nav-link${active === label ? " active" : ""}`}
            onClick={() => handleClick(href)}
            aria-current={active === label ? "page" : undefined}
          >{label}</button>
        ))}
      </nav>

      <div style={{ background: "#ffffff", color: "#1a1a1a", fontFamily: "'Inconsolata', monospace", fontWeight: 300, minHeight: "100vh" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "50px 20vw" }}>
          {/* Home */}
          <section id="home" style={{ paddingTop: "80px"}}>
            <h1 style={{ fontSize: "3rem", fontWeight: 400, fontFamily: "'Inconsolata', monospace" }}>
              Sarani Tang
            </h1>
          </section>

          {/* About */}
          <section id="about" style={{margin: "20px 0", borderRadius: "0.5rem", background: "#F2F2F2", padding: "1rem"}}>
            <div style={{ margin: "5px 0", borderRadius: "0.5rem", background: "#F2F2F2", padding: "1rem" }}>
              <p style={{ fontSize: "1rem", fontWeight: 300, fontFamily: "'Inconsolata', monospace", margin: 0 }}>
                Hello! I'm Sarani (<i>"sarah-knee"</i>), a recent CSULB graduate focused on{" "}
                <strong style={{ fontWeight: 500 }}>front-end development</strong> and{" "}
                <strong style={{ fontWeight: 500 }}>UX/UI design</strong>.
                I create intuitive interfaces that balance clarity, performance, and thoughtful design.
              </p>
            </div>

            {/* Hobbies */}
            <div style={{ margin: "5px 0", borderRadius: "0.5rem", padding: "1rem" }}>
              <p style={{ fontSize: "1rem", fontWeight: 300, fontFamily: "'Inconsolata', monospace" }}>
                Outside of coding, I enjoy bouldering, reading, and gaming!
              </p>
            </div>
          </section>

          {/* Projects */}
          <section id="projects" style={{ minHeight: "100vh", paddingTop: "2rem"}}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 400, fontFamily: "'Inconsolata', monospace" }}>Projects</h2>
          </section>

          {/* Contact Me */}
          <section id="contact" style={{ minHeight: "100vh", paddingTop: "2rem"}}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 400, fontFamily: "'Inconsolata', monospace" }}>Contact Me!</h2>
          </section>


          {/* Skills */}
          {/*<div style={{ margin: "20px 0", paddingBottom: "30px", borderBottom: "0.5px solid #656565" }}>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 400, fontFamily: "'Inconsolata', monospace" }}>
              Skills
            </h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1.2rem", justifyContent: "center" }}>
              {skills.map((skill) => (
                <SkillBubble key={skill.label} icon={skill.icon} label={skill.label} />
              ))}
            </div>
          </div>*/}

        </div>
      </div>
    </>
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