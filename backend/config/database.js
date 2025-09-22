const mongoose = require("mongoose");

class Database {
  constructor() {
    this.connection = null;
    this.isConnected = false;
  }

  async connect(mongoUri = null) {
    try {
      const uri =
        mongoUri ||
        process.env.MONGODB_URI ||
        "mongodb://localhost:27017/ai-career-navigator";

      // MongoDB connection options
      const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        maxPoolSize: 10, // Maintain up to 10 socket connections
        serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
        socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
        bufferMaxEntries: 0, // Disable mongoose buffering
        bufferCommands: false, // Disable mongoose buffering
      };

      // Connect to MongoDB
      this.connection = await mongoose.connect(uri, options);
      this.isConnected = true;

      console.log(
        `✅ MongoDB connected: ${this.connection.connection.host}:${this.connection.connection.port}`
      );
      console.log(`📊 Database: ${this.connection.connection.name}`);

      // Connection event listeners
      mongoose.connection.on("connected", () => {
        console.log("🔗 Mongoose connected to MongoDB");
        this.isConnected = true;
      });

      mongoose.connection.on("error", (err) => {
        console.error("❌ Mongoose connection error:", err);
        this.isConnected = false;
      });

      mongoose.connection.on("disconnected", () => {
        console.log("🔌 Mongoose disconnected from MongoDB");
        this.isConnected = false;
      });

      // Handle application termination
      process.on("SIGINT", this.gracefulShutdown);
      process.on("SIGTERM", this.gracefulShutdown);

      return this.connection;
    } catch (error) {
      console.error("❌ Database connection failed:", error.message);
      this.isConnected = false;
      throw error;
    }
  }

  async disconnect() {
    try {
      if (this.connection) {
        await mongoose.connection.close();
        this.isConnected = false;
        console.log("🔌 MongoDB connection closed");
      }
    } catch (error) {
      console.error("❌ Error closing MongoDB connection:", error.message);
      throw error;
    }
  }

  gracefulShutdown = async () => {
    console.log("\n🛑 Received shutdown signal. Closing MongoDB connection...");
    try {
      await this.disconnect();
      console.log("✅ MongoDB connection closed gracefully");
      process.exit(0);
    } catch (error) {
      console.error("❌ Error during graceful shutdown:", error.message);
      process.exit(1);
    }
  };

  getConnection() {
    return this.connection;
  }

  isConnectionReady() {
    return this.isConnected && mongoose.connection.readyState === 1;
  }

  // Database health check
  async healthCheck() {
    try {
      if (!this.isConnected) {
        return {
          status: "disconnected",
          message: "Database not connected",
        };
      }

      // Ping the database
      await mongoose.connection.db.admin().ping();

      const stats = await mongoose.connection.db.stats();

      return {
        status: "connected",
        message: "Database connection is healthy",
        details: {
          host: mongoose.connection.host,
          port: mongoose.connection.port,
          database: mongoose.connection.name,
          readyState: mongoose.connection.readyState,
          collections: stats.collections,
          dataSize: this.formatBytes(stats.dataSize),
          storageSize: this.formatBytes(stats.storageSize),
        },
      };
    } catch (error) {
      return {
        status: "error",
        message: "Database health check failed",
        error: error.message,
      };
    }
  }

  formatBytes(bytes) {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  }

  // Database seeding for development
  async seedDatabase() {
    if (process.env.NODE_ENV === "production") {
      throw new Error("Database seeding is not allowed in production");
    }

    try {
      const User = require("../models/User");
      const Resume = require("../models/Resume");

      // Check if data already exists
      const userCount = await User.countDocuments();
      if (userCount > 0) {
        console.log("📊 Database already has data. Skipping seed.");
        return;
      }

      console.log("🌱 Seeding database with sample data...");

      // Create sample users
      const sampleUsers = [
        {
          email: "john.doe@example.com",
          password: "password123",
          personal: {
            firstName: "John",
            lastName: "Doe",
            phone: "+1-555-0123",
          },
          education: [
            {
              degree: "B.Tech Computer Science",
              institution: "ABC University",
              graduationYear: 2024,
              cgpa: 8.5,
            },
          ],
          skills: [
            { name: "Python", level: "intermediate" },
            { name: "JavaScript", level: "advanced" },
            { name: "React", level: "intermediate" },
          ],
          careerPreferences: {
            interestedFields: ["computerScience", "ai"],
            preferredJobTypes: ["full-time"],
            preferredWorkModes: ["remote", "hybrid"],
          },
        },
        {
          email: "jane.smith@example.com",
          password: "password123",
          personal: {
            firstName: "Jane",
            lastName: "Smith",
            phone: "+1-555-0456",
          },
          education: [
            {
              degree: "B.Tech Artificial Intelligence",
              institution: "XYZ Institute",
              graduationYear: 2024,
              cgpa: 9.2,
            },
          ],
          skills: [
            { name: "Python", level: "advanced" },
            { name: "TensorFlow", level: "intermediate" },
            { name: "Machine Learning", level: "advanced" },
          ],
          careerPreferences: {
            interestedFields: ["ai", "dataScience"],
            preferredJobTypes: ["full-time"],
            preferredWorkModes: ["remote"],
          },
        },
      ];

      await User.insertMany(sampleUsers);
      console.log("✅ Sample users created");

      console.log("🌱 Database seeding completed");
    } catch (error) {
      console.error("❌ Database seeding failed:", error.message);
      throw error;
    }
  }

  // Clear all data (development only)
  async clearDatabase() {
    if (process.env.NODE_ENV === "production") {
      throw new Error("Database clearing is not allowed in production");
    }

    try {
      console.log("🧹 Clearing database...");

      const collections = await mongoose.connection.db
        .listCollections()
        .toArray();

      for (const collection of collections) {
        await mongoose.connection.db.collection(collection.name).deleteMany({});
        console.log(`🗑️ Cleared collection: ${collection.name}`);
      }

      console.log("✅ Database cleared successfully");
    } catch (error) {
      console.error("❌ Database clearing failed:", error.message);
      throw error;
    }
  }

  // Create indexes for better performance
  async createIndexes() {
    try {
      console.log("📇 Creating database indexes...");

      const User = require("../models/User");
      const Resume = require("../models/Resume");

      // User indexes
      await User.createIndexes();
      console.log("✅ User indexes created");

      // Resume indexes
      await Resume.createIndexes();
      console.log("✅ Resume indexes created");

      console.log("📇 All indexes created successfully");
    } catch (error) {
      console.error("❌ Index creation failed:", error.message);
      throw error;
    }
  }

  // Backup database
  async createBackup() {
    if (!this.isConnected) {
      throw new Error("Database not connected");
    }

    try {
      const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
      const backupName = `ai-career-navigator-backup-${timestamp}`;

      console.log(`💾 Creating backup: ${backupName}`);

      // This would typically use mongodump command
      // For now, we'll just create a simple JSON export
      const User = require("../models/User");
      const Resume = require("../models/Resume");

      const users = await User.find({}).lean();
      const resumes = await Resume.find({}).lean();

      const backup = {
        timestamp: new Date(),
        collections: {
          users,
          resumes,
        },
      };

      const fs = require("fs");
      const path = require("path");

      const backupDir = path.join(process.cwd(), "backups");
      if (!fs.existsSync(backupDir)) {
        fs.mkdirSync(backupDir, { recursive: true });
      }

      const backupPath = path.join(backupDir, `${backupName}.json`);
      fs.writeFileSync(backupPath, JSON.stringify(backup, null, 2));

      console.log(`✅ Backup created: ${backupPath}`);
      return backupPath;
    } catch (error) {
      console.error("❌ Backup creation failed:", error.message);
      throw error;
    }
  }
}

// Export singleton instance
const database = new Database();
module.exports = database;
