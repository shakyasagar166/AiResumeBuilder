export const initialResumeData = {
  personalInfo: {
    fullName: "Rahul Sharma",
    jobTitle: "Full Stack Java & React Developer",
    email: "rahul.sharma@example.com",
    phone: "+91 98765 43210",
    location: "Bengaluru, Karnataka, India",
    linkedin: "linkedin.com/in/rahulsharma-dev",
    github: "github.com/rahul-codes",
    portfolio: "rahulsharma.dev",
    photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400",
    summary: "Results-driven Software Engineer with 2+ years of experience in building scalable REST APIs using Spring Boot and high-performance interactive interfaces with React.js. Passionate about microservices, clean code, and ATS-optimized engineering standards."
  },
  experience: [
    {
      id: "exp-1",
      title: "Software Engineer",
      company: "InnovateTech Solutions",
      location: "Bengaluru, India",
      startDate: "2023 - Present",
      current: true,
      description: "• Architected high-throughput REST APIs using Spring Boot and PostgreSQL, reducing query latency by 35%.\n• Developed reusable responsive UI components using React, Tailwind CSS, and Redux Toolkit.\n• Implemented JWT token-based authentication and Spring Security for 100,000+ active users.\n• Automated CI/CD deployment pipelines using Docker, GitHub Actions, and AWS EC2."
    },
    {
      id: "exp-2",
      title: "Junior Java Developer Intern",
      company: "CloudVibe Systems",
      location: "Pune, India",
      startDate: "2022",
      endDate: "2023",
      current: false,
      description: "• Built microservices endpoints with Spring MVC, Hibernate ORM, and MySQL database.\n• Integrated third-party payment gateway webhooks with 99.9% transaction reliability.\n• Collaborated in Agile Scrum sprints, resolving 40+ critical bug tickets before release."
    }
  ],
  education: [
    {
      id: "edu-1",
      degree: "B.Tech in Computer Science & Engineering",
      institution: "National Institute of Technology (NIT)",
      location: "India",
      year: "2019 - 2023",
      grade: "8.8 CGPA"
    }
  ],
  skills: {
    technical: ["Java", "Spring Boot", "React.js", "JavaScript (ES6+)", "TypeScript", "SQL / PostgreSQL", "Docker", "RESTful APIs", "Microservices", "Git & GitHub"],
    softSkills: ["Problem Solving", "Agile Collaboration", "Team Leadership", "System Design"],
    tools: ["Postman", "IntelliJ IDEA", "VS Code", "Maven", "Figma", "AWS"]
  },
  projects: [
    {
      id: "proj-1",
      name: "Enterprise Resume & Career Platform",
      techStack: "React, Spring Boot, MySQL, Tailwind CSS",
      link: "https://github.com/rahul-codes/resume-craft",
      description: "Engineered a full-stack career platform supporting 10,000+ users. Features real-time ATS scoring, PDF generation, and Razorpay subscription integration."
    },
    {
      id: "proj-2",
      name: "Real-time Chat & Collab App",
      techStack: "React, Spring WebSockets, Redis, Docker",
      link: "https://github.com/rahul-codes/chat-stream",
      description: "Developed instant messaging web application with sub-50ms latency using WebSocket STOMP protocol and Redis message pub/sub."
    }
  ],
  certifications: [
    {
      id: "cert-1",
      name: "Oracle Certified Professional: Java SE 11 Developer",
      issuer: "Oracle University",
      year: "2023"
    },
    {
      id: "cert-2",
      name: "AWS Certified Cloud Practitioner",
      issuer: "Amazon Web Services",
      year: "2024"
    }
  ]
};

export const sampleProfiles = {
  fresher: {
    personalInfo: {
      fullName: "Pooja Verma",
      jobTitle: "Computer Science Graduate | Aspiring Frontend Dev",
      email: "pooja.verma@gmail.com",
      phone: "+91 99887 76655",
      location: "New Delhi, India",
      linkedin: "linkedin.com/in/pooja-verma",
      github: "github.com/pooja-dev",
      portfolio: "poojaverma.me",
      photoUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400",
      summary: "Motivated CS fresher with solid foundation in Data Structures, React, JavaScript, and Java. Completed multiple full-stack academic projects and eager to contribute to fast-paced engineering teams."
    },
    experience: [
      {
        id: "exp-f1",
        title: "Frontend Engineering Intern",
        company: "WebCraft Agency",
        location: "Remote, India",
        startDate: "May 2023",
        endDate: "Aug 2023",
        current: false,
        description: "• Developed 12+ responsive landing page modules using React and Tailwind CSS.\n• Improved mobile page speed scores from 64 to 92 on Google Lighthouse.\n• Integrated REST APIs for user feedback and newsletter subscriptions."
      }
    ],
    education: [
      {
        id: "edu-f1",
        degree: "B.Tech in Information Technology",
        institution: "Delhi Technological University",
        location: "Delhi",
        year: "2020 - 2024",
        grade: "8.9 CGPA"
      }
    ],
    skills: {
      technical: ["React.js", "JavaScript (ES6)", "HTML5", "CSS3 / Tailwind", "Core Java", "Data Structures & Algorithms", "Git", "SQL"],
      softSkills: ["Fast Learner", "Communication", "Time Management"],
      tools: ["VS Code", "GitHub", "Chrome DevTools", "Figma"]
    },
    projects: [
      {
        id: "proj-f1",
        name: "E-Commerce Gadget Store",
        techStack: "React, Context API, Firebase",
        link: "https://gadget-store-demo.vercel.app",
        description: "Built end-to-end shopping web application with product filters, cart management, and Stripe mock checkout."
      },
      {
        id: "proj-f2",
        name: "Campus Event Manager Portal",
        techStack: "React, Node.js, MongoDB",
        link: "https://campus-events.dev",
        description: "Created event registration portal used by 1,200+ college students during annual tech fest."
      }
    ],
    certifications: [
      {
        id: "cert-f1",
        name: "Unacademy Certified Full Stack Web Development",
        issuer: "Unacademy Tech Track",
        year: "2023"
      }
    ]
  },
  experienced: initialResumeData
};
