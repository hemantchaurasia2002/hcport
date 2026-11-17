export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "";

export const profile = {
  name: "Hemant Chaurasia",
  location: "Lucknow, Uttar Pradesh, India",
  coordinates: "26.85° N, 80.95° E",
  status: "Open to work",
  email: "chaurasiahemant2002@gmail.com",
  linkedin: "https://www.linkedin.com/in/hemant-chaurasia/",
  github: "https://github.com/hemantchaurasia2002",
  resume: "/Hemant-Chaurasia-Resume.pdf",
  youtubeNote:
    "I make BGMI-focused videos. The channel address is not published on this site yet.",
  title: "Hemant Chaurasia | Builder, Operator, Explorer",
  description:
    "Hemant Chaurasia is a Computer Science Engineering graduate in Lucknow. He builds for the web, writes small programs in Golang, JavaScript, and Python, and has managed a 15,000-member esports Discord. Open to work.",
  tagline: "Curiosity builds things. Experiences shape people. The journey never stops.",
  theme: "The Human Behind the Machine",
} as const;

export const education = [
  {
    place: "Khwaja Moinuddin Chishti Language University",
    detail: "B.Tech, Computer Science Engineering",
    meta: "2021–2025 · Lucknow · SGPA 7.0",
  },
  {
    place: "Colvin Taluqdars College",
    detail: "Higher secondary",
    meta: "2019–2021 · 84%",
  },
  {
    place: "Bal Vidya Mandir Senior Secondary School",
    detail: "Secondary",
    meta: "2016–2018 · 74%",
  },
] as const;

export const photos = {
  formal: {
    src: "/images/personal/portrait-formal-cut.png",
    width: 1024,
    height: 854,
    alt: "Hemant Chaurasia in a navy suit and glasses, smiling in a bright interior.",
  },
  evening: {
    src: "/images/personal/portrait-evening.jpg",
    width: 768,
    height: 1024,
    alt: "Hemant Chaurasia in a blue patterned kurta, photographed at night during a gathering.",
  },
  gathering: {
    src: "/images/personal/portrait-gathering.jpg",
    width: 575,
    height: 1024,
    alt: "Hemant Chaurasia standing in a decorated event hall, wearing a brown polo and light trousers.",
  },
  ridgeCamera: {
    src: "/images/personal/ridge-camera.jpg",
    width: 1024,
    height: 768,
    alt: "Hemant Chaurasia crouching on a rocky ridge with a camera, photographing a range of mountains.",
  },
  ridgeOpen: {
    src: "/images/personal/ridge-open.jpg",
    width: 768,
    height: 1024,
    alt: "Hemant Chaurasia standing on a mountain ridge with his arms open toward the valley.",
  },
} as const;

export const courses = [
  { name: "Get Started with Figma", when: "February 2024" },
  {
    name: "Programming for Everybody (Getting Started with Python)",
    org: "University of Michigan",
    when: "July 2022",
  },
  {
    name: "Fundamentals of Graphic Design",
    org: "California Institute of the Arts",
    when: "August 2021",
  },
  {
    name: "Mathematical Thinking in Computer Science",
    org: "University of California San Diego",
    when: "November 2020",
  },
  {
    name: "Principles of Game Design",
    org: "Michigan State University",
    when: "August 2020",
  },
  {
    name: "Introduction to Game Development",
    org: "Michigan State University",
    when: "July 2020",
  },
] as const;

export const achievements = [
  {
    title: "Hacktoberfest 2023",
    detail: "Participated and contributed to open-source work with other developers.",
  },
  {
    title: "T-shirt and logo design contest",
    detail:
      "Designed a logo for Full-Stack Quantum Computation and won a T-shirt in the contest.",
  },
] as const;

export const directions = [
  {
    title: "Software and frontend",
    detail: "Interfaces, web applications, and the everyday work of keeping them reliable.",
  },
  {
    title: "Technical support",
    detail: "Finding what broke, explaining it clearly, and staying with the problem until it is fixed.",
  },
  {
    title: "AI, data, and evaluation",
    detail: "Data quality, content evaluation, and careful analytical work. This is an interest, not a claim of advanced machine-learning expertise.",
  },
  {
    title: "Gaming operations",
    detail: "LiveOps, player support, esports operations, and community work around games.",
  },
] as const;

export const contributions = [
  {
    title: "Technical",
    detail: "Web interfaces, application behaviour, databases, small programs, and learning a tool I have not used before.",
  },
  {
    title: "Operational",
    detail: "Communities, registrations, events, and the unglamorous work of keeping a digital space organized.",
  },
  {
    title: "Analytical",
    detail: "Checking information, tracing a problem, and paying attention to whether something is actually correct.",
  },
  {
    title: "Collaborative",
    detail: "Working with a team, explaining a technical issue, and supporting the people on the other side of it.",
  },
] as const;
