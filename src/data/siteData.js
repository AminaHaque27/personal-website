// Single source of truth for the site's content.
// Both the main page (Home) and the retro desktop (MainPage) read from here,
// so updating a job, project, or skill only has to happen in this file.

const PUBLIC = process.env.PUBLIC_URL;

export const profile = {
  name: "Amina Haque",
  title: "Software Engineer",
  eyebrow: "Software Engineer · M.S. Computer Science, UT Dallas",
  headline:
    "I build full-stack products, and the tests and evaluation harnesses that prove they work.",
  // Each entry is one paragraph of the intro on the main page.
  summary: [
    "I've loved making things since I was a kid: art, design, anything hands-on. I was also a bit of a computer nerd, mostly thanks to gaming, and computer science is where those two sides met. I like building tools that are not only useful but intuitive and accessible for the people using them.",
    "Today I'm a full-stack developer at Haque Systems, where I build and ship a multi-tenant AI SaaS for restaurant and tax businesses. I'm also a master's student at UT Dallas, working on NSA-sponsored research into whether LLM agents can recover hidden data from radio-frequency emanations.",
  ],
  location: "Allen, TX",
  email: "aminashaque@gmail.com",
  linkedin: "https://www.linkedin.com/in/amina-syeda-haque/",
  github: "https://github.com/AminaHaque27",
  resume: `${PUBLIC}/Amina_Haque_Resume.pdf`,
  photo: `${PUBLIC}/Profile.png`,
};

export const highlights = [
  {
    value: "72",
    label: "languages supported by real-time translation in MyHaq",
  },
  {
    value: "400+",
    label: "members served by the operations tool I built for GDYO",
  },
  {
    value: "32%",
    label: "fewer order errors after a digital ordering rollout I owned",
  },
];

export const experience = [
  {
    role: "Full-Stack Developer & Product Builder",
    org: "Haque Systems",
    orgUrl: "https://haquesystems.com/",
    location: "Remote",
    dates: "Sept 2024 – Present",
    bullets: [
      "Build and ship a multi-tenant AI SaaS for restaurant and tax businesses, including customer dashboards, internal operating tools, and reporting views, with each client's data isolated from every other (Next.js 15, TypeScript, Supabase/PostgreSQL).",
      "Automated manual back-office work by integrating Square, QuickBooks, and Stripe and building scheduled background jobs.",
      "Co-built and shipped MyHaq, a cross-platform app (web, iOS, Android) with real-time in-app translation across 72 languages.",
    ],
  },
  {
    role: "Software Integrator & Product / Menu Designer",
    org: "NoodleWave",
    location: "Carrollton, TX",
    dates: "Jan 2023 – Dec 2024",
    bullets: [
      "Owned a digital ordering rollout end to end (iPad POS, wireless kitchen printing, and integrations across Square, DoorDash, Uber Eats, and Menufy), cutting order errors 32% and speeding service 38%.",
    ],
  },
  {
    role: "Software Engineer & Product Developer",
    org: "Greater Dallas Youth Orchestra",
    dates: "Aug 2023 – Dec 2023",
    bullets: [
      "Built an internal operating tool for a 400+ member organization, consolidating attendance, scheduling, forms, fees, and newsletters previously kept in spreadsheets and email; gathered requirements from nontechnical staff.",
    ],
  },
  {
    role: "Teaching Assistant / Grader, Discrete Mathematics",
    org: "The University of Texas at Dallas",
    location: "Richardson, TX",
    dates: "Fall 2026",
    bullets: [
      "Grade proofs and problem sets in logic, set theory, and combinatorics for an undergraduate course.",
    ],
  },
  {
    role: "eLearning Studio Assistant",
    org: "The University of Texas at Dallas",
    location: "Richardson, TX",
    dates: "Sept 2025 – July 2026",
    bullets: [
      "Automated OBS / Camtasia / Adobe production workflows, replacing manual steps and improving content reliability and tracking-data quality.",
    ],
  },
  {
    role: "Math Instructor",
    org: "Mathnasium of Allen",
    location: "Allen, TX",
    dates: "Dec 2020 – Aug 2022",
    bullets: [
      "Raised student math scores 22% using assessment data to target each student's specific gaps.",
    ],
  },
];

