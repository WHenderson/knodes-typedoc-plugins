#! /bin/zsh
set -e
VERSION=$(node tools/infer-next-version)
echo "Will publish version '${VERSION}'"
if ! read -q "REPLY?Are you sure? "; then
    exit 1
fi
# Bump & reinstall
npm run tools:bump-versions "${VERSION}"
npm install
git add package-lock.json
# Update readmes
npm run tools:packages-sync -- --no-stash
find . -name README.md -not -path '*/node_modules/*' -not -path './typedoc/*' -not -path '*/__tests__/*' -exec git add {} \;
# Run build & tests
npm run projects:build:clean
npm run projects:build
npm run lint
npm run projects:test -- --all
# Commit
git commit -m "chore: bump to version ${VERSION}" --no-verify
git tag "v${VERSION}"
# Publish docs
npm run docs
PWD_SV="${PWD}"
TEMP_DIR="$(mktemp -d)"
echo "Using docs temp dir ${TEMP_DIR}"
REMOTE_URL="$(git config --get remote.origin.url)"
cd "${TEMP_DIR}"
git init .
git remote add origin "${REMOTE_URL}"
git fetch
git checkout --track origin/docs
rsync -va --delete --exclude ".git" "${PWD_SV}/docs/" ./
git add .
git commit -m "docs: publish docs for v${VERSION}"
cd "${PWD_SV}"
# Print publish script
# BRANCH="$(git rev-parse --abbrev-ref HEAD)"
echo "All is OK so far. To finish publishing, enter the following command:"
echo "( cd ${TEMP_DIR} && git push ) && git merge --ff-only main && git push develop main --follow-tags && npm publish --access public --workspaces"