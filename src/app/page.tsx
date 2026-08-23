"use client";
import { useState, useEffect, useRef} from "react";

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

const TYPED_TEXT = "Hi, I'm Sarani Tang!";

const MORPH_SCRAMBLE_COLOR = "#E68AAE";
const MORPH_SETTLED_COLOR = "#A94E71";
const MORPH_GLOW = "rgba(230, 138, 174, 0.35)";
const MORPH_CHARS = "!<>-_\\/[]{}—=+*^?#________";

function AsciiMorphHeading({text, onComplete}: {text: string; onComplete?: () => void }) {
  const containerRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const letters = text.split("");

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      container.innerHTML = "";
      letters.forEach((letter) => {
        const span = document.createElement("span");
        span.textContent = letter;
        span.style.color = MORPH_SETTLED_COLOR;
        span.style.display = "inline-block";
        span.style.minWidth = letter === " " ? "0.3em" : "auto";
        container.appendChild(span);
      });
      onComplete?.();
      return;
    }

    container.innerHTML = "";
    letters.forEach((letter) => {
      const span = document.createElement("span");
      span.textContent = letter;
      span.style.opacity = "0";
      span.style.display = "inline-block";
      span.style.minWidth = letter === " " ? "0.3em" : "auto";
      container.appendChild(span);
    });

    const spans = container.querySelectorAll("span");
    const timers: ReturnType<typeof setTimeout>[] = [];
    const intervals: ReturnType<typeof setInterval>[] = [];
 
    spans.forEach((span, index) => {
      const letter = letters[index];
      let iterations = 0;
 
      const startTimer = setTimeout(() => {
        const interval = setInterval(() => {
          if (iterations < 10) {
            span.textContent = MORPH_CHARS[Math.floor(Math.random() * MORPH_CHARS.length)];
            span.style.opacity = "1";
            span.style.color = MORPH_SCRAMBLE_COLOR;
          } else {
            span.textContent = letter;
            span.style.opacity = "1";
            span.style.color = MORPH_SETTLED_COLOR;
            clearInterval(interval);
          }
          iterations++;
        }, 50);
        intervals.push(interval);
      }, index * 100);
      timers.push(startTimer);
  });

  const totalDuration = letters.length * 100 + 10 * 50 + 100;
    const completeTimer = setTimeout(() => onComplete?.(), totalDuration);
    timers.push(completeTimer);
 
    return () => {
      timers.forEach(clearTimeout);
      intervals.forEach(clearInterval);
    };
  }, [text, onComplete]);

  return (
    <h1
      ref={containerRef}
      style={{
        position: "relative",
        fontSize: "3rem",
        fontWeight: 400,
        fontFamily: "'Inconsolata', monospace",
        letterSpacing: "0.02em",
        minHeight: "1.2em",
        textShadow: `0 0 15px ${MORPH_GLOW}`,
      }}
    />
  );
}

export default function Home() {
    const [active, setActive] = useState("Home");
    const [scrolled, setScrolled] = useState(false);
    const [morphDone, setMorphDone] = useState(false);

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
            color: #A94E71;
            background: rgba(233, 138, 174, 0.12);
            font-weight: 500;
          }
   
          .home-dots {
            position: absolute;
            inset: 0;
            background-image: radial-gradient(#F3B9CF 1px, transparent 1px);
            background-size: 24px 24px;
            -webkit-mask-image: radial-gradient(circle at 15% 25%, black, transparent 65%);
            mask-image: radial-gradient(circle at 15% 25%, black, transparent 65%);
            opacity: 0.8;
            pointer-events: none;
          }
   
          .typed-cursor {
            display: inline-block;
            width: 3px;
            height: 0.85em;
            background: #E68AAE;
            margin-left: 4px;
            vertical-align: text-bottom;
            animation: cursor-blink 0.9s step-end infinite;
          }
   
          @keyframes cursor-blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
          }
   
          @media (prefers-reduced-motion: reduce) {
            .typed-cursor { animation: none; }
          }
 
          @media (max-width: 800px) {
            .hero-row {
              flex-direction: column-reverse;
              justify-content: center;
              gap: 2rem;
              padding: 0 6vw !important;
            }
            .hero-image-placeholder {
              width: 220px !important;
              height: 220px !important;
              flex-basis: auto !important;
            }
          }
 
          section[id] {
            scroll-margin-top: 90px;
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
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
          {/* Home */}
          <section
          id="home"
          className="hero-row"
          style={{
            position: "relative",
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "4rem",
            padding: "0 8vw",
          }}
        >
          <div className="home-dots" />
 
          <div style={{ position: "relative", flex: "1 1 480px", maxWidth: "600px", textAlign: "left" }}>
            <AsciiMorphHeading text={TYPED_TEXT} onComplete={() => setMorphDone(true)} />
            <span className="typed-cursor" style={{ opacity: morphDone ? 1 : 0 }} />
          </div>
 
          {/* Placeholder for your photo — swap this div for an <img src="..." /> or next/image */}
          <div
            className="hero-image-placeholder"
            style={{
              position: "relative",
              flex: "0 0 320px",
              width: "320px",
              height: "320px",
              borderRadius: "1rem",
              border: "2px dashed #F3B9CF",
              background: "#FFF4F8",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#A94E71",
              fontSize: "0.9rem",
              textAlign: "center",
              padding: "1rem",
            }}
          >
            Drop your image here
          </div>
        </section>

          <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "50px 20vw" }}></div>

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
                Outside of coding, I enjoy working out, bouldering, reading, and gaming!
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