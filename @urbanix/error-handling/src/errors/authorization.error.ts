import { BaseError } from "./base.error";

export class AuthorizationError extends BaseError {
  constructor(message: string = "Forbidden") {
    super(message, 403); // 403 Forbidden
  }
}
