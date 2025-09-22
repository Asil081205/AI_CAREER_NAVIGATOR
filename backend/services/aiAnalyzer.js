const axios = require("axios");

class AIAnalyzer {
  constructor() {
    this.openaiApiKey = process.env.OPENAI_API_KEY;
    this.geminiApiKey = process.env.GEMINI_API_KEY;

    // Career paths database
    this.careerPaths = {
      ai: {
        entry: ["Junior AI Developer", "ML Intern", "Data Analyst"],
        mid: ["AI Engineer", "ML Engineer", "Computer Vision Engineer"],
        senior: ["Senior AI Engineer", "AI Architect", "Head of AI"],
        skills: [
          "Python",
          "TensorFlow",
          "PyTorch",
          "Machine Learning",
          "Deep Learning",
        ],
        certifications: [
          "Google Cloud ML",
          "AWS ML Specialty",
          "TensorFlow Developer",
        ],
      },
      dataScience: {
        entry: [
          "Junior Data Analyst",
          "Data Science Intern",
          "Business Analyst",
        ],
        mid: ["Data Scientist", "Senior Data Analyst", "ML Engineer"],
        senior: [
          "Principal Data Scientist",
          "Data Science Manager",
          "Chief Data Officer",
        ],
        skills: ["Python", "R", "SQL", "Statistics", "Tableau", "Pandas"],
        certifications: [
          "Google Data Analytics",
          "Microsoft Azure Data Scientist",
          "Tableau Certified",
        ],
      },
      computerScience: {
        entry: ["Junior Developer", "Software Intern", "Frontend Developer"],
        mid: ["Software Engineer", "Full Stack Developer", "Backend Developer"],
        senior: ["Senior Engineer", "Tech Lead", "Engineering Manager"],
        skills: [
          "JavaScript",
          "Python",
          "Java",
          "React",
          "Node.js",
          "System Design",
        ],
        certifications: [
          "AWS Solutions Architect",
          "Google Cloud Developer",
          "Microsoft Azure Developer",
        ],
      },
      cyberSecurity: {
        entry: [
          "Security Analyst Intern",
          "IT Security Specialist",
          "Junior Cyber Analyst",
        ],
        mid: [
          "Cybersecurity Analyst",
          "Security Engineer",
          "Penetration Tester",
        ],
        senior: ["Security Architect", "CISO", "Cybersecurity Manager"],
        skills: [
          "Network Security",
          "Ethical Hacking",
          "CISSP",
          "Linux",
          "Python",
        ],
        certifications: ["CISSP", "CEH", "CISM", "CompTIA Security+"],
      },
    };
  }

  async analyzeCareerPath(userProfile) {
    try {
      const field = this.determineField(userProfile);
      const currentLevel = this.assessExperienceLevel(userProfile);
      const skillGaps = this.analyzeSkillGaps(userProfile, field);
      const recommendations = this.generateRecommendations(
        field,
        currentLevel,
        skillGaps
      );

      return {
        primaryField: field,
        currentLevel,
        careerPath: this.careerPaths[field],
        skillGaps,
        recommendations,
        confidenceScore: this.calculateConfidenceScore(userProfile),
        nextSteps: this.generateNextSteps(field, currentLevel, skillGaps),
      };
    } catch (error) {
      console.error("Career path analysis error:", error);
      throw error;
    }
  }

