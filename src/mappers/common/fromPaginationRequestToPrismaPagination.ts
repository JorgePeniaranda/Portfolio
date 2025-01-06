import type {PaginationRequest} from "@/types/responses";

import {isNotDefined} from "@/helpers/guards/is-defined";

export function fromPaginationRequestToPrismaPagination(paginationRequest?: PaginationRequest): {
  skip: number | undefined;
  take: number | undefined;
} {
  if (isNotDefined(paginationRequest)) {
    return {
      skip: undefined,
      take: undefined,
    };
  }

  return {
    skip: (paginationRequest.page - 1) * paginationRequest.size,
    take: paginationRequest.size,
  };
}
