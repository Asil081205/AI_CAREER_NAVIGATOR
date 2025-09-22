// Global variables
let parsedResumeData = {};
let userSkills = [];
let allJobs = [];
let currentUser = null;

// Enhanced Skills Database
const enhancedSkillsDatabase = {
  ai: {
    critical: [
      "Python",
      "Machine Learning",
      "Deep Learning",
      "TensorFlow",
      "PyTorch",
    ],
    high: ["NumPy", "Pandas", "Scikit-learn", "Computer Vision", "NLP"],
    medium: ["Keras", "OpenCV", "Matplotlib", "Statistics", "Linear Algebra"],
    projects: [
      "Image Classification System",
      "Chatbot Development",
      "Recommendation Engine",
      "Sentiment Analysis Tool",
    ],
  },
  dataScience: {
    critical: [
      "Python",
      "SQL",
      "Statistics",
      "Data Analysis",
      "Data Visualization",
    ],
    high: ["Pandas", "NumPy", "Tableau", "Power BI", "R"],
    medium: [
      "Matplotlib",
      "Seaborn",
      "Excel",
      "Statistical Modeling",
      "A/B Testing",
    ],
    projects: [
      "Sales Dashboard",
      "Customer Segmentation",
      "Predictive Analytics Model",
      "Market Research Analysis",
    ],
  },
  computerScience: {
    critical: ["JavaScript", "Python", "Git", "Data Structures", "Algorithms"],
    high: ["React", "Node.js", "Databases", "System Design", "Testing"],
    medium: ["TypeScript", "REST APIs", "Docker", "Cloud Platforms", "Agile"],
    projects: [
      "E-commerce Platform",
      "Social Media App",
      "Task Management System",
      "Portfolio Website",
    ],
  },
  cyberSecurity: {
    critical: [
      "Network Security",
      "Cybersecurity Fundamentals",
      "Linux",
      "Python",
      "Ethical Hacking",
    ],
    high: [
      "Penetration Testing",
      "Risk Assessment",
      "CISSP",
      "CEH",
      "Security Auditing",
    ],
    medium: [
      "Wireshark",
      "Metasploit",
      "Nmap",
      "Cryptography",
      "Incident Response",
    ],
    projects: [
      "Security Audit Report",
      "Penetration Testing Lab",
      "Network Monitoring System",
      "Vulnerability Assessment",
    ],
  },
  webDevelopment: {
    critical: ["HTML", "CSS", "JavaScript", "Responsive Design", "Git"],
    high: ["React", "Node.js", "MongoDB", "Express.js", "REST APIs"],
    medium: [
      "TypeScript",
      "Webpack",
      "SASS",
      "Testing",
      "Performance Optimization",
    ],
    projects: [
      "Personal Portfolio",
      "Business Website",
      "Web Application",
      "Progressive Web App",
    ],
  },
  mobileDevelopment: {
    critical: [
      "Swift/Kotlin",
      "Mobile UI/UX",
      "API Integration",
      "Git",
      "App Store Guidelines",
    ],
    high: [
      "React Native",
      "Flutter",
      "Firebase",
      "Push Notifications",
      "Mobile Testing",
    ],
    medium: [
      "App Analytics",
      "Performance Optimization",
      "Cross-platform Development",
      "Mobile Security",
    ],
    projects: [
      "iOS/Android App",
      "Cross-platform App",
      "Mobile Game",
      "Productivity App",
    ],
  },
};

