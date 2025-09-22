// Edit page specific functionality
let parsedData = {};
let skillsSuggestions = [];
let educationCount = 1;
let experienceCount = 1;
let internshipCount = 1;
let projectCount = 1;

// Common skills database for suggestions
const commonSkills = [
  // Programming Languages
  "Python",
  "JavaScript",
  "Java",
  "C++",
  "C#",
  "TypeScript",
  "Go",
  "Rust",
  "Swift",
  "Kotlin",
  "PHP",
  "Ruby",
  "Scala",
  "R",
  "MATLAB",
  "SQL",
  "HTML",
  "CSS",
  "Dart",

  // Frameworks & Libraries
  "React",
  "Angular",
  "Vue.js",
  "Node.js",
  "Express.js",
  "Django",
  "Flask",
  "Spring Boot",
  "ASP.NET",
  "Laravel",
  "Ruby on Rails",
  "Flutter",
  "React Native",
  "Ionic",
  "TensorFlow",
  "PyTorch",
  "Keras",
  "Scikit-learn",
  "OpenCV",
  "Pandas",
  "NumPy",

  // Databases
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

  // Cloud & DevOps
  "AWS",
  "Azure",
  "Google Cloud",
  "Docker",
  "Kubernetes",
  "Jenkins",
  "GitLab CI",
  "GitHub Actions",
  "Terraform",
  "Ansible",
  "Chef",
  "Puppet",

  // Tools & Technologies
  "Git",
  "Linux",
  "Windows",
  "macOS",
  "Bash",
  "PowerShell",
  "Vim",
  "VS Code",
  "IntelliJ IDEA",
  "Eclipse",
  "Xcode",
  "Android Studio",

  // Specialized
  "Machine Learning",
  "Deep Learning",
  "Artificial Intelligence",
  "Data Science",
  "Computer Vision",
  "Natural Language Processing",
  "Big Data",
  "Blockchain",
  "IoT",
  "AR/VR",
  "Game Development",
  "Mobile Development",
  "Web Development",
  "DevOps",
  "Cybersecurity",
  "UI/UX Design",
  "Agile",
  "Scrum",
  "Kanban",
];

// Initialize the page
document.addEventListener("DOMContentLoaded", function () {
  initializeEditPage();
  setupEventListeners();
  loadResumeData();
});

function initializeEditPage() {
  // Show loading overlay initially
  showLoadingOverlay();

  // Simulate processing time
  simulateResumeProcessing();

  // Initialize skill suggestions
  skillsSuggestions = commonSkills.slice();

  // Initialize tooltips and validations
  initializeFormValidation();
}

function simulateResumeProcessing() {
  const loadingSteps = [
    { text: "Initializing AI parser...", progress: 10 },
    { text: "Extracting personal information...", progress: 25 },
    { text: "Parsing education details...", progress: 40 },
    { text: "Identifying skills...", progress: 60 },
    { text: "Processing work experience...", progress: 80 },
    { text: "Finalizing extraction...", progress: 95 },
    { text: "Complete!", progress: 100 },
  ];

  let currentStep = 0;
  const interval = setInterval(() => {
    if (currentStep < loadingSteps.length) {
      const step = loadingSteps[currentStep];
      updateLoadingProgress(step.progress, step.text);
      currentStep++;
    } else {
      clearInterval(interval);
      setTimeout(() => {
        hideLoadingOverlay();
        loadExtractedData();
      }, 500);
    }
  }, 600);
}

function updateLoadingProgress(progress, text) {
  const progressBar = document.getElementById("loadingProgress");
  const loadingText = document.getElementById("loadingText");

  if (progressBar && loadingText) {
    progressBar.style.width = progress + "%";
    loadingText.textContent = text;
  }
}

function showLoadingOverlay() {
  const overlay = document.getElementById("loadingOverlay");
  if (overlay) {
    overlay.style.display = "flex";
  }
}

function hideLoadingOverlay() {
  const overlay = document.getElementById("loadingOverlay");
  if (overlay) {
    overlay.style.display = "none";
  }
}

function loadResumeData() {
  // Try to load data from localStorage or URL parameters
  const savedData = localStorage.getItem("parsedResumeData");
  const uploadedFile = localStorage.getItem("uploadedFileName");

  if (savedData) {
    try {
      parsedData = JSON.parse(savedData);
    } catch (error) {
      console.error("Error parsing saved data:", error);
      parsedData = generateSampleData();
    }
  } else {
    // Generate sample data for demonstration
    parsedData = generateSampleData();
    localStorage.setItem("parsedResumeData", JSON.stringify(parsedData));
  }
}

