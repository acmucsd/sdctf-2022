#! /usr/bin/env bash

mkdir /tmp/workdir &&
exec bash -ic 'WORKDIR=/tmp/workdir /home/user/jail.py' 2>&1
