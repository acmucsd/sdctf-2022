#! /usr/bin/env bash

set -e

cd "$(dirname -- "${BASH_SOURCE[0]}")"

function main {
    echo "----- Welcome to ShamAV, version alpha 0.0.1 -----"
    echo "***** Begin System information *****"
    echo "Working directory: $(pwd)"
    echo "Directory listing:"
    ls -la
    echo "***** End System information *****"

    while true; do
        ( umask 077; head -c 32 /dev/urandom | base64 > seed )
        if ./server.py 2>&1; then
            echo "[I] Launcher shutting down..."
            break
        fi
        echo "[!] ShamAV server has crashed, restarting in 1 second..."
        sleep 1
        echo "[I] Restarting ShamAV server"
    done
}

main > av.log
