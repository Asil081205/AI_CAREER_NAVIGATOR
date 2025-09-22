// Resume-Based Career Recommendation Engine with Dynamic Job Links
class ResumeBasedRecommendationEngine {
  constructor() {
    this.skillsMapping = {
      ai: {
        coreSkills: [
          "Python",
          "TensorFlow",
          "PyTorch",
          "Machine Learning",
          "Deep Learning",
          "NLP",
          "Computer Vision",
          "Scikit-learn",
          "Keras",
          "OpenCV",
          "Data Science",
          "Statistics",
          "Neural Networks",
          "AI Ethics",
        ],
        jobTitles: [
          "Artificial Intelligence Engineer",
          "Machine Learning Engineer",
          "AI Research Scientist",
          "Computer Vision Engineer",
          "NLP Engineer",
          "Data Scientist",
          "AI Consultant",
        ],
        careerPath: [
          {
            level: "Entry",
            roles: ["AI Trainee", "Junior ML Engineer", "Data Analyst"],
            experience: "0-1 years",
          },
          {
            level: "Mid",
            roles: ["AI Engineer", "ML Engineer", "Senior Data Scientist"],
            experience: "2-4 years",
          },
          {
            level: "Senior",
            roles: [
              "Lead AI Engineer",
              "AI Architect",
              "Principal Data Scientist",
            ],
            experience: "5-8 years",
          },
          {
            level: "Expert",
            roles: ["AI Director", "Chief Data Officer", "AI Research Head"],
            experience: "8+ years",
          },
        ],
      },
      dataScience: {
        coreSkills: [
          "Python",
          "R",
          "SQL",
          "Tableau",
          "Statistics",
          "Pandas",
          "NumPy",
          "Matplotlib",
          "Seaborn",
          "Jupyter",
          "Power BI",
          "Excel",
          "Data Mining",
          "Data Visualization",
          "Statistical Analysis",
          "Big Data",
        ],
        jobTitles: [
          "Data Scientist",
          "Data Analyst",
          "Business Intelligence Analyst",
          "Data Engineer",
          "Analytics Consultant",
          "Quantitative Analyst",
        ],
        careerPath: [
          {
            level: "Entry",
            roles: [
              "Data Analyst Trainee",
              "Junior Data Scientist",
              "BI Analyst",
            ],
            experience: "0-1 years",
          },
          {
            level: "Mid",
            roles: ["Data Scientist", "Senior Data Analyst", "Data Engineer"],
            experience: "2-4 years",
          },
          {
            level: "Senior",
            roles: [
              "Lead Data Scientist",
              "Analytics Manager",
              "Data Science Manager",
            ],
            experience: "5-8 years",
          },
          {
            level: "Expert",
            roles: [
              "Chief Data Officer",
              "VP Analytics",
              "Data Science Director",
            ],
            experience: "8+ years",
          },
        ],
      },
      computerScience: {
        coreSkills: [
          "Java",
          "Python",
          "C++",
          "JavaScript",
          "React",
          "Node.js",
          "Databases",
          "SQL",
          "System Design",
          "Algorithms",
          "Data Structures",
          "Git",
          "Docker",
          "Spring Boot",
          "REST APIs",
          "Microservices",
          "Cloud Computing",
        ],
        jobTitles: [
          "Software Engineer",
          "Full Stack Developer",
          "Backend Developer",
          "Frontend Developer",
          "DevOps Engineer",
          "System Architect",
        ],
        careerPath: [
          {
            level: "Entry",
            roles: [
              "Software Engineer Trainee",
              "Junior Developer",
              "Associate Software Engineer",
            ],
            experience: "0-1 years",
          },
          {
            level: "Mid",
            roles: [
              "Software Engineer",
              "Full Stack Developer",
              "Senior Developer",
            ],
            experience: "2-4 years",
          },
          {
            level: "Senior",
            roles: ["Lead Developer", "Technical Lead", "Software Architect"],
            experience: "5-8 years",
          },
          {
            level: "Expert",
            roles: ["Engineering Manager", "CTO", "Principal Engineer"],
            experience: "8+ years",
          },
        ],
      },
      cyberSecurity: {
        coreSkills: [
          "Networking",
          "Cryptography",
          "Ethical Hacking",
          "CISSP",
          "CEH",
          "Penetration Testing",
          "Security Tools",
          "Linux",
          "Firewalls",
          "Incident Response",
          "Risk Assessment",
          "OWASP",
          "Wireshark",
        ],
        jobTitles: [
          "Cybersecurity Analyst",
          "Security Engineer",
          "Ethical Hacker",
          "Security Consultant",
          "Information Security Analyst",
          "SOC Analyst",
        ],
        careerPath: [
          {
            level: "Entry",
            roles: [
              "Security Analyst Trainee",
              "Junior SOC Analyst",
              "Cyber Security Associate",
            ],
            experience: "0-1 years",
          },
          {
            level: "Mid",
            roles: [
              "Security Analyst",
              "Security Engineer",
              "Penetration Tester",
            ],
            experience: "2-4 years",
          },
          {
            level: "Senior",
            roles: ["Lead Security Engineer", "Security Architect", "CISO"],
            experience: "5-8 years",
          },
          {
            level: "Expert",
            roles: [
              "Chief Security Officer",
              "Security Director",
              "VP Security",
            ],
            experience: "8+ years",
          },
        ],
      },
    };

    this.indianCities = [
      "bangalore",
      "mumbai",
      "delhi",
      "hyderabad",
      "chennai",
      "pune",
      "kolkata",
      "ahmedabad",
      "jaipur",
      "surat",
      "lucknow",
      "kanpur",
      "nagpur",
      "indore",
      "thane",
      "bhopal",
      "visakhapatnam",
      "pimpri-chinchwad",
      "patna",
      "vadodara",
      "gurgaon",
      "noida",
      "coimbatore",
      "kochi",
      "guwahati",
      "chandigarh",
    ];

    this.jobPortals = {
      naukri: "https://www.naukri.com",
      linkedin: "https://www.linkedin.com/jobs/search",
      indeed: "https://in.indeed.com/jobs",
      foundit: "https://www.foundit.in",
      shine: "https://www.shine.com",
    };
  }

