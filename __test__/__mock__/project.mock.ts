import type { Project } from '@prisma/client';

import { ProjectStatus, StackCategory } from '@prisma/client';
import { faker } from '@faker-js/faker';

/**
 * Generate a test project mock.
 * @param overrides - The properties to override
 * @returns A test project mock
 */
export function generateTestProjectMock(overrides: Partial<Project> = {}): Project {
  return {
    id: faker.number.int({ min: 1, max: 1000 }),
    key: faker.helpers.slugify(faker.lorem.words(2)).toLowerCase(),
    name: faker.commerce.productName(),
    status: faker.helpers.enumValue(ProjectStatus) as ProjectStatus,
    stackCategory: faker.helpers.enumValue(StackCategory) as StackCategory,
    description: faker.lorem.sentence(),
    contributions: faker.lorem.sentences(2),
    goals: faker.lorem.sentences(2),
    demoUrl: faker.internet.url(),
    githubUrl: `https://github.com/${faker.internet.username()}/${faker.lorem.slug()}`,
    logoUrl: faker.image.url(),
    primaryColor: faker.color.rgb(),
    startDate: faker.date.past(),
    endDate: faker.date.future(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
    ...overrides,
  };
}

/**
 * Generate many test project mocks.
 * @param count - The number of mocks to generate
 * @returns An array of test project mocks
 */
export function generateManyTestProjectMocks(count: number): Project[] {
  return Array.from({ length: count }, () => generateTestProjectMock());
}
