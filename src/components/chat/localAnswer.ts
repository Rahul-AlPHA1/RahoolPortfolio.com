import {
  certifications,
  coreStrengths,
  education,
  experience,
  hiring,
  profile,
  projects,
  skillGroups,
} from "../../data/portfolioData";

// On-device fallback used when the Groq proxy isn't configured or is unreachable.
// Matches intents by keyword and answers strictly from portfolio data.

type Intent = { keys: RegExp; answer: () => string };

const list = (items: string[]) => items.map((i) => `- ${i}`).join("\n");
const live = projects.filter((p) => p.live);
const [current, teresol] = experience;

const intents: Intent[] = [
  {
    keys: /^\s*(hi+|hello|hey|salam|assalam|aoa|good (morning|afternoon|evening))(?![a-z])/i,
    answer: () =>
      `Hello! 👋 I can tell you anything about Rahool — a **Senior Full-Stack AI Software Engineer** with ${profile.years} years of experience, currently at Systems Limited × Confiz.

Try asking about his **AI work**, **projects**, **tech stack** or **availability**.`,
  },
  {
    keys: /notice|joining|\bjoin\b|start date|\bstart\b|how soon|when can|immediate|kab/i,
    answer: () =>
      `Rahool's notice period is **${hiring.noticePeriod}**, ${hiring.noticeNote}.\n\nHe's available for **${hiring.employment.toLowerCase()}**, and open to **${hiring.workMode.toLowerCase()}**. Best next step is a quick call — **${profile.email}** · ${profile.phone}.`,
  },
  {
    keys: /salary|compensation|\brates?\b|\bctc\b|\bpay\b|package|expect(ed|ation)|budget|hourly|tankhwa/i,
    answer: () =>
      `Compensation is **${hiring.salary.toLowerCase()}**. Rahool is flexible and open to both full-time and contract engagements — reach him at **${profile.email}** or ${profile.phone} to set up a call.`,
  },
  {
    keys: /full[- ]?time|contract|freelanc|part[- ]?time|permanent|employment type|c2c|b2b/i,
    answer: () =>
      `Yes — Rahool is available for **${hiring.employment.toLowerCase()}**.\n${list([
        `Work mode: ${hiring.workMode}`,
        `Notice period: ${hiring.noticePeriod} (${hiring.noticeNote.split(' — ')[0]})`,
        `Hours: ${profile.availability}`,
      ])}`,
  },
  {
    keys: /relocat|onsite|on-site|hybrid|office|remote|work mode|move to|abroad|time ?zone|overlap/i,
    answer: () =>
      `Rahool is open to **${hiring.workMode.toLowerCase()}**.\n${list([
        `Based in ${profile.location}`,
        profile.availability,
        "Already works with a distributed onshore/offshore team for a US healthcare client",
        `Notice period: ${hiring.noticePeriod} (${hiring.noticeNote.split(' — ')[0]})`,
      ])}`,
  },
  {
    keys: /visa|sponsor|work permit|citizenship|passport/i,
    answer: () =>
      `Visa and work-authorization details aren't listed on the portfolio. Rahool is open to relocation, so the best way to cover this is a quick call — **${profile.email}** · ${profile.phone}.`,
  },
  {
    keys: /why (is he |are you )?(leav|chang|look|switch|mov)|reason for (leav|chang)|job change|switch(ing)? job/i,
    answer: () =>
      "That's something Rahool prefers to discuss directly on a call. What the portfolio shows: after four years on AL-Habib Bank's core-banking platform he moved to AI-enabled US healthcare work at Systems Limited × Confiz, and he's looking for senior full-stack / AI roles where he can own features end to end.",
  },
  {
    keys: /english|communicat|us clients?|international|stakeholder|client[- ]facing|onshore|offshore|distributed team/i,
    answer: () =>
      "Rahool currently works for a **US healthcare client** (Chatterbox) at Systems Limited × Confiz, collaborating in Agile sprints with a **distributed onshore/offshore team**. He has also led a 4-member team — mentoring, code reviews, estimation and sprint planning — so he's used to communicating with both engineers and stakeholders.",
  },
  {
    keys: /achiev|proud|impact|accomplish|biggest|best work|highlight/i,
    answer: () =>
      `Some highlights:\n${list([
        "Automated bank transaction reconciliation — daily financial close went from **hours to minutes**",
        "Delivered REST APIs across **10+ microservices** with Kafka and Kubernetes",
        "**4+ Trade Finance modules** under State Bank of Pakistan regulations; **3 Teller capabilities** live nationwide",
        `Built and launched **3 live multi-LLM products**: ${live.map((p) => p.title).join(", ")}`,
        "micro1-certified Senior Software Design Engineer",
      ])}`,
  },
  {
    keys: /system design|architect|distributed|scalab|high[- ]availab|design pattern/i,
    answer: () =>
      `System design is a core strength:\n${list([
        "**micro1-certified Senior Software Design Engineer** — passed an AI-led interview on system design & distributed architecture",
        "Designed REST APIs across **10+ distributed microservices** (Spring Boot, Quarkus) with **Kafka** event-driven communication and **Kubernetes**",
        "Regulated, high-availability core-banking platform; Backend-for-Frontend (BFF) architecture on a US healthcare product",
      ])}`,
  },
  {
    keys: /\btest(ing|s)?\b|junit|mockito|jest|tdd|quality|code review|debug/i,
    answer: () =>
      "Testing & quality: **JUnit, Mockito, Jest**, integration testing and **TDD**, plus regular code reviews and root-cause analysis. Rahool is strong at systematic debugging — tracing issues across browser, front-end state, BFF, services, Kafka, databases and Kubernetes — and he rigorously reviews AI-generated code before it ships.",
  },
  {
    keys: /\b(contact|email|reach|phone|call|whatsapp|linkedin|interview|schedule|cv|resume)\b/i,
    answer: () =>
      `You can reach Rahool here:\n${list([
        `Email: **${profile.email}**`,
        `Phone: ${profile.phone}`,
        `LinkedIn: ${profile.linkedin}`,
        `GitHub: ${profile.github}`,
      ])}\nHis résumé PDF can be downloaded from the top of this page.`,
  },
  {
    keys: /availab|location|based in|where (is he|does he live)|open to|hours/i,
    answer: () =>
      `Rahool is based in **${profile.location}** and is open to **${hiring.workMode.toLowerCase()}**. ${profile.availability} Notice period: ${hiring.noticePeriod} (${hiring.noticeNote.split(' — ')[0]}). Available for ${hiring.employment.toLowerCase()}.`,
  },
  {
    keys: /\b(ai|llm|gpt|openai|gemini|groq|ollama|rag|ml|genai|agents?)\b|prompt|machine learning|artificial/i,
    answer: () =>
      `AI is core to how Rahool builds:\n${list([
        "Ships LLM-powered features with multi-provider routing (OpenAI, Gemini, Groq) and offline Ollama fallbacks",
        "RAG pipelines and prompt engineering",
        `3 live multi-LLM products: ${live.map((p) => p.title).join(", ")}`,
        "Builds the AI Search & Tech AI modules of Chatterbox (US healthcare) at Systems Limited × Confiz",
        "Uses Claude Code & Cline daily — and rigorously reviews AI-generated code",
      ])}`,
  },
  {
    keys: /\b(project|portfolio|built|fakeshield|lendledger|zynapse|product|side)/i,
    answer: () =>
      `Rahool's live products:\n${list(
        live.map((p) => `**${p.title}** — ${p.category}. ${p.summary}`)
      )}\nAll three are live with source on GitHub.`,
  },
  {
    keys: /\b(bank|fintech|core banking|al-?habib|teresol|trade finance|teller|reconcil|kafka|microservice)/i,
    answer: () =>
      `At **${teresol.company}** (${teresol.period}) Rahool worked on AL-Habib Bank's core-banking platform:\n${list(
        teresol.points.slice(0, 5)
      )}`,
  },
  {
    keys: /\b(health|chatterbox|confiz|systems limited|current|now|present|bff)/i,
    answer: () =>
      `Currently **${current.role}** at **${current.company}** (${current.period}) on ${current.project}:\n${list(
        current.points
      )}`,
  },
  {
    keys: /\b(educat|degree|universit|smiu|study|college|graduat|fyp|final year)/i,
    answer: () =>
      `**${education.degree}** — ${education.university}, ${education.period}.\n${education.fyp}`,
  },
  {
    keys: /\b(certif|credential|micro1|hackerrank|linkedin learning|apna|course)/i,
    answer: () =>
      `Rahool's certifications:\n${list(certifications.map((c) => `**${c.title}** — ${c.issuer} (${c.date})`))}`,
  },
  {
    keys: /\b(skill|stack|tech|language|java|spring|react|next|python|node|typescript|docker|kubernetes|azure|aws|database|sql)/i,
    answer: () =>
      `Rahool's stack:\n${list(skillGroups.map((g) => `**${g.title}:** ${g.items.join(", ")}`))}`,
  },
  {
    keys: /\b(lead|team|mentor|manage|senior)/i,
    answer: () =>
      `Rahool led a **4-member engineering team** at TereSol — mentoring juniors, reviewing code, and driving architecture discussions, estimation and sprint planning on a regulated core-banking platform.`,
  },
  {
    keys: /\b(why|hire|strength|good fit|stand out|best|unique|value)/i,
    answer: () =>
      `Why Rahool stands out:\n${list([
        `${profile.years} years shipping complete production systems — banking and US healthcare`,
        ...coreStrengths.slice(0, 3).map((s) => `**${s.title}** — ${s.description.split(" — ")[0].split(". ")[0]}`),
        "3 live multi-LLM products built independently",
        "micro1-certified Senior Software Design Engineer",
      ])}`,
  },
  {
    keys: /\b(experience|years|background|summary|about|who|introduce|tell me)/i,
    answer: () => profile.overview.slice(0, 2).join("\n\n"),
  },
];

export const localAnswer = (question: string) => {
  const hit = intents.find((i) => i.keys.test(question));
  if (hit) return hit.answer();
  return `${profile.heroSummary}\n\nYou can ask about his **AI experience**, **projects**, **tech stack**, **experience**, **education** or **how to contact** him.`;
};