  async analyzeResumeForCareerRecommendations() {
    console.log("Starting resume-based career analysis...");

    // Get parsed resume data
    const parsedResumeData = JSON.parse(
      localStorage.getItem("parsedResumeData") || "{}"
    );
    const userProfile = JSON.parse(localStorage.getItem("userProfile") || "{}");
    const userLocation = this.extractUserLocation(
      parsedResumeData,
      userProfile
    );

    console.log("Resume data:", parsedResumeData);
    console.log("User location:", userLocation);

    if (!parsedResumeData || Object.keys(parsedResumeData).length === 0) {
      throw new Error("No resume data found. Please upload a resume first.");
    }

    // Extract comprehensive profile from resume
    const resumeProfile = this.extractResumeProfile(parsedResumeData);
    console.log("Extracted resume profile:", resumeProfile);

    // Determine career field based on resume content
    const primaryField = this.determineFieldFromResume(resumeProfile);
    console.log("Determined primary field:", primaryField);

    // Analyze skills specific to the field
    const skillGapAnalysis = this.analyzeSkillsForField(
      primaryField,
      resumeProfile.skills
    );

    // Get career path recommendations
    const careerPath = this.getCareerPathRecommendations(
      primaryField,
      resumeProfile
    );

    // Generate dynamic job search links
    const jobSearchLinks = this.generateJobSearchLinks(
      primaryField,
      userLocation
    );

    // Get live job recommendations
    const jobRecommendations = await this.getFieldSpecificJobs(
      primaryField,
      resumeProfile.skills,
      userLocation
    );

    // Create learning roadmap
    const learningRoadmap = this.createLearningRoadmap(
      primaryField,
      skillGapAnalysis,
      resumeProfile
    );

    return {
      primaryField,
      resumeProfile,
      skillGapAnalysis,
      careerPath,
      jobSearchLinks,
      jobRecommendations,
      learningRoadmap,
      userLocation,
    };
  }

  extractResumeProfile(parsedResumeData) {
    return {
      personal: parsedResumeData.personal || {},
      education: parsedResumeData.education || [],
      skills: parsedResumeData.skills || [],
      experience: parsedResumeData.experience || [],
      internships: parsedResumeData.internships || [],
      projects: parsedResumeData.projects || [],
      experienceLevel: parsedResumeData.experienceLevel || "entry",
      suggestedField: parsedResumeData.suggestedField || "computerScience",
    };
  }

  extractUserLocation(parsedResumeData, userProfile) {
    // Try to extract location from resume
    let location = "";

    if (parsedResumeData.personal && parsedResumeData.personal.address) {
      location = parsedResumeData.personal.address.toLowerCase();
    } else if (userProfile.personal && userProfile.personal.address) {
      location = userProfile.personal.address.toLowerCase();
    }

    // Find matching Indian city
    const detectedCity = this.indianCities.find((city) =>
      location.includes(city)
    );
    return detectedCity || "bangalore"; // Default to Bangalore
  }

  determineFieldFromResume(resumeProfile) {
    const fieldScores = {
      ai: 0,
      dataScience: 0,
      computerScience: 0,
      cyberSecurity: 0,
    };

    // Score based on education
    resumeProfile.education.forEach((edu) => {
      const degree = (edu.degree || "").toLowerCase();
      const field = (edu.field || "").toLowerCase();

      if (
        degree.includes("ai") ||
        field.includes("artificial intelligence") ||
        field.includes("machine learning")
      ) {
        fieldScores.ai += 15;
      }
      if (
        degree.includes("data science") ||
        field.includes("data science") ||
        field.includes("analytics")
      ) {
        fieldScores.dataScience += 15;
      }
      if (
        degree.includes("computer science") ||
        field.includes("computer science") ||
        degree.includes("cs")
      ) {
        fieldScores.computerScience += 10;
      }
      if (
        degree.includes("cyber") ||
        field.includes("cybersecurity") ||
        field.includes("security")
      ) {
        fieldScores.cyberSecurity += 15;
      }
    });

    // Score based on skills
    Object.keys(this.skillsMapping).forEach((field) => {
      const fieldSkills = this.skillsMapping[field].coreSkills;
      const matchCount = fieldSkills.filter((skill) =>
        resumeProfile.skills.some(
          (userSkill) =>
            userSkill.toLowerCase().includes(skill.toLowerCase()) ||
            skill.toLowerCase().includes(userSkill.toLowerCase())
        )
      ).length;
      fieldScores[field] += matchCount * 3;
    });

    // Score based on experience and projects
    [
      ...resumeProfile.experience,
      ...resumeProfile.projects,
      ...resumeProfile.internships,
    ].forEach((item) => {
      const text = (
        (item.role || "") +
        " " +
        (item.description || "") +
        " " +
        (item.name || "")
      ).toLowerCase();

      if (
        text.includes("ai") ||
        text.includes("machine learning") ||
        text.includes("deep learning")
      ) {
        fieldScores.ai += 5;
      }
      if (
        text.includes("data science") ||
        text.includes("analytics") ||
        text.includes("data analyst")
      ) {
        fieldScores.dataScience += 5;
      }
      if (
        text.includes("software") ||
        text.includes("developer") ||
        text.includes("programming")
      ) {
        fieldScores.computerScience += 3;
      }
      if (
        text.includes("security") ||
        text.includes("cyber") ||
        text.includes("penetration")
      ) {
        fieldScores.cyberSecurity += 5;
      }
    });

    console.log("Field scores from resume:", fieldScores);

    // Find the field with the highest score
    const maxScore = Math.max(...Object.values(fieldScores));
    const primaryField = Object.keys(fieldScores).find(
      (field) => fieldScores[field] === maxScore
    );

    return primaryField || resumeProfile.suggestedField || "computerScience";
  }