function generateSampleData() {
  // Generate sample extracted data based on common resume patterns
  return {
    personal: {
      name: "John Doe",
      email: "john.doe@email.com",
      phone: "+91-9876543210",
      address: "Mumbai, Maharashtra, India",
    },
    education: [
      {
        degree: "B.Tech Computer Science",
        institution: "Indian Institute of Technology",
        year: "2024",
        cgpa: "8.5",
      },
    ],
    skills: [
      "Python",
      "JavaScript",
      "React",
      "Node.js",
      "SQL",
      "Git",
      "Machine Learning",
    ],
    experience: [
      {
        company: "Tech Innovations Ltd",
        role: "Software Development Intern",
        duration: "Jun 2023 - Aug 2023",
        location: "Bangalore, India",
        description:
          "Developed web applications using React and Node.js, worked on API integration and database optimization.",
      },
    ],
    internships: [
      {
        company: "StartupXYZ",
        role: "Data Science Intern",
        duration: "Dec 2023 - Mar 2024",
        location: "Pune, India",
        description:
          "Worked on machine learning models for customer behavior analysis and data visualization.",
      },
    ],
    projects: [
      {
        name: "E-commerce Website",
        technologies: "React, Node.js, MongoDB, Express",
        description:
          "Built a full-stack e-commerce platform with user authentication, product catalog, and payment integration.",
      },
    ],
    summary:
      "Computer Science student with experience in full-stack development and machine learning.",
    suggestedField: "computerScience",
    experienceLevel: "entry",
  };
}

function loadExtractedData() {
  if (!parsedData || Object.keys(parsedData).length === 0) {
    showError("No resume data found. Please upload a resume first.");
    return;
  }

  // Load personal information
  if (parsedData.personal) {
    setFieldValue("fullName", parsedData.personal.name);
    setFieldValue("email", parsedData.personal.email);
    setFieldValue("phone", parsedData.personal.phone);
    setFieldValue("address", parsedData.personal.address);

    // Add confidence indicators
    addConfidenceIndicator(
      "nameConfidence",
      parsedData.personal.name ? "high" : "low"
    );
    addConfidenceIndicator(
      "emailConfidence",
      parsedData.personal.email ? "high" : "low"
    );
  }

  // Load education
  if (parsedData.education && parsedData.education.length > 0) {
    const edu = parsedData.education[0];
    setFieldValue("degree0", edu.degree);
    setFieldValue("institution0", edu.institution);
    setFieldValue("year0", edu.year);
    setFieldValue("cgpa0", edu.cgpa);

    // Add additional education entries if they exist
    for (let i = 1; i < parsedData.education.length && i < 3; i++) {
      addEducation();
      const eduItem = parsedData.education[i];
      setFieldValue(`degree${i}`, eduItem.degree);
      setFieldValue(`institution${i}`, eduItem.institution);
      setFieldValue(`year${i}`, eduItem.year);
      setFieldValue(`cgpa${i}`, eduItem.cgpa);
    }
  }

  // Load skills
  if (parsedData.skills && parsedData.skills.length > 0) {
    parsedData.skills.forEach((skill) => {
      addSkill(skill);
    });
    updateSkillsCount();
    generateSkillSuggestions();
  }

  // Load experience
  if (parsedData.experience && parsedData.experience.length > 0) {
    const exp = parsedData.experience[0];
    setFieldValue("company0", exp.company);
    setFieldValue("role0", exp.role);
    setFieldValue("duration0", exp.duration);
    setFieldValue("location0", exp.location);
    setFieldValue("description0", exp.description);

    // Add additional experience entries
    for (let i = 1; i < parsedData.experience.length && i < 3; i++) {
      addExperience();
      const expItem = parsedData.experience[i];
      setFieldValue(`company${i}`, expItem.company);
      setFieldValue(`role${i}`, expItem.role);
      setFieldValue(`duration${i}`, expItem.duration);
      setFieldValue(`location${i}`, expItem.location);
      setFieldValue(`description${i}`, expItem.description);
    }
  }

  // Load internships
  if (parsedData.internships && parsedData.internships.length > 0) {
    const intern = parsedData.internships[0];
    setFieldValue("internCompany0", intern.company);
    setFieldValue("internRole0", intern.role);
    setFieldValue("internDuration0", intern.duration);
    setFieldValue("internLocation0", intern.location);
    setFieldValue("internDescription0", intern.description);
  }

  // Load projects
  if (parsedData.projects && parsedData.projects.length > 0) {
    const project = parsedData.projects[0];
    setFieldValue("projectName0", project.name);
    setFieldValue("projectTech0", project.technologies);
    setFieldValue("projectDescription0", project.description);
  }

  // Suggest interests based on extracted data
  suggestInterests();

  // Add fade-in animation
  document.querySelector(".edit-content").classList.add("fade-in");

  showSuccess("Resume data loaded successfully!");
}

