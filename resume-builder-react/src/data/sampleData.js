export const initialResumeData = {
  personalInfo: {
    fullName: "",
    jobTitle: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    github: "",
    portfolio: "",
    photoUrl: "",
    summary: ""
  },
  experience: [
    {
      id: "exp-1",
      title: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: ""
    }
  ],
  education: [
    {
      id: "edu-1",
      degree: "",
      institution: "",
      location: "",
      year: "",
      grade: ""
    }
  ],
  skills: {
    technical: [],
    softSkills: [],
    tools: []
  },
  projects: [
    {
      id: "proj-1",
      name: "",
      techStack: "",
      link: "",
      description: ""
    }
  ],
  certifications: []
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
