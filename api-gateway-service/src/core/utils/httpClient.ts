import axios, { AxiosHeaders, AxiosRequestConfig } from "axios";

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
      const status = err.response?.status || 500;
      throw { status, error: err.message };
    }
  };
