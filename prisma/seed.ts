import {
  PrismaClient,
  ProjectStatus,
  StackCategory,
  StackType,
  type Collaborator,
  type Stack,
} from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

// Configuration for the number of fake data to generate
const config = {
  projects: 10,
  stacks: 5,
  collaborators: 10,
  projectToStacks: { min: 2, max: 4 }, // Number of stacks per project (min - max)
  projectToCollaborators: { min: 1, max: 3 }, // Number of collaborators per project (min - max)
};

// Function to generate fake data for projects
async function createProject(stacks: Stack[], collaborators: Collaborator[]) {
  const stackCount = faker.number.int({
    min: config.projectToStacks.min,
    max: config.projectToStacks.max,
  });

  const collaboratorCount = faker.number.int({
    min: config.projectToCollaborators.min,
    max: config.projectToCollaborators.max,
  });

  // Randomly select stacks and collaborators for this project
  const selectedStacks = faker.helpers.shuffle(stacks).slice(0, stackCount);
  const selectedCollaborators = faker.helpers.shuffle(collaborators).slice(0, collaboratorCount);

  return prisma.project.create({
    data: {
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
      associatedStacks: {
        connect: selectedStacks.map((stack: Stack) => ({ id: stack.id })),
      },
      associatedCollaborators: {
        connect: selectedCollaborators.map((collaborator: Collaborator) => ({
          id: collaborator.id,
        })),
      },
    },
  });
}

// Function to generate fake data for stacks
async function createStack() {
  return prisma.stack.create({
    data: {
      name: faker.company.name(),
      key: faker.helpers.slugify(faker.lorem.words(2)).toLowerCase(),
      category: faker.helpers.enumValue(StackCategory) as StackCategory,
      type: faker.helpers.enumValue(StackType) as StackType,
      description: faker.lorem.sentence(),
      iconUrl: faker.image.url(),
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
    },
  });
}

// Function to generate fake data for collaborators
async function createCollaborator() {
  const username = faker.internet.username().toLowerCase();

  return prisma.collaborator.create({
    data: {
      nickname: faker.person.fullName(),
      githubUsername: username,
      linkedinUsername: username,
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
    },
  });
}

const main = async () => {
  const stacks = [];
  const collaborators = [];

  // Generate proyects
  for (let i = 0; i < config.projects; i++) {
    stacks.push(await createStack());
  }

  // Generate stacks
  for (let i = 0; i < config.stacks; i++) {
    collaborators.push(await createCollaborator());
  }

  // Generate colaborators
  for (let i = 0; i < config.collaborators; i++) {
    await createProject(stacks, collaborators);
  }
};

main()
  .catch(() => {
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
