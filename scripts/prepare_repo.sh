#!/usr/bin/env bash
set -euo pipefail

# Usage:
#   GIT_REMOTE=git@github.com:username/repo.git bash scripts/prepare_repo.sh

if ! command -v git >/dev/null 2>&1; then
  echo "git not found. Install git and re-run this script." >&2
  exit 1
fi

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT_DIR"

if [ ! -d .git ]; then
  echo "Initializing git repository..."
  git init -b main
else
  echo "Git repository already initialized."
fi

git add --all
if git diff --staged --quiet; then
  echo "No changes to commit."
else
  git commit -m "chore: initial commit — Next.js multi-language docs site"
fi

if [ -n "${GIT_REMOTE:-}" ]; then
  echo "Setting remote origin to $GIT_REMOTE"
  git remote remove origin 2>/dev/null || true
  git remote add origin "$GIT_REMOTE"
  echo "Pushing to remote (main)..."
  git push -u origin main
  echo "Push complete."
else
  echo "No GIT_REMOTE provided. To push, run:"
  echo "  git remote add origin <your-repo-url> && git push -u origin main"
fi
