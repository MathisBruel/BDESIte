#!/bin/sh
set -e

echo "Waiting for PostgreSQL to be ready..."

# Wait for PostgreSQL to be ready
until PGPASSWORD=$POSTGRES_PASSWORD psql -h "$DB_HOST" -U "$POSTGRES_USER" -d "$POSTGRES_DB" -c '\q' 2>/dev/null; do
  echo "PostgreSQL is unavailable - sleeping"
  sleep 1
done

echo "PostgreSQL is up - executing command"

# Run Prisma migrations
echo "Running Prisma db push..."
npx prisma db push --accept-data-loss

# Seed the database
echo "Seeding database..."
npm run seed

# Start the application
echo "Starting Next.js application..."
exec "$@"
