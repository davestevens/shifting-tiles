#!/usr/bin/env sh

BRANCH=gh-pages
WEB_DIRECTORY=example
DEPLOY_DIRECTORY=deploy

# Check if the repo is dirty
STATUS=$(git status --porcelain)
if [[ -n $STATUS ]]; then
    # Stash any current changes
    git stash -u
    DIRTY=true
fi

# Store the current hash
CURRENT=$(git rev-parse HEAD)

# Build all files
npm run build
mv $WEB_DIRECTORY $DEPLOY_DIRECTORY
# Commit the built files
git add $DEPLOY_DIRECTORY && git commit -m "Adding built files"
# Force push these built files
git push origin $(git subtree split --prefix $DEPLOY_DIRECTORY):$BRANCH --force

git reset --hard $CURRENT
if [[ $DIRTY ]]; then
    # Revert any uncommitted changes
    git stash pop
fi
