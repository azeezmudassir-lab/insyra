import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { env } from "../config/env.js";

const adapter = new PrismaBetterSqlite3({ url: env.DATABASE_URL });

const prisma = new PrismaClient({ adapter });

export default prisma;
