import { NextFunction, Request } from "express";
import { decode, verify } from "jsonwebtoken";
import { jwks } from "../providers";

export const validateTokenGuard = async (req: Request, res: any, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  const decodedHeader = decode(token, { complete: true });
  if (!decodedHeader) {
    throw "No token provided";
  }
  const kid = decodedHeader.header.kid;

  const key = await jwks.getSigningKey(kid);
  const publicKey = key.getPublicKey();

  if (!key) {
    throw new Error("Invalid token signature");
  }

  // Verify token
  // Any because there's no type for cognito jwt
  const decoded = verify(token, publicKey, { algorithms: ["RS256"] }) as any;
  req.body.username = decoded.username;

  next(); // Token is valid, proceed to the next middleware
};
