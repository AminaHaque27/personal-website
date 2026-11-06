import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TypingGame from "./TypingGame";
import {
  profile,
  experience,
  projects,
  skills,
  education,
} from "../data/siteData";
import "./MainPage.css";

// Short piano notes played when hovering over course and skill badges.
const NOTES = ["GNote", "FNote", "FnoteTwo", "Enote"];

// The desktop version of the project list skips the entry that links back here.
const desktopProjects = projects.filter((p) => p.name !== "Retro Desktop");

const MainPage = () => {
  const [showPowerMenu, setShowPowerMenu] = useState(false);
  const [openWindows, setOpenWindows] = useState([]);
  const [minimizedWindows, setMinimizedWindows] = useState([]);
  const [windowPositions, setWindowPositions] = useState({});
  const [hidingWindows, setHidingWindows] = useState([]);
  const [zOrder, setZOrder] = useState([]);
  // Sound is off until the visitor turns it on with the taskbar button.
  const [isMuted, setIsMuted] = useState(true);
  const navigate = useNavigate();
  const draggingWindow = useRef(null);
  const offset = useRef({ x: 0, y: 0 });
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = new Audio(`${process.env.PUBLIC_URL}/Lofi.mp3`);
    audio.loop = true;
    audio.volume = 0.3;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  // If the screen size changes (rotation, resize), re-center every window so
  // none of them end up stranded off-screen.
  useEffect(() => {
    const handleResize = () => {
      setWindowPositions((prev) => {
        const reset = {};
        Object.keys(prev).forEach((name) => {
          reset[name] = null;
        });
        return reset;
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (!audioRef.current) return;
    if (nextMuted) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((e) => {
        console.log("Audio play blocked:", e);
      });
    }
  };

  const togglePowerMenu = () => {
    setShowPowerMenu((prev) => !prev);
  };

  // Every sound effect goes through here so the mute button controls them all.
  const playSound = (name, volume = 1) => {
    if (isMuted) return;
    const audio = new Audio(`${process.env.PUBLIC_URL}/${name}.mp3`);
    audio.volume = volume;
    audio.play().catch(() => {});
  };

  const playClickSound = () => playSound("Click");
  const playPageFlipSound = () => playSound("PageFlip");
  const playNote = (index) => playSound(NOTES[index % NOTES.length], 0.6);

  const openWindow = (windowName) => {
    if (!openWindows.includes(windowName)) {
      setOpenWindows([...openWindows, windowName]);
      // null = "not dragged yet": CSS keeps the window centered on screen.
      // Once the user drags it we store explicit pixel coordinates instead.
      setWindowPositions({
        ...windowPositions,
        [windowName]: null,
      });
      setZOrder([...zOrder, windowName]);
    }
    if (minimizedWindows.includes(windowName)) {
      setMinimizedWindows(
        minimizedWindows.filter((name) => name !== windowName)
      );
    }
  };

  const closeWindow = (windowName) => {
    playPageFlipSound();
    setHidingWindows([...hidingWindows, windowName]);
    setTimeout(() => {
      setOpenWindows(openWindows.filter((name) => name !== windowName));
      setMinimizedWindows(
        minimizedWindows.filter((name) => name !== windowName)
      );
      setHidingWindows(hidingWindows.filter((name) => name !== windowName));
      setZOrder(zOrder.filter((name) => name !== windowName));
    }, 300);
  };

  const minimizeWindow = (windowName) => {
    playPageFlipSound();
    setHidingWindows([...hidingWindows, windowName]);
    setTimeout(() => {
      if (!minimizedWindows.includes(windowName)) {
        setMinimizedWindows([...minimizedWindows, windowName]);
      }
      setHidingWindows(hidingWindows.filter((name) => name !== windowName));
    }, 300);
  };

  const restoreWindow = (windowName) => {
    setMinimizedWindows(minimizedWindows.filter((name) => name !== windowName));
    bringToFront(windowName);
  };

  const bringToFront = (windowName) => {
    setZOrder((prevZOrder) => [
      ...prevZOrder.filter((name) => name !== windowName),
      windowName,
    ]);
  };

  // Dragging uses pointer events so it works with a mouse, pen, or finger.
  const handleDragStart = (e, windowName) => {
    if (e.button !== undefined && e.button !== 0) return;
    // Clicks on the minimize/close buttons should not start a drag.
    if (e.target.closest("button")) return;
    const windowEl = e.currentTarget.parentElement;
    const rect = windowEl.getBoundingClientRect();

    draggingWindow.current = windowName;
    bringToFront(windowName);
    offset.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };

    // Switch from CSS centering to explicit coordinates at the current spot.
    setWindowPositions((prev) => ({
      ...prev,
      [windowName]: { x: rect.left, y: rect.top },
    }));

    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handleDragMove = (e) => {
    if (!draggingWindow.current) return;
    const windowName = draggingWindow.current;
    const windowEl = e.currentTarget.parentElement;
    const rect = windowEl.getBoundingClientRect();

    // Keep at least part of the title bar on screen so it can always be grabbed.
    const minX = -rect.width + 80;
    const maxX = window.innerWidth - 80;
    const minY = 0;
    const maxY = window.innerHeight - 60;

    const newX = Math.min(Math.max(e.clientX - offset.current.x, minX), maxX);
    const newY = Math.min(Math.max(e.clientY - offset.current.y, minY), maxY);

    setWindowPositions((prev) => ({
      ...prev,
      [windowName]: { x: newX, y: newY },
    }));
  };

  const handleDragEnd = (e) => {
    draggingWindow.current = null;
    if (e.currentTarget.hasPointerCapture?.(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  const handleIconClick = (windowName) => {
    playClickSound();
    openWindow(windowName);
  };

  return (
    <div className="main-page">
      {/* Desktop content */}
      <div className="desktop-content">
        {/* Column 1: Resume + Education */}
        <div className="desktop-column">
          <div
            className="desktop-icon"
            style={{ "--bounce-delay": "0s" }}
            onClick={() => handleIconClick("Resume")}
          >
            <img
              src={`${process.env.PUBLIC_URL}/ResumeReal.png`}
              alt="Resume"
              className="desktop-icon-image"
            />
            <div className="desktop-icon-label">Resume</div>
          </div>
          <div
            className="desktop-icon"
            style={{ "--bounce-delay": "0.1s" }}
            onClick={() => handleIconClick("Education")}
          >
            <img
              src={`${process.env.PUBLIC_URL}/FolderReal.png`}
              alt="Folder"
              className="desktop-icon-image"
            />
            <div className="desktop-icon-label">Education</div>
          </div>
        </div>

        {/* Column 2: Contact + About Me */}
        <div className="desktop-column">
          <div
            className="desktop-icon"
            style={{ "--bounce-delay": "0.2s" }}
            onClick={() => handleIconClick("Contact")}
          >
            <img
              src={`${process.env.PUBLIC_URL}/ContactReal.png`}
              alt="Contact"
              className="desktop-icon-image"
            />
            <div className="desktop-icon-label">Contact</div>
          </div>
          <div
            className="desktop-icon"
            style={{ "--bounce-delay": "0.3s" }}
            onClick={() => handleIconClick("About Me")}
          >
            <img
              src={`${process.env.PUBLIC_URL}/ComputerReal.png`}
              alt="Computer"
              className="desktop-icon-image"
            />
            <div className="desktop-icon-label">About Me</div>
          </div>
        </div>

        {/* ✅ Column 3: Skills + Gameboy */}
        <div className="desktop-column">
          <div
            className="desktop-icon"
            style={{ "--bounce-delay": "0.4s" }}
            onClick={() => handleIconClick("Skills")}
          >
            <img
              src={`${process.env.PUBLIC_URL}/DiscReal.png`}
              alt="Disc"
              className="desktop-icon-image"
            />
            <div className="desktop-icon-label">Skills</div>
          </div>

          <div
            className="desktop-icon"
            style={{ "--bounce-delay": "0.5s" }}
            onClick={() => handleIconClick("Gameboy")}
          >
            <img
              src={`${process.env.PUBLIC_URL}/Gameboy.png`}
              alt="Gameboy"
              className="desktop-icon-image gameboy-icon"
            />
            <div className="desktop-icon-label">Arcade</div>
          </div>
        </div>

        {/* Column 4: Experience + Projects */}
        <div className="desktop-column">
          <div
            className="desktop-icon"
            style={{ "--bounce-delay": "0.6s" }}
            onClick={() => handleIconClick("Experience")}
          >
            <img
              src={`${process.env.PUBLIC_URL}/FolderReal.png`}
              alt="Folder"
              className="desktop-icon-image"
            />
            <div className="desktop-icon-label">Experience</div>
          </div>
          <div
            className="desktop-icon"
            style={{ "--bounce-delay": "0.7s" }}
            onClick={() => handleIconClick("Projects")}
          >
            <img
              src={`${process.env.PUBLIC_URL}/FolderReal.png`}
              alt="Folder"
              className="desktop-icon-image"
            />
            <div className="desktop-icon-label">Projects</div>
          </div>
        </div>
      </div>

      {/* Windows */}
      {openWindows.map((windowName) => {
        if (minimizedWindows.includes(windowName)) return null;
        const position = windowPositions[windowName];
        const isCentered = !position;

        return (
          <div
            key={windowName}
            className={`app-window ${isCentered ? "centered" : ""} ${
              hidingWindows.includes(windowName) ? "hide" : ""
            }`}
            style={{
              ...(isCentered
                ? {}
                : { left: `${position.x}px`, top: `${position.y}px` }),
              zIndex: zOrder.indexOf(windowName) + 10,
            }}
            onPointerDown={() => bringToFront(windowName)}
          >
            <div
              className="app-window-titlebar"
              onPointerDown={(e) => handleDragStart(e, windowName)}
              onPointerMove={handleDragMove}
              onPointerUp={handleDragEnd}
              onPointerCancel={handleDragEnd}
            >
              <span>{windowName}</span>
              <div className="app-window-controls">
                <button
                  className="minimize-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    minimizeWindow(windowName);
                  }}
                >
                  🗕
                </button>
                <button
                  className="close-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    closeWindow(windowName);
                  }}
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="app-window-content">
              {windowName === "Resume" ? (
                <div className="resume-content">
                  <div className="resume-toolbar">
                    <a
                      href={`${process.env.PUBLIC_URL}/Amina_Haque_Resume.pdf`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Open in new tab ↗
                    </a>
                  </div>
                  <iframe
                    src={`${process.env.PUBLIC_URL}/Amina_Haque_Resume.pdf`}
                    className="resume-frame"
                    title="Resume PDF"
                  />
                </div>
              ) : windowName === "Contact" ? (
                <div className="contact-content">
                  <div className="contact-box">
                    📧 Email:{" "}
                    <a href={`mailto:${profile.email}`}>{profile.email}</a>
                  </div>
                  <div className="contact-box">
                    🔗 LinkedIn:{" "}
                    <a
                      href={profile.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      linkedin.com/in/amina-syeda-haque
                    </a>
                  </div>
                  <div className="contact-box">
                    💻 GitHub:{" "}
                    <a
                      href={profile.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      github.com/AminaHaque27
                    </a>
                  </div>
                  <div className="contact-callout">
                    👋 <span className="emoji-wave">Hey there!</span> The best
                    way to reach me is email. I'm happy to talk about roles,
                    research, or anything I've built.
                  </div>

                  <img
                    src={`${process.env.PUBLIC_URL}/Mail.png`}
                    alt="Mail Icon"
                    className="mail-icon"
                  />
                </div>
              ) : windowName === "About Me" ? (
                <div className="about-me-content">
                  <div className="about-me-name">Amina Haque</div>

                  <div className="about-me-header">
                    <img
                      src={`${process.env.PUBLIC_URL}/Profile.png`}
                      alt="Amina Haque"
                      className="about-me-image"
                    />
                    <div className="about-me-intro">
                      <ul>
                        <li>
                          🎓 <strong>M.S. Computer Science</strong> student at
                          UT Dallas (B.S. Computer Science, May 2025)
                        </li>
                        <li>
                          ⚙️ Full-stack developer at{" "}
                          <strong>Haque Systems</strong>, building a
                          multi-tenant AI SaaS with <strong>Next.js</strong>,{" "}
                          <strong>TypeScript</strong>, and{" "}
                          <strong>PostgreSQL</strong>
                        </li>
                        <li>
                          🔐 Cybersecurity researcher on an{" "}
                          <strong>NSA-sponsored INSuRE</strong> project testing
                          whether LLM agents can recover hidden data from
                          radio-frequency emanations
                        </li>
                        <li>
                          🧪 Focused on <strong>testing and validation</strong>:
                          unit and integration tests, ground-truth design, and
                          evaluation harnesses
                        </li>
                        <li>
                          🛠️ Comfortable across <strong>Python</strong>,{" "}
                          <strong>Java</strong>, <strong>C++</strong>,{" "}
                          <strong>C#</strong>, <strong>TypeScript</strong>, and{" "}
                          <strong>SQL</strong>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <hr className="about-me-divider" />

                  <div className="about-me-fun">
                    <h2 className="fun-title">🎨 Outside of Tech...</h2>
                    <p className="fun-text">
                      When I’m not coding, you can find me diving into creative
                      hobbies like <strong>crafting</strong>,{" "}
                      <strong>baking</strong>, and <strong>designing</strong>.
                      I'm also a big fan of <strong>video games</strong>
                    </p>
                  </div>
                </div>
              ) : windowName === "Education" ? (
                <div className="education-content">
                  <div className="education-header">
                    <img
                      src={`${process.env.PUBLIC_URL}/GradPic.png`}
                      alt="Graduation"
                      className="education-image"
                    />
                    <div className="education-text">
                      <h2 className="education-title">🎓 Education</h2>
                      {education.map((e) => (
                        <div key={e.degree} className="education-entry">
                          <p className="education-degree">
                            <strong>{e.degree}</strong>
                          </p>
                          <p className="education-school">
                            {e.school}, {e.location}
                          </p>
                          <p className="education-date">{e.dates}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <hr className="education-divider" />

                  <h3 className="coursework-heading">🎯 Relevant Coursework</h3>
                  <div className="education-courses">
                    {[
                      "Programming Fundamentals",
                      "Data Structures & Algorithms",
                      "C/C++ in UNIX",
                      "Probability & Stats",
                      "Computer Architecture",
                      "Artificial Intelligence",
                      "Digital Logic and Computer Design",
                      "Automata Theory",
                      "Database Systems",
                      "Human-Computer Interaction",
                      "Software Engineering",
                      "Public Speaking",
                    ].map((course, index) => (
                      <div
                        key={course}
                        className="course-box"
                        onMouseEnter={() => playNote(index)}
                      >
                        {course}
                      </div>
                    ))}
                  </div>
                </div>
              ) : windowName === "Skills" ? (
                <div className="skills-content">
                  <h2 className="skills-title">💻 Skills</h2>

                  {skills.map((category) => (
                    <React.Fragment key={category.group}>
                      <div className="skills-category">{category.group}</div>
                      <div className="skills-grid">
                        {category.items.map((skill, index) => (
                          <div
                            key={skill}
                            className="skill-badge"
                            onMouseEnter={() => playNote(index)}
                          >
                            {skill}
                          </div>
                        ))}
                      </div>
                    </React.Fragment>
                  ))}
                  <div className="skills-image-wrapper">
                    <img
                      src={`${process.env.PUBLIC_URL}/Pencil.png`}
                      alt="Skills Decoration"
                      className="skills-image"
                    />
                  </div>
                </div>
              ) : windowName === "Experience" ? (
                <div className="entries-content">
                  <h2 className="skills-title">💼 Experience</h2>
                  {experience.map((job) => (
                    <div key={`${job.org}-${job.role}`} className="entry">
                      <div className="entry-head">
                        <strong>{job.role}</strong>
                        <span className="entry-dates">{job.dates}</span>
                      </div>
                      <div className="entry-sub">
                        {job.orgUrl ? (
                          <a
                            href={job.orgUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {job.org}
                          </a>
                        ) : (
                          job.org
                        )}
                        {job.location ? ` · ${job.location}` : ""}
                      </div>
                      <ul className="entry-list">
                        {job.bullets.map((b) => (
                          <li key={b}>{b}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ) : windowName === "Projects" ? (
                <div className="entries-content">
                  <h2 className="skills-title">🚀 Projects</h2>
                  {desktopProjects.map((project) => (
                    <div key={project.name} className="entry">
                      <div className="entry-head">
                        <strong>{project.name}</strong>
                        <span className="entry-dates">{project.dates}</span>
                      </div>
                      <div className="entry-sub">{project.context}</div>
                      <p className="entry-text">{project.description}</p>
                      <div className="skills-grid">
                        {project.tags.map((tag) => (
                          <div key={tag} className="skill-badge">
                            {tag}
                          </div>
                        ))}
                      </div>
                      {project.links.length > 0 && (
                        <div className="entry-links">
                          {project.links.map((link) => (
                            <a
                              key={link.label}
                              href={link.href}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {link.label} ↗
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : windowName === "Gameboy" ? (
                <div className="gameboy-content">
                  <TypingGame />
                </div>
              ) : (
                `This is the content of ${windowName}.`
              )}
            </div>
          </div>
        );
      })}

      {/* Taskbar */}
      <div className="taskbar">
        <div className="taskbar-left">
          <button className="power-button" onClick={togglePowerMenu}>
            ⏻
          </button>
          {showPowerMenu && (
            <div className="power-menu">
              <div onClick={() => navigate("/")}>Exit to main site</div>
              <div onClick={() => navigate("/desktop")}>Restart</div>
            </div>
          )}
        </div>

        {/* Taskbar Center — show tabs */}
        <div className="taskbar-center">
          {openWindows.map((windowName) => (
            <div
              key={windowName}
              className="taskbar-tab"
              onClick={() => {
                if (minimizedWindows.includes(windowName)) {
                  restoreWindow(windowName);
                } else {
                  bringToFront(windowName);
                }
              }}
            >
              {windowName}
            </div>
          ))}
        </div>

        {/* Taskbar Right — Mute button */}
        <div className="taskbar-right">
          <div className="taskbar-mute-button-wrapper">
            <button
              className="taskbar-mute-button"
              onClick={toggleMute}
              aria-label={isMuted ? "Turn sound on" : "Turn sound off"}
            >
              {isMuted ? "🔇" : "🔊"}
            </button>
            <div className="taskbar-mute-tooltip">
              {isMuted ? "Turn sound on" : "Turn sound off"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
