import type { APIContext } from 'astro';

import { createMockApiContext } from '__test__/__mock__/create-mock-api-context';
import { TEST_STACK_MOCK } from '__test__/__mock__/stack.mock';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { databaseClient } from '@/helpers/client/prisma';
import { DELETE, POST } from '@/pages/api/stack';
import { StackCreateSchema } from '@/schemas/stack/create';

vi.mock('@/helpers/client/prisma', () => ({
  databaseClient: {
    stack: {
      create: vi.fn(),
      deleteMany: vi.fn(),
    },
  },
}));

vi.mock('@/schemas/stack/create', () => ({
  StackCreateSchema: {
    parse: vi.fn(),
  },
}));

vi.mock('@/helpers/error/api-handler', () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleApiError: (error: any) => {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  },
}));

describe('CREATE stack endpoint', () => {
  const PrismaStackMock = TEST_STACK_MOCK;
  const RequestStackMock: StackCreateSchema = {
    name: 'Test Stack',
    description: 'This is a test stack',
    key: 'test-stack',
    category: 'BACK_END',
    type: 'DATABASE',
    iconUrl: 'https://example.com/icon.png',
  };
  const ParsedStackRequest: typeof RequestStackMock = JSON.parse(JSON.stringify(RequestStackMock));
  let AstroApiContext: APIContext;

  beforeEach(() => {
    AstroApiContext = createMockApiContext({
      request: {
        method: '',
        body: JSON.stringify(RequestStackMock),
      },
    });

    vi.restoreAllMocks();
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  afterEach(() => {
    expect(StackCreateSchema.parse).toHaveBeenCalledWith(ParsedStackRequest);
    expect(databaseClient.stack.create).toHaveBeenCalled();
  });

  it('should return a stack when parameters are valid', async () => {
    vi.spyOn(databaseClient.stack, 'create').mockResolvedValue(PrismaStackMock);
    vi.spyOn(StackCreateSchema, 'parse').mockResolvedValue(ParsedStackRequest);

    const response = await POST(AstroApiContext);
    const responseBody = await response.json();

    expect(responseBody).toEqual(ParsedStackRequest);
    expect(response.status).toBe(201);
  });

  it('should return a 500 error if an exception occurs', async () => {
    vi.spyOn(databaseClient.stack, 'create').mockRejectedValue(new Error('This is a test error'));
    vi.spyOn(StackCreateSchema, 'parse').mockResolvedValue(ParsedStackRequest);

    const response = await POST(AstroApiContext);
    const responseBody = await response.json();

    expect(response.status).toBe(500);
    expect(responseBody).toEqual({ error: 'This is a test error' });
  });
});

describe('DELETE stack endpoint', () => {
  const RequestInputMock = [1, 2, 3];
  const ResponseDeletedExpected = {
    count: RequestInputMock.length,
  };
  let AstroApiContext: APIContext;

  beforeEach(() => {
    AstroApiContext = createMockApiContext({
      request: {
        method: 'DELETE',
        body: JSON.stringify(RequestInputMock),
      },
    });

    vi.restoreAllMocks();
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  afterEach(() => {
    expect(databaseClient.stack.deleteMany).toHaveBeenCalled();
  });

  it('should return a stack when parameters are valid', async () => {
    vi.spyOn(databaseClient.stack, 'deleteMany').mockResolvedValue(ResponseDeletedExpected);

    const response = await DELETE(AstroApiContext);
    const responseBody = await response.json();

    expect(response.status).toBe(200);
    expect(responseBody).toEqual(ResponseDeletedExpected);
  });

  it('should return a 500 error if an exception occurs', async () => {
    vi.spyOn(databaseClient.stack, 'deleteMany').mockRejectedValue(
      new Error('This is a test error'),
    );

    const response = await DELETE(AstroApiContext);
    const responseBody = await response.json();

    expect(response.status).toBe(500);
    expect(responseBody).toEqual({ error: 'This is a test error' });
  });
});
