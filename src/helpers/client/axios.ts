import axios from "axios";

import {ENV} from "@/constants/env";

/**
 * A pre-configured Axios instance for making API requests.
 * It has a base URL set from the environment variables and defaults to using the "application/json" content type header.
 * This client can be used for making HTTP requests throughout the application.
 *
 * @constant {AxiosInstance} apiClient - The Axios instance configured with base URL and headers for API requests.
 */
export const apiClient = axios.create({
  baseURL: ENV.base_url,
  headers: {
    "Content-Type": "application/json",
  },
});