  analyzeSkillsForField(primaryField, userSkills) {
    const requiredSkills = this.skillsMapping[primaryField].coreSkills;

    // Find current skills that match the field requirements
    const matchedSkills = [];
    const unmatchedUserSkills = [];

    userSkills.forEach((userSkill) => {
      const matchedRequired = requiredSkills.find(
        (reqSkill) =>
          userSkill.toLowerCase().includes(reqSkill.toLowerCase()) ||
          reqSkill.toLowerCase().includes(userSkill.toLowerCase())
      );

      if (matchedRequired) {
        matchedSkills.push(matchedRequired);
      } else {
        unmatchedUserSkills.push(userSkill);
      }
    });

    // Find missing required skills
    const missingSkills = requiredSkills.filter(
      (skill) => !matchedSkills.includes(skill)
    );

    const skillMatchPercentage = (
      (matchedSkills.length / requiredSkills.length) *
      100
    ).toFixed(1);

    return {
      fieldRequiredSkills: requiredSkills,
      currentMatchedSkills: matchedSkills,
      missingSkills: missingSkills,
      additionalSkills: unmatchedUserSkills,
      skillMatchPercentage,
      recommendedSkills: missingSkills.slice(0, 8),
    };
  }

  getCareerPathRecommendations(primaryField, resumeProfile) {
    const careerPath = this.skillsMapping[primaryField].careerPath;
    const currentExperience = this.calculateExperienceLevel(resumeProfile);

    // Determine current level and next steps
    let currentLevel = careerPath[0]; // Default to entry level
    let nextLevel = careerPath[1];

    for (let i = 0; i < careerPath.length; i++) {
      if (
        currentExperience >=
        this.parseExperienceRange(careerPath[i].experience).min
      ) {
        currentLevel = careerPath[i];
        nextLevel = careerPath[i + 1] || null;
      }
    }

    return {
      allLevels: careerPath,
      currentLevel,
      nextLevel,
      estimatedExperience: currentExperience,
    };
  }

  calculateExperienceLevel(resumeProfile) {
    let totalExperience = 0;

    // Count work experience
    totalExperience += resumeProfile.experience.length * 1.5; // Assume 1.5 years per role

    // Count internships (less weight)
    totalExperience += resumeProfile.internships.length * 0.3;

    // Count significant projects
    totalExperience += Math.min(resumeProfile.projects.length * 0.2, 1);

    return Math.max(0, totalExperience);
  }

  parseExperienceRange(experienceStr) {
    if (experienceStr.includes("0-1")) return { min: 0, max: 1 };
    if (experienceStr.includes("2-4")) return { min: 2, max: 4 };
    if (experienceStr.includes("5-8")) return { min: 5, max: 8 };
    if (experienceStr.includes("8+")) return { min: 8, max: 15 };
    return { min: 0, max: 1 };
  }

  generateJobSearchLinks(primaryField, userLocation) {
    const fieldData = this.skillsMapping[primaryField];
    const jobTitles = fieldData.jobTitles;
    const locationFormatted =
      userLocation.charAt(0).toUpperCase() + userLocation.slice(1);

    const links = {
      naukri: jobTitles.map((title) => ({
        title: title,
        url: `https://www.naukri.com/${title
          .toLowerCase()
          .replace(/\s+/g, "-")}-jobs-in-${userLocation}?k=${encodeURIComponent(
          title
        )}&l=${userLocation}&experience=1`,
      })),
      linkedin: jobTitles.map((title) => ({
        title: title,
        url: `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(
          title
        )}&location=${encodeURIComponent(
          locationFormatted + ", India"
        )}&f_TPR=r604800`,
      })),
      indeed: jobTitles.map((title) => ({
        title: title,
        url: `https://in.indeed.com/jobs?q=${encodeURIComponent(
          title
        )}&l=${encodeURIComponent(locationFormatted)}&fromage=7`,
      })),
      foundit: jobTitles.map((title) => ({
        title: title,
        url: `https://www.foundit.in/srp/results?query=${encodeURIComponent(
          title
        )}&locations=${encodeURIComponent(locationFormatted)}`,
      })),
    };

    return links;
  }

  async getFieldSpecificJobs(primaryField, userSkills, userLocation) {
    console.log(
      "Fetching field-specific jobs for:",
      primaryField,
      "in",
      userLocation
    );

    const fieldData = this.skillsMapping[primaryField];
    const jobTitles = fieldData.jobTitles;

    // Generate realistic jobs based on field and location
    const jobs = [];

    for (let i = 0; i < jobTitles.length; i++) {
      const title = jobTitles[i];
      const jobsForTitle = this.generateJobsForTitle(
        title,
        primaryField,
        userLocation,
        userSkills
      );
      jobs.push(...jobsForTitle);
    }

    // Sort by skill match
    return jobs.sort((a, b) => b.skillMatch - a.skillMatch).slice(0, 20);
  }

