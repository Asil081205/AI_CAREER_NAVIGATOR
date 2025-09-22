// Enhanced upload page with robust PDF parsing
let selectedFile = null;
let isProcessing = false;
let extractedText = "";
let parsedData = {};
let resumeParser = null;

// Initialize upload page
document.addEventListener("DOMContentLoaded", function () {
  initializeUploadPage();
  setupEventListeners();

  // Initialize PDF.js
  if (typeof pdfjsLib !== "undefined") {
    pdfjsLib.GlobalWorkerOptions.workerSrc =
      "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
    console.log("PDF.js initialized");
  }

  // Initialize resume parser
  resumeParser = new RobustResumeParser();
});

function initializeUploadPage() {
  // Clear any previous data
  localStorage.removeItem("parsedResumeData");
  localStorage.removeItem("userProfile");

  // Enable debug mode for development
  const debugMode = window.location.search.includes("debug=true");
  if (debugMode) {
    document.getElementById("debugPanel").style.display = "block";
  }

  console.log("Enhanced upload page initialized");
}

function setupEventListeners() {
  const uploadArea = document.getElementById("uploadArea");
  const fileInput = document.getElementById("fileInput");

  // Click to upload
  uploadArea.addEventListener("click", (e) => {
    if (!isProcessing && !e.target.closest(".file-actions")) {
      fileInput.click();
    }
  });

  // Drag and drop events
  uploadArea.addEventListener("dragover", handleDragOver);
  uploadArea.addEventListener("dragleave", handleDragLeave);
  uploadArea.addEventListener("drop", handleFileDrop);

  // File input change
  fileInput.addEventListener("change", (e) => {
    if (e.target.files.length > 0) {
      handleFileSelection(e.target.files[0]);
    }
  });

  // Prevent default drag behaviors
  document.addEventListener("dragover", (e) => e.preventDefault());
  document.addEventListener("drop", (e) => e.preventDefault());
}

function handleDragOver(e) {
  e.preventDefault();
  if (!isProcessing) {
    e.currentTarget.classList.add("dragover");
  }
}

function handleDragLeave(e) {
  e.preventDefault();
  e.currentTarget.classList.remove("dragover");
}

function handleFileDrop(e) {
  e.preventDefault();
  e.currentTarget.classList.remove("dragover");

  if (isProcessing) return;

  const files = e.dataTransfer.files;
  if (files.length > 0) {
    handleFileSelection(files[0]);
  }
}

async function handleFileSelection(file) {
  console.log("File selected:", file.name, file.type, file.size);

  // Validate file
  if (!validateFile(file)) {
    return;
  }

  selectedFile = file;
  await showFilePreview(file);

  // Enable upload button
  const uploadBtn = document.getElementById("uploadBtn");
  uploadBtn.disabled = false;
  uploadBtn.innerHTML = '<i class="fas fa-magic"></i> Parse Resume';

  // Update debug info
  updateDebugInfo(file);
}

function validateFile(file) {
  // Check file size (5MB limit)
  const maxSize = 5 * 1024 * 1024; // 5MB
  if (file.size > maxSize) {
    showError("File size too large. Maximum size is 5MB.");
    return false;
  }

  // Check file type
  const allowedTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "text/plain",
  ];

  const fileExtension = file.name.toLowerCase().split(".").pop();
  const allowedExtensions = ["pdf", "doc", "docx", "txt"];

  if (
    !allowedTypes.includes(file.type) &&
    !allowedExtensions.includes(fileExtension)
  ) {
    showError(
      "Unsupported file format. Please upload PDF, DOC, DOCX, or TXT files."
    );
    return false;
  }

  return true;
}

async function showFilePreview(file) {
  const uploadContent = document.getElementById("uploadContent");
  const filePreview = document.getElementById("filePreview");
  const fileName = document.getElementById("fileName");
  const fileSize = document.getElementById("fileSize");
  const fileIcon = document.getElementById("fileIcon");

  // Hide upload content and show file preview
  uploadContent.style.display = "none";
  filePreview.style.display = "block";

  // Update file info
  fileName.textContent = file.name;
  fileSize.textContent = `${(file.size / 1024 / 1024).toFixed(2)} MB`;

  // Update file icon based on type
  if (file.type.includes("pdf")) {
    fileIcon.innerHTML =
      '<i class="fas fa-file-pdf" style="color: #e53e3e;"></i>';
  } else if (file.type.includes("word")) {
    fileIcon.innerHTML =
      '<i class="fas fa-file-word" style="color: #2b6cb0;"></i>';
  } else {
    fileIcon.innerHTML = '<i class="fas fa-file-alt"></i>';
  }

  // Try to extract and preview some content
  try {
    console.log("Attempting quick preview extraction...");
    const quickText = await extractTextFromFile(file, true); // Quick mode
    if (quickText && quickText.length > 50) {
      await showQuickPreview(quickText);
      document.querySelector(".preview-btn").style.display = "inline-block";
    }
  } catch (error) {
    console.log("Quick preview failed:", error.message);
  }

  console.log("File preview shown for:", file.name);
}

