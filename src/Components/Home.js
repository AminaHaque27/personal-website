import React from "react";
import { Link } from "react-router-dom";
import {
  profile,
  highlights,
  experience,
  projects,
  skills,
  education,
} from "../data/siteData";
import "./Home.css";

/* ---------- Small inline icons (no icon library needed) ---------- */

const iconProps = {
  width: "1em",
  height: "1em",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
  focusable: false,
};

const ArrowIcon = () => (
  <svg {...iconProps}>
    <path d="M7 17 17 7" />
    <path d="M8 7h9v9" />
  </svg>
);

const DownloadIcon = () => (
  <svg {...iconProps}>
    <path d="M12 4v11" />
    <path d="m7 11 5 5 5-5" />
    <path d="M5 20h14" />
  </svg>
);

const MailIcon = () => (
  <svg {...iconProps}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
);

const GitHubIcon = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden
    focusable={false}
  >
    <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.56 9.56 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden
    focusable={false}
  >
    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4V21H3V9.75Zm6.5 0h3.83v1.54h.05c.53-1 1.84-2.06 3.79-2.06 4.05 0 4.8 2.67 4.8 6.13V21h-4v-5.01c0-1.2-.02-2.73-1.66-2.73-1.67 0-1.92 1.3-1.92 2.65V21h-4V9.75Z" />
  </svg>
);

/* ---------- Helpers ---------- */

