#! /usr/bin/env bash

{ cat solve.txt; sleep 0.2; echo pwn.txt; } | ./challenge/jail.py
