import { createHttpClient } from "../../core/utils";
import { NextFunction, Request, Response } from "express";
import { HttpMethod } from "../../core/types";
import { convertUnknownToError } from "@urbanix/error-handling";

const entTendersHttpClient = createHttpClient(`${process.env.ENT_TENDER_ADDRESS}`);

const baseController =
  (getEndpoint: (req: Request) => string, method: string) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const endpoint = getEndpoint(req);
      const data = await entTendersHttpClient(endpoint, method, {
        data: req.body,
        headers: { "x-username": req.headers["x-username"] },
        params: req.query,
      });
      res.json(data);
    } catch (error) {
      next(convertUnknownToError(error));
    }
  };

export const tenderListController = baseController((req: Request) => {
  const query = req.url.split("?")[1];
  if (!query) return "list";
  return `list?${req.url.split("?")[1]}`;
}, HttpMethod.GET);

export const tenderDetailsController = baseController(
  (req: Request) => `details/${req.params.tenderId}`,
  HttpMethod.GET
);

export const createTenderController = baseController(() => "tender", HttpMethod.POST);

export const myTendersController = baseController(() => "my-tenders", HttpMethod.GET);
