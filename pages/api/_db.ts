import { PrismaClient } from "@prisma/client";

declare global {
  var PrismaClient: PrismaClient | undefined;
}

export const prisma: PrismaClient =
  global.prisma ||
  new PrismaClient({
    log: ["query"],
  });

global.prisma = prisma;
