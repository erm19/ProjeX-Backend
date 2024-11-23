import {
  AttributeType,
  AuthenticationResultType,
  InitiateAuthRequest,
  SignUpCommandInput,
} from "@aws-sdk/client-cognito-identity-provider";
import expressAsyncHandler from "express-async-handler";
import { cognito } from "../providers/aws";
import { CustomUserAttributes } from "../types";
import { createHmac } from "crypto";

export const signupHandler = expressAsyncHandler(async (req, res) => {
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
    UserAttributes: userAttributesByRole({ role, companyName, companyRole, licenceNum, officeName, companyId }),
  };

  const signupResponse = await cognito.signUp(params);

  console.log(signupResponse);

  res.send(signupResponse);
});

export const loginHandler = expressAsyncHandler(async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const params: InitiateAuthRequest = {
    AuthFlow: "USER_PASSWORD_AUTH",
    ClientId: process.env.AWS_APP_CLIENT_ID,
    AuthParameters: { USERNAME: email, PASSWORD: password },
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
  res.send(true);
});

function userAttributesByRole(attr: CustomUserAttributes): AttributeType[] {
  return [
    { Name: "custom:role", Value: attr.role || "" },
    { Name: "custom:licenceNum", Value: attr.licenceNum || "" },
    { Name: "custom:companyCode", Value: attr.companyId || "" },
    { Name: "custom:companyName", Value: attr.companyName || "" },
    { Name: "custom:companyRole", Value: attr.companyRole || "" },
  ];
}
