import axios from 'axios';

import { ENV } from '@/constants/env';

/**
 * An Axios client instance.
 * @see https://axios-http.com/docs/intro
 */
export const apiClient = axios.create({
  baseURL: ENV.apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});
