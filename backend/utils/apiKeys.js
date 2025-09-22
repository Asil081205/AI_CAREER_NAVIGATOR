const crypto = require("crypto");

class APIKeyManager {
  constructor() {
    this.keys = {
      // Resume parsing APIs
      resumeParser: process.env.RESUME_PARSER_API_KEY,
      affinda: process.env.AFFINDA_API_KEY,

      // Job search APIs
      linkedin: process.env.LINKEDIN_API_KEY,
      naukri: process.env.NAUKRI_API_KEY,
      indeed: process.env.INDEED_API_KEY,
      glassdoor: process.env.GLASSDOOR_API_KEY,

      // AI/ML APIs
      openai: process.env.OPENAI_API_KEY,
      gemini: process.env.GEMINI_API_KEY,
      anthropic: process.env.ANTHROPIC_API_KEY,

      // Maps and location APIs
      googleMaps: process.env.GOOGLE_MAPS_API_KEY,
      mapbox: process.env.MAPBOX_API_KEY,

      // Communication APIs
      sendgrid: process.env.SENDGRID_API_KEY,
      twilio: process.env.TWILIO_API_KEY,

      // Analytics and monitoring
      mixpanel: process.env.MIXPANEL_API_KEY,
      segment: process.env.SEGMENT_API_KEY,

      // File storage
      aws: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_REGION || "us-east-1",
      },

      // Database
      mongodb: process.env.MONGODB_URI,
      redis: process.env.REDIS_URL,
    };

    this.encryptionKey = process.env.ENCRYPTION_KEY || crypto.randomBytes(32);
    this.algorithm = "aes-256-gcm";
  }

  // Get API key by service name
  getKey(service) {
    const key = this.keys[service];
    if (!key) {
      console.warn(`⚠️ API key not found for service: ${service}`);
      return null;
    }
    return key;
  }

  // Check if API key exists and is valid format
  hasKey(service) {
    const key = this.getKey(service);
    return key && key.length > 0;
  }

  // Validate API key format for common services
  validateKey(service, key = null) {
    const apiKey = key || this.getKey(service);
    if (!apiKey) return false;

    const validations = {
      openai: /^sk-[A-Za-z0-9]{48}$/,
      linkedin: /^[A-Za-z0-9]{16}$/,
      googleMaps: /^[A-Za-z0-9_-]{39}$/,
      sendgrid: /^SG\.[A-Za-z0-9_-]{22}\.[A-Za-z0-9_-]{43}$/,
      mongodb: /^mongodb(\+srv)?:\/\/.+$/,
      // Add more validation patterns as needed
    };

    const pattern = validations[service];
    if (!pattern) return true; // No specific validation pattern

    return pattern.test(apiKey);
  }

  // Get all available services with their key status
  getKeyStatus() {
    const status = {};
    Object.keys(this.keys).forEach((service) => {
      if (typeof this.keys[service] === "object") {
        // Handle nested objects like AWS
        status[service] = {};
        Object.keys(this.keys[service]).forEach((subKey) => {
          status[service][subKey] = {
            available: !!this.keys[service][subKey],
            valid: this.keys[service][subKey] ? true : false,
          };
        });
      } else {
        status[service] = {
          available: this.hasKey(service),
          valid: this.validateKey(service),
        };
      }
    });
    return status;
  }

  // Get configuration for different environments
  getEnvironmentConfig() {
    const env = process.env.NODE_ENV || "development";

    const configs = {
      development: {
        useApiKeys: ["openai", "googleMaps"], // Only use essential APIs in dev
        fallbackToMock: true,
        logApiCalls: true,
      },
      staging: {
        useApiKeys: ["openai", "linkedin", "googleMaps", "sendgrid"],
        fallbackToMock: true,
        logApiCalls: true,
      },
      production: {
        useApiKeys: Object.keys(this.keys),
        fallbackToMock: false,
        logApiCalls: false,
      },
    };

    return configs[env] || configs.development;
  }

  // Encrypt sensitive API keys for storage
  encrypt(text) {
    if (!text) return null;

    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipher(this.algorithm, this.encryptionKey);

    let encrypted = cipher.update(text, "utf8", "hex");
    encrypted += cipher.final("hex");

    const authTag = cipher.getAuthTag();

    return {
      encrypted,
      iv: iv.toString("hex"),
      authTag: authTag.toString("hex"),
    };
  }

  // Decrypt API keys
  decrypt(encryptedData) {
    if (!encryptedData) return null;

    const decipher = crypto.createDecipher(this.algorithm, this.encryptionKey);
    decipher.setAuthTag(Buffer.from(encryptedData.authTag, "hex"));

    let decrypted = decipher.update(encryptedData.encrypted, "hex", "utf8");
    decrypted += decipher.final("utf8");

    return decrypted;
  }

  // Rate limiting information for different APIs
  getRateLimits() {
    return {
      openai: {
        requestsPerMinute: 60,
        tokensPerMinute: 60000,
        requestsPerDay: 200,
      },
      linkedin: {
        requestsPerHour: 100,
        requestsPerDay: 500,
      },
      googleMaps: {
        requestsPerSecond: 50,
        requestsPerDay: 40000,
      },
      indeed: {
        requestsPerSecond: 10,
        requestsPerDay: 1000,
      },
      naukri: {
        requestsPerMinute: 30,
        requestsPerDay: 1000,
      },
    };
  }

  // Generate API usage report
  generateUsageReport(apiCalls = {}) {
    const limits = this.getRateLimits();
    const report = {
      timestamp: new Date(),
      services: {},
    };

    Object.keys(limits).forEach((service) => {
      const calls = apiCalls[service] || { count: 0, cost: 0 };
      const limit = limits[service];

      report.services[service] = {
        available: this.hasKey(service),
        valid: this.validateKey(service),
        usage: {
          calls: calls.count,
          cost: calls.cost,
          limits: limit,
        },
        status:
          calls.count > (limit.requestsPerDay || Infinity) ? "exceeded" : "ok",
      };
    });

    return report;
  }

  // Mock API responses for development
  getMockResponse(service, endpoint = "default") {
    const mockResponses = {
      openai: {
        default: {
          choices: [
            {
              message: {
                content: "This is a mock AI response for development purposes.",
              },
            },
          ],
        },
      },
      linkedin: {
        jobs: {
          elements: [
            {
              id: "mock_job_1",
              title: "Software Engineer",
              company: "Mock Company",
              location: "San Francisco, CA",
            },
          ],
        },
      },
      googleMaps: {
        geocode: {
          results: [
            {
              geometry: {
                location: { lat: 37.7749, lng: -122.4194 },
              },
              formatted_address: "San Francisco, CA, USA",
            },
          ],
        },
      },
    };

    return (
      mockResponses[service]?.[endpoint] || { mock: true, service, endpoint }
    );
  }

  // Check API health
  async checkAPIHealth(service) {
    if (!this.hasKey(service)) {
      return {
        service,
        status: "unavailable",
        message: "API key not configured",
      };
    }

    // This would make actual health check requests to APIs
    // For now, we'll simulate the check
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          service,
          status: "healthy",
          message: "API is responsive",
          responseTime: Math.random() * 100 + 50, // Mock response time
        });
      }, Math.random() * 1000 + 100);
    });
  }

  // Rotate API keys (for services that support it)
  async rotateKey(service) {
    console.log(`🔄 Rotating API key for service: ${service}`);

    // This would implement key rotation logic
    // For services that support programmatic key rotation

    return {
      service,
      status: "rotated",
      timestamp: new Date(),
      message: "API key rotated successfully",
    };
  }

  // Log API usage for monitoring
  logAPICall(service, endpoint, success = true, responseTime = 0, cost = 0) {
    if (process.env.NODE_ENV === "development") {
      console.log(
        `📡 API Call: ${service}/${endpoint} - ${
          success ? "✅" : "❌"
        } (${responseTime}ms, $${cost})`
      );
    }

    // In production, this would send to a logging service
    return {
      timestamp: new Date(),
      service,
      endpoint,
      success,
      responseTime,
      cost,
    };
  }
}