  generateJobsForTitle(jobTitle, primaryField, location, userSkills) {
    const companies = this.getCompaniesForField(primaryField);
    const jobs = [];

    for (let i = 0; i < 3; i++) {
      const company = companies[Math.floor(Math.random() * companies.length)];
      const job = {
        id: `${primaryField}_${jobTitle}_${i}`,
        title: jobTitle,
        company: company.name,
        location: `${
          location.charAt(0).toUpperCase() + location.slice(1)
        }, India`,
        salary: this.generateSalaryForField(primaryField, jobTitle),
        description: `Join ${company.name} as a ${jobTitle} and work on cutting-edge ${primaryField} projects. We are looking for talented individuals to contribute to our growing team.`,
        requirements: this.generateRequirementsForField(primaryField),
        skills: this.skillsMapping[primaryField].coreSkills.slice(0, 5),
        skillMatch: this.calculateJobSkillMatch(
          this.skillsMapping[primaryField].coreSkills,
          userSkills
        ),
        applyUrl: `https://careers.${company.domain}`,
        linkedinLink: `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(
          jobTitle
        )}&location=${encodeURIComponent(location)}`,
        naukriLink: `https://www.naukri.com/${jobTitle
          .toLowerCase()
          .replace(/\s+/g, "-")}-jobs-in-${location}?k=${encodeURIComponent(
          jobTitle
        )}&l=${location}`,
        postedDate: this.generateRecentDate(),
        category: primaryField,
        source: "AI Career Navigator",
        experienceLevel: this.getExperienceLevelForTitle(jobTitle),
      };

      jobs.push(job);
    }

    return jobs;
  }

  getCompaniesForField(primaryField) {
    const companyMap = {
      ai: [
        { name: "Google India", domain: "google.com" },
        { name: "Microsoft India", domain: "microsoft.com" },
        { name: "Amazon", domain: "amazon.com" },
        { name: "Flipkart", domain: "flipkart.com" },
        { name: "Zomato", domain: "zomato.com" },
        { name: "BYJU'S", domain: "byjus.com" },
      ],
      dataScience: [
        { name: "Netflix India", domain: "netflix.com" },
        { name: "Uber", domain: "uber.com" },
        { name: "Ola", domain: "ola.com" },
        { name: "Paytm", domain: "paytm.com" },
        { name: "Swiggy", domain: "swiggy.com" },
      ],
      computerScience: [
        { name: "TCS", domain: "tcs.com" },
        { name: "Infosys", domain: "infosys.com" },
        { name: "Wipro", domain: "wipro.com" },
        { name: "HCL Technologies", domain: "hcl.com" },
        { name: "Accenture", domain: "accenture.com" },
      ],
      cyberSecurity: [
        { name: "IBM India", domain: "ibm.com" },
        { name: "Cisco", domain: "cisco.com" },
        { name: "Palo Alto Networks", domain: "paloaltonetworks.com" },
        { name: "FireEye", domain: "fireeye.com" },
      ],
    };

    return companyMap[primaryField] || companyMap.computerScience;
  }

  generateSalaryForField(primaryField, jobTitle) {
    const salaryMap = {
      ai: {
        "Artificial Intelligence Engineer": "₹15,00,000 - ₹35,00,000",
        "Machine Learning Engineer": "₹12,00,000 - ₹30,00,000",
        "AI Research Scientist": "₹20,00,000 - ₹50,00,000",
        "Computer Vision Engineer": "₹18,00,000 - ₹40,00,000",
        "NLP Engineer": "₹16,00,000 - ₹35,00,000",
      },
      dataScience: {
        "Data Scientist": "₹10,00,000 - ₹25,00,000",
        "Data Analyst": "₹6,00,000 - ₹15,00,000",
        "Business Intelligence Analyst": "₹8,00,000 - ₹18,00,000",
        "Data Engineer": "₹12,00,000 - ₹28,00,000",
      },
      computerScience: {
        "Software Engineer": "₹8,00,000 - ₹20,00,000",
        "Full Stack Developer": "₹7,00,000 - ₹18,00,000",
        "Backend Developer": "₹9,00,000 - ₹22,00,000",
        "Frontend Developer": "₹6,00,000 - ₹16,00,000",
      },
      cyberSecurity: {
        "Cybersecurity Analyst": "₹8,00,000 - ₹18,00,000",
        "Security Engineer": "₹10,00,000 - ₹25,00,000",
        "Ethical Hacker": "₹12,00,000 - ₹30,00,000",
      },
    };

    return salaryMap[primaryField]?.[jobTitle] || "₹6,00,000 - ₹15,00,000";
  }

  generateRequirementsForField(primaryField) {
    const requirementMap = {
      ai: "Strong background in Machine Learning, Python programming, and experience with AI frameworks like TensorFlow or PyTorch.",
      dataScience:
        "Proficiency in Python/R, SQL, statistical analysis, and data visualization tools like Tableau.",
      computerScience:
        "Strong programming skills in Java/Python/JavaScript, knowledge of software development lifecycle, and system design.",
      cyberSecurity:
        "Knowledge of network security, ethical hacking techniques, and security tools. Relevant certifications preferred.",
    };

    return (
      requirementMap[primaryField] ||
      "Strong technical skills and relevant experience in the field."
    );
  }