// Enhanced Job Database with more realistic data
const enhancedJobDatabase = [
  // AI/ML Jobs
  {
    id: "ai_001",
    title: "AI Engineer",
    company: "Google",
    location: "Mountain View, CA",
    salary: "$150,000 - $250,000",
    type: "Full-time",
    experience: "2-4 years",
    skills: [
      "Python",
      "TensorFlow",
      "Machine Learning",
      "Deep Learning",
      "Computer Vision",
    ],
    description:
      "Join our AI team to develop cutting-edge machine learning models and AI solutions that impact billions of users worldwide.",
    requirements: [
      "Masters in Computer Science, AI, or related field",
      "2+ years experience in machine learning",
      "Strong Python programming skills",
      "Experience with TensorFlow or PyTorch",
      "Knowledge of deep learning architectures",
    ],
    benefits: [
      "Health Insurance",
      "Stock Options",
      "Flexible PTO",
      "Learning Budget",
    ],
    category: "ai",
    postedDate: "2025-09-20",
    applicationCount: 245,
  },
  {
    id: "ai_002",
    title: "Machine Learning Engineer",
    company: "Microsoft",
    location: "Seattle, WA",
    salary: "$140,000 - $220,000",
    type: "Full-time",
    experience: "3-5 years",
    skills: ["Python", "PyTorch", "MLOps", "Azure", "Kubernetes"],
    description:
      "Build and deploy ML models at scale using Azure cloud infrastructure and modern MLOps practices.",
    requirements: [
      "Bachelors in Computer Science or related field",
      "3+ years ML engineering experience",
      "Experience with cloud platforms (Azure preferred)",
      "Knowledge of MLOps and model deployment",
      "Strong software engineering skills",
    ],
    benefits: [
      "Health Insurance",
      "Retirement Plan",
      "Remote Work",
      "Professional Development",
    ],
    category: "ai",
    postedDate: "2025-09-19",
    applicationCount: 189,
  },
  {
    id: "ai_003",
    title: "Data Scientist",
    company: "Netflix",
    location: "Los Angeles, CA",
    salary: "$130,000 - $200,000",
    type: "Full-time",
    experience: "2-4 years",
    skills: [
      "Python",
      "SQL",
      "Statistics",
      "Machine Learning",
      "Data Visualization",
    ],
    description:
      "Analyze user behavior and content performance to drive data-driven decisions for content recommendation algorithms.",
    requirements: [
      "Masters in Statistics, Data Science, or related field",
      "2+ years of data science experience",
      "Strong statistical analysis skills",
      "Experience with A/B testing",
      "Proficiency in Python and SQL",
    ],
    benefits: [
      "Unlimited PTO",
      "Stock Options",
      "Health Insurance",
      "Content Allowance",
    ],
    category: "dataScience",
    postedDate: "2025-09-21",
    applicationCount: 312,
  },
  // Computer Science Jobs
  {
    id: "cs_001",
    title: "Full Stack Developer",
    company: "Meta",
    location: "Menlo Park, CA",
    salary: "$120,000 - $180,000",
    type: "Full-time",
    experience: "1-3 years",
    skills: ["JavaScript", "React", "Node.js", "GraphQL", "MongoDB"],
    description:
      "Develop and maintain web applications used by billions of people worldwide. Work on both frontend and backend systems.",
    requirements: [
      "Bachelors in Computer Science or equivalent experience",
      "1+ years of full stack development",
      "Proficiency in React and Node.js",
      "Experience with databases and APIs",
      "Understanding of system design principles",
    ],
    benefits: [
      "Health Insurance",
      "Stock Options",
      "Free Meals",
      "Gym Membership",
    ],
    category: "computerScience",
    postedDate: "2025-09-18",
    applicationCount: 456,
  },
  {
    id: "cs_002",
    title: "Software Engineer",
    company: "Amazon",
    location: "Austin, TX",
    salary: "$110,000 - $170,000",
    type: "Full-time",
    experience: "2-5 years",
    skills: ["Java", "Python", "AWS", "System Design", "Microservices"],
    description:
      "Build scalable systems and services that power Amazons e-commerce platform and cloud infrastructure.",
    requirements: [
      "Bachelors in Computer Science or related field",
      "2+ years of software development experience",
      "Strong programming skills in Java or Python",
      "Experience with cloud platforms (AWS preferred)",
      "Knowledge of distributed systems",
    ],
    benefits: [
      "Health Insurance",
      "Stock Options",
      "Career Development",
      "Relocation Assistance",
    ],
    category: "computerScience",
    postedDate: "2025-09-17",
    applicationCount: 523,
  },
  // Cybersecurity Jobs
  {
    id: "cyber_001",
    title: "Cybersecurity Analyst",
    company: "Cisco",
    location: "San Jose, CA",
    salary: "$95,000 - $145,000",
    type: "Full-time",
    experience: "2-4 years",
    skills: [
      "Network Security",
      "SIEM",
      "Incident Response",
      "Penetration Testing",
      "Python",
    ],
    description:
      "Monitor security events, respond to incidents, and strengthen our cybersecurity posture across global networks.",
    requirements: [
      "Bachelors in Cybersecurity, IT, or related field",
      "2+ years in cybersecurity or related role",
      "Experience with SIEM tools",
      "Knowledge of network protocols and security",
      "Security certifications preferred (CISSP, CEH, etc.)",
    ],
    benefits: [
      "Health Insurance",
      "Security Training",
      "Flexible Schedule",
      "Certification Reimbursement",
    ],
    category: "cyberSecurity",
    postedDate: "2025-09-16",
    applicationCount: 167,
  },
  {
    id: "cyber_002",
    title: "Security Engineer",
    company: "CrowdStrike",
    location: "Austin, TX",
    salary: "$110,000 - $160,000",
    type: "Full-time",
    experience: "3-6 years",
    skills: [
      "Ethical Hacking",
      "Vulnerability Assessment",
      "Python",
      "Linux",
      "Cloud Security",
    ],
    description:
      "Design and implement security solutions, conduct penetration testing, and develop security tools for endpoint protection.",
    requirements: [
      "Bachelors in Cybersecurity or Computer Science",
      "3+ years in information security",
      "Experience with penetration testing",
      "Strong scripting skills (Python, Bash)",
      "Cloud security knowledge (AWS, Azure)",
    ],
    benefits: [
      "Competitive Salary",
      "Stock Options",
      "Remote Work",
      "Security Conferences",
    ],
    category: "cyberSecurity",
    postedDate: "2025-09-15",
    applicationCount: 134,
  },
];

