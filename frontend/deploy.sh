#!/bin/bash

# Build the application
npm run build

# Create the standalone directory
mkdir -p .next/standalone

# Copy necessary files
cp -r .next/static .next/standalone/.next/
cp -r public .next/standalone/
cp .env.production .next/standalone/.env
cp package.json .next/standalone/

# Create zip file
cd .next/standalone
zip -r ../../deploy.zip .

echo "Deployment package created at deploy.zip"
echo "Upload this file to your GoDaddy hosting control panel"
