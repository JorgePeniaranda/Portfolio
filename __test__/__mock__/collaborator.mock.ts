import type { Collaborator } from '@prisma/client';

import { faker } from '@faker-js/faker';

/**
 * Generate a test collaborator mock.
 * @param overrides - The properties to override
 * @returns A test collaborator mock
 */
export function generateTestCollaboratorMock(overrides: Partial<Collaborator> = {}): Collaborator {
  const username = faker.internet.username().toLowerCase();

  return {
    id: faker.number.int({ min: 1, max: 1000 }),
    nickname: faker.person.fullName(),
    githubUsername: username,
    linkedinUsername: username,
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
    ...overrides,
  };
}

/**
 * Generate many test collaborator mocks.
 * @param count - The number of mocks to generate
 * @returns An array of test collaborator mocks
 */
export function generateManyTestCollaboratorMocks(count: number): Collaborator[] {
  return Array.from({ length: count }, () => generateTestCollaboratorMock());
}
