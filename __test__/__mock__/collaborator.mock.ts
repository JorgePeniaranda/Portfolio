import type { Collaborator } from '@prisma/client';

export const TEST_COLLABORATOR_MOCK: Collaborator = {
  id: 1,
  nickname: 'John Doe',
  githubUsername: 'johndoe',
  linkedinUsername: 'johndoe',
  createdAt: new Date('2021-01-01T00:00:00.000Z'),
  updatedAt: new Date('2023-01-01T00:00:00.000Z'),
};
