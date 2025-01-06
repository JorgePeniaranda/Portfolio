import type {PaginationRequest} from "@/types/responses";

export function fromPaginationRequestToPrismaPagination(paginationRequest?: PaginationRequest): {
  skip: number | undefined;
  take: number | undefined;
} {
  if (!paginationRequest) {
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
