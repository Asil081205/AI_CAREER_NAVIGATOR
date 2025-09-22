class SkillsMapping {
  constructor() {
    // Comprehensive skills database organized by categories and fields
    this.skillsDatabase = {
      // Programming Languages
      languages: {
        web: ["JavaScript", "TypeScript", "HTML", "CSS", "PHP", "Ruby"],
        mobile: ["Swift", "Kotlin", "Java", "Dart", "React Native", "Flutter"],
        backend: ["Python", "Java", "C#", "Go", "Rust", "Scala", "Node.js"],
        systems: ["C", "C++", "Rust", "Assembly", "Go"],
        data: ["Python", "R", "SQL", "Scala", "Julia", "MATLAB"],
        ai: ["Python", "R", "Java", "C++", "Julia"],
        functional: ["Haskell", "Clojure", "F#", "Erlang", "Elixir"],
      },

      // Frameworks and Libraries
      frameworks: {
        web: {
          frontend: [
            "React",
            "Angular",
            "Vue.js",
            "Svelte",
            "Next.js",
            "Nuxt.js",
          ],
          backend: [
            "Django",
            "Flask",
            "FastAPI",
            "Express.js",
            "NestJS",
            "Spring Boot",
            "ASP.NET",
          ],
          css: [
            "Bootstrap",
            "Tailwind CSS",
            "Material-UI",
            "Bulma",
            "Foundation",
          ],
        },
        mobile: ["React Native", "Flutter", "Ionic", "Xamarin", "Cordova"],
        ai: [
          "TensorFlow",
          "PyTorch",
          "Keras",
          "Scikit-learn",
          "OpenCV",
          "Hugging Face",
        ],
        data: ["Pandas", "NumPy", "Matplotlib", "Seaborn", "Plotly", "D3.js"],
      },

      // Databases
      databases: {
        relational: ["MySQL", "PostgreSQL", "SQL Server", "Oracle", "SQLite"],
        nosql: ["MongoDB", "Cassandra", "Redis", "DynamoDB", "CouchDB"],
        graph: ["Neo4j", "Amazon Neptune", "ArangoDB"],
        timeseries: ["InfluxDB", "TimescaleDB"],
        search: ["Elasticsearch", "Solr", "Algolia"],
      },

      // Cloud and DevOps
      cloud: {
        platforms: [
          "AWS",
          "Azure",
          "Google Cloud",
          "IBM Cloud",
          "DigitalOcean",
        ],
        containers: ["Docker", "Kubernetes", "OpenShift", "Podman"],
        cicd: [
          "Jenkins",
          "GitLab CI",
          "GitHub Actions",
          "CircleCI",
          "Travis CI",
        ],
        monitoring: ["Prometheus", "Grafana", "New Relic", "DataDog", "Splunk"],
        iac: ["Terraform", "CloudFormation", "Ansible", "Puppet", "Chef"],
      },

      // Field-specific skills
      fields: {
        ai: {
          core: [
            "Machine Learning",
            "Deep Learning",
            "Neural Networks",
            "Computer Vision",
            "NLP",
          ],
          algorithms: [
            "Supervised Learning",
            "Unsupervised Learning",
            "Reinforcement Learning",
            "Transfer Learning",
          ],
          tools: [
            "TensorFlow",
            "PyTorch",
            "Keras",
            "OpenCV",
            "NLTK",
            "spaCy",
            "Hugging Face",
          ],
          math: [
            "Linear Algebra",
            "Statistics",
            "Probability",
            "Calculus",
            "Optimization",
          ],
        },
        dataScience: {
          core: [
            "Data Analysis",
            "Statistical Modeling",
            "Data Visualization",
            "Predictive Analytics",
          ],
          tools: [
            "Pandas",
            "NumPy",
            "Matplotlib",
            "Seaborn",
            "Tableau",
            "Power BI",
            "Jupyter",
          ],
          methods: [
            "A/B Testing",
            "Hypothesis Testing",
            "Regression Analysis",
            "Time Series Analysis",
          ],
          bigdata: ["Spark", "Hadoop", "Kafka", "Airflow", "Databricks"],
        },
        cyberSecurity: {
          core: [
            "Network Security",
            "Information Security",
            "Risk Assessment",
            "Incident Response",
          ],
          tools: [
            "Wireshark",
            "Metasploit",
            "Nmap",
            "Burp Suite",
            "SIEM",
            "IDS/IPS",
          ],
          practices: [
            "Penetration Testing",
            "Vulnerability Assessment",
            "Security Auditing",
            "Forensics",
          ],
          compliance: ["GDPR", "HIPAA", "SOX", "PCI DSS", "ISO 27001"],
          certifications: ["CISSP", "CEH", "CISM", "CompTIA Security+", "OSCP"],
        },
        webDevelopment: {
          frontend: ["HTML", "CSS", "JavaScript", "React", "Angular", "Vue.js"],
          backend: ["Node.js", "Python", "Java", "PHP", "Ruby", "C#"],
          tools: ["Git", "Webpack", "Gulp", "Sass", "Less", "TypeScript"],
          testing: ["Jest", "Cypress", "Selenium", "Mocha", "Jasmine"],
        },
        mobileDevelopment: {
          native: {
            ios: ["Swift", "Objective-C", "Xcode", "iOS SDK", "Core Data"],
            android: [
              "Kotlin",
              "Java",
              "Android Studio",
              "Android SDK",
              "Room",
            ],
          },
          crossPlatform: [
            "React Native",
            "Flutter",
            "Xamarin",
            "Ionic",
            "Cordova",
          ],
          tools: ["Git", "Firebase", "Fastlane", "Appium"],
        },
      },

      // Soft skills by importance
      softSkills: {
        communication: [
          "Written Communication",
          "Verbal Communication",
          "Presentation Skills",
          "Technical Writing",
        ],
        leadership: [
          "Team Leadership",
          "Project Management",
          "Mentoring",
          "Decision Making",
        ],
        collaboration: [
          "Teamwork",
          "Cross-functional Collaboration",
          "Agile Methodology",
          "Scrum",
        ],
        problemSolving: [
          "Analytical Thinking",
          "Creative Problem Solving",
          "Troubleshooting",
          "Critical Thinking",
        ],
        adaptability: [
          "Learning Agility",
          "Flexibility",
          "Change Management",
          "Continuous Learning",
        ],
        technical: [
          "System Design",
          "Architecture",
          "Code Review",
          "Documentation",
        ],
      },
    };

    // Skill difficulty and learning time estimates
    this.skillMetadata = {
      Python: {
        difficulty: "beginner",
        learningTime: "2-3 months",
        category: "language",
      },
      JavaScript: {
        difficulty: "beginner",
        learningTime: "2-4 months",
        category: "language",
      },
      React: {
        difficulty: "intermediate",
        learningTime: "3-6 months",
        category: "framework",
      },
      "Machine Learning": {
        difficulty: "advanced",
        learningTime: "6-12 months",
        category: "field",
      },
      Docker: {
        difficulty: "intermediate",
        learningTime: "2-4 months",
        category: "tool",
      },
      AWS: {
        difficulty: "intermediate",
        learningTime: "4-8 months",
        category: "platform",
      },
      SQL: {
        difficulty: "beginner",
        learningTime: "1-2 months",
        category: "query-language",
      },
      Git: {
        difficulty: "beginner",
        learningTime: "1 month",
        category: "tool",
      },
    };

    // Industry demand scores (1-10)
    this.demandScores = {
      Python: 9,
      JavaScript: 10,
      React: 9,
      Java: 8,
      SQL: 9,
      AWS: 8,
      Docker: 7,
      "Machine Learning": 8,
      "Node.js": 7,
      Git: 9,
    };
  }

  // Get skill recommendations based on field and current skills
  getSkillRecommendations({ degree, currentSkills = [], interests = [] }) {
    const field = this.determineField(degree, interests);
    const fieldSkills = this.getFieldSkills(field);
    const currentSkillsLower = currentSkills.map((s) => s.toLowerCase());

    // Find missing skills
    const missingSkills = fieldSkills.filter(
      (skill) =>
        !currentSkillsLower.some(
          (current) =>
            current.includes(skill.toLowerCase()) ||
            skill.toLowerCase().includes(current)
        )
    );

    // Prioritize skills
    const prioritizedSkills = this.prioritizeSkills(missingSkills, field);

    // Get complementary skills
    const complementarySkills = this.getComplementarySkills(
      currentSkills,
      field
    );

    return {
      field,
      currentSkills,
      recommendations: {
        critical: prioritizedSkills
          .filter((s) => s.priority === "critical")
          .slice(0, 3),
        high: prioritizedSkills
          .filter((s) => s.priority === "high")
          .slice(0, 5),
        medium: prioritizedSkills
          .filter((s) => s.priority === "medium")
          .slice(0, 5),
      },
      complementary: complementarySkills.slice(0, 5),
      learningPath: this.generateLearningPath(
        prioritizedSkills.slice(0, 8),
        field
      ),
    };
  }

  determineField(degree, interests) {
    const degreeStr = degree?.toLowerCase() || "";
    const interestStrs = interests.map((i) => i.toLowerCase());

    // Field mapping based on degree
    const fieldMappings = {
      ai: ["ai", "artificial intelligence", "machine learning", "ml"],
      dataScience: ["data science", "ds", "statistics", "analytics"],
      cyberSecurity: ["cyber", "security", "information security"],
      webDevelopment: ["web", "full stack", "frontend", "backend"],
      mobileDevelopment: ["mobile", "android", "ios", "app development"],
      computerScience: ["computer science", "cs", "software", "programming"],
    };

    // Check degree first
    for (const [field, keywords] of Object.entries(fieldMappings)) {
      if (keywords.some((keyword) => degreeStr.includes(keyword))) {
        return field;
      }
    }

    // Check interests
    for (const [field, keywords] of Object.entries(fieldMappings)) {
      if (
        interestStrs.some((interest) =>
          keywords.some((keyword) => interest.includes(keyword))
        )
      ) {
        return field;
      }
    }

    return "computerScience"; // Default
  }

  getFieldSkills(field) {
    const fieldSkillMap = {
      ai: [
        "Python",
        "Machine Learning",
        "TensorFlow",
        "PyTorch",
        "Deep Learning",
        "Neural Networks",
        "Computer Vision",
        "NLP",
        "Scikit-learn",
        "NumPy",
        "Pandas",
        "Matplotlib",
        "Statistics",
        "Linear Algebra",
      ],
      dataScience: [
        "Python",
        "R",
        "SQL",
        "Statistics",
        "Pandas",
        "NumPy",
        "Matplotlib",
        "Seaborn",
        "Tableau",
        "Power BI",
        "Jupyter",
        "Machine Learning",
        "Data Visualization",
        "Statistical Modeling",
        "A/B Testing",
      ],
      cyberSecurity: [
        "Network Security",
        "Information Security",
        "Ethical Hacking",
        "Penetration Testing",
        "Linux",
        "Python",
        "Wireshark",
        "Metasploit",
        "CISSP",
        "CEH",
        "Risk Assessment",
        "Incident Response",
        "Cryptography",
      ],
      webDevelopment: [
        "HTML",
        "CSS",
        "JavaScript",
        "React",
        "Node.js",
        "Express.js",
        "MongoDB",
        "SQL",
        "Git",
        "REST APIs",
        "TypeScript",
        "Webpack",
        "Bootstrap",
        "Responsive Design",
        "Testing",
      ],
      mobileDevelopment: [
        "Swift",
        "Kotlin",
        "React Native",
        "Flutter",
        "Java",
        "JavaScript",
        "iOS SDK",
        "Android SDK",
        "Xcode",
        "Android Studio",
        "Git",
        "APIs",
      ],
      computerScience: [
        "Python",
        "Java",
        "JavaScript",
        "C++",
        "Data Structures",
        "Algorithms",
        "System Design",
        "Database Design",
        "Git",
        "Linux",
        "Testing",
        "Object-Oriented Programming",
      ],
    };

    return fieldSkillMap[field] || fieldSkillMap.computerScience;
  }

  prioritizeSkills(skills, field) {
    const priorities = {
      ai: {
        Python: "critical",
        "Machine Learning": "critical",
        TensorFlow: "high",
        PyTorch: "high",
        "Deep Learning": "high",
        Statistics: "high",
        NumPy: "medium",
        Pandas: "medium",
      },
      dataScience: {
        Python: "critical",
        SQL: "critical",
        Statistics: "critical",
        Pandas: "high",
        NumPy: "high",
        Tableau: "high",
        R: "medium",
        "Machine Learning": "medium",
      },
      cyberSecurity: {
        "Network Security": "critical",
        Linux: "critical",
        "Ethical Hacking": "high",
        Python: "high",
        "Penetration Testing": "high",
        "Risk Assessment": "medium",
      },
      webDevelopment: {
        HTML: "critical",
        CSS: "critical",
        JavaScript: "critical",
        React: "high",
        "Node.js": "high",
        Git: "high",
        "REST APIs": "medium",
      },
    };

    const fieldPriorities = priorities[field] || {};

    return skills
      .map((skill) => ({
        skill,
        priority: fieldPriorities[skill] || "low",
        demandScore: this.demandScores[skill] || 5,
        metadata: this.skillMetadata[skill] || {
          difficulty: "intermediate",
          learningTime: "2-4 months",
          category: "skill",
        },
        resources: this.getLearningResources(skill),
      }))
      .sort((a, b) => {
        const priorityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
        if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        }
        return b.demandScore - a.demandScore;
      });
  }

  getComplementarySkills(currentSkills, field) {
    const complementaryMap = {
      ai: {
        Python: ["Jupyter", "Git", "Docker", "Linux"],
        TensorFlow: ["Keras", "OpenCV", "MLflow"],
        "Machine Learning": ["Statistics", "Mathematics", "Data Engineering"],
      },
      webDevelopment: {
        React: ["Redux", "Next.js", "TypeScript", "Testing"],
        JavaScript: ["Node.js", "Express.js", "MongoDB"],
        HTML: ["CSS", "Sass", "Bootstrap"],
      },
      dataScience: {
        Python: ["Jupyter", "Git", "Linux", "Statistics"],
        SQL: ["Database Design", "ETL", "Data Warehousing"],
        Pandas: ["NumPy", "Matplotlib", "Seaborn"],
      },
    };

    const fieldComplementary = complementaryMap[field] || {};
    let suggestions = [];

    currentSkills.forEach((skill) => {
      const complementary = fieldComplementary[skill];
      if (complementary) {
        suggestions = [...suggestions, ...complementary];
      }
    });

    // Remove duplicates and current skills
    const currentSkillsLower = currentSkills.map((s) => s.toLowerCase());
    return [...new Set(suggestions)].filter(
      (skill) =>
        !currentSkillsLower.some(
          (current) =>
            current.includes(skill.toLowerCase()) ||
            skill.toLowerCase().includes(current)
        )
    );
  }

  generateLearningPath(prioritizedSkills, field) {
    // Group skills by prerequisites and difficulty
    const beginnerSkills = prioritizedSkills.filter(
      (s) => s.metadata.difficulty === "beginner"
    );
    const intermediateSkills = prioritizedSkills.filter(
      (s) => s.metadata.difficulty === "intermediate"
    );
    const advancedSkills = prioritizedSkills.filter(
      (s) => s.metadata.difficulty === "advanced"
    );

    const learningPath = {
      phase1: {
        title: "Foundation Phase (0-3 months)",
        skills: beginnerSkills.slice(0, 3),
        description: "Build fundamental skills and understanding",
      },
      phase2: {
        title: "Development Phase (3-8 months)",
        skills: intermediateSkills.slice(0, 4),
        description: "Develop practical skills and build projects",
      },
      phase3: {
        title: "Advanced Phase (8+ months)",
        skills: advancedSkills.slice(0, 3),
        description: "Master advanced concepts and specialize",
      },
      milestones: this.getLearningMilestones(field),
      projects: this.getSuggestedProjects(field),
    };

    return learningPath;
  }

  getLearningMilestones(field) {
    const milestones = {
      ai: [
        "Complete a machine learning course",
        "Build your first ML model",
        "Deploy a model to production",
        "Contribute to an open-source ML project",
      ],
      webDevelopment: [
        "Build a static website",
        "Create a dynamic web application",
        "Deploy to the cloud",
        "Contribute to open source",
      ],
      dataScience: [
        "Analyze a public dataset",
        "Create data visualizations",
        "Build a predictive model",
        "Present insights to stakeholders",
      ],
      cyberSecurity: [
        "Set up a home lab",
        "Complete a vulnerability assessment",
        "Earn a security certification",
        "Participate in CTF competitions",
      ],
    };

    return milestones[field] || milestones.webDevelopment;
  }

  getSuggestedProjects(field) {
    const projects = {
      ai: [
        "Image classification with CNN",
        "Natural language sentiment analysis",
        "Recommendation system",
        "Chatbot development",
      ],
      webDevelopment: [
        "Portfolio website",
        "E-commerce application",
        "Real-time chat application",
        "Task management system",
      ],
      dataScience: [
        "Exploratory data analysis",
        "Sales forecasting model",
        "Interactive dashboard",
        "A/B test analysis",
      ],
      cyberSecurity: [
        "Network vulnerability scanner",
        "Password strength analyzer",
        "Security monitoring dashboard",
        "Incident response playbook",
      ],
    };

    return projects[field] || projects.webDevelopment;
  }

  getLearningResources(skill) {
    const resources = {
      Python: [
        {
          type: "course",
          name: "Python.org Official Tutorial",
          url: "https://docs.python.org/3/tutorial/",
        },
        {
          type: "book",
          name: "Automate the Boring Stuff with Python",
          url: "https://automatetheboringstuff.com/",
        },
        {
          type: "practice",
          name: "HackerRank Python",
          url: "https://hackerrank.com/domains/python",
        },
      ],
      JavaScript: [
        {
          type: "course",
          name: "MDN JavaScript Guide",
          url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide",
        },
        {
          type: "course",
          name: "freeCodeCamp",
          url: "https://freecodecamp.org",
        },
        {
          type: "book",
          name: "Eloquent JavaScript",
          url: "https://eloquentjavascript.net/",
        },
      ],
      React: [
        {
          type: "docs",
          name: "React Official Documentation",
          url: "https://reactjs.org/docs",
        },
        {
          type: "course",
          name: "React Tutorial",
          url: "https://reactjs.org/tutorial",
        },
        {
          type: "practice",
          name: "React Challenges",
          url: "https://github.com/alexgriff/react-todo-challenge",
        },
      ],
      "Machine Learning": [
        {
          type: "course",
          name: "Coursera ML Course",
          url: "https://coursera.org/learn/machine-learning",
        },
        {
          type: "course",
          name: "Fast.ai Practical Deep Learning",
          url: "https://fast.ai",
        },
        {
          type: "practice",
          name: "Kaggle Learn",
          url: "https://kaggle.com/learn",
        },
      ],
      SQL: [
        {
          type: "tutorial",
          name: "W3Schools SQL",
          url: "https://w3schools.com/sql",
        },
        { type: "practice", name: "SQLBolt", url: "https://sqlbolt.com" },
        {
          type: "practice",
          name: "HackerRank SQL",
          url: "https://hackerrank.com/domains/sql",
        },
      ],
    };

    return (
      resources[skill] || [
        {
          type: "search",
          name: "Google Search",
          url: `https://google.com/search?q=${skill}+tutorial`,
        },
        {
          type: "video",
          name: "YouTube Tutorials",
          url: `https://youtube.com/results?search_query=${skill}+tutorial`,
        },
        {
          type: "course",
          name: "Online Courses",
          url: `https://coursera.org/courses?query=${skill}`,
        },
      ]
    );
  }

  // Analyze skill gaps for a specific target role
  analyzeSkillGaps({ targetRole, currentSkills = [], experience = 0 }) {
    const roleRequirements = this.getRoleRequirements(targetRole);
    const currentSkillsLower = currentSkills.map((s) => s.toLowerCase());

    const analysis = {
      targetRole,
      currentSkills,
      experience,
      requirements: roleRequirements,
      gaps: {
        critical: [],
        moderate: [],
        minor: [],
      },
      strengths: [],
      readiness: 0,
      recommendations: [],
    };

    // Analyze each requirement
    roleRequirements.skills.forEach((requirement) => {
      const hasSkill = currentSkillsLower.some(
        (skill) =>
          skill.includes(requirement.name.toLowerCase()) ||
          requirement.name.toLowerCase().includes(skill)
      );

      if (hasSkill) {
        analysis.strengths.push(requirement.name);
      } else {
        switch (requirement.importance) {
          case "critical":
            analysis.gaps.critical.push(requirement);
            break;
          case "high":
            analysis.gaps.moderate.push(requirement);
            break;
          default:
            analysis.gaps.minor.push(requirement);
        }
      }
    });

    // Calculate readiness score
    const totalRequirements = roleRequirements.skills.length;
    const metRequirements = analysis.strengths.length;
    const experienceBonus = Math.min(
      (experience / roleRequirements.experience) * 20,
      20
    );

    analysis.readiness = Math.round(
      (metRequirements / totalRequirements) * 80 + experienceBonus
    );

    // Generate recommendations
    analysis.recommendations = this.generateGapRecommendations(
      analysis.gaps,
      targetRole
    );

    return analysis;
  }

  getRoleRequirements(role) {
    const requirements = {
      "Software Engineer": {
        skills: [
          {
            name: "Programming Languages",
            importance: "critical",
            examples: ["Python", "Java", "JavaScript"],
          },
          {
            name: "Data Structures",
            importance: "critical",
            examples: ["Arrays", "Trees", "Graphs"],
          },
          {
            name: "System Design",
            importance: "high",
            examples: ["Scalability", "Databases"],
          },
          { name: "Version Control", importance: "high", examples: ["Git"] },
          {
            name: "Testing",
            importance: "moderate",
            examples: ["Unit Testing", "Integration Testing"],
          },
        ],
        experience: 2,
        education: "Bachelor in Computer Science or related",
      },
      "Data Scientist": {
        skills: [
          {
            name: "Python/R",
            importance: "critical",
            examples: ["Python", "R"],
          },
          {
            name: "Statistics",
            importance: "critical",
            examples: ["Hypothesis Testing", "Regression"],
          },
          {
            name: "Machine Learning",
            importance: "high",
            examples: ["Scikit-learn", "TensorFlow"],
          },
          {
            name: "SQL",
            importance: "high",
            examples: ["MySQL", "PostgreSQL"],
          },
          {
            name: "Data Visualization",
            importance: "moderate",
            examples: ["Matplotlib", "Tableau"],
          },
        ],
        experience: 2,
        education: "Bachelor in Data Science, Statistics, or related",
      },
      "AI Engineer": {
        skills: [
          { name: "Python", importance: "critical", examples: ["Python"] },
          {
            name: "Machine Learning",
            importance: "critical",
            examples: ["ML Algorithms"],
          },
          {
            name: "Deep Learning",
            importance: "high",
            examples: ["Neural Networks", "TensorFlow", "PyTorch"],
          },
          {
            name: "Mathematics",
            importance: "high",
            examples: ["Linear Algebra", "Statistics"],
          },
          {
            name: "MLOps",
            importance: "moderate",
            examples: ["Docker", "Kubernetes"],
          },
        ],
        experience: 3,
        education: "Bachelor in AI, Computer Science, or related",
      },
    };

    return requirements[role] || requirements["Software Engineer"];
  }

  generateGapRecommendations(gaps, targetRole) {
    const recommendations = [];

    if (gaps.critical.length > 0) {
      recommendations.push({
        priority: "immediate",
        action: "Focus on critical skills first",
        description: `Master ${gaps.critical
          .slice(0, 2)
          .map((g) => g.name)
          .join(" and ")} as these are essential for ${targetRole}`,
        timeframe: "1-3 months",
        skills: gaps.critical.slice(0, 2),
      });
    }

    if (gaps.moderate.length > 0) {
      recommendations.push({
        priority: "short-term",
        action: "Develop supporting skills",
        description: `Learn ${gaps.moderate
          .slice(0, 3)
          .map((g) => g.name)
          .join(", ")} to strengthen your profile`,
        timeframe: "3-6 months",
        skills: gaps.moderate.slice(0, 3),
      });
    }

    if (gaps.minor.length > 0) {
      recommendations.push({
        priority: "long-term",
        action: "Round out your skill set",
        description: `Consider learning ${gaps.minor
          .slice(0, 2)
          .map((g) => g.name)
          .join(" and ")} for additional expertise`,
        timeframe: "6+ months",
        skills: gaps.minor.slice(0, 2),
      });
    }

    return recommendations;
  }

  // Get trending skills by industry
  getTrendingSkills(industry, limit = 10) {
    const trendingSkills = {
      technology: [
        { skill: "Artificial Intelligence", growth: 35, demand: 9 },
        { skill: "Cloud Computing", growth: 28, demand: 8 },
        { skill: "Kubernetes", growth: 25, demand: 7 },
        { skill: "React", growth: 22, demand: 9 },
        { skill: "Python", growth: 20, demand: 10 },
        { skill: "Machine Learning", growth: 30, demand: 8 },
        { skill: "Docker", growth: 18, demand: 7 },
        { skill: "TypeScript", growth: 24, demand: 7 },
        { skill: "Node.js", growth: 15, demand: 8 },
        { skill: "GraphQL", growth: 40, demand: 6 },
      ],
      healthcare: [
        { skill: "Telemedicine", growth: 45, demand: 8 },
        { skill: "Health Informatics", growth: 32, demand: 7 },
        { skill: "Medical AI", growth: 38, demand: 6 },
        { skill: "Electronic Health Records", growth: 25, demand: 8 },
      ],
      finance: [
        { skill: "Blockchain", growth: 42, demand: 6 },
        { skill: "FinTech", growth: 35, demand: 7 },
        { skill: "Algorithmic Trading", growth: 28, demand: 5 },
        { skill: "Risk Analytics", growth: 22, demand: 7 },
      ],
    };

    const skills =
      trendingSkills[industry.toLowerCase()] || trendingSkills.technology;
    return skills.sort((a, b) => b.growth - a.growth).slice(0, limit);
  }

  // Validate and normalize skill names
  validateSkills(skills) {
    return skills.map((skill) => {
      const trimmed = skill.trim();
      const normalized = this.normalizeSkillName(trimmed);

      return {
        original: skill,
        normalized: normalized,
        category: this.getSkillCategory(normalized),
        isValid: this.isValidSkill(normalized),
        suggestions: this.isValidSkill(normalized)
          ? []
          : this.getSimilarSkills(normalized),
      };
    });
  }

  normalizeSkillName(skill) {
    // Common normalizations
    const normalizations = {
      js: "JavaScript",
      ts: "TypeScript",
      py: "Python",
      ml: "Machine Learning",
      ai: "Artificial Intelligence",
      "react.js": "React",
      node: "Node.js",
      postgresql: "PostgreSQL",
      mysql: "MySQL",
    };

    const lowerSkill = skill.toLowerCase();
    return normalizations[lowerSkill] || this.capitalizeWords(skill);
  }

  capitalizeWords(str) {
    return str.replace(
      /\b\w+/g,
      (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    );
  }

  getSkillCategory(skill) {
    // Flatten skills database to find category
    for (const [category, subcategories] of Object.entries(
      this.skillsDatabase
    )) {
      if (typeof subcategories === "object" && !Array.isArray(subcategories)) {
        for (const [subcat, skills] of Object.entries(subcategories)) {
          if (Array.isArray(skills) && skills.includes(skill)) {
            return `${category}/${subcat}`;
          }
          if (typeof skills === "object") {
            for (const [subsubcat, subskills] of Object.entries(skills)) {
              if (Array.isArray(subskills) && subskills.includes(skill)) {
                return `${category}/${subcat}/${subsubcat}`;
              }
            }
          }
        }
      }
    }
    return "other";
  }

  isValidSkill(skill) {
    // Check if skill exists in our database
    const skillLower = skill.toLowerCase();

    // Flatten all skills from database
    const allSkills = this.flattenSkillsDatabase();
    return allSkills.some(
      (dbSkill) =>
        dbSkill.toLowerCase() === skillLower ||
        dbSkill.toLowerCase().includes(skillLower) ||
        skillLower.includes(dbSkill.toLowerCase())
    );
  }

  flattenSkillsDatabase() {
    const allSkills = [];

    const flatten = (obj) => {
      for (const value of Object.values(obj)) {
        if (Array.isArray(value)) {
          allSkills.push(...value);
        } else if (typeof value === "object") {
          flatten(value);
        }
      }
    };

    flatten(this.skillsDatabase);
    return [...new Set(allSkills)]; // Remove duplicates
  }

  getSimilarSkills(skill, limit = 3) {
    const allSkills = this.flattenSkillsDatabase();
    const skillLower = skill.toLowerCase();

    // Simple similarity based on common subsequences
    const similar = allSkills
      .map((dbSkill) => ({
        skill: dbSkill,
        similarity: this.calculateSimilarity(skillLower, dbSkill.toLowerCase()),
      }))
      .filter((s) => s.similarity > 0.3)
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, limit)
      .map((s) => s.skill);

    return similar;
  }

  calculateSimilarity(str1, str2) {
    const longer = str1.length > str2.length ? str1 : str2;
    const shorter = str1.length > str2.length ? str2 : str1;

    if (longer.length === 0) return 1.0;

    const distance = this.levenshteinDistance(longer, shorter);
    return (longer.length - distance) / longer.length;
  }

  levenshteinDistance(str1, str2) {
    const matrix = [];

    for (let i = 0; i <= str2.length; i++) {
      matrix[i] = [i];
    }

    for (let j = 0; j <= str1.length; j++) {
      matrix[0][j] = j;
    }

    for (let i = 1; i <= str2.length; i++) {
      for (let j = 1; j <= str1.length; j++) {
        if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }

    return matrix[str2.length][str1.length];
  }
}

module.exports = SkillsMapping;
