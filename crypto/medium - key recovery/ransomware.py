#! /usr/bin/env python3

import base64


KEY = 'id_rsa'
COR = 'id_rsa.corrupted'

with open(KEY) as pk:
    lines = list(pk)
    b64 = ''.join((line[:-1] for line in lines[1:-1]))
    bys = bytearray(base64.b64decode(b64))

# Nuke some byte ranges

OFFSET_LENGTHS = [(454 + 808, 190), (454 + 1004, 193), (454 + 1201, 193)] # Specific to this type of key, may not work for others...

for offset, length in OFFSET_LENGTHS:
    bys[offset:offset+length] = b'\0' * length

# Write out the key in the same format as the input key

HEADER = '-----BEGIN OPENSSH PRIVATE KEY-----\n'
FOOTER = '-----END OPENSSH PRIVATE KEY-----\n'
LINE_LENGTH = 70 # Excluding newline characters

corrupted_b64 = base64.b64encode(bys).decode('ascii')

with open(COR, 'w') as pk:
    pk.write(HEADER)
    pk.writelines(corrupted_b64[i:i+LINE_LENGTH] + '\n' for i in range(0, len(corrupted_b64), LINE_LENGTH))
    pk.write(FOOTER)

# Edit: MALICIOUS code commented out BELOW for your safety!
# __import__('os').remove(KEY)

print(f'***** WARNING: YOUR SSH PRIVATE KEY HAS BEEN CORRUPTED *****')
print(f'Pay me 1000 BTC to recover your corrupted private key at {COR}')