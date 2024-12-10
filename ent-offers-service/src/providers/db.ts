import mongoose, { Connection } from "mongoose";

let isConnected = false;

/**
 * Connects to the MongoDB database using Mongoose.
 * Ensures a singleton connection instance.
 * @returns {Promise<Connection>} The Mongoose connection instance.
 */
export const connectDB = async (): Promise<Connection> => {
  if (isConnected) return mongoose.connection;

  try {
    const db = await mongoose.connect(
      `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.czpfa.mongodb.net/ProjeX`
    );
    isConnected = true;
    console.log("Database connected successfully");
    return db.connection;
  } catch (error) {
    console.error("Database connection failed", error);
    process.exit(1); // Exit process with failure
  }
};
