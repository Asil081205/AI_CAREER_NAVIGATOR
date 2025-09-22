const fs = require("fs");
const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");
const path = require("path");

class ResumeParser {
  constructor(apiKey = null) {
    this.apiKey = apiKey || process.env.RESUME_PARSER_API_KEY;

    // Common patterns for extraction
    this.patterns = {
      email: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
      phone:
        /[\+]?[1-9]?[\s\-\.]?\(?[0-9]{3}\)?[\s\-\.]?[0-9]{3}[\s\-\.]?[0-9]{4}/g,
      skills:
        /(?:skills?|technologies?|programming languages?|technical skills?)[\s\n]*[:\-]?\s*([^\.]+?)(?:\n|$|\.)/gi,
      experience:
        /(?:experience|work history|employment)[\s\n]*[:\-]?\s*(.*?)(?=education|skills|$)/gis,
      education:
        /(?:education|academic|qualification)[\s\n]*[:\-]?\s*(.*?)(?=experience|skills|$)/gis,
    };

    // Skills database for normalization
    this.skillsDatabase = [
      "Python",
      "JavaScript",
      "Java",
      "C++",
      "C#",
      "React",
      "Angular",
      "Vue.js",
      "Node.js",
      "Express",
      "Django",
      "Flask",
      "Spring",
      "HTML",
      "CSS",
      "SQL",
      "MongoDB",
      "PostgreSQL",
      "MySQL",
      "Redis",
      "Docker",
      "Kubernetes",
      "AWS",
      "Azure",
      "GCP",
      "Git",
      "Jenkins",
      "TensorFlow",
      "PyTorch",
      "Scikit-learn",
      "Machine Learning",
      "Deep Learning",
      "Data Science",
      "Pandas",
      "NumPy",
      "Matplotlib",
      "Seaborn",
      "Tableau",
      "Power BI",
      "R",
      "Statistics",
      "Linux",
      "Windows",
      "MacOS",
      "Bash",
      "PowerShell",
      "Agile",
      "Scrum",
    ];
  }

  async parseResumeFile(filePath) {
    const fileExtension = path.extname(filePath).toLowerCase();
    let text = "";

    try {
      switch (fileExtension) {
        case ".pdf":
          text = await this.parsePDF(filePath);
          break;
        case ".doc":
        case ".docx":
          text = await this.parseWord(filePath);
          break;
        default:
          throw new Error("Unsupported file format");
      }

      // Extract structured data from text
      const extractedData = await this.extractStructuredData(text);

      // Use AI API for better parsing if available
      if (this.apiKey) {
        const aiEnhanced = await this.enhanceWithAI(text, extractedData);
        return aiEnhanced;
      }

      return extractedData;
    } catch (error) {
      console.error("Resume parsing error:", error);
      throw error;
    }
  }

  async parsePDF(filePath) {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdfParse(dataBuffer);
    return data.text;
  }

  async parseWord(filePath) {
    const buffer = fs.readFileSync(filePath);
    const result = await mammoth.extractRawText({ buffer });
    return result.value;
  }

  async extractStructuredData(text) {
    const data = {
      personal: this.extractPersonalInfo(text),
      education: this.extractEducation(text),
      skills: this.extractSkills(text),
      experience: this.extractExperience(text),
      interests: this.extractInterests(text),
      internships: this.extractInternships(text),
    };

    return this.cleanExtractedData(data);
  }

  extractPersonalInfo(text) {
    const emailMatch = text.match(this.patterns.email);
    const phoneMatch = text.match(this.patterns.phone);

    // Extract name (usually first line or before email)
    const lines = text.split("\n").filter((line) => line.trim().length > 0);
    const name = lines[0]?.trim() || "";

    return {
      name: this.cleanName(name),
      email: emailMatch ? emailMatch[0] : "",
      phone: phoneMatch ? phoneMatch[0].replace(/\s+/g, "") : "",
      address: this.extractAddress(text),
    };
  }

  extractEducation(text) {
    const educationMatch = text.match(this.patterns.education);
    if (!educationMatch) return {};

    const educationText = educationMatch[1];

    // Common degree patterns
    const degreePattern =
      /(B\.?Tech|Bachelor|Master|M\.?Tech|PhD|B\.?S|M\.?S|B\.?A|M\.?A)\.?\s+(?:of\s+|in\s+)?(.*?)(?:\n|$)/gi;
    const degreeMatch = educationText.match(degreePattern);

    // Institution pattern
    const institutionPattern =
      /(university|college|institute|school)\s*[:\-]?\s*([^\n]+)/gi;
    const institutionMatch = educationText.match(institutionPattern);

    // Year pattern
    const yearPattern = /(19|20)\d{2}/g;
    const yearMatch = educationText.match(yearPattern);

    // CGPA/GPA pattern
    const cgpaPattern = /(?:cgpa|gpa|grade)[\s\-:]*([\d\.]+)/gi;
    const cgpaMatch = educationText.match(cgpaPattern);

    return {
      degree: degreeMatch ? degreeMatch[0].trim() : "",
      institution: institutionMatch
        ? institutionMatch[0]
            .replace(/university|college|institute|school/gi, "")
            .replace(/[:\-]/g, "")
            .trim()
        : "",
      year: yearMatch ? Math.max(...yearMatch.map((y) => parseInt(y))) : "",
      cgpa: cgpaMatch ? parseFloat(cgpaMatch[1]) : "",
    };
  }

