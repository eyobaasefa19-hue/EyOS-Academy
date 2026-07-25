import { PrismaClient } from '@prisma/client';

/**
 * Creates a single instance of PrismaClient.
 * This prevents creating multiple connections during Next.js Hot Module Replacement (HMR) in development.
 */
const prismaClientSingleton = () => {
  return new PrismaClient();
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

declare global {
  // eslint-disable-next-line no-var
  var prismaGlobal: PrismaClientSingleton | undefined;
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') {
  globalThis.prismaGlobal = prisma;
}

export default prisma;
