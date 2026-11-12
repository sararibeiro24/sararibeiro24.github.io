import github from "./images/github.png";
import linkedin from "./images/linkedin.png";
import email from "./images/email.png";
export const EXPERIENCE = [
  {
    role: "TA Teaching Assistant",
    org: "Faculty of Engineering, University of Porto",
    when: "Sept 2026 — Present",
    points: [
      "Guided student teams throughout course projects, fostering teamwork and best practices.Supported professors with progress monitoring and constructive evaluation of student deliverables"
    ]
  },
  {
    role: "Research Intern",
    org: "INEGI",
    when: "Oct 2025 — Jun 2026",
    points: [
      "Data analysis and visualization with Power BI.",
      "Organizing datasets across Excel and SQL queries.",
    ],
  },
  {
    role: "XR Software Intern",
    org: "INESC TEC",
    when: "Summer 2025",
    points: [
      "Designed and built an XR training platform in Unity.",
      "Applied real software-engineering practices to a research prototype.",
    ],
  },
  {
    role: "Store Operator",
    org: "Pans & Company",
    when: "Jun 2024 — Jul 2025",
    points: [
      "Customer service and food prep under quality and safety standards.",
      "Built multitasking and prioritization habits during busy shifts.",
    ],
  }
];

export const SKILLS = [
  { label: "Languages", items: ["C", "C++", "Java", "C#", "Python", "HTML/CSS", "Prolog"] },
  { label: "Backend & Data", items: ["Node.js", "PHP", "Laravel", "PostgreSQL", "SQLite"] },
  { label: "Systems & Tools", items: ["Git", "Linux", "Bash", "Docker", "VirtualBox", "Wireshark"] },
  { label: "Data & XR", items: ["Power BI", "Unity (XR)", "Flutter", "Figma"] },
];

export const LANGUAGES = [
  { name: "Portuguese", level: "Native", percent: 100 },
  { name: "English", level: "C1", percent: 90 },
];

export const VOLUNTEER = [
  { org: "FEUP Buddies", role: "Academic Mentor", text: "Guiding incoming Erasmus students at FEUP." },
  { org: "Community Outreach", role: "Volunteer", text: "\"Banco Alimentar\", beach cleanups, homeless support." },
];

export const GITHUB_USERNAME = "sararibeiro24";

export const SOCIALS = [
  { name: "LinkedIn", href: "https://www.linkedin.com/in/sara-ribeiro-8357023b6/", image: linkedin },
  { name: "GitHub", href: `https://github.com/${GITHUB_USERNAME}`, image: github },
  { name: "Email", href: "mailto:saramribeiro24@gmail.com", image: email },  
];

export const EDUCATION = [
  {
    name: "Bachelor in Informatics and Computing Engineering",
    where: "Faculty of Engineering, University of Porto",
    when: "Sept 2023 — Jun 2026",
    text: "Completed a degree focused on the foundations of software development and computing systems."
  },
  {
    name: "Master in Informatics and Computing Engineering",
    where: "Faculty of Engineering, University of Porto",
    when: "Sept 2026 — Present",
    text: "Currently pursuing advanced studies in Informatics and Computing Engineering."
  }

];

export const PROJECTS = [
  {
    role: "Serial Link Layer Protocol ",
    org: "C",
    description: "Reliable data link layer protocol implemented in C over a serial interface (RS-232), supporting frame framing, byte stuffing, and Stop-and-Wait ARQ error control for file transfers.",
    points: [
      "Designed and implemented a reliable Data Link Layer protocol over RS-232 serial communication in C to transmit data between two systems.",
      "Engineered frame synchronization, byte stuffing/destuffing for data transparency, and error detection using BCC checksums.",
      "Implemented flow control and error recovery mechanisms via Stop-and-Wait ARQ with timeout handling, acknowledgments (RR), and rejections (REJ).",
      "Built an application layer on top to reliably transfer files of arbitrary size, evaluating throughput and transmission efficiency under simulated noisy channel conditions.",
    ],
    info: "https://github.com/sararibeiro24/Y3S1-COMPUTER_NETWORKS",
  },
  {
    role: "Distributed Chat Application ",
    org: "Java",
    description: "Scalable, multithreaded distributed chatroom built in Java using socket programming, supporting concurrent rooms, user presence, and synchronized messaging.",
    points: [
      "Developed a fault-tolerant, multithreaded distributed chatroom system in Java utilizing TCP/UDP sockets for real-time client-server communication.",
      "Engineered concurrency controls and thread-safe data structures to manage concurrent user sessions and eliminate race conditions.",
      "Implemented core messaging features: multi-channel rooms, private and broadcast messaging, user registration, and active presence tracking.",
      "Designed distributed state coordination to ensure message consistency and graceful recovery during client disconnections or network faults.",
    ],
    info: "https://github.com/sararibeiro24/Y3S2-PARALLEL_DISTRIBUTED_COMPUTING/tree/main/assign2",
  },
  {
    role: "Compilers ",
    org: "Java & JVM Bytecode",
    description: "Full compiler for the Java-- language written with JavaCC, featuring AST construction, semantic type checking, and optimized JVM bytecode generation via Jasmin.",
    points: [
      "Constructed a complete compiler front-end using JavaCC for lexical and syntactic analysis, parsing Java-- code into an Abstract Syntax Tree (AST) with error recovery.",
      "Engineered semantic analysis routines: symbol table creation, type checking, method resolution, and variable initialization verification.",
      "Implemented JVM bytecode generation using the Jasmin assembler format, handling control flow, expressions, arrays, and method invocations.",
      "Applied compiler optimizations including register allocation via variable liveness analysis and graph coloring, as well as dead code elimination.",
    ],
    info: "https://github.com/sararibeiro24/Y3S2-COMPILERS",
  },
  {
    role: "GameVerse ",
    org: "Full-Stack",
    description: "Full-stack, database-driven web platform for video game exploration and community discussions, built with PostgreSQL, backend APIs, and responsive design.",
    points: [
      "Architected and implemented a relational database in PostgreSQL featuring normalized schemas (3NF), indexes, transactions, triggers, and stored procedures.",
      "Developed full-stack features including user authentication, personalized game libraries, reviews, ratings, and threaded discussion boards.",
      "Integrated role-based access control (RBAC) supporting distinct permissions for users, moderators, and administrators.",
      "Hardened the application against common security vulnerabilities: SQL injection, Cross-Site Scripting (XSS), and Cross-Site Request Forgery (CSRF).",
    ],
    info: "https://github.com/sararibeiro24/Y3S1-DATABASE_WEB_APPLICATIONS_LABORATORY",
  },
];

export const ACTIVITIES = [
  {
    org: "BEST Porto",
    role: "IT Responsible - SciTeCh 26 ",
    description: "Responsible for IT development and maintenance of SciTeCh.",
    info: "https://scitech.bestporto.org/",
    linkLabel: "View Website",
    points: [
      "Maintain and update the SciTeCh website.",
      "Develop new features for the Store App.",
      "Assist in preparing IT training sessions.",
      "Support the technical topics during the Hackathon.",
    ],
  },
];