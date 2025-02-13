import type { PaginationRequest } from '@/types/responses';

import { ZodError } from 'zod';
import { describe, expect, it } from 'vitest';

import { BuildPaginationByURL } from '@/helpers/common/build-pagination';

describe('BuildPaginationByURL', () => {
  it('should return pagination parameters when valid parameters are provided', () => {
    const url = 'http://example.com?size=10&page=2';
    const result = BuildPaginationByURL(url);

    expect(result).toEqual<PaginationRequest>({
      page: 2,
      size: 10,
    });
  });

  it('should return undefined when no pagination parameters are provided', () => {
    const url = 'http://example.com';
    const result = BuildPaginationByURL(url);

    expect(result).toBeUndefined();
  });

  it('should throw an error when parameters are invalid', () => {
    const url = 'http://example.com?size=-5&page=0';

    expect(() => BuildPaginationByURL(url)).toThrow(ZodError);
  });

  it('should coerce string numbers to valid pagination numbers', () => {
    const url = 'http://example.com?size=20&page=3';
    const result = BuildPaginationByURL(url);

    expect(result).toEqual<PaginationRequest>({
      page: 3,
      size: 20,
    });
  });

  it('should return undefined if only one parameter (page or size) is provided', () => {
    const urlPageOnly = 'http://example.com?page=1';
    const urlSizeOnly = 'http://example.com?size=10';

    expect(BuildPaginationByURL(urlPageOnly)).toBeUndefined();
    expect(BuildPaginationByURL(urlSizeOnly)).toBeUndefined();
  });
});
