"use client";
import { useState, useEffect, useRef} from "react";
import type { ReactNode } from "react";

const navLinks = [
  { label: "Home", href:"#home", icon:"ti-home"},
  { label: "About", href:"#about", icon:"ti-user"},
  { label: "Projects", href:"#projects", icon:"ti-layout-grid"},
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

const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/sarani-tang-05b445375",
    icon: "devicon-linkedin-plain",
  },
  {
    label: "GitHub",
    href: "https://github.com/sarani-tang",
    icon: "devicon-github-original",
  },
]

const TYPED_TEXT = "Hi, I'm Sarani Tang!";
const TITLE_TEXT = "Front-End Developer & UX/UI Designer";

const MORPH_SCRAMBLE_COLOR = "var(--color-brand-pink)";
const MORPH_SETTLED_COLOR = "var(--color-brand-pink-dark)";
const MORPH_GLOW = "var(--brand-pink-glow)";
const MORPH_CHARS = "!<>-_\\/[]{}—=+*^?#________";

function AsciiMorphHeading({
  text, onComplete, fontSize = "3rem", fontWeight = 400, tag = "h1", display = "block",
}: {
  text: string; 
  onComplete?: () => void; 
  fontSize?: string; 
  fontWeight?: number; 
  tag?: "h1" | "h2"; 
  display?: "block" | "inline-block"
}) {

  const containerRef = useRef<HTMLHeadingElement>(null);
  const onCompleteRef = useRef(onComplete);
  const Tag = tag;

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

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
      onCompleteRef.current?.();
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
          if (iterations < 8) {
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
        }, 42);
        intervals.push(interval);
      }, index * 75);
      timers.push(startTimer);
  });

  const totalDuration = letters.length * 75 + 8 * 42 + 100;
    const completeTimer = setTimeout(() => onCompleteRef.current?.(), totalDuration);
    timers.push(completeTimer);
 
    return () => {
      timers.forEach(clearTimeout);
      intervals.forEach(clearInterval);
    };
  }, [text]);

  return (
    <Tag
      ref={containerRef}
      className="relative font-display tracking-[0.02em]"
      style={{
        display,
        fontSize,
        fontWeight,
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
    const [subtitleDone, setSubtitleDone] = useState(false);
    const [socialVisible, setSocialVisible] = useState(false);

    useEffect(() => {
      if (!subtitleDone) return;
      const timer = setTimeout(() => setSocialVisible(true), 350);
      return () => clearTimeout(timer);
    }, [subtitleDone]);

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
      {/* Navigation Bar */}
      <nav
        role="navigation"
        aria-label="Page navigation"
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-1 px-3 py-2 rounded-full border transition duration-300 ${
          scrolled
            ? "bg-white/75 border-black/10 backdrop-blur-2xl shadow-[0_2px_20px_rgba(0,0,0,0.08)]"
            : "bg-white/15 border-black/[0.06] backdrop-blur-none"
        }`}
      >
        {navLinks.map(({ label, href }) => (
          <button
            key={label}
            onClick={() => handleClick(href)}
            aria-current={active === label ? "page" : undefined}
            className={`border-none cursor-pointer font-display text-sm px-3.5 py-1.5 rounded-full whitespace-nowrap transition-colors duration-200 ${
              active === label
                ? "text-brand-pink-dark bg-brand-pink/[0.12] font-medium"
                : "text-[#555555] font-normal"
            }`}
          >
            {label}
          </button>
        ))}
      </nav>

      <div className="min-h-screen bg-white text-[#1a1a1a] font-display font-light">
        <div className="max-w-[1200px] mx-auto p-5">
          {/* Home */}
          <section
            id="home"
            className="relative min-h-screen flex flex-col-reverse md:flex-row items-center justify-center md:justify-between gap-8 md:gap-16 px-[6vw] md:px-[8vw]"
            >
              <div className="dot-grid absolute inset-0 opacity-80 pointer-events-none"/>
              <div className="relative flex-1_1_480px] max-w-[600px] text-left">

                {/* Ascii Animation */}
                <AsciiMorphHeading text={TYPED_TEXT} onComplete={() => setMorphDone(true)} />

                  {morphDone && (
                    <>
                      <AsciiMorphHeading
                        text={TITLE_TEXT}
                        tag="h2"
                        fontSize="1.3rem"
                        fontWeight={300}
                        display="inline-block"
                        onComplete={() => setSubtitleDone(true)}
                      />
    
                      <span
                        className={`typed-cursor inline-block w-px bg-brand-pink ml-1 align-text-bottom ${
                          subtitleDone ? "visible" : "invisible"
                        }`}
                        style={{ height: "1.05em" }}
                      />

                      {socialVisible && (
                        <div className="flex items-center gap-4 mt-5">
                          {socialLinks.map(({ label, href, icon }, index) => (
                            <SocialLink
                              key={label}
                              href={href}
                              label={label}
                              visible={socialVisible}
                              delay={index * 120}
                            >
                              <i className={icon} />
                            </SocialLink>
                          ))}
                          <SocialLink
                            href="/assets/saranis-resume.pdf"
                            label="Resume"
                            visible={socialVisible}
                            delay={socialLinks.length * 120}
                            download="saranis-resume.pdf"
                          >
                            <svg
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.0"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              width="1em"
                              height="1em"
                            >
                              <rect x="3" y="3" width="18" height="18" rx="5" ry="5" />
                              <path d="M7.5 9h9" />
                              <path d="M7.5 13h9" />
                              <path d="M7.5 17h5.5" />
                            </svg>
                          </SocialLink>
                        </div>
                      )}
                    </>
                  )}
              </div>

              {/* placeholder for picture of me */}
              <div className="relative flex-none w-[300px] h-[300px] rounded-full bg-brand-pink-pale flex items-center justify-center text-brand-pink-dark text-sm text-center">
                <img
                  src="/assets/grad-pic.png"
                  alt="Sarani's graduation picture"
                  className="w-full h-full object-cover rounded-full border-4 border-double border-brand-pink-light"
                />
              </div>
            </section>

            <div className="max-w-[1200px] mx-auto py-[50px] px-[20vw]" />

            {/* About */} 
            <section id="about" className="my-5 scroll-mt-[90px]">
            <h2 className="text-2xl font-normal mb-4">About</h2>

            <div className="flex flex-col md:flex-row gap-4">
              {/* left side */}
              <div className="flex-[2] rounded-[6rem] bg-brand-gray p-8 md:p-10 text-center flex flex-col items-center justify-center">
                <p className="m-0 text-base font-light">
                  Hello! I'm Sarani (<i>"sarah-knee"</i>), a{" "}
                  <strong className="font-medium">front-end developer</strong> and{" "}
                  who genuinely loves making things look and feel great. I recently earned my
                  B.S. in Computer Science and I've been channeling that foundation into
                  <strong className="font-medium"> UX/UI design </strong>and
                  <strong className="font-medium"> front-end development </strong> ever since.
                  I create intuitive interfaces that balance clarity, performance, and
                  thoughtful design.
                </p>

                {/* Hobbies */}
                <p className="text-base font-light mt-4">
                  Outside of coding, I enjoy working out, bouldering, reading, and gaming!
                </p>
              </div>

              {/* Skills */}
              {/* right side */}
              <div className="flex-1 flex-wrap gap-5 justify-center">
                {skills.map((skill) => (
                  <SkillBubble key={skill.label} icon={skill.icon} label={skill.label} />
                ))}
              </div>
            </div>
            </section>

            {/* Projects */}
            <section id="projects" className="min-h-screen pt-8">
              <h2 className="text-2xl font-normal">Projects</h2>
            </section>
          
        </div>
      </div>
    </>
  );
}

function SocialLink({
  href, label, children, visible = true, delay = 0, download,
}: {
  href: string;
  label: string;
  children: ReactNode;
  visible?: boolean;
  delay?: number;
  download?: string;
}) {
  return (
    <div
      className= {`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
      ${
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-2 pointer-events-none"
      }`}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms"}}
      >
      <a 
        href={href}
        {...(download
          ? { download }
          : { target: "_blank", rel: "noopener noreferrer"})}
        aria-label={label}
        title={label}
        className="flex items-center justify-center w-10 h-10 rounded-xl border border-brand-border text-brand-pink-dark text-xl transition-all duration-200 hover:-translate-y-1 hover:border-brand-pink hover:text-brand-pink hover:shadow-[0_8px_20px_rgba(245,161,161,0.6)]"
      >
        {children}
      </a>
    </div>
  );
}

function SkillBubble({ icon, label }: { icon: string; label: string }) {
  return (
    <div className="flex items-center gap-2.5 w-fit h-5 px-4 py-4 rounded-[20px] border border-brand-border cursor-default transition-all duration-200 hover:-translate-y-1.5 hover:border-brand-pink hover:shadow-[0_8px_24px_rgba(245,161,161,0.8)]">
      <i className={icon} style={{ fontSize: "1.5rem" }} />
      <span className="text-brand-gray-text text-base font-normal">{label}</span>
    </div>
  );
}