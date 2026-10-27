/**
 * Enterprise Job Profile & Resume Matcher Engine
 * Accurately computes ATS match percentage, skill overlaps, and tailoring suggestions.
 */
import { SKILL_DEFINITIONS } from "./atsScorer";

export const PRESET_JOB_PROFILES = [
  {
    id: "java-fullstack",
    title: "Full Stack Java Developer",
    badge: "Most Popular",
    company: "Top MNC / Product Org",
    description: `Position: Full Stack Java Developer (0-3 Years Experience)
Location: Remote / Hybrid / Noida / Bengaluru

Job Summary:
We are looking for a passionate Full Stack Java Developer to design, develop, and maintain high-performance, scalable web applications. You will work on cutting-edge microservices architectures and modern frontend frameworks.

Key Responsibilities:
• Design and build robust RESTful APIs and microservices using Java, Spring Boot, and Hibernate.
• Develop responsive, user-friendly frontend interfaces using React, JavaScript, HTML5, and CSS3 / Tailwind CSS.
• Design, optimize, and maintain relational databases using MySQL or PostgreSQL.
• Implement caching strategies using Redis and message queues using Apache Kafka.
• Write clean, testable code with comprehensive unit tests using JUnit and Mockito.
• Collaborate with cross-functional agile teams using Git, Docker, and CI/CD pipelines.

Requirements & Qualifications:
• B.Tech / B.E. / BCA / MCA in Computer Science, Information Technology, or related discipline.
• Strong foundation in Data Structures, Algorithms, Object-Oriented Programming (OOP), and SQL.
• Hands-on experience with Java (8/11/17/21), Spring Boot, Spring MVC, and Hibernate ORM.
• Proficiency with React, JavaScript (ES6+), and REST APIs.
• Familiarity with Docker, Git, GitHub, Maven, Postman, and Linux environments.
• Excellent analytical and problem-solving skills.`
  },
  {
    id: "react-frontend",
    title: "Frontend React Developer",
    badge: "High Demand",
    company: "FinTech & SaaS Startups",
    description: `Position: Frontend React Engineer (0-3 Years Experience)
Location: Delhi NCR / Bengaluru / Pune / Remote

Job Summary:
Seeking a talented Frontend Developer who loves crafting sleek, responsive, and accessible user experiences with React and modern CSS.

Key Responsibilities:
• Build modular, performant single-page applications (SPAs) using React, Next.js, and TypeScript/JavaScript.
• Translate Figma designs into pixel-perfect responsive web pages using Tailwind CSS and modern CSS3.
• Integrate with backend RESTful APIs and handle asynchronous data fetching with React Query or Redux.
• Optimize Core Web Vitals, page load speed, and SEO best practices.
• Conduct code reviews and write unit tests using Jest and React Testing Library.

Requirements & Qualifications:
• Strong command of JavaScript, TypeScript, HTML5, CSS3, and Tailwind CSS.
• In-depth knowledge of React hooks, state management (Redux, Context API, Zustand).
• Experience with Git, GitHub, Vite, Webpack, Postman, and Chrome DevTools.
• Familiarity with responsive design, cross-browser compatibility, and web accessibility (a11y).`
  },
  {
    id: "python-data",
    title: "Python & Data / Backend Engineer",
    badge: "AI/ML Focus",
    company: "AI & Analytics Labs",
    description: `Position: Python Backend & Data Engineer (0-3 Years Experience)
Location: Hyderabad / Gurugram / Remote

Job Summary:
Looking for a Python Developer to develop high-throughput backend services, data processing pipelines, and AI/LLM integrations.

Key Responsibilities:
• Build fast, scalable asynchronous REST APIs using Python, FastAPI, and Django.
• Process, clean, and analyze large datasets using Pandas, NumPy, and SQL.
• Work with relational (PostgreSQL, MySQL) and NoSQL (MongoDB, Redis) databases.
• Integrate third-party AI APIs (OpenAI, Groq, Anthropic) and vector databases.
• Deploy services via Docker containers on AWS or Google Cloud.

Requirements & Qualifications:
• B.Tech / B.E. in CS/IT, Math, or Data Science.
• Proficiency in Python 3.x, OOP, SQL, and database indexing.
• Experience with FastAPI, Django, or Flask.
• Understanding of Git, Docker, Linux, and REST APIs.`
  },
  {
    id: "mern-stack",
    title: "MERN Stack Developer",
    badge: "Fast Growing",
    company: "Tech Startups & Agencies",
    description: `Position: Full Stack MERN Developer (0-2 Years Experience)
Location: Noida / Bengaluru / Remote

Job Summary:
We are seeking an energetic MERN Stack developer to build scalable web applications from scratch.

Key Responsibilities:
• Build backend APIs and server logic with Node.js and Express.js.
• Design and manage NoSQL schemas with MongoDB and Mongoose.
• Develop responsive, reactive user interfaces with React and Tailwind CSS.
• Implement secure authentication with JWT and bcrypt.
• Test and debug APIs using Postman and Jest.

Requirements:
• Solid understanding of JavaScript (ES6+), Node.js, Express, React, and MongoDB.
• Familiarity with REST APIs, Git, GitHub, and cloud deployments (Vercel, Render).`
  },
  {
    id: "devops-cloud",
    title: "DevOps & Cloud Engineer",
    badge: "Enterprise",
    company: "Global Cloud Services",
    description: `Position: Junior DevOps / Cloud Associate (0-3 Years)
Location: Hybrid / Remote

Job Summary:
Join our infrastructure engineering team to automate deployments, manage CI/CD pipelines, and monitor cloud workloads.

Key Responsibilities:
• Containerize microservices using Docker and orchestrate with Kubernetes.
• Build automated CI/CD pipelines using GitHub Actions, Jenkins, or GitLab CI.
• Manage cloud infrastructure on AWS (EC2, S3, RDS, ECS) or Azure.
• Automate system tasks using Bash/Shell scripting and Linux administration.
• Monitor application health and uptime with Prometheus, Grafana, and ELK stack.

Requirements:
• Strong foundation in Linux operating system and Shell scripting.
• Hands-on experience with Docker, Git, and basic AWS services.
• Knowledge of networking concepts (DNS, TCP/IP, HTTP/HTTPS, SSL/TLS).`
  }
];

