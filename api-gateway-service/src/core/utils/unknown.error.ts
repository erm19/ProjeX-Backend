import { BaseError, InternalServerError } from "@urbanix/error-handling";

export const handleUnknownError = (error: unknown) => {
  if (error instanceof BaseError) throw error;
  throw new InternalServerError();
};