function setFieldValue(fieldId, value) {
  const field = document.getElementById(fieldId);
  if (field && value) {
    field.value = value;
    field.classList.add("fade-in");
  }
}

function addConfidenceIndicator(elementId, confidence) {
  const element = document.getElementById(elementId);
  if (element) {
    const confidenceText =
      confidence === "high"
        ? '<i class="fas fa-check-circle"></i> Extracted with high confidence'
        : '<i class="fas fa-exclamation-triangle"></i> Please verify this information';

    element.innerHTML = confidenceText;
    element.className = `input-feedback ${confidence}-confidence`;
  }
}

function setupEventListeners() {
  // Skills input handler
  const skillInput = document.getElementById("skillInput");
  if (skillInput) {
    skillInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter" || e.key === ",") {
        e.preventDefault();
        addSkillFromInput();
      }
    });

    skillInput.addEventListener("input", function () {
      showSkillSuggestions(this.value);
    });

    skillInput.addEventListener("blur", function () {
      setTimeout(() => {
        hideSkillSuggestions();
      }, 200);
    });
  }

  // Form validation
  document
    .getElementById("profileForm")
    .addEventListener("input", validateForm);

  // Auto-save functionality
  setInterval(autoSave, 30000); // Auto-save every 30 seconds
}

function initializeFormValidation() {
  const requiredFields = document.querySelectorAll(
    "input[required], select[required]"
  );
  requiredFields.forEach((field) => {
    field.addEventListener("blur", function () {
      validateField(this);
    });
  });
}

function validateField(field) {
  const isValid = field.checkValidity();
  if (isValid) {
    field.classList.remove("invalid");
    field.classList.add("valid");
  } else {
    field.classList.remove("valid");
    field.classList.add("invalid");
  }
}

function validateForm() {
  const requiredFields = document.querySelectorAll(
    "input[required], select[required]"
  );
  let isValid = true;

  requiredFields.forEach((field) => {
    if (!field.checkValidity()) {
      isValid = false;
    }
  });

  const generateBtn = document.querySelector(
    'button[onclick="generateAIRecommendations()"]'
  );
  if (generateBtn) {
    generateBtn.disabled = !isValid;
  }

  return isValid;
}

// Skills Management
function addSkillFromInput() {
  const skillInput = document.getElementById("skillInput");
  const skillValue = skillInput.value.trim();

  if (skillValue) {
    addSkill(skillValue);
    skillInput.value = "";
    hideSkillSuggestions();
    generateSkillSuggestions();
  }
}

function addSkill(skillName) {
  if (!skillName || skillName.length < 2) return;

  const skillsContainer = document.getElementById("skillsContainer");
  const existingSkills = Array.from(skillsContainer.children).map((skill) =>
    skill.querySelector("span").textContent.toLowerCase()
  );

  if (existingSkills.includes(skillName.toLowerCase())) {
    showError(`Skill "${skillName}" is already added.`);
    return;
  }

  const skillTag = document.createElement("div");
  skillTag.className = "skill-tag";
  skillTag.innerHTML = `
        <span>${skillName}</span>
        <button class="remove-skill" onclick="removeSkill(this)" type="button">
            <i class="fas fa-times"></i>
        </button>
    `;

  skillsContainer.appendChild(skillTag);
  updateSkillsCount();
}

function removeSkill(button) {
  const skillTag = button.closest(".skill-tag");
  if (skillTag) {
    skillTag.style.animation = "fadeOut 0.3s ease";
    setTimeout(() => {
      skillTag.remove();
      updateSkillsCount();
      generateSkillSuggestions();
    }, 300);
  }
}