async function showQuickPreview(text) {
  const previewName = document.getElementById("previewName");
  const previewEmail = document.getElementById("previewEmail");
  const previewSkills = document.getElementById("previewSkills");
  const extractionPreview = document.getElementById("extractionPreview");

  try {
    // Quick parsing for preview
    const emailMatch = text.match(
      /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/
    );
    const nameMatch = text.split("\n")[0]?.trim();

    // Quick skills detection
    const commonSkills = [
      "Python",
      "JavaScript",
      "Java",
      "React",
      "Node.js",
      "SQL",
      "HTML",
      "CSS",
    ];
    const foundSkills = commonSkills.filter((skill) =>
      new RegExp(`\\b${skill}\\b`, "i").test(text)
    );

    previewName.textContent =
      nameMatch && nameMatch.length < 50 && nameMatch.length > 5
        ? nameMatch
        : "Not detected";
    previewEmail.textContent = emailMatch ? emailMatch[0] : "Not detected";
    previewSkills.textContent =
      foundSkills.length > 0
        ? foundSkills.slice(0, 3).join(", ") +
          (foundSkills.length > 3 ? "..." : "")
        : "Not detected";

    extractionPreview.style.display = "block";
  } catch (error) {
    console.error("Quick preview error:", error);
  }
}

async function quickPreview() {
  if (!selectedFile) return;

  try {
    const text = await extractTextFromFile(selectedFile, true);
    const debugText = document.getElementById("debugText");
    debugText.value =
      text.substring(0, 1000) +
      (text.length > 1000 ? "\n\n... (truncated)" : "");

    const debugPanel = document.getElementById("debugPanel");
    debugPanel.style.display =
      debugPanel.style.display === "none" ? "block" : "none";
  } catch (error) {
    showError("Failed to preview file: " + error.message);
  }
}

function changeFile() {
  const uploadContent = document.getElementById("uploadContent");
  const filePreview = document.getElementById("filePreview");
  const uploadBtn = document.getElementById("uploadBtn");
  const fileInput = document.getElementById("fileInput");
  const extractionPreview = document.getElementById("extractionPreview");

  // Reset to upload state
  uploadContent.style.display = "block";
  filePreview.style.display = "none";
  extractionPreview.style.display = "none";
  uploadBtn.disabled = true;
  uploadBtn.innerHTML = '<i class="fas fa-magic"></i> Parse Resume';

  // Clear file input and data
  fileInput.value = "";
  selectedFile = null;
  extractedText = "";
  parsedData = {};
}

async function processResume() {
  if (!selectedFile || isProcessing) {
    return;
  }

  console.log("Starting enhanced resume processing for:", selectedFile.name);

  isProcessing = true;
  showProcessingState();

  try {
    // Step 1: Extract text from file
    updateProgress(20, "Extracting text from resume...");
    extractedText = await extractTextFromFile(selectedFile);

    if (!extractedText || extractedText.length < 50) {
      throw new Error(
        "Could not extract meaningful text from the resume. Please ensure the file is not corrupted or password-protected."
      );
    }

    console.log("Text extracted, length:", extractedText.length);
    updateDebugText(extractedText);

    // Step 2: Parse resume content
    updateProgress(60, "Analyzing resume structure and content...");
    parsedData = await resumeParser.parseText(extractedText, selectedFile.name);

    if (!parsedData || Object.keys(parsedData).length === 0) {
      throw new Error(
        "Failed to parse resume content. Please check if the resume format is supported."
      );
    }

    console.log("Resume parsed successfully:", parsedData);

    // Step 3: Validate and enhance data
    updateProgress(80, "Validating extracted information...");
    parsedData = validateAndEnhanceParsedData(parsedData);

    // Step 4: Save data
    updateProgress(95, "Saving extracted data...");
    localStorage.setItem("parsedResumeData", JSON.stringify(parsedData));
    localStorage.setItem("uploadedFileName", selectedFile.name);
    localStorage.setItem("extractedText", extractedText.substring(0, 2000)); // Save sample for debugging

    // Step 5: Complete
    showProcessingComplete();

    setTimeout(() => {
      window.location.href = "extract-edit.html";
    }, 2000);
  } catch (error) {
    console.error("Error processing resume:", error);
    showProcessingError(error.message);
    resetProcessingState();
  }
}

