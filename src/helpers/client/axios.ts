import axios from "axios";

import {ENV} from "@/constants/env";

export const apiClient = axios.create({
  baseURL: ENV.base_url,
  headers: {
    "Content-Type": "application/json",
  },
});