const sections = [
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

// The site uses hash-based routing (needed for GitHub Pages), so ordinary
// "#section" links would be read as page routes. Scroll with JS instead.
const scrollToSection = (event, id) => {
  event.preventDefault();
  const target = document.getElementById(id);
  if (!target) return;
  const reduceMotion = window.matchMedia?.(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
  target.focus({ preventScroll: true });
};

const ProjectLink = ({ link }) => {
  if (link.kind === "route") {
    return (
      <Link className="home-link" to={link.href}>
        {link.label} <ArrowIcon />
      </Link>
    );
  }
  return (
    <a
      className="home-link"
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {link.label} <ArrowIcon />
    </a>
  );
};

const Section = ({ id, title, children }) => (
  <section
    id={id}
    className="home-section"
    aria-labelledby={`${id}-title`}
    tabIndex={-1}
  >
    <h2 id={`${id}-title`} className="home-section-title">
      {title}
    </h2>
    <div className="home-section-body">{children}</div>
  </section>
);

/* ---------- Page ---------- */

const Home = () => {
  return (
    <div className="home">
      <div className="home-accent-bar" aria-hidden />

      <header className="home-nav">
        <div className="home-container home-nav-inner">
          <a
            className="home-brand"
            href="#/"
            onClick={(e) => scrollToSection(e, "top")}
          >
            {profile.name}
          </a>
          <nav className="home-nav-links" aria-label="Sections">
            {sections.map((s) => (
              <a
                key={s.id}
                href="#/"
                onClick={(e) => scrollToSection(e, s.id)}
              >
                {s.label}
              </a>
            ))}
          </nav>
          <a
            className="home-button home-button-small"
            href={profile.resume}
            target="_blank"
            rel="noopener noreferrer"
          >
            Resume <DownloadIcon />
          </a>
        </div>
      </header>

      <main className="home-container">
        {/* Hero */}
        <section id="top" className="home-hero" tabIndex={-1}>
          <div className="home-hero-text">
            <p className="home-eyebrow">{profile.eyebrow}</p>
            <h1 className="home-name">{profile.name}</h1>
            <p className="home-headline">{profile.headline}</p>
            {profile.summary.map((paragraph) => (
              <p key={paragraph} className="home-summary">
                {paragraph}
              </p>
            ))}

            <div className="home-actions">
              <a
                className="home-button home-button-primary"
                href="#/"
                onClick={(e) => scrollToSection(e, "projects")}
              >
                View projects
              </a>
              <a
                className="home-button"
                href={profile.resume}
                target="_blank"
                rel="noopener noreferrer"
              >
                Download resume <DownloadIcon />
              </a>
            </div>

            <ul className="home-social">
              <li>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LinkedInIcon /> LinkedIn
                </a>
              </li>
              <li>
                <a href={`mailto:${profile.email}`}>
                  <MailIcon /> {profile.email}
                </a>
              </li>
              <li>
                <a href={profile.github} target="_blank" rel="noopener noreferrer">
                  <GitHubIcon /> GitHub
                </a>
              </li>
            </ul>
          </div>

          <img
            className="home-photo"
            src={profile.photo}
            alt={`Portrait of ${profile.name}`}
            width="280"
            height="280"
          />
        </section>

        <ul className="home-highlights" aria-label="Highlights">
          {highlights.map((h) => (
            <li key={h.value}>
              <span className="home-highlight-value">{h.value}</span>
              <span className="home-highlight-label">{h.label}</span>
            </li>
          ))}
        </ul>

        {/* Experience */}
        <Section id="experience" title="Experience">
          <ol className="home-timeline">
            {experience.map((job) => (
              <li key={`${job.org}-${job.role}`} className="home-job">
                <div className="home-job-head">
                  <h3 className="home-job-role">{job.role}</h3>
                  <span className="home-dates">{job.dates}</span>
                </div>
                <p className="home-job-org">
                  {job.orgUrl ? (
                    <a
                      className="home-link"
                      href={job.orgUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {job.org} <ArrowIcon />
                    </a>
                  ) : (
                    job.org
                  )}
                  {job.location ? (
                    <span className="home-muted"> · {job.location}</span>
                  ) : null}
                </p>
                <ul className="home-bullets">
                  {job.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </Section>

        {/* Projects */}
        <Section id="projects" title="Projects">
          <div className="home-projects">
            {projects.map((p) => (
              <article key={p.name} className="home-card">
                <div className="home-card-head">
                  <h3 className="home-card-title">{p.name}</h3>
                  <span className="home-dates">{p.dates}</span>
                </div>
                <p className="home-card-context">{p.context}</p>
                <p className="home-card-text">{p.description}</p>
                <ul className="home-tags" aria-label="Technologies">
                  {p.tags.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
                {p.links.length > 0 && (
                  <div className="home-card-links">
                    {p.links.map((l) => (
                      <ProjectLink key={l.label} link={l} />
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
        </Section>

        {/* Skills */}
        <Section id="skills" title="Skills">
          <dl className="home-skills">
            {skills.map((s) => (
              <div key={s.group} className="home-skill-row">
                <dt>{s.group}</dt>
                <dd>
                  <ul className="home-tags">
                    {s.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </dd>
              </div>
            ))}
          </dl>
        </Section>

        {/* Education */}
        <Section id="education" title="Education">
          <ul className="home-education">
            {education.map((e) => (
              <li key={e.degree}>
                <div className="home-job-head">
                  <h3 className="home-job-role">{e.degree}</h3>
                  <span className="home-dates">{e.dates}</span>
                </div>
                <p className="home-job-org">
                  {e.school}
                  <span className="home-muted"> · {e.location}</span>
                </p>
              </li>
            ))}
          </ul>
        </Section>

        {/* Contact */}
        <Section id="contact" title="Contact">
          <p className="home-contact-lede">
            The best way to reach me is email. I'm happy to talk about roles,
            research, or anything I've built.
          </p>
          <a className="home-contact-email" href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
          <div className="home-actions">
            <a
              className="home-button"
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedInIcon /> LinkedIn
            </a>
            <a
              className="home-button"
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHubIcon /> GitHub
            </a>
            <a
              className="home-button"
              href={profile.resume}
              target="_blank"
              rel="noopener noreferrer"
            >
              Resume <DownloadIcon />
            </a>
          </div>
        </Section>
      </main>

      <footer className="home-footer">
        <div className="home-container home-footer-inner">
          <span>
            © {new Date().getFullYear()} {profile.name} · {profile.location}
          </span>
          <Link className="home-link" to="/desktop">
            Try the retro desktop version <ArrowIcon />
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default Home;
