#!/usr/bin/env bash
# Keeps workshop-1-solution in sync with workshop-1.
#
# Make all changes on workshop-1 (the starter), commit them, then run:
#   ./scripts/sync-solution.sh
#
# It merges workshop-1 into workshop-1-solution, then copies every
# *.solution file over the stub next to it, and commits. The .solution files
# stay in both branches, so they remain the single source of truth.
set -euo pipefail

STARTER=workshop-1
SOLUTION=workshop-1-solution

if [ -n "$(git status --porcelain)" ]; then
  echo "Commit or stash your changes first." >&2
  exit 1
fi

START_BRANCH=$(git branch --show-current)
git rev-parse --verify -q "$SOLUTION" >/dev/null || git branch "$SOLUTION" "$STARTER"

git checkout -q "$SOLUTION"
git merge --no-edit -X ours "$STARTER" -m "Merge $STARTER into $SOLUTION"

find src -name '*.solution' | while read -r file; do
  cp "$file" "${file%.solution}"
done

git add -A
if ! git diff --cached --quiet; then
  git commit -q -m "Apply solutions"
fi

git checkout -q "$START_BRANCH"
echo "$SOLUTION is in sync with $STARTER."