// DOM Elements
document.addEventListener("DOMContentLoaded", function () {
  initializeApp();
  setupEventListeners();
  setupScrollAnimations();
});

function initializeApp() {
  // Check if user is logged in
  checkAuthStatus();

  // Initialize navigation
  initializeNavigation();

  // Load any saved data
  loadUserData();
}

function setupEventListeners() {
  // Navigation toggle for mobile
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.querySelector(".nav-list");

  if (navToggle) {
    navToggle.addEventListener("click", function () {
      navMenu.classList.toggle("active");
    });
  }

  // Close mobile menu when clicking outside
  document.addEventListener("click", function (event) {
    if (!event.target.closest(".nav-menu")) {
      navMenu?.classList.remove("active");
    }
  });

  // Auth form submissions
  setupAuthForms();

  // Modal close events
  setupModalEvents();

  // Smooth scrolling for anchor links
  setupSmoothScrolling();
}

function setupScrollAnimations() {
  // Add scroll animations for elements
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observe elements that should animate on scroll
  document
    .querySelectorAll(".feature-card, .step-item, .about-card")
    .forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(20px)";
      el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      observer.observe(el);
    });
}

function setupSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
}

// Navigation functions
function navigateToUpload() {
  window.location.href = "pages/upload.html";
}

function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
}

// Authentication functions
function showAuth(type = "login") {
  const modal = document.getElementById("authModal");
  modal.style.display = "block";
  switchAuth(type);
  document.body.style.overflow = "hidden";
}

function closeAuth() {
  const modal = document.getElementById("authModal");
  modal.style.display = "none";
  document.body.style.overflow = "auto";
}

function switchAuth(type) {
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");

  if (type === "login") {
    loginForm.classList.add("active");
    signupForm.classList.remove("active");
  } else {
    signupForm.classList.add("active");
    loginForm.classList.remove("active");
  }
}

function togglePassword(inputId) {
  const input = document.getElementById(inputId);
  const button = input.nextElementSibling;
  const icon = button.querySelector("i");

  if (input.type === "password") {
    input.type = "text";
    icon.className = "fas fa-eye-slash";
  } else {
    input.type = "password";
    icon.className = "fas fa-eye";
  }
}

function setupAuthForms() {
  const loginForm = document.getElementById("loginFormElement");
  const signupForm = document.getElementById("signupFormElement");

  if (loginForm) {
    loginForm.addEventListener("submit", handleLogin);
  }

  if (signupForm) {
    signupForm.addEventListener("submit", handleSignup);
  }
}

async function handleLogin(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const loginData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  try {
    // Simulate API call
    showLoading(e.target.querySelector("button"));
    await simulateAPICall(2000);

    // Mock successful login
    currentUser = {
      id: "user_" + Date.now(),
      email: loginData.email,
      name: loginData.email.split("@")[0],
      token: "mock_jwt_token",
    };

    localStorage.setItem("user", JSON.stringify(currentUser));
    localStorage.setItem("token", currentUser.token);

    showSuccess("Login successful! Welcome back.");
    closeAuth();
    updateUIForLoggedInUser();
  } catch (error) {
    showError("Login failed. Please try again.");
  } finally {
    hideLoading(e.target.querySelector("button"));
  }
}

async function handleSignup(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const signupData = {
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  };

  // Validate passwords match
  if (signupData.password !== signupData.confirmPassword) {
    showError("Passwords do not match");
    return;
  }

  try {
    showLoading(e.target.querySelector("button"));
    await simulateAPICall(2500);

    // Mock successful signup
    currentUser = {
      id: "user_" + Date.now(),
      email: signupData.email,
      name: `${signupData.firstName} ${signupData.lastName}`,
      firstName: signupData.firstName,
      lastName: signupData.lastName,
      token: "mock_jwt_token",
    };

    localStorage.setItem("user", JSON.stringify(currentUser));
    localStorage.setItem("token", currentUser.token);

    showSuccess(
      "Account created successfully! Welcome to AI Career Navigator."
    );
    closeAuth();
    updateUIForLoggedInUser();
  } catch (error) {
    showError("Signup failed. Please try again.");
  } finally {
    hideLoading(e.target.querySelector("button"));
  }
}

function checkAuthStatus() {
  const savedUser = localStorage.getItem("user");
  const token = localStorage.getItem("token");

  if (savedUser && token) {
    currentUser = JSON.parse(savedUser);
    updateUIForLoggedInUser();
  }
}

function updateUIForLoggedInUser() {
  if (!currentUser) return;

  // Update navigation
  const signInLink = document.querySelector('.nav-link[onclick*="login"]');
  const signUpBtn = document.querySelector(".signup-btn");

  if (signInLink && signUpBtn) {
    signInLink.textContent = `Hi, ${currentUser.firstName || currentUser.name}`;
    signInLink.onclick = () => showUserMenu();

    signUpBtn.textContent = "Dashboard";
    signUpBtn.onclick = () => navigateToUpload();
  }
}

