import {
  AttributeType,
  CognitoIdentityProvider,
  InitiateAuthCommandInput,
  InitiateAuthRequest,
  SignUpCommandInput,
} from "@aws-sdk/client-cognito-identity-provider";
import { JwksClient } from "jwks-rsa";
import { CustomUserAttributes, LoginParams, RefreshParams, SignupParams } from "../../core/types";

export const cognito = new CognitoIdentityProvider({ region: process.env.AWS_COGNITO_REGION });

export const jwks = new JwksClient({
  jwksUri: `https://cognito-idp.${process.env.AWS_COGNITO_REGION}.amazonaws.com/${process.env.AWS_USER_POOL_ID}/.well-known/jwks.json`,
});

export class AwsCognitoProvider {
  private static _cognito = cognito;

  static async signup(params: SignupParams) {
    const commandParams: SignUpCommandInput = {
      ClientId: params.clientId,
      SecretHash: params.secretHash,
      Username: params.email,
      Password: params.password,
      UserAttributes: [
        ...AwsCognitoProvider.userAttributes({
          role: params.role,
          companyName: params.companyName,
          companyRole: params.companyRole,
          licenceNum: params.licenceNum,
          officeName: params.officeName,
          companyId: params.companyId,
        }),
        { Name: "email", Value: params.email },
      ],
    };
    return await this._cognito.signUp(commandParams);
  }

  static async login(params: LoginParams) {
    const commandParams: InitiateAuthCommandInput = {
      AuthFlow: "USER_PASSWORD_AUTH",
      ClientId: process.env.AWS_APP_CLIENT_ID,

      AuthParameters: { USERNAME: params.username, PASSWORD: params.password, SECRET_HASH: params.secretHash },
    };

    return await this._cognito.initiateAuth(commandParams);
  }

  static async logout(token: string) {
    const input = {
      // GlobalSignOutRequest
      AccessToken: token || "", // required
    };

    return await this._cognito.globalSignOut(input);
  }

  static async refresh(params: RefreshParams) {
    const commandParams: InitiateAuthCommandInput = {
      AuthFlow: "REFRESH_TOKEN_AUTH",
      ClientId: params.clientId,
      AuthParameters: {
        REFRESH_TOKEN: params.refreshToken,
        SECRET_HASH: params.secretHash,
      },
    };

    return await this._cognito.initiateAuth(commandParams);
  }

  private static userAttributes(attr: CustomUserAttributes): AttributeType[] {
    return [
      { Name: "custom:role", Value: attr.role || "" },
      { Name: "custom:licenceNum", Value: attr.licenceNum || "" },
      { Name: "custom:companyCode", Value: attr.companyId || "" },
      { Name: "custom:companyName", Value: attr.companyName || attr.officeName || "" },
      { Name: "custom:companyRole", Value: attr.companyRole || "" },
    ];
  }
}
