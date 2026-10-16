const publicAsset = (path: string) =>
  `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;

export const profile = {
  name: "Rahool Gir",
  firstName: "Rahool",
  lastName: "Gir",
  title: "Senior Full-Stack AI Software Engineer",
  shortTitle: "Full-Stack AI Engineer",
  years: "5+",
  tagline:
    "Java · Spring Boot · Python · React · Next.js · TypeScript · Node.js · Microservices · AI/LLM",
  location: "Karachi, Pakistan",
  remote: "Remote – Global",
  phone: "+92 308 9567074",
  phoneHref: "tel:+923089567074",
  email: "rahool.goswami16@gmail.com",
  github: "https://github.com/Rahul-AlPHA1",
  linkedin: "https://www.linkedin.com/in/rahool-goswami-4b055a126/",
  portfolio: "https://rahul-alpha1.github.io/RahoolPortfolio.com/",
  resume: publicAsset("Rahool_Gir_Senior_FullStack_Engineer.pdf"),
  currentRole: "Senior Consultant @ Systems Limited × Confiz",
  availability:
    "Flexible remote hours, including weekends, with US/EU time-zone overlap.",
  openTo: "Full-time or contract · Remote, onsite or relocation · ~1 month notice (negotiable)",
  heroSummary:
    "5+ years shipping production systems end-to-end — React & Next.js front-ends, Java/Spring Boot, Python & Node.js services — with LLM-powered features built in. Now building AI-enabled US healthcare software at Systems Limited × Confiz.",
  overview: [
    "Senior Full-Stack AI Software Engineer with 5+ years of experience building, debugging and evolving complete production applications — from React, Next.js, Vue.js and TypeScript front-ends to Java/Spring Boot, Quarkus, Python and Node.js services, SQL/NoSQL data, Kafka event streams, and Docker, Kubernetes, Azure and AWS delivery.",
    "AI sits at the core of how I build. I design and ship LLM-powered features — multi-provider routing across OpenAI, Gemini and Groq, offline Ollama fallbacks, RAG pipelines and prompt engineering — and have launched three live multi-LLM products: FakeShield, LendLedger and Zynapse. I work daily with AI coding agents like Claude Code and Cline, and rigorously review generated code for correctness, security, performance and maintainability.",
    "Today I'm a Senior Consultant at Systems Limited × Confiz, building the AI Search and Tech AI modules of Chatterbox, an AI-enabled US healthcare platform. Before that I spent four years on AL-Habib Bank’s core-banking platform, leading a 4-member team and shipping regulated, high-availability microservices, Trade Finance and Teller modules. micro1-certified Senior Software Design Engineer.",
  ],
  aiToolkit: ["Claude Code", "Cline", "OpenAI", "Gemini", "Groq", "Ollama", "RAG", "Prompt Engineering"],
};

// Hiring logistics recruiters ask about most (used by the chatbot and site copy).
export const hiring = {
  noticePeriod: "around 1 month",
  noticeNote: "negotiable for urgent roles — an earlier start can be discussed on a call",
  employment: "Full-time and contract roles",
  salary: "Discussed on a call, based on the role, scope and engagement type",
  workMode: "Remote, onsite or relocation",
};

export const heroStats = [
  { value: 5, suffix: "+", label: "Years Experience" },
  { value: 10, suffix: "+", label: "Microservices Shipped" },
  { value: 3, suffix: "", label: "Live AI Products" },
  { value: 4, suffix: "", label: "Engineers Led" },
];

export const heroRoles = ["Full-Stack", "AI / LLM", "Microservices", "Fintech", "HealthTech"];

export const coreStrengths = [
  {
    title: "End-to-End Full-Stack Delivery",
    description:
      "Ships user-facing features together with the APIs, services and data models behind them — from React/Next.js/Vue UI state to Spring Boot, Python and Node.js services and relational schemas.",
  },
  {
    title: "Multi-Language Production",
    description:
      "Java, TypeScript/JavaScript and Python in production, with earlier C#/ASP.NET MVC. Comfortable reading, porting and re-implementing logic across ecosystems.",
  },
  {
    title: "Unfamiliar Codebases, Fast",
    description:
      "Ramps quickly onto large existing repos — core-banking microservices, a healthcare BFF / AI Search codebase — by mapping architecture, request flows and API contracts first.",
  },
  {
    title: "Systematic Debugging",
    description:
      "Traces requests across browser, front-end state, BFF, services, brokers, databases and deployments to isolate root causes in state, contracts, auth, persistence and config.",
  },
  {
    title: "AI-Generated Code Evaluation",
    description:
      "Daily hands-on use of AI coding agents (Claude Code, Cline) and multi-LLM APIs; reviews and hardens AI output for correctness, security, performance and maintainability.",
  },
];

export const skillGroups = [
  {
    title: "Languages",
    items: ["Java", "TypeScript", "JavaScript (ES6+)", "Python", "SQL", "C#", "HTML5", "CSS3"],
  },
  {
    title: "Frontend",
    items: ["React 19", "Next.js", "Vite", "Vue.js", "XState", "Tailwind CSS", "Recharts", "State Management"],
  },
  {
    title: "Backend & APIs",
    items: ["Spring Boot", "Quarkus", "Node.js", "Express.js", "Flask", "REST API Design", "BFF Pattern", "Microservices"],
  },
  {
    title: "Data & Messaging",
    items: ["PostgreSQL", "MySQL", "MongoDB", "Advanced SQL", "Spring Data JPA", "Hibernate", "Apache Kafka"],
  },
  {
    title: "Cloud & DevOps",
    items: ["Azure", "AWS", "Docker", "Kubernetes", "CI/CD", "GitHub Actions", "Maven", "Git", "Vercel"],
  },
  {
    title: "AI / LLM",
    items: ["OpenAI", "Gemini", "Groq", "Ollama", "Multi-LLM Routing", "RAG Pipelines", "Prompt Engineering", "AI Code Review"],
  },
  {
    title: "Testing & Quality",
    items: ["JUnit", "Mockito", "Jest", "Integration Testing", "TDD", "Code Reviews", "Root-Cause Analysis", "Agile/Scrum"],
  },
];

export const featuredSkills = [
  { label: "Java / Spring Boot", level: "Expert", value: 94 },
  { label: "Microservices / REST / Kafka", level: "Expert", value: 90 },
  { label: "React / Next.js / TypeScript", level: "Advanced", value: 86 },
  { label: "Python / Node.js", level: "Advanced", value: 82 },
  { label: "Docker / Kubernetes / Azure / AWS", level: "Advanced", value: 80 },
  { label: "AI / LLM Integration", level: "Advanced", value: 85 },
];

export const services = [
  {
    title: "Full-Stack Product",
    subtitle: "UI → API → Data, end to end",
    description:
      "React, Next.js and Vue front-ends wired to Spring Boot, Python and Node.js services — loading, error and state edge cases handled, contracts respected, data modelled properly.",
    tools: ["React 19", "Next.js", "Vue.js", "TypeScript", "Spring Boot", "Python", "Node.js"],
  },
  {
    title: "Enterprise Systems",
    subtitle: "Banking & healthcare in production",
    description:
      "Regulated, high-availability microservices: SBP-compliant core-banking modules and an AI-enabled US healthcare platform — delivered with Kafka, Kubernetes, Docker, Azure and AWS.",
    tools: ["Microservices", "Kafka", "Kubernetes", "Docker", "Azure", "AWS", "BFF"],
  },
  {
    title: "AI / LLM Products",
    subtitle: "Multi-LLM, shipped and live",
    description:
      "Three live products with multi-provider routing across OpenAI, Gemini, Groq and offline Ollama fallbacks — plus daily, rigorous review of AI-generated code.",
    tools: ["OpenAI", "Gemini", "Groq", "Ollama", "RAG", "Prompt Engineering"],
  },
];

export const experience = [
  {
    role: "Senior Consultant – Application Development (Java Full-Stack)",
    company: "Systems Limited × Confiz (SL Americas)",
    location: "Karachi, Pakistan",
    period: "Aug 2026 – Present",
    year: "NOW",
    project: "Chatterbox — AI-Enabled US Healthcare Application",
    points: [
      "Contribute full-stack features to Chatterbox, an AI-enabled application for a US healthcare client, spanning Java/Spring Boot and Python back-end services and React, Next.js and Vite front-ends.",
      "Develop and debug UI for the AI Search and Tech AI modules, wiring components to back-end endpoints and handling loading, error and application-state edge cases for AI-driven responses.",
      "Onboarded onto an existing Backend-for-Frontend (BFF) codebase — mapped request flows, API contracts and downstream service dependencies before shipping changes.",
      "Trace defects end-to-end from browser to BFF, Spring Boot/Python services and data layer; deliver through Azure, Docker and CI/CD pipelines in Agile sprints with a distributed onshore/offshore team.",
    ],
    stack: ["Java", "Spring Boot", "Python", "React", "Next.js", "Vite", "BFF", "Azure", "Docker", "CI/CD"],
  },
  {
    role: "Senior Software Design Engineer",
    company: "TereSol Pvt. Ltd.",
    location: "Karachi, Pakistan",
    period: "Jul 2022 – Jul 2026",
    year: "2022",
    project: "Client: AL-Habib Bank — Core Banking Platform",
    points: [
      "Led a 4-member engineering team building a production core-banking platform; mentored junior engineers, reviewed code and drove architecture discussions, estimation and sprint planning.",
      "Designed and delivered REST APIs across 10+ distributed microservices using Java, Spring Boot and Quarkus, with Apache Kafka for event-driven communication and Kubernetes for orchestration.",
      "Architected and delivered 4+ Trade Finance import/export modules supporting thousands of daily cross-border transactions under State Bank of Pakistan regulations.",
      "Delivered 3 production Teller Module capabilities — outward bill clearing and credit-card fund transfers — used across nationwide bank branches.",
      "Automated transaction-reconciliation workflows, cutting daily financial-close processing from hours to minutes while improving accuracy and traceability.",
      "Owned Vue.js + XState front-end modules for complex banking state machines, and resolved production issues spanning UI state, API contracts, Kafka flows, SQL and Kubernetes.",
    ],
    stack: ["Java", "Spring Boot", "Quarkus", "JPA/Hibernate", "Kafka", "Kubernetes", "Docker", "Vue.js", "XState", "MySQL", "AWS", "JUnit", "Mockito"],
  },
  {
    role: "Web Design Intern",
    company: "Abtach Pvt. Ltd.",
    location: "Karachi, Pakistan",
    period: "Jun 2021 – Aug 2021",
    year: "2021",
    points: [
      "Built 10+ responsive HTML5/CSS3/JavaScript interfaces from Figma wireframes with cross-browser and cross-device testing.",
    ],
    stack: ["HTML5", "CSS3", "JavaScript", "Figma", "Responsive UI"],
  },
  {
    role: "C# Developer (Trainee)",
    company: "Media Monitors",
    location: "Karachi, Pakistan",
    period: "Jan 2021 – May 2021",
    year: "2021",
    points: [
      "Built 5+ ASP.NET MVC (C#) modules across controllers, data processing and reporting; optimized data-parsing routines, improving report-generation speed by an estimated 30%.",
    ],
    stack: ["C#", "ASP.NET MVC", "SQL Server"],
  },
];

export type Project = {
  title: string;
  category: string;
  image: string;
  live?: string;
  github?: string;
  summary: string;
  points: string[];
  stack: string[];
  privateProject?: boolean;
};

export const projects: Project[] = [
  {
    title: "FakeShield",
    category: "Multimodal AI Misinformation & Deepfake Detection",
    image: publicAsset("images/fakeshield-preview.png"),
    live: "https://fake-shield-all-in-one-fake-news-de.vercel.app/",
    github: "https://github.com/Rahul-AlPHA1/FakeShield-All-in-One-Fake-News-Deepfake-Detector",
    summary:
      "Re-architected a Python/Flask LSTM/CNN fake-news model (40,000+ articles, 92%+ accuracy) into a full-stack multimodal detection product.",
    points: [
      "React 19 + TypeScript client, serverless Node.js/Express API and Python analysis for voice-clone and image-deepfake detection.",
      "Multi-provider AI routing (Gemini, Groq, Ollama) unifying text, URL, image, audio and video analysis.",
      "Grew out of the Final Year Project — LSTM/CNN pipeline served through a Flask REST API.",
    ],
    stack: ["React 19", "TypeScript", "Node.js", "Express.js", "Python", "Gemini", "Groq", "Ollama", "Serverless", "Vercel"],
  },
  {
    title: "LendLedger",
    category: "Full-Stack AI Financial Ledger",
    image: publicAsset("images/lendledger-preview.png"),
    live: "https://lend-ledger-one.vercel.app/",
    github: "https://github.com/Rahul-AlPHA1/LendLedger",
    summary:
      "Java Spring Boot REST API with a typed React 19 client — digitizing personal debts and informal loans with AI-powered insights.",
    points: [
      "Spring Data JPA/Hibernate over PostgreSQL/MySQL with clean separation of API, persistence, AI and presentation layers.",
      "React 19 + TypeScript client with Tailwind CSS and Recharts dashboards for balances and payment activity.",
      "Gemini-powered payment reminders, monthly summaries and risk assessments with one-click PDF export.",
    ],
    stack: ["Java", "Spring Boot", "JPA/Hibernate", "PostgreSQL", "MySQL", "React 19", "TypeScript", "Tailwind CSS", "Gemini API", "Vercel"],
  },
  {
    title: "Zynapse",
    category: "AI Engineering Academy — Web + Windows Desktop",
    image: publicAsset("images/zynapse-preview.png"),
    live: "https://zynapse-ai-engineering-academy.vercel.app/",
    github: "https://github.com/Rahul-AlPHA1/Zynapse-AI-Engineering-Academy",
    summary:
      "React 19 + TypeScript + Express.js learning platform with multi-LLM routing and an offline local-model fallback — shipped to the web and as a native Windows app.",
    points: [
      "Multi-LLM routing across Groq, Gemini and OpenAI with provider health checks.",
      "Offline Ollama / Gemma 2B fallback that runs without any external API keys.",
      "Packaged as a native Windows installer (Electron + NSIS) alongside browser distribution, with one-click PDF export.",
    ],
    stack: ["React 19", "TypeScript", "Express.js", "Electron", "NSIS", "Groq", "Gemini", "OpenAI", "Ollama"],
  },
  {
    title: "AL-Habib Core Banking",
    category: "Enterprise Production Banking Platform",
    image: publicAsset("images/placeholder.webp"),
    summary:
      "Four years on a regulated, high-availability core-banking platform at TereSol — Trade Finance, Teller operations and automated reconciliation.",
    points: [
      "4+ Trade Finance import/export modules under SBP regulatory requirements.",
      "3 Teller capabilities used across nationwide branches.",
      "10+ microservices on Java, Spring Boot, Quarkus, Kafka and Kubernetes.",
    ],
    stack: ["Java", "Spring Boot", "Quarkus", "Kafka", "Kubernetes", "Vue.js", "XState", "MySQL"],
    privateProject: true,
  },
  {
    title: "Chatterbox",
    category: "AI-Enabled US Healthcare Application",
    image: publicAsset("images/placeholder.webp"),
    summary:
      "Current client work at Systems Limited × Confiz — AI Search and Tech AI modules on a Backend-for-Frontend architecture.",
    points: [
      "Full-stack features across Java/Spring Boot, Python, React, Next.js and Vite.",
      "BFF request flows, API contracts and downstream service mapping.",
      "Delivered through Azure, Docker and CI/CD in Agile sprints.",
    ],
    stack: ["Java", "Spring Boot", "Python", "React", "Next.js", "Azure", "Docker"],
    privateProject: true,
  },
];

export const education = {
  degree: "Bachelor of Science in Computer Science",
  short: "B.Sc. Computer Science",
  university: "Sindh Madressatul Islam University (SMIU)",
  city: "Karachi, Pakistan",
  period: "2018 – 2022",
  fyp:
    "Final Year Project: Fake News Detector — LSTM/CNN pipeline trained on 40,000+ articles (92%+ accuracy) served via a Flask REST API; later evolved into FakeShield.",
  project: {
    title: "Fake News Detector",
    label: "Final Year Project",
    summary:
      "A deep-learning system that classifies news articles as real or fabricated, trained on 40,000+ articles and served through a Flask REST API to a React front-end for real-time verification.",
    metrics: [
      { value: "40K+", label: "Articles trained on" },
      { value: "92%+", label: "Classification accuracy" },
      { value: "35%", label: "Faster training" },
    ],
    points: [
      "Built LSTM and CNN neural-network architectures for fabricated-content detection.",
      "NLP pipeline with tokenization, stop-word removal, TF-IDF and word embeddings.",
      "React.js + Flask app for real-time verification over REST APIs.",
      "Later re-architected into FakeShield — a live multimodal AI product.",
    ],
    stack: ["Python", "TensorFlow / Keras", "LSTM", "CNN", "NLP", "Flask", "React.js"],
  },
  courses: [
    "Data Structures & Algorithms",
    "Object-Oriented Programming",
    "Database Management Systems",
    "Operating Systems",
    "Computer Networks",
    "Software Engineering",
    "Machine Learning & AI",
    "Discrete Mathematics",
    "Linear Algebra",
    "Web Technologies",
  ],
};

export type Certification = {
  title: string;
  issuer: string;
  date: string;
  category: "Architecture" | "Backend" | "DSA" | "SQL";
  image: string;
  description: string;
  skills: string[];
  credentialId?: string;
  verifyUrl?: string;
  file?: string;
  featured?: boolean;
  accent: string;
};

export const certifications: Certification[] = [
  {
    title: "Senior Software Design Engineer",
    issuer: "micro1",
    date: "Apr 28, 2026",
    category: "Architecture",
    image: publicAsset("images/cert-micro1.jpg"),
    description:
      "Passed a multi-stage AI-led interview on system design and distributed architecture plus a timed hands-on coding assessment.",
    skills: ["System Design", "Distributed Architecture", "Live Coding"],
    featured: true,
    accent: "#3ddc84",
  },
  {
    title: "Spring Boot 3 Essential Training",
    issuer: "LinkedIn Learning",
    date: "Jun 16, 2026",
    category: "Backend",
    image: publicAsset("images/cert-spring-boot.png"),
    description: "Completed the 3h 3m Spring Boot 3 course covering the modern Spring ecosystem.",
    skills: ["Java", "Spring Boot", "Spring Framework"],
    credentialId: "c257ee61d09602b8e729ef055e4574c0cf918dffa29f2a4bd74b904287e08987",
    file: publicAsset("Spring_Boot_3_Certificate.pdf"),
    accent: "#0a66c2",
  },
  {
    title: "Alpha — DSA with Java",
    issuer: "Apna College",
    date: "Nov 2024 – Feb 2025",
    category: "DSA",
    image: publicAsset("images/cert-apna-college.jpg"),
    description:
      "Java fundamentals, OOP, Collections, multithreading, linked lists, stacks, queues, trees, graphs, sorting, recursion, dynamic programming and BFS/DFS.",
    skills: ["Java", "Data Structures", "Algorithms", "Dynamic Programming"],
    credentialId: "662f95d53160fb65890c09d6",
    accent: "#f39c32",
  },
  {
    title: "SQL (Intermediate)",
    issuer: "HackerRank",
    date: "Oct 9, 2023",
    category: "SQL",
    image: publicAsset("images/cert-hr-sql-intermediate.png"),
    description: "Cleared HackerRank's skill assessment for intermediate SQL.",
    skills: ["SQL", "Joins", "Aggregation", "Subqueries"],
    credentialId: "F794063AA13C",
    verifyUrl: "https://www.hackerrank.com/certificates/f794063aa13c",
    accent: "#2ec866",
  },
  {
    title: "Problem Solving (Basic)",
    issuer: "HackerRank",
    date: "Oct 9, 2023",
    category: "DSA",
    image: publicAsset("images/cert-hr-problem-solving-basic.png"),
    description: "Cleared HackerRank's skill assessment for problem solving.",
    skills: ["Algorithms", "Data Structures", "Problem Solving"],
    credentialId: "3EA2A7ED709C",
    verifyUrl: "https://www.hackerrank.com/certificates/3ea2a7ed709c",
    accent: "#2ec866",
  },
];
