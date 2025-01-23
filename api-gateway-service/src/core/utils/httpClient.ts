import { BaseError, convertUnknownToError, throwErrorByStatus } from "@urbanix/error-handling";
import axios, { AxiosRequestConfig } from "axios";

export const createHttpClient =
  (baseUrl: string) =>
  async (endpoint: string, method = "GET", config: AxiosRequestConfig) => {
    try {
      const res = await axios({
        method,
        url: `${baseUrl}/${endpoint}`,
        data: config.data,
        headers: config.headers,
      });
      return res.data;
    } catch (err: any) {
      throwErrorByStatus(err.status, err.response.data.data);
    }
  };
