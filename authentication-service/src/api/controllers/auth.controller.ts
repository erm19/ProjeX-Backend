import { convertUnknownToError, InternalServerError, ValidationError } from "@urbanix/error-handling";
import { NextFunction, Request, Response } from "express";
import {
  LoginUserUseCase,
  LogoutUserUseCase,
  RefreshTokenUseCase,
  VerifyTokenUseCase,
} from "../../application/use-cases";
import { signupUser, userService } from "../../core/constants";
import { generateSecretHash } from "../../core/utils";

export class AuthController {
  static async signup(req: Request, res: Response, next: NextFunction) {
    const CLIENT_SECRET = process.env.COGNITO_CLIENT_SECRET || "";
    const CLIENT_ID = process.env.AWS_APP_CLIENT_ID || "";

    try {
      const newUser = await signupUser.execute({
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

      res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (error) {
      next(new InternalServerError("Failed to signup user"));
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    const CLIENT_SECRET = process.env.COGNITO_CLIENT_SECRET || "";
    const CLIENT_ID = process.env.AWS_APP_CLIENT_ID || "";

    try {
      const response = await LoginUserUseCase.execute(
        {
          username: req.body.email,
          password: req.body.password,
          clientId: CLIENT_ID,
          secretHash: generateSecretHash(req.body.email, CLIENT_SECRET, CLIENT_ID),
        },
        userService
      );

      res.json(response);
    } catch (error) {
      next(new InternalServerError("Failed to login user"));
    }
  }

  static async logout(req: Request, res: Response, next: NextFunction) {
    try {
      await LogoutUserUseCase.execute(req.headers.authorization?.split(" ")[1] || "", userService);
      res.send(true);
    } catch (error) {
      next(new InternalServerError("Failed to logout user"));
    }
  }

  static async refresh(req: Request, res: Response, next: NextFunction) {
    const CLIENT_SECRET = process.env.COGNITO_CLIENT_SECRET || "";
    const CLIENT_ID = process.env.AWS_APP_CLIENT_ID || "";

    try {
      const response = await RefreshTokenUseCase.execute(
        {
          clientId: CLIENT_ID,
          refreshToken: req.body.refreshToken,
          secretHash: generateSecretHash(req.body.username, CLIENT_SECRET, CLIENT_ID),
        },
        userService
      );

      res.json(response);
    } catch (error) {
      next(new InternalServerError("Failed to refresh token"));
    }
  }

  static async verify(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      next(new ValidationError("No Token Provided"));
      return;
    }

    try {
      const username = await VerifyTokenUseCase.execute(token, userService);

      res.json({ username: username });
    } catch (error) {
      convertUnknownToError(error);
    }
  }
}