/**
 * Convert structured resume builder object into clean text for matching
 */
export function convertResumeDataToText(data) {
  if (!data) return "";
  const parts = [];

  // Header / Personal
  if (data.personalInfo) {
    const p = data.personalInfo;
    parts.push(`${p.fullName || ""} | ${p.jobTitle || ""}`);
    parts.push(`${p.email || ""} | ${p.phone || ""} | ${p.location || ""}`);
    if (p.linkedin) parts.push(`LinkedIn: ${p.linkedin}`);
    if (p.github) parts.push(`GitHub: ${p.github}`);
    if (p.portfolio) parts.push(`Portfolio: ${p.portfolio}`);
    if (p.summary) parts.push(`\nSUMMARY:\n${p.summary}`);
  }

  // Skills
  if (data.skills && Array.isArray(data.skills) && data.skills.length > 0) {
    parts.push(`\nTECHNICAL SKILLS:\n${data.skills.join(", ")}`);
  }

  // Experience
  if (data.experience && Array.isArray(data.experience) && data.experience.length > 0) {
    parts.push("\nEXPERIENCE / INTERNSHIPS:");
    data.experience.forEach((exp) => {
      parts.push(`${exp.position || ""} at ${exp.company || ""} (${exp.startDate || ""} - ${exp.endDate || ""})`);
      if (exp.description) parts.push(exp.description);
    });
  }

  // Projects
  if (data.projects && Array.isArray(data.projects) && data.projects.length > 0) {
    parts.push("\nPROJECTS:");
    data.projects.forEach((proj) => {
      parts.push(`${proj.title || ""} (${proj.technologies || ""})`);
      if (proj.description) parts.push(proj.description);
      if (proj.liveUrl) parts.push(`Live: ${proj.liveUrl}`);
      if (proj.githubUrl) parts.push(`GitHub: ${proj.githubUrl}`);
    });
  }

  // Education
  if (data.education && Array.isArray(data.education) && data.education.length > 0) {
    parts.push("\nEDUCATION:");
    data.education.forEach((edu) => {
      parts.push(`${edu.degree || ""} in ${edu.field || ""} from ${edu.institution || ""} (${edu.startDate || ""} - ${edu.endDate || ""}) - Score: ${edu.score || ""}`);
    });
  }

  // Certifications
  if (data.certifications && Array.isArray(data.certifications) && data.certifications.length > 0) {
    parts.push("\nCERTIFICATIONS & ACHIEVEMENTS:");
    data.certifications.forEach((c) => {
      parts.push(`${c.title || ""} - ${c.issuer || ""} (${c.date || ""})`);
    });
  }

  return parts.join("\n");
}