  getExperienceLevelForTitle(jobTitle) {
    if (
      jobTitle.toLowerCase().includes("senior") ||
      jobTitle.toLowerCase().includes("lead")
    )
      return "mid";
    if (
      jobTitle.toLowerCase().includes("junior") ||
      jobTitle.toLowerCase().includes("trainee")
    )
      return "entry";
    if (
      jobTitle.toLowerCase().includes("principal") ||
      jobTitle.toLowerCase().includes("director")
    )
      return "senior";
    return "entry";
  }

  calculateJobSkillMatch(jobSkills, userSkills) {
    if (!jobSkills || jobSkills.length === 0) return 0;

    const matches = jobSkills.filter((jobSkill) =>
      userSkills.some(
        (userSkill) =>
          userSkill.toLowerCase().includes(jobSkill.toLowerCase()) ||
          jobSkill.toLowerCase().includes(userSkill.toLowerCase())
      )
    );
    return Math.round((matches.length / jobSkills.length) * 100);
  }

  createLearningRoadmap(primaryField, skillGapAnalysis, resumeProfile) {
    const roadmap = {
      immediate: [],
      shortTerm: [],
      longTerm: [],
    };

    // Immediate (1-2 months): Focus on missing critical skills
    roadmap.immediate = skillGapAnalysis.missingSkills
      .slice(0, 3)
      .map((skill) => ({
        skill,
        priority: "High",
        timeframe: "1-2 months",
        resources: this.getResourcesForSkill(skill),
      }));

    // Short term (3-6 months): Build on foundation
    roadmap.shortTerm = skillGapAnalysis.missingSkills
      .slice(3, 6)
      .map((skill) => ({
        skill,
        priority: "Medium",
        timeframe: "3-6 months",
        resources: this.getResourcesForSkill(skill),
      }));

    // Long term (6+ months): Advanced skills
    const advancedSkills = this.getAdvancedSkillsForField(primaryField);
    roadmap.longTerm = advancedSkills.map((skill) => ({
      skill,
      priority: "Low",
      timeframe: "6+ months",
      resources: this.getResourcesForSkill(skill),
    }));

    return roadmap;
  }

  getAdvancedSkillsForField(primaryField) {
    const advancedSkillsMap = {
      ai: ["MLOps", "Model Deployment", "AI Ethics", "Reinforcement Learning"],
      dataScience: [
        "Big Data Technologies",
        "Advanced Statistics",
        "A/B Testing",
        "Data Engineering",
      ],
      computerScience: [
        "System Architecture",
        "Microservices",
        "DevOps",
        "Blockchain",
      ],
      cyberSecurity: [
        "Advanced Threat Detection",
        "Digital Forensics",
        "Compliance",
        "Security Architecture",
      ],
    };

    return advancedSkillsMap[primaryField] || [];
  }

  getResourcesForSkill(skill) {
    return [
      `Coursera: ${skill} Specialization`,
      `YouTube: ${skill} Tutorial Series`,
      `GitHub: ${skill} Projects`,
      `Documentation: Official ${skill} Docs`,
    ];
  }

  generateRecentDate() {
    const now = new Date();
    const daysAgo = Math.floor(Math.random() * 7) + 1;
    const date = new Date(now - daysAgo * 24 * 60 * 60 * 1000);
    return date.toISOString();
  }
}

// Initialize resume-based recommendations
document.addEventListener("DOMContentLoaded", function () {
  if (window.location.pathname.includes("recommendations.html")) {
    initializeResumeBasedRecommendations();
  }
});

async function initializeResumeBasedRecommendations() {
  showLoadingOverlay();

  try {
    console.log("Initializing resume-based recommendations...");

    const recommendationEngine = new ResumeBasedRecommendationEngine();
    const analysis =
      await recommendationEngine.analyzeResumeForCareerRecommendations();

    console.log("Resume-based analysis complete:", analysis);

    // Display all sections with resume-specific data
    displayResumeAnalysisSummary(analysis);
    displayResumeSkillsAnalysis(analysis);
    displayCareerPathRecommendations(analysis);
    displayJobSearchLinks(analysis);
    displayFieldSpecificJobs(analysis.jobRecommendations);
    displayLearningRoadmap(analysis);

    hideLoadingOverlay();

    // Store analysis globally
    window.resumeAnalysisData = analysis;
  } catch (error) {
    console.error("Error initializing resume-based recommendations:", error);
    hideLoadingOverlay();
    showError(
      error.message ||
        "Failed to generate recommendations. Please ensure you have uploaded a resume."
    );
  }
}

function displayResumeAnalysisSummary(analysis) {
  const primaryField = document.getElementById("primaryField");
  const skillMatch = document.getElementById("skillMatch");
  const jobOpportunities = document.getElementById("jobOpportunities");

  if (primaryField)
    primaryField.textContent = formatFieldName(analysis.primaryField);
  if (skillMatch)
    skillMatch.textContent =
      analysis.skillGapAnalysis.skillMatchPercentage + "%";
  if (jobOpportunities)
    jobOpportunities.textContent =
      analysis.jobRecommendations.length + " jobs in " + analysis.userLocation;

  // Update page title to show field-specific recommendations
  const pageTitle = document.querySelector(".page-title");
  if (pageTitle) {
    pageTitle.innerHTML = `
            <i class="fas fa-brain"></i>
            ${formatFieldName(analysis.primaryField)} Career Recommendations
        `;
  }

  const pageSubtitle = document.querySelector(".page-subtitle");
  if (pageSubtitle) {
    pageSubtitle.textContent = `Personalized career guidance based on your ${formatFieldName(
      analysis.primaryField
    )} background`;
  }
}

