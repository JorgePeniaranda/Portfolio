import { StackCategory, StackType, type Stack } from '@prisma/client';
import { faker } from '@faker-js/faker';

export function generateTestStackMock(): Stack {
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
  };
}

export function generateManyTestStackMocks(count: number): Stack[] {
  return Array.from({ length: count }, () => generateTestStackMock());
}