function updateSkillsCount() {
  const skillsContainer = document.getElementById("skillsContainer");
  const skillCount = skillsContainer.children.length;
  const skillsSummary = document.getElementById("skillsSummary");

  if (skillsSummary) {
    skillsSummary.innerHTML = `<span class="skill-count">${skillCount} skills added</span>`;
  }
}

function showSkillSuggestions(query) {
  if (!query || query.length < 2) {
    hideSkillSuggestions();
    return;
  }

  const suggestions = commonSkills
    .filter(
      (skill) =>
        skill.toLowerCase().includes(query.toLowerCase()) &&
        !isSkillAlreadyAdded(skill)
    )
    .slice(0, 5);

  const suggestionsContainer = document.getElementById("skillSuggestions");
  if (suggestions.length > 0) {
    suggestionsContainer.innerHTML = suggestions
      .map(
        (skill) =>
          `<div class="suggestion-item" onclick="selectSuggestion('${skill}')">${skill}</div>`
      )
      .join("");
    suggestionsContainer.style.display = "block";
  } else {
    hideSkillSuggestions();
  }
}

function hideSkillSuggestions() {
  const suggestionsContainer = document.getElementById("skillSuggestions");
  if (suggestionsContainer) {
    suggestionsContainer.style.display = "none";
  }
}

function selectSuggestion(skill) {
  addSkill(skill);
  document.getElementById("skillInput").value = "";
  hideSkillSuggestions();
  generateSkillSuggestions();
}

function isSkillAlreadyAdded(skillName) {
  const skillsContainer = document.getElementById("skillsContainer");
  const existingSkills = Array.from(skillsContainer.children).map((skill) =>
    skill.querySelector("span").textContent.toLowerCase()
  );
  return existingSkills.includes(skillName.toLowerCase());
}

function generateSkillSuggestions() {
  const currentSkills = getCurrentSkills();
  const suggestedField = parsedData.suggestedField || "computerScience";

  // Get field-specific skill suggestions
  const fieldSkills = getFieldSpecificSkills(suggestedField);
  const suggestions = fieldSkills
    .filter(
      (skill) =>
        !currentSkills.some(
          (currentSkill) => currentSkill.toLowerCase() === skill.toLowerCase()
        )
    )
    .slice(0, 8);

  const suggestionsContainer = document.querySelector(".suggestions-container");
  if (suggestionsContainer && suggestions.length > 0) {
    suggestionsContainer.innerHTML = suggestions
      .map(
        (skill) =>
          `<div class="suggested-skill" onclick="addSuggestedSkill('${skill}')">
                <i class="fas fa-plus"></i>
                ${skill}
            </div>`
      )
      .join("");
  }
}

function getFieldSpecificSkills(field) {
  const fieldSkills = {
    ai: [
      "Python",
      "TensorFlow",
      "PyTorch",
      "Machine Learning",
      "Deep Learning",
      "Computer Vision",
      "NLP",
      "Scikit-learn",
    ],
    dataScience: [
      "Python",
      "R",
      "SQL",
      "Pandas",
      "NumPy",
      "Tableau",
      "Statistics",
      "Data Visualization",
    ],
    computerScience: [
      "JavaScript",
      "Python",
      "Java",
      "React",
      "Node.js",
      "Git",
      "Algorithms",
      "Data Structures",
    ],
    cyberSecurity: [
      "Network Security",
      "Ethical Hacking",
      "Penetration Testing",
      "Linux",
      "Python",
      "CISSP",
    ],
    webDevelopment: [
      "HTML",
      "CSS",
      "JavaScript",
      "React",
      "Node.js",
      "MongoDB",
      "Express.js",
    ],
    mobileDevelopment: [
      "Swift",
      "Kotlin",
      "React Native",
      "Flutter",
      "iOS",
      "Android",
    ],
  };

  return fieldSkills[field] || fieldSkills.computerScience;
}

function addSuggestedSkill(skill) {
  addSkill(skill);
  generateSkillSuggestions();
}

function getCurrentSkills() {
  const skillsContainer = document.getElementById("skillsContainer");
  return Array.from(skillsContainer.children).map(
    (skill) => skill.querySelector("span").textContent
  );
}

