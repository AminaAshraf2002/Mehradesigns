import 'dotenv/config';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@/app/generated/prisma/client';

function getDatabaseUrl(): string {
  const rawUrl =
    process.env.DIRECT_URL ||
    process.env.DATABASE_URL_ROTATED ||
    process.env.DATABASE_URL ||
    '';
  if (rawUrl.startsWith('prisma+postgres://')) {
    return 'postgres://postgres:postgres@localhost:51214/template1?sslmode=disable';
  }
  return rawUrl;
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
  pool: Pool | undefined;
};

// Resilient connection pool supporting DB rotation, serverless suspend/resume, and connection recycling
function createResilientPool(): Pool {
  const newPool = new Pool({
    connectionString: getDatabaseUrl(),
    max: 10,
    maxUses: 500, // Connection rotation: recycle client after 500 queries to prevent stale connections
    idleTimeoutMillis: 20000, // 20s: close idle connections before serverless/cloud DB pooler times out
    connectionTimeoutMillis: 10000, // 10s: fail fast if database is rotating or unreachable
    keepAlive: true,
  });

  // Catch unexpected errors on idle clients caused by DB rotation, endpoint failover, or server-side disconnects
  newPool.on('error', (err: any) => {
    console.warn('[Prisma Pool] Caught DB connection rotation or idle client disconnect:', err?.message || err);
  });

  return newPool;
}

export const pool = globalForPrisma.pool ?? createResilientPool();

if (process.env.NODE_ENV !== 'production') globalForPrisma.pool = pool;

const adapter = new PrismaPg(pool);

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export * from '@/app/generated/prisma/client';
export default prisma;
