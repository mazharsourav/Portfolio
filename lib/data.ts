// Central content file. Swap the placeholder values below with real info,
// images, and links whenever they're ready — components read only from here.

// Used for search engines and link previews: the canonical address, sitemap,
// robots.txt and structured data are all built from these values.
export const site = {
  url: "https://mazharsourav.me",
  description:
    "Mazharul Islam Sourav (Mazhar Sourav) is a full stack developer in Dhaka, Bangladesh, building web apps with React, TypeScript, Node.js, Express and Django.",
};

export const profile = {
  firstName: "Mazhar",
  lastName: "Sourav",
  fullName: "Mazharul Islam Sourav", // legal name, as on the CV — what recruiters will search for
  initials: "MS",
  title: "Full-Stack Developer",
  tagline: "I turn \"what if\" into working software.",
  bio: "Full stack developer and Computer Science and Engineering graduate from the University of Asia Pacific. I spent four months as a frontend intern at Eutropia IT, and on my own time I build and deploy web apps with React, TypeScript, Node.js, Express and Django. I'm looking for full stack or frontend roles in Dhaka or remote.",
  gpaBadge: "3.60 CGPA",
  role: "Computer Science and Engineering Graduate\n& Full Stack Developer",
  resumeUrl: "/Mazharul_Islam_Sourav_Resume.pdf",
  codeSnippet: {
    fileLabel: "developer.js",
    lines: [
      { text: "// Full Stack Developer", type: "comment" },
      { text: "const developer = {", type: "code" },
      { text: '  name: "Mazhar Sourav",', type: "code" },
      { text: '  skills: ["React", "Node.js", "TypeScript"],', type: "code" },
      { text: '  focuses: ["Full-Stack", "UI/UX"],', type: "code" },
      { text: '  learning: "Always",', type: "code" },
      { text: "};", type: "code" },
    ],
  },
};

export const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#achievements", label: "Achievements" },
  { href: "#contact", label: "Contact" },
];

