import dotenv from "dotenv";
dotenv.config();

export const env = {
  PORT: process.env.PORT || "5001",
  JWT_SECRET: process.env.JWT_SECRET || "insyra-dev-secret-change-in-production",
  DATABASE_URL: process.env.DATABASE_URL || "file:./dev.db",
};