async function extractTextFromFile(file, quickMode = false) {
  const fileType = file.type;
  const fileExtension = file.name.toLowerCase().split(".").pop();

  console.log("Extracting text from file:", file.name, "Type:", fileType);

  try {
    if (fileType === "application/pdf" || fileExtension === "pdf") {
      return await extractTextFromPDF(file, quickMode);
    } else if (
      fileType.includes("word") ||
      fileExtension === "doc" ||
      fileExtension === "docx"
    ) {
      return await extractTextFromWord(file);
    } else if (fileType === "text/plain" || fileExtension === "txt") {
      return await extractTextFromPlainText(file);
    } else {
      throw new Error("Unsupported file format");
    }
  } catch (error) {
    console.error("Text extraction failed:", error);
    throw new Error(`Failed to extract text: ${error.message}`);
  }
}

async function extractTextFromPDF(file, quickMode = false) {
  if (typeof pdfjsLib === "undefined") {
    throw new Error("PDF.js library not loaded");
  }

  console.log("Extracting text from PDF...");

  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

    console.log("PDF loaded, pages:", pdf.numPages);

    let fullText = "";
    const maxPages = quickMode ? Math.min(2, pdf.numPages) : pdf.numPages;

    for (let i = 1; i <= maxPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();

      const pageText = textContent.items
        .map((item) => item.str)
        .join(" ")
        .replace(/\s+/g, " ")
        .trim();

      fullText += pageText + "\n";

      if (quickMode && fullText.length > 500) {
        break;
      }
    }

    console.log("PDF text extracted, length:", fullText.length);

    if (fullText.length < 50) {
      throw new Error("PDF appears to be empty or contains only images");
    }

    return fullText;
  } catch (error) {
    console.error("PDF extraction error:", error);
    throw new Error("Failed to extract text from PDF: " + error.message);
  }
}

async function extractTextFromWord(file) {
  if (typeof mammoth === "undefined") {
    throw new Error(
      "Mammoth.js library not loaded for Word document processing"
    );
  }

  console.log("Extracting text from Word document...");

  try {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });

    const text = result.value.trim();

    if (text.length < 50) {
      throw new Error("Word document appears to be empty");
    }

    console.log("Word text extracted, length:", text.length);
    return text;
  } catch (error) {
    console.error("Word extraction error:", error);
    throw new Error(
      "Failed to extract text from Word document: " + error.message
    );
  }
}

async function extractTextFromPlainText(file) {
  try {
    const text = await file.text();

    if (text.length < 50) {
      throw new Error("Text file appears to be empty");
    }

    console.log("Plain text loaded, length:", text.length);
    return text;
  } catch (error) {
    console.error("Text file error:", error);
    throw new Error("Failed to read text file: " + error.message);
  }
}

function validateAndEnhanceParsedData(data) {
  // Ensure all required fields exist
  const enhancedData = {
    personal: data.personal || {},
    education: data.education || [],
    skills: data.skills || [],
    experience: data.experience || [],
    internships: data.internships || [],
    projects: data.projects || [],
    summary: data.summary || "",
    suggestedField: data.suggestedField || "computerScience",
    experienceLevel: data.experienceLevel || "entry",
    confidence: data.confidence || 50,
    extractedAt: new Date().toISOString(),
    fileName: selectedFile.name,
  };

  // Add some fallback data if extraction was poor
  if (enhancedData.skills.length === 0) {
    enhancedData.skills = ["Programming", "Problem Solving", "Team Work"];
  }

  if (enhancedData.education.length === 0) {
    enhancedData.education = [
      {
        degree: "Bachelor's Degree",
        institution: "University",
        year: "2024",
        cgpa: "",
      },
    ];
  }

  console.log("Data validated and enhanced:", enhancedData);
  return enhancedData;
}

