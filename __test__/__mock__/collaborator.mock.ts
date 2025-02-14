import type { Collaborator } from '@prisma/client';

import { faker } from '@faker-js/faker';

export function generateTestCollaboratorMock(overrides: Partial<Collaborator> = {}): Collaborator {
  const username = faker.internet.userName().toLowerCase(); // Para usar el mismo en GitHub y LinkedIn

  return {
    id: faker.number.int({ min: 1, max: 1000 }),
    nickname: faker.person.fullName(),
    githubUsername: username,
    linkedinUsername: username,
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
    ...overrides, // Permite personalizar valores específicos
  };
}

export function generateManyTestCollaboratorMocks(count: number): Collaborator[] {
  return Array.from({ length: count }, () => generateTestCollaboratorMock());
}
