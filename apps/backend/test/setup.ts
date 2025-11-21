import { vi } from 'vitest';

vi.mock('@prisma/client', () => ({
  PrismaClient: vi.fn(),
}));

vi.mock('@prisma/adapter-pg', () => ({
  PrismaPg: vi.fn(),
}));

// Mock TypeORM for E2E tests to avoid database connection issues
vi.mock('typeorm', async () => {
  const actual = await vi.importActual('typeorm');
  return {
    ...actual,
  };
});
