const express = require("express");
const router = express.Router();
const JobFetcher = require("../services/jobFetcher");

// Get job recommendations
router.post("/recommendations", async (req, res) => {
  try {
    const { skills, interests, education, location } = req.body;

    const jobFetcher = new JobFetcher();
    const recommendations = await jobFetcher.getRecommendations({
      skills,
      interests,
      education,
      location,
    });

    res.json({
      success: true,
      data: recommendations,
    });
  } catch (error) {
    console.error("Job recommendation error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to get job recommendations: " + error.message,
    });
  }
});

// Search jobs by criteria
router.get("/search", async (req, res) => {
  try {
    const {
      query,
      location,
      experience_level,
      job_type,
      page = 1,
      limit = 20,
    } = req.query;

    const jobFetcher = new JobFetcher();
    const results = await jobFetcher.searchJobs({
      query,
      location,
      experience_level,
      job_type,
      page: parseInt(page),
      limit: parseInt(limit),
    });

    res.json({
      success: true,
      data: results,
    });
  } catch (error) {
    console.error("Job search error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to search jobs: " + error.message,
    });
  }
});

// Get job details by ID
router.get("/:jobId", async (req, res) => {
  try {
    const jobId = req.params.jobId;
    const jobFetcher = new JobFetcher();
    const jobDetails = await jobFetcher.getJobDetails(jobId);

    if (!jobDetails) {
      return res.status(404).json({
        success: false,
        error: "Job not found",
      });
    }

    res.json({
      success: true,
      data: jobDetails,
    });
  } catch (error) {
    console.error("Job details error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to get job details: " + error.message,
    });
  }
});

// Get nearby jobs using coordinates
router.get("/nearby/:lat/:lng", async (req, res) => {
  try {
    const { lat, lng } = req.params;
    const { radius = 50, limit = 10 } = req.query;

    const jobFetcher = new JobFetcher();
    const nearbyJobs = await jobFetcher.getNearbyJobs({
      latitude: parseFloat(lat),
      longitude: parseFloat(lng),
      radius: parseInt(radius),
      limit: parseInt(limit),
    });

    res.json({
      success: true,
      data: nearbyJobs,
    });
  } catch (error) {
    console.error("Nearby jobs error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to get nearby jobs: " + error.message,
    });
  }
});

module.exports = router;
