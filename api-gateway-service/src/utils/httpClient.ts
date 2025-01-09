import axios, { AxiosHeaders } from "axios";

export const createHttpClient =
  (baseUrl: string) =>
  async (endpoint: string, method = "GET", data: any, headers: any) => {
    try {
      const res = await axios({
        method,
        url: `${baseUrl}/${endpoint}`,
        data,
        headers,
      });
      return res.data;
    } catch (err: any) {
      const status = err.response?.status || 500;
      throw { status, error: err.message };
    }
  };
