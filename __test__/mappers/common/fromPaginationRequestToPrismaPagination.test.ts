import type {PaginationRequest} from "@/types/responses";

import {describe, it, expect} from "vitest";

import {fromPaginationRequestToPrismaPagination} from "@/mappers/common/fromPaginationRequestToPrismaPagination";

describe("fromPaginationRequestToPrismaPagination", () => {
  it("should return undefined skip and take when paginationRequest is not defined", () => {
    const result = fromPaginationRequestToPrismaPagination();

    expect(result.skip).toBeUndefined();
    expect(result.take).toBeUndefined();
  });

  it("should return correct skip and take when paginationRequest is provided", () => {
    const paginationRequest: PaginationRequest = {
      page: 2,
      size: 10,
    };

    const result = fromPaginationRequestToPrismaPagination(paginationRequest);

    expect(result.skip).toBe(10); // (2 - 1) * 10 = 10
    expect(result.take).toBe(10);
  });

  it("should handle edge case where page is 1", () => {
    const paginationRequest: PaginationRequest = {
      page: 1,
      size: 10,
    };

    const result = fromPaginationRequestToPrismaPagination(paginationRequest);

    expect(result.skip).toBe(0); // (1 - 1) * 10 = 0
    expect(result.take).toBe(10);
  });

  it("should handle cases with different page sizes", () => {
    const paginationRequest: PaginationRequest = {
      page: 3,
      size: 5,
    };

    const result = fromPaginationRequestToPrismaPagination(paginationRequest);

    expect(result.skip).toBe(10); // (3 - 1) * 5 = 10
    expect(result.take).toBe(5);
  });
});