// Dynamic Form Management
function addEducation() {
  const container = document.getElementById("educationContainer");
  const newEducation = document.createElement("div");
  newEducation.className = "education-item slide-in-up";
  newEducation.dataset.index = educationCount;

  newEducation.innerHTML = `
        <div class="item-header">
            <h4>Education #${educationCount + 1}</h4>
            <button type="button" class="remove-btn" onclick="removeEducation(${educationCount})">
                <i class="fas fa-trash"></i>
            </button>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label for="degree${educationCount}">Degree <span class="required">*</span></label>
                <select id="degree${educationCount}" name="degree${educationCount}" required>
                    <option value="">Select Degree</option>
                    <option value="B.Tech Computer Science">B.Tech Computer Science</option>
                    <option value="B.Tech Artificial Intelligence">B.Tech Artificial Intelligence</option>
                    <option value="B.Tech Data Science">B.Tech Data Science</option>
                    <option value="B.Tech Cyber Security">B.Tech Cyber Security</option>
                    <option value="B.Tech Information Technology">B.Tech Information Technology</option>
                    <option value="B.Tech Electrical Engineering">B.Tech Electrical Engineering</option>
                    <option value="B.Tech Electronics Engineering">B.Tech Electronics Engineering</option>
                    <option value="B.Tech Mechanical Engineering">B.Tech Mechanical Engineering</option>
                    <option value="Other">Other</option>
                </select>
            </div>
            <div class="form-group">
                <label for="institution${educationCount}">Institution <span class="required">*</span></label>
                <input type="text" id="institution${educationCount}" name="institution${educationCount}" required placeholder="University/College name">
            </div>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label for="year${educationCount}">Graduation Year</label>
                <input type="number" id="year${educationCount}" name="year${educationCount}" min="2020" max="2030" placeholder="2025">
            </div>
            <div class="form-group">
                <label for="cgpa${educationCount}">CGPA/Percentage</label>
                <input type="text" id="cgpa${educationCount}" name="cgpa${educationCount}" placeholder="8.5 or 85%">
            </div>
        </div>
    `;

  container.appendChild(newEducation);
  educationCount++;

  // Show remove buttons if more than one education
  updateRemoveButtons("education");
}

function removeEducation(index) {
  const item = document.querySelector(`.education-item[data-index="${index}"]`);
  if (item) {
    item.remove();
    updateRemoveButtons("education");
  }
}

function addExperience() {
  const container = document.getElementById("experienceContainer");
  const newExperience = document.createElement("div");
  newExperience.className = "experience-item slide-in-up";
  newExperience.dataset.index = experienceCount;

  newExperience.innerHTML = `
        <div class="item-header">
            <h4>Experience #${experienceCount + 1}</h4>
            <button type="button" class="remove-btn" onclick="removeExperience(${experienceCount})">
                <i class="fas fa-trash"></i>
            </button>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label for="company${experienceCount}">Company</label>
                <input type="text" id="company${experienceCount}" name="company${experienceCount}" placeholder="Company name">
            </div>
            <div class="form-group">
                <label for="role${experienceCount}">Job Title</label>
                <input type="text" id="role${experienceCount}" name="role${experienceCount}" placeholder="Software Engineer">
            </div>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label for="duration${experienceCount}">Duration</label>
                <input type="text" id="duration${experienceCount}" name="duration${experienceCount}" placeholder="Jan 2023 - Dec 2023">
            </div>
            <div class="form-group">
                <label for="location${experienceCount}">Location</label>
                <input type="text" id="location${experienceCount}" name="location${experienceCount}" placeholder="City, State">
            </div>
        </div>
        <div class="form-group">
            <label for="description${experienceCount}">Description</label>
            <textarea id="description${experienceCount}" name="description${experienceCount}" rows="3" placeholder="Describe your role and achievements..."></textarea>
        </div>
    `;

  container.appendChild(newExperience);
  experienceCount++;

  updateRemoveButtons("experience");
}

function removeExperience(index) {
  const item = document.querySelector(
    `.experience-item[data-index="${index}"]`
  );
  if (item) {
    item.remove();
    updateRemoveButtons("experience");
  }
}

