import dotenv from "dotenv";
dotenv.config();

export const dbConfig = {
  authMethod: process.env.DB_AUTH_METHOD as "password" | "iam",
  username: process.env.MONGODB_USER,
  password: process.env.MONGODB_PASSWORD,
  clusterUrl: process.env.DB_CLUSTER_URL!,
  dbName: process.env.DB_NAME!,
  awsRegion: process.env.AWS_REGION,
};
