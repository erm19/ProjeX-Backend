import axios, { AxiosHeaders } from "axios";

export const createHttpClient =
  (baseUrl: string) =>
  (endpoint: string, method = "GET", data: any, headers: AxiosHeaders) => {
    axios({
      method,
      url: `${baseUrl}/${endpoint}`,
      data,
      headers,
    })
      .then((res) => res.data)
      .catch((err) => {
        const status = err.response?.status || 500;
        throw { status, error: err.message };
      });
  };