// Export singleton instance
const apiKeyManager = new APIKeyManager();
module.exports = apiKeyManager;

// Utility functions
module.exports.validateAllKeys = () => {
  console.log("🔑 Validating API keys...");
  const status = apiKeyManager.getKeyStatus();

  let validCount = 0;
  let totalCount = 0;

  Object.entries(status).forEach(([service, serviceStatus]) => {
    if (
      typeof serviceStatus === "object" &&
      serviceStatus.available !== undefined
    ) {
      totalCount++;
      if (serviceStatus.available && serviceStatus.valid) {
        console.log(`✅ ${service}: Available and valid`);
        validCount++;
      } else if (serviceStatus.available) {
        console.log(`⚠️ ${service}: Available but invalid format`);
      } else {
        console.log(`❌ ${service}: Not configured`);
      }
    }
  });

  console.log(`🔑 API Keys Status: ${validCount}/${totalCount} valid`);
  return {
    validCount,
    totalCount,
    percentage: (validCount / totalCount) * 100,
  };
};

module.exports.getRequiredKeys = () => {
  return [
    "openai", // For AI analysis
    "googleMaps", // For job mapping
    "mongodb", // Database
    "sendgrid", // Email notifications
  ];
};

module.exports.checkRequiredKeys = () => {
  const required = module.exports.getRequiredKeys();
  const missing = required.filter((key) => !apiKeyManager.hasKey(key));

  if (missing.length > 0) {
    console.warn(`⚠️ Missing required API keys: ${missing.join(", ")}`);
    console.warn("Some features may not work properly.");
  } else {
    console.log("✅ All required API keys are configured");
  }

  return missing;
};
