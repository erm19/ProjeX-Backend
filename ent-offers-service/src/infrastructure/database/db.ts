import mongoose, { Connection } from "mongoose";
import { fromNodeProviderChain } from "@aws-sdk/credential-providers";
import { Signer } from "@aws-sdk/rds-signer";
import { dbConfig } from "../../core/config";

let isConnected = false;

/**
 * Connects to the MongoDB database using Mongoose.
 * Ensures a singleton connection instance.
 * @returns {Promise<Connection>} The Mongoose connection instance.
 */
export const connectDB = async (): Promise<Connection> => {
  if (isConnected) return mongoose.connection;

  try {
    const db = await connectToDatabase(dbConfig);
    isConnected = true;
    console.log("Database connected successfully");
    return db.connection;
  } catch (error) {
    console.error("Database connection failed", error);
    isConnected = false;
    setTimeout(connectDB, 5000);
    throw error;
  }
};

interface DbConfig {
  authMethod: "password" | "iam";
  username?: string;
  password?: string;
  clusterUrl: string;
  dbName: string;
  awsRegion?: string;
}

/**
 * Connect to MongoDB using Mongoose.
 * Supports password-based and IAM-based authentication.
 * @param config - Database connection configuration.
 */
export async function connectToDatabase(config: DbConfig) {
  let mongoUri: string;

  if (config.authMethod === "password") {
    // Password-based authentication
    if (!config.username || !config.password) {
      throw new Error("Username and password are required for password authentication.");
    }
    mongoUri = `mongodb+srv://${config.username}:${encodeURIComponent(config.password)}@${config.clusterUrl}/${
      config.dbName
    }?retryWrites=true&w=majority`;
  } else if (config.authMethod === "iam") {
    // IAM-based authentication
    if (!config.awsRegion || !config.clusterUrl) {
      throw new Error("AWS region and cluster URL are required for IAM authentication.");
    }

    // Use the AWS SDK RDS Signer to generate an auth token
    const credentialsProvider = fromNodeProviderChain();
    const signer = new Signer({
      hostname: config.clusterUrl,
      region: config.awsRegion,
      credentials: await credentialsProvider(), // Resolve credentials dynamically
      username: "mongodb", // MongoDB Atlas default IAM username
      port: 27017, // Default MongoDB port
    });

    const authToken = await signer.getAuthToken();

    mongoUri = `mongodb+srv://${encodeURIComponent("mongodb")}:${encodeURIComponent(authToken)}@${config.clusterUrl}/${
      config.dbName
    }?authMechanism=MONGODB-AWS`;
  } else {
    throw new Error("Invalid authentication method. Use 'password' or 'iam'.");
  }

  // Connect to MongoDB using Mongoose
  return await mongoose.connect(mongoUri, {
    dbName: config.dbName, // Optional: explicitly set the database name
  });
}
