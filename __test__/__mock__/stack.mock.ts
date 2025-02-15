import { StackCategory, StackType, type Stack } from '@prisma/client';
import { faker } from '@faker-js/faker';

/**
 * Generate a test stack mock.
 * @param overrides - The properties to override
 * @returns A test stack mock
 */
export function generateTestStackMock(overrides: Partial<Stack> = {}): Stack {
  return {
    id: faker.number.int({ min: 1, max: 1000 }),
    name: faker.company.name(),
    key: faker.helpers.slugify(faker.lorem.words(2)).toLowerCase(),
    category: faker.helpers.enumValue(StackCategory) as StackCategory,
    type: faker.helpers.enumValue(StackType) as StackType,
    description: faker.lorem.sentence(),
    iconUrl: faker.image.url(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
    ...overrides,
  };
}

/**
 * Generate many test stack mocks.
 * @param count - The number of mocks to generate
 * @returns An array of test stack mocks
 */
export function generateManyTestStackMocks(count: number): Stack[] {
  return Array.from({ length: count }, () => generateTestStackMock());
}