function displayResumeSkillsAnalysis(analysis) {
  const currentSkillsContainer = document.getElementById("currentSkills");
  const recommendedSkillsContainer =
    document.getElementById("recommendedSkills");
  const skillProgress = document.getElementById("skillProgress");
  const skillProgressText = document.getElementById("skillProgressText");
  const skillsCompleted = document.getElementById("skillsCompleted");
  const skillsTotal = document.getElementById("skillsTotal");

  console.log("Displaying resume skills analysis:", analysis.skillGapAnalysis);

  // Display current matched skills
  if (currentSkillsContainer) {
    const matchedSkills = analysis.skillGapAnalysis.currentMatchedSkills || [];

    if (matchedSkills.length > 0) {
      currentSkillsContainer.innerHTML = matchedSkills
        .map((skill) => `<span class="skill-tag current">${skill}</span>`)
        .join("");
    } else {
      currentSkillsContainer.innerHTML = `
                <div class="no-skills-message">
                    <i class="fas fa-info-circle"></i>
                    <p>No skills matching ${formatFieldName(
                      analysis.primaryField
                    )} were found in your resume.</p>
                    <p>Consider adding relevant skills to improve your profile.</p>
                </div>
            `;
    }

    document.getElementById("currentSkillsCount").textContent = `${
      matchedSkills.length
    } ${formatFieldName(analysis.primaryField)} skills found`;
  }

  // Display recommended skills
  if (recommendedSkillsContainer) {
    const recommendedSkills = analysis.skillGapAnalysis.recommendedSkills || [];

    if (recommendedSkills.length > 0) {
      recommendedSkillsContainer.innerHTML = recommendedSkills
        .map(
          (skill) =>
            `<span class="skill-tag recommended" onclick="addSkillToProfile('${skill}')">${skill}</span>`
        )
        .join("");
    } else {
      recommendedSkillsContainer.innerHTML = `
                <div class="no-skills-message">
                    <i class="fas fa-check-circle"></i>
                    <p>Excellent! You have most of the required ${formatFieldName(
                      analysis.primaryField
                    )} skills.</p>
                </div>
            `;
    }

    document.getElementById("recommendedSkillsCount").textContent = `${
      recommendedSkills.length
    } skills recommended for ${formatFieldName(analysis.primaryField)}`;
  }

  // Update progress bar
  const progressPercentage = parseFloat(
    analysis.skillGapAnalysis.skillMatchPercentage || 0
  );
  if (skillProgress) skillProgress.style.width = progressPercentage + "%";
  if (skillProgressText)
    skillProgressText.textContent = progressPercentage + "%";

  const completed = (analysis.skillGapAnalysis.currentMatchedSkills || [])
    .length;
  const total = (analysis.skillGapAnalysis.fieldRequiredSkills || []).length;

  if (skillsCompleted) skillsCompleted.textContent = completed;
  if (skillsTotal) skillsTotal.textContent = total;
}

function displayCareerPathRecommendations(analysis) {
  // Add career path section to the page
  const careerPathSection = document.createElement("div");
  careerPathSection.className = "recommendation-section";
  careerPathSection.innerHTML = `
        <div class="section-header">
            <h2><i class="fas fa-route"></i> ${formatFieldName(
              analysis.primaryField
            )} Career Path</h2>
            <p class="section-description">Your personalized career progression roadmap</p>
        </div>
        
        <div class="career-path-container">
            <div class="current-level">
                <h3>Your Current Level</h3>
                <div class="level-card current">
                    <div class="level-badge">${
                      analysis.careerPath.currentLevel.level
                    }</div>
                    <h4>${analysis.careerPath.currentLevel.level} Level</h4>
                    <p class="level-experience">${
                      analysis.careerPath.currentLevel.experience
                    }</p>
                    <div class="level-roles">
                        ${analysis.careerPath.currentLevel.roles
                          .map(
                            (role) => `<span class="role-tag">${role}</span>`
                          )
                          .join("")}
                    </div>
                </div>
            </div>
            
            ${
              analysis.careerPath.nextLevel
                ? `
                <div class="next-level">
                    <h3>Next Career Level</h3>
                    <div class="level-card next">
                        <div class="level-badge">${
                          analysis.careerPath.nextLevel.level
                        }</div>
                        <h4>${analysis.careerPath.nextLevel.level} Level</h4>
                        <p class="level-experience">${
                          analysis.careerPath.nextLevel.experience
                        }</p>
                        <div class="level-roles">
                            ${analysis.careerPath.nextLevel.roles
                              .map(
                                (role) =>
                                  `<span class="role-tag">${role}</span>`
                              )
                              .join("")}
                        </div>
                    </div>
                </div>
            `
                : ""
            }
            
            <div class="full-path">
                <h3>Complete ${formatFieldName(
                  analysis.primaryField
                )} Career Path</h3>
                <div class="path-timeline">
                    ${analysis.careerPath.allLevels
                      .map(
                        (level, index) => `
                        <div class="timeline-item ${
                          index <=
                          analysis.careerPath.allLevels.findIndex(
                            (l) =>
                              l.level === analysis.careerPath.currentLevel.level
                          )
                            ? "completed"
                            : ""
                        }">
                            <div class="timeline-marker">${index + 1}</div>
                            <div class="timeline-content">
                                <h4>${level.level} Level</h4>
                                <p>${level.experience}</p>
                                <div class="timeline-roles">
                                    ${level.roles
                                      .slice(0, 2)
                                      .map(
                                        (role) =>
                                          `<span class="role-tag small">${role}</span>`
                                      )
                                      .join("")}
                                </div>
                            </div>
                        </div>
                    `
                      )
                      .join("")}
                </div>
            </div>
        </div>
    `;

  // Insert after skills analysis section
  const skillsSection = document.querySelector(".recommendation-section");
  skillsSection.parentNode.insertBefore(
    careerPathSection,
    skillsSection.nextSibling
  );
}

