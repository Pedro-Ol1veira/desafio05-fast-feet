import { PrismaPg } from "@prisma/adapter-pg";
import { execSync } from "child_process";
import { randomUUID } from "crypto";
import { PrismaClient } from "@/../prisma/generated/client";
import { config } from 'dotenv';

config({ path: '.env', override: true });

const connectionString = process.env.DATABASE_URL;

function generateUniqueDatabaseUrl(schemaId: string): string {
    if(!process.env.DATABASE_URL) throw new Error("Please provide Database url variable");
    const url = new URL(process.env.DATABASE_URL);
    url.searchParams.set('schema', schemaId);

    return url.toString();
}

const schemaId = randomUUID();

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

beforeAll(async () => {
    const databaseUrl = generateUniqueDatabaseUrl(schemaId);
    process.env.DATABASE_URL = databaseUrl;

    execSync("npx prisma migrate deploy");
})

afterAll(async () => {
    await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schemaId}" CASCADE`);
    await prisma.$disconnect();
})