export const chapters = [
  { id: "arrival", index: "00", label: "Arrival" },
  { id: "human", index: "01", label: "The Human" },
  { id: "builder", index: "02", label: "The Builder" },
  { id: "operator", index: "03", label: "The Operator" },
  { id: "player", index: "04", label: "The Player" },
  { id: "explorer", index: "05", label: "The Explorer" },
  { id: "next", index: "06", label: "The Next Version" },
  { id: "connection", index: "07", label: "The Connection" },
] as const;

export const navItems = [
  { id: "human", label: "About" },
  { id: "builder", label: "Work" },
  { id: "operator", label: "Experience" },
  { id: "explorer", label: "Interests" },
  { id: "connection", label: "Connect" },
] as const;

export type CommandItem = {
  id: string;
  label: string;
  hint: string;
  href: string;
  external?: boolean;
};

export const commands: CommandItem[] = [
  { id: "home", label: "Home", hint: "Arrival", href: "/#arrival" },
  { id: "about", label: "About", hint: "The human", href: "/#human" },
  { id: "work", label: "Work", hint: "Projects", href: "/#builder" },
  { id: "experience", label: "Experience", hint: "Maaricha and Storm", href: "/#operator" },
  { id: "player", label: "Gaming", hint: "The player", href: "/#player" },
  { id: "interests", label: "Interests", hint: "The explorer", href: "/#explorer" },
  { id: "next", label: "Direction", hint: "The next version", href: "/#next" },
  { id: "contact", label: "Contact", hint: "Connect", href: "/#connection" },
  { id: "github", label: "GitHub", hint: "hemantchaurasia2002", href: "https://github.com/hemantchaurasia2002", external: true },
  { id: "linkedin", label: "LinkedIn", hint: "Profile", href: "https://www.linkedin.com/in/hemant-chaurasia/", external: true },
  { id: "email", label: "Email", hint: "chaurasiahemant2002@gmail.com", href: "mailto:chaurasiahemant2002@gmail.com" },
  { id: "resume", label: "Resume", hint: "Download", href: "/Hemant-Chaurasia-Resume.pdf" },
];