function displayJobSearchLinks(analysis) {
  // Add job search links section
  const jobLinksSection = document.createElement("div");
  jobLinksSection.className = "recommendation-section";
  jobLinksSection.innerHTML = `
        <div class="section-header">
            <h2><i class="fas fa-link"></i> Job Search Links for ${formatFieldName(
              analysis.primaryField
            )}</h2>
            <p class="section-description">Direct links to ${formatFieldName(
              analysis.primaryField
            )} jobs in ${analysis.userLocation}</p>
        </div>
        
        <div class="job-links-container">
            <div class="job-portal">
                <h3><i class="fas fa-briefcase"></i> Naukri.com</h3>
                <div class="portal-links">
                    ${analysis.jobSearchLinks.naukri
                      .map(
                        (link) => `
                        <a href="${link.url}" target="_blank" class="job-search-link naukri">
                            <i class="fas fa-external-link-alt"></i>
                            ${link.title} jobs in ${analysis.userLocation}
                        </a>
                    `
                      )
                      .join("")}
                </div>
            </div>
            
            <div class="job-portal">
                <h3><i class="fab fa-linkedin"></i> LinkedIn</h3>
                <div class="portal-links">
                    ${analysis.jobSearchLinks.linkedin
                      .map(
                        (link) => `
                        <a href="${link.url}" target="_blank" class="job-search-link linkedin">
                            <i class="fas fa-external-link-alt"></i>
                            ${link.title} opportunities
                        </a>
                    `
                      )
                      .join("")}
                </div>
            </div>
            
            <div class="job-portal">
                <h3><i class="fas fa-globe"></i> Indeed</h3>
                <div class="portal-links">
                    ${analysis.jobSearchLinks.indeed
                      .map(
                        (link) => `
                        <a href="${link.url}" target="_blank" class="job-search-link indeed">
                            <i class="fas fa-external-link-alt"></i>
                            ${link.title} positions
                        </a>
                    `
                      )
                      .join("")}
                </div>
            </div>
        </div>
    `;

  // Insert before the jobs grid section
  const jobsSection = document.querySelector(
    ".recommendation-section:has(#jobsGrid)"
  );
  if (jobsSection) {
    jobsSection.parentNode.insertBefore(jobLinksSection, jobsSection);
  }
}

function displayFieldSpecificJobs(jobs) {
  const jobsGrid = document.getElementById("jobsGrid");
  if (!jobsGrid) return;

  if (!jobs || jobs.length === 0) {
    jobsGrid.innerHTML = `
            <div class="no-jobs-message">
                <i class="fas fa-briefcase"></i>
                <h3>No specific jobs found for your field</h3>
                <p>Try using the job search links above to find opportunities.</p>
            </div>
        `;
    return;
  }

  jobsGrid.innerHTML = jobs
    .map(
      (job) => `
        <div class="job-card field-specific-job" data-category="${
          job.category
        }" data-experience="${job.experienceLevel}">
            <div class="job-header">
                <h3 class="job-title">${job.title}</h3>
                <div class="job-company">${job.company}</div>
                <div class="job-field-badge">${formatFieldName(
                  job.category
                )}</div>
            </div>
            
            <div class="job-details">
                <div class="job-location">
                    <i class="fas fa-map-marker-alt"></i>
                    ${job.location}
                </div>
                <div class="job-salary">
                    <i class="fas fa-rupee-sign"></i>
                    ${job.salary}
                </div>
                <div class="job-match">
                    <i class="fas fa-percentage"></i>
                    ${job.skillMatch}% skill match
                </div>
                <div class="job-experience">
                    <i class="fas fa-user-tie"></i>
                    ${job.experienceLevel} level
                </div>
            </div>
            
            <div class="job-description">
                ${job.description}
            </div>
            
            <div class="job-requirements">
                <strong>Requirements:</strong> ${job.requirements}
            </div>
            
            <div class="job-skills">
                ${job.skills
                  .map(
                    (skill) =>
                      `<span class="skill-tag job-skill">${skill}</span>`
                  )
                  .join("")}
            </div>
            
            <div class="job-actions">
                <a href="${
                  job.applyUrl
                }" target="_blank" class="job-link apply-direct">
                    <i class="fas fa-paper-plane"></i> Apply Direct
                </a>
                <a href="${
                  job.naukriLink
                }" target="_blank" class="job-link naukri">
                    <i class="fas fa-briefcase"></i> View on Naukri
                </a>
                <a href="${
                  job.linkedinLink
                }" target="_blank" class="job-link linkedin">
                    <i class="fab fa-linkedin"></i> LinkedIn
                </a>
                <button class="job-link save-job" onclick="saveJobWithDetails('${
                  job.title
                }', '${job.company}', '${job.category}')">
                    <i class="fas fa-bookmark"></i> Save
                </button>
            </div>
        </div>
    `
    )
    .join("");
}

