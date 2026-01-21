#!/bin/sh
set -e

echo "Waiting for PostgreSQL to be ready..."

# Wait for PostgreSQL to be ready
until PGPASSWORD=$POSTGRES_PASSWORD psql -h "$DB_HOST" -U "$POSTGRES_USER" -d "$POSTGRES_DB" -c '\q' 2>/dev/null; do
  echo "PostgreSQL is unavailable - sleeping"
  sleep 1
done

echo "PostgreSQL is up"

echo "Waiting for MinIO to be ready..."

# Wait for MinIO to be ready
MINIO_HOST="${MINIO_ENDPOINT:-minio}"
MINIO_API_PORT="${MINIO_PORT:-9000}"
until wget -q --spider "http://${MINIO_HOST}:${MINIO_API_PORT}/minio/health/live" 2>/dev/null; do
  echo "MinIO is unavailable - sleeping"
  sleep 1
done

echo "MinIO is up"

# Run Prisma migrations
echo "Running Prisma db push..."
npx prisma db push --accept-data-loss

# Migration complète (images + données)
echo "Running full migration to production..."
npm run migrate:prod

# Start the application
echo "Starting Next.js application..."
exec "$@"
