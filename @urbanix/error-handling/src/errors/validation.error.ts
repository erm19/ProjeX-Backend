import { BaseError } from "./base.error";

export class ValidationError extends BaseError {
  constructor(message: string = "Bad Request") {
    super(message, 400); // 400 Bad Request
  }
}
