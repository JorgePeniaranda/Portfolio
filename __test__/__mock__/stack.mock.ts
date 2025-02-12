import type { Stack } from '@prisma/client';

export const TEST_STACK_MOCK: Stack = {
  id: 1,
  name: 'Test Stack',
  key: 'test-stack',
  category: 'FULL_STACK',
  type: 'DATABASE',
  description: 'A test stack',
  iconUrl: 'https://example.com/icon.png',
  createdAt: new Date('2021-01-01T00:00:00.000Z'),
  updatedAt: new Date('2023-01-01T00:00:00.000Z'),
};
