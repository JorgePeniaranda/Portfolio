import type { APIContext } from 'astro';

import { createContext, type CreateContext } from 'astro/middleware';

interface ICommonCreateContext extends Partial<Omit<CreateContext, 'request' | 'params'>> {
  request?: RequestInit;
  params?: Record<string, string>;
}

/**
 * Create a mock API context for testing Astro API requests.
 * @param params - Parameters for the mock context
 * @param params.request - Request options for the mock context
 * @param params.params - URL parameters for the mock context
 * @returns A mock API context for testing Astro API requests
 */
export function createMockApiContext({
  request = {},
  params = {},
  ...restParams
}: ICommonCreateContext = {}): APIContext {
  const defaultRequestInit: RequestInit = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    credentials: 'same-origin',
    cache: 'no-store',
    mode: 'cors',
    redirect: 'follow',
  };

  return createContext({
    params: params,
    request: new Request('https://example.com/api', { ...defaultRequestInit, ...request }),
    defaultLocale: 'en',
    locals: {},
    userDefinedLocales: ['en'],
    ...restParams,
  });
}
