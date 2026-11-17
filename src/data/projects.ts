export type Project = {
  slug: string;
  index: string;
  title: string;
  kind: string;
  stack: string[];
  summary: string;
  objective: string;
  problem: string;
  contribution: string[];
  process: string[];
  challenges: string;
  href?: string;
};

export const projects: Project[] = [
  {
    slug: "simple-web-server",
    index: "01",
    title: "Simple Web Server",
    kind: "Personal project",
    stack: ["Golang", "HTTP"],
    summary:
      "A small HTTP server written to see how a request is received, routed, and answered.",
    objective:
      "Understand how a web server operates and how a client and a server communicate.",
    problem:
      "Request handling stays abstract until you run a server, hit it, and watch the response.",
    contribution: [
      "Built a basic HTTP server in Golang.",
      "Handled requests and generated responses.",
      "Added custom routes.",
      "Debugged and tested the server while it was running.",
    ],
    process: [
      "Started with the smallest server that could answer a request.",
      "Split behaviour across routes so each path had a clear response.",
      "Repeated requests against the running server to check what it actually returned.",
    ],
    challenges:
      "The useful friction was the gap between the route I thought I had written and the response the client received. Closing that gap meant reading the request path carefully and testing one change at a time.",
    href: "https://github.com/hemantchaurasia2002/simple_web_server",
  },
  {
    slug: "slack-age-bot",
    index: "02",
    title: "Slack Age Bot",
    kind: "Personal project",
    stack: ["Golang", "Slack"],
    summary: "A Slack bot that calculates a person's age from a date of birth.",
    objective: "Practice message handling, validation, and a small piece of application logic inside Slack.",
    problem:
      "A chat message is unstructured. The bot had to accept a date, reject what it could not use, and reply with an age.",
    contribution: [
      "Handled incoming Slack messages.",
      "Validated the date a person sent.",
      "Calculated age from the date of birth.",
      "Sent an automated reply.",
    ],
    process: [
      "Defined the message the bot should understand.",
      "Checked the input before doing any date math.",
      "Returned a direct reply when the date was usable, and a clear response when it was not.",
    ],
    challenges:
      "Dates are easy to misread. The work was in rejecting incomplete input instead of calculating a confident, wrong age.",
    href: "https://github.com/hemantchaurasia2002/slack_age_bot",
  },
  {
    slug: "email-checker-tool",
    index: "03",
    title: "Email Checker Tool",
    kind: "Personal project",
    stack: ["Golang"],
    summary:
      "A verification tool that checks an email's format and attempts a mail-server connectivity check.",
    objective: "Learn the difference between an address that looks valid and one a mail server will talk about.",
    problem:
      "Format checks alone do not tell you whether a server accepts the domain or how it responds.",
    contribution: [
      "Validated email format.",
      "Checked connectivity with the mail server.",
      "Read and interpreted server responses.",
      "Tested the tool against different inputs.",
    ],
    process: [
      "Separated format validation from the network check.",
      "Sent the check only after the address had a usable shape.",
      "Compared responses across valid-looking, incomplete, and unreachable cases.",
    ],
    challenges:
      "A server response is not a simple yes or no. The tool had to treat format errors, connection failures, and server replies as different outcomes.",
    href: "https://github.com/hemantchaurasia2002/email_checker_tool",
  },
  {
    slug: "online-resume-builder",
    index: "04",
    title: "Online Resume Builder",
    kind: "Summer training",
    stack: ["HTML", "CSS", "JavaScript"],
    summary:
      "A browser-based resume builder made during B.Tech summer training.",
    objective: "Practice frontend structure, interface layout, and JavaScript-driven interaction.",
    problem:
      "A resume form has to collect information and present it as a document a person can actually read.",
    contribution: [
      "Built the interface with HTML and CSS.",
      "Used JavaScript for the builder's functionality.",
      "Worked through the layout and interaction as a training project.",
    ],
    process: [
      "Laid out the form and the resume view.",
      "Connected the interface with JavaScript so the page responded to what was entered.",
      "Adjusted the layout until the result was readable.",
    ],
    challenges:
      "Keeping the form and the preview understandable at the same time, without turning the page into a pile of fields.",
  },
  {
    slug: "ivani-diamonds",
    index: "05",
    title: "Ivani Diamonds",
    kind: "Internship · Maaricha",
    stack: ["Wix", "WordPress", "Content", "Data"],
    summary:
      "Website maintenance for Ivani Diamonds during a web development internship at Maaricha. This was operational work on an existing Wix site, not a product I designed from scratch.",
    objective:
      "Keep the website's content and data accurate, and fix the issues that reached the team.",
    problem:
      "A live business site fails in ordinary ways: outdated information, inconsistent data, and pages that do not behave as expected.",
    contribution: [
      "Updated and checked website content.",
      "Maintained database information and looked for inconsistencies.",
      "Investigated functionality and content issues.",
      "Worked in Wix and WordPress.",
      "Troubleshot user-facing problems and reported what had been fixed.",
    ],
    process: [
      "Took a reported issue and reproduced it on the site.",
      "Checked whether the cause was content, data, or behaviour.",
      "Updated the site and confirmed the information matched.",
      "Told the team what changed.",
    ],
    challenges:
      "The difficulty was rarely a blank page. It was finding which piece of information or behaviour was wrong, then fixing that piece without disturbing the rest of the site.",
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