  extractSkills(text) {
    const skillsMatch = text.match(this.patterns.skills);
    if (!skillsMatch) return [];

    let skillsText = skillsMatch[1] || "";

    // Split by common separators
    let skills = skillsText.split(/[,\n\|•·\-\*]/);

    // Clean and filter skills
    skills = skills
      .map((skill) => skill.trim())
      .filter((skill) => skill.length > 1 && skill.length < 30)
      .filter((skill) => !skill.match(/^\d+$/)) // Remove pure numbers
      .slice(0, 15); // Limit to 15 skills

    // Normalize skills using database
    return this.normalizeSkills(skills);
  }

  extractExperience(text) {
    const experienceMatch = text.match(this.patterns.experience);
    if (!experienceMatch) return [];

    const experienceText = experienceMatch[1];

    // Try to extract job entries
    const jobPattern =
      /([^\n]+?)\s*(?:at\s+)?([^\n]*?)\s*(\d{4}[\s\-]\d{4}|\d{1,2}\/\d{4}[\s\-]\d{1,2}\/\d{4})/gi;
    const matches = [...experienceText.matchAll(jobPattern)];

    return matches
      .map((match) => ({
        role: match[1]?.trim() || "",
        company: match[2]?.trim() || "",
        duration: match[3]?.trim() || "",
        description: "",
      }))
      .slice(0, 5); // Limit to 5 experiences
  }

  extractInterests(text) {
    const interestPatterns = [
      /(?:interests?|hobbies)[\s\n]*[:\-]?\s*([^\.]+?)(?:\n|$)/gi,
      /(?:passionate about|interested in)[\s\n]*([^\.]+?)(?:\n|$)/gi,
    ];

    for (const pattern of interestPatterns) {
      const match = text.match(pattern);
      if (match) {
        return match[1]
          .split(/[,\n\|•·\-\*]/)
          .map((interest) => interest.trim())
          .filter((interest) => interest.length > 2 && interest.length < 30)
          .slice(0, 5);
      }
    }

    return [];
  }

  extractInternships(text) {
    const internPattern =
      /intern(?:ship)?.*?(?:at\s+)?([^\n]*?)(?:\s+(\d{4}|\d{1,2}\/\d{4}))?/gi;
    const matches = [...text.matchAll(internPattern)];

    return matches
      .map((match) => ({
        company: match[1]?.trim() || "",
        role: "Intern",
        duration: match[2]?.trim() || "",
      }))
      .slice(0, 3);
  }

  extractAddress(text) {
    // Simple address extraction - look for city, state patterns
    const addressPattern = /([A-Za-z\s]+),?\s*([A-Z]{2})\s*(\d{5})?/;
    const match = text.match(addressPattern);
    return match ? match[0] : "";
  }

  cleanName(name) {
    // Remove common prefixes and clean name
    return name
      .replace(/^(mr|mrs|ms|dr|prof)\.?\s*/gi, "")
      .replace(/[^\w\s]/g, "")
      .trim()
      .split(/\s+/)
      .slice(0, 3) // Max 3 name parts
      .join(" ");
  }

  normalizeSkills(skills) {
    return skills
      .map((skill) => {
        // Find closest match in skills database
        const normalized = this.skillsDatabase.find(
          (dbSkill) =>
            dbSkill.toLowerCase() === skill.toLowerCase() ||
            dbSkill.toLowerCase().includes(skill.toLowerCase()) ||
            skill.toLowerCase().includes(dbSkill.toLowerCase())
        );
        return normalized || skill;
      })
      .filter((skill, index, arr) => arr.indexOf(skill) === index); // Remove duplicates
  }

  cleanExtractedData(data) {
    // Clean empty strings and null values
    const cleaned = JSON.parse(JSON.stringify(data));

    // Remove empty arrays and objects
    Object.keys(cleaned).forEach((key) => {
      if (Array.isArray(cleaned[key]) && cleaned[key].length === 0) {
        delete cleaned[key];
      } else if (
        typeof cleaned[key] === "object" &&
        Object.keys(cleaned[key]).length === 0
      ) {
        delete cleaned[key];
      }
    });

    return cleaned;
  }

  async enhanceWithAI(text, extractedData) {
    // This would integrate with AI APIs like OpenAI, but for demo purposes,
    // we'll return the extracted data with some enhancements

    try {
      // Mock API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Enhance the extracted data with AI insights
      return {
        ...extractedData,
        aiEnhanced: true,
        confidence: 0.85,
        suggestions: this.generateSuggestions(extractedData),
      };
    } catch (error) {
      console.error("AI enhancement failed:", error);
      return extractedData;
    }
  }

  generateSuggestions(data) {
    const suggestions = [];

    if (!data.personal?.email) {
      suggestions.push(
        "Consider adding your email address for better visibility"
      );
    }

    if (!data.skills || data.skills.length < 3) {
      suggestions.push("Add more technical skills to improve your profile");
    }

    if (!data.experience || data.experience.length === 0) {
      suggestions.push("Include any work experience or projects");
    }

    return suggestions;
  }
}

module.exports = ResumeParser;