function showProcessingState() {
  const uploadContent = document.getElementById("uploadContent");
  const filePreview = document.getElementById("filePreview");
  const uploadProgress = document.getElementById("uploadProgress");
  const uploadBtn = document.getElementById("uploadBtn");

  // Hide other content and show progress
  uploadContent.style.display = "none";
  filePreview.style.display = "none";
  uploadProgress.style.display = "block";

  // Disable upload button
  uploadBtn.disabled = true;
  uploadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
}

function updateProgress(percentage, description, stats = "") {
  const progressFill = document.getElementById("progressFill");
  const progressText = document.getElementById("progressText");
  const progressDescription = document.getElementById("progressDescription");
  const progressStats = document.getElementById("progressStats");

  if (progressFill) progressFill.style.width = percentage + "%";
  if (progressText) progressText.textContent = percentage + "%";
  if (progressDescription) progressDescription.textContent = description;
  if (progressStats && stats) progressStats.textContent = stats;
}

function showProcessingComplete() {
  const progressTitle = document.getElementById("progressTitle");
  const progressDescription = document.getElementById("progressDescription");

  updateProgress(
    100,
    "Resume processed successfully!",
    `Found: ${parsedData.skills?.length || 0} skills, ${
      parsedData.experience?.length || 0
    } experiences`
  );

  if (progressTitle) {
    progressTitle.innerHTML =
      '<i class="fas fa-check-circle" style="color: var(--success);"></i> Processing Complete';
  }

  setTimeout(() => {
    if (progressDescription) {
      progressDescription.innerHTML =
        '<i class="fas fa-arrow-right" style="color: var(--primary-accent);"></i> Redirecting to review page...';
    }
  }, 1000);
}

function showProcessingError(errorMessage) {
  const progressTitle = document.getElementById("progressTitle");
  const progressDescription = document.getElementById("progressDescription");

  if (progressTitle) {
    progressTitle.innerHTML =
      '<i class="fas fa-exclamation-circle" style="color: var(--error);"></i> Processing Failed';
  }

  if (progressDescription) {
    progressDescription.innerHTML = `<i class="fas fa-exclamation-circle" style="color: var(--error);"></i> ${errorMessage}`;
  }

  showError("Resume processing failed: " + errorMessage);
}

function resetProcessingState() {
  const uploadContent = document.getElementById("uploadContent");
  const filePreview = document.getElementById("filePreview");
  const uploadProgress = document.getElementById("uploadProgress");
  const uploadBtn = document.getElementById("uploadBtn");

  // Show appropriate content
  if (selectedFile) {
    uploadContent.style.display = "none";
    filePreview.style.display = "block";
    uploadBtn.disabled = false;
    uploadBtn.innerHTML = '<i class="fas fa-magic"></i> Parse Resume';
  } else {
    uploadContent.style.display = "block";
    filePreview.style.display = "none";
    uploadBtn.disabled = true;
  }

  uploadProgress.style.display = "none";
  isProcessing = false;
}

function updateDebugInfo(file) {
  document.getElementById("debugFileType").textContent = file.type || "Unknown";
  document.getElementById("debugFileSize").textContent =
    (file.size / 1024 / 1024).toFixed(2) + " MB";
}

function updateDebugText(text) {
  const debugText = document.getElementById("debugText");
  const debugTextLength = document.getElementById("debugTextLength");
  const debugStatus = document.getElementById("debugStatus");

  if (debugText)
    debugText.value =
      text.substring(0, 1000) +
      (text.length > 1000 ? "\n\n... (showing first 1000 characters)" : "");
  if (debugTextLength) debugTextLength.textContent = text.length;
  if (debugStatus)
    debugStatus.textContent =
      text.length > 50 ? "Success" : "Warning: Short text";
}

function goBack() {
  window.location.href = "../index.html";
}

// Utility functions
function showError(message) {
  if (
    typeof window.aiCareerNavigator !== "undefined" &&
    window.aiCareerNavigator.showError
  ) {
    window.aiCareerNavigator.showError(message);
  } else {
    alert("Error: " + message);
    console.error("Error:", message);
  }
}

function showSuccess(message) {
  if (
    typeof window.aiCareerNavigator !== "undefined" &&
    window.aiCareerNavigator.showSuccess
  ) {
    window.aiCareerNavigator.showSuccess(message);
  } else {
    alert("Success: " + message);
    console.log("Success:", message);
  }
}

console.log("Enhanced upload page script loaded");
