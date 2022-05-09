#! /usr/bin/env bash
# Run this file after achieving RCE to read the flag

cd "$(dirname -- "${BASH_SOURCE[0]}")" || exit
chmod u+r flag.txt
cat flag.txt
