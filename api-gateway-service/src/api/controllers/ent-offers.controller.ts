import { createHttpClient } from "../../core/utils";
import { NextFunction, Request, Response } from "express";
import { HttpMethod } from "../../core/types";
import { convertUnknownToError } from "@urbanix/error-handling";

const entOffersHttpClient = createHttpClient(`http://${process.env.ENT_OFFERS_ADDRESS}`);

const baseController =
  (getEndpoint: (req: Request) => string, method: string) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const endpoint = getEndpoint(req);
      const data = await entOffersHttpClient(endpoint, method, {
        data: req.body,
        headers: { "x-username": req.headers["x-username"] },
      });
      res.json(data);
    } catch (error) {
      next(convertUnknownToError(error));
    }
  };

export const myOffersController = baseController(() => "my-offers", HttpMethod.GET);

export const tenderOffersController = baseController((req: Request) => `${req.params.tenderId}/offers`, HttpMethod.GET);

export const createOfferController = baseController((req: Request) => `${req.params.tenderId}/offer`, HttpMethod.POST);