/**
 * Deep Profile Matcher Algorithm
 * Analyzes resumeText against jobDescriptionText
 */
export function matchResumeWithJobProfile(resumeText = "", jobDescriptionText = "") {
  const resume = (resumeText || "").trim();
  const jd = (jobDescriptionText || "").trim();

  if (!resume || resume.length < 30) {
    return {
      isValid: false,
      error: "Please provide a valid resume (at least 30 characters)."
    };
  }

  if (!jd || jd.length < 30) {
    return {
      isValid: false,
      error: "Please provide a job description or select a target job profile."
    };
  }

  const resumeLower = resume.toLowerCase();
  const jdLower = jd.toLowerCase();

  // 1. Skill Extraction
  const jdRequiredSkills = [];
  const candidateMatchedSkills = [];
  const candidateMissingSkills = [];
  const extraResumeSkills = [];

  SKILL_DEFINITIONS.forEach((def) => {
    const inJd = def.regex.test(jdLower);
    const inResume = def.regex.test(resumeLower);

    if (inJd) {
      jdRequiredSkills.push(def.name);
      if (inResume) {
        candidateMatchedSkills.push(def.name);
      } else {
        candidateMissingSkills.push(def.name);
      }
    } else if (inResume) {
      extraResumeSkills.push(def.name);
    }
  });

  // Fallback keyword scanning if JD is unconventional
  const genericTechKeywords = [
    "rest api", "microservices", "oop", "data structures", "algorithms",
    "git", "github", "docker", "unit testing", "agile", "scrum", "ci/cd",
    "system design", "database design", "debugging", "problem solving"
  ];

  genericTechKeywords.forEach((kw) => {
    if (jdLower.includes(kw)) {
      const formatted = kw.toUpperCase();
      if (!jdRequiredSkills.includes(formatted)) {
        jdRequiredSkills.push(formatted);
        if (resumeLower.includes(kw)) {
          if (!candidateMatchedSkills.includes(formatted)) candidateMatchedSkills.push(formatted);
        } else {
          if (!candidateMissingSkills.includes(formatted)) candidateMissingSkills.push(formatted);
        }
      }
    }
  });

  // 2. Category Match Computations
  // A. Technical Skills Match
  let technicalMatchRate = 100;
  if (jdRequiredSkills.length > 0) {
    technicalMatchRate = Math.round((candidateMatchedSkills.length / jdRequiredSkills.length) * 100);
  } else {
    technicalMatchRate = candidateMatchedSkills.length > 0 ? 85 : 60;
  }

  // B. Education & Domain Match
  const educationDegrees = [
    { name: "B.Tech", regex: /\b(?:B\.?Tech|Bachelor of Technology)\b/i },
    { name: "B.E.", regex: /\b(?:B\.?E\.?|Bachelor of Engineering)\b/i },
    { name: "BCA", regex: /\bBCA\b/i },
    { name: "MCA", regex: /\bMCA\b/i },
    { name: "Computer Science", regex: /\b(?:Computer Science|CSE|IT|Information Technology)\b/i },
    { name: "Bachelor", regex: /\bBachelor(?:'s)?\b/i },
    { name: "Master", regex: /\bMaster(?:'s)?\b/i }
  ];

  let educationMatchRate = 85;
  let jdRequiresDegree = false;
  let candidateHasDegree = false;

  educationDegrees.forEach((deg) => {
    if (deg.regex.test(jdLower)) jdRequiresDegree = true;
    if (deg.regex.test(resumeLower)) candidateHasDegree = true;
  });

  if (jdRequiresDegree) {
    educationMatchRate = candidateHasDegree ? 100 : 50;
  } else {
    educationMatchRate = candidateHasDegree ? 100 : 80;
  }

  // C. Experience & Seniority Match
  let experienceMatchRate = 85;
  const expMatch = jdLower.match(/(\d+)\s*(?:-\s*(\d+))?\s*(?:\+|plus)?\s*years?/i);
  const candidateExpWords = (resumeLower.match(/experience|internship|project/g) || []).length;

  if (expMatch) {
    const minYears = parseInt(expMatch[1], 10);
    if (minYears <= 2) {
      // Fresher / Junior role
      experienceMatchRate = candidateExpWords >= 3 ? 95 : 75;
    } else {
      // Mid / Senior role
      experienceMatchRate = candidateExpWords >= 8 ? 90 : (candidateExpWords >= 4 ? 70 : 50);
    }
  } else {
    experienceMatchRate = candidateExpWords >= 4 ? 90 : 75;
  }

  // D. Action Verbs & Project Delivery Match
  const actionVerbs = ["developed", "engineered", "built", "implemented", "optimized", "architected", "deployed", "designed"];
  const detectedVerbs = actionVerbs.filter(v => resumeLower.includes(v));
  const impactMatchRate = Math.min(100, Math.round((detectedVerbs.length / 5) * 100));

  // 3. Composite Weighted ATS Match Score
  // Weights: Technical Skills (50%), Tools/Impact (20%), Experience (15%), Education (15%)
  const overallScoreRaw = Math.round(
    (technicalMatchRate * 0.50) +
    (impactMatchRate * 0.20) +
    (experienceMatchRate * 0.15) +
    (educationMatchRate * 0.15)
  );
  const matchScore = Math.min(99, Math.max(25, overallScoreRaw));

  // 4. Grade & Verdict
  let grade = "B";
  let verdict = "Moderate Match";
  let statusColor = "amber";
  let summary = "";

  if (matchScore >= 85) {
    grade = "A+";
    verdict = "Top Candidate Match (High Shortlist Probability)";
    statusColor = "emerald";
    summary = "Your resume strongly aligns with this job description! You possess the primary core technologies and keywords required by the employer.";
  } else if (matchScore >= 70) {
    grade = "A";
    verdict = "Good Match (ATS Screening Pass Ready)";
    statusColor = "blue";
    summary = "Solid qualification match. Adding just a few missing keywords and project bullet points will boost you into the top 5% candidate tier.";
  } else if (matchScore >= 55) {
    grade = "B";
    verdict = "Moderate Match (Tailoring Recommended)";
    statusColor = "amber";
    summary = "You meet foundational criteria, but the job description specifically looks for key tools and frameworks that are missing in your resume.";
  } else {
    grade = "C";
    verdict = "Low Skill Overlap (Significant Gap)";
    statusColor = "rose";
    summary = "Significant gap detected between this role's mandatory technical stack and your current resume content.";
  }

  // 5. Tailoring Action Items
  const tailoringTips = [];
  if (candidateMissingSkills.length > 0) {
    tailoringTips.push(
      `Add top missing skills to your Technical Skills or Projects: ${candidateMissingSkills.slice(0, 5).join(", ")}.`
    );
  }
  if (!candidateHasDegree) {
    tailoringTips.push("Ensure your degree (e.g. B.Tech, BCA, MCA) is clearly written under Education.");
  }
  if (detectedVerbs.length < 3) {
    tailoringTips.push("Use strong action verbs (Engineered, Architected, Optimized) in your project bullet points.");
  }
  if (candidateMatchedSkills.length >= 4) {
    tailoringTips.push(`Emphasize your matched strengths in your summary: ${candidateMatchedSkills.slice(0, 4).join(", ")}.`);
  }

  return {
    isValid: true,
    matchScore,
    grade,
    verdict,
    statusColor,
    summary,
    categoryScores: {
      technical: technicalMatchRate,
      toolsAndImpact: impactMatchRate,
      experience: experienceMatchRate,
      education: educationMatchRate
    },
    skills: {
      matched: candidateMatchedSkills,
      missing: candidateMissingSkills,
      extra: extraResumeSkills.slice(0, 10),
      totalRequired: jdRequiredSkills.length
    },
    tailoringTips,
    resumeStats: {
      wordCount: resume.split(/\s+/).filter(Boolean).length,
      detectedSkillsCount: candidateMatchedSkills.length + extraResumeSkills.length
    },
    jdStats: {
      wordCount: jd.split(/\s+/).filter(Boolean).length,
      requiredSkillsCount: jdRequiredSkills.length
    }
  };
}
