const express = require("express");
const router = express.Router();
const ResumeParser = require("../services/resumeParser");
const multer = require("multer");
const path = require("path");

const upload = multer({ dest: "uploads/" });

// Parse resume endpoint
router.post("/parse", upload.single("resume"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No resume file provided" });
    }

    const parser = new ResumeParser();
    const parsedData = await parser.parseResumeFile(req.file.path);

    // Clean up uploaded file
    const fs = require("fs");
    fs.unlinkSync(req.file.path);

    res.json({
      success: true,
      data: parsedData,
    });
  } catch (error) {
    console.error("Resume parsing error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to parse resume: " + error.message,
    });
  }
});

// Get parsed resume data
router.get("/data/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    // In a real app, fetch from database
    // For now, return mock data

    res.json({
      success: true,
      data: {
        personal: {
          name: "John Doe",
          email: "john.doe@email.com",
          phone: "+1-234-567-8900",
        },
        skills: ["Python", "JavaScript", "React"],
        experience: [],
        education: [],
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Save user profile
router.post("/profile", async (req, res) => {
  try {
    const profileData = req.body;

    // Validate required fields
    if (!profileData.personal || !profileData.personal.name) {
      return res.status(400).json({
        success: false,
        error: "Name is required",
      });
    }

    // In a real app, save to database
    // For now, just return success

    res.json({
      success: true,
      message: "Profile saved successfully",
      profileId: Date.now().toString(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

module.exports = router;
