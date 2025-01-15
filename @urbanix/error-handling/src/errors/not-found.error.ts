import { BaseError } from "./base.error";

export class NotFoundError extends BaseError {
  constructor(message: string = "Not Found") {
    super(message, 404); // 404 Not Found
  }
}
