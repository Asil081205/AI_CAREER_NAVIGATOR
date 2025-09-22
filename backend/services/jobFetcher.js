const axios = require("axios");
const fs = require("fs");
const path = require("path");

class JobFetcher {
  constructor() {
    this.linkedinApiKey = process.env.LINKEDIN_API_KEY;
    this.naukriApiKey = process.env.NAUKRI_API_KEY;
    this.indeedApiKey = process.env.INDEED_API_KEY;

    // Mock job database for demo purposes
    this.mockJobsDatabase = this.loadMockJobs();
  }

  loadMockJobs() {
    return {
      ai: [
        {
          id: "ai_001",
          title: "AI Engineer",
          company: "Google",
          location: "Mountain View, CA",
          coordinates: { lat: 37.4221, lng: -122.0841 },
          description:
            "Develop cutting-edge AI solutions and machine learning models to solve complex problems.",
          requirements: [
            "Python",
            "TensorFlow",
            "Machine Learning",
            "Deep Learning",
          ],
          salary: "$120,000 - $180,000",
          experience: "2-4 years",
          jobType: "Full-time",
          linkedinLink: "https://linkedin.com/jobs/view/3847291",
          naukriLink: "https://naukri.com/ai-engineer-google-jobs",
          postedDate: "2025-09-20",
          category: "ai",
        },
        {
          id: "ai_002",
          title: "Machine Learning Engineer",
          company: "Microsoft",
          location: "Seattle, WA",
          coordinates: { lat: 47.6432, lng: -122.1378 },
          description:
            "Build and deploy ML models at scale using Azure cloud services.",
          requirements: ["Python", "PyTorch", "Azure", "MLOps"],
          salary: "$110,000 - $170,000",
          experience: "3-5 years",
          jobType: "Full-time",
          linkedinLink: "https://linkedin.com/jobs/view/3847292",
          naukriLink: "https://naukri.com/ml-engineer-microsoft-jobs",
          postedDate: "2025-09-19",
          category: "ai",
        },
        {
          id: "ai_003",
          title: "AI Research Scientist",
          company: "OpenAI",
          location: "San Francisco, CA",
          coordinates: { lat: 37.7749, lng: -122.4194 },
          description:
            "Research and develop advanced AI systems and neural networks.",
          requirements: ["Deep Learning", "Research", "Python", "PyTorch"],
          salary: "$150,000 - $250,000",
          experience: "4+ years",
          jobType: "Full-time",
          linkedinLink: "https://linkedin.com/jobs/view/3847293",
          naukriLink: "https://naukri.com/ai-researcher-openai-jobs",
          postedDate: "2025-09-18",
          category: "ai",
        },
      ],
      dataScience: [
        {
          id: "ds_001",
          title: "Data Scientist",
          company: "Netflix",
          location: "Los Gatos, CA",
          coordinates: { lat: 37.2533, lng: -121.9815 },
          description:
            "Analyze user behavior data to drive content recommendations and business decisions.",
          requirements: ["Python", "Statistics", "SQL", "Pandas", "Tableau"],
          salary: "$95,000 - $150,000",
          experience: "2-4 years",
          jobType: "Full-time",
          linkedinLink: "https://linkedin.com/jobs/view/3847294",
          naukriLink: "https://naukri.com/data-scientist-netflix-jobs",
          postedDate: "2025-09-21",
          category: "data-science",
        },
        {
          id: "ds_002",
          title: "Senior Data Analyst",
          company: "Spotify",
          location: "New York, NY",
          coordinates: { lat: 40.7128, lng: -74.006 },
          description:
            "Extract insights from music streaming data to improve user experience.",
          requirements: ["SQL", "Tableau", "Python", "Statistics"],
          salary: "$80,000 - $120,000",
          experience: "3-5 years",
          jobType: "Full-time",
          linkedinLink: "https://linkedin.com/jobs/view/3847295",
          naukriLink: "https://naukri.com/data-analyst-spotify-jobs",
          postedDate: "2025-09-20",
          category: "data-science",
        },
      ],
      computerScience: [
        {
          id: "cs_001",
          title: "Software Engineer",
          company: "Meta",
          location: "Menlo Park, CA",
          coordinates: { lat: 37.4852, lng: -122.1483 },
          description:
            "Build scalable web applications and services used by billions of people.",
          requirements: ["React", "JavaScript", "System Design", "Node.js"],
          salary: "$100,000 - $160,000",
          experience: "1-3 years",
          jobType: "Full-time",
          linkedinLink: "https://linkedin.com/jobs/view/3847296",
          naukriLink: "https://naukri.com/software-engineer-meta-jobs",
          postedDate: "2025-09-21",
          category: "cs",
        },
        {
          id: "cs_002",
          title: "Full Stack Developer",
          company: "Amazon",
          location: "Austin, TX",
          coordinates: { lat: 30.2672, lng: -97.7431 },
          description:
            "Develop end-to-end web solutions for e-commerce platforms.",
          requirements: ["JavaScript", "Node.js", "React", "AWS"],
          salary: "$90,000 - $140,000",
          experience: "2-4 years",
          jobType: "Full-time",
          linkedinLink: "https://linkedin.com/jobs/view/3847297",
          naukriLink: "https://naukri.com/fullstack-developer-amazon-jobs",
          postedDate: "2025-09-19",
          category: "cs",
        },
      ],
      cyberSecurity: [
        {
          id: "cyber_001",
          title: "Cybersecurity Analyst",
          company: "Cisco",
          location: "San Jose, CA",
          coordinates: { lat: 37.3541, lng: -121.9552 },
          description: "Monitor network security and respond to cyber threats.",
          requirements: [
            "Network Security",
            "Ethical Hacking",
            "Linux",
            "SIEM",
          ],
          salary: "$85,000 - $125,000",
          experience: "2-4 years",
          jobType: "Full-time",
          linkedinLink: "https://linkedin.com/jobs/view/3847298",
          naukriLink: "https://naukri.com/security-analyst-cisco-jobs",
          postedDate: "2025-09-20",
          category: "cyber",
        },
        {
          id: "cyber_002",
          title: "Security Engineer",
          company: "CrowdStrike",
          location: "Austin, TX",
          coordinates: { lat: 30.2672, lng: -97.7431 },
          description:
            "Develop security tools and incident response procedures.",
          requirements: [
            "Penetration Testing",
            "CISSP",
            "Security Tools",
            "Python",
          ],
          salary: "$95,000 - $145,000",
          experience: "3-5 years",
          jobType: "Full-time",
          linkedinLink: "https://linkedin.com/jobs/view/3847299",
          naukriLink: "https://naukri.com/security-engineer-crowdstrike-jobs",
          postedDate: "2025-09-18",
          category: "cyber",
        },
      ],
    };
  }

