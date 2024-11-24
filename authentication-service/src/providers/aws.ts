import { CognitoIdentityProvider } from "@aws-sdk/client-cognito-identity-provider";
import { JwksClient } from "jwks-rsa";

export const cognito = new CognitoIdentityProvider({ region: process.env.AWS_COGNITO_REGION });

export const jwks = new JwksClient({
  jwksUri: `https://cognito-idp.${process.env.AWS_COGNITO_REGION}.amazonaws.com/${process.env.AWS_USER_POOL_ID}/.well-known/jwks.json`,
});
