import type {PaginationRequest} from "@/types/responses";

import {isNotDefined} from "@/helpers/guards/is-defined";

/**
 * Converts a pagination request object to a Prisma-compatible pagination format.
 *
 * @param {PaginationRequest} [paginationRequest] - The pagination request object containing `page` and `size`.
 * @returns {{ skip: number | undefined; take: number | undefined }} - An object with `skip` and `take` properties for Prisma queries.
 */
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
