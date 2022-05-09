#! /bin/bash
# The script used to generate the RSA private key used in the challenge

ssh-keygen -b 3072 -t rsa -f ./id_rsa -C SDCTF -q -N ""
