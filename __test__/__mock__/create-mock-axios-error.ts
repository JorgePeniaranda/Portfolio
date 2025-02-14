import type { AxiosError, AxiosResponse } from 'axios';

import { AxiosHeaders } from 'axios';

interface MockAxiosErrorParams<T> extends Partial<Omit<AxiosError<T>, 'response'>> {
  response?: Partial<AxiosResponse<T>>;
}

export function createMockAxiosError<T = unknown>(
  params: MockAxiosErrorParams<T> = {},
): AxiosError<T> {
  const { response: responseParams, config: configParams, ...restParams } = params;

  return {
    name: 'AxiosError',
    message: 'Request failed with status code 500',
    isAxiosError: true,
    toJSON: () => ({}),
    code: 'ERR_BAD_RESPONSE',
    response: {
      data: null as T,
      status: 500,
      statusText: 'Internal Server Error',
      headers: AxiosHeaders.from({}),
      config: {
        headers: AxiosHeaders.from({}),
        method: 'get',
        url: '',
        timeout: 0,
      },
      ...responseParams,
    } as AxiosResponse<T>,
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