function addInternship() {
  const container = document.getElementById("internshipContainer");
  const newInternship = document.createElement("div");
  newInternship.className = "internship-item slide-in-up";
  newInternship.dataset.index = internshipCount;

  newInternship.innerHTML = `
        <div class="item-header">
            <h4>Internship #${internshipCount + 1}</h4>
            <button type="button" class="remove-btn" onclick="removeInternship(${internshipCount})">
                <i class="fas fa-trash"></i>
            </button>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label for="internCompany${internshipCount}">Company</label>
                <input type="text" id="internCompany${internshipCount}" name="internCompany${internshipCount}" placeholder="Company name">
            </div>
            <div class="form-group">
                <label for="internRole${internshipCount}">Role</label>
                <input type="text" id="internRole${internshipCount}" name="internRole${internshipCount}" placeholder="Software Development Intern">
            </div>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label for="internDuration${internshipCount}">Duration</label>
                <input type="text" id="internDuration${internshipCount}" name="internDuration${internshipCount}" placeholder="Jun 2023 - Aug 2023">
            </div>
            <div class="form-group">
                <label for="internLocation${internshipCount}">Location</label>
                <input type="text" id="internLocation${internshipCount}" name="internLocation${internshipCount}" placeholder="City, State">
            </div>
        </div>
        <div class="form-group">
            <label for="internDescription${internshipCount}">Description</label>
            <textarea id="internDescription${internshipCount}" name="internDescription${internshipCount}" rows="2" placeholder="Describe your internship experience..."></textarea>
        </div>
    `;

  container.appendChild(newInternship);
  internshipCount++;

  updateRemoveButtons("internship");
}

function removeInternship(index) {
  const item = document.querySelector(
    `.internship-item[data-index="${index}"]`
  );
  if (item) {
    item.remove();
    updateRemoveButtons("internship");
  }
}

function addProject() {
  const container = document.getElementById("projectContainer");
  const newProject = document.createElement("div");
  newProject.className = "project-item slide-in-up";
  newProject.dataset.index = projectCount;

  newProject.innerHTML = `
        <div class="item-header">
            <h4>Project #${projectCount + 1}</h4>
            <button type="button" class="remove-btn" onclick="removeProject(${projectCount})">
                <i class="fas fa-trash"></i>
            </button>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label for="projectName${projectCount}">Project Name</label>
                <input type="text" id="projectName${projectCount}" name="projectName${projectCount}" placeholder="E-commerce Website">
            </div>
            <div class="form-group">
                <label for="projectTech${projectCount}">Technologies</label>
                <input type="text" id="projectTech${projectCount}" name="projectTech${projectCount}" placeholder="React, Node.js, MongoDB">
            </div>
        </div>
        <div class="form-group">
            <label for="projectDescription${projectCount}">Description</label>
            <textarea id="projectDescription${projectCount}" name="projectDescription${projectCount}" rows="2" placeholder="Describe your project..."></textarea>
        </div>
    `;

  container.appendChild(newProject);
  projectCount++;

  updateRemoveButtons("project");
}

function removeProject(index) {
  const item = document.querySelector(`.project-item[data-index="${index}"]`);
  if (item) {
    item.remove();
    updateRemoveButtons("project");
  }
}

function updateRemoveButtons(type) {
  const items = document.querySelectorAll(`.${type}-item`);
  items.forEach((item, index) => {
    const removeBtn = item.querySelector(".remove-btn");
    if (removeBtn) {
      removeBtn.style.display = items.length > 1 ? "block" : "none";
    }
  });
}

function suggestInterests() {
  const skills = getCurrentSkills();
  const interests = [];

  // AI/ML related
  if (
    skills.some((skill) =>
      [
        "python",
        "tensorflow",
        "pytorch",
        "machine learning",
        "deep learning",
        "ai",
      ].includes(skill.toLowerCase())
    )
  ) {
    document.querySelector('input[value="AI/ML"]').checked = true;
  }

  // Data Science related
  if (
    skills.some((skill) =>
      [
        "python",
        "r",
        "sql",
        "pandas",
        "tableau",
        "statistics",
        "data",
      ].includes(skill.toLowerCase())
    )
  ) {
    document.querySelector('input[value="Data Science"]').checked = true;
  }

  // Web Development related
  if (
    skills.some((skill) =>
      ["javascript", "react", "angular", "vue", "html", "css", "node"].includes(
        skill.toLowerCase()
      )
    )
  ) {
    document.querySelector('input[value="Web Development"]').checked = true;
  }

  // Mobile Development related
  if (
    skills.some((skill) =>
      ["swift", "kotlin", "react native", "flutter", "ios", "android"].includes(
        skill.toLowerCase()
      )
    )
  ) {
    document.querySelector('input[value="Mobile Development"]').checked = true;
  }

  // Cybersecurity related
  if (
    skills.some((skill) =>
      [
        "security",
        "cybersecurity",
        "ethical hacking",
        "penetration",
        "cissp",
      ].includes(skill.toLowerCase())
    )
  ) {
    document.querySelector('input[value="Cyber Security"]').checked = true;
  }
}