  determineField(userProfile) {
    const { education, skills, interests, experience } = userProfile;
    const degree = education?.degree?.toLowerCase() || "";
    const userSkills = skills?.map((s) => s.toLowerCase()) || [];
    const userInterests = interests?.map((i) => i.toLowerCase()) || [];

    // Score each field based on profile
    const fieldScores = {};

    Object.keys(this.careerPaths).forEach((field) => {
      let score = 0;
      const fieldSkills = this.careerPaths[field].skills.map((s) =>
        s.toLowerCase()
      );

      // Education alignment (40% weight)
      if (
        field === "ai" &&
        (degree.includes("ai") || degree.includes("artificial intelligence"))
      )
        score += 40;
      else if (
        field === "dataScience" &&
        (degree.includes("data") || degree.includes("statistics"))
      )
        score += 40;
      else if (
        field === "cyberSecurity" &&
        (degree.includes("cyber") || degree.includes("security"))
      )
        score += 40;
      else if (
        field === "computerScience" &&
        (degree.includes("computer") || degree.includes("software"))
      )
        score += 40;
      else score += 10; // Base education score

      // Skills alignment (35% weight)
      const skillMatches = userSkills.filter((skill) =>
        fieldSkills.some((fs) => fs.includes(skill) || skill.includes(fs))
      );
      score += (skillMatches.length / Math.max(userSkills.length, 1)) * 35;

      // Interest alignment (25% weight)
      const interestMatches = userInterests.filter((interest) => {
        if (field === "ai")
          return (
            interest.includes("ai") ||
            interest.includes("machine learning") ||
            interest.includes("ml")
          );
        if (field === "dataScience")
          return interest.includes("data") || interest.includes("analytics");
        if (field === "cyberSecurity")
          return interest.includes("security") || interest.includes("cyber");
        if (field === "computerScience")
          return (
            interest.includes("software") ||
            interest.includes("web") ||
            interest.includes("mobile")
          );
        return false;
      });
      score +=
        (interestMatches.length / Math.max(userInterests.length, 1)) * 25;

      fieldScores[field] = score;
    });

    // Return field with highest score
    return Object.keys(fieldScores).reduce((a, b) =>
      fieldScores[a] > fieldScores[b] ? a : b
    );
  }

  assessExperienceLevel(userProfile) {
    const { experience, education, internships } = userProfile;

    let totalExperience = 0;

    // Calculate total experience from work history
    if (experience && Array.isArray(experience)) {
      experience.forEach((exp) => {
        if (exp.duration) {
          const years = this.parseDurationToYears(exp.duration);
          totalExperience += years;
        }
      });
    }

    // Add internship experience (weighted at 0.5)
    if (internships && Array.isArray(internships)) {
      internships.forEach((intern) => {
        if (intern.duration) {
          const years = this.parseDurationToYears(intern.duration);
          totalExperience += years * 0.5;
        }
      });
    }

    // Determine level
    if (totalExperience < 1) return "entry";
    if (totalExperience < 4) return "mid";
    return "senior";
  }

  parseDurationToYears(duration) {
    // Parse duration strings like "Jan 2023 - Dec 2023" or "6 months"
    if (duration.includes("month")) {
      const months = parseInt(duration.match(/\d+/)?.[0] || "0");
      return months / 12;
    }

    if (duration.includes("year")) {
      return parseInt(duration.match(/\d+/)?.[0] || "0");
    }

    // Try to parse date ranges
    const datePattern = /(\w{3,4}\s+\d{4})\s*-\s*(\w{3,4}\s+\d{4})/i;
    const match = duration.match(datePattern);

    if (match) {
      try {
        const start = new Date(match[1]);
        const end = new Date(match[2]);
        const diffTime = Math.abs(end - start);
        return diffTime / (1000 * 60 * 60 * 24 * 365.25); // Convert to years
      } catch (error) {
        return 0;
      }
    }

    return 1; // Default to 1 year if can't parse
  }

  analyzeSkillGaps(userProfile, field) {
    const userSkills = userProfile.skills?.map((s) => s.toLowerCase()) || [];
    const requiredSkills =
      this.careerPaths[field]?.skills.map((s) => s.toLowerCase()) || [];

    const presentSkills = [];
    const missingSkills = [];

    requiredSkills.forEach((skill) => {
      const hasSkill = userSkills.some(
        (us) => us.includes(skill) || skill.includes(us)
      );

      if (hasSkill) {
        presentSkills.push(skill);
      } else {
        missingSkills.push(skill);
      }
    });

    const skillCoverage = (presentSkills.length / requiredSkills.length) * 100;

    return {
      presentSkills,
      missingSkills,
      skillCoverage: Math.round(skillCoverage),
      prioritySkills: this.prioritizeMissingSkills(missingSkills, field),
      additionalSkills: this.suggestAdditionalSkills(userSkills, field),
    };
  }

