const express = require("express");
const router = express.Router();
const SkillsMapping = require("../utils/skillsMapping");

// Get skill recommendations based on field/degree
router.post("/recommendations", (req, res) => {
  try {
    const { degree, currentSkills, interests } = req.body;

    const skillsMapping = new SkillsMapping();
    const recommendations = skillsMapping.getSkillRecommendations({
      degree,
      currentSkills: currentSkills || [],
      interests: interests || [],
    });

    res.json({
      success: true,
      data: recommendations,
    });
  } catch (error) {
    console.error("Skill recommendations error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to get skill recommendations: " + error.message,
    });
  }
});

// Analyze skill gaps
router.post("/gap-analysis", (req, res) => {
  try {
    const { targetRole, currentSkills, experience } = req.body;

    const skillsMapping = new SkillsMapping();
    const gapAnalysis = skillsMapping.analyzeSkillGaps({
      targetRole,
      currentSkills: currentSkills || [],
      experience: experience || 0,
    });

    res.json({
      success: true,
      data: gapAnalysis,
    });
  } catch (error) {
    console.error("Skill gap analysis error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to analyze skill gaps: " + error.message,
    });
  }
});

// Get trending skills by industry
router.get("/trending/:industry", (req, res) => {
  try {
    const industry = req.params.industry;
    const { limit = 10 } = req.query;

    const skillsMapping = new SkillsMapping();
    const trendingSkills = skillsMapping.getTrendingSkills(
      industry,
      parseInt(limit)
    );

    res.json({
      success: true,
      data: trendingSkills,
    });
  } catch (error) {
    console.error("Trending skills error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to get trending skills: " + error.message,
    });
  }
});

// Validate and normalize skill names
router.post("/validate", (req, res) => {
  try {
    const { skills } = req.body;

    if (!Array.isArray(skills)) {
      return res.status(400).json({
        success: false,
        error: "Skills must be provided as an array",
      });
    }

    const skillsMapping = new SkillsMapping();
    const validatedSkills = skillsMapping.validateSkills(skills);

    res.json({
      success: true,
      data: validatedSkills,
    });
  } catch (error) {
    console.error("Skill validation error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to validate skills: " + error.message,
    });
  }
});

module.exports = router;