function showUserMenu() {
  // Create and show user dropdown menu
  const menu = document.createElement("div");
  menu.className = "user-menu";
  menu.innerHTML = `
        <div class="user-menu-content">
            <a href="pages/dashboard.html">Dashboard</a>
            <a href="pages/profile.html">Profile</a>
            <a href="pages/settings.html">Settings</a>
            <a href="#" onclick="logout()">Logout</a>
        </div>
    `;

  document.body.appendChild(menu);

  setTimeout(() => menu.remove(), 3000);
}

function logout() {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  currentUser = null;
  location.reload();
}

function setupModalEvents() {
  // Close modal when clicking outside
  window.addEventListener("click", function (event) {
    const modal = document.getElementById("authModal");
    if (event.target === modal) {
      closeAuth();
    }
  });
}

// Enhanced Resume Parser with better extraction
class EnhancedResumeParser {
  constructor() {
    this.skillsDatabase = this.buildSkillsDatabase();
    this.patterns = {
      email: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
      phone:
        /[\+]?[1-9]?[\s\-\.]?\(?[0-9]{3}\)?[\s\-\.]?[0-9]{3}[\s\-\.]?[0-9]{4}/g,
      skills:
        /(?:skills?|technologies?|technical skills?|programming languages?)[\s\n]*[:\-]?\s*([^\.]+?)(?:\n\n|$|\.(?:\s|$))/gi,
      experience:
        /(?:experience|work history|employment|professional experience)[\s\n]*[:\-]?\s*(.*?)(?=education|skills|projects|$)/gis,
      education:
        /(?:education|academic|qualifications?|degrees?)[\s\n]*[:\-]?\s*(.*?)(?=experience|skills|projects|$)/gis,
      projects:
        /(?:projects?|portfolio)[\s\n]*[:\-]?\s*(.*?)(?=experience|education|skills|$)/gis,
    };
  }

  buildSkillsDatabase() {
    const allSkills = [];
    Object.values(enhancedSkillsDatabase).forEach((field) => {
      Object.values(field).forEach((skillGroup) => {
        if (Array.isArray(skillGroup)) {
          allSkills.push(...skillGroup);
        }
      });
    });

    // Add common technologies
    allSkills.push(
      "Git",
      "Docker",
      "Kubernetes",
      "AWS",
      "Azure",
      "GCP",
      "Linux",
      "Windows",
      "MySQL",
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "Elasticsearch",
      "REST",
      "GraphQL",
      "Microservices",
      "Agile",
      "Scrum",
      "CI/CD"
    );

    return [...new Set(allSkills)]; // Remove duplicates
  }

  async parseResumeText(text) {
    try {
      const extractedData = {
        personal: this.extractPersonalInfo(text),
        education: this.extractEducation(text),
        skills: this.extractSkills(text),
        experience: this.extractExperience(text),
        projects: this.extractProjects(text),
        summary: this.extractSummary(text),
      };

      // Enhance with field detection
      extractedData.suggestedField = this.detectField(extractedData);
      extractedData.experienceLevel = this.assessExperienceLevel(extractedData);

      return this.cleanExtractedData(extractedData);
    } catch (error) {
      console.error("Resume parsing error:", error);
      throw error;
    }
  }

  extractPersonalInfo(text) {
    const lines = text
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0);
    const emailMatch = text.match(this.patterns.email);
    const phoneMatch = text.match(this.patterns.phone);

    // Extract name (usually first non-empty line)
    let name = "";
    for (const line of lines) {
      if (
        line.length > 5 &&
        line.length < 50 &&
        !line.includes("@") &&
        !line.includes("http")
      ) {
        name = line;
        break;
      }
    }

