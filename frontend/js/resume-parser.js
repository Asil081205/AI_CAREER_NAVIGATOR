// Enhanced Resume Parser with improved extraction for all sections
class RobustResumeParser {
  constructor() {
    this.debugMode = true;

    // Common patterns for resume parsing
    this.patterns = {
      email: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g,
      phone:
        /(\+?91[-.\s]?)?(\+?1?[-.\s]?)?\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})/g,
      name: /^[A-Z][a-z]+ [A-Z][a-z]+/m,
      skills:
        /(?:skills?|technologies?|technical skills?|programming languages?)[\s\n]*[:\-]?\s*([^.]+?)(?=\n\n|\n[A-Z]|$)/gim,
      experience:
        /(?:experience|work history|employment|professional experience)[\s\n]*[:\-]?\s*(.*?)(?=\n(?:education|skills|projects|certifications?|$))/gis,
      education:
        /(?:education|academic|qualifications?|degrees?)[\s\n]*[:\-]?\s*(.*?)(?=\n(?:experience|skills|projects|certifications?|$))/gis,
      projects:
        /(?:projects?|portfolio)[\s\n]*[:\-]?\s*(.*?)(?=\n(?:experience|education|skills|certifications?|$))/gis,
    };

    // Skills database
    this.skillsDB = [
      "Python",
      "JavaScript",
      "Java",
      "C++",
      "C#",
      "TypeScript",
      "PHP",
      "Ruby",
      "Go",
      "Rust",
      "Swift",
      "Kotlin",
      "Dart",
      "R",
      "MATLAB",
      "Scala",
      "Perl",
      "Shell",
      "PowerShell",
      "HTML",
      "CSS",
      "SCSS",
      "SASS",
      "React",
      "Angular",
      "Vue.js",
      "Node.js",
      "Express.js",
      "Next.js",
      "Nuxt.js",
      "jQuery",
      "Bootstrap",
      "Tailwind CSS",
      "Material UI",
      "React.js",
      "React Native",
      "Flutter",
      "Ionic",
      "Xamarin",
      "Cordova",
      "Android",
      "iOS",
      "MySQL",
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "Cassandra",
      "Oracle",
      "SQL Server",
      "SQLite",
      "DynamoDB",
      "Elasticsearch",
      "Neo4j",
      "SQL",
      "AWS",
      "Azure",
      "Google Cloud",
      "GCP",
      "Docker",
      "Kubernetes",
      "Jenkins",
      "CI/CD",
      "Machine Learning",
      "Deep Learning",
      "Artificial Intelligence",
      "TensorFlow",
      "PyTorch",
      "Keras",
      "Scikit-learn",
      "Pandas",
      "NumPy",
      "Matplotlib",
      "Seaborn",
      "Jupyter",
      "Tableau",
      "Power BI",
      "Apache Spark",
      "Hadoop",
      "Kafka",
      "AI",
      "ML",
      "NLP",
      "Django",
      "Flask",
      "FastAPI",
      "Spring Boot",
      "Laravel",
      "CodeIgniter",
      "Ruby on Rails",
      "Git",
      "GitHub",
      "GitLab",
      "Linux",
      "Windows",
      "REST API",
      "GraphQL",
      "JSON",
      "XML",
    ];

    this.log("Resume parser initialized");
  }

  log(message, data = null) {
    if (this.debugMode) {
      console.log(`[ResumeParser] ${message}`, data || "");
    }
  }

  escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  async parseText(text, fileName = "") {
    this.log("Starting text parsing", { textLength: text.length, fileName });

    try {
      const cleanedText = this.cleanText(text);
      this.log("Text cleaned", { cleanedLength: cleanedText.length });

      // Store original text lines for better parsing
      this.originalText = cleanedText;
      this.textLines = cleanedText
        .split("\n")
        .map((l) => l.trim())
        .filter((l) => l.length > 0);

      const parsedData = {
        personal: this.extractPersonalInfo(cleanedText),
        education: this.extractEducation(cleanedText),
        skills: this.extractSkills(cleanedText),
        experience: this.extractExperience(cleanedText),
        internships: this.extractInternships(cleanedText),
        projects: this.extractProjects(cleanedText),
        summary: this.extractSummary(cleanedText),
        rawText: cleanedText.substring(0, 500),
      };

      // Post-process and enhance data
      parsedData.suggestedField = this.determineField(parsedData);
      parsedData.experienceLevel = this.assessExperienceLevel(parsedData);
      parsedData.confidence = this.calculateConfidence(parsedData);

      // Add flags for empty sections
      parsedData.hasExperience = parsedData.experience.length > 0;
      parsedData.hasInternships = parsedData.internships.length > 0;
      parsedData.hasProjects = parsedData.projects.length > 0;

      this.log("Parsing completed", parsedData);
      return parsedData;
    } catch (error) {
      this.log("Parsing error", error);
      throw new Error(`Failed to parse resume: ${error.message}`);
    }
  }

  cleanText(text) {
    if (!text) return "";

    // Preserve line breaks for better parsing
    text = text.replace(/\r\n/g, "\n");
    text = text.replace(/\r/g, "\n");

    // Remove excessive whitespace but preserve structure
    text = text.replace(/[ \t]+/g, " ");
    text = text.replace(/\n{3,}/g, "\n\n");
    text = text.trim();

    // Remove common PDF artifacts
    text = text.replace(/[^\x20-\x7E\n]/g, " ");
    text = text.replace(/\s+$/gm, ""); // Remove trailing spaces

    return text;
  }

  // IMPROVED NAME EXTRACTION
  extractPersonalInfo(text) {
    const personal = {
      name: "",
      email: "",
      phone: "",
      address: "",
      linkedin: "",
      github: "",
    };

    try {
      // Extract email first
      const emailMatch = text.match(this.patterns.email);
      if (emailMatch) {
        personal.email = emailMatch[0];
      }

      // Extract phone
      const phoneMatch = text.match(this.patterns.phone);
      if (phoneMatch) {
        personal.phone = phoneMatch[0];
      }

      // ENHANCED name extraction with multiple methods
      personal.name = this.extractNameRobust(text, personal.email);

      // Extract LinkedIn
      const linkedinMatch = text.match(
        /(?:linkedin\.com\/in\/|linkedin\.com\/pub\/)([^\s\n]+)/i
      );
      if (linkedinMatch) {
        personal.linkedin = "linkedin.com/in/" + linkedinMatch[1];
      }

      // Extract GitHub
      const githubMatch = text.match(/(?:github\.com\/)([^\s\n]+)/i);
      if (githubMatch) {
        personal.github = "github.com/" + githubMatch[1];
      }

      // Extract address
      personal.address = this.extractAddress(text);
    } catch (error) {
      this.log("Error extracting personal info", error);
    }

    this.log("Personal info extracted", personal);
    return personal;
  }

  extractNameRobust(text, email = "") {
    this.log("Starting robust name extraction");

    try {
      const lines = this.textLines;

      // Method 1: Look for name in first 5 lines (most common)
      for (let i = 0; i < Math.min(5, lines.length); i++) {
        const line = lines[i].trim();
        if (this.isDefinitelyName(line)) {
          this.log("Name found in first lines", line);
          return this.formatName(line);
        }
      }

      // Method 2: Look for explicit name patterns
      const namePatterns = [
        // "Name: John Doe" or "Full Name: John Doe"
        /(?:name|full\s*name)\s*[:\-]\s*([A-Z][a-z]+(?:\s+[A-Z][a-z]+)+)/i,
        // All caps names at start of lines
        /^([A-Z][A-Z\s]{2,30})$/gm,
        // Standard proper case names
        /^([A-Z][a-z]{2,15}(?:\s+[A-Z][a-z]{2,15}){1,3})$/gm,
        // Names with middle initials
        /^([A-Z][a-z]{2,15}\s+[A-Z]\.?\s+[A-Z][a-z]{2,15})$/gm,
      ];

      for (const pattern of namePatterns) {
        const matches = text.matchAll(pattern);
        for (const match of matches) {
          const potentialName = match[1].trim();
          if (this.validateExtractedName(potentialName)) {
            this.log("Name found with pattern", potentialName);
            return this.formatName(potentialName);
          }
        }
      }

      // Method 3: Look near email for name
      if (email) {
        const name = this.findNameNearEmail(text, email);
        if (name) {
          this.log("Name found near email", name);
          return name;
        }
      }

      // Method 4: Generate from email as last resort
      if (email) {
        const generatedName = this.generateNameFromEmail(email);
        if (generatedName) {
          this.log("Name generated from email", generatedName);
          return generatedName;
        }
      }

      this.log("No name found with any method");
      return "";
    } catch (error) {
      this.log("Error in robust name extraction", error);
      return "";
    }
  }

  isDefinitelyName(line) {
    if (!line || line.length < 3 || line.length > 50) return false;

    // Skip lines with obvious non-name content
    const skipPatterns = [
      /@|http|www|\.com|\.org/i,
      /resume|curriculum|cv|profile|objective/i,
      /\d{4}|\d{10}/, // Years or phone numbers
      /skills?|experience|education|projects?/i,
      /address|phone|email|mobile/i,
    ];

    if (skipPatterns.some((pattern) => pattern.test(line))) return false;

    // Must contain only letters, spaces, dots, apostrophes
    if (!/^[A-Za-z\s.''-]+$/.test(line)) return false;

    // Should be 2-4 words
    const words = line.split(/\s+/).filter((w) => w.length > 1);
    if (words.length < 2 || words.length > 4) return false;

    // Each word should start with capital or be all caps
    const validCapitalization = words.every((word) => {
      return (
        /^[A-Z]/.test(word) &&
        (/^[A-Z][a-z]+$/.test(word) || // John
          /^[A-Z]+$/.test(word) || // JOHN
          /^[A-Z]\.?$/.test(word)) // J.
      );
    });

    return validCapitalization;
  }

  validateExtractedName(name) {
    if (!name || name.length < 3) return false;

    // Check for common non-names
    const commonNonNames = [
      "RESUME",
      "CURRICULUM VITAE",
      "PERSONAL DETAILS",
      "CONTACT INFO",
      "PROFILE",
      "SUMMARY",
    ];

    if (commonNonNames.includes(name.toUpperCase())) return false;

    return this.isDefinitelyName(name);
  }

  findNameNearEmail(text, email) {
    const emailIndex = text.indexOf(email);
    if (emailIndex === -1) return null;

    // Look in surrounding text (200 chars before and after)
    const start = Math.max(0, emailIndex - 200);
    const end = Math.min(text.length, emailIndex + 200);
    const context = text.substring(start, end);

    const contextLines = context
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l.length > 0);

    for (const line of contextLines) {
      if (!line.includes("@") && this.isDefinitelyName(line)) {
        return this.formatName(line);
      }
    }

    return null;
  }

  generateNameFromEmail(email) {
    try {
      const emailPrefix = email.split("@")[0];

      // Remove numbers and common suffixes
      let cleanPrefix = emailPrefix.replace(/\d+$/, "");

      // Split by common separators
      const parts = cleanPrefix
        .split(/[._-]+/)
        .filter((part) => part.length > 1);

      if (parts.length >= 2) {
        const firstName = this.capitalize(parts[0]);
        const lastName = this.capitalize(parts[1]);

        if (firstName.length > 1 && lastName.length > 1) {
          return `${firstName} ${lastName}`;
        }
      }

      return "";
    } catch (error) {
      return "";
    }
  }

  formatName(name) {
    if (!name) return "";

    return name
      .split(/\s+/)
      .map((word) => {
        if (word.includes("'")) {
          return word
            .split("'")
            .map((part) => this.capitalize(part))
            .join("'");
        }
        return this.capitalize(word);
      })
      .join(" ");
  }

  capitalize(str) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  // IMPROVED EDUCATION EXTRACTION
  extractEducation(text) {
    const education = [];

    try {
      this.log("Starting education extraction");

      const educationSection = this.extractSection(text, "education");
      if (!educationSection) {
        this.log("No education section found");
        return education;
      }

      this.log("Education section found", { length: educationSection.length });

      const lines = educationSection
        .split("\n")
        .map((l) => l.trim())
        .filter((l) => l.length > 0);

      // Enhanced degree patterns
      const degreePatterns = [
        // B.Tech patterns
        {
          pattern:
            /(?:b\.?tech|bachelor\s+of\s+technology|btech)\s*(?:in|of)?\s*([^,\n]+)/gi,
          type: "B.Tech",
        },
        // B.Sc patterns
        {
          pattern:
            /(?:b\.?s\.?c\.?|bachelor\s+of\s+science|bsc)\s*(?:in|of)?\s*([^,\n]+)/gi,
          type: "B.Sc",
        },
        // BCA patterns
        {
          pattern: /(?:bca|bachelor\s+of\s+computer\s+applications?)/gi,
          type: "BCA",
        },
        // M.Tech patterns
        {
          pattern:
            /(?:m\.?tech|master\s+of\s+technology|mtech)\s*(?:in|of)?\s*([^,\n]+)/gi,
          type: "M.Tech",
        },
        // MCA patterns
        {
          pattern: /(?:mca|master\s+of\s+computer\s+applications?)/gi,
          type: "MCA",
        },
        // General patterns
        {
          pattern:
            /(?:bachelor|master|phd|ph\.d)\s*(?:of|in|degree)?\s*([^,\n]+)/gi,
          type: "Degree",
        },
      ];

      let currentEducation = null;

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        // Check for degree patterns
        for (const degreeInfo of degreePatterns) {
          const matches = [...line.matchAll(degreeInfo.pattern)];

          if (matches.length > 0) {
            // Save previous education
            if (currentEducation && currentEducation.degree) {
              education.push(currentEducation);
            }

            const match = matches[0];
            currentEducation = {
              degree: match[0].trim(),
              field: match[1] ? match[1].trim() : "",
              institution: "",
              year: "",
              cgpa: "",
              percentage: "",
            };

            this.log("Found degree", currentEducation.degree);
            break;
          }
        }

        // Look for institution in current and next lines
        if (currentEducation && !currentEducation.institution) {
          const institution = this.extractInstitution(line, lines, i);
          if (institution) {
            currentEducation.institution = institution;
            this.log("Found institution", institution);
          }
        }

        // Extract year
        const year = this.extractYear(line);
        if (year && currentEducation) {
          currentEducation.year = year;
          this.log("Found year", year);
        }

        // Extract CGPA/Percentage
        const gradeInfo = this.extractGrades(line);
        if (gradeInfo && currentEducation) {
          if (gradeInfo.cgpa) currentEducation.cgpa = gradeInfo.cgpa;
          if (gradeInfo.percentage)
            currentEducation.percentage = gradeInfo.percentage;
          this.log("Found grades", gradeInfo);
        }
      }

      // Add the last education entry
      if (currentEducation && currentEducation.degree) {
        education.push(currentEducation);
      }
    } catch (error) {
      this.log("Error extracting education", error);
    }

    this.log("Education extraction complete", education);
    return education;
  }

  extractInstitution(line, allLines, currentIndex) {
    const institutionKeywords = [
      "university",
      "college",
      "institute",
      "school",
      "academy",
      "iit",
      "nit",
      "iiit",
      "bits",
      "vit",
      "srm",
      "amrita",
      "manipal",
      "anna university",
      "delhi university",
      "mumbai university",
    ];

    // Check current line
    const lowerLine = line.toLowerCase();
    if (institutionKeywords.some((keyword) => lowerLine.includes(keyword))) {
      return line;
    }

    // Check next few lines
    for (
      let i = currentIndex + 1;
      i < Math.min(currentIndex + 3, allLines.length);
      i++
    ) {
      const nextLine = allLines[i];
      const lowerNextLine = nextLine.toLowerCase();

      if (
        institutionKeywords.some((keyword) => lowerNextLine.includes(keyword))
      ) {
        return nextLine;
      }
    }

    return null;
  }

  extractYear(line) {
    // Look for graduation years (typically between 2000-2030)
    const yearPatterns = [
      /(20[0-3]\d)/g,
      /(?:graduated|passing|completed).*?(20[0-3]\d)/gi,
      /(?:year|batch).*?(20[0-3]\d)/gi,
    ];

    for (const pattern of yearPatterns) {
      const match = line.match(pattern);
      if (match) {
        // Return the most recent year found
        const years = match.map((m) => m.match(/20[0-3]\d/)[0]);
        return years[years.length - 1];
      }
    }

    return null;
  }

  extractGrades(line) {
    const gradeInfo = { cgpa: null, percentage: null };

    // CGPA patterns
    const cgpaPatterns = [
      /(?:cgpa|gpa)\s*[:\-]?\s*(\d+\.?\d*)\s*(?:\/|\s*out\s*of\s*)?\s*(\d+(?:\.\d+)?)?/gi,
      /(\d+\.\d+)\s*(?:cgpa|gpa)/gi,
      /(\d+\.\d+)\s*\/\s*(\d+(?:\.\d+)?)\s*(?:cgpa|gpa)?/gi,
    ];

    for (const pattern of cgpaPatterns) {
      const match = line.match(pattern);
      if (match) {
        let cgpa = match[1];
        let outOf = match[2];

        // Normalize CGPA to 10 scale if needed
        if (outOf) {
          const cgpaNum = parseFloat(cgpa);
          const outOfNum = parseFloat(outOf);
          if (outOfNum === 4) {
            // Convert 4.0 scale to 10.0 scale
            gradeInfo.cgpa = (cgpaNum * 2.5).toFixed(2);
          } else {
            gradeInfo.cgpa = cgpa;
          }
        } else {
          gradeInfo.cgpa = cgpa;
        }
        break;
      }
    }

    // Percentage patterns
    const percentagePatterns = [
      /(\d+(?:\.\d+)?)\s*%/g,
      /(?:percentage|marks?)\s*[:\-]?\s*(\d+(?:\.\d+)?)\s*%?/gi,
      /(\d{2,3}(?:\.\d+)?)\s*(?:percent|percentage)/gi,
    ];

    for (const pattern of percentagePatterns) {
      const match = line.match(pattern);
      if (match) {
        const percentage = parseFloat(match[1]);
        // Valid percentage should be between 0-100
        if (percentage >= 0 && percentage <= 100) {
          gradeInfo.percentage = match[1] + "%";
          break;
        }
      }
    }

    return gradeInfo.cgpa || gradeInfo.percentage ? gradeInfo : null;
  }

  // IMPROVED PROJECT EXTRACTION - Simplified structure
  extractProjects(text) {
    const projects = [];

    try {
      this.log("Starting project extraction");

      const projectsSection = this.extractSection(text, "projects");
      if (!projectsSection) {
        this.log("No projects section found");
        return projects;
      }

      this.log("Projects section found", { length: projectsSection.length });

      const lines = projectsSection
        .split("\n")
        .map((l) => l.trim())
        .filter((l) => l.length > 0);

      let projectCount = 0;

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        // Skip lines that are clearly not project titles
        if (this.isProjectTitle(line)) {
          projectCount++;
          projects.push({
            name: line.trim(),
            projectNumber: projectCount,
          });

          // Limit to maximum 5 projects
          if (projectCount >= 5) break;
        }
      }
    } catch (error) {
      this.log("Error extracting projects", error);
    }

    // If no projects found with section method, try alternative method
    if (projects.length === 0) {
      const alternativeProjects = this.extractProjectsAlternative(text);
      projects.push(...alternativeProjects);
    }

    this.log("Project extraction complete", projects);
    return projects;
  }

  isProjectTitle(line) {
    if (!line || line.length < 5 || line.length > 100) return false;

    // Skip lines that are clearly not titles
    if (line.startsWith("•") || line.startsWith("-") || line.startsWith("*"))
      return false;
    if (
      line.toLowerCase().includes("technology") ||
      line.toLowerCase().includes("description")
    )
      return false;
    if (line.includes("http") || line.includes("@")) return false;
    if (line.match(/^\d+[\.\)]/)) return false; // Skip numbered lists like "1. Something"

    // Should look like a project title
    return true;
  }

  extractProjectsAlternative(text) {
    const projects = [];
    const projectPatterns = [
      /(?:project\s*[:\-]?\s*)([^.\n]{10,80})/gi,
      /(?:developed|built|created)\s+([^.\n]{10,80})/gi,
      /(?:worked\s+on|implemented)\s+([^.\n]{10,80})/gi,
    ];

    let projectCount = 0;

    for (const pattern of projectPatterns) {
      const matches = text.matchAll(pattern);
      for (const match of matches) {
        const projectName = match[1].trim();

        // Check if it's not a duplicate and looks like a project name
        const isDuplicate = projects.some(
          (p) =>
            p.name.toLowerCase().includes(projectName.toLowerCase()) ||
            projectName.toLowerCase().includes(p.name.toLowerCase())
        );

        if (
          !isDuplicate &&
          projectName.length >= 10 &&
          projectName.length <= 80
        ) {
          projectCount++;
          projects.push({
            name: projectName,
            projectNumber: projectCount,
          });

          if (projectCount >= 5) break;
        }
      }
      if (projectCount >= 5) break;
    }

    return projects;
  }

  // IMPROVED INTERNSHIP EXTRACTION
  extractInternships(text) {
    const internships = [];

    try {
      this.log("Starting internship extraction");

      // Method 1: Look for dedicated internships section
      const internshipSection = this.extractSection(text, "internship");
      if (internshipSection) {
        const sectionInternships =
          this.parseInternshipsSection(internshipSection);
        internships.push(...sectionInternships);
      }

      // Method 2: Look for intern mentions throughout the text
      if (internships.length === 0) {
        const textInternships = this.findInternshipsInText(text);
        internships.push(...textInternships);
      }
    } catch (error) {
      this.log("Error extracting internships", error);
    }

    this.log("Internship extraction complete", internships);
    return internships.slice(0, 3); // Limit to 3 internships
  }

  parseInternshipsSection(internshipText) {
    const internships = [];
    const lines = internshipText
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l.length > 0);

    let currentInternship = null;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      if (this.looksLikeInternshipRole(line)) {
        // Save previous internship
        if (currentInternship) {
          internships.push(currentInternship);
        }

        currentInternship = {
          role: line,
          company: "",
          duration: "",
          location: "",
        };

        // Look for company, duration, location in next few lines
        for (let j = i + 1; j < Math.min(i + 4, lines.length); j++) {
          const nextLine = lines[j].trim();

          if (this.looksLikeCompany(nextLine)) {
            currentInternship.company = nextLine;
          } else if (this.looksLikeDuration(nextLine)) {
            currentInternship.duration = nextLine;
          } else if (this.looksLikeLocation(nextLine)) {
            currentInternship.location = nextLine;
          }
        }
      }
    }

    // Add last internship
    if (currentInternship) {
      internships.push(currentInternship);
    }

    return internships;
  }

  findInternshipsInText(text) {
    const internships = [];
    const internshipPatterns = [/([^.\n]*(?:intern|trainee)[^.\n]*)/gi];

    for (const pattern of internshipPatterns) {
      const matches = text.matchAll(pattern);
      for (const match of matches) {
        const internText = match[1].trim();

        if (this.looksLikeInternshipRole(internText)) {
          const internship = {
            role: internText,
            company: this.findCompanyNear(text, internText),
            duration: this.findDurationNear(text, internText),
            location: "",
          };

          // Avoid duplicates
          const isDuplicate = internships.some(
            (existing) =>
              existing.role.toLowerCase().includes(internText.toLowerCase()) ||
              internText.toLowerCase().includes(existing.role.toLowerCase())
          );

          if (!isDuplicate) {
            internships.push(internship);
          }
        }
      }
    }

    return internships;
  }

  looksLikeInternshipRole(text) {
    if (!text || text.length < 5) return false;

    const lowerText = text.toLowerCase();
    return lowerText.includes("intern") || lowerText.includes("trainee");
  }

  looksLikeCompany(text) {
    if (!text || text.length < 3 || text.length > 100) return false;

    const companyIndicators = [
      "ltd",
      "inc",
      "corp",
      "technologies",
      "solutions",
      "systems",
      "services",
      "pvt",
      "llc",
    ];
    const lowerText = text.toLowerCase();

    return (
      companyIndicators.some((indicator) => lowerText.includes(indicator)) ||
      (text.length > 5 &&
        text.length < 50 &&
        !text.startsWith("•") &&
        !text.startsWith("-"))
    );
  }

  looksLikeDuration(text) {
    if (!text) return false;

    const durationPatterns = [
      /\d{4}\s*[-–]\s*\d{4}/,
      /\d{4}\s*[-–]\s*present/i,
      /\w+\s+\d{4}\s*[-–]\s*\w+\s+\d{4}/,
      /\d+\s+(?:months?|years?)/i,
      /(?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\s+\d{4}/i,
    ];

    return durationPatterns.some((pattern) => pattern.test(text));
  }

  looksLikeLocation(text) {
    if (!text) return false;

    const locationKeywords = [
      "mumbai",
      "delhi",
      "bangalore",
      "chennai",
      "hyderabad",
      "pune",
      "kolkata",
      "ahmedabad",
      "surat",
      "jaipur",
      "india",
      "remote",
    ];

    const lowerText = text.toLowerCase();
    return locationKeywords.some((keyword) => lowerText.includes(keyword));
  }

  findCompanyNear(text, internText) {
    const internIndex = text.indexOf(internText);
    if (internIndex === -1) return "";

    const contextStart = Math.max(0, internIndex - 100);
    const contextEnd = Math.min(
      text.length,
      internIndex + internText.length + 100
    );
    const context = text.substring(contextStart, contextEnd);

    const lines = context
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l.length > 0);

    for (const line of lines) {
      if (line !== internText && this.looksLikeCompany(line)) {
        return line;
      }
    }

    return "";
  }

  findDurationNear(text, internText) {
    const internIndex = text.indexOf(internText);
    if (internIndex === -1) return "";

    const contextStart = Math.max(0, internIndex - 100);
    const contextEnd = Math.min(
      text.length,
      internIndex + internText.length + 100
    );
    const context = text.substring(contextStart, contextEnd);

    const lines = context
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l.length > 0);

    for (const line of lines) {
      if (this.looksLikeDuration(line)) {
        return line;
      }
    }

    return "";
  }

  // IMPROVED WORK EXPERIENCE EXTRACTION - Better "No Experience" handling
  extractExperience(text) {
    const experience = [];

    try {
      this.log("Starting work experience extraction");

      const experienceSection = this.extractSection(text, "experience");
      if (!experienceSection) {
        this.log("No work experience section found");
        return experience; // Return empty array - will be handled as "No Experience"
      }

      const lines = experienceSection
        .split("\n")
        .map((l) => l.trim())
        .filter((l) => l.length > 0);

      let currentExp = null;

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        // Skip internship-related lines (they should be in internships section)
        if (line.toLowerCase().includes("intern")) continue;

        if (this.looksLikeJobTitle(line)) {
          // Save previous experience
          if (currentExp) {
            experience.push(currentExp);
          }

          currentExp = {
            role: line,
            company: "",
            duration: "",
            location: "",
            description: "",
          };

          // Look for company and other details in next lines
          for (let j = i + 1; j < Math.min(i + 4, lines.length); j++) {
            const nextLine = lines[j].trim();

            if (this.looksLikeCompany(nextLine) && !currentExp.company) {
              currentExp.company = nextLine;
            } else if (
              this.looksLikeDuration(nextLine) &&
              !currentExp.duration
            ) {
              currentExp.duration = nextLine;
            } else if (
              this.looksLikeLocation(nextLine) &&
              !currentExp.location
            ) {
              currentExp.location = nextLine;
            }
          }
        }
      }

      // Add last experience
      if (currentExp) {
        experience.push(currentExp);
      }
    } catch (error) {
      this.log("Error extracting work experience", error);
    }

    this.log("Work experience extraction complete", experience);
    return experience;
  }

  looksLikeJobTitle(text) {
    if (!text || text.length < 5 || text.length > 100) return false;

    const jobTitleKeywords = [
      "engineer",
      "developer",
      "analyst",
      "manager",
      "lead",
      "senior",
      "junior",
      "associate",
      "specialist",
      "consultant",
      "architect",
      "designer",
      "scientist",
      "researcher",
      "coordinator",
      "executive",
      "officer",
    ];

    const lowerText = text.toLowerCase();

    // Exclude intern titles
    if (lowerText.includes("intern")) return false;

    return jobTitleKeywords.some((keyword) => lowerText.includes(keyword));
  }

  // Keep existing methods for skills, summary, etc.
  extractSkills(text) {
    const skills = new Set();

    try {
      const skillsSection = this.extractSection(text, "skills");
      let searchText = skillsSection || text;

      for (const skill of this.skillsDB) {
        try {
          const escapedSkill = this.escapeRegExp(skill);
          const skillPattern = new RegExp(`\\b${escapedSkill}\\b`, "gi");

          if (skillPattern.test(searchText)) {
            skills.add(skill);
          }
        } catch (regexError) {
          if (searchText.toLowerCase().includes(skill.toLowerCase())) {
            skills.add(skill);
          }
        }
      }

      const skillPatterns = [
        /(?:programming languages?|languages?)[:\-\s]+(.*?)(?:\n|$)/gi,
        /(?:technologies?|tech stack)[:\-\s]+(.*?)(?:\n|$)/gi,
        /(?:frameworks?)[:\-\s]+(.*?)(?:\n|$)/gi,
        /(?:databases?)[:\-\s]+(.*?)(?:\n|$)/gi,
        /(?:tools?)[:\-\s]+(.*?)(?:\n|$)/gi,
      ];

      for (const pattern of skillPatterns) {
        try {
          const matches = searchText.matchAll(pattern);
          for (const match of matches) {
            const skillsText = match[1];
            const extractedSkills = this.parseSkillsString(skillsText);
            extractedSkills.forEach((skill) => skills.add(skill));
          }
        } catch (patternError) {
          this.log("Error in skill pattern matching:", patternError);
        }
      }
    } catch (error) {
      this.log("Error extracting skills", error);
    }

    const skillsArray = Array.from(skills).slice(0, 25);
    this.log("Skills extracted", skillsArray);
    return skillsArray;
  }

  parseSkillsString(skillsText) {
    if (!skillsText) return [];

    try {
      const skills = skillsText
        .split(/[,;|\n•·▪▫◦‣⁃]/)
        .map((skill) => skill.trim())
        .map((skill) => skill.replace(/[()[\]{}]/g, "").trim())
        .filter((skill) => skill.length > 1 && skill.length < 50)
        .filter((skill) => !skill.match(/^\d+$/))
        .filter((skill) => !skill.match(/^[^a-zA-Z]*$/))
        .slice(0, 20);

      return skills;
    } catch (error) {
      this.log("Error parsing skills string:", error);
      return [];
    }
  }

  extractSummary(text) {
    try {
      const summaryKeywords = [
        "summary",
        "objective",
        "about",
        "profile",
        "overview",
      ];
      const lines = text.split("\n");

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim().toLowerCase();
        if (summaryKeywords.some((keyword) => line.includes(keyword))) {
          const summaryLines = [];
          for (let j = i + 1; j < Math.min(i + 5, lines.length); j++) {
            const nextLine = lines[j].trim();
            if (nextLine && !this.isSectionHeader(nextLine)) {
              summaryLines.push(nextLine);
            } else {
              break;
            }
          }

          const summary = summaryLines.join(" ");
          this.log("Summary extracted", summary);
          return summary;
        }
      }
    } catch (error) {
      this.log("Error extracting summary", error);
    }

    return "";
  }

  extractAddress(text) {
    const addressPatterns = [
      /(Mumbai|Delhi|Bangalore|Chennai|Hyderabad|Pune|Kolkata|India|Ahmedabad|Surat|Jaipur|Lucknow|Kanpur|Nagpur|Visakhapatnam|Bhopal|Patna)[^\n]*/gi,
      /([A-Za-z\s]+,\s*[A-Za-z\s]+,\s*[A-Za-z\s]+)/,
      /([A-Za-z\s]+,\s*[A-Z]{2}\s*\d{5})/,
      /(\d+[^,\n]*(?:street|road|avenue|lane|drive)[^,\n]*,?[^,\n]*,?[^,\n]*)/gi,
    ];

    for (const pattern of addressPatterns) {
      const match = text.match(pattern);
      if (match) {
        return match[0].trim();
      }
    }

    return "";
  }

  extractSection(text, sectionName) {
    try {
      const escapedSectionName = this.escapeRegExp(sectionName);
      const sectionPattern = new RegExp(
        `\\b${escapedSectionName}\\b[^\\n]*\\n([\\s\\S]*?)(?=\\n\\s*\\b(?:experience|education|skills|projects|certifications?|references?)\\b|$)`,
        "i"
      );
      const match = text.match(sectionPattern);

      if (match) {
        this.log(`${sectionName} section found`, { length: match[1].length });
        return match[1];
      }
    } catch (error) {
      this.log(`Error extracting ${sectionName} section`, error);
    }

    return null;
  }

  isSectionHeader(line) {
    const sectionHeaders = [
      "experience",
      "education",
      "skills",
      "projects",
      "certifications",
      "references",
    ];
    const lowerLine = line.toLowerCase();
    return sectionHeaders.some((header) => lowerLine.includes(header));
  }

  determineField(parsedData) {
    try {
      const skills = parsedData.skills?.map((s) => s.toLowerCase()) || [];
      const allText = JSON.stringify(parsedData).toLowerCase();

      const fieldScores = {
        ai: 0,
        dataScience: 0,
        computerScience: 0,
        cyberSecurity: 0,
        webDevelopment: 0,
        mobileDevelopment: 0,
      };

      const aiSkills = [
        "python",
        "tensorflow",
        "pytorch",
        "machine learning",
        "deep learning",
        "ai",
        "neural networks",
        "keras",
      ];
      fieldScores.ai = aiSkills.filter(
        (skill) => skills.includes(skill) || allText.includes(skill)
      ).length;

      const dsSkills = [
        "python",
        "r",
        "sql",
        "pandas",
        "numpy",
        "tableau",
        "statistics",
        "data",
        "power bi",
      ];
      fieldScores.dataScience = dsSkills.filter(
        (skill) => skills.includes(skill) || allText.includes(skill)
      ).length;

      const secSkills = [
        "security",
        "ethical hacking",
        "penetration",
        "cissp",
        "cybersecurity",
      ];
      fieldScores.cyberSecurity = secSkills.filter(
        (skill) => skills.includes(skill) || allText.includes(skill)
      ).length;

      const webSkills = [
        "javascript",
        "react",
        "angular",
        "vue",
        "html",
        "css",
        "node.js",
        "express",
      ];
      fieldScores.webDevelopment = webSkills.filter(
        (skill) => skills.includes(skill) || allText.includes(skill)
      ).length;

      const mobileSkills = [
        "swift",
        "kotlin",
        "react native",
        "flutter",
        "android",
        "ios",
      ];
      fieldScores.mobileDevelopment = mobileSkills.filter(
        (skill) => skills.includes(skill) || allText.includes(skill)
      ).length;

      const csSkills = [
        "python",
        "java",
        "javascript",
        "c++",
        "programming",
        "software",
      ];
      fieldScores.computerScience = csSkills.filter(
        (skill) => skills.includes(skill) || allText.includes(skill)
      ).length;

      const maxScore = Math.max(...Object.values(fieldScores));
      const suggestedField =
        Object.keys(fieldScores).find(
          (field) => fieldScores[field] === maxScore
        ) || "computerScience";

      this.log("Field determination", { fieldScores, suggestedField });
      return suggestedField;
    } catch (error) {
      this.log("Error determining field", error);
      return "computerScience";
    }
  }

  assessExperienceLevel(parsedData) {
    try {
      const experience = parsedData.experience || [];
      const internships = parsedData.internships || [];

      let totalExperience = experience.length;
      totalExperience += internships.length * 0.5;

      const allText = JSON.stringify(parsedData).toLowerCase();
      if (
        allText.includes("senior") ||
        allText.includes("lead") ||
        allText.includes("manager")
      ) {
        totalExperience += 2;
      }

      if (totalExperience < 1) return "entry";
      if (totalExperience < 3) return "junior";
      if (totalExperience < 6) return "mid";
      return "senior";
    } catch (error) {
      this.log("Error assessing experience level", error);
      return "entry";
    }
  }

  calculateConfidence(parsedData) {
    try {
      let confidence = 0;

      if (parsedData.personal?.name) confidence += 20;
      if (parsedData.personal?.email) confidence += 20;
      if (parsedData.personal?.phone) confidence += 10;

      if (parsedData.education?.length > 0) confidence += 15;

      if (parsedData.skills?.length >= 3) confidence += 20;

      if (
        parsedData.experience?.length > 0 ||
        parsedData.internships?.length > 0
      )
        confidence += 15;

      return Math.min(100, confidence);
    } catch (error) {
      this.log("Error calculating confidence", error);
      return 50;
    }
  }
}

window.RobustResumeParser = RobustResumeParser;