  async getRecommendations({ skills, interests, education, location }) {
    try {
      // Determine primary field based on education and interests
      const primaryField = this.determinePrimaryField(education, interests);

      // Get relevant jobs
      let allJobs = [];
      Object.values(this.mockJobsDatabase).forEach((jobs) => {
        allJobs = [...allJobs, ...jobs];
      });

      // Score and filter jobs based on user profile
      const scoredJobs = this.scoreJobs(allJobs, skills, interests, education);

      // Sort by relevance score and return top matches
      const recommendations = scoredJobs
        .sort((a, b) => b.score - a.score)
        .slice(0, 10);

      return {
        recommendations,
        totalFound: scoredJobs.length,
        primaryField,
        searchCriteria: { skills, interests, education, location },
      };
    } catch (error) {
      console.error("Job recommendation error:", error);
      throw error;
    }
  }

  determinePrimaryField(education, interests) {
    const degree = education?.degree?.toLowerCase() || "";
    const userInterests = interests?.map((i) => i.toLowerCase()) || [];

    if (degree.includes("ai") || degree.includes("artificial intelligence"))
      return "ai";
    if (degree.includes("data science") || degree.includes("ds"))
      return "dataScience";
    if (degree.includes("cyber") || degree.includes("security"))
      return "cyberSecurity";
    if (degree.includes("cs") || degree.includes("computer science"))
      return "computerScience";

    // Check interests
    if (
      userInterests.some(
        (i) => i.includes("ai") || i.includes("machine learning")
      )
    )
      return "ai";
    if (userInterests.some((i) => i.includes("data"))) return "dataScience";
    if (
      userInterests.some((i) => i.includes("cyber") || i.includes("security"))
    )
      return "cyberSecurity";

    return "computerScience";
  }

  scoreJobs(jobs, userSkills, interests, education) {
    return jobs.map((job) => {
      let score = 0;

      // Skill matching (40% weight)
      const skillMatches = job.requirements.filter((req) =>
        userSkills.some(
          (skill) =>
            skill.toLowerCase().includes(req.toLowerCase()) ||
            req.toLowerCase().includes(skill.toLowerCase())
        )
      );
      score += (skillMatches.length / job.requirements.length) * 40;

      // Interest matching (30% weight)
      const interestMatches = interests.filter(
        (interest) =>
          job.title.toLowerCase().includes(interest.toLowerCase()) ||
          job.description.toLowerCase().includes(interest.toLowerCase())
      );
      score += (interestMatches.length / Math.max(interests.length, 1)) * 30;

      // Education relevance (20% weight)
      const degree = education?.degree?.toLowerCase() || "";
      if (job.category === "ai" && degree.includes("ai")) score += 20;
      else if (job.category === "dataScience" && degree.includes("data"))
        score += 20;
      else if (job.category === "cyberSecurity" && degree.includes("cyber"))
        score += 20;
      else if (job.category === "cs" && degree.includes("computer"))
        score += 20;
      else score += 10; // Base education score

      // Recency (10% weight)
      const daysOld = this.getDaysOld(job.postedDate);
      score += Math.max(0, 10 - daysOld / 7); // Newer jobs get higher scores

      return { ...job, score: Math.round(score) };
    });
  }

  getDaysOld(postedDate) {
    const posted = new Date(postedDate);
    const now = new Date();
    return Math.floor((now - posted) / (1000 * 60 * 60 * 24));
  }

