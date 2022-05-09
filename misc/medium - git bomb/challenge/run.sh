#!/bin/bash

# Start node web server
(&>/dev/null node /app/index.js)&

# Proxy stdin/stdout to web server
socat - TCP:127.0.0.1:6665,forever
