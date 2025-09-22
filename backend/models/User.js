const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    // Authentication fields
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    // Personal information
    personal: {
      firstName: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50,
      },
      lastName: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50,
      },
      phone: {
        type: String,
        trim: true,
        match: [
          /^[\+]?[1-9]?[\s\-\.]?\(?[0-9]{3}\)?[\s\-\.]?[0-9]{3}[\s\-\.]?[0-9]{4}$/,
          "Please enter a valid phone number",
        ],
      },
      address: {
        street: String,
        city: String,
        state: String,
        country: String,
        zipCode: String,
        coordinates: {
          lat: Number,
          lng: Number,
        },
      },
      profilePicture: {
        type: String, // URL to profile picture
        default: null,
      },
    },

    // Education information
    education: [
      {
        degree: {
          type: String,
          required: true,
        },
        field: String,
        institution: {
          type: String,
          required: true,
        },
        graduationYear: {
          type: Number,
          min: 1950,
          max: new Date().getFullYear() + 10,
        },
        cgpa: {
          type: Number,
          min: 0,
          max: 10,
        },
        isCurrentlyStudying: {
          type: Boolean,
          default: false,
        },
      },
    ],

    // Skills
    skills: [
      {
        name: {
          type: String,
          required: true,
          trim: true,
        },
        level: {
          type: String,
          enum: ["beginner", "intermediate", "advanced", "expert"],
          default: "beginner",
        },
        yearsOfExperience: {
          type: Number,
          min: 0,
          max: 50,
          default: 0,
        },
        verified: {
          type: Boolean,
          default: false,
        },
      },
    ],

    // Work experience
    experience: [
      {
        company: {
          type: String,
          required: true,
          trim: true,
        },
        role: {
          type: String,
          required: true,
          trim: true,
        },
        startDate: {
          type: Date,
          required: true,
        },
        endDate: Date, // null if current job
        isCurrent: {
          type: Boolean,
          default: false,
        },
        description: String,
        achievements: [String],
        technologies: [String],
        location: {
          city: String,
          country: String,
          isRemote: Boolean,
        },
      },
    ],

    // Internships
    internships: [
      {
        company: {
          type: String,
          required: true,
          trim: true,
        },
        role: {
          type: String,
          required: true,
          trim: true,
        },
        startDate: {
          type: Date,
          required: true,
        },
        endDate: {
          type: Date,
          required: true,
        },
        description: String,
        technologies: [String],
        certificate: String, // URL to certificate
        stipend: Number,
      },
    ],

    // Career interests and preferences
    careerPreferences: {
      interestedFields: [
        {
          type: String,
          enum: [
            "ai",
            "dataScience",
            "computerScience",
            "cyberSecurity",
            "eee",
            "ece",
            "mechanical",
            "civil",
            "other",
          ],
        },
      ],
      preferredJobTypes: [
        {
          type: String,
          enum: [
            "full-time",
            "part-time",
            "contract",
            "internship",
            "freelance",
          ],
        },
      ],
      preferredWorkModes: [
        {
          type: String,
          enum: ["remote", "hybrid", "on-site"],
        },
      ],
      salaryExpectation: {
        min: Number,
        max: Number,
        currency: {
          type: String,
          default: "USD",
        },
      },
      preferredLocations: [String],
      willingToRelocate: {
        type: Boolean,
        default: false,
      },
    },

    // Resume information
    resumes: [
      {
        fileName: String,
        filePath: String,
        uploadDate: {
          type: Date,
          default: Date.now,
        },
        isActive: {
          type: Boolean,
          default: true,
        },
        parsedData: mongoose.Schema.Types.Mixed,
      },
    ],

    // AI Analysis results
    aiAnalysis: {
      primaryField: String,
      skillGaps: mongoose.Schema.Types.Mixed,
      careerPath: mongoose.Schema.Types.Mixed,
      recommendations: mongoose.Schema.Types.Mixed,
      confidenceScore: Number,
      lastAnalyzed: Date,
    },

    // Job application tracking
    jobApplications: [
      {
        jobId: String,
        jobTitle: String,
        company: String,
        appliedDate: {
          type: Date,
          default: Date.now,
        },
        status: {
          type: String,
          enum: [
            "applied",
            "screening",
            "interview",
            "offer",
            "rejected",
            "withdrawn",
          ],
          default: "applied",
        },
        source: {
          type: String,
          enum: [
            "linkedin",
            "naukri",
            "indeed",
            "company",
            "referral",
            "other",
          ],
        },
        notes: String,
      },
    ],

    // Saved jobs
    savedJobs: [
      {
        jobId: String,
        jobTitle: String,
        company: String,
        savedDate: {
          type: Date,
          default: Date.now,
        },
        source: String,
      },
    ],

    // Notifications preferences
    notifications: {
      email: {
        jobRecommendations: {
          type: Boolean,
          default: true,
        },
        skillSuggestions: {
          type: Boolean,
          default: true,
        },
        applicationUpdates: {
          type: Boolean,
          default: true,
        },
      },
      push: {
        newJobs: {
          type: Boolean,
          default: false,
        },
        profileViews: {
          type: Boolean,
          default: false,
        },
      },
    },

    // Account settings
    settings: {
      profileVisibility: {
        type: String,
        enum: ["public", "private", "recruiter-only"],
        default: "public",
      },
      searchableByEmail: {
        type: Boolean,
        default: false,
      },
      language: {
        type: String,
        default: "en",
      },
      timezone: {
        type: String,
        default: "UTC",
      },
    },

    // System fields
    isVerified: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    lastLogin: Date,
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
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