  async searchJobs({
    query,
    location,
    experience_level,
    job_type,
    page = 1,
    limit = 20,
  }) {
    try {
      let allJobs = [];
      Object.values(this.mockJobsDatabase).forEach((jobs) => {
        allJobs = [...allJobs, ...jobs];
      });

      // Filter jobs based on search criteria
      let filteredJobs = allJobs;

      if (query) {
        filteredJobs = filteredJobs.filter(
          (job) =>
            job.title.toLowerCase().includes(query.toLowerCase()) ||
            job.description.toLowerCase().includes(query.toLowerCase()) ||
            job.company.toLowerCase().includes(query.toLowerCase())
        );
      }

      if (location) {
        filteredJobs = filteredJobs.filter((job) =>
          job.location.toLowerCase().includes(location.toLowerCase())
        );
      }

      if (experience_level) {
        filteredJobs = filteredJobs.filter((job) =>
          job.experience.toLowerCase().includes(experience_level.toLowerCase())
        );
      }

      if (job_type) {
        filteredJobs = filteredJobs.filter(
          (job) => job.jobType.toLowerCase() === job_type.toLowerCase()
        );
      }

      // Pagination
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedJobs = filteredJobs.slice(startIndex, endIndex);

      return {
        jobs: paginatedJobs,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(filteredJobs.length / limit),
          totalJobs: filteredJobs.length,
          hasNext: endIndex < filteredJobs.length,
          hasPrev: page > 1,
        },
      };
    } catch (error) {
      console.error("Job search error:", error);
      throw error;
    }
  }

  async getJobDetails(jobId) {
    try {
      let allJobs = [];
      Object.values(this.mockJobsDatabase).forEach((jobs) => {
        allJobs = [...allJobs, ...jobs];
      });

      const job = allJobs.find((j) => j.id === jobId);

      if (!job) {
        return null;
      }

      // Add additional details for single job view
      return {
        ...job,
        benefits: [
          "Health Insurance",
          "Dental Insurance",
          "401k Matching",
          "Flexible PTO",
          "Remote Work Options",
        ],
        applicationDeadline: this.getApplicationDeadline(),
        applicants: Math.floor(Math.random() * 200) + 50,
        similarJobs: this.getSimilarJobs(job, 3),
      };
    } catch (error) {
      console.error("Get job details error:", error);
      throw error;
    }
  }

  getApplicationDeadline() {
    const deadline = new Date();
    deadline.setDate(deadline.getDate() + Math.floor(Math.random() * 30) + 7);
    return deadline.toISOString().split("T")[0];
  }

  getSimilarJobs(targetJob, count) {
    let allJobs = [];
    Object.values(this.mockJobsDatabase).forEach((jobs) => {
      allJobs = [...allJobs, ...jobs];
    });

    return allJobs
      .filter(
        (job) => job.id !== targetJob.id && job.category === targetJob.category
      )
      .slice(0, count);
  }

  async getNearbyJobs({ latitude, longitude, radius = 50, limit = 10 }) {
    try {
      let allJobs = [];
      Object.values(this.mockJobsDatabase).forEach((jobs) => {
        allJobs = [...allJobs, ...jobs];
      });

      // Filter jobs by distance
      const nearbyJobs = allJobs
        .map((job) => ({
          ...job,
          distance: this.calculateDistance(
            latitude,
            longitude,
            job.coordinates.lat,
            job.coordinates.lng
          ),
        }))
        .filter((job) => job.distance <= radius)
        .sort((a, b) => a.distance - b.distance)
        .slice(0, limit);

      return nearbyJobs;
    } catch (error) {
      console.error("Nearby jobs error:", error);
      throw error;
    }
  }

  calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 3959; // Earth's radius in miles
    const dLat = this.toRadians(lat2 - lat1);
    const dLon = this.toRadians(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRadians(lat1)) *
        Math.cos(this.toRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  toRadians(degrees) {
    return degrees * (Math.PI / 180);
  }

  // Real API integration methods (for future use)
  async fetchFromLinkedIn(query, location) {
    if (!this.linkedinApiKey) {
      throw new Error("LinkedIn API key not configured");
    }

    try {
      const response = await axios.get(
        "https://api.linkedin.com/v2/jobSearch",
        {
          headers: {
            Authorization: `Bearer ${this.linkedinApiKey}`,
            "Content-Type": "application/json",
          },
          params: {
            keywords: query,
            locationName: location,
            count: 25,
          },
        }
      );

      return response.data.elements || [];
    } catch (error) {
      console.error("LinkedIn API error:", error);
      return [];
    }
  }

  async fetchFromNaukri(query, location) {
    if (!this.naukriApiKey) {
      throw new Error("Naukri API key not configured");
    }

    try {
      // Mock Naukri API call - replace with actual endpoint
      const response = await axios.get("https://api.naukri.com/jobs/search", {
        headers: {
          Authorization: `Bearer ${this.naukriApiKey}`,
          "Content-Type": "application/json",
        },
        params: {
          query,
          location,
          limit: 25,
        },
      });

      return response.data.jobs || [];
    } catch (error) {
      console.error("Naukri API error:", error);
      return [];
    }
  }
}

module.exports = JobFetcher;
