#! /usr/bin/env python3
# PoC of how a participant might solve this challenge

import base64

KEY = 'id_rsa.recovered'
COR = 'id_rsa.corrupted'

with open(COR) as pk:
    lines = list(pk)
    b64 = ''.join((line[:-1] for line in lines[1:-1]))
    bys = bytearray(base64.b64decode(b64))


# **** Key recovery ****

# Taken from ransomware.py
OFFSET_LENGTHS = [(454 + 808, 190), (454 + 1004, 193), (454 + 1201, 193)] # Specific to this type of key, may not work for others...
_, LOCATION_P, LOCATION_Q = OFFSET_LENGTHS
IQMP_LENGTH = 192
LOCATION_IQMP = (OFFSET_LENGTHS[0][0], IQMP_LENGTH)
IQMP_HINT_BYTES_LOCATION = (OFFSET_LENGTHS[0][0] + OFFSET_LENGTHS[0][1], IQMP_LENGTH - OFFSET_LENGTHS[0][1])
# prv1 = iqmp           i.q.m.p. stands for Inverse of q mod p i.e. iqmp * q === 1 mod p
# prv2 = p
# prv3 = q
# How do I know? https://github.com/openssh/openssh-portable/blob/69928b106d8f0fa15b88cf3850d992ed81c44ae0/sshkey.c#L3253
# Or via reverse engineering and "guessing"
# https://coolaj86.com/articles/the-openssh-private-key-format/

# See decode.py for how I figured out these file offsets
LOCATION_E = (43 + 15, 3)
LOCATION_N = (43 + 22, 385)
LOCATION_D = (454 + 419, 385)
LOCATION_D = (454 + 419, 385)

def readint(location):
    return int.from_bytes(bys[location[0]:location[0]+location[1]], 'big')

def writeint(location, i: int):
    bys[location[0]:location[0]+location[1]] = i.to_bytes(location[1], 'big')

e = readint(LOCATION_E)
n = readint(LOCATION_N)
d = readint(LOCATION_D)

# Inverse of x mod n
# Same as
# from Crypto.Util.number import inverse
# But with Python built-in
def inverse(x: int, n: int) -> int:
    return pow(x, -1, n)

def sqrt_int(x: int):
    if x < 0:
        return -1
    if x == 0:
        return 0
    l = 0
    h = x + 1
    while l < h - 1:
        m = (l + h) // 2
        mm = m * m
        if mm == x:
            return m
        elif mm < x:
            l = m
        else:
            h = m
    return -1

# https://stackoverflow.com/a/2922113
def recover_pq():
    ed_1 = e * d - 1
    kp = round(e * d / n)
    for k in [kp - 1, kp, kp + 1]:
    # for k in range(1, e):
        if ed_1 % k != 0:
            continue
        phi = ed_1 // k
        p_plus_q = n + 1 - phi
        sqrt_discriminant = sqrt_int(p_plus_q ** 2 - 4 * n)
        if sqrt_discriminant == -1:
            continue
        p = (p_plus_q + sqrt_discriminant) // 2
        q = (p_plus_q - sqrt_discriminant) // 2
        if p * q == n:
            return p, q
    else:
        assert False

p1, p2 = recover_pq()
for p, q in [(p1, p2), (p2, p1)]:
    iqmp = inverse(q, p)
    if iqmp & (0x100 ** IQMP_HINT_BYTES_LOCATION[1] - 1) == readint(IQMP_HINT_BYTES_LOCATION):
        writeint(LOCATION_IQMP, iqmp)
        writeint(LOCATION_P, p)
        writeint(LOCATION_Q, q)
        break
else:
    assert False

# **** Key recovery end ****

HEADER = '-----BEGIN OPENSSH PRIVATE KEY-----\n'
FOOTER = '-----END OPENSSH PRIVATE KEY-----\n'
LINE_LENGTH = 70 # Excluding newline characters

original_b64 = base64.b64encode(bys).decode('ascii')

with open(KEY, 'w') as pk:
    pk.write(HEADER)
    pk.writelines(original_b64[i:i+LINE_LENGTH] + '\n' for i in range(0, len(original_b64), LINE_LENGTH))
    pk.write(FOOTER)