    return {
      name: this.cleanName(name),
      email: emailMatch ? emailMatch[0] : "",
      phone: phoneMatch ? this.cleanPhone(phoneMatch[0]) : "",
      address: this.extractAddress(text),
    };
  }

  extractSkills(text) {
    const skillsMatch = text.match(this.patterns.skills);
    let skillsText = "";

    if (skillsMatch && skillsMatch[1]) {
      skillsText = skillsMatch[1];
    } else {
      // Fallback: look for skills mentioned throughout the document
      skillsText = text;
    }

    const foundSkills = [];
    const lowerSkillsText = skillsText.toLowerCase();

    this.skillsDatabase.forEach((skill) => {
      const skillLower = skill.toLowerCase();
      if (lowerSkillsText.includes(skillLower)) {
        // Check for whole word matches to avoid false positives
        const regex = new RegExp(`\\b${skillLower}\\b`, "gi");
        if (regex.test(skillsText)) {
          foundSkills.push(skill);
        }
      }
    });

    // Also extract skills from common patterns
    const commonPatterns = [
      /\b(?:proficient in|skilled in|experience with|knowledge of)[\s:]+([\w\s,+#\.\/\-]{10,100})/gi,
      /\b(?:languages|technologies|frameworks|tools)[\s:]+([\w\s,+#\.\/\-]{10,100})/gi,
    ];

    commonPatterns.forEach((pattern) => {
      const matches = skillsText.matchAll(pattern);
      for (const match of matches) {
        const skillString = match[1];
        const extractedSkills = skillString
          .split(/[,\n\|•·\-\*]/)
          .map((skill) => skill.trim())
          .filter((skill) => skill.length > 1 && skill.length < 30);

        foundSkills.push(...extractedSkills);
      }
    });

    // Remove duplicates and clean
    return [...new Set(foundSkills)]
      .filter((skill) => skill.length > 1)
      .slice(0, 20); // Limit to 20 skills
  }

  extractExperience(text) {
    const experienceMatch = text.match(this.patterns.experience);
    if (!experienceMatch) return [];

    const experienceText = experienceMatch[1];
    const experiences = [];

    // Pattern to match job entries
    const jobPattern =
      /([^\n]+?)\s*(?:at\s+|@\s+)?([^\n]*?)\s*(\d{4}[\s\-]\d{4}|\d{1,2}\/\d{4}[\s\-]\d{1,2}\/\d{4}|present|current)/gi;
    const matches = experienceText.matchAll(jobPattern);

    for (const match of matches) {
      const role = match[1]?.trim();
      const company = match[2]?.trim();
      const duration = match[3]?.trim();

      if (role && role.length > 5 && role.length < 100) {
        experiences.push({
          role: role,
          company: company || "Not specified",
          duration: duration,
          description: this.extractJobDescription(experienceText, role),
        });
      }
    }

    return experiences.slice(0, 5); // Limit to 5 experiences
  }

  extractJobDescription(text, role) {
    // Try to find description after the role
    const roleIndex = text.toLowerCase().indexOf(role.toLowerCase());
    if (roleIndex === -1) return "";

    const afterRole = text.substring(roleIndex + role.length);
    const sentences = afterRole.split(/[.!?]\s+/).slice(0, 3);

    return sentences.join(". ").trim().substring(0, 200);
  }

  extractEducation(text) {
    const educationMatch = text.match(this.patterns.education);
    if (!educationMatch) return [];

    const educationText = educationMatch[1];
    const education = [];

    // Common degree patterns
    const degreePatterns = [
      /\b(B\.?Tech|Bachelor of Technology|BTech)\s+(?:in\s+)?(.*?)(?:\n|$|\d{4})/gi,
      /\b(M\.?Tech|Master of Technology|MTech)\s+(?:in\s+)?(.*?)(?:\n|$|\d{4})/gi,
      /\b(B\.?S|Bachelor of Science|BS)\s+(?:in\s+)?(.*?)(?:\n|$|\d{4})/gi,
      /\b(M\.?S|Master of Science|MS)\s+(?:in\s+)?(.*?)(?:\n|$|\d{4})/gi,
      /\b(PhD|Doctor of Philosophy)\s+(?:in\s+)?(.*?)(?:\n|$|\d{4})/gi,
    ];

    degreePatterns.forEach((pattern) => {
      const matches = educationText.matchAll(pattern);
      for (const match of matches) {
        const degree = match[1];
        const field = match[2]?.trim() || "";

        education.push({
          degree: degree,
          field: field,
          institution: this.extractInstitution(educationText, degree),
          year: this.extractYear(educationText),
        });
      }
    });

    return education.slice(0, 3); // Limit to 3 education entries
  }

  extractInstitution(text, degree) {
    const degreeIndex = text.toLowerCase().indexOf(degree.toLowerCase());
    if (degreeIndex === -1) return "";

    const beforeDegree = text.substring(0, degreeIndex);
    const afterDegree = text.substring(degreeIndex);

    // Look for institution keywords
    const institutionPattern =
      /(university|college|institute|school)\s*[:\-]?\s*([^\n]+)/gi;
    const match =
      afterDegree.match(institutionPattern) ||
      beforeDegree.match(institutionPattern);

    return match
      ? match[0]
          .replace(/university|college|institute|school/gi, "")
          .replace(/[:\-]/g, "")
          .trim()
      : "";
  }

  extractYear(text) {
    const yearPattern = /(20\d{2}|19\d{2})/g;
    const years = text.match(yearPattern);
    return years ? Math.max(...years.map((y) => parseInt(y))) : "";
  }

  extractProjects(text) {
    const projectsMatch = text.match(this.patterns.projects);
    if (!projectsMatch) return [];

    const projectsText = projectsMatch[1];
    const projects = [];

    // Simple project extraction
    const projectLines = projectsText
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 10 && line.length < 200);

    projectLines.forEach((line) => {
      if (
        line.includes("project") ||
        line.includes("developed") ||
        line.includes("built")
      ) {
        projects.push({
          name: line.substring(0, 50) + (line.length > 50 ? "..." : ""),
          description: line,
        });
      }
    });

    return projects.slice(0, 3);
  }

  extractSummary(text) {
    const summaryPatterns = [
      /(?:summary|objective|profile|about)[\s\n]*[:\-]?\s*([^\.]+?)(?:\n\n|$)/gi,
      /^([^.\n]{50,200}[.])/gm, // First substantial sentence
    ];

    for (const pattern of summaryPatterns) {
      const match = text.match(pattern);
      if (match) {
        return match[0]
          .replace(/summary|objective|profile|about/gi, "")
          .replace(/[:\-]/g, "")
          .trim();
      }
    }

    return "";
  }

  detectField(extractedData) {
    const skills = extractedData.skills || [];
    const skillsText = skills.join(" ").toLowerCase();
    const experienceText =
      extractedData.experience
        ?.map((exp) => exp.role + " " + exp.description)
        .join(" ")
        .toLowerCase() || "";
    const educationText =
      extractedData.education
        ?.map((edu) => edu.degree + " " + edu.field)
        .join(" ")
        .toLowerCase() || "";

    const allText = (
      skillsText +
      " " +
      experienceText +
      " " +
      educationText
    ).toLowerCase();

    const fieldScores = {
      ai: this.calculateFieldScore(allText, [
        "ai",
        "artificial intelligence",
        "machine learning",
        "deep learning",
        "neural network",
        "tensorflow",
        "pytorch",
      ]),
      dataScience: this.calculateFieldScore(allText, [
        "data science",
        "data analysis",
        "statistics",
        "tableau",
        "pandas",
        "numpy",
        "sql",
      ]),
      computerScience: this.calculateFieldScore(allText, [
        "software",
        "programming",
        "development",
        "javascript",
        "python",
        "java",
        "react",
        "node",
      ]),
      cyberSecurity: this.calculateFieldScore(allText, [
        "security",
        "cybersecurity",
        "penetration",
        "ethical hacking",
        "network security",
        "cissp",
      ]),
      webDevelopment: this.calculateFieldScore(allText, [
        "web development",
        "frontend",
        "backend",
        "html",
        "css",
        "javascript",
        "react",
        "angular",
      ]),
      mobileDevelopment: this.calculateFieldScore(allText, [
        "mobile",
        "android",
        "ios",
        "swift",
        "kotlin",
        "react native",
        "flutter",
      ]),
    };

    const maxScore = Math.max(...Object.values(fieldScores));
    const detectedField = Object.keys(fieldScores).find(
      (field) => fieldScores[field] === maxScore
    );

    return detectedField || "computerScience";
  }

  calculateFieldScore(text, keywords) {
    let score = 0;
    keywords.forEach((keyword) => {
      const regex = new RegExp(keyword.replace(" ", "\\s+"), "gi");
      const matches = text.match(regex);
      score += matches ? matches.length : 0;
    });
    return score;
  }

  assessExperienceLevel(extractedData) {
    const experiences = extractedData.experience || [];
    let totalYears = 0;

    experiences.forEach((exp) => {
      const years = this.parseDurationToYears(exp.duration);
      totalYears += years;
    });

    if (totalYears < 1) return "entry";
    if (totalYears < 3) return "junior";
    if (totalYears < 6) return "mid";
    return "senior";
  }

  parseDurationToYears(duration) {
    if (!duration) return 0;

    const durationLower = duration.toLowerCase();

    if (durationLower.includes("month")) {
      const months = parseInt(duration.match(/\d+/)?.[0] || "0");
      return months / 12;
    }

    if (durationLower.includes("year")) {
      return parseInt(duration.match(/\d+/)?.[0] || "0");
    }

    // Try to parse date ranges like "2020 - 2022"
    const yearMatches = duration.match(/\d{4}/g);
    if (yearMatches && yearMatches.length >= 2) {
      const startYear = parseInt(yearMatches[0]);
      const endYear = parseInt(yearMatches[1]);
      return Math.max(0, endYear - startYear);
    }

    return 1; // Default assumption
  }

  cleanExtractedData(data) {
    // Remove empty fields and clean up data
    Object.keys(data).forEach((key) => {
      if (Array.isArray(data[key])) {
        data[key] = data[key].filter(
          (item) =>
            item &&
            (typeof item === "string"
              ? item.trim().length > 0
              : Object.keys(item).length > 0)
        );
      } else if (typeof data[key] === "object" && data[key] !== null) {
        Object.keys(data[key]).forEach((subKey) => {
          if (
            !data[key][subKey] ||
            (typeof data[key][subKey] === "string" &&
              data[key][subKey].trim().length === 0)
          ) {
            delete data[key][subKey];
          }
        });
      }
    });

    return data;
  }

  cleanName(name) {
    if (!name) return "";
    return name
      .replace(/^(mr|mrs|ms|dr|prof)\.?\s*/gi, "")
      .replace(/[^\w\s]/g, "")
      .trim()
      .split(/\s+/)
      .slice(0, 3)
      .join(" ");
  }

  cleanPhone(phone) {
    return phone.replace(/[^\d+()-]/g, "");
  }

  extractAddress(text) {
    const addressPattern = /([A-Za-z\s]+),?\s*([A-Z]{2})\s*(\d{5})?/;
    const match = text.match(addressPattern);
    return match ? match[0] : "";
  }
}

// Initialize enhanced resume parser
const enhancedParser = new EnhancedResumeParser();

// Enhanced Skills Analysis
function generateEnhancedSkillsAnalysis(userProfile) {
  const field = userProfile.suggestedField || "computerScience";
  const userSkills = userProfile.skills || [];
  const fieldSkills = enhancedSkillsDatabase[field];

  if (!fieldSkills) return null;

  const analysis = {
    field: field,
    userSkills: userSkills,
    skillGaps: {
      critical: [],
      high: [],
      medium: [],
    },
    strengths: [],
    recommendations: [],
    projects: fieldSkills.projects || [],
  };

  // Analyze skill gaps
  ["critical", "high", "medium"].forEach((priority) => {
    const requiredSkills = fieldSkills[priority] || [];
    requiredSkills.forEach((skill) => {
      const hasSkill = userSkills.some(
        (userSkill) =>
          userSkill.toLowerCase().includes(skill.toLowerCase()) ||
          skill.toLowerCase().includes(userSkill.toLowerCase())
      );

      if (hasSkill) {
        analysis.strengths.push(skill);
      } else {
        analysis.skillGaps[priority].push({
          skill: skill,
          priority: priority,
          learningTime: estimateSkillLearningTime(skill),
          resources: getSkillResources(skill),
        });
      }
    });
  });

  // Generate recommendations
  analysis.recommendations = generateSkillRecommendations(analysis);

  return analysis;
}

function estimateSkillLearningTime(skill) {
  const timeEstimates = {
    Python: "2-3 months",
    JavaScript: "2-4 months",
    "Machine Learning": "4-6 months",
    "Deep Learning": "6-8 months",
    React: "2-4 months",
    SQL: "1-2 months",
    "Data Analysis": "3-5 months",
    "Cybersecurity Fundamentals": "4-6 months",
  };

  return timeEstimates[skill] || "2-4 months";
}

function getSkillResources(skill) {
  const resources = {
    Python: [
      "Python.org Tutorial",
      "Codecademy Python",
      "Automate the Boring Stuff",
    ],
    JavaScript: ["MDN Web Docs", "freeCodeCamp", "JavaScript.info"],
    React: ["React Documentation", "React Tutorial", "Full Stack Open"],
    "Machine Learning": ["Coursera ML Course", "Fast.ai", "Kaggle Learn"],
    SQL: ["W3Schools SQL", "SQLBolt", "HackerRank SQL"],
  };

  return (
    resources[skill] || ["Online courses", "Documentation", "Practice projects"]
  );
}

function generateSkillRecommendations(analysis) {
  const recommendations = [];

  if (analysis.skillGaps.critical.length > 0) {
    recommendations.push({
      type: "immediate",
      title: "Critical Skills Priority",
      description: `Focus on mastering ${analysis.skillGaps.critical
        .slice(0, 2)
        .map((s) => s.skill)
        .join(" and ")} first`,
      timeframe: "1-3 months",
      skills: analysis.skillGaps.critical.slice(0, 2),
    });
  }

  if (analysis.skillGaps.high.length > 0) {
    recommendations.push({
      type: "short-term",
      title: "Strengthen Your Foundation",
      description: `Develop ${analysis.skillGaps.high
        .slice(0, 3)
        .map((s) => s.skill)
        .join(", ")} to enhance your profile`,
      timeframe: "3-6 months",
      skills: analysis.skillGaps.high.slice(0, 3),
    });
  }

  if (analysis.projects.length > 0) {
    recommendations.push({
      type: "project",
      title: "Build Portfolio Projects",
      description: "Create practical projects to demonstrate your skills",
      timeframe: "Ongoing",
      projects: analysis.projects.slice(0, 3),
    });
  }

  return recommendations;
}

// Enhanced Job Matching
function generateEnhancedJobRecommendations(userProfile) {
  const userSkills = userProfile.skills || [];
  const field = userProfile.suggestedField || "computerScience";
  const experienceLevel = userProfile.experienceLevel || "entry";

  // Filter and score jobs
  const scoredJobs = enhancedJobDatabase.map((job) => {
    let score = 0;

    // Field match (40 points)
    if (job.category === field) {
      score += 40;
    } else if (isRelatedField(job.category, field)) {
      score += 20;
    }

    // Skills match (35 points)
    const skillMatches = job.skills.filter((jobSkill) =>
      userSkills.some(
        (userSkill) =>
          userSkill.toLowerCase().includes(jobSkill.toLowerCase()) ||
          jobSkill.toLowerCase().includes(userSkill.toLowerCase())
      )
    );
    score += (skillMatches.length / job.skills.length) * 35;

    // Experience level match (15 points)
    if (matchesExperienceLevel(job.experience, experienceLevel)) {
      score += 15;
    }

    // Recency (10 points)
    const daysOld = getDaysOld(job.postedDate);
    score += Math.max(0, 10 - daysOld / 7);

    return {
      ...job,
      matchScore: Math.round(score),
      matchedSkills: skillMatches,
      missingSkills: job.skills.filter(
        (skill) => !skillMatches.includes(skill)
      ),
    };
  });

  // Sort by match score and return top matches
  return scoredJobs.sort((a, b) => b.matchScore - a.matchScore).slice(0, 12); // Return top 12 matches
}

function isRelatedField(jobField, userField) {
  const relatedFields = {
    ai: ["dataScience", "computerScience"],
    dataScience: ["ai", "computerScience"],
    computerScience: [
      "ai",
      "dataScience",
      "webDevelopment",
      "mobileDevelopment",
    ],
    cyberSecurity: ["computerScience"],
    webDevelopment: ["computerScience", "mobileDevelopment"],
    mobileDevelopment: ["computerScience", "webDevelopment"],
  };

  return relatedFields[userField]?.includes(jobField) || false;
}

function matchesExperienceLevel(jobExperience, userLevel) {
  const jobLevel = jobExperience.toLowerCase();

  const levelMappings = {
    entry: ["0-1", "0-2", "1-3", "entry", "junior", "graduate"],
    junior: ["1-3", "2-4", "junior", "entry"],
    mid: ["2-4", "3-5", "2-5", "mid", "senior"],
    senior: ["3-5", "4-6", "5+", "senior", "lead", "principal"],
  };

  return (
    levelMappings[userLevel]?.some((level) => jobLevel.includes(level)) || false
  );
}

function getDaysOld(postedDate) {
  const posted = new Date(postedDate);
  const now = new Date();
  return Math.floor((now - posted) / (1000 * 60 * 60 * 24));
}

// Utility functions
function simulateAPICall(delay) {
  return new Promise((resolve) => setTimeout(resolve, delay));
}

function showLoading(button) {
  const originalText = button.innerHTML;
  button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
  button.disabled = true;
  button.dataset.originalText = originalText;
}

function hideLoading(button) {
  button.innerHTML = button.dataset.originalText || "Submit";
  button.disabled = false;
}

function showSuccess(message) {
  showNotification(message, "success");
}

function showError(message) {
  showNotification(message, "error");
}

function showNotification(message, type) {
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.innerHTML = `
        <i class="fas fa-${
          type === "success" ? "check-circle" : "exclamation-circle"
        }"></i>
        <span>${message}</span>
        <button onclick="this.parentElement.remove()"><i class="fas fa-times"></i></button>
    `;

  document.body.appendChild(notification);

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentElement) {
      notification.remove();
    }
  }, 5000);
}

