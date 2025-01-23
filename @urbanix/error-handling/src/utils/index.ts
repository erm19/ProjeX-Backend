import { AuthenticationError } from "../errors/authentication.error";
import { AuthorizationError } from "../errors/authorization.error";
import { InternalServerError } from "../errors/internal-server.error";
import { NotFoundError } from "../errors/not-found.error";
import { ValidationError } from "../errors/validation.error";

export const throwErrorByStatus = (status: number, message: string) => {
  switch (status) {
    case 400:
      throw new ValidationError(message);
    case 401:
      throw new AuthenticationError(message);
    case 403:
      throw new AuthorizationError(message);
    case 404:
      throw new NotFoundError(message);
    default:
      throw new InternalServerError(message);
  }
};
