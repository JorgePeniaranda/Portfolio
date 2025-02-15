import type { AxiosResponse } from 'axios';

import { AxiosHeaders } from 'axios';

/**
 * Create a mock Axios response for testing.
 * @param params - The response parameters
 * @returns A mock Axios response
 */
export function createMockAxiosResponse<T = unknown>(
  params: Partial<AxiosResponse<T>> = {},
): AxiosResponse<T> {
  const { config: configParams, ...restParams } = params;

  return {
    data: null as T,
    status: 200,
    statusText: 'OK',
    headers: AxiosHeaders.from({}),
    config: {
      headers: AxiosHeaders.from({}),
      method: 'get',
      url: 'https://example.com/api',
      timeout: 0,
      ...configParams,
    },
    ...restParams,
  };
}