  prioritizeMissingSkills(missingSkills, field) {
    // Priority mapping for each field
    const priorities = {
      ai: {
        python: "critical",
        "machine learning": "critical",
        tensorflow: "high",
        pytorch: "high",
        "deep learning": "medium",
      },
      dataScience: {
        python: "critical",
        sql: "critical",
        statistics: "critical",
        pandas: "high",
        tableau: "medium",
      },
      computerScience: {
        javascript: "critical",
        python: "high",
        react: "high",
        "system design": "medium",
      },
      cyberSecurity: {
        "network security": "critical",
        linux: "critical",
        "ethical hacking": "high",
        python: "medium",
      },
    };

    const fieldPriorities = priorities[field] || {};

    return missingSkills
      .map((skill) => ({
        skill,
        priority: fieldPriorities[skill] || "low",
        learningTime: this.estimateLearningTime(skill),
        resources: this.suggestLearningResources(skill),
      }))
      .sort((a, b) => {
        const priorityOrder = { critical: 3, high: 2, medium: 1, low: 0 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      });
  }

  estimateLearningTime(skill) {
    const timeEstimates = {
      python: "2-3 months",
      javascript: "2-3 months",
      "machine learning": "4-6 months",
      "deep learning": "6-8 months",
      sql: "1-2 months",
      react: "2-4 months",
      "system design": "6-12 months",
      "network security": "3-6 months",
      "ethical hacking": "6-12 months",
    };

    return timeEstimates[skill.toLowerCase()] || "2-4 months";
  }

  suggestLearningResources(skill) {
    const resources = {
      python: [
        "Python.org official tutorial",
        "Codecademy Python Course",
        "Automate the Boring Stuff with Python",
      ],
      "machine learning": [
        "Coursera Machine Learning Course",
        "Kaggle Learn",
        "Fast.ai Practical Deep Learning",
      ],
      javascript: ["MDN Web Docs", "freeCodeCamp", "JavaScript.info"],
      react: [
        "React Official Documentation",
        "Create React App",
        "React Tutorial by Robin Wieruch",
      ],
      sql: ["W3Schools SQL Tutorial", "SQLBolt", "HackerRank SQL Practice"],
    };

    return (
      resources[skill.toLowerCase()] || [
        "Google search",
        "YouTube tutorials",
        "Online courses",
      ]
    );
  }

  suggestAdditionalSkills(userSkills, field) {
    const complementarySkills = {
      ai: ["Docker", "Kubernetes", "MLOps", "Cloud Platforms", "Git"],
      dataScience: ["Excel", "Power BI", "Spark", "Hadoop", "NoSQL"],
      computerScience: ["Docker", "AWS", "Testing", "CI/CD", "Agile"],
      cyberSecurity: [
        "Cloud Security",
        "Compliance",
        "Risk Assessment",
        "Forensics",
        "SIEM",
      ],
    };

    const suggestions = complementarySkills[field] || [];
    const userSkillsLower = userSkills.map((s) => s.toLowerCase());

    return suggestions.filter(
      (skill) => !userSkillsLower.some((us) => us.includes(skill.toLowerCase()))
    );
  }

  generateRecommendations(field, currentLevel, skillGaps) {
    const recommendations = [];

    // Skill development recommendations
    if (skillGaps.missingSkills.length > 0) {
      recommendations.push({
        type: "skill_development",
        priority: "high",
        title: "Focus on Critical Skills",
        description: `Develop ${skillGaps.prioritySkills
          .slice(0, 3)
          .map((s) => s.skill)
          .join(", ")} to improve your marketability`,
        actionItems: skillGaps.prioritySkills
          .slice(0, 3)
          .map((s) => `Learn ${s.skill} (${s.learningTime})`),
      });
    }

    // Career advancement recommendations
    const careerPath = this.careerPaths[field];
    const nextLevelRoles = this.getNextLevelRoles(currentLevel, careerPath);

    if (nextLevelRoles.length > 0) {
      recommendations.push({
        type: "career_advancement",
        priority: "medium",
        title: "Career Progression Opportunities",
        description: "Consider these roles for your next career step",
        actionItems: nextLevelRoles.slice(0, 3),
      });
    }

    // Certification recommendations
    if (careerPath.certifications) {
      recommendations.push({
        type: "certification",
        priority: "medium",
        title: "Professional Certifications",
        description: "These certifications can boost your credentials",
        actionItems: careerPath.certifications.slice(0, 2),
      });
    }

    // Project recommendations
    recommendations.push({
      type: "projects",
      priority: "high",
      title: "Build Portfolio Projects",
      description: "Create projects to demonstrate your skills",
      actionItems: this.suggestProjects(field, skillGaps.presentSkills),
    });

    return recommendations;
  }

  getNextLevelRoles(currentLevel, careerPath) {
    const levelMap = {
      entry: careerPath.mid || [],
      mid: careerPath.senior || [],
      senior: ["Leadership roles", "Consulting", "Entrepreneurship"],
    };

    return levelMap[currentLevel] || [];
  }

  suggestProjects(field, presentSkills) {
    const projectSuggestions = {
      ai: [
        "Build a chatbot using NLP",
        "Create an image classifier",
        "Develop a recommendation system",
      ],
      dataScience: [
        "Analyze a public dataset",
        "Build a predictive model",
        "Create an interactive dashboard",
      ],
      computerScience: [
        "Build a full-stack web application",
        "Create a mobile app",
        "Contribute to open source projects",
      ],
      cyberSecurity: [
        "Set up a home lab for penetration testing",
        "Perform a security audit",
        "Build a network monitoring tool",
      ],
    };

    return (
      projectSuggestions[field] || [
        "Build a portfolio website",
        "Complete coding challenges",
      ]
    );
  }

  generateNextSteps(field, currentLevel, skillGaps) {
    const steps = [];

    // Immediate steps (1-3 months)
    if (skillGaps.prioritySkills.length > 0) {
      const topSkill = skillGaps.prioritySkills[0];
      steps.push({
        timeframe: "immediate",
        action: `Start learning ${topSkill.skill}`,
        description: `Dedicate 1-2 hours daily to learning ${topSkill.skill}`,
        resources: topSkill.resources.slice(0, 2),
      });
    }

    // Short-term steps (3-6 months)
    steps.push({
      timeframe: "short_term",
      action: "Build a portfolio project",
      description: `Create a project that demonstrates your ${field} skills`,
      resources: ["GitHub", "Personal website", "LinkedIn portfolio"],
    });

    // Long-term steps (6-12 months)
    const careerPath = this.careerPaths[field];
    if (careerPath.certifications && careerPath.certifications.length > 0) {
      steps.push({
        timeframe: "long_term",
        action: `Pursue ${careerPath.certifications[0]} certification`,
        description: "Professional certification to validate your expertise",
        resources: [
          "Official certification guides",
          "Practice exams",
          "Study groups",
        ],
      });
    }

    return steps;
  }

  calculateConfidenceScore(userProfile) {
    let score = 0;
    let factors = 0;

    // Education factor (25%)
    if (userProfile.education?.degree) {
      score += 25;
      factors++;
    }

    // Skills factor (30%)
    if (userProfile.skills && userProfile.skills.length >= 3) {
      score += 30;
      factors++;
    }

    // Experience factor (25%)
    if (userProfile.experience && userProfile.experience.length > 0) {
      score += 25;
      factors++;
    }

    // Interests factor (20%)
    if (userProfile.interests && userProfile.interests.length > 0) {
      score += 20;
      factors++;
    }

    return Math.round(score / Math.max(factors, 1));
  }

  // AI-powered analysis using external APIs
  async getAIInsights(userProfile) {
    if (!this.openaiApiKey) {
      return this.generateMockInsights(userProfile);
    }

    try {
      const prompt = this.buildAIPrompt(userProfile);

      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content:
                "You are a career counselor AI that provides personalized career advice based on user profiles.",
            },
            {
              role: "user",
              content: prompt,
            },
          ],
          max_tokens: 500,
          temperature: 0.7,
        },
        {
          headers: {
            Authorization: `Bearer ${this.openaiApiKey}`,
            "Content-Type": "application/json",
          },
        }
      );

      return {
        insights: response.data.choices[0].message.content,
        source: "openai",
        confidence: 0.9,
      };
    } catch (error) {
      console.error("OpenAI API error:", error);
      return this.generateMockInsights(userProfile);
    }
  }

  buildAIPrompt(userProfile) {
    return `Analyze this career profile and provide personalized insights:
        
        Education: ${userProfile.education?.degree || "Not specified"} from ${
      userProfile.education?.institution || "Not specified"
    }
        Skills: ${userProfile.skills?.join(", ") || "Not specified"}
        Experience: ${
          userProfile.experience
            ?.map((exp) => `${exp.role} at ${exp.company}`)
            .join(", ") || "Not specified"
        }
        Interests: ${userProfile.interests?.join(", ") || "Not specified"}
        
        Please provide:
        1. Career field recommendation
        2. Top 3 skills to develop
        3. Potential career paths
        4. Key next steps
        
        Keep the response concise and actionable.`;
  }

  generateMockInsights(userProfile) {
    return {
      insights: `Based on your profile, you show strong potential in technology. Focus on developing your technical skills and building a portfolio of projects. Consider pursuing certifications in your field of interest to enhance your credentials.`,
      source: "mock",
      confidence: 0.7,
    };
  }
}

module.exports = AIAnalyzer;