function displayLearningRoadmap(analysis) {
  // Add learning roadmap section
  const roadmapSection = document.createElement("div");
  roadmapSection.className = "recommendation-section";
  roadmapSection.innerHTML = `
        <div class="section-header">
            <h2><i class="fas fa-map-signs"></i> ${formatFieldName(
              analysis.primaryField
            )} Learning Roadmap</h2>
            <p class="section-description">Your personalized learning path to excel in ${formatFieldName(
              analysis.primaryField
            )}</p>
        </div>
        
        <div class="learning-roadmap-container">
            <div class="roadmap-phase">
                <h3><i class="fas fa-rocket"></i> Immediate Focus (1-2 months)</h3>
                <div class="phase-skills">
                    ${analysis.learningRoadmap.immediate
                      .map(
                        (item) => `
                        <div class="roadmap-skill-card priority-high">
                            <h4>${item.skill}</h4>
                            <div class="skill-meta">
                                <span class="priority ${item.priority.toLowerCase()}">${
                          item.priority
                        } Priority</span>
                                <span class="timeframe">${item.timeframe}</span>
                            </div>
                            <div class="skill-resources">
                                ${item.resources
                                  .map(
                                    (resource) =>
                                      `<a href="#" class="resource-link">${resource}</a>`
                                  )
                                  .join("")}
                            </div>
                        </div>
                    `
                      )
                      .join("")}
                </div>
            </div>
            
            <div class="roadmap-phase">
                <h3><i class="fas fa-chart-line"></i> Short Term (3-6 months)</h3>
                <div class="phase-skills">
                    ${analysis.learningRoadmap.shortTerm
                      .map(
                        (item) => `
                        <div class="roadmap-skill-card priority-medium">
                            <h4>${item.skill}</h4>
                            <div class="skill-meta">
                                <span class="priority ${item.priority.toLowerCase()}">${
                          item.priority
                        } Priority</span>
                                <span class="timeframe">${item.timeframe}</span>
                            </div>
                            <div class="skill-resources">
                                ${item.resources
                                  .map(
                                    (resource) =>
                                      `<a href="#" class="resource-link">${resource}</a>`
                                  )
                                  .join("")}
                            </div>
                        </div>
                    `
                      )
                      .join("")}
                </div>
            </div>
            
            <div class="roadmap-phase">
                <h3><i class="fas fa-trophy"></i> Long Term (6+ months)</h3>
                <div class="phase-skills">
                    ${analysis.learningRoadmap.longTerm
                      .map(
                        (item) => `
                        <div class="roadmap-skill-card priority-low">
                            <h4>${item.skill}</h4>
                            <div class="skill-meta">
                                <span class="priority ${item.priority.toLowerCase()}">${
                          item.priority
                        } Priority</span>
                                <span class="timeframe">${item.timeframe}</span>
                            </div>
                            <div class="skill-resources">
                                ${item.resources
                                  .map(
                                    (resource) =>
                                      `<a href="#" class="resource-link">${resource}</a>`
                                  )
                                  .join("")}
                            </div>
                        </div>
                    `
                      )
                      .join("")}
                </div>
            </div>
        </div>
    `;

  // Insert at the end
  const lastSection = document.querySelector(
    ".recommendation-section:last-child"
  );
  lastSection.parentNode.appendChild(roadmapSection);
}

// Enhanced helper functions
function saveJobWithDetails(title, company, category) {
  const savedJobs = JSON.parse(localStorage.getItem("savedJobs") || "[]");
  const jobData = {
    title,
    company,
    category,
    savedAt: new Date().toISOString(),
    field: formatFieldName(category),
  };

  if (
    !savedJobs.find((job) => job.title === title && job.company === company)
  ) {
    savedJobs.push(jobData);
    localStorage.setItem("savedJobs", JSON.stringify(savedJobs));
    showSuccess(
      `Saved ${title} at ${company} to your ${formatFieldName(
        category
      )} jobs list`
    );
  } else {
    showSuccess("Job already saved!");
  }
}

function formatFieldName(field) {
  const fieldMap = {
    ai: "Artificial Intelligence",
    dataScience: "Data Science",
    computerScience: "Computer Science",
    cyberSecurity: "Cybersecurity",
  };
  return fieldMap[field] || field;
}

// Loading and error handling functions remain the same...
function showLoadingOverlay() {
  const overlay = document.getElementById("loadingOverlay");
  if (overlay) {
    overlay.style.display = "flex";

    let progress = 0;
    const progressBar = document.getElementById("loadingProgress");
    const loadingText = document.getElementById("loadingText");

    const loadingSteps = [
      "Analyzing your uploaded resume...",
      "Identifying your career field...",
      "Matching skills with industry requirements...",
      "Finding relevant job opportunities...",
      "Creating personalized career roadmap...",
    ];

    const interval = setInterval(() => {
      progress += 20;
      if (progressBar) progressBar.style.width = progress + "%";

      const stepIndex = Math.floor(progress / 20) - 1;
      if (stepIndex >= 0 && stepIndex < loadingSteps.length && loadingText) {
        loadingText.textContent = loadingSteps[stepIndex];
      }

      if (progress >= 100) {
        clearInterval(interval);
      }
    }, 1000);
  }
}

function hideLoadingOverlay() {
  const overlay = document.getElementById("loadingOverlay");
  if (overlay) {
    overlay.style.display = "none";
  }
}

function showSuccess(message) {
  const toast = document.createElement("div");
  toast.className = "toast success";
  toast.innerHTML = `
        <div class="toast-content">
            <i class="fas fa-check-circle"></i>
            <span>${message}</span>
        </div>
    `;
  document.body.appendChild(toast);

  setTimeout(() => toast.classList.add("show"), 100);
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

function showError(message) {
  const toast = document.createElement("div");
  toast.className = "toast error";
  toast.innerHTML = `
        <div class="toast-content">
            <i class="fas fa-exclamation-circle"></i>
            <span>${message}</span>
        </div>
    `;
  document.body.appendChild(toast);

  setTimeout(() => toast.classList.add("show"), 100);
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

console.log("Resume-Based Career Recommendation Engine loaded");
