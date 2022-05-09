#! /usr/bin/env bash

set -e

cd "$(dirname -- "${BASH_SOURCE[0]}")"

TAR="$1"
REPO_DIR="$(mktemp -d)"

tar -xzf "$TAR" -C "$REPO_DIR"
cd "$REPO_DIR"
git commit -m "Powered by GCaaS"