function loadUserData() {
  // Load any existing user data from localStorage
  const savedData = localStorage.getItem("userResumeData");
  if (savedData) {
    parsedResumeData = JSON.parse(savedData);
  }
}

// Export functions for use in other files
window.aiCareerNavigator = {
  enhancedParser,
  generateEnhancedSkillsAnalysis,
  generateEnhancedJobRecommendations,
  enhancedSkillsDatabase,
  enhancedJobDatabase,
  showSuccess,
  showError,
  simulateAPICall,
};

// Add notification styles if not already present
if (!document.querySelector("#notification-styles")) {
  const style = document.createElement("style");
  style.id = "notification-styles";
  style.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--card-bg);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: var(--radius-lg);
            padding: var(--spacing-lg);
            display: flex;
            align-items: center;
            gap: var(--spacing-sm);
            z-index: 9999;
            min-width: 300px;
            box-shadow: var(--shadow-xl);
            animation: slideInRight 0.3s ease-out;
        }
        
        .notification.success {
            border-left: 4px solid var(--success);
        }
        
        .notification.error {
            border-left: 4px solid var(--error);
        }
        
        .notification i:first-child {
            font-size: var(--font-size-lg);
            color: var(--success);
        }
        
        .notification.error i:first-child {
            color: var(--error);
        }
        
        .notification span {
            flex-grow: 1;
            color: var(--text-primary);
        }
        
        .notification button {
            background: none;
            border: none;
            color: var(--text-muted);
            cursor: pointer;
            padding: var(--spacing-xs);
            border-radius: var(--radius-sm);
            transition: var(--transition-fast);
        }
        
        .notification button:hover {
            color: var(--text-primary);
            background: var(--surface);
        }
        
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
  document.head.appendChild(style);
}
