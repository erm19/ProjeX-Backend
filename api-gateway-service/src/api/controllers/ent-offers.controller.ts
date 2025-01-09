import axios, { HttpStatusCode } from "axios";
import expressAsyncHandler from "express-async-handler";
import { createHttpClient } from "../../core/utils";
import { Request, Response } from "express";
import { HttpMethod } from "../../types";

const entOffersHttpClient = createHttpClient(`http://${process.env.ENT_OFFERS_ADDRESS}`);

const baseEntOffersController =
  (getEndpoint: (req: Request) => string, method: string) => async (req: Request, res: Response) => {
    try {
      const endpoint = getEndpoint(req);
      const data = await entOffersHttpClient(endpoint, method, {
        data: req.body,
        headers: { "x-username": req.headers["x-username"] },
      });
      res.json(data);
    } catch (error: any) {
      res.status(error.status || 500).json({ error: error.message });
    }
  };

export const myOffersController = baseEntOffersController(() => "my-offers", HttpMethod.GET);

export const tenderOffersController = baseEntOffersController(
  (req: Request) => `${req.params.tenderId}/offers`,
  HttpMethod.GET
);

export const createOfferController = baseEntOffersController(
  (req: Request) => `${req.params.tenderId}/offer`,
  HttpMethod.POST
);