// link.kind: "external" (opens a new tab), "file" (a PDF in /public),
// or "route" (a page inside this site).
export const projects = [
  {
    name: "RF CTF Testbed for Agentic Emanations Analysis",
    context: "INSuRE Cybersecurity Research · NSA-sponsored",
    dates: "Aug 2026 – Present",
    description:
      "A capture-the-flag testbed that measures whether LLM agents can recover hidden data from radio-frequency emanations. I own signal generation, challenge design, and ground truth: the signal generator and challenge corpus whose answer keys act as the test oracle, varying noise (AWGN), carrier offset, and frame repetition. Agents are scored on flag capture, SSIM, and wrong turns.",
    tags: ["Python", "MCP", "Signal processing", "LLM agent evaluation"],
    links: [],
  },
  {
    name: "Virtual Tether",
    context: "Wearable haptic navigation for blind runners · 3-person team",
    dates: "Jan 2026 – May 2026",
    description:
      "A YOLO computer-vision pipeline connected to an Arduino vibrotactile wristband over a serial link, turning detected obstacles into real-time left, right, and stop cues. We ran a blindfolded pilot study (40 randomized trials plus live navigation); overall cue accuracy of 72.5% was significantly above chance.",
    tags: ["Python", "YOLO", "Arduino", "HCI research"],
    links: [
      {
        label: "Read the paper",
        href: `${PUBLIC}/Virtual_Tether_Final_Report.pdf`,
        kind: "file",
      },
    ],
  },
  {
    name: "Haque Systems",
    context: "Multi-tenant AI SaaS · in production",
    dates: "2024 – Present",
    description:
      "One platform that replaces the stack of separate tools a small business stitches together. I build customer dashboards, internal operating tools, and reporting views with per-client data isolation, plus Square, QuickBooks, and Stripe integrations and scheduled background jobs.",
    tags: ["Next.js 15", "TypeScript", "Supabase", "PostgreSQL", "Stripe"],
    links: [
      {
        label: "haquesystems.com",
        href: "https://haquesystems.com/",
        kind: "external",
      },
    ],
  },
  {
    name: "MyHaq",
    context: "Cross-platform app · web, iOS, Android",
    dates: "Shipped",
    description:
      "An Islamic companion app with prayer times, Quran, and Hadith. Co-built and shipped across web, iOS, and Android with real-time in-app translation across 72 languages.",
    tags: ["Web", "iOS", "Android", "Real-time translation"],
    links: [
      { label: "myhaq.app", href: "https://myhaq.app/", kind: "external" },
    ],
  },
  {
    name: "VisaUiGen",
    context: "AI-powered component generator",
    dates: "July 2025",
    description:
      "A web app that converts natural-language UI prompts into Visa Nova component recommendations and renderable React code snippets.",
    tags: ["React", "Vite", "FastAPI", "OpenAI API", "Visa Nova UI"],
    links: [
      {
        label: "Live demo",
        href: "https://visa-ui-gen.vercel.app",
        kind: "external",
      },
    ],
  },
  {
    name: "Automated Trading Platform",
    context: "Personal project",
    dates: "2024 – Present",
    description:
      "A platform that ingests market data by API, executes through a broker integration, and validates strategies on historical data before live capital. Delivered 26% returns across 60-day simulations.",
    tags: ["Python", "Polygon.io", "Interactive Brokers"],
    links: [],
  },
  {
    name: "Retro Desktop",
    context: "The interactive version of this site",
    dates: "2025",
    description:
      "A retro operating-system desktop built in React, with draggable windows, a taskbar, and a typing mini-game. It was the first version of this portfolio and is still here to explore.",
    tags: ["React", "CSS", "Pointer events"],
    links: [
      { label: "Launch the desktop", href: "/desktop", kind: "route" },
      {
        label: "Source",
        href: "https://github.com/AminaHaque27/personal-website",
        kind: "external",
      },
    ],
  },
];

export const skills = [
  {
    group: "Languages",
    items: ["Python", "Java", "C++", "C#", "TypeScript", "JavaScript", "SQL"],
  },
  {
    group: "Testing & Validation",
    items: [
      "Unit and integration testing",
      "Test design",
      "Ground-truth validation",
      "Evaluation harnesses",
      "Debugging",
    ],
  },
  {
    group: "Systems",
    items: [
      "Linux",
      "Docker",
      "REST APIs",
      "FastAPI",
      "Node.js",
      "Express",
      "PostgreSQL",
      "MySQL",
      "Data pipelines",
    ],
  },
  {
    group: "Security & AI",
    items: [
      "Cybersecurity research (RF emanations, CTF design)",
      "MCP",
      "LLM / AI API integration",
      "AI agent evaluation",
    ],
  },
  {
    group: "Tools & Practices",
    items: [
      "Git / GitHub",
      "CI/CD (GitHub Actions)",
      "Agile / Scrum",
      "Copilot",
      "React",
      "Next.js 15",
      "React Native",
    ],
  },
];

export const education = [
  {
    degree: "M.S. Computer Science",
    school: "The University of Texas at Dallas",
    location: "Richardson, TX",
    dates: "Anticipated Spring 2027",
  },
  {
    degree: "B.S. Computer Science",
    school: "The University of Texas at Dallas",
    location: "Richardson, TX",
    dates: "May 2025",
  },
];
