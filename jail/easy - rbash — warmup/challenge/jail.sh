#! /usr/bin/env bash

cd "$(dirname -- "${BASH_SOURCE[0]}")" || exit

PATH="/home/user/whitelist" exec /bin/rbash --norc --noprofile 2>&1
