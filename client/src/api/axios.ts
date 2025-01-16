import axios, { AxiosError, AxiosResponse } from "axios";

const BASE_URL = import.meta.env.BASE_URL;

interface ResponseData {
  success: boolean;

  status: number;

  message: string;

  data: unknown;
}

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: false,
  timeout: 10000,
});

axiosInstance.interceptors.request.use(function accessTokenInterceptor(config) {
  const accessToken = localStorage.getItem("accessToken");

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  function errorHandlingInterceptor(error: AxiosError) {
    if (axios.isCancel(error)) {
      console.error("Request canceled:", error.message);
      return Promise.reject(null); // Treat canceled requests differently if needed
    }

    const status = (error as AxiosError).response?.status;
    const errorMessage = ((error as AxiosError).response?.data as ResponseData)
      ?.message;

    if (status === 400) {
      const message = Array.isArray(errorMessage)
        ? errorMessage[0]
        : errorMessage;
      // toast.error(message);
      return Promise.reject({ error: true, message });
    }

    console.error("Error making request:", error);
    return Promise.reject(error);
  }
);

let controller: AbortController;
let previousEndpoint: string;

export const axiosRequest = async ({
  method = "GET",
  endpoint = "",
  headers = {},
  body = {},
  query = {},
}) => {
  // Cancel previous request if it's the same endpoint
  if (controller && previousEndpoint === endpoint) {
    controller.abort();
  }
  controller = new AbortController();
  previousEndpoint = endpoint;

  //* Configure request
  const config = {
    method,
    url: endpoint,
    headers,
    params: query,
    data: body,
    signal: controller.signal,
  };

  // Send request
  const response = await axiosInstance(config);
  return response;
};