export const socials = [
  { label: "GitHub", href: "https://github.com/mazharsourav", icon: "github" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/mazharsourav/", icon: "linkedin" },
  { label: "Email", href: "mailto:mazharsourav54@gmail.com", icon: "mail" },
];

export const education = [
  {
    degree: "BSc (Eng.) in Computer Science and Engineering",
    institution: "University of Asia Pacific",
    period: "2022 - 2026",
    note: "Graduated · CGPA 3.60/4.00",
  },
];

export const experience = [
  {
    role: "Frontend Developer Intern",
    company: "Eutropia IT",
    period: "Feb 2026 - Jun 2026",
    note: "",
  },
  {
    role: "Freelance Web Developer",
    company: "Self-Employed",
    period: "2026 - Present",
    note: "",
  },
];

export const skillCategories = [
  {
    title: "Programming Languages",
    icon: "code",
    tags: ["JavaScript", "TypeScript", "Python", "Java"],
  },
  {
    title: "Frontend Development",
    icon: "layout",
    tags: ["React", "Next.js", "Tailwind CSS", "HTML/CSS"],
  },
  {
    title: "Backend Development",
    icon: "server",
    tags: ["Node.js", "Express.js", "REST APIs", "GraphQL"],
  },
  {
    title: "Databases",
    icon: "database",
    tags: ["MongoDB", "PostgreSQL", "MySQL", "Redis"],
  },
  {
    title: "Tools & Technologies",
    icon: "wrench",
    tags: ["Git", "Docker", "Vercel", "Agile/Scrum"],
  },
  {
    title: "Design",
    icon: "palette",
    tags: ["Figma", "UI/UX Design", "Wireframing", "Prototyping"],
  },
];

type Project = {
  title: string;
  description: string;
  tags: string[];
  github: string;
  live: string;
  image?: string; // path in public/, e.g. "/projects/tetris.png" — leave unset to use the placeholder art
};

export const projects: Project[] = [
  {
    title: "NoteSwap",
    description:
      "A note-sharing platform for university students: providers upload admin-verified notes, students browse and rate them, and premium users send problems to providers through NoteSolve.",
    tags: ["Python", "Django", "JavaScript", "PDF.js"],
    github: "https://github.com/mazharsourav/NoteSwap-V2",
    live: "https://mazharsourav.pythonanywhere.com",
    image: "/projects/noteswap.png",
  },
  {
    title: "Habit Tracker",
    description:
      "A clean, ad-free habit tracker with an AI coach. Track daily streaks, see your consistency on a 90-day heatmap, and get weekly reviews and habit suggestions from Google Gemini.",
    tags: ["React", "Express", "MongoDB", "Gemini API"],
    github: "https://github.com/mazharsourav/Habit-Tracker",
    live: "#",
    image: "/projects/habit-tracker.png",
  },
  {
    title: "Bangla News Crawler",
    description:
      "Tackles the shortage of Bangla AI training data by crawling 17 Bangla and English news sites into a clean, duplicate-free bilingual dataset, stored in SQLite and exportable to CSV or JSON.",
    tags: ["Python", "Scrapy", "SQLite", "NLP"],
    github: "https://github.com/mazharsourav/Machine-Learning/tree/main/Advance/Web-Scraper",
    live: "#",
    image: "/projects/bangla-news-crawler.png",
  },
  {
    title: "Album Finder",
    description:
      "Search any artist and browse their full Spotify discography — filter by albums, singles, or compilations, sort releases, and open tracklists with links straight to Spotify. An Express backend keeps the API credentials off the client.",
    tags: ["React", "Vite", "Express", "Spotify API"],
    github: "https://github.com/mazharsourav/Album-Finder",
    live: "https://albumfinder-app.vercel.app/",
    image: "/projects/album-finder.png",
  },
  {
    title: "Orbital",
    description:
      "Track the International Space Station live on an interactive map with a position trail, telemetry, and the current crew roster, then browse NASA's Astronomy Picture of the Day archive back to 1995. A Vercel serverless proxy handles the crew data.",
    tags: ["TypeScript", "Vite", "Leaflet", "NASA API"],
    github: "https://github.com/mazharsourav/Orbital",
    live: "https://orbital-beta-green.vercel.app/",
    image: "/projects/orbital-tracker.png",
  },
  {
    title: "Tetris",
    description:
      "A classic Tetris clone built with Python and Pygame, featuring a next-piece preview, level progression that speeds up piece drops, and a full scoring system with keyboard controls.",
    tags: ["Python", "Pygame", "Game Dev"],
    github: "https://github.com/mazharsourav/Games/tree/main/Python/Tetris%20game",
    live: "#",
    image: "/projects/tetris.svg",
  },
  {
    title: "Catch The Eggs",
    description:
      "An arcade game in C++ and OpenGL: move a basket to catch falling eggs across six levels, dodging hazards and grabbing power-ups, with combos and saved high scores.",
    tags: ["C++", "OpenGL", "FreeGLUT", "Game Dev"],
    github: "https://github.com/mazharsourav/Games/tree/main/C%2B%2B/Catch%20The%20Eggs",
    live: "#",
    image: "/projects/catch-the-eggs.svg",
  },
];

type Achievement = {
  year: string;
  title: string;
  description: string;
  tag: string;
  link?: string; // certificate/credential URL — omit if there's nothing to link to
};

export const achievements: Achievement[] = [
  {
    year: "2022-2026",
    title: "Vice-Chancellor's Award (3x)",
    description:
      "Received the Vice-Chancellor's Award three times at the University of Asia Pacific for academic results.",
    tag: "Academic",
  },
  {
    year: "2022-2026",
    title: "Dean's Award (1x)",
    description:
      "Received the Dean's Award at the University of Asia Pacific for academic results.",
    tag: "Academic",
  },
  {
    year: "", // TODO: year earned
    title: "Google AI Essentials",
    description:
      "Certificate from Google on using generative AI tools to speed up everyday work.",
    tag: "Certification",
    // link: "", // TODO: add the certificate/credential URL
  },
  {
    year: "", // TODO: year earned
    title: "Google Prompting Essentials",
    description:
      "Certificate from Google on writing clear, effective prompts for AI tools.",
    tag: "Certification",
    // link: "", // TODO: add the certificate/credential URL
  },
];

export const contact = {
  email: "mazharsourav54@gmail.com",
  phone: "+880 1740-789064",
  location: "Dhaka, Bangladesh",
  availability: "Open to opportunities", // shown in the footer status bar — set to "" to hide it
  // Web3Forms access key — public by design, it only lets people send messages to this inbox
  web3formsKey: "05978f73-778a-4602-84f0-569cf4254df3",
};