function collectFormData() {
  const formData = {
    personal: {
      name: document.getElementById("fullName").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      address: document.getElementById("address").value,
    },
    education: [],
    skills: getCurrentSkills(),
    experience: [],
    internships: [],
    projects: [],
    interests: Array.from(
      document.querySelectorAll('input[name="interests"]:checked')
    ).map((cb) => cb.value),
  };

  // Collect education data
  document.querySelectorAll(".education-item").forEach((item, index) => {
    const degree = item.querySelector(
      `#degree${item.dataset.index || index}`
    ).value;
    const institution = item.querySelector(
      `#institution${item.dataset.index || index}`
    ).value;

    if (degree || institution) {
      formData.education.push({
        degree: degree,
        institution: institution,
        year: item.querySelector(`#year${item.dataset.index || index}`).value,
        cgpa: item.querySelector(`#cgpa${item.dataset.index || index}`).value,
      });
    }
  });

  // Collect experience data
  document.querySelectorAll(".experience-item").forEach((item, index) => {
    const company = item.querySelector(
      `#company${item.dataset.index || index}`
    ).value;
    const role = item.querySelector(
      `#role${item.dataset.index || index}`
    ).value;

    if (company || role) {
      formData.experience.push({
        company: company,
        role: role,
        duration: item.querySelector(`#duration${item.dataset.index || index}`)
          .value,
        location: item.querySelector(`#location${item.dataset.index || index}`)
          .value,
        description: item.querySelector(
          `#description${item.dataset.index || index}`
        ).value,
      });
    }
  });

  // Collect internship data
  document.querySelectorAll(".internship-item").forEach((item, index) => {
    const company = item.querySelector(
      `#internCompany${item.dataset.index || index}`
    ).value;
    const role = item.querySelector(
      `#internRole${item.dataset.index || index}`
    ).value;

    if (company || role) {
      formData.internships.push({
        company: company,
        role: role,
        duration: item.querySelector(
          `#internDuration${item.dataset.index || index}`
        ).value,
        location: item.querySelector(
          `#internLocation${item.dataset.index || index}`
        ).value,
        description: item.querySelector(
          `#internDescription${item.dataset.index || index}`
        ).value,
      });
    }
  });

  // Collect project data
  document.querySelectorAll(".project-item").forEach((item, index) => {
    const name = item.querySelector(
      `#projectName${item.dataset.index || index}`
    ).value;
    const technologies = item.querySelector(
      `#projectTech${item.dataset.index || index}`
    ).value;

    if (name || technologies) {
      formData.projects.push({
        name: name,
        technologies: technologies,
        description: item.querySelector(
          `#projectDescription${item.dataset.index || index}`
        ).value,
      });
    }
  });

  return formData;
}

function autoSave() {
  const formData = collectFormData();
  localStorage.setItem("userProfile", JSON.stringify(formData));
}

async function generateAIRecommendations() {
  if (!validateForm()) {
    showError(
      "Please fill in all required fields before generating recommendations."
    );
    return;
  }

  const formData = collectFormData();

  // Save to localStorage
  localStorage.setItem("userProfile", JSON.stringify(formData));

  // Show loading state
  const button = document.querySelector(
    'button[onclick="generateAIRecommendations()"]'
  );
  const originalText = button.innerHTML;
  button.innerHTML =
    '<i class="fas fa-spinner fa-spin"></i> Analyzing Profile...';
  button.disabled = true;

  try {
    // Simulate AI processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Navigate to recommendations page
    window.location.href = "recommendations.html";
  } catch (error) {
    showError("Failed to generate recommendations. Please try again.");
    button.innerHTML = originalText;
    button.disabled = false;
  }
}

function goBack() {
  window.location.href = "upload.html";
}

// Utility functions
function showSuccess(message) {
  if (typeof window.aiCareerNavigator !== "undefined") {
    window.aiCareerNavigator.showSuccess(message);
  } else {
    alert(message);
  }
}

function showError(message) {
  if (typeof window.aiCareerNavigator !== "undefined") {
    window.aiCareerNavigator.showError(message);
  } else {
    alert(message);
  }
}

// Add fadeOut animation
const style = document.createElement("style");
style.textContent = `
    @keyframes fadeOut {
        from { opacity: 1; transform: scale(1); }
        to { opacity: 0; transform: scale(0.8); }
    }
`;
document.head.appendChild(style);