// Indexes for better query performance
userSchema.index({ email: 1 });
userSchema.index({ "personal.firstName": 1, "personal.lastName": 1 });
userSchema.index({ "skills.name": 1 });
userSchema.index({ "careerPreferences.interestedFields": 1 });
userSchema.index({ createdAt: -1 });

// Virtual fields
userSchema.virtual("fullName").get(function () {
  return `${this.personal.firstName} ${this.personal.lastName}`;
});

userSchema.virtual("totalExperience").get(function () {
  if (!this.experience || this.experience.length === 0) return 0;

  let totalMonths = 0;
  this.experience.forEach((exp) => {
    const start = new Date(exp.startDate);
    const end = exp.endDate ? new Date(exp.endDate) : new Date();
    const months =
      (end.getFullYear() - start.getFullYear()) * 12 +
      (end.getMonth() - start.getMonth());
    totalMonths += Math.max(0, months);
  });

  return Math.round((totalMonths / 12) * 10) / 10; // Round to 1 decimal place
});

userSchema.virtual("skillCount").get(function () {
  return this.skills ? this.skills.length : 0;
});

// Pre-save middleware
userSchema.pre("save", async function (next) {
  // Hash password if it's modified
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

// Instance methods
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.getPublicProfile = function () {
  const userObject = this.toObject();
  delete userObject.password;
  delete userObject.email; // Only include if profile is public
  return userObject;
};

userSchema.methods.updateLastLogin = function () {
  this.lastLogin = new Date();
  return this.save();
};

userSchema.methods.addSkill = function (skillData) {
  // Check if skill already exists
  const existingSkill = this.skills.find(
    (skill) => skill.name.toLowerCase() === skillData.name.toLowerCase()
  );

  if (existingSkill) {
    // Update existing skill
    Object.assign(existingSkill, skillData);
  } else {
    // Add new skill
    this.skills.push(skillData);
  }

  return this.save();
};

userSchema.methods.removeSkill = function (skillName) {
  this.skills = this.skills.filter(
    (skill) => skill.name.toLowerCase() !== skillName.toLowerCase()
  );
  return this.save();
};

userSchema.methods.addJobApplication = function (applicationData) {
  this.jobApplications.push(applicationData);
  return this.save();
};

userSchema.methods.saveJob = function (jobData) {
  // Check if job is already saved
  const existingJob = this.savedJobs.find((job) => job.jobId === jobData.jobId);

  if (!existingJob) {
    this.savedJobs.push(jobData);
    return this.save();
  }

  return this;
};

userSchema.methods.unsaveJob = function (jobId) {
  this.savedJobs = this.savedJobs.filter((job) => job.jobId !== jobId);
  return this.save();
};

// Static methods
userSchema.statics.findByEmail = function (email) {
  return this.findOne({ email: email.toLowerCase() });
};

userSchema.statics.findBySkill = function (skillName) {
  return this.find({ "skills.name": new RegExp(skillName, "i") });
};

userSchema.statics.findByField = function (field) {
  return this.find({ "careerPreferences.interestedFields": field });
};

userSchema.statics.getActiveUsers = function () {
  return this.find({ isActive: true });
};

module.exports = mongoose.model("User", userSchema);
