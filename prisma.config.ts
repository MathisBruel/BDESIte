import { defineConfig } from '@prisma/config'

// During build time (docker build), DATABASE_URL might not be defined.
// We provide a fallback to allow 'prisma generate' to succeed.
// At runtime, the actual environment variable from docker-compose will be used.
const databaseUrl = process.env.DATABASE_URL || 'postgresql://postgres:postgres@127.0.0.1:5433/bde_db?schema=public'

export default defineConfig({
    datasource: {
        url: databaseUrl,
    },
})
