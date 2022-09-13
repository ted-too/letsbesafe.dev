import { Prisma, PrismaClient } from "@prisma/client";

export type JsonObject = Prisma.JsonObject;
export type JsonArray = Prisma.JsonArray;

let prisma: PrismaClient;
declare global {
  var __db: PrismaClient | undefined;
}

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
  prisma.$connect();
} else {
  if (!global.__db) {
    global.__db = new PrismaClient();
    global.__db.$connect();
  }
  prisma = global.__db;
  prisma.$use(async (params, next) => {
    const before = Date.now();

    const result = await next(params);

    const after = Date.now();

    console.log(`Query ${params.model}.${params.action} took ${after - before}ms`);

    return result;
  });
}

export { prisma as db };
