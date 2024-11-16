import { RequestHandler, Response } from "express";

export const asyncHandler =
  (fn: RequestHandler) =>
  (...args: Parameters<RequestHandler>) => {
    const fnReturn = fn(...args);
    const res = args[args.length - 2] as Response<any>;
    return Promise.resolve(fnReturn).catch((err: Error) => {
      console.error("THE ERROR", err.message);
      return res.sendStatus(500);
    });
  };
