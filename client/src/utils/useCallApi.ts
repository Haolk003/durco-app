import axios, { AxiosResponse, AxiosError, AxiosRequestConfig } from "axios";

const customFetch = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_HOST,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
customFetch.interceptors.response.use(
  (response: AxiosResponse<any>) => response,
  async (error: AxiosError<any>) => {
    if (error?.response?.data.tokenExpires === true) {
      try {
        const response = await customFetch.get<any, AxiosResponse<any, any>>(
          "/auth/refesh"
        );
        const newToken = response?.headers["set-cookie"]?.find((cookie) =>
          cookie.startsWith("accessToken")
        );
        if (newToken) {
          customFetch.defaults.headers.common["Authorization"] = newToken;
          return customFetch(error.config as AxiosRequestConfig);
        } else {
          return Promise.reject(error);
        }
      } catch (err) {
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);
export default customFetch;
