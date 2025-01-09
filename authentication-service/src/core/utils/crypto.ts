import { createHmac } from "crypto";

export const generateSecretHash = (username: string, clientSecret: string, clientId: string) => {
  const hasher = createHmac("sha256", clientSecret);
  hasher.update(`${username}${clientId}`);
  return hasher.digest("base64");
};
