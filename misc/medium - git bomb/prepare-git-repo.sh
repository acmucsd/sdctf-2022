#! /usr/bin/env bash

if (( $# != 2 )); then
    echo "usage: ./prepare-git-repo /path/to/repo /path/to/output.tar.gz" >&2
    exit 2
fi

if ! [[ -d "$1/.git" ]]; then
    echo "$1: not a valid git repo" >&2
    exit 1
fi

tar -C "$1" -czf "$2" .
