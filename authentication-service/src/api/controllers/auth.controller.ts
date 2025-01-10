import { InitiateAuthCommandInput } from "@aws-sdk/client-cognito-identity-provider";
import { AwsCognitoProvider, cognito, jwks } from "../../infrastructure/providers";
import { decode, verify } from "jsonwebtoken";
import { generateSecretHash } from "core/utils";
import { Request, Response } from "express";
import { User } from "../../infrastructure/orm";

export class AuthController {
  static async signup(req: Request, res: Response) {
    const CLIENT_SECRET = process.env.COGNITO_CLIENT_SECRET || "";
    const CLIENT_ID = process.env.AWS_APP_CLIENT_ID || "";

    try {
      const signupResponse = await AwsCognitoProvider.signup({
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
        companyName: req.body.companyName,
        companyId: req.body.companyId,
        companyRole: req.body.companyRole,
        officeName: req.body.officeName,
        licenceNum: req.body.licenceNum,
        secretHash: generateSecretHash(req.body.email, CLIENT_SECRET, CLIENT_ID),
        clientId: CLIENT_ID,
      });

      // TODO: Move to AWS Lamda Function later to Cognito post signup confirmation
      const user = new User({
        email: req.body.email,
        role: req.body.role,
        companyName: req.body.companyName || req.body.officeName,
        licenseNum: req.body.licenceNum,
        companyNum: req.body.companyId,
      });
      user.save();
      // End TODO

      res.send(signupResponse);
    } catch (error: any) {}
  }

  static async login(req: Request, res: Response) {
    const CLIENT_SECRET = process.env.COGNITO_CLIENT_SECRET || "";
    const CLIENT_ID = process.env.AWS_APP_CLIENT_ID || "";

    try {
      const authResponse = await AwsCognitoProvider.login({
        username: req.body.email,
        password: req.body.password,
        clientId: CLIENT_ID,
        secretHash: generateSecretHash(req.body.email, CLIENT_SECRET, CLIENT_ID),
      });
      if (!authResponse.AuthenticationResult) {
        res.sendStatus(401);
        return;
      }
      const { AccessToken, IdToken, RefreshToken } = authResponse.AuthenticationResult;

      const result = { accessToken: AccessToken, idToken: IdToken, refreshToken: RefreshToken };
      res.send(result);
    } catch (error: any) {}
  }

  static async logout(req: Request, res: Response) {
    try {
      AwsCognitoProvider.logout(req.headers.authorization?.split(" ")[1] || "");
      res.send(true);
    } catch (error: any) {}
  }

  static async refresh(req: Request, res: Response) {
    const CLIENT_SECRET = process.env.COGNITO_CLIENT_SECRET || "";
    const CLIENT_ID = process.env.AWS_APP_CLIENT_ID || "";

    try {
      const authResponse = await AwsCognitoProvider.refresh({
        clientId: CLIENT_ID,
        refreshToken: req.body.refreshToken,
        secretHash: generateSecretHash(req.body.username, CLIENT_SECRET, CLIENT_ID),
      });

      res.json({
        accessToken: authResponse.AuthenticationResult?.AccessToken,
        idToken: authResponse.AuthenticationResult?.IdToken,
      });
    } catch (error: any) {}
  }

  static async verify(req: Request, res: Response) {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      res.status(401).json({ message: "No token provided" });
      return;
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
    if (!decoded) {
      throw new Error("Invalid token");
    }
    const username = decoded.username;

    res.json({ username: username });
  }
}
