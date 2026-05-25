#!/usr/bin/env bash

# Exit immediately if a command exits with a non-zero status
set -e

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo "🔄 Starting Git synchronization process..."

# 1. Verify working directory is clean
if ! git diff-index --quiet HEAD --; then
  echo -e "${RED}❌ Error: You have uncommitted changes. Please commit, stash, or discard them before running this script.${NC}"
  git status -s
  exit 1
fi

# 2. Sync main
echo -e "\n➡️ Switching to main..."
git checkout main

echo -e "📥 Pulling latest changes for main from origin..."
git pull origin main

# 3. Sync develop
echo -e "\n➡️ Switching to develop..."
git checkout develop

echo -e "🔀 Merging main into develop..."
git merge main

# 4. Push develop
echo -e "📤 Pushing updated develop to origin..."
git push origin develop

echo -e "\n${GREEN}✨ Git synchronization completed successfully!${NC}"
