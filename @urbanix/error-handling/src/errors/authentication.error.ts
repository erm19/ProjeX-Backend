import { BaseError } from "./base.error";

export class AuthenticationError extends BaseError {
  constructor(message: string = "Unauthorized") {
    super(message, 401); // 401 Unauthorized
  }
}
