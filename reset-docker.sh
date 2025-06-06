#!/bin/bash

echo "⚠️ WARNING: This script will stop Docker, remove ALL containers, images, volumes, and networks."
echo "Any data not persisted outside Docker will be lost."
echo
read -p "Are you SURE you want to continue? (yes/[no]) " confirm

if [[ "$confirm" != "yes" ]]; then
  echo "Aborting. No changes made."
  exit 1
fi

echo "👉 Shutting down docker-compose..."
docker-compose down

echo "🛑 Stopping Docker service..."
sudo systemctl stop docker.service

echo "🧹 Cleaning up Docker..."
docker container prune -f
docker image prune -a -f
docker system prune -a --volumes -f

echo "✅ Starting Docker service..."
sudo systemctl start docker.service

echo "🚀 Starting docker-compose..."
docker-compose up -d

echo "⏳ Waiting for 10s for database to be ready..."
sleep 10

echo "🧬 Running Prisma commands..."
npx prisma db push
npx prisma generate
npx prisma db seed

echo "🔧 Starting dev server..."
npm run dev
