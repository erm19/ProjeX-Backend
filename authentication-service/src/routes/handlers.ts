import {
  AttributeType,
  InitiateAuthCommandInput,
  InitiateAuthRequest,
  SignUpCommandInput,
} from "@aws-sdk/client-cognito-identity-provider";
import expressAsyncHandler from "express-async-handler";
import { cognito, jwks } from "../providers/aws";
import { CustomUserAttributes } from "../types";
import { createHmac } from "crypto";
import { decode, verify } from "jsonwebtoken";
import { User } from "../models";

export const signupHandler = expressAsyncHandler(async (req, res) => {
  console.log("I'm here!");
  const CLIENT_SECRET = process.env.COGNITO_CLIENT_SECRET || "";
  const CLIENT_ID = process.env.AWS_APP_CLIENT_ID || "";

  const email = req.body.email;
  const password = req.body.password;
  const role = req.body.role;
  const companyName = req.body.companyName;
  const companyId = req.body.companyId;
  const companyRole = req.body.companyRole;
  const officeName = req.body.officeName;
  const licenceNum = req.body.licenceNum;

  const hasher = createHmac("sha256", CLIENT_SECRET);
  hasher.update(`${email}${CLIENT_ID}`);
  const secretHash = hasher.digest("base64");

  const params: SignUpCommandInput = {
    ClientId: process.env.AWS_APP_CLIENT_ID,
    SecretHash: secretHash,
    Username: email,
    Password: password,
    UserAttributes: [
      ...userAttributes({ role, companyName, companyRole, licenceNum, officeName, companyId }),
      { Name: "email", Value: email },
    ],
  };

  const signupResponse = await cognito.signUp(params);

  // TODO: Move to AWS Lamda Function later to Cognito post signup confirmation
  const user = new User({
    email: email,
    role: role,
    companyName: companyName || officeName,
    licenseNum: licenceNum,
    companyNum: companyId,
  });
  user.save();
  // End TODO

  res.send(signupResponse);
});

export const loginHandler = expressAsyncHandler(async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const hasher = createHmac("sha256", process.env.COGNITO_CLIENT_SECRET || "");
  hasher.update(`${email}${process.env.AWS_APP_CLIENT_ID}`);
  const secretHash = hasher.digest("base64");

  const params: InitiateAuthRequest = {
    AuthFlow: "USER_PASSWORD_AUTH",
    ClientId: process.env.AWS_APP_CLIENT_ID,

    AuthParameters: { USERNAME: email, PASSWORD: password, SECRET_HASH: secretHash },
  };

  const authResponse = await cognito.initiateAuth(params);

  if (!authResponse.AuthenticationResult) {
    res.sendStatus(401);
    return;
  }
  const { AccessToken, IdToken, RefreshToken } = authResponse.AuthenticationResult;

  const result = { accessToken: AccessToken, idToken: IdToken, refreshToken: RefreshToken };
  res.send(result);
});

export const logoutHandler = expressAsyncHandler(async (req, res) => {
  const accessToken = req.headers.authorization?.split(" ")[1];
  const input = {
    // GlobalSignOutRequest
    AccessToken: accessToken || "", // required
  };

  await cognito.globalSignOut(input);

  res.send(true);
});

export const refreshHandler = expressAsyncHandler(async (req, res) => {
  const { refreshToken, username } = req.body;

  const hasher = createHmac("sha256", process.env.COGNITO_CLIENT_SECRET || "");
  hasher.update(`${username}${process.env.AWS_APP_CLIENT_ID}`);
  const secretHash = hasher.digest("base64");

  const params: InitiateAuthCommandInput = {
    AuthFlow: "REFRESH_TOKEN_AUTH",
    ClientId: process.env.AWS_APP_CLIENT_ID,
    AuthParameters: {
      REFRESH_TOKEN: refreshToken,
      SECRET_HASH: secretHash,
    },
  };

  const authResponse = await cognito.initiateAuth(params);

  res.json({
    accessToken: authResponse.AuthenticationResult?.AccessToken,
    idToken: authResponse.AuthenticationResult?.IdToken,
  });
});

export const verifyHandler = expressAsyncHandler(async (req, res) => {
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
});

function userAttributes(attr: CustomUserAttributes): AttributeType[] {
  return [
    { Name: "custom:role", Value: attr.role || "" },
    { Name: "custom:licenceNum", Value: attr.licenceNum || "" },
    { Name: "custom:companyCode", Value: attr.companyId || "" },
    { Name: "custom:companyName", Value: attr.companyName || attr.officeName || "" },
    { Name: "custom:companyRole", Value: attr.companyRole || "" },
  ];
}
