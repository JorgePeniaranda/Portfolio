import type { Prisma } from '@prisma/client';

export const themes = {
  light: 'light',
  dark: 'dark',
} as const;

export type theme = (typeof themes)[keyof typeof themes];

export const themesArray = Object.values(themes);

export type SoundState = boolean;

export type PrismaError =
  | Prisma.PrismaClientKnownRequestError
  | Prisma.PrismaClientUnknownRequestError
  | Prisma.PrismaClientRustPanicError
  | Prisma.PrismaClientInitializationError
  | Prisma.PrismaClientValidationError;
