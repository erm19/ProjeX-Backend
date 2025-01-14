import { BaseError } from "./base.error";

export class InternalServerError extends BaseError {
  constructor(message: string = "Internal Server Error") {
    super(message, 500); // 500 Internal Server Error
  }
}
