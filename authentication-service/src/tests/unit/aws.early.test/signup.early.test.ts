// Unit tests for: signup

import { CognitoIdentityProvider, SignUpCommandInput } from "@aws-sdk/client-cognito-identity-provider";
import { SignupParams } from "../../../core/types";
import { AwsCognitoProvider } from "../../../infrastructure/providers/aws";

jest.mock("@aws-sdk/client-cognito-identity-provider");

describe("AwsCognitoProvider.signup() signup method", () => {
  let mockSignUp: jest.Mock;

  beforeAll(() => {
    mockSignUp = jest.fn();
    (CognitoIdentityProvider as jest.Mock).mockImplementation(() => ({
      signUp: mockSignUp,
    }));
  });

  beforeEach(() => {
    mockSignUp.mockClear();
  });

  // Happy Path Tests
  describe("Happy Paths", () => {
    it("should successfully sign up a user with valid parameters", async () => {
      // Arrange
      const params: SignupParams = {
        email: "test@example.com",
        password: "Password123!",
        role: "user",
        companyName: "Test Company",
        companyId: "12345",
        companyRole: "Developer",
        officeName: "Main Office",
        licenceNum: "LIC123",
        secretHash: "secretHashValue",
        clientId: "clientIdValue",
      };

      mockSignUp.mockResolvedValue({ UserConfirmed: true });

      // Act
      const result = await AwsCognitoProvider.signup(params);

      // Assert
      expect(mockSignUp).toHaveBeenCalledWith(
        expect.objectContaining<SignUpCommandInput>({
          ClientId: params.clientId,
          SecretHash: params.secretHash,
          Username: params.email,
          Password: params.password,
          UserAttributes: expect.arrayContaining([
            { Name: "email", Value: params.email },
            { Name: "custom:role", Value: params.role },
            { Name: "custom:licenceNum", Value: params.licenceNum },
            { Name: "custom:companyCode", Value: params.companyId },
            { Name: "custom:companyName", Value: params.companyName },
            { Name: "custom:companyRole", Value: params.companyRole },
          ]),
        })
      );
      expect(result).toEqual({ UserConfirmed: true });
    });
  });

  // Edge Case Tests
  describe("Edge Cases", () => {
    it("should handle missing optional user attributes gracefully", async () => {
      // Arrange
      const params: SignupParams = {
        email: "test@example.com",
        password: "Password123!",
        role: "",
        companyName: "",
        companyId: "",
        companyRole: "",
        officeName: "",
        licenceNum: "",
        secretHash: "secretHashValue",
        clientId: "clientIdValue",
      };

      mockSignUp.mockResolvedValue({ UserConfirmed: false });

      // Act
      const result = await AwsCognitoProvider.signup(params);

      // Assert
      expect(mockSignUp).toHaveBeenCalledWith(
        expect.objectContaining<SignUpCommandInput>({
          ClientId: params.clientId,
          SecretHash: params.secretHash,
          Username: params.email,
          Password: params.password,
          UserAttributes: expect.arrayContaining([
            { Name: "email", Value: params.email },
            { Name: "custom:role", Value: "" },
            { Name: "custom:licenceNum", Value: "" },
            { Name: "custom:companyCode", Value: "" },
            { Name: "custom:companyName", Value: "" },
            { Name: "custom:companyRole", Value: "" },
          ]),
        })
      );
      expect(result).toEqual({ UserConfirmed: false });
    });

    it("should throw an error if Cognito signUp fails", async () => {
      // Arrange
      const params: SignupParams = {
        email: "test@example.com",
        password: "Password123!",
        role: "user",
        companyName: "Test Company",
        companyId: "12345",
        companyRole: "Developer",
        officeName: "Main Office",
        licenceNum: "LIC123",
        secretHash: "secretHashValue",
        clientId: "clientIdValue",
      };

      const error = new Error("Cognito signUp failed");
      mockSignUp.mockRejectedValue(error);

      // Act & Assert
      await expect(AwsCognitoProvider.signup(params)).rejects.toThrow("Cognito signUp failed");
    });
  });
});

// End of unit tests for: signup
