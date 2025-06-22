import React, { useState, useRef, useEffect } from "react";
import TypingGame from "./TypingGame";
import "./MainPage.css";

const MainPage = () => {
  const [showPowerMenu, setShowPowerMenu] = useState(false);
  const [openWindows, setOpenWindows] = useState([]);
  const [minimizedWindows, setMinimizedWindows] = useState([]);
  const [windowPositions, setWindowPositions] = useState({});
  const [hidingWindows, setHidingWindows] = useState([]);
  const [zOrder, setZOrder] = useState([]);
  const [isMuted, setIsMuted] = useState(false);
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

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Add this below toggleMute
  const startBackgroundMusic = () => {
    if (audioRef.current && audioRef.current.paused) {
      audioRef.current.play().catch((e) => {
        console.log("Audio play blocked:", e);
      });
    }
  };

  const togglePowerMenu = () => {
    setShowPowerMenu((prev) => !prev);
  };

  const playClickSound = () => {
    const audio = new Audio(`${process.env.PUBLIC_URL}/Click.mp3`);
    audio.volume = 1;
    audio.play();
  };

  const playPageFlipSound = () => {
    const audio = new Audio(`${process.env.PUBLIC_URL}/PageFlip.mp3`);
    audio.volume = 1;
    audio.play();
  };

  const getDefaultPosition = () => {
    const width = Math.min(0.9 * window.innerWidth, 2000);
    const height = Math.min(0.8 * window.innerHeight, 1500);

    return {
      x: window.innerWidth / 2 - width / 2,
      y: window.innerHeight / 2 - height / 2,
    };
  };

  const openWindow = (windowName) => {
    if (!openWindows.includes(windowName)) {
      setOpenWindows([...openWindows, windowName]);
      setWindowPositions({
        ...windowPositions,
        [windowName]: getDefaultPosition(),
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

  const handleMouseDown = (e, windowName) => {
    draggingWindow.current = windowName;
    bringToFront(windowName);
    offset.current = {
      x: e.clientX - windowPositions[windowName].x,
      y: e.clientY - windowPositions[windowName].y,
    };
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e) => {
    if (!draggingWindow.current) return;
    const windowName = draggingWindow.current;
    const newX = e.clientX - offset.current.x;
    const newY = e.clientY - offset.current.y;

    setWindowPositions((prevPositions) => ({
      ...prevPositions,
      [windowName]: { x: newX, y: newY },
    }));
  };

  const handleMouseUp = () => {
    draggingWindow.current = null;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const handleIconClick = (windowName) => {
    startBackgroundMusic();
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
            onClick={() => {
              playClickSound();
              openWindow("Gameboy");
            }}
          >
            <img
              src={`${process.env.PUBLIC_URL}/Gameboy.png`}
              alt="Gameboy"
              className="desktop-icon-image gameboy-icon"
            />
            <div className="desktop-icon-label">Arcade</div>
          </div>
        </div>
      </div>

      {/* Windows */}
      {openWindows.map((windowName) =>
        windowPositions[windowName] !== undefined &&
        !minimizedWindows.includes(windowName) ? (
          <div
            key={windowName}
            className={`app-window ${
              hidingWindows.includes(windowName) ? "hide" : ""
            }`}
            style={{
              left: `${windowPositions[windowName].x}px`,
              top: `${windowPositions[windowName].y}px`,
              transform: "none",
              zIndex: zOrder.indexOf(windowName) + 100,
            }}
            onMouseDown={() => bringToFront(windowName)}
          >
            <div
              className="app-window-titlebar"
              onMouseDown={(e) => handleMouseDown(e, windowName)}
            >
              {windowName}
              <div>
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
                <iframe
                  src={`${process.env.PUBLIC_URL}/Amina Haque Resume (10).pdf`}
                  width="100%"
                  height="100%"
                  style={{ border: "none" }}
                  title="Resume PDF"
                />
              ) : windowName === "Contact" ? (
                <div className="contact-content">
                  <div className="contact-box">
                    📧 Email: aminashaque@gmail.com
                  </div>
                  <div className="contact-box">
                    🔗 LinkedIn:{" "}
                    <a
                      href="https://www.linkedin.com/in/amina-syeda-haque/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      https://www.linkedin.com/in/amina-syeda-haque/
                    </a>
                  </div>
                  <div className="contact-box">📞 Phone: 214-609-3944</div>
                  <div className="contact-callout">
                    👋 <span className="emoji-wave">Hey there!</span> Feel free
                    to reach out — I'm always open to exciting opportunities,
                    tech chats, and meaningful collaborations 🚀
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
                          🎓 Recent Computer Science Graduate from UT Dallas
                        </li>
                        <li>
                          ⚙️ Full-stack developer with hands-on experience in{" "}
                          <strong>React</strong>, <strong>Node.js</strong>,{" "}
                          <strong>Python</strong>, <strong>Java</strong>, and{" "}
                          <strong>C/C++</strong>
                        </li>
                        <li>
                          🖥️ Front-end expertise in <strong>HTML</strong>,{" "}
                          <strong>CSS</strong>, <strong>JavaScript</strong>,{" "}
                          <strong>TypeScript</strong>, and{" "}
                          <strong>responsive UI/UX design</strong>
                        </li>
                        <li>
                          🛠️ Back-end experience with <strong>Node.js</strong>,{" "}
                          <strong>Express.js</strong>, <strong>SQL</strong>,{" "}
                          <strong>MongoDB</strong>, and{" "}
                          <strong>REST API</strong> development; strong
                          understanding of <strong>authentication</strong>,{" "}
                          <strong>data modeling</strong>, and{" "}
                          <strong>scalable system design</strong>
                        </li>
                        <li>
                          ☁️ Skilled in{" "}
                          <strong>version control (Git/GitHub)</strong>, cloud
                          deployment workflows, and collaborative development
                          using <strong>Agile</strong> methodologies
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
                      <p className="education-degree">
                        <strong>Bachelor of Science in Computer Science</strong>
                      </p>
                      <p className="education-school">
                        The University of Texas at Dallas, Richardson, TX
                      </p>
                      <p className="education-date">May 2025</p>
                    </div>
                  </div>

                  <hr className="education-divider" />

                  <h3 className="coursework-heading">🎯 Relevant Coursework</h3>
                  <div className="education-courses">
                    {[
                      { label: "Programming Fundamentals", sound: "Gnote" },
                      { label: "Data Structures & Algorithms", sound: "Fnote" },
                      { label: "C/C++ in UNIX", sound: "FnoteTwo" },
                      { label: "Probability & Stats", sound: "Enote" },
                      { label: "Computer Architecture", sound: "Gnote" },
                      { label: "Artificial Intelligence", sound: "Fnote" },
                      {
                        label: "Digital Logic and Computer Design",
                        sound: "FnoteTwo",
                      },
                      { label: "Automata Theory", sound: "Enote" },
                      { label: "Database Systems", sound: "Gnote" },
                      { label: "Human-Computer Interaction", sound: "Fnote" },
                      { label: "Software Engineering", sound: "FnoteTwo" },
                      { label: "Public Speaking", sound: "Enote" },
                    ].map((course, index) => (
                      <div
                        key={index}
                        className="course-box"
                        onMouseEnter={() => {
                          // Stop all other sounds before playing
                          const audio = new Audio(`/${course.sound}.mp3`);
                          audio.volume = 0.6;
                          audio.play();
                        }}
                      >
                        {course.label}
                      </div>
                    ))}{" "}
                  </div>
                </div>
              ) : windowName === "Skills" ? (
                <div className="skills-content">
                  <h2 className="skills-title">💻 Skills</h2>

                  <div className="skills-category">
                    Languages & Technologies
                  </div>
                  <div className="skills-grid">
                    {[
                      "C#",
                      "C++",
                      "C",
                      "Java",
                      "Python",
                      "JavaScript",
                      "TypeScript",
                      "HTML",
                      "CSS",
                      "MySQL",
                      "Bash/Shell Scripting",
                    ].map((skill, index) => {
                      const sounds = ["Gnote", "Fnote", "FnoteTwo", "Enote"];
                      const sound = sounds[index % sounds.length];
                      return (
                        <div
                          key={index}
                          className="skill-badge"
                          onMouseEnter={() => {
                            const audio = new Audio(`/${sound}.mp3`);
                            audio.volume = 0.6;
                            audio.play();
                          }}
                        >
                          {skill}
                        </div>
                      );
                    })}
                  </div>

                  <div className="skills-category">Frameworks & Tools</div>
                  <div className="skills-grid">
                    {[
                      "React",
                      "Next.js",
                      "Node.js",
                      "React Native",
                      "Express",
                      "Expo",
                      "Git",
                      "GitHub",
                      "Docker",
                      "Angular",
                    ].map((skill, index) => {
                      const sounds = ["Gnote", "Fnote", "FnoteTwo", "Enote"];
                      const sound = sounds[index % sounds.length];
                      return (
                        <div
                          key={index}
                          className="skill-badge"
                          onMouseEnter={() => {
                            const audio = new Audio(`/${sound}.mp3`);
                            audio.volume = 0.6;
                            audio.play();
                          }}
                        >
                          {skill}
                        </div>
                      );
                    })}
                  </div>

                  <div className="skills-category">UI/UX & Platforms</div>
                  <div className="skills-grid">
                    {[
                      "Figma",
                      "Canva",
                      "UX/UI Design",
                      "Eclipse",
                      "VS Code",
                      "Tailwind CSS",
                      "IntelliJ",
                      "Linux/Unix",
                    ].map((skill, index) => {
                      const sounds = ["Gnote", "Fnote", "FnoteTwo", "Enote"];
                      const sound = sounds[index % sounds.length];
                      return (
                        <div
                          key={index}
                          className="skill-badge"
                          onMouseEnter={() => {
                            const audio = new Audio(`/${sound}.mp3`);
                            audio.volume = 0.6;
                            audio.play();
                          }}
                        >
                          {skill}
                        </div>
                      );
                    })}
                  </div>
                  <div className="skills-image-wrapper">
                    <img
                      src={`${process.env.PUBLIC_URL}/Pencil.png`}
                      alt="Skills Decoration"
                      className="skills-image"
                    />
                  </div>
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
        ) : null
      )}

      {/* Taskbar */}
      <div className="taskbar">
        <div className="taskbar-left">
          <button className="power-button" onClick={togglePowerMenu}>
            ⏻
          </button>
          {showPowerMenu && (
            <div className="power-menu">
              <div>Sleep</div>
              <div>Shut down</div>
              <div>Restart</div>
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
            <button className="taskbar-mute-button" onClick={toggleMute}>
              {isMuted ? "🔇" : "🔊"}
            </button>
            <div className="taskbar-mute-tooltip">
              {isMuted ? "Unmute Music" : "Mute Music"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
