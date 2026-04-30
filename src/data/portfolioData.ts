const publicAsset = (path: string) =>
  `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;

export const profile = {
  name: "Rahool Gir",
  firstName: "Rahool",
  lastName: "Gir",
  title: "Senior Software Engineer",
  tagline: "Java . Microservices . Full-Stack . Fintech & Core Banking",
  location: "Karachi, Pakistan",
  phone: "+92 308 9567074",
  email: "rahool.goswami16@gmail.com",
  github: "https://github.com/Rahul-AlPHA1",
  linkedin: "https://www.linkedin.com/in/rahool-g-4b055a126/",
  resume: publicAsset("Rahool_Gir_Updated_Resume.pdf"),
  availability:
    "Available for onsite and remote opportunities. Notice period negotiable. Open to relocation.",
  summary:
    "Software Engineer with 3 years 8 months of production experience building enterprise Core Banking and Fintech systems at TereSol Pvt. Ltd. Specialized in microservices, REST APIs, and full-stack engineering using Java, Quarkus, Spring Boot, Node.js, and Vue.js. Contributed to AL-Habib Bank's Core Banking System by building Trade Finance modules, automated transaction reconciliation, and Teller features processing thousands of daily transactions. Proficient with Docker, AWS, and SQL/NoSQL databases. Actively building AI-integrated side projects and expanding expertise in React.js, MongoDB, and modern AI development workflows.",
};

export const heroStats = [
  { value: "3y 8m", label: "Production Experience" },
  { value: "92%+", label: "ML Accuracy" },
  { value: "2", label: "Live AI Products" },
  { value: "35%", label: "Training Speed Boost" },
];

export const skillGroups = [
  {
    title: "Backend",
    items: [
      "Java",
      "Spring Boot",
      "Spring MVC",
      "Spring Security",
      "Quarkus",
      "Node.js",
      "REST API",
      "Microservices",
      "Maven",
    ],
  },
  {
    title: "Frontend",
    items: [
      "Vue.js",
      "React.js",
      "XState",
      "TypeScript",
      "JavaScript ES6+",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "Bootstrap",
    ],
  },
  {
    title: "Database",
    items: ["MySQL", "PostgreSQL", "MongoDB", "SQL Advanced", "SQL Server"],
  },
  {
    title: "Cloud & DevOps",
    items: ["AWS EC2", "AWS S3", "AWS RDS", "AWS Lambda", "Docker", "Git", "GitHub", "CI/CD basics"],
  },
  {
    title: "AI Tools",
    items: ["Claude Code", "Gemini CLI", "Cursor", "Antigravity", "Google Gemini API", "Groq API"],
  },
  {
    title: "Domain",
    items: [
      "Core Banking",
      "Trade Finance",
      "Transaction Processing",
      "Financial Workflows",
      "SBP Regulatory Compliance",
    ],
  },
];

export const services = [
  {
    title: "Banking Systems",
    subtitle: "Enterprise production engineering",
    description:
      "Trade Finance, Teller workflows, transaction reconciliation, and SBP-compliant financial modules for AL-Habib Core Banking System.",
    tools: ["Core Banking", "Trade Finance", "SBP Compliance", "MySQL", "Docker"],
  },
  {
    title: "Full-Stack Delivery",
    subtitle: "APIs, UI, databases, deployment",
    description:
      "RESTful Java microservices, Vue.js state machines, React products, dashboards, PDF exports, and database-backed workflows.",
    tools: ["Java", "Spring Boot", "Quarkus", "Vue.js", "React", "TypeScript", "PostgreSQL"],
  },
  {
    title: "AI Product Builds",
    subtitle: "Practical AI workflows",
    description:
      "Gemini and Groq integrated applications for financial reminders, fake-content detection, multimodal analysis, and model-backed decisions.",
    tools: ["Gemini API", "Groq API", "TensorFlow", "Python", "Node.js"],
  },
];

export const experience = [
  {
    role: "Senior Software Design Engineer",
    company: "TereSol PVT. LTD.",
    location: "Karachi, Pakistan",
    period: "Jul 2022 - Present",
    year: "NOW",
    project: "AL-Habib Core Banking System - Enterprise Production Banking Platform",
    points: [
      "Engineered Trade Finance Import/Export modules for AL-Habib Bank's CBS, handling high-volume cross-border transactions in full compliance with SBP regulatory standards.",
      "Built Teller Module features including outward bill clearing and credit card fund transfer workflows, improving transaction reliability for daily bank operations.",
      "Automated transaction reconciliation pipelines, eliminating manual intervention in daily financial close and significantly increasing data accuracy.",
      "Architected and consumed RESTful APIs using Java, Quarkus, and Spring Boot in a distributed microservices architecture.",
      "Built Vue.js frontend modules with XState for complex state management and collaborated full-stack across Agile sprint cycles.",
    ],
    stack: ["Java", "Spring Boot", "Quarkus", "Node.js", "Vue.js", "XState", "REST API", "Microservices", "MySQL", "Docker", "AWS"],
  },
  {
    role: "C# Developer - Trainee",
    company: "Media Monitors",
    location: "Karachi, Pakistan",
    period: "Jan 2021 - May 2021",
    year: "2021",
    points: [
      "Built web application modules using C# and ASP.NET MVC.",
      "Enhanced data parsing routines for media content pipelines, improving report generation accuracy.",
    ],
    stack: ["C#", "ASP.NET MVC", "SQL Server", "HTML", "CSS", "JavaScript"],
  },
  {
    role: "Web Design Intern",
    company: "Abtach PVT. LTD.",
    location: "Karachi, Pakistan",
    period: "Jun 2021 - Aug 2021",
    year: "2021",
    points: [
      "Developed responsive web interfaces using HTML5, CSS3, and JavaScript.",
      "Translated wireframes into pixel-perfect, cross-device user interfaces.",
    ],
    stack: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
  },
];

export const projects = [
  {
    title: "LendLedger",
    category: "AI-Powered Financial Ledger",
    image: publicAsset("images/lendledger-preview.png"),
    live: "https://lend-ledger-one.vercel.app/",
    github: "https://github.com/Rahul-AlPHA1/LendLedger",
    summary:
      "AI-powered full-stack financial ledger for tracking personal debts and informal loans, digitizing Hisaab Kitab with enterprise-grade architecture.",
    points: [
      "React 19 + TypeScript frontend with premium glassmorphism UI, dark/light mode, and Framer Motion animations.",
      "Google Gemini AI generates WhatsApp payment reminders, monthly financial summaries, and per-contact risk assessments.",
      "Interactive Recharts dashboards and one-click PDF statement export via jsPDF.",
      "Spring Data JPA + Hibernate ORM over PostgreSQL/MySQL backend; deployed frontend on Vercel.",
    ],
    stack: ["React 19", "TypeScript", "Tailwind CSS v4", "Framer Motion", "Gemini API", "Java", "Spring Boot", "PostgreSQL", "Vite", "Vercel"],
  },
  {
    title: "FakeShield",
    category: "AI Fake Content Detection Platform",
    image: publicAsset("images/fakeshield-preview.png"),
    live: "https://fake-shield-all-in-one-fake-news-de.vercel.app/",
    github: "https://github.com/Rahul-AlPHA1/FakeShield-All-in-One-Fake-News-Deepfake-Detector",
    summary:
      "Enterprise-grade multimodal AI misinformation detection platform evolved from a Final Year Project LSTM/CNN system into a full production app.",
    points: [
      "Unified Gemini pipeline analyzes text articles, live URLs via Cheerio, video frames, audio spectrograms, and images.",
      "Voice clone detection uses spectral analysis and prosody inconsistency checks.",
      "Image deepfake detection identifies GAN artifacts and anatomical impossibilities.",
      "Multi-provider routing across Google Gemini, Groq, and Ollama for redundancy and speed.",
    ],
    stack: ["React 19", "TypeScript", "Node.js", "Express.js", "Gemini AI", "Groq", "Python", "Tailwind CSS", "Framer Motion", "Vite", "Vercel Serverless"],
  },
  {
    title: "AL-Habib Core Banking System",
    category: "Enterprise Production Banking Platform",
    image: publicAsset("images/placeholder.webp"),
    summary:
      "Production banking platform work at TereSol spanning Trade Finance, Teller Operations, reconciliation, and regulatory financial workflows.",
    points: [
      "Trade Finance Import/Export modules for regulated cross-border transactions.",
      "Outward bill clearing and credit card fund transfer workflows.",
      "Automated reconciliation pipelines for daily financial close.",
      "Distributed microservices architecture with Java, Quarkus, Spring Boot, Vue.js, MySQL, Docker, and AWS.",
    ],
    stack: ["Java", "Spring Boot", "Quarkus", "Vue.js", "XState", "MySQL", "Docker", "AWS"],
    privateProject: true,
  },
  {
    title: "Fake News Detector - FYP",
    category: "Deep Learning & NLP System",
    image: publicAsset("images/fakeshield-preview.png"),
    summary:
      "Final Year Project trained on 40,000+ news articles, achieving 92%+ classification accuracy and later evolving into FakeShield.",
    points: [
      "Built LSTM and CNN neural network architectures for fabricated-content detection.",
      "Engineered NLP pipeline with TF-IDF, tokenization, stop-word removal, and word embeddings.",
      "Developed React.js + Flask app for real-time news verification through REST APIs.",
      "Reduced training time by 35% through pipeline and model iteration improvements.",
    ],
    stack: ["Python", "TensorFlow/Keras", "LSTM", "CNN", "NLP", "Flask", "React.js", "MySQL"],
  },
];

export const education = {
  degree: "B.Sc. in Computer Science",
  university: "Sindh Madressetul Islam University (SMIU), Karachi",
  period: "2018 - 2022",
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

export const certifications = [
  {
    title: "Java & Data Structures and Algorithms (DSA)",
    issuer: "Apna College",
    period: "Nov 2024 - Feb 2025",
    image: publicAsset("images/cert-apna-college.jpg"),
    topics:
      "Java Fundamentals, OOP, Collections Framework, Exception Handling, Multithreading, LinkedList, Stack, Queue, Trees, Graphs, Sorting, Binary Search, Recursion, Dynamic Programming, BFS/DFS.",
  },
  {
    title: "Problem Solving (Intermediate)",
    issuer: "HackerRank",
    period: "Jan 2024",
    image: publicAsset("images/cert-problem-solving.png"),
  },
  {
    title: "SQL (Advanced)",
    issuer: "HackerRank",
    period: "Apr 2024",
    image: publicAsset("images/cert-sql-advanced.png"),
  },
];
