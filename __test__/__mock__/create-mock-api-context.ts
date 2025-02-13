import type { APIContext } from 'astro';

import { createContext, type CreateContext } from 'astro/middleware';

interface ICommonCreateContext extends Partial<Omit<CreateContext, 'request' | 'params'>> {
  request?: RequestInit;
  params?: Record<string, string>;
}

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
