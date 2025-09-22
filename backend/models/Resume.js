const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema(
  {
    // File information
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    originalFileName: {
      type: String,
      required: true,
    },
    storedFileName: {
      type: String,
      required: true,
      unique: true,
    },
    filePath: {
      type: String,
      required: true,
    },
    fileSize: {
      type: Number,
      required: true,
    },
    mimeType: {
      type: String,
      required: true,
      enum: [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ],
    },

    // Parsing information
    parseStatus: {
      type: String,
      enum: ["pending", "parsing", "completed", "failed"],
      default: "pending",
    },
    parseError: String,
    parsedAt: Date,

    // Raw extracted text
    rawText: {
      type: String,
      select: false, // Don't include by default in queries
    },

    // Parsed structured data
    parsedData: {
      // Personal information
      personal: {
        name: String,
        email: {
          type: String,
          lowercase: true,
        },
        phone: String,
        address: {
          full: String,
          city: String,
          state: String,
          country: String,
          zipCode: String,
        },
        linkedin: String,
        github: String,
        portfolio: String,
      },

      // Education
      education: [
        {
          degree: String,
          field: String,
          institution: String,
          location: String,
          graduationDate: Date,
          cgpa: Number,
          achievements: [String],
          courses: [String],
        },
      ],

      // Skills
      skills: {
        technical: [String],
        soft: [String],
        languages: [
          {
            name: String,
            proficiency: {
              type: String,
              enum: ["basic", "intermediate", "advanced", "native"],
            },
          },
        ],
        certifications: [
          {
            name: String,
            issuer: String,
            issueDate: Date,
            expiryDate: Date,
            credentialId: String,
            url: String,
          },
        ],
      },

      // Experience
      experience: [
        {
          company: String,
          role: String,
          startDate: Date,
          endDate: Date,
          isCurrent: Boolean,
          location: String,
          description: String,
          achievements: [String],
          technologies: [String],
        },
      ],

      // Projects
      projects: [
        {
          name: String,
          description: String,
          startDate: Date,
          endDate: Date,
          url: String,
          github: String,
          technologies: [String],
          highlights: [String],
        },
      ],

      // Internships
      internships: [
        {
          company: String,
          role: String,
          startDate: Date,
          endDate: Date,
          location: String,
          description: String,
          technologies: [String],
          supervisor: String,
          stipend: Number,
        },
      ],

      // Publications/Research
      publications: [
        {
          title: String,
          authors: [String],
          journal: String,
          publicationDate: Date,
          url: String,
          doi: String,
          abstract: String,
        },
      ],

      // Awards and Achievements
      awards: [
        {
          title: String,
          issuer: String,
          date: Date,
          description: String,
        },
      ],

      // Volunteer Experience
      volunteer: [
        {
          organization: String,
          role: String,
          startDate: Date,
          endDate: Date,
          description: String,
        },
      ],

      // Additional Information
      additional: {
        summary: String,
        objective: String,
        interests: [String],
        hobbies: [String],
      },
    },

    // AI Analysis
    aiAnalysis: {
      fieldRecommendation: {
        primary: String,
        secondary: [String],
        confidence: Number,
      },
      skillsAnalysis: {
        strengths: [String],
        gaps: [String],
        recommendations: [String],
      },
      experienceLevel: {
        overall: {
          type: String,
          enum: ["entry", "junior", "mid", "senior", "executive"],
        },
        byField: [
          {
            field: String,
            level: String,
            years: Number,
          },
        ],
      },
      improvementSuggestions: [
        {
          category: String,
          suggestion: String,
          priority: {
            type: String,
            enum: ["low", "medium", "high", "critical"],
          },
        },
      ],
      atsScore: {
        score: Number,
        factors: [
          {
            factor: String,
            score: Number,
            feedback: String,
          },
        ],
      },
    },

    // Validation and Quality Metrics
    quality: {
      completeness: {
        type: Number,
        min: 0,
        max: 100,
        default: 0,
      },
      readability: {
        type: Number,
        min: 0,
        max: 100,
        default: 0,
      },
      structure: {
        type: Number,
        min: 0,
        max: 100,
        default: 0,
      },
      issues: [
        {
          type: {
            type: String,
            enum: ["format", "content", "structure", "grammar", "missing"],
          },
          severity: {
            type: String,
            enum: ["low", "medium", "high"],
          },
          description: String,
          suggestion: String,
        },
      ],
    },

    // Processing metadata
    processing: {
      apiProvider: String, // 'internal', 'openai', 'affinda', etc.
      processingTime: Number, // in milliseconds
      tokens: {
        input: Number,
        output: Number,
      },
      cost: Number, // API cost if applicable
      version: String, // Parser version
    },

    // Status and flags
    isActive: {
      type: Boolean,
      default: true,
    },
    isPublic: {
      type: Boolean,
      default: false,
    },
    tags: [String],

    // Timestamps
    uploadedAt: {
      type: Date,
      default: Date.now,
    },
    lastModified: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes
resumeSchema.index({ userId: 1, uploadedAt: -1 });
resumeSchema.index({ parseStatus: 1 });
resumeSchema.index({ "parsedData.personal.email": 1 });
resumeSchema.index({ "parsedData.skills.technical": 1 });
resumeSchema.index({ "aiAnalysis.fieldRecommendation.primary": 1 });

// Virtual fields
resumeSchema.virtual("fileUrl").get(function () {
  return `/api/resume/download/${this._id}`;
});

resumeSchema.virtual("totalExperience").get(function () {
  if (!this.parsedData?.experience) return 0;

  let totalMonths = 0;
  this.parsedData.experience.forEach((exp) => {
    if (exp.startDate) {
      const start = new Date(exp.startDate);
      const end = exp.endDate ? new Date(exp.endDate) : new Date();
      const months =
        (end.getFullYear() - start.getFullYear()) * 12 +
        (end.getMonth() - start.getMonth());
      totalMonths += Math.max(0, months);
    }
  });

  return Math.round((totalMonths / 12) * 10) / 10;
});

resumeSchema.virtual("skillsCount").get(function () {
  const technical = this.parsedData?.skills?.technical?.length || 0;
  const soft = this.parsedData?.skills?.soft?.length || 0;
  return technical + soft;
});

resumeSchema.virtual("overallScore").get(function () {
  const quality = this.quality;
  return Math.round(
    (quality.completeness + quality.readability + quality.structure) / 3
  );
});

// Pre-save middleware
resumeSchema.pre("save", function (next) {
  this.lastModified = new Date();
  next();
});

// Instance methods
resumeSchema.methods.updateParseStatus = function (status, error = null) {
  this.parseStatus = status;
  if (error) this.parseError = error;
  if (status === "completed") this.parsedAt = new Date();
  return this.save();
};

resumeSchema.methods.calculateQuality = function () {
  const data = this.parsedData;
  let completeness = 0;
  let readability = 0;
  let structure = 0;

  // Calculate completeness (0-100)
  const requiredFields = [
    data.personal?.name,
    data.personal?.email,
    data.personal?.phone,
    data.education?.length > 0,
    data.skills?.technical?.length > 0,
    data.experience?.length > 0,
  ];

  completeness =
    (requiredFields.filter(Boolean).length / requiredFields.length) * 100;

  // Calculate readability based on text quality
  if (this.rawText) {
    const wordCount = this.rawText.split(/\s+/).length;
    const avgWordsPerSentence =
      this.rawText.split(/[.!?]+/).length > 0
        ? wordCount / this.rawText.split(/[.!?]+/).length
        : 0;

    // Simple readability score (can be improved)
    readability = Math.min(
      100,
      Math.max(0, 100 - (avgWordsPerSentence - 15) * 2)
    );
  } else {
    readability = 50; // Default score
  }

  // Calculate structure score
  const sections = [
    data.personal && Object.keys(data.personal).length > 2,
    data.education && data.education.length > 0,
    data.skills &&
      (data.skills.technical?.length > 0 || data.skills.soft?.length > 0),
    data.experience && data.experience.length > 0,
  ];

  structure = (sections.filter(Boolean).length / sections.length) * 100;

  // Update quality scores
  this.quality.completeness = Math.round(completeness);
  this.quality.readability = Math.round(readability);
  this.quality.structure = Math.round(structure);

  return this.save();
};

resumeSchema.methods.addIssue = function (issueData) {
  this.quality.issues.push(issueData);
  return this.save();
};

resumeSchema.methods.clearIssues = function () {
  this.quality.issues = [];
  return this.save();
};

resumeSchema.methods.getPublicData = function () {
  const resumeObject = this.toObject();
  delete resumeObject.rawText;
  delete resumeObject.filePath;
  delete resumeObject.processing;
  return resumeObject;
};

resumeSchema.methods.export = function (format = "json") {
  const data = this.parsedData;

  switch (format.toLowerCase()) {
    case "json":
      return JSON.stringify(data, null, 2);
    case "txt":
      return this.exportToText();
    case "csv":
      return this.exportToCSV();
    default:
      throw new Error("Unsupported export format");
  }
};

resumeSchema.methods.exportToText = function () {
  const data = this.parsedData;
  let text = "";

  // Personal Information
  if (data.personal) {
    text += `${data.personal.name}\n`;
    if (data.personal.email) text += `Email: ${data.personal.email}\n`;
    if (data.personal.phone) text += `Phone: ${data.personal.phone}\n`;
    text += "\n";
  }

  // Education
  if (data.education && data.education.length > 0) {
    text += "EDUCATION\n";
    text += "---------\n";
    data.education.forEach((edu) => {
      text += `${edu.degree} - ${edu.institution}\n`;
      if (edu.graduationDate)
        text += `Graduated: ${edu.graduationDate.getFullYear()}\n`;
      text += "\n";
    });
  }

  // Skills
  if (data.skills?.technical && data.skills.technical.length > 0) {
    text += "TECHNICAL SKILLS\n";
    text += "---------------\n";
    text += data.skills.technical.join(", ") + "\n\n";
  }

  // Experience
  if (data.experience && data.experience.length > 0) {
    text += "EXPERIENCE\n";
    text += "----------\n";
    data.experience.forEach((exp) => {
      text += `${exp.role} - ${exp.company}\n`;
      if (exp.startDate) {
        const start = exp.startDate.toLocaleDateString();
        const end = exp.endDate ? exp.endDate.toLocaleDateString() : "Present";
        text += `${start} to ${end}\n`;
      }
      if (exp.description) text += `${exp.description}\n`;
      text += "\n";
    });
  }

  return text;
};

resumeSchema.methods.exportToCSV = function () {
  // Export skills and experience as CSV
  const data = this.parsedData;
  let csv = "";

  // Skills CSV
  if (data.skills?.technical && data.skills.technical.length > 0) {
    csv += "Type,Skill\n";
    data.skills.technical.forEach((skill) => {
      csv += `Technical,"${skill}"\n`;
    });
    if (data.skills.soft) {
      data.skills.soft.forEach((skill) => {
        csv += `Soft,"${skill}"\n`;
      });
    }
  }

  return csv;
};

// Static methods
resumeSchema.statics.findByUser = function (userId) {
  return this.find({ userId, isActive: true }).sort({ uploadedAt: -1 });
};

resumeSchema.statics.findByStatus = function (status) {
  return this.find({ parseStatus: status });
};

resumeSchema.statics.findBySkill = function (skill) {
  return this.find({
    "parsedData.skills.technical": new RegExp(skill, "i"),
    isActive: true,
  });
};

resumeSchema.statics.getParsingStats = function () {
  return this.aggregate([
    {
      $group: {
        _id: "$parseStatus",
        count: { $sum: 1 },
        avgProcessingTime: { $avg: "$processing.processingTime" },
      },
    },
  ]);
};

resumeSchema.statics.findSimilarResumes = function (resumeId, limit = 5) {
  // Find resumes with similar skills and experience
  // This is a simplified version - in production, you'd use more sophisticated matching
  return this.findById(resumeId).then((resume) => {
    if (!resume) throw new Error("Resume not found");

    const skills = resume.parsedData?.skills?.technical || [];
    const field = resume.aiAnalysis?.fieldRecommendation?.primary;

    return this.find({
      _id: { $ne: resumeId },
      isActive: true,
      $or: [
        { "parsedData.skills.technical": { $in: skills } },
        { "aiAnalysis.fieldRecommendation.primary": field },
      ],
    }).limit(limit);
  });
};

module.exports = mongoose.model("Resume", resumeSchema);
